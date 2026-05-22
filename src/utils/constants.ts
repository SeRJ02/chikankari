// Get configuration from environment variables with fallbacks
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '+91XXXXXXXXXX';
export const COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL || 'info@chikankaribykanchan.com';
export const COMPANY_ADDRESS = import.meta.env.VITE_COMPANY_ADDRESS || 'Lucknow, Uttar Pradesh, India';
// Social Media URLs
export const SOCIAL_MEDIA = {
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/kanchanchikankari/?hl=en',
  facebook: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com/chikankaribykanchan',
  twitter: import.meta.env.VITE_TWITTER_URL || 'https://twitter.com/chikankaribykanchan',
  youtube: import.meta.env.VITE_YOUTUBE_URL || 'https://youtube.com/chikankaribykanchan',
};

export const NAVIGATION_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Shop', href: '#shop' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const CARE_INSTRUCTIONS = [
  'Dry clean only',
  'Do not wring or twist',
  'Iron on low heat',
  'Store in breathable fabric bag',
  'Avoid direct sunlight when drying',
];

export const HERITAGE_STORY = `
Chikankari is a traditional embroidery art form that originated in Lucknow, the capital city of Uttar Pradesh, India. 
This delicate and intricate needlework has been passed down through generations of skilled artisans, each adding their 
own touch to this timeless craft. Our kurtas represent the finest tradition of this heritage art, combining authentic 
techniques with contemporary designs to create pieces that are both timeless and modern.
`;

// Validation helper to check if required environment variables are set
export const validateEnvironmentVariables = () => {
  const requiredVars = ['VITE_SANITY_PROJECT_ID'];

  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars);
    console.warn('The app will run with sample data until Sanity is configured.');
  }

  return missingVars.length === 0;
};