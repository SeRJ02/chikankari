/*
  # Create products table for e-commerce functionality

  1. New Tables
    - `products`
      - `id` (text, primary key)
      - `name` (text, not null)
      - `price` (numeric, not null)
      - `original_price` (numeric, nullable)
      - `images` (text array, not null)
      - `description` (text, not null)
      - `fabric` (text, not null)
      - `embroidery_technique` (text, not null)
      - `sizes` (text array, not null)
      - `care_instructions` (text array, not null)
      - `heritage_story` (text, not null)
      - `in_stock` (boolean, default true)
      - `stock_count` (integer, default 0)
      - `category` (text, not null)
      - `featured` (boolean, default false)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access
    - Add policy for admin write access

  3. Indexes
    - Create indexes for better query performance
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  original_price numeric CHECK (original_price >= 0),
  images text[] NOT NULL DEFAULT '{}',
  description text NOT NULL,
  fabric text NOT NULL,
  embroidery_technique text NOT NULL,
  sizes text[] NOT NULL DEFAULT '{}',
  care_instructions text[] NOT NULL DEFAULT '{}',
  heritage_story text NOT NULL,
  in_stock boolean DEFAULT true,
  stock_count integer DEFAULT 0 CHECK (stock_count >= 0),
  category text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Create trigger for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();