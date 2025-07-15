
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.email);
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
        });

        if (event === 'SIGNED_IN') {
          toast.success('Successfully signed in!');
        } else if (event === 'SIGNED_OUT') {
          toast.success('Successfully signed out!');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!mounted) return;
      
      if (error) {
        console.error('Error getting session:', error);
      }
      console.log('Initial session:', session?.user?.email);
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false,
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const redirectUrl = `${window.location.origin}/customer-dashboard`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            ...userData,
            email_confirmed: true
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        if (error.message.includes('already registered')) {
          toast.error('An account with this email already exists. Please sign in instead.');
        } else {
          toast.error(error.message);
        }
        return { error };
      }

      console.log('Sign up successful:', data.user?.email);
      
      // If user was created successfully, create their profile
      if (data.user) {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              user_id: data.user.id,
              full_name: userData.full_name,
              phone: userData.phone,
              city: userData.city,
              user_type: userData.user_type
            });

          if (profileError) {
            console.error('Profile creation error:', profileError);
          }

          // Create vendor record if needed
          if (userData.user_type === 'vendor') {
            const { error: vendorError } = await supabase
              .from('vendors')
              .insert({
                user_id: data.user.id,
                business_name: userData.business_name,
                category: userData.business_category,
                city: userData.city,
                email: email,
                contact_person: userData.full_name,
                phone: userData.phone,
                is_approved: false
              });

            if (vendorError) {
              console.error('Vendor creation error:', vendorError);
            }
          }
        } catch (profileError) {
          console.error('Error creating user profile:', profileError);
        }
      }
      
      toast.success('Account created successfully!');
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Unexpected sign up error:', error);
      toast.error(error.message || 'Failed to create account');
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        toast.error(error.message);
        return { error };
      }

      console.log('Sign in successful:', data.user?.email);
      return { data, error: null };
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      toast.error(error.message || 'Failed to sign in');
      return { error };
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/customer-dashboard`;
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error('Magic link error:', error);
        toast.error(error.message);
        return { error };
      }

      toast.success('Magic link sent! Check your email.');
      return { data, error: null };
    } catch (error: any) {
      console.error('Unexpected magic link error:', error);
      toast.error(error.message || 'Failed to send magic link');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast.error(error.message);
      }
      return { error };
    } catch (error: any) {
      console.error('Unexpected sign out error:', error);
      toast.error(error.message || 'Failed to sign out');
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        console.error('Reset password error:', error);
        toast.error(error.message);
      } else {
        toast.success('Password reset email sent!');
      }
      return { error };
    } catch (error: any) {
      console.error('Unexpected reset password error:', error);
      toast.error(error.message || 'Failed to send reset email');
      return { error };
    }
  };

  return {
    ...authState,
    signUp,
    signIn,
    signInWithMagicLink,
    signOut,
    resetPassword,
  };
};
