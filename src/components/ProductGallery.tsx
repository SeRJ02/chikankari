import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';

interface ProductGalleryProps {
  onProductSelect: (product: Product) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ onProductSelect }) => {
  const { products, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      )
    );
  }, [products, searchTerm]);

  const handleProductSelect = (product: Product) => {
    onProductSelect(product);
  };

  if (loading) {
    return (
      <section id="shop" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-dark-gray mb-4">
              Our Collection
            </h2>
            <div className="w-20 h-1 bg-baby-pink mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card overflow-hidden animate-pulse">
                <div className="bg-gray-300 h-48 sm:h-64"></div>
                <div className="p-4 space-y-3">
                  <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
                  <div className="bg-gray-300 h-3 w-full rounded"></div>
                  <div className="bg-gray-300 h-3 w-2/3 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-dark-gray mb-4">
            Our Collection
          </h2>
          <div className="w-20 h-1 bg-baby-pink mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of authentic Lucknowi Chikankari kurtas,
            each piece crafted with love and tradition.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-300 bg-white shadow-sm outline-none transition-shadow duration-300 focus:shadow-md focus:ring-2 focus:ring-baby-pink focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleProductSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="font-heading text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              Try a different search term
            </p>
            <button onClick={() => setSearchTerm('')} className="btn-primary">
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;
