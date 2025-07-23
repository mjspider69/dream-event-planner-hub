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
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.email);
        
        // Update profile last_login when user signs in
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            await supabase
              .from('profiles')
              .update({ last_login: new Date().toISOString() })
              .eq('user_id', session.user.id);
          } catch (error) {
            console.error('Error updating last login:', error);
          }
        }
        
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
      console.log('Starting signup process for:', email);
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate phone number if provided
      if (userData.phone) {
        const cleanPhone = userData.phone.replace(/\D/g, '');
        const indianMobileRegex = /^(91)?[6-9]\d{9}$/;
        if (!indianMobileRegex.test(cleanPhone)) {
          throw new Error('Please enter a valid Indian mobile number');
        }
      }

      const redirectUrl = `${window.location.origin}/customer-dashboard`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            ...userData,
            email_confirmed: true // Skip email confirmation for now
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
              user_type: userData.user_type,
              email_verified: true, // Mark as verified since OTP was used
              phone_verified: userData.phone ? true : false
            });

          if (profileError) {
            console.error('Profile creation error:', profileError);
            // Don't fail the signup if profile creation fails
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
                is_approved: false,
                verification_status: 'pending'
              });

            if (vendorError) {
              console.error('Vendor creation error:', vendorError);
              // Don't fail the signup if vendor creation fails
            }
          }
        } catch (profileError) {
          console.error('Error creating user profile:', profileError);
          // Don't fail the signup if profile creation fails
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
      console.log('Starting signin process for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please check your credentials.');
        } else {
          toast.error(error.message);
        }
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

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/customer-dashboard`,
        },
      });

      if (error) {
        console.error('Google sign in error:', error);
        toast.error(error.message);
        return { error };
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Unexpected Google sign in error:', error);
      toast.error(error.message || 'Failed to sign in with Google');
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

  const updateProfile = async (updates: any) => {
    try {
      if (!authState.user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', authState.user.id);

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }

      toast.success('Profile updated successfully!');
      return { error: null };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
      return { error };
    }
  };

  return {
    ...authState,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithMagicLink,
    signOut,
    resetPassword,
    updateProfile,
  };
};