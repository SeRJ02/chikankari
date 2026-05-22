import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import LazyImage from './LazyImage';

const Hero = () => {
  const handleShopNow = () => {
    const shopSection = document.querySelector('#shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <LazyImage
          src="https://www.giffywalls.in/cdn/shop/files/C766-Royal_Amusement.jpg"
          alt="Royal Amusement Park Background"
          eager
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-left sm:text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-6">
            <Star className="text-muted-gold" size={14} />
            <span className="text-xs sm:text-sm font-medium text-dark-gray">Authentic Chikankari Craftsmanship</span>
            <Star className="text-muted-gold" size={14} />
          </div>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight text-left sm:text-center">
          Handcrafted
          <br />
          <span className="text-baby-pink">Chikankari for you</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-left sm:text-center">
          Discover the timeless beauty of authentic Chikankari embroidery, where centuries-old 
          tradition meets contemporary elegance. Each piece tells a story of skilled artisans 
          and heritage craftsmanship.
        </p>

        <div className="flex justify-center">
          <button 
            onClick={handleShopNow}
            className="coral-pink-button w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg text-white flex items-center justify-center space-x-2 sm:space-x-3 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <span>Shop Collection</span>
            <ArrowRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;