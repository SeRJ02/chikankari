import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User, AuthState } from '../types';
import { ADMIN_EMAIL } from '../utils/constants';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    console.log('🔐 Auth: Initializing authentication...');
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('🔐 Auth: Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Auth: Error getting session:', error);
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
          return;
        }

        if (session?.user) {
          console.log('✅ Auth: Found existing session for:', session.user.email);
          const user = await getUserProfile(session.user);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          console.log('ℹ️ Auth: No existing session found');
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.error('❌ Auth: Error in getInitialSession:', error);
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth: State changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('✅ Auth: User signed in:', session.user.email);
          const user = await getUserProfile(session.user);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 Auth: User signed out');
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          console.log('🔄 Auth: Token refreshed for:', session.user.email);
          const user = await getUserProfile(session.user);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        }
      }
    );

    return () => {
      console.log('🧹 Auth: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const getUserProfile = async (supabaseUser: SupabaseUser): Promise<User> => {
    try {
      console.log('👤 Auth: Getting profile for user:', supabaseUser.email);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('❌ Auth: Error fetching user profile:', error);
      }

      // If no profile exists, create one
      if (!profile) {
        console.log('📝 Auth: Creating new profile for:', supabaseUser.email);
        const newProfile = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
          role: supabaseUser.email === ADMIN_EMAIL ? 'admin' as const : 'user' as const,
        };

        const { error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile);

        if (insertError) {
          console.error('❌ Auth: Error creating user profile:', insertError);
        } else {
          console.log('✅ Auth: Profile created successfully');
        }

        return newProfile;
      }

      console.log('✅ Auth: Profile loaded:', profile.email, 'Role:', profile.role);
      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
      };
    } catch (error) {
      console.error('❌ Auth: Error in getUserProfile:', error);
      // Fallback user object
      return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: supabaseUser.user_metadata?.name || 'User',
        role: supabaseUser.email === ADMIN_EMAIL ? 'admin' : 'user',
      };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('🔐 Auth: Attempting login for:', email);
      console.log('🔐 Auth: Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('🔐 Auth: Current origin:', window.location.origin);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('❌ Auth: Login error:', error.message, error);
        console.error('❌ Auth: Error details:', {
          status: error.status,
          statusText: error.statusText,
          name: error.name
        });
        return { 
          success: false, 
          error: error.message || 'Login failed. Please check your credentials.' 
        };
      }

      if (data.user) {
        console.log('✅ Auth: Login successful for:', data.user.email);
        return { success: true };
      }

      return { success: false, error: 'Login failed. Please try again.' };
    } catch (error) {
      console.error('❌ Auth: Unexpected login error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('❌ Auth: Network/CORS error detected');
        return { 
          success: false, 
          error: 'Network error. Please check your internet connection and try again.' 
        };
      }
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      console.log('👋 Auth: Logging out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Auth: Logout error:', error);
      } else {
        console.log('✅ Auth: Logout successful');
      }
    } catch (error) {
      console.error('❌ Auth: Logout error:', error);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('📝 Auth: Attempting signup for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        console.error('❌ Auth: Signup error:', error.message);
        return { 
          success: false, 
          error: error.message || 'Signup failed. Please try again.' 
        };
      }

      if (data.user) {
        console.log('✅ Auth: Signup successful for:', data.user.email);
        return { success: true };
      }

      return { success: false, error: 'Signup failed. Please try again.' };
    } catch (error) {
      console.error('❌ Auth: Signup error:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  console.log('🔍 Auth: Current state:', {
    isAuthenticated: authState.isAuthenticated,
    userEmail: authState.user?.email,
    userRole: authState.user?.role,
    isLoading: authState.isLoading
  });

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      signup,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};