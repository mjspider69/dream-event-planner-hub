
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
      const { error } = await supabase
        .from('otps')
        .insert({
          email,
          phone,
          otp_code: otpCode,
          purpose,
          expires_at: expiresAt.toISOString(),
        });

      if (error) throw error;

      // In production, you would send actual SMS/email here
      console.log(`OTP for ${email}: ${otpCode}`);
      toast.success(`OTP sent to ${email}`);
      
      return { success: true, error: null };
    } catch (error: any) {
      toast.error(error.message);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otpCode: string, purpose: string = 'signup') => {
    setLoading(true);
    try {
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
        .single();

      if (error || !data) {
        toast.error('Invalid or expired OTP');
        return { success: false, error: error || new Error('Invalid OTP') };
      }

      // Mark OTP as verified
      await supabase
        .from('otps')
        .update({ is_verified: true })
        .eq('id', data.id);

      toast.success('OTP verified successfully!');
      return { success: true, error: null };
    } catch (error: any) {
      toast.error(error.message);
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
