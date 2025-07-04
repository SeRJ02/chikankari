import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Settings, Shield } from 'lucide-react';
import { NAVIGATION_LINKS } from '../utils/constants';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAdminPanelClick = () => {
    window.location.hash = '#admin';
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'sticky-header shadow-lg' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Text Logo */}
          <div className="flex items-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-dark-gray">
              <span className="text-baby-pink">Chikankari</span>
              <span className="text-muted-gold ml-2">by</span>
              <span className="text-dark-gray ml-2">Kanchan</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-dark-gray hover:text-baby-pink transition-colors duration-300 text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-blush rounded-full transition-colors duration-300">
              <ShoppingBag size={20} className="text-dark-gray" />
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {user?.role === 'admin' && (
                  <button
                    onClick={handleAdminPanelClick}
                    className="flex items-center space-x-2 bg-gradient-to-r from-baby-pink to-blush hover:from-baby-pink/90 hover:to-blush/90 text-dark-gray px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg border border-baby-pink/20"
                  >
                    <Shield size={16} />
                    <span>Admin Dashboard</span>
                  </button>
                )}
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-baby-pink rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-dark-gray">{user?.name}</span>
                    <button
                      onClick={logout}
                      className="text-xs text-baby-pink hover:text-baby-pink/80 hover:underline transition-colors duration-300 text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => window.location.href = '#login'}
                className="flex items-center space-x-2 bg-baby-pink hover:bg-baby-pink/90 text-dark-gray px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <User size={16} />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-blush rounded-full transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 mt-4">
              {NAVIGATION_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-dark-gray hover:text-baby-pink transition-colors duration-300 text-sm text-left"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button className="p-2 hover:bg-blush rounded-full transition-colors duration-300">
                  <ShoppingBag size={20} className="text-dark-gray" />
                </button>
                
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-3 w-full">
                    <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg">
                      <div className="w-8 h-8 bg-baby-pink rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-dark-gray">{user?.name}</span>
                        <span className="text-xs text-gray-500">{user?.role}</span>
                      </div>
                    </div>
                    
                    {user?.role === 'admin' && (
                      <button
                        onClick={handleAdminPanelClick}
                        className="flex items-center space-x-2 bg-gradient-to-r from-baby-pink to-blush hover:from-baby-pink/90 hover:to-blush/90 text-dark-gray px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg w-full justify-center border border-baby-pink/20"
                      >
                        <Shield size={16} />
                        <span>Admin Dashboard</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-sm text-baby-pink hover:text-baby-pink/80 hover:underline text-left transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      window.location.href = '#login';
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 bg-baby-pink hover:bg-baby-pink/90 text-dark-gray px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg w-full justify-center"
                  >
                    <User size={16} />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;