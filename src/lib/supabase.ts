import { createClient } from '@supabase/supabase-js';

// These environment variables will be automatically populated when you connect to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database types (will be auto-generated when you connect to Supabase)
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          original_price: number | null;
          images: string[];
          description: string;
          fabric: string;
          embroidery_technique: string;
          sizes: string[];
          care_instructions: string[];
          heritage_story: string;
          in_stock: boolean;
          stock_count: number;
          category: string;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          original_price?: number | null;
          images: string[];
          description: string;
          fabric: string;
          embroidery_technique: string;
          sizes: string[];
          care_instructions: string[];
          heritage_story: string;
          in_stock?: boolean;
          stock_count?: number;
          category: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          original_price?: number | null;
          images?: string[];
          description?: string;
          fabric?: string;
          embroidery_technique?: string;
          sizes?: string[];
          care_instructions?: string[];
          heritage_story?: string;
          in_stock?: boolean;
          stock_count?: number;
          category?: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'user';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role?: 'admin' | 'user';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'admin' | 'user';
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}