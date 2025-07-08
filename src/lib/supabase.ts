import { createClient } from '@supabase/supabase-js';

// Get environment variables with proper validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Config Check:');
console.log('- URL from env:', supabaseUrl);
console.log('- Key from env (first 20 chars):', supabaseAnonKey?.substring(0, 20) + '...');
console.log('- Current origin:', typeof window !== 'undefined' ? window.location.origin : 'Server-side');

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
  },
  // Add retry configuration for better error handling
  db: {
    schema: 'public'
  },
  // Configure fetch options for better error handling
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Test connection only if we have valid credentials
if (validSupabaseUrl !== 'https://placeholder.supabase.co' && validSupabaseKey !== 'placeholder-key') {
  // Use a more robust connection test
  const testConnection = async () => {
    try {
      console.log('🔍 Testing Supabase connection...');
      
      // Test with a simple query that doesn't require authentication
      const { error } = await supabase.from('products').select('count').limit(1);
      
      if (error) {
        console.error('❌ Supabase: Connection test failed:', error.message);
        if (error.message.includes('Failed to fetch')) {
          console.error('❌ This usually indicates a network issue, CORS problem, or incorrect URL');
        }
      } else {
        console.log('✅ Supabase: Connection test successful');
      }
    } catch (err) {
      console.error('❌ Supabase: Connection test error:', err);
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        console.error('❌ Network fetch failed. Check your internet connection and Supabase URL.');
      }
    }
  };
  
  // Run connection test after a short delay to allow for initialization
  setTimeout(testConnection, 1000);
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