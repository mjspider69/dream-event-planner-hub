
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Mail, Phone, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import OTPInput from "@/components/OTPInput";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SignUpModal = ({ isOpen, onClose, onSuccess }: SignUpModalProps) => {
  const [step, setStep] = useState<'signup' | 'otp'>('signup');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    otp: ''
  });
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Send OTP to email first
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (otpError) throw otpError;

      setStep('otp');
      toast({
        title: "OTP Sent!",
        description: "Please check your email for the verification code",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: formData.otp,
        type: 'email'
      });

      if (error) throw error;

      // Create user profile after OTP verification
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            user_type: 'customer'
          }
        }
      });

      if (signUpError) throw signUpError;

      toast({
        title: "Success!",
        description: "Account created successfully",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid OTP",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
          
          <CardTitle className="text-2xl">
            {step === 'signup' ? 'Join Aaroham' : 'Verify Your Email'}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {step === 'signup' ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className="pl-10 py-3 border-2 border-gray-200 focus:border-amber-500"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="pl-10 py-3 border-2 border-gray-200 focus:border-amber-500"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="pl-10 py-3 border-2 border-gray-200 focus:border-amber-500"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className="pl-10 py-3 border-2 border-gray-200 focus:border-amber-500"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Enter OTP sent to {formData.email}</label>
                <OTPInput
                  value={formData.otp}
                  onChange={(value) => updateFormData('otp', value)}
                  className="mb-4"
                />
              </div>
              
              <Button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold"
              >
                {loading ? 'Verifying...' : 'Verify & Create Account'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setStep('signup')}
                className="w-full"
              >
                Change Email
              </Button>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Are you a vendor?{' '}
              <button className="text-amber-600 hover:underline font-medium">
                Sign up as Vendor
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpModal;
