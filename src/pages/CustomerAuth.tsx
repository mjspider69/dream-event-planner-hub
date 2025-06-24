
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Eye, EyeOff, User, MapPin, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CustomerAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: "",
    useOTP: false
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: ""
  });
  const [otpData, setOtpData] = useState({
    otp: "",
    sent: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const sendOTP = async () => {
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpData({ ...otpData, sent: true });
      setLoading(false);
      toast({
        title: "OTP Sent!",
        description: "Please check your phone/email for the verification code",
      });
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back!",
        description: "Login successful",
      });
      navigate("/customer-dashboard");
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Account Created!",
        description: "Welcome to Aaroham! Please verify your account.",
      });
      navigate("/customer-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <div className="container mx-auto px-6 py-6">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Aaroham
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Customer Portal</p>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-700">Customer Access</Badge>
            <h2 className="text-3xl font-bold mb-2">Welcome to Aaroham</h2>
            <p className="text-gray-600">Plan your perfect celebration</p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Customer Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email or Phone</label>
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
                            className="w-full bg-gradient-to-r from-blue-600 to-amber-500"
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
                              className="w-full bg-gradient-to-r from-blue-600 to-amber-500"
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
                          className="w-full bg-gradient-to-r from-blue-600 to-amber-500"
                        >
                          {loading ? "Logging in..." : "Login"}
                        </Button>
                        <div className="text-center">
                          <a href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                          </a>
                        </div>
                      </>
                    )}
                  </form>
                </TabsContent>
                
                {/* Register Tab */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Your full name"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
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
                          placeholder="your@email.com"
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
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <Input
                        type="password"
                        placeholder="Create password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500"
                    >
                      {loading ? "Creating Account..." : "Create Account"}
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

export default CustomerAuth;
