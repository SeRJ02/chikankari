import { createClient } from '@supabase/supabase-js';

// These environment variables will be automatically populated when you connect to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

console.log('🔧 Supabase: Initializing client with URL:', supabaseUrl ? 'Set' : 'Not set');
console.log('🔧 Supabase: Anon key:', supabaseAnonKey ? 'Set' : 'Not set');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// Test connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase: Connection error:', error);
  } else {
    console.log('✅ Supabase: Connected successfully');
    if (data.session) {
      console.log('✅ Supabase: Found existing session for:', data.session.user.email);
    }
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