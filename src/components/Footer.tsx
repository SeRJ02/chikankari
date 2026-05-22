import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_EMAIL, COMPANY_ADDRESS, WHATSAPP_NUMBER, SOCIAL_MEDIA } from '../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-dark-gray text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <img
                src="/favicon.svg"
                alt="Chikankari by Kanchan logo"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-lg font-heading font-bold">
                Chikankari by Kanchan
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Preserving the timeless art of Chikankari through authentic, 
              handcrafted kurtas that celebrate our rich heritage.
            </p>
            <div className="flex space-x-4">
              <a 
                href={SOCIAL_MEDIA.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-baby-pink transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={SOCIAL_MEDIA.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-baby-pink transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={SOCIAL_MEDIA.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-baby-pink transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
              <a 
                href={SOCIAL_MEDIA.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-baby-pink transition-colors duration-300"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-baby-pink transition-colors duration-300 text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop" className="text-gray-300 hover:text-baby-pink transition-colors duration-300 text-sm">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-baby-pink transition-colors duration-300 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-baby-pink transition-colors duration-300 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-baby-pink transition-colors duration-300 text-sm">
                  Traditional Kurtas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-baby-pink transition-colors duration-300 text-sm">
                  Contemporary Designs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-baby-pink transition-colors duration-300 text-sm">
                  Premium Collection
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-baby-pink transition-colors duration-300 text-sm">
                  Kurta Sets
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-baby-pink mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{COMPANY_ADDRESS}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-baby-pink flex-shrink-0" />
                <p className="text-gray-300 text-sm">{WHATSAPP_NUMBER}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-baby-pink flex-shrink-0" />
                <p className="text-gray-300 text-sm">{COMPANY_EMAIL}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 Chikankari by Kanchan. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-baby-pink transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-baby-pink transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-baby-pink transition-colors duration-300">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;