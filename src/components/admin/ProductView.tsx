import React from 'react';
import { X, Star, Package, Tag, Palette, Scissors, Heart, Share2 } from 'lucide-react';
import { Product } from '../../types';

interface ProductViewProps {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
}

const ProductView: React.FC<ProductViewProps> = ({ product, onClose, onEdit }) => {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="font-heading text-2xl font-bold text-dark-gray">
              Product Details
            </h2>
            <p className="text-gray-600">Preview how this product appears to customers</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onEdit}
              className="btn-secondary flex items-center space-x-2"
            >
              <span>Edit Product</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              
              {/* Stock Status */}
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </div>
              )}

              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div className="absolute top-4 right-4 bg-muted-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 capitalize bg-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="text-muted-gold" size={16} fill="currentColor" />
                  <span className="text-sm text-gray-600">4.8 (124 reviews)</span>
                </div>
              </div>

              <h1 className="font-heading text-3xl font-bold text-dark-gray">
                {product.name}
              </h1>

              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-dark-gray">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
              </div>

              {product.featured && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-baby-pink text-white">
                  <Star size={14} className="mr-1" />
                  Featured Product
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-dark-gray">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-dark-gray flex items-center space-x-2">
                <Package size={20} />
                <span>Product Details</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Palette size={16} className="text-gray-500" />
                  <span className="text-gray-600">Fabric:</span>
                  <span className="text-dark-gray font-medium">{product.fabric}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Scissors size={16} className="text-gray-500" />
                  <span className="text-gray-600">Technique:</span>
                  <span className="text-dark-gray font-medium">{product.embroideryTechnique}</span>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <h3 className="font-semibold text-dark-gray">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <span
                    key={size}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Care Instructions */}
            <div className="space-y-3">
              <h3 className="font-semibold text-dark-gray">Care Instructions</h3>
              <ul className="space-y-2">
                {product.careInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-baby-pink">•</span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Heritage Story */}
            <div className="space-y-3">
              <h3 className="font-semibold text-dark-gray">Heritage Story</h3>
              <p className="text-gray-700 leading-relaxed text-sm">{product.heritageStory}</p>
            </div>

            {/* Action Buttons Preview */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-dark-gray">Customer Actions Preview</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center space-x-2">
                  <span>Contact to Purchase</span>
                </button>
                <div className="flex space-x-3">
                  <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                    <Heart size={20} />
                    <span>Add to Wishlist</span>
                  </button>
                  <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;