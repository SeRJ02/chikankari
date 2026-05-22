import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, Search, X } from 'lucide-react';
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = ['all', 'traditional', 'contemporary', 'premium', 'sets'];
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
  ];

  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort products
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleProductSelect = (product: Product) => {
    console.log('📋 ProductGallery: Product selected, passing to parent:', product.name, product);
    onProductSelect(product);
  };

  if (loading) {
    console.log('⏳ ProductGallery: Loading products...');
    return (
      <section id="shop" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold text-dark-gray mb-4">
              Our Collection
            </h2>
            <div className="w-20 h-1 bg-baby-pink mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
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

  console.log('✅ ProductGallery: Rendered with', filteredProducts.length, 'products');

  return (
    <section id="shop" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-dark-gray mb-4">
            Our Collection
          </h2>
          <div className="w-20 h-1 bg-baby-pink mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of authentic Lucknowi Chikankari kurtas, 
            each piece crafted with love and tradition.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            {searchOpen ? (
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent text-sm"
                />
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSearchOpen(false);
                  }}
                  aria-label="Close search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="p-2 w-fit rounded-lg border border-gray-300 text-gray-600 hover:bg-baby-pink hover:text-white transition-colors duration-300"
              >
                <Search size={20} />
              </button>
            )}

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 ${
                    selectedCategory === category
                      ? 'bg-baby-pink text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-baby-pink hover:text-white'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:justify-between">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-baby-pink text-white' : 'bg-white text-gray-700'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-baby-pink text-white' : 'bg-white text-gray-700'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-2">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-xs sm:text-sm text-gray-500">
              {selectedCategory !== 'all' && `Category: ${selectedCategory}`}
              {searchTerm && ` | Search: "${searchTerm}"`}
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-4 md:gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleProductSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter size={64} className="mx-auto" />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;