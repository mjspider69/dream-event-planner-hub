
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Eye, EyeOff, User, MapPin, Sparkles, Building, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const VendorAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: "",
    useOTP: false
  });
  const [registerData, setRegisterData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    category: "",
    password: "",
    agreeTerms: false
  });
  const [otpData, setOtpData] = useState({
    otp: "",
    sent: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, signInWithOTP, verifyOTP } = useAuth();

  const vendorCategories = [
    "Photography", "Videography", "Decoration", "Catering", 
    "Music & DJ", "Transportation", "Venue", "Priest", "Gifts"
  ];

  const sendOTP = async () => {
    setLoading(true);
    try {
      await signInWithOTP(loginData.emailOrPhone);
      setOtpData({ ...otpData, sent: true });
      toast({
        title: "OTP Sent!",
        description: "Please check your phone/email for the verification code",
      });
    } catch (error: any) {
      toast({
        title: "Failed to send OTP",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // Simulate Google Sign-In for vendors
      const mockGoogleUser = {
        id: `vendor_${Date.now()}`,
        email: "vendor@example.com",
        fullName: "Google Vendor",
        userType: 'vendor' as const,
        emailVerified: true,
        phoneVerified: false,
      };
      
      // In a real implementation, you would use Google OAuth
      toast({
        title: "Google Sign-In Successful!",
        description: "Welcome to Aaroham Vendor Portal",
      });
      navigate("/vendor-dashboard");
    } catch (error: any) {
      console.log("Google sign in error:", error);
      toast({
        title: "Google Sign-In Failed",
        description: "Please try again or use email/password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (loginData.useOTP) {
        if (!otpData.sent) {
          await signInWithOTP(loginData.emailOrPhone);
          setOtpData({ ...otpData, sent: true });
          toast({
            title: "OTP Sent!",
            description: "Please check your phone/email for the verification code",
          });
        } else {
          await verifyOTP(loginData.emailOrPhone, otpData.otp);
          toast({
            title: "Welcome back, Partner!",
            description: "Login successful",
          });
          navigate("/vendor-dashboard");
        }
      } else {
        await signIn(loginData.emailOrPhone, loginData.password);
        toast({
          title: "Welcome back, Partner!",
          description: "Login successful",
        });
        navigate("/vendor-dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the Vendor Agreement to continue",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      const vendorData = {
        fullName: registerData.contactPerson,
        phone: registerData.phone,
        city: registerData.city,
        businessName: registerData.businessName,
        category: registerData.category,
        userType: 'vendor'
      };
      
      await signUp(registerData.email, registerData.password, vendorData);
      toast({
        title: "Registration Submitted!",
        description: "Please verify your email to complete registration",
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <div className="container mx-auto px-6 py-6">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Aaroham
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Vendor Portal</p>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-amber-100 text-amber-700">Vendor Access</Badge>
            <h2 className="text-3xl font-bold mb-2">Welcome, Aaroham Vendor</h2>
            <p className="text-gray-600">Grow your business with us</p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
              <CardTitle className="text-center text-2xl flex items-center justify-center">
                <Building className="h-6 w-6 mr-2 text-amber-600" />
                Vendor Portal
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Email or Phone</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Enter email or phone number"
                          value={loginData.emailOrPhone}
                          onChange={(e) => setLoginData({...loginData, emailOrPhone: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="useOTP"
                        checked={loginData.useOTP}
                        onChange={(e) => setLoginData({...loginData, useOTP: e.target.checked})}
                      />
                      <label htmlFor="useOTP" className="text-sm">Use OTP instead of password</label>
                    </div>

                    {loginData.useOTP ? (
                      <div className="space-y-4">
                        {!otpData.sent ? (
                          <Button 
                            type="button"
                            onClick={sendOTP}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-500"
                          >
                            {loading ? "Sending..." : "Send OTP"}
                          </Button>
                        ) : (
                          <>
                            <div>
                              <label className="block text-sm font-medium mb-2">Enter OTP</label>
                              <Input
                                placeholder="6-digit OTP"
                                value={otpData.otp}
                                onChange={(e) => setOtpData({...otpData, otp: e.target.value})}
                                maxLength={6}
                                required
                              />
                            </div>
                            <Button 
                              type="submit"
                              disabled={loading}
                              className="w-full bg-gradient-to-r from-amber-500 to-orange-500"
                            >
                              {loading ? "Verifying..." : "Verify & Login"}
                            </Button>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Password</label>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter password"
                              value={loginData.password}
                              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-3 text-gray-400"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <Button 
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500"
                        >
                          {loading ? "Logging in..." : "Login"}
                        </Button>
                      </>
                    )}

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full"
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Sign in with Google
                    </Button>
                  </form>
                </TabsContent>
                
                {/* Register Tab */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Name</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Your business name"
                          value={registerData.businessName}
                          onChange={(e) => setRegisterData({...registerData, businessName: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Person</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Your name"
                          value={registerData.contactPerson}
                          onChange={(e) => setRegisterData({...registerData, contactPerson: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="business@email.com"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="+91 98765 43210"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Your city"
                          value={registerData.city}
                          onChange={(e) => setRegisterData({...registerData, city: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Category</label>
                      <select
                        value={registerData.category}
                        onChange={(e) => setRegisterData({...registerData, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      >
                        <option value="">Select your service</option>
                        {vendorCategories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <Input
                        type="password"
                        placeholder="Create password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        required
                      />
                    </div>
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={registerData.agreeTerms}
                        onChange={(e) => setRegisterData({...registerData, agreeTerms: e.target.checked})}
                        className="mt-1"
                      />
                      <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                        I agree to the <a href="#" className="text-amber-600 hover:underline">Vendor Agreement</a> and <a href="#" className="text-amber-600 hover:underline">Terms of Service</a>
                      </label>
                    </div>
                    <Button 
                      type="submit"
                      disabled={loading || !registerData.agreeTerms}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                    >
                      {loading ? "Submitting Application..." : "Submit Application"}
                    </Button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full"
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Register with Google
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorAuth;
