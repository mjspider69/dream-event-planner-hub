import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Phone number validation for Indian numbers
const validatePhoneNumber = (phone: string): boolean => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid Indian mobile number
  // Indian mobile numbers: 10 digits starting with 6, 7, 8, or 9
  // Or 13 digits starting with +91 followed by 6, 7, 8, or 9
  const indianMobileRegex = /^(?:\+91)?[6-9]\d{9}$/;
  
  return indianMobileRegex.test(cleanPhone);
};

export const useOTP = () => {
  const [loading, setLoading] = useState(false);

  const sendOTP = async (email: string, phone?: string, purpose: string = 'signup') => {
    setLoading(true);
    try {
      // Validate phone number if provided
      if (phone && !validatePhoneNumber(phone)) {
        throw new Error('Please enter a valid Indian mobile number (starting with 6, 7, 8, or 9)');
      }

      // Generate 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      // Store OTP in database
      const { error: insertError } = await supabase
        .from('otps')
        .insert({
          email,
          phone,
          otp_code: otpCode,
          purpose,
          expires_at: expiresAt.toISOString(),
        });

      if (insertError) {
        console.error('Error storing OTP:', insertError);
        throw insertError;
      }

      // Send OTP via email using SMTP edge function
      const { data, error: emailError } = await supabase.functions.invoke('send-otp-email', {
        body: {
          email,
          otpCode,
          purpose
        }
      });

      if (emailError) {
        console.error('Error sending OTP email:', emailError);
        throw new Error('Failed to send OTP email. Please try again.');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to send OTP email');
      }

      // If phone number is provided, simulate SMS sending (in real app, integrate with SMS provider)
      if (phone && validatePhoneNumber(phone)) {
        console.log(`SMS OTP would be sent to ${phone}: ${otpCode}`);
        toast.success(`OTP sent to ${email} and ${phone}. Please check your inbox and messages.`);
      } else {
        toast.success(`OTP sent to ${email}. Please check your inbox.`);
      }
      
      return { success: true, error: null };
    } catch (error: any) {
      console.error('Error in sendOTP:', error);
      toast.error(error.message || 'Failed to send OTP');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otpCode: string, purpose: string = 'signup') => {
    setLoading(true);
    try {
      if (!email || !otpCode) {
        throw new Error('Email and OTP code are required');
      }

      if (otpCode.length !== 6) {
        throw new Error('OTP must be 6 digits');
      }

      const { data, error } = await supabase
        .from('otps')
        .select('*')
        .eq('email', email)
        .eq('otp_code', otpCode)
        .eq('purpose', purpose)
        .eq('is_verified', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error verifying OTP:', error);
        throw error;
      }

      if (!data) {
        toast.error('Invalid or expired OTP');
        return { success: false, error: new Error('Invalid or expired OTP') };
      }

      // Mark OTP as verified
      const { error: updateError } = await supabase
        .from('otps')
        .update({ is_verified: true })
        .eq('id', data.id);

      if (updateError) {
        console.error('Error updating OTP:', updateError);
        throw updateError;
      }

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

  return {
    sendOTP,
    verifyOTP,
    loading,
    validatePhoneNumber,
  };
};