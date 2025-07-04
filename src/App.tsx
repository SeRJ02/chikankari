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
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login') {
        setShowLogin(true);
      } else if (hash === '#admin') {
        if (isAuthenticated && user?.role === 'admin') {
          setShowDashboard(true);
        } else {
          setShowLogin(true);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated, user]);

  const handleCloseLogin = () => {
    setShowLogin(false);
    window.location.hash = '';
  };

  const handleCloseDashboard = () => {
    setShowDashboard(false);
    window.location.hash = '';
  };

  const handleProductSelect = (product: Product) => {
    console.log('🎯 App: Product selected, updating selectedProduct state:', product.name, product);
    setSelectedProduct(product);
    console.log('🎯 App: selectedProduct state should now be:', product);
  };

  const handleCloseProductDetail = () => {
    console.log('❌ App: Closing product detail modal');
    setSelectedProduct(null);
  };

  // Debug log for selectedProduct state
  console.log('🔍 App: Current selectedProduct state:', selectedProduct);
  console.log('🔍 App: Should show ProductDetail modal?', !!selectedProduct);

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
        <>
          {console.log('🎨 App: Rendering ProductDetail component with product:', selectedProduct.name)}
          <ProductDetail
            product={selectedProduct}
            onClose={handleCloseProductDetail}
          />
        </>
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