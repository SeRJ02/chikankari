import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-48 sm:h-64 object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300`}>
          {/* Action Buttons */}
          <div className={`absolute top-2 right-2 flex flex-col space-y-1 transform ${
            isHovered ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          } transition-all duration-300`}>
            <button 
              className="p-1.5 bg-white rounded-full shadow-md hover:bg-baby-pink hover:text-white transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                console.log('❤️ ProductCard: Heart button clicked for:', product.name);
              }}
            >
              <Heart size={12} />
            </button>
            <button 
              className="p-1.5 bg-white rounded-full shadow-md hover:bg-baby-pink hover:text-white transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                console.log('👁️ ProductCard: Eye button clicked for:', product.name);
                onViewDetails(product);
              }}
            >
              <Eye size={12} />
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

          {/* Quick Add Button */}
          <div className={`absolute bottom-2 left-2 right-2 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          } transition-all duration-300`}>
            <button 
              className="w-full bg-baby-pink hover:bg-baby-pink/90 text-white py-1.5 rounded-lg font-medium flex items-center justify-center space-x-1 transition-colors duration-300 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                console.log('🛒 ProductCard: Quick Add button clicked for:', product.name);
              }}
            >
              <ShoppingCart size={12} />
              <span>Quick Add</span>
            </button>
          </div>
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