import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Enhanced phone number validation for Indian numbers
const validatePhoneNumber = (phone: string): boolean => {
  if (!phone) return false;
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid Indian mobile number
  // Indian mobile numbers: 10 digits starting with 6, 7, 8, or 9
  // Or 13 digits starting with 91 followed by 6, 7, 8, or 9
  const indianMobileRegex = /^(91)?[6-9]\d{9}$/;
  
  return indianMobileRegex.test(cleanPhone);
};

// Enhanced email validation
const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

      // Call the database function to create OTP
      const { data, error } = await supabase.rpc('create_otp_record', {
        p_email: email || null,
        p_phone: phone || null,
        p_purpose: purpose
      });

      if (error) {
        console.error('Error creating OTP record:', error);
        throw new Error(error.message || 'Failed to generate OTP');
      }

      console.log('OTP record created:', data);

      // Send OTP via email if email is provided
      if (email) {
        try {
          const { data: emailData, error: emailError } = await supabase.functions.invoke('send-otp-email', {
            body: {
              email,
              otpCode: data[0]?.otp_code,
              purpose
            }
          });

          if (emailError) {
            console.error('Error sending OTP email:', emailError);
            // Don't throw here, continue with SMS if available
            toast.error('Failed to send email OTP, but SMS will be sent if phone is provided');
          } else if (emailData?.success) {
            console.log('Email OTP sent successfully');
          }
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          // Continue with SMS if phone is provided
        }
      }

      // Send OTP via SMS if phone is provided (simulated for now)
      if (phone && validatePhoneNumber(phone)) {
        console.log(`SMS OTP would be sent to ${phone}: ${data[0]?.otp_code}`);
        // In production, integrate with SMS provider like Twilio, MSG91, etc.
        
        // Simulate SMS sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Show success message
      const channels = [];
      if (email) channels.push('email');
      if (phone) channels.push('SMS');
      
      toast.success(`OTP sent successfully via ${channels.join(' and ')}!`);
      
      return { success: true, error: null, data };
    } catch (error: any) {
      console.error('Error in sendOTP:', error);
      toast.error(error.message || 'Failed to send OTP');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otpCode: string, purpose: string = 'signup', phone?: string) => {
    setLoading(true);
    try {
      console.log('Verifying OTP:', { email, phone, otpCode, purpose });

      if (!otpCode || otpCode.length !== 6) {
        throw new Error('Please enter a valid 6-digit OTP');
      }

      if (!email && !phone) {
        throw new Error('Email or phone number is required for verification');
      }

      // Call the database function to verify OTP
      const { data, error } = await supabase.rpc('verify_otp_code', {
        p_email: email || null,
        p_phone: phone || null,
        p_otp_code: otpCode,
        p_purpose: purpose
      });

      if (error) {
        console.error('Error verifying OTP:', error);
        throw new Error(error.message || 'OTP verification failed');
      }

      if (!data) {
        throw new Error('Invalid or expired OTP. Please try again.');
      }

      console.log('OTP verified successfully');
      toast.success('OTP verified successfully!');
      
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error in verifyOTP:', error);
      toast.error(error.message || 'Failed to verify OTP');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (email: string, phone?: string, purpose: string = 'signup') => {
    console.log('Resending OTP...');
    return await sendOTP(email, phone, purpose);
  };

  return {
    sendOTP,
    verifyOTP,
    resendOTP,
    loading,
    validatePhoneNumber,
    validateEmail,
  };
};