import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export const useOTP = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = async (email: string, phone?: string, purpose: string = 'signup') => {
    try {
      setLoading(true);
      console.log(`📱 Sending OTP request - Email: ${email}, Phone: ${phone}, Purpose: ${purpose}`);
      
      const response = await apiClient.sendOTP({ email, phone, purpose });
      setOtpSent(true);
      
      // Always show the OTP for testing
      if (response.otpCode) {
        console.log(`📧 OTP Code: ${response.otpCode}`);
        toast.success(`OTP sent! Code: ${response.otpCode}`, {
          duration: 10000, // Show for 10 seconds
        });
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
      console.log(`📱 Verifying OTP - Email: ${email}, Phone: ${phone}, Code: ${otpCode}, Purpose: ${purpose}`);
      
      const response = await apiClient.verifyOTP({ email, phone, otpCode, purpose });
      console.log(`📱 OTP verification response:`, response);
      
      toast.success('OTP verified successfully!');
      return response;
    } catch (error: any) {
      console.error('OTP verification error:', error);
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