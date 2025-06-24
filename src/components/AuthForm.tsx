
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Mail, Lock, User, Phone, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthForm = ({ 
  mode, 
  onSuccess 
}: { 
  mode: 'login' | 'signup' | 'vendor'; 
  onSuccess: () => void; 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    businessName: '',
    category: ''
  });
  const { toast } = useToast();

  const vendorCategories = [
    "Photography", "Videography", "Decoration", "Catering", 
    "Music & DJ", "Transportation", "Venue", "Priest", "Gifts"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup' || mode === 'vendor') {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive"
          });
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.fullName,
              phone: formData.phone,
              user_type: mode === 'vendor' ? 'vendor' : 'customer',
              business_name: formData.businessName,
              category: formData.category
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Please check your email to confirm your account",
        });
        onSuccess();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You have been logged in successfully",
        });
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
          {mode === 'vendor' ? (
            <Shield className="h-8 w-8 text-white" />
          ) : (
            <User className="h-8 w-8 text-white" />
          )}
        </div>
        <CardTitle className="text-2xl">
          {mode === 'login' && "Welcome Back"}
          {mode === 'signup' && "Join Aaroham"}
          {mode === 'vendor' && "Vendor Registration"}
        </CardTitle>
        <Badge className="bg-blue-100 text-blue-800 mx-auto">
          {mode === 'vendor' ? 'Business Account' : 'Customer Account'}
        </Badge>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className="pl-10 pr-10 py-3 border-2 border-gray-200 focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Confirm Password for Signup */}
          {(mode === 'signup' || mode === 'vendor') && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500"
                required
              />
            </div>
          )}

          {/* Full Name for Signup */}
          {(mode === 'signup' || mode === 'vendor') && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500"
                required
              />
            </div>
          )}

          {/* Phone for Signup */}
          {(mode === 'signup' || mode === 'vendor') && (
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500"
                required
              />
            </div>
          )}

          {/* Vendor Specific Fields */}
          {mode === 'vendor' && (
            <>
              <Input
                type="text"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={(e) => updateFormData('businessName', e.target.value)}
                className="py-3 border-2 border-gray-200 focus:border-blue-500"
                required
              />
              
              <select
                value={formData.category}
                onChange={(e) => updateFormData('category', e.target.value)}
                className="w-full py-3 px-3 border-2 border-gray-200 rounded-md focus:border-blue-500"
                required
              >
                <option value="">Select Service Category</option>
                {vendorCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white font-semibold rounded-full"
          >
            {loading ? 'Processing...' : (
              mode === 'login' ? 'Sign In' : 
              mode === 'vendor' ? 'Register as Vendor' : 'Create Account'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
