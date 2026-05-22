import { useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { FavoritesProvider } from './hooks/useFavorites';
import { Product } from './types';

// The product detail modal is only needed once a product is opened,
// so it is code-split out of the initial bundle.
const ProductDetail = lazy(() => import('./components/ProductDetail'));

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-soft-white">
        <Header />
        <main>
          <Hero />
          <ProductGallery onProductSelect={handleProductSelect} />
          <About />
          <Contact />
        </main>
        <Footer />

        {selectedProduct && (
          <Suspense
            fallback={
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="loader" />
              </div>
            }
          >
            <ProductDetail
              product={selectedProduct}
              onClose={handleCloseProductDetail}
            />
          </Suspense>
        )}
      </div>
    </FavoritesProvider>
  );
}

export default App;
