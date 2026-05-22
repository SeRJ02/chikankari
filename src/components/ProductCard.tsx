import React, { useState } from 'react';
import { Heart, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import LazyImage from './LazyImage';
import { useFavorites } from '../hooks/useFavorites';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(product.id);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    console.log('🔍 ProductCard: Card clicked for product:', product.name, product);
    onViewDetails(product);
  };

  return (
    <div 
      className="card overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100">
        <LazyImage
          src={product.images[0]}
          alt={product.name}
          className="h-48 sm:h-64"
          imgClassName={`transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300`}>
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col space-y-1.5">
            <button
              aria-label={liked ? 'Remove from liked products' : 'Add to liked products'}
              className="p-1.5 bg-white rounded-full shadow-md transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product.id);
              }}
            >
              <Heart
                size={14}
                className={liked ? 'text-baby-pink' : 'text-gray-400'}
                fill={liked ? 'currentColor' : 'none'}
              />
            </button>
            <button
              aria-label="View details"
              className={`p-1.5 bg-white rounded-full shadow-md text-gray-600 hover:bg-baby-pink hover:text-white transition-all duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product);
              }}
            >
              <Eye size={14} />
            </button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </div>
          )}

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-muted-gold text-white px-2 py-1 rounded-full text-xs font-medium">
              {discountPercentage}% OFF
            </div>
          )}

        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 capitalize">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="text-muted-gold" size={12} fill="currentColor" />
            <span className="text-xs text-gray-600">4.8</span>
          </div>
        </div>

        <h3 className="font-heading text-sm font-semibold text-dark-gray group-hover:text-baby-pink transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-dark-gray">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="text-xs text-gray-500">
            {product.inStock ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Fabric Info */}
        <div className="text-xs text-gray-500 border-t pt-2">
          <span className="font-medium">Fabric:</span> {product.fabric}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;