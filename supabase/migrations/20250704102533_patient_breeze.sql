/*
  # Additional Features and Optimizations

  1. Additional Tables
    - `categories` for product categorization
    - `orders` for future order management
    - `order_items` for order details

  2. Views
    - `featured_products` view for easy access
    - `product_stats` view for analytics

  3. Functions
    - Search functionality
    - Inventory management helpers

  4. Additional Indexes
    - Full-text search indexes
    - Performance optimizations
*/

-- =============================================
-- CATEGORIES TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS categories (
  id text PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  image_url text,
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Admins can manage categories"
  ON categories
  FOR ALL
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

-- Categories updated_at trigger
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO categories (id, name, description, sort_order) VALUES
('traditional', 'Traditional', 'Classic Chikankari designs with timeless appeal', 1),
('contemporary', 'Contemporary', 'Modern interpretations of traditional Chikankari', 2),
('premium', 'Premium', 'Luxury Chikankari pieces with premium materials', 3),
('sets', 'Sets', 'Complete Chikankari ensembles and matching sets', 4)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- ORDERS TABLE (for future use)
-- =============================================

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  shipping_address jsonb NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage orders"
  ON orders
  FOR ALL
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

-- Orders updated_at trigger
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ORDER ITEMS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id text REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL CHECK (quantity > 0),
  size text NOT NULL,
  unit_price numeric NOT NULL CHECK (unit_price >= 0),
  total_price numeric NOT NULL CHECK (total_price >= 0),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on order_items
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Order items policies
CREATE POLICY "Users can read own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can read all order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage order items"
  ON order_items
  FOR ALL
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

-- =============================================
-- VIEWS
-- =============================================

-- Featured products view
CREATE OR REPLACE VIEW featured_products AS
SELECT *
FROM products
WHERE featured = true AND in_stock = true
ORDER BY created_at DESC;

-- Product statistics view
CREATE OR REPLACE VIEW product_stats AS
SELECT
  category,
  COUNT(*) as total_products,
  COUNT(*) FILTER (WHERE in_stock = true) as in_stock_count,
  COUNT(*) FILTER (WHERE featured = true) as featured_count,
  AVG(price) as avg_price,
  MIN(price) as min_price,
  MAX(price) as max_price,
  SUM(stock_count) as total_stock
FROM products
GROUP BY category;

-- =============================================
-- SEARCH FUNCTION
-- =============================================

-- Create search function for products
CREATE OR REPLACE FUNCTION search_products(search_term text)
RETURNS TABLE (
  id text,
  name text,
  price numeric,
  original_price numeric,
  images text[],
  description text,
  fabric text,
  embroidery_technique text,
  sizes text[],
  care_instructions text[],
  heritage_story text,
  in_stock boolean,
  stock_count integer,
  category text,
  featured boolean,
  created_at timestamptz,
  updated_at timestamptz,
  relevance real
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.price,
    p.original_price,
    p.images,
    p.description,
    p.fabric,
    p.embroidery_technique,
    p.sizes,
    p.care_instructions,
    p.heritage_story,
    p.in_stock,
    p.stock_count,
    p.category,
    p.featured,
    p.created_at,
    p.updated_at,
    (
      CASE
        WHEN p.name ILIKE '%' || search_term || '%' THEN 1.0
        WHEN p.description ILIKE '%' || search_term || '%' THEN 0.8
        WHEN p.fabric ILIKE '%' || search_term || '%' THEN 0.6
        WHEN p.category ILIKE '%' || search_term || '%' THEN 0.4
        ELSE 0.2
      END
    ) as relevance
  FROM products p
  WHERE
    p.name ILIKE '%' || search_term || '%' OR
    p.description ILIKE '%' || search_term || '%' OR
    p.fabric ILIKE '%' || search_term || '%' OR
    p.category ILIKE '%' || search_term || '%' OR
    p.embroidery_technique ILIKE '%' || search_term || '%'
  ORDER BY relevance DESC, p.featured DESC, p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- ADDITIONAL INDEXES
-- =============================================

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_products_name_search ON products USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_products_description_search ON products USING gin(to_tsvector('english', description));

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_featured_category ON products(featured, category);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- =============================================
-- INVENTORY MANAGEMENT FUNCTIONS
-- =============================================

-- Function to update stock
CREATE OR REPLACE FUNCTION update_product_stock(product_id text, quantity_change integer)
RETURNS boolean AS $$
DECLARE
  current_stock integer;
  new_stock integer;
BEGIN
  -- Get current stock
  SELECT stock_count INTO current_stock
  FROM products
  WHERE id = product_id;
  
  IF current_stock IS NULL THEN
    RETURN false; -- Product not found
  END IF;
  
  -- Calculate new stock
  new_stock := current_stock + quantity_change;
  
  -- Ensure stock doesn't go negative
  IF new_stock < 0 THEN
    new_stock := 0;
  END IF;
  
  -- Update stock and in_stock status
  UPDATE products
  SET
    stock_count = new_stock,
    in_stock = (new_stock > 0),
    updated_at = now()
  WHERE id = product_id;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Function to check low stock products
CREATE OR REPLACE FUNCTION get_low_stock_products(threshold integer DEFAULT 5)
RETURNS TABLE (
  id text,
  name text,
  stock_count integer,
  category text
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.name,
    p.stock_count,
    p.category
  FROM products p
  WHERE p.stock_count <= threshold AND p.in_stock = true
  ORDER BY p.stock_count ASC, p.name;
END;
$$ LANGUAGE plpgsql;