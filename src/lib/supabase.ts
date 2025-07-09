import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && 
           supabaseAnonKey && 
           supabaseUrl !== 'your_supabase_project_url' && 
           supabaseUrl !== 'YOUR_SUPABASE_PROJECT_URL' &&
           supabaseAnonKey !== 'your_supabase_anon_key' &&
           supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
           supabaseUrl.includes('supabase.co'))
}

if (!isSupabaseConfigured()) {
  console.warn('Supabase not configured. Using mock data.')
}

export const supabase = isSupabaseConfigured()
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null

// Handle auth errors globally
if (supabase) {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'TOKEN_REFRESHED' && !session) {
      console.log('🧹 Auth: Token refresh failed, clearing storage');
      localStorage.clear();
    }
  });
}

// Test Supabase connection
export const testSupabaseConnection = async () => {
  if (!supabase) {
    console.log('❌ testSupabaseConnection: Supabase client not configured')
    return false
  }
  
  try {
    console.log('🔄 testSupabaseConnection: Testing connection...')
    
    // Simple query to test connection with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Connection test timeout')), 5000);
    });

    const queryPromise = supabase
      .from('products')
      .select('id')
      .limit(1);

    const { data, error } = await supabase
      .from('products')
      .select('id')
      .limit(1)
    const result = await Promise.race([queryPromise, timeoutPromise]) as any;
    
    if (result.error) {
      console.log('❌ testSupabaseConnection: Query error:', result.error.message)
      return false
    }
    
    console.log('✅ testSupabaseConnection: Connection successful')
    return true
  } catch (error) {
    console.log('❌ testSupabaseConnection: Connection failed:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}