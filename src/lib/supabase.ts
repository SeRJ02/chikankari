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