/*
  # Create products table with complete schema

  1. New Tables
    - `products`
      - `id` (text, primary key)
      - `name` (text, not null)
      - `price` (numeric, not null, >= 0)
      - `original_price` (numeric, >= 0)
      - `images` (text array, default empty)
      - `description` (text, not null)
      - `fabric` (text, not null)
      - `embroidery_technique` (text, not null)
      - `sizes` (text array, default empty)
      - `care_instructions` (text array, default empty)
      - `heritage_story` (text, not null)
      - `in_stock` (boolean, default true)
      - `stock_count` (integer, default 0, >= 0)
      - `category` (text, not null)
      - `featured` (boolean, default false)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `products` table
    - Add policies for public read access
    - Add policies for admin-only write access

  3. Performance
    - Add indexes for common queries
    - Add trigger for automatic updated_at updates
*/

-- Create the update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing policies if they exist
DO $$
BEGIN
    DROP POLICY IF EXISTS "Anyone can read products" ON products;
    DROP POLICY IF EXISTS "Admins can insert products" ON products;
    DROP POLICY IF EXISTS "Admins can update products" ON products;
    DROP POLICY IF EXISTS "Admins can delete products" ON products;
EXCEPTION
    WHEN undefined_table THEN
        -- Table doesn't exist yet, which is fine
        NULL;
END $$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_products_updated_at ON products;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  original_price NUMERIC CHECK (original_price >= 0),
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  fabric TEXT NOT NULL,
  embroidery_technique TEXT NOT NULL,
  sizes TEXT[] NOT NULL DEFAULT '{}',
  care_instructions TEXT[] NOT NULL DEFAULT '{}',
  heritage_story TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT TRUE,
  stock_count INTEGER DEFAULT 0 CHECK (stock_count >= 0),
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for products table
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
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products (featured);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products (in_stock);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products (created_at DESC);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();