import { createClient } from '@supabase/supabase-js';

// Get environment variables with proper validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Config Check:');
console.log('- URL from env:', supabaseUrl);
console.log('- Key from env (first 20 chars):', supabaseAnonKey?.substring(0, 20) + '...');
console.log('- Current origin:', window.location.origin);

// Validate environment variables
if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseUrl === 'your_supabase_project_url') {
  console.warn('⚠️ Supabase URL not configured. Using mock mode.');
}

if (!supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY' || supabaseAnonKey === 'your_supabase_anon_key') {
  console.warn('⚠️ Supabase Anon Key not configured. Using mock mode.');
}

// Use valid fallback URLs to prevent URL constructor errors
const validSupabaseUrl = (supabaseUrl && supabaseUrl.startsWith('https://')) 
  ? supabaseUrl 
  : 'https://placeholder.supabase.co';

const validSupabaseKey = (supabaseAnonKey && supabaseAnonKey.length > 10) 
  ? supabaseAnonKey 
  : 'placeholder-key';

console.log('🔧 Supabase: Initializing client with URL:', validSupabaseUrl !== 'https://placeholder.supabase.co' ? 'Configured' : 'Using placeholder');
console.log('🔧 Supabase: Anon key:', validSupabaseKey !== 'placeholder-key' ? 'Configured' : 'Using placeholder');

export const supabase = createClient(validSupabaseUrl, validSupabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'chikankari-by-kanchan'
    }
  }
});

// Test connection only if we have valid credentials
if (validSupabaseUrl !== 'https://placeholder.supabase.co' && validSupabaseKey !== 'placeholder-key') {
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('❌ Supabase: Connection error:', error.message, error);
    } else {
      console.log('✅ Supabase: Connected successfully');
      if (data.session) {
        console.log('✅ Supabase: Found existing session for:', data.session.user.email);
      }
    }
  }).catch(err => {
    console.error('❌ Supabase: Failed to test connection:', err);
  });
} else {
  console.log('ℹ️ Supabase: Running in mock mode - please configure your Supabase credentials');
}

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