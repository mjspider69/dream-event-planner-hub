
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Eye, EyeOff, User, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useOTP } from "@/hooks/useOTP";
import OTPInput from "@/components/OTPInput";

const CustomerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    city: ""
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const sendOTP = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/customer-dashboard`,
        }
      });

      if (error) throw error;

      setOtpSent(true);
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

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email'
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Login successful",
      });
      navigate("/customer-dashboard");
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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Login Failed",
            description: "Invalid email or password",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Welcome back!",
        description: "Login successful",
      });
      navigate("/customer-dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Login failed",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationData.name || !registrationData.email || !registrationData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const tempPassword = Math.random().toString(36).slice(-8);
      const { error } = await supabase.auth.signUp({
        email: registrationData.email,
        password: tempPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/customer-dashboard`,
          data: {
            full_name: registrationData.name,
            phone: registrationData.phone,
            city: registrationData.city,
            user_type: 'customer'
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: "Account Exists",
            description: "This email is already registered. Please login instead.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Account Created!",
        description: "Please check your email for verification link",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Registration failed",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-amber-100 text-amber-700">Welcome Back</Badge>
            <h1 className="text-3xl font-bold mb-2">Login to Aaroham</h1>
            <p className="text-gray-600">Continue planning your perfect event</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Access Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="phone">Email OTP</TabsTrigger>
                  <TabsTrigger value="email">Password</TabsTrigger>
                </TabsList>
                
                <TabsContent value="phone" className="space-y-4">
                  {!otpSent ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={sendOTP}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        {loading ? "Sending..." : "Send OTP"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Enter OTP</label>
                        <OTPInput
                          value={otp}
                          onChange={setOtp}
                          className="mb-4"
                        />
                        <p className="text-sm text-gray-500 text-center">
                          OTP sent to {email}
                        </p>
                      </div>
                      <Button 
                        onClick={verifyOTP}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        {loading ? "Verifying..." : "Verify & Login"}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setOtpSent(false);
                          setOtp("");
                        }}
                        className="w-full"
                      >
                        Change Email
                      </Button>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="email" className="space-y-4">
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          type="email"
                          placeholder="your@email.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                  <div className="text-center">
                    <button className="text-sm text-amber-600 hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Registration Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-center">New to Aaroham?</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegistration} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Your name" 
                        value={registrationData.name}
                        onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
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
                        value={registrationData.city}
                        onChange={(e) => setRegistrationData({...registrationData, city: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      type="email"
                      placeholder="your@email.com" 
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mobile</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="+91 98765 43210" 
                      value={registrationData.phone}
                      onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-4">
                By registering, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
