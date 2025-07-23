import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string): boolean => {
  // Indian mobile number validation (starts with 6, 7, 8, 9 and has 10 digits)
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const useOTP = () => {
  const [loading, setLoading] = useState(false);

  const sendOTP = async (email: string, phone?: string, purpose: string = 'signup') => {
    setLoading(true);
    try {
      console.log('Sending OTP to:', { email, phone, purpose });

      // Validate inputs
      if (!email && !phone) {
        throw new Error('Either email or phone number is required');
      }

      if (email && !validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      if (phone && !validatePhoneNumber(phone)) {
        throw new Error('Please enter a valid Indian mobile number (starting with 6, 7, 8, or 9)');
      }

      // Send OTP using our API client
      const response = await apiClient.sendOTP({
        email: email || undefined,
        phone: phone || undefined,
        purpose
      });

      if (response.success) {
        // Show success message
        const channels = [];
        if (email) channels.push('email');
        if (phone) channels.push('SMS');
        
        toast.success(`OTP sent successfully via ${channels.join(' and ')}!`);
        
        // For demo purposes, show the OTP in console if provided
        if (response.otpCode) {
          console.log(`Demo OTP: ${response.otpCode}`);
          toast.success(`Demo OTP: ${response.otpCode}`, {
            duration: 10000,
          });
        }
        
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Failed to send OTP');
      }

    } catch (error: any) {
      console.error('Error sending OTP:', error);
      toast.error(error.message || 'Failed to send OTP. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otpCode: string, purpose: string = 'signup', phone?: string) => {
    setLoading(true);
    try {
      console.log('Verifying OTP:', { email, phone, otpCode: otpCode.slice(0, 2) + '****', purpose });

      // Validate inputs
      if (!otpCode || otpCode.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }

      if (!email && !phone) {
        throw new Error('Either email or phone number is required');
      }

      if (email && !validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      if (phone && !validatePhoneNumber(phone)) {
        throw new Error('Please enter a valid phone number');
      }

      // Verify OTP using our API client
      const response = await apiClient.verifyOTP({
        email: email || undefined,
        phone: phone || undefined,
        otpCode,
        purpose
      });

      if (response.success) {
        toast.success('OTP verified successfully!');
        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Invalid OTP');
      }

    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      const errorMessage = error.message || 'Invalid OTP. Please try again.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendOTP,
    verifyOTP,
    loading,
  };
};