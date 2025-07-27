import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export const useOTP = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = async (email: string, phone?: string, purpose: string = 'signup') => {
    try {
      setLoading(true);
      const response = await apiClient.sendOTP({ email, phone, purpose });
      setOtpSent(true);
      
      // In development, show the OTP in console for testing
      if (process.env.NODE_ENV === 'development' && response.otpCode) {
        console.log(`Development OTP: ${response.otpCode}`);
        toast.success(`OTP sent! Dev code: ${response.otpCode}`);
      } else {
        toast.success('OTP sent successfully!');
      }
      
      return response;
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otpCode: string, phone?: string, purpose: string = 'signup') => {
    try {
      setLoading(true);
      const response = await apiClient.verifyOTP({ email, phone, otpCode, purpose });
      toast.success('OTP verified successfully!');
      return response;
    } catch (error: any) {
      toast.error(error.message || 'Invalid OTP');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Indian mobile number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  return {
    sendOTP,
    verifyOTP,
    validatePhoneNumber,
    loading,
    otpSent,
    setOtpSent
  };
};