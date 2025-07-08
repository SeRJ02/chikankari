import { createClient } from '@supabase/supabase-js';

// Get environment variables with proper validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Config Check:');
console.log('- URL from env:', supabaseUrl);
console.log('- URL length:', supabaseUrl?.length);
console.log('- Key from env (first 20 chars):', supabaseAnonKey?.substring(0, 20) + '...');
console.log('- Key length:', supabaseAnonKey?.length);
console.log('- Current origin:', typeof window !== 'undefined' ? window.location.origin : 'Server-side');

// Enhanced validation for environment variables
const isValidSupabaseUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  if (url === 'YOUR_SUPABASE_URL' || url === 'your_supabase_project_url') return false;
  if (url === 'https://xlkjflufnzwmjrjkkoool.supabase.co') return false; // Example URL from template
  if (!url.startsWith('https://')) return false;
  if (url.length < 20) return false; // Minimum reasonable length
  if (!url.includes('.supabase.co')) return false;
  return true;
};

const isValidSupabaseKey = (key: string | undefined): boolean => {
  if (!key) return false;
  if (key === 'YOUR_SUPABASE_ANON_KEY' || key === 'your_supabase_anon_key') return false;
  if (key === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsa2pmbHVmbnp3bWpyamtrb29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MDk3ODgsImV4cCI6MjA2NzE4NTc4OH0.1XZfUCKfUxf4kVPo1y8DIAlnGbpBv7ylq5bnsn-w32k') return false; // Example key from template
  if (key.length < 100) return false; // JWT tokens are typically much longer
  return true;
};

// Validate environment variables
const urlValid = isValidSupabaseUrl(supabaseUrl);
const keyValid = isValidSupabaseKey(supabaseAnonKey);

if (!urlValid) {
  console.warn('⚠️ Supabase URL not configured properly. Current value:', supabaseUrl);
}

if (!keyValid) {
  console.warn('⚠️ Supabase Anon Key not configured properly. Key length:', supabaseAnonKey?.length);
}

// Use the actual values if valid, otherwise use safe fallbacks
const validSupabaseUrl = urlValid ? supabaseUrl! : 'https://placeholder.supabase.co';
const validSupabaseKey = keyValid ? supabaseAnonKey! : 'placeholder-key';

console.log('🔧 Supabase: Using URL:', urlValid ? 'Real Supabase URL' : 'Placeholder URL');
console.log('🔧 Supabase: Using key:', keyValid ? 'Real Supabase Key' : 'Placeholder Key');

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
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Enhanced connection test with better error handling
export const testSupabaseConnection = async (): Promise<boolean> => {
  // Don't test if we're using placeholder values
  if (!urlValid || !keyValid) {
    console.log('ℹ️ Supabase: Skipping connection test - using placeholder credentials');
    return false;
  }

  try {
    console.log('🔍 Testing Supabase connection to:', supabaseUrl);
    
    // Use a timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Connection timeout')), 10000);
    });

    const testPromise = supabase.from('products').select('count').limit(1);
    
    const { error } = await Promise.race([testPromise, timeoutPromise]) as any;
    
    if (error) {
      console.error('❌ Supabase: Connection test failed:', error.message);
      console.error('❌ Error details:', error);
      
      if (error.message.includes('Failed to fetch')) {
        console.error('❌ This usually indicates a network issue, CORS problem, or incorrect URL');
        console.error('❌ Full URL being used:', supabaseUrl);
      }
      return false;
    } else {
      console.log('✅ Supabase: Connection test successful');
      return true;
    }
  } catch (err) {
    console.error('❌ Supabase: Connection test error:', err);
    
    if (err instanceof Error) {
      if (err.message.includes('Failed to fetch')) {
        console.error('❌ Network fetch failed. This might be due to:');
        console.error('  - Network connectivity issues');
        console.error('  - CORS configuration problems');
        console.error('  - Incorrect Supabase URL');
        console.error('  - WebContainer environment limitations');
        console.error('❌ URL being tested:', supabaseUrl);
      } else if (err.message.includes('timeout')) {
        console.error('❌ Connection timed out after 10 seconds');
      }
    }
    return false;
  }
};

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return urlValid && keyValid;
};

// Only run connection test if properly configured and in browser environment
if (typeof window !== 'undefined' && isSupabaseConfigured()) {
  // Run connection test after a short delay to allow for initialization
  setTimeout(() => {
    testSupabaseConnection().catch(err => {
      console.error('❌ Delayed connection test failed:', err);
    });
  }, 2000);
} else if (typeof window !== 'undefined') {
  console.log('ℹ️ Supabase: Running in mock mode - please configure your Supabase credentials');
  console.log('ℹ️ Current URL:', supabaseUrl);
  console.log('ℹ️ Current Key length:', supabaseAnonKey?.length);
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