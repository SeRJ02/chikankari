import { useState, useEffect } from 'react';
import { sanityClient, isSanityConfigured, urlForImage } from '../lib/sanity';
import { Product } from '../types';
import { products as mockProducts } from '../data/products';

const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc){
  "id": _id,
  name,
  price,
  originalPrice,
  images,
  description,
  fabric,
  embroideryTechnique,
  sizes,
  careInstructions,
  heritageStory,
  inStock,
  stockCount,
  category,
  featured
}`;

// Sanity image fields may be raw URL strings or Sanity image objects.
const resolveImages = (images: unknown): string[] => {
  if (!Array.isArray(images)) return [];
  return images
    .map((img) => (typeof img === 'string' ? img : urlForImage(img)))
    .filter(Boolean);
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      setLoading(true);

      // If Sanity is not configured, fall back to sample data silently.
      if (!isSanityConfigured() || !sanityClient) {
        console.log('📦 useProducts: Sanity not configured. Showing sample products.');
        if (!cancelled) {
          setProducts(mockProducts);
          setLoading(false);
        }
        return;
      }

      try {
        console.log('🔄 useProducts: Fetching products from Sanity...');
        const data = await sanityClient.fetch<Product[]>(PRODUCTS_QUERY);
        if (cancelled) return;

        if (!data || data.length === 0) {
          console.log('📦 useProducts: No products in Sanity. Showing sample products.');
          setProducts(mockProducts);
        } else {
          const transformed: Product[] = data.map((item) => ({
            ...item,
            images: resolveImages(item.images),
            sizes: item.sizes ?? [],
            careInstructions: item.careInstructions ?? [],
            inStock: item.inStock ?? true,
            stockCount: item.stockCount ?? 0,
            featured: item.featured ?? false,
          }));
          console.log(`📦 useProducts: Loaded ${transformed.length} products from Sanity.`);
          setProducts(transformed);
        }
      } catch (err) {
        console.error('❌ useProducts: Error loading products from Sanity:', err);
        if (!cancelled) setProducts(mockProducts);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading };
};
