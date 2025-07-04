import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Product) => void;
  onClose: () => void;
  isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onClose, isEditing = false }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    images: [''],
    description: '',
    fabric: '',
    embroideryTechnique: '',
    sizes: ['S', 'M', 'L', 'XL'],
    careInstructions: ['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
    heritageStory: '',
    inStock: true,
    stockCount: 0,
    category: 'Traditional',
    featured: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product && isEditing) {
      setFormData(product);
    }
  }, [product, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...(formData.images || [''])];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || ['']), '']
    }));
  };

  const removeImageField = (index: number) => {
    const newImages = (formData.images || ['']).filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      images: newImages.length > 0 ? newImages : ['']
    }));
  };

  const handleSizeToggle = (size: string) => {
    const currentSizes = formData.sizes || [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];
    
    setFormData(prev => ({
      ...prev,
      sizes: newSizes
    }));
  };

  const handleCareInstructionChange = (index: number, value: string) => {
    const newInstructions = [...(formData.careInstructions || [''])];
    newInstructions[index] = value;
    setFormData(prev => ({
      ...prev,
      careInstructions: newInstructions
    }));
  };

  const addCareInstruction = () => {
    setFormData(prev => ({
      ...prev,
      careInstructions: [...(prev.careInstructions || ['']), '']
    }));
  };

  const removeCareInstruction = (index: number) => {
    const newInstructions = (formData.careInstructions || ['']).filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      careInstructions: newInstructions.length > 0 ? newInstructions : ['']
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData: Product = {
        id: isEditing && product ? product.id : Date.now().toString(),
        name: formData.name || '',
        price: formData.price || 0,
        originalPrice: formData.originalPrice || undefined,
        images: (formData.images || ['']).filter(img => img.trim() !== ''),
        description: formData.description || '',
        fabric: formData.fabric || '',
        embroideryTechnique: formData.embroideryTechnique || '',
        sizes: formData.sizes || [],
        careInstructions: (formData.careInstructions || ['']).filter(inst => inst.trim() !== ''),
        heritageStory: formData.heritageStory || '',
        inStock: formData.inStock || false,
        stockCount: formData.stockCount || 0,
        category: formData.category || 'Traditional',
        featured: formData.featured || false,
      };

      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onSave(productData);
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const categories = ['Traditional', 'Contemporary', 'Premium', 'Sets'];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h2 className="font-heading text-2xl font-bold text-dark-gray">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-semibold text-dark-gray">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice || ''}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Count *
                </label>
                <input
                  type="number"
                  name="stockCount"
                  value={formData.stockCount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-baby-pink border-gray-300 rounded focus:ring-baby-pink"
                  />
                  <span className="text-sm font-medium text-gray-700">In Stock</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-baby-pink border-gray-300 rounded focus:ring-baby-pink"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Product</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                placeholder="Enter product description"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-semibold text-dark-gray">Product Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fabric *
                </label>
                <input
                  type="text"
                  name="fabric"
                  value={formData.fabric}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                  placeholder="e.g., 100% Pure Cotton"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Embroidery Technique *
                </label>
                <input
                  type="text"
                  name="embroideryTechnique"
                  value={formData.embroideryTechnique}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                  placeholder="e.g., Hand-embroidered Chikankari"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heritage Story *
              </label>
              <textarea
                name="heritageStory"
                value={formData.heritageStory}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                placeholder="Tell the story behind this product's heritage and craftsmanship"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-semibold text-dark-gray">Product Images</h3>
            
            <div className="space-y-4">
              {(formData.images || ['']).map((image, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                      placeholder="Enter image URL"
                    />
                  </div>
                  {(formData.images || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                    >
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addImageField}
                className="flex items-center space-x-2 text-baby-pink hover:text-baby-pink/80 transition-colors duration-300"
              >
                <Plus size={20} />
                <span>Add Another Image</span>
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-semibold text-dark-gray">Available Sizes</h3>
            
            <div className="flex flex-wrap gap-3">
              {availableSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-4 py-2 border rounded-lg font-medium transition-all duration-300 ${
                    (formData.sizes || []).includes(size)
                      ? 'border-baby-pink bg-baby-pink text-white'
                      : 'border-gray-300 hover:border-baby-pink'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Care Instructions */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-semibold text-dark-gray">Care Instructions</h3>
            
            <div className="space-y-4">
              {(formData.careInstructions || ['']).map((instruction, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={instruction}
                      onChange={(e) => handleCareInstructionChange(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                      placeholder="Enter care instruction"
                    />
                  </div>
                  {(formData.careInstructions || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCareInstruction(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                    >
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addCareInstruction}
                className="flex items-center space-x-2 text-baby-pink hover:text-baby-pink/80 transition-colors duration-300"
              >
                <Plus size={20} />
                <span>Add Care Instruction</span>
              </button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="loader"></div>
                  <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
                </>
              ) : (
                <span>{isEditing ? 'Update Product' : 'Create Product'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;