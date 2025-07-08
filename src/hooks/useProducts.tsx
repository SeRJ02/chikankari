import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, testSupabaseConnection } from '../lib/supabase';
import { Product } from '../types';
import { products as mockProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      console.log('🔄 useProducts: Starting to load products...');
      setLoading(true);
      setError(null);

      // Check if Supabase is configured before attempting to fetch
      if (!isSupabaseConfigured()) {
        console.log('📦 useProducts: Supabase not configured properly. Please set up your Supabase project and update the .env file with your actual credentials.');
        console.log('📦 useProducts: Using mock products for now.');
        setError('Supabase not configured. Please check your .env file and ensure you have valid Supabase credentials.');
        setProducts(mockProducts);
        setLoading(false);
        return;
      }

      // Test connection first with timeout
      console.log('🔄 useProducts: Testing Supabase connection...');
      const connectionOk = await testSupabaseConnection();
      
      if (!connectionOk) {
        console.log('📦 useProducts: Connection test failed. This usually means:');
        console.log('  1. Your Supabase project URL or API key is incorrect');
        console.log('  2. Your Supabase project is not active');
        console.log('  3. Database migrations have not been run');
        console.log('  4. Network connectivity issues');
        console.log('📦 useProducts: Using mock products for now.');
        setError('Unable to connect to Supabase. Please verify your credentials and project setup.');
        setProducts(mockProducts);
        setLoading(false);
        return;
      }

      console.log('🔄 useProducts: Attempting to fetch from Supabase...');
      
      // Add timeout to the fetch operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Fetch timeout')), 15000);
      });

      const fetchPromise = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      const { data, error: supabaseError } = await Promise.race([
        fetchPromise,
        timeoutPromise
      ]) as any;

      if (supabaseError) {
        console.error('❌ useProducts: Supabase error:', supabaseError);
        
        // Handle specific error cases
        if (supabaseError.code === '42P01' || supabaseError.code === 'PGRST116') {
          console.log('📦 useProducts: Table not found, using mock products');
          setError('Database table not found. Using sample data.');
        } else if (supabaseError.message?.includes('Failed to fetch')) {
          console.log('📦 useProducts: Network error, using mock products');
          setError('Network connection failed. Using offline mode.');
        } else {
          console.log('📦 useProducts: Database error, falling back to mock products');
          setError('Database error occurred. Using offline mode.');
        }
        setProducts(mockProducts);
      } else {
        console.log('📦 useProducts: Loaded products from Supabase:', data?.length || 0, 'products');
        
        if (!data || data.length === 0) {
          console.log('📦 useProducts: No products in database, using mock products');
          setError('No products found in database. Using sample data.');
          setProducts(mockProducts);
        } else {
          // Transform Supabase data to match our Product interface
          const transformedProducts: Product[] = data.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.original_price || undefined,
            images: item.images,
            description: item.description,
            fabric: item.fabric,
            embroideryTechnique: item.embroidery_technique,
            sizes: item.sizes,
            careInstructions: item.care_instructions,
            heritageStory: item.heritage_story,
            inStock: item.in_stock,
            stockCount: item.stock_count,
            category: item.category,
            featured: item.featured,
          }));
          
          setProducts(transformedProducts);
          setError(null); // Clear any previous errors
        }
      }
    } catch (err) {
      console.error('❌ useProducts: Error loading products:', err);
      
      // Provide more specific error information
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch')) {
          console.log('📦 useProducts: Network fetch failed - possible CORS, network, or URL issue. Using mock products.');
          setError('Unable to connect to database. Using offline mode.');
        } else if (err.message.includes('timeout')) {
          console.log('📦 useProducts: Request timed out. Using mock products.');
          setError('Database request timed out. Using offline mode.');
        } else {
          console.log('📦 useProducts: Unexpected error occurred, using mock products');
          setError('An unexpected error occurred. Using offline mode.');
        }
      } else {
        console.log('📦 useProducts: Unknown error type, using mock products');
        setError('An unknown error occurred. Using offline mode.');
      }
      
      // Always fallback to mock data on any error
      setProducts(mockProducts);
    } finally {
      setLoading(false);
      console.log('✅ useProducts: Finished loading products');
    }
  };

  const transformProductForSupabase = (product: Product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    original_price: product.originalPrice || null,
    images: product.images,
    description: product.description,
    fabric: product.fabric,
    embroidery_technique: product.embroideryTechnique,
    sizes: product.sizes,
    care_instructions: product.careInstructions,
    heritage_story: product.heritageStory,
    in_stock: product.inStock,
    stock_count: product.stockCount,
    category: product.category,
    featured: product.featured,
  });

  const updateProduct = async (updatedProduct: Product) => {
    // Check if Supabase is configured before attempting operations
    if (!isSupabaseConfigured()) {
      console.log('⚠️ useProducts: Cannot update product - Supabase not configured');
      setError('Database not configured. Please set up Supabase to manage products.');
      return;
    }

    try {
      console.log('🔄 useProducts: Updating product:', updatedProduct.name);
      
      const supabaseProduct = transformProductForSupabase(updatedProduct);
      
      // Add timeout to update operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Update timeout')), 10000);
      });

      const updatePromise = supabase
        .from('products')
        .update({
          ...supabaseProduct,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedProduct.id);

      const { error } = await Promise.race([updatePromise, timeoutPromise]) as any;

      if (error) {
        console.error('❌ useProducts: Error updating product:', error);
        throw error;
      }

      // Update local state
      setProducts(prev => prev.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      ));
      
      console.log('✅ useProducts: Product updated successfully');
    } catch (err) {
      console.error('❌ useProducts: Error updating product:', err);
      if (err instanceof Error && err.message.includes('timeout')) {
        setError('Update request timed out');
      } else {
        setError('Failed to update product');
      }
    }
  };

  const addProduct = async (newProduct: Product) => {
    // Check if Supabase is configured before attempting operations
    if (!isSupabaseConfigured()) {
      console.log('⚠️ useProducts: Cannot add product - Supabase not configured');
      setError('Database not configured. Please set up Supabase to manage products.');
      return;
    }

    try {
      console.log('➕ useProducts: Adding new product:', newProduct.name);
      
      const supabaseProduct = transformProductForSupabase(newProduct);
      
      // Add timeout to insert operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Insert timeout')), 10000);
      });

      const insertPromise = supabase
        .from('products')
        .insert(supabaseProduct);

      const { error } = await Promise.race([insertPromise, timeoutPromise]) as any;

      if (error) {
        console.error('❌ useProducts: Error adding product:', error);
        throw error;
      }

      // Update local state
      setProducts(prev => [newProduct, ...prev]);
      
      console.log('✅ useProducts: Product added successfully');
    } catch (err) {
      console.error('❌ useProducts: Error adding product:', err);
      if (err instanceof Error && err.message.includes('timeout')) {
        setError('Add request timed out');
      } else {
        setError('Failed to add product');
      }
    }
  };

  const deleteProduct = async (productId: string) => {
    // Check if Supabase is configured before attempting operations
    if (!isSupabaseConfigured()) {
      console.log('⚠️ useProducts: Cannot delete product - Supabase not configured');
      setError('Database not configured. Please set up Supabase to manage products.');
      return;
    }

    try {
      console.log('🗑️ useProducts: Deleting product with ID:', productId);
      
      // Add timeout to delete operation
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Delete timeout')), 10000);
      });

      const deletePromise = supabase
        .from('products')
        .delete()
        .eq('id', productId);

      const { error } = await Promise.race([deletePromise, timeoutPromise]) as any;

      if (error) {
        console.error('❌ useProducts: Error deleting product:', error);
        throw error;
      }

      // Update local state
      setProducts(prev => prev.filter(p => p.id !== productId));
      
      console.log('✅ useProducts: Product deleted successfully');
    } catch (err) {
      console.error('❌ useProducts: Error deleting product:', err);
      if (err instanceof Error && err.message.includes('timeout')) {
        setError('Delete request timed out');
      } else {
        setError('Failed to delete product');
      }
    }
  };

  return {
    products,
    loading,
    error,
    updateProduct,
    addProduct,
    deleteProduct,
    refreshProducts: loadProducts,
  };
};