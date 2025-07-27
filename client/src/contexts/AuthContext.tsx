import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  fullName?: string;
  userType: 'customer' | 'vendor' | 'admin';
  phone?: string;
  city?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithOTP: (email: string, phone?: string) => Promise<void>;
  verifyOTP: (email: string, otpCode: string, phone?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);
      
      // First send OTP for verification
      await apiClient.sendOTP({ email, purpose: 'signup' });
      
      // Store pending registration data
      localStorage.setItem('pending_registration', JSON.stringify({
        email,
        password,
        userData,
        timestamp: Date.now()
      }));
      
      toast.success('OTP sent to your email. Please verify to complete registration.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // For now, we'll simulate password authentication
      // In production, implement proper password validation
      
      // Create a mock user session
      const mockUser: User = {
        id: crypto.randomUUID(),
        email,
        fullName: email.split('@')[0],
        userType: 'customer',
        emailVerified: true,
        phoneVerified: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      toast.success('Successfully signed in!');
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithOTP = async (email: string, phone?: string) => {
    try {
      setLoading(true);
      const response = await apiClient.post<any>('/auth/login-otp', { email, phone });
      if (response.otpCode) {
        console.log(`Development OTP: ${response.otpCode}`);
      }
      toast.success('OTP sent successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otpCode: string, phone?: string) => {
    try {
      setLoading(true);
      
      // Check if this is for signup or login
      const pendingRegistration = localStorage.getItem('pending_registration');
      
      if (pendingRegistration) {
        // Complete registration
        const regData = JSON.parse(pendingRegistration);
        await apiClient.post<any>('/otp/verify', { email, otpCode, purpose: 'signup' });
        
        // Create profile with proper UUID
        const profileData = {
          userId: crypto.randomUUID(),
          fullName: regData.userData.fullName,
          phone: regData.userData.phone,
          city: regData.userData.city,
          userType: regData.userData.userType || 'customer',
          emailVerified: true,
          phoneVerified: !!regData.userData.phone,
        };
        
        await apiClient.createProfile(profileData);
        
        const newUser: User = {
          id: profileData.userId,
          email,
          ...profileData,
        };
        
        setUser(newUser);
        localStorage.setItem('auth_user', JSON.stringify(newUser));
        localStorage.removeItem('pending_registration');
        toast.success('Account created successfully!');
      } else {
        // Login verification
        await apiClient.verifyOTP({ email, phone, otpCode, purpose: 'login' });
        
        // Create session
        const mockUser: User = {
          id: crypto.randomUUID(),
          email,
          fullName: email.split('@')[0],
          userType: 'customer',
          emailVerified: true,
          phoneVerified: !!phone,
        };
        
        setUser(mockUser);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        toast.success('Successfully signed in!');
      }
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to verify OTP');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      localStorage.removeItem('auth_user');
      localStorage.removeItem('pending_registration');
      toast.success('Successfully signed out!');
    } catch (error: any) {
      toast.error('Error signing out');
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      await apiClient.updateProfile(user.id, updates);
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signInWithOTP,
    verifyOTP,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};