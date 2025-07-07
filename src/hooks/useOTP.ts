
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useOTP = () => {
  const [loading, setLoading] = useState(false);

  const sendOTP = async (email: string, phone?: string, purpose: string = 'signup') => {
    setLoading(true);
    try {
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

      // In production, you would send actual SMS/email here
      console.log(`OTP for ${email}: ${otpCode}`);
      toast.success(`OTP sent to ${email}`);
      
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
  };
};
