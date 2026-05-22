export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  fabric: string;
  embroideryTechnique: string;
  sizes: string[];
  careInstructions: string[];
  heritageStory: string;
  inStock: boolean;
  stockCount: number;
  category: string;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}