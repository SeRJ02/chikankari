import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { products as mockProducts } from '../data/products';

// Helper function to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return url && 
         key && 
         url !== 'YOUR_SUPABASE_URL' && 
         url !== 'your_supabase_project_url' &&
         key !== 'YOUR_SUPABASE_ANON_KEY' && 
         key !== 'your_supabase_anon_key' &&
         url.startsWith('https://') &&
         key.length > 20;
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      console.log('🔄 useProducts: Starting to load products from Supabase...');
      setLoading(true);
      setError(null);

      // Check if Supabase is configured before attempting to fetch
      if (!isSupabaseConfigured()) {
        console.log('📦 useProducts: Supabase not configured, using mock products');
        setProducts(mockProducts);
        setLoading(false);
        return;
      }

      console.log('🔄 useProducts: Attempting to fetch from Supabase...');
      const { data, error: supabaseError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('❌ useProducts: Supabase error:', supabaseError);
        
        // If table doesn't exist or other DB error, fall back to mock data
        if (supabaseError.code === '42P01' || supabaseError.code === 'PGRST116') {
          console.log('📦 useProducts: Table not found, using mock products');
        } else {
          console.log('📦 useProducts: Database error, falling back to mock products');
        }
        setProducts(mockProducts);
      } else {
        console.log('📦 useProducts: Loaded products from Supabase:', data?.length || 0, 'products');
        
        if (!data || data.length === 0) {
          console.log('📦 useProducts: No products in database, using mock products');
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
        }
      }
    } catch (err) {
      console.error('❌ useProducts: Error loading products:', err);
      console.log('📦 useProducts: Network error or connection failed, using mock products');
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
      
      const { error } = await supabase
        .from('products')
        .update({
          ...supabaseProduct,
          updated_at: new Date().toISOString(),
        })
        .eq('id', updatedProduct.id);

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
      setError('Failed to update product');
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
      
      const { error } = await supabase
        .from('products')
        .insert(supabaseProduct);

      if (error) {
        console.error('❌ useProducts: Error adding product:', error);
        throw error;
      }

      // Update local state
      setProducts(prev => [newProduct, ...prev]);
      
      console.log('✅ useProducts: Product added successfully');
    } catch (err) {
      console.error('❌ useProducts: Error adding product:', err);
      setError('Failed to add product');
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
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error('❌ useProducts: Error deleting product:', error);
        throw error;
      }

      // Update local state
      setProducts(prev => prev.filter(p => p.id !== productId));
      
      console.log('✅ useProducts: Product deleted successfully');
    } catch (err) {
      console.error('❌ useProducts: Error deleting product:', err);
      setError('Failed to delete product');
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