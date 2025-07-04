/*
  # Seed initial data

  1. Initial Data
    - Insert sample products from the mock data
    - Create admin user profile if it doesn't exist

  2. Notes
    - This migration is safe to run multiple times
    - Uses INSERT ... ON CONFLICT DO NOTHING for safety
*/

-- Insert sample products (safe to run multiple times)
INSERT INTO products (
  id, name, price, original_price, images, description, fabric, embroidery_technique,
  sizes, care_instructions, heritage_story, in_stock, stock_count, category, featured
) VALUES 
(
  '1',
  'Classic White Chikan Kurta',
  2999,
  3999,
  ARRAY[
    'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
    'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop'
  ],
  'Exquisite white cotton kurta featuring traditional chikankari embroidery with intricate floral patterns.',
  '100% Pure Cotton',
  'Hand-embroidered Chikankari',
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'This kurta represents the timeless elegance of Lucknowi chikankari, featuring traditional tepchi and bakhiya stitches.',
  true,
  15,
  'Traditional',
  true
),
(
  '2',
  'Pastel Pink Chikan Kurta',
  3299,
  4299,
  ARRAY[
    'https://images.pexels.com/photos/8532618/pexels-photo-8532618.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
    'https://images.pexels.com/photos/8532619/pexels-photo-8532619.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop'
  ],
  'Delicate pastel pink kurta with shadow work chikankari embroidery, perfect for festive occasions.',
  'Cotton Silk Blend',
  'Shadow Work Chikankari',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'Crafted with the finest shadow work technique, this kurta showcases the evolution of chikankari artistry.',
  true,
  8,
  'Contemporary',
  true
),
(
  '3',
  'Royal Blue Chikan Kurta',
  3599,
  4599,
  ARRAY[
    'https://images.pexels.com/photos/8532620/pexels-photo-8532620.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
    'https://images.pexels.com/photos/8532621/pexels-photo-8532621.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop'
  ],
  'Regal royal blue kurta with gold thread chikankari work, ideal for special celebrations.',
  'Pure Silk',
  'Gold Thread Chikankari',
  ARRAY['M', 'L', 'XL', 'XXL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'This luxurious piece combines traditional chikankari with gold thread work, reflecting royal heritage.',
  true,
  5,
  'Premium',
  false
),
(
  '4',
  'Mint Green Chikan Kurta',
  2799,
  3499,
  ARRAY[
    'https://images.pexels.com/photos/8532622/pexels-photo-8532622.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
    'https://images.pexels.com/photos/8532623/pexels-photo-8532623.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop'
  ],
  'Fresh mint green kurta with delicate chikankari embroidery, perfect for summer occasions.',
  'Cotton Voile',
  'Traditional Chikankari',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'A modern interpretation of classic chikankari, this kurta brings freshness to traditional wear.',
  true,
  12,
  'Contemporary',
  false
),
(
  '5',
  'Cream Chikan Kurta with Palazzo',
  4299,
  5299,
  ARRAY[
    'https://images.pexels.com/photos/8532624/pexels-photo-8532624.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
    'https://images.pexels.com/photos/8532625/pexels-photo-8532625.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop'
  ],
  'Elegant cream kurta set with matching palazzo pants, featuring intricate chikankari work.',
  'Cotton Georgette',
  'Jaali Work Chikankari',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'This complete set showcases the versatility of chikankari, perfect for formal occasions.',
  false,
  0,
  'Sets',
  true
),
(
  '6',
  'Black Chikan Kurta',
  3199,
  3999,
  ARRAY[
    'https://images.pexels.com/photos/8532626/pexels-photo-8532626.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
    'https://images.pexels.com/photos/8532627/pexels-photo-8532627.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop'
  ],
  'Sophisticated black kurta with white chikankari embroidery, creating a striking contrast.',
  'Cotton Silk',
  'Contrast Chikankari',
  ARRAY['M', 'L', 'XL', 'XXL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'A contemporary take on traditional chikankari, this kurta makes a bold fashion statement.',
  true,
  7,
  'Contemporary',
  false
)
ON CONFLICT (id) DO NOTHING;