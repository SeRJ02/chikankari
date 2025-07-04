/*
  # Seed Initial Data

  1. Sample Products
    - Insert complete product catalog with authentic Chikankari designs
    - Include all product details, images, and metadata

  2. Admin Setup
    - Ensure admin user can be created properly
    - Set up initial configuration
*/

-- Insert sample products
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
  'Exquisite white cotton kurta featuring traditional chikankari embroidery with intricate floral patterns. This timeless piece showcases the finest craftsmanship of Lucknowi artisans.',
  '100% Pure Cotton',
  'Hand-embroidered Chikankari',
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'This kurta represents the timeless elegance of Lucknowi chikankari, featuring traditional tepchi and bakhiya stitches passed down through generations of skilled artisans.',
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
  'Delicate pastel pink kurta with shadow work chikankari embroidery, perfect for festive occasions. The subtle color palette makes it versatile for both day and evening wear.',
  'Cotton Silk Blend',
  'Shadow Work Chikankari',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'Crafted with the finest shadow work technique, this kurta showcases the evolution of chikankari artistry while maintaining its traditional roots.',
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
  'Regal royal blue kurta with gold thread chikankari work, ideal for special celebrations. The rich color and metallic accents create a luxurious appearance.',
  'Pure Silk',
  'Gold Thread Chikankari',
  ARRAY['M', 'L', 'XL', 'XXL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'This luxurious piece combines traditional chikankari with gold thread work, reflecting the royal heritage of Lucknowi craftsmanship.',
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
  'Fresh mint green kurta with delicate chikankari embroidery, perfect for summer occasions. The breathable fabric and soothing color make it ideal for warm weather.',
  'Cotton Voile',
  'Traditional Chikankari',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'A modern interpretation of classic chikankari, this kurta brings freshness to traditional wear while honoring age-old techniques.',
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
  'Elegant cream kurta set with matching palazzo pants, featuring intricate chikankari work. This complete ensemble is perfect for formal occasions and celebrations.',
  'Cotton Georgette',
  'Jaali Work Chikankari',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'This complete set showcases the versatility of chikankari, perfect for formal occasions while maintaining comfort and elegance.',
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
  'Sophisticated black kurta with white chikankari embroidery, creating a striking contrast. This bold piece makes a contemporary fashion statement.',
  'Cotton Silk',
  'Contrast Chikankari',
  ARRAY['M', 'L', 'XL', 'XXL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'A contemporary take on traditional chikankari, this kurta makes a bold fashion statement while respecting the craft''s heritage.',
  true,
  7,
  'Contemporary',
  false
),
(
  '7',
  'Lavender Chikan Kurta',
  3099,
  3899,
  ARRAY[
    'https://images.pexels.com/photos/8532628/pexels-photo-8532628.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
    'https://images.pexels.com/photos/8532629/pexels-photo-8532629.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop'
  ],
  'Elegant lavender kurta with intricate chikankari embroidery featuring floral motifs. The soft purple hue adds a touch of sophistication to any wardrobe.',
  'Cotton Chanderi',
  'Floral Chikankari',
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'This beautiful piece showcases the delicate art of floral chikankari, where each petal is carefully embroidered by hand.',
  true,
  10,
  'Traditional',
  false
),
(
  '8',
  'Peach Chikan Kurta Set',
  4599,
  5799,
  ARRAY[
    'https://images.pexels.com/photos/8532630/pexels-photo-8532630.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop',
    'https://images.pexels.com/photos/8532631/pexels-photo-8532631.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop'
  ],
  'Beautiful peach kurta set with dupatta, featuring elaborate chikankari work. This three-piece ensemble is perfect for weddings and special occasions.',
  'Pure Cotton with Silk Dupatta',
  'Traditional Chikankari with Gota Work',
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Dry clean only', 'Do not wring or twist', 'Iron on low heat', 'Store in breathable fabric bag'],
  'This exquisite set combines traditional chikankari with gota work, representing the pinnacle of Lucknowi craftsmanship.',
  true,
  6,
  'Premium',
  true
)
ON CONFLICT (id) DO NOTHING;