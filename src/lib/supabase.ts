import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && 
           supabaseAnonKey && 
           supabaseUrl !== 'your-supabase-url' && 
           supabaseAnonKey !== 'your-supabase-anon-key' &&
           supabaseUrl.includes('supabase.co'))
}

if (!isSupabaseConfigured()) {
  console.warn('Supabase not configured. Using mock data.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null

// Test Supabase connection
export const testSupabaseConnection = async () => {
  if (!supabase) {
    throw new Error('Supabase client not configured')
  }
  
  try {
    // Simple query to test connection
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .limit(1)
    
    if (error) {
      throw error
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    throw error
  }
}