
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Eye, EyeOff, User, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const CustomerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = () => {
    setOtpSent(true);
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
                  <TabsTrigger value="phone">Phone OTP</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>
                
                <TabsContent value="phone" className="space-y-4">
                  {!otpSent ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Mobile Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="+91 98765 43210"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={sendOTP}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        Send OTP
                      </Button>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Enter OTP</label>
                        <Input
                          placeholder="6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength={6}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          OTP sent to {phoneNumber}
                        </p>
                      </div>
                      <Link to="/customer-dashboard">
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                          Verify & Login
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        onClick={() => setOtpSent(false)}
                        className="w-full"
                      >
                        Change Number
                      </Button>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="email" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="your@email.com" className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
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
                  <Link to="/customer-dashboard">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                      Login
                    </Button>
                  </Link>
                  <div className="text-center">
                    <a href="#" className="text-sm text-amber-600 hover:underline">
                      Forgot Password?
                    </a>
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
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Your name" className="pl-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Your city" className="pl-10" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="your@email.com" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mobile</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="+91 98765 43210" className="pl-10" />
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                Create Account
              </Button>
              <p className="text-xs text-gray-500 text-center">
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
