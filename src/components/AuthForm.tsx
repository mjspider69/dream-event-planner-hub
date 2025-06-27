
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2, Mail, Phone, Lock, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useOTP } from "@/hooks/useOTP";
import OTPVerification from "./OTPVerification";
import { toast } from "sonner";

interface AuthFormProps {
  mode: 'login' | 'signup' | 'vendor';
  onSuccess: () => void;
}

const AuthForm = ({ mode, onSuccess }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    businessName: '',
    category: '',
    city: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signUp, signIn } = useAuth();
  const { sendOTP } = useOTP();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error('Email and password are required');
      return false;
    }

    if (mode === 'signup' || mode === 'vendor') {
      if (!formData.fullName) {
        toast.error('Full name is required');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return false;
      }

      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }

      if (!acceptTerms) {
        toast.error('Please accept the terms and conditions');
        return false;
      }

      if (mode === 'vendor') {
        if (!formData.businessName || !formData.category || !formData.city) {
          toast.error('Please fill in all business details');
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (mode === 'login') {
        const result = await signIn(formData.email, formData.password);
        if (!result.error) {
          onSuccess();
        }
      } else {
        // For signup and vendor registration, send OTP first
        const otpResult = await sendOTP(
          formData.email, 
          formData.phone, 
          mode === 'vendor' ? 'vendor_signup' : 'signup'
        );
        
        if (otpResult.success) {
          setShowOTP(true);
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerified = async () => {
    try {
      const userData = {
        full_name: formData.fullName,
        phone: formData.phone,
        user_type: mode === 'vendor' ? 'vendor' : 'customer',
        ...(mode === 'vendor' && {
          business_name: formData.businessName,
          business_category: formData.category,
          city: formData.city,
        })
      };

      const result = await signUp(formData.email, formData.password, userData);
      
      if (!result.error) {
        if (mode === 'vendor') {
          // Create vendor profile
          // This would be handled by a trigger in production
          toast.success('Vendor registration successful! Please wait for approval.');
        } else {
          toast.success('Account created successfully!');
        }
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    }
  };

  if (showOTP) {
    return (
      <OTPVerification
        email={formData.email}
        phone={formData.phone}
        purpose={mode === 'vendor' ? 'vendor_signup' : 'signup'}
        onVerified={handleOTPVerified}
        onCancel={() => setShowOTP(false)}
      />
    );
  }

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back';
      case 'signup': return 'Create Account';
      case 'vendor': return 'Join as Vendor';
      default: return 'Authentication';
    }
  };

  const getSubmitText = () => {
    switch (mode) {
      case 'login': return 'Sign In';
      case 'signup': return 'Create Account';
      case 'vendor': return 'Register as Vendor';
      default: return 'Submit';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
      <CardHeader className="text-center bg-gradient-to-r from-amber-50 to-orange-50">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
          {getTitle()}
        </CardTitle>
        <p className="text-gray-600">
          {mode === 'login' 
            ? 'Sign in to your account' 
            : mode === 'vendor'
            ? 'Join our network of trusted vendors'
            : 'Create your Aaroham account'
          }
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {(mode === 'signup' || mode === 'vendor') && (
            <div>
              <Label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className="mt-1"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
              <Mail className="w-4 h-4 mr-2" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              className="mt-1"
              required
            />
          </div>

          {(mode === 'signup' || mode === 'vendor') && (
            <div>
              <Label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="mt-1"
              />
            </div>
          )}

          {mode === 'vendor' && (
            <>
              <div>
                <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Your business name"
                  className="mt-1"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                      <SelectItem value="decoration">Decoration</SelectItem>
                      <SelectItem value="dj-music">DJ & Music</SelectItem>
                      <SelectItem value="priest">Priest</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                    City
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Your city"
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {(mode === 'signup' || mode === 'vendor') && (
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          )}

          {(mode === 'signup' || mode === 'vendor') && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 cursor-pointer"
              >
                I accept the{" "}
                <a href="/terms-of-service" className="text-amber-600 hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-amber-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {getSubmitText()}
          </Button>

          {mode === 'login' && (
            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                className="text-amber-600 hover:text-amber-700"
              >
                Forgot Password?
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
