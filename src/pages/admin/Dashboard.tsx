import React, { useState } from 'react';
import { X, Package, Users, TrendingUp, DollarSign, Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../types';
import ProductForm from '../../components/admin/ProductForm';
import ProductView from '../../components/admin/ProductView';

interface DashboardProps {
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const { products, updateProduct, deleteProduct, addProduct } = useProducts();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductView, setShowProductView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.inStock).length;
  const outOfStockProducts = totalProducts - inStockProducts;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stockCount), 0);

  const handleProductSave = (productData: Product) => {
    if (isEditing && selectedProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setShowProductForm(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setShowProductForm(true);
    setShowProductView(false);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowProductView(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      deleteProduct(productId);
    }
  };

  const handleStockToggle = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      updateProduct({
        ...product,
        inStock: !product.inStock,
        stockCount: product.inStock ? 0 : 1
      });
    }
  };

  const handleCloseForm = () => {
    setShowProductForm(false);
    setSelectedProduct(null);
    setIsEditing(false);
  };

  const handleCloseView = () => {
    setShowProductView(false);
    setSelectedProduct(null);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: Users },
    { id: 'settings', label: 'Settings', icon: Edit },
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-dark-gray">
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={logout}
              className="text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors duration-300"
            >
              Logout
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-2 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-baby-pink text-baby-pink'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} className="sm:w-5 sm:h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm">Total Products</p>
                    <p className="text-lg sm:text-2xl font-bold text-dark-gray">{totalProducts}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-baby-pink rounded-full flex items-center justify-center">
                    <Package className="text-white" size={16} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm">In Stock</p>
                    <p className="text-lg sm:text-2xl font-bold text-green-600">{inStockProducts}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="text-white" size={16} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm">Out of Stock</p>
                    <p className="text-lg sm:text-2xl font-bold text-red-600">{outOfStockProducts}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <Package className="text-white" size={16} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs sm:text-sm">Total Value</p>
                    <p className="text-lg sm:text-2xl font-bold text-dark-gray">₹{totalValue.toLocaleString()}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-muted-gold rounded-full flex items-center justify-center">
                    <DollarSign className="text-white" size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-dark-gray mb-4">
                Recent Products
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {products.slice(0, 5).map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-dark-gray text-sm sm:text-base truncate">{product.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">₹{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Search and Add */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                />
              </div>
              <button 
                onClick={handleAddProduct}
                className="btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base px-4 py-2"
              >
                <Plus size={16} />
                <span>Add Product</span>
              </button>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-dark-gray text-sm truncate">{product.name}</h4>
                          <p className="text-xs text-gray-500">{product.fabric}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full ml-2 flex-shrink-0">
                          {product.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-dark-gray">₹{product.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-600">Stock: {product.stockCount}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleStockToggle(product.id)}
                          className={`px-2 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
                            product.inStock
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewProduct(product)}
                            className="text-blue-600 hover:text-blue-800 transition-colors duration-300 p-1 hover:bg-blue-50 rounded"
                            title="View Product"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-yellow-600 hover:text-yellow-800 transition-colors duration-300 p-1 hover:bg-yellow-50 rounded"
                            title="Edit Product"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-300 p-1 hover:bg-red-50 rounded"
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-lg"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.fabric}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{product.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.stockCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleStockToggle(product.id)}
                            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300 ${
                              product.inStock
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewProduct(product)}
                              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 p-1 hover:bg-blue-50 rounded"
                              title="View Product"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-yellow-600 hover:text-yellow-800 transition-colors duration-300 p-1 hover:bg-yellow-50 rounded"
                              title="Edit Product"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-800 transition-colors duration-300 p-1 hover:bg-red-50 rounded"
                              title="Delete Product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first product'}
                  </p>
                  {!searchTerm && (
                    <button 
                      onClick={handleAddProduct}
                      className="btn-primary"
                    >
                      Add Your First Product
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-dark-gray mb-4">
              Order Management
            </h3>
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Order management features coming soon</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-dark-gray mb-4">
              Settings
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Title
                </label>
                <input
                  type="text"
                  defaultValue="Chikankari by Kanchan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  defaultValue="info@chikankaribykanchan.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  defaultValue="+91XXXXXXXXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
                />
              </div>
              <button className="btn-primary">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showProductForm && (
        <ProductForm
          product={selectedProduct}
          onSave={handleProductSave}
          onClose={handleCloseForm}
          isEditing={isEditing}
        />
      )}

      {showProductView && selectedProduct && (
        <ProductView
          product={selectedProduct}
          onClose={handleCloseView}
          onEdit={() => handleEditProduct(selectedProduct)}
        />
      )}
    </div>
  );
};

export default Dashboard;