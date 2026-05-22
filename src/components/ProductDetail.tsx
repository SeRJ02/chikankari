import React, { useState } from 'react';
import { X, Heart, Share2, Minus, Plus, Star, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import LazyImage from './LazyImage';
import { WHATSAPP_NUMBER } from '../utils/constants';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  console.log('🎨 ProductDetail: Component rendering with product:', product.name, product);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'care' | 'heritage'>('description');

  const handleWhatsAppContact = () => {
    console.log('📱 ProductDetail: WhatsApp contact clicked for:', product.name);
    const message = `Hi! I'm interested in the ${product.name} (₹${product.price}). Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    console.log('📤 ProductDetail: Share clicked for:', product.name);
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleClose = () => {
    console.log('❌ ProductDetail: Close button clicked');
    onClose();
  };

  const tabs = [
    { id: 'description', label: 'Description', content: product.description },
    { id: 'care', label: 'Care Instructions', content: product.careInstructions },
    { id: 'heritage', label: 'Heritage Story', content: product.heritageStory },
  ];

  console.log('✅ ProductDetail: About to render modal for:', product.name);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex items-center justify-between z-10">
          <h2 className="font-heading text-lg sm:text-2xl font-bold text-dark-gray truncate pr-4">
            {product.name}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 flex-shrink-0"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 p-3 sm:p-6">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <LazyImage
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="h-64 sm:h-96 lg:h-[500px] rounded-lg"
              />

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-colors duration-300"
                  >
                    <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-colors duration-300"
                  >
                    <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                {selectedImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? 'border-baby-pink'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <LazyImage
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Price and Stock */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-xs sm:text-sm text-gray-500 capitalize bg-gray-100 px-2 sm:px-3 py-1 rounded-full w-fit">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="text-muted-gold sm:w-4 sm:h-4" size={14} fill="currentColor" />
                  <span className="text-xs sm:text-sm text-gray-600">4.8 (124 reviews)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-dark-gray">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base sm:text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
              </div>
            </div>

            {/* Fabric Information */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-dark-gray mb-2 text-sm sm:text-base">Product Details</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fabric:</span>
                  <span className="text-dark-gray">{product.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Technique:</span>
                  <span className="text-dark-gray">{product.embroideryTechnique}</span>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-dark-gray text-sm sm:text-base">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 sm:px-4 py-2 border rounded-lg font-medium transition-all duration-300 text-sm ${
                      selectedSize === size
                        ? 'border-baby-pink bg-baby-pink text-white'
                        : 'border-gray-300 hover:border-baby-pink'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold text-dark-gray text-sm sm:text-base">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <Minus size={14} className="sm:w-4 sm:h-4" />
                </button>
                <span className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg min-w-[50px] sm:min-w-[60px] text-center text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  <Plus size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppContact}
                disabled={!product.inStock}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-2 sm:py-3"
              >
                <MessageCircle size={16} className="sm:w-5 sm:h-5" />
                <span>Contact to Purchase</span>
              </button>

              <div className="flex space-x-3">
                <button className="flex-1 btn-secondary flex items-center justify-center space-x-2 text-sm py-2">
                  <Heart size={16} />
                  <span className="hidden sm:inline">Add to Wishlist</span>
                  <span className="sm:hidden">Wishlist</span>
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2 text-sm py-2"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'description' | 'care' | 'heritage')}
                className={`px-4 sm:px-6 py-3 font-medium transition-colors duration-300 text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-baby-pink text-baby-pink'
                    : 'text-gray-600 hover:text-dark-gray'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.description}</p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3">
                <h3 className="font-semibold text-dark-gray text-sm sm:text-base">Care Instructions</h3>
                <ul className="space-y-2">
                  {product.careInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-baby-pink">•</span>
                      <span className="text-gray-700 text-sm sm:text-base">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'heritage' && (
              <div className="prose max-w-none">
                <h3 className="font-semibold text-dark-gray mb-3 text-sm sm:text-base">Heritage Story</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{product.heritageStory}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;