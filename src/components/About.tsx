import React from 'react';
import { Users, Award, Heart, Globe } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-dark-gray mb-4">
            Our Heritage
          </h2>
          <div className="w-20 h-1 bg-baby-pink mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            For generations, we have been preserving and promoting the timeless art of 
            Lucknowi Chikankari, bringing authentic craftsmanship to modern fashion.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-baby-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={32} />
            </div>
            <h4 className="font-heading text-xl font-semibold text-dark-gray mb-2">
              Community
            </h4>
            <p className="text-gray-600">
              Supporting local artisans and preserving traditional skills for future generations.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-muted-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-white" size={32} />
            </div>
            <h4 className="font-heading text-xl font-semibold text-dark-gray mb-2">
              Excellence
            </h4>
            <p className="text-gray-600">
              Committed to the highest standards of quality and craftsmanship in every piece.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blush rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={32} />
            </div>
            <h4 className="font-heading text-xl font-semibold text-dark-gray mb-2">
              Passion
            </h4>
            <p className="text-gray-600">
              Every kurta is created with love, dedication, and respect for traditional artistry.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-baby-pink rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="text-white" size={32} />
            </div>
            <h4 className="font-heading text-xl font-semibold text-dark-gray mb-2">
              Global Reach
            </h4>
            <p className="text-gray-600">
              Bringing authentic Lucknowi Chikankari to fashion enthusiasts worldwide.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="font-heading text-2xl font-bold text-dark-gray mb-4">
              Experience the Tradition
            </h3>
            <p className="text-gray-600 mb-6">
              Discover our collection of authentic Chikankari kurtas and become part of our heritage story.
            </p>
            <button 
              onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Shop Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;