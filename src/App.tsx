import React, { useState, useEffect } from 'react';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import ProductDetail from './components/ProductDetail';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import { Product } from './types';
import { useAuth } from './hooks/useAuth';

const AppContent = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      console.log('🔗 App: Hash changed to:', hash);
      
      if (hash === '#login') {
        console.log('🔐 App: Showing login modal');
        setShowLogin(true);
        setShowDashboard(false);
      } else if (hash === '#admin') {
        console.log('🔧 App: Admin hash detected, auth state:', { isAuthenticated, userRole: user?.role });
        if (isAuthenticated && user?.role === 'admin') {
          console.log('✅ App: Showing admin dashboard');
          setShowDashboard(true);
          setShowLogin(false);
        } else if (isAuthenticated && user?.role !== 'admin') {
          console.log('❌ App: User is not admin, redirecting to home');
          alert('Access denied. Admin privileges required.');
          window.location.hash = '';
        } else {
          console.log('🔐 App: Not authenticated, showing login');
          setShowLogin(true);
          setShowDashboard(false);
        }
      } else {
        console.log('🏠 App: Closing all modals');
        setShowLogin(false);
        setShowDashboard(false);
      }
    };

    // Handle initial hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated, user]);

  // Auto-redirect to dashboard after successful admin login
  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin' && showLogin) {
      console.log('✅ App: Admin logged in, redirecting to dashboard');
      setTimeout(() => {
        setShowLogin(false);
        setShowDashboard(true);
        window.location.hash = '#admin';
      }, 1000);
    }
  }, [isAuthenticated, user, showLogin]);

  const handleCloseLogin = () => {
    console.log('❌ App: Closing login modal');
    setShowLogin(false);
    window.location.hash = '';
  };

  const handleCloseDashboard = () => {
    console.log('❌ App: Closing dashboard');
    setShowDashboard(false);
    window.location.hash = '';
  };

  const handleProductSelect = (product: Product) => {
    console.log('🎯 App: Product selected:', product.name);
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    console.log('❌ App: Closing product detail');
    setSelectedProduct(null);
  };

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <div className="loader mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  console.log('🔍 App: Current state:', {
    isAuthenticated,
    userRole: user?.role,
    showLogin,
    showDashboard,
    selectedProduct: selectedProduct?.name
  });

  return (
    <div className="min-h-screen bg-soft-white">
      <Header />
      <main>
        <Hero />
        <ProductGallery onProductSelect={handleProductSelect} />
        <About />
        <Contact />
      </main>
      <Footer />

      {/* Modals */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseProductDetail}
        />
      )}

      {showLogin && (
        <Login onClose={handleCloseLogin} />
      )}

      {showDashboard && isAuthenticated && user?.role === 'admin' && (
        <Dashboard onClose={handleCloseDashboard} />
      )}
    </div>
  );
};

function App() {
  console.log('🚀 App: Application starting...');
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;