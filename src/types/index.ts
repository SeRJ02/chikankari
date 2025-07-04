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

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}