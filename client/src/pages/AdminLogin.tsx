
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Crown, Lock, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Admin login attempt:', loginData.email);

    // Admin credentials (in real app, this would be backend authentication)
    const adminCredentials = {
      email: "admin@aaroham.com",
      password: "admin123"
    };

    try {
      if (loginData.email === adminCredentials.email && loginData.password === adminCredentials.password) {
        console.log('Admin login successful');
        localStorage.setItem("isAdminAuthenticated", "true");
        localStorage.setItem("adminEmail", loginData.email);
        
        toast.success("Welcome Admin! Successfully logged into Aaroham Admin Panel");
        
        // Redirect to admin dashboard
        navigate("/admin-dashboard");
      } else {
        console.log('Admin login failed - invalid credentials');
        toast.error("Authentication Failed - Invalid email or password");
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if already authenticated
  useState(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (isAuthenticated === "true") {
      navigate("/admin-dashboard");
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-tan via-white to-brand-tan flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-tan/10 to-brand-tan/10 opacity-90"></div>
      
      <Card className="relative z-10 w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-brand-tan to-brand-tan rounded-full flex items-center justify-center shadow-2xl">
            <Crown className="h-10 w-10 text-brand-cream" />
          </div>
          <div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-brand-tan to-brand-tan bg-clip-text text-transparent mb-2">
              AAROHAM
            </CardTitle>
            <p className="text-gray-600 font-medium text-lg">Admin Portal</p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Admin Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@aaroham.com"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="border-gray-300 focus:border-brand-tan/30 transition-colors"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="border-gray-300 focus:border-brand-tan/30 transition-colors"
                required
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-brand-tan to-brand-tan hover:from-brand-tan hover:to-brand-tan text-brand-cream font-semibold text-lg py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                "Access Admin Panel"
              )}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-brand-cream rounded-lg">
            <p className="text-sm text-gray-700 text-center">
              <strong>Demo Credentials:</strong><br />
              Email: admin@aaroham.com<br />
              Password: admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
