import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { WHATSAPP_NUMBER, SOCIAL_MEDIA } from '../utils/constants';

const Contact = () => {
  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in your Chikankari kurtas. Can you please provide more information?";
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramClick = () => {
    window.open(SOCIAL_MEDIA.instagram, '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-dark-gray mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-baby-pink mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with us through WhatsApp for instant support or follow us on Instagram 
            to see our latest collections and behind-the-scenes content.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* WhatsApp Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-white" size={40} />
              </div>
              <h4 className="font-heading text-xl font-semibold text-dark-gray mb-3">
                WhatsApp Support
              </h4>
              <p className="text-gray-600 mb-6">
                Get instant responses to your queries about our products, sizing, 
                customization, and orders.
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Instagram className="text-white" size={40} />
              </div>
              <h4 className="font-heading text-xl font-semibold text-dark-gray mb-3">
                Follow on Instagram
              </h4>
              <p className="text-gray-600 mb-6">
                Discover our latest collections, see our artisans at work, and get 
                styling inspiration from our community.
              </p>
              <button
                onClick={handleInstagramClick}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Instagram size={20} />
                <span>Follow Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="bg-baby-pink/10 rounded-lg p-6 max-w-md mx-auto mt-12">
          <h4 className="font-heading text-lg font-semibold text-dark-gray mb-3 text-center">
            Quick Contact
          </h4>
          <div className="space-y-2 text-sm text-center">
            <p className="text-gray-700">
              <span className="font-medium">WhatsApp:</span> {WHATSAPP_NUMBER}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Instagram:</span> @kanchanchikankari
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;