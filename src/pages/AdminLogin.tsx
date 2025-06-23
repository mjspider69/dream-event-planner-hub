
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Crown, Lock, User, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Admin credentials (in real app, this would be backend authentication)
    const adminCredentials = {
      email: "admin@aaroham.com",
      password: "admin123"
    };

    if (loginData.email === adminCredentials.email && loginData.password === adminCredentials.password) {
      localStorage.setItem("isAdminAuthenticated", "true");
      localStorage.setItem("adminEmail", loginData.email);
      toast({
        title: "Welcome Admin!",
        description: "Successfully logged into Aaroham Admin Panel",
      });
      navigate("/admin");
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen royal-section-pastel flex items-center justify-center p-6">
      <div className="absolute inset-0 pastel-gradient opacity-90"></div>
      
      <Card className="relative z-10 w-full max-w-md royal-card-pastel">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 pastel-gradient rounded-full flex items-center justify-center shadow-2xl">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-4xl font-majestic text-gradient-royal mb-2">
              AAROHAM
            </CardTitle>
            <p className="text-soft-burgundy font-elegant text-lg">Admin Portal</p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-soft-burgundy font-royal font-semibold flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Admin Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@aaroham.com"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="border-pastel-gold focus:border-royal-purple transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-soft-burgundy font-royal font-semibold flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="border-pastel-gold focus:border-royal-purple transition-colors"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full royal-button-pastel font-majestic text-lg py-3"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Access Admin Panel"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-pastel-gold/10 rounded-lg">
            <p className="text-sm text-soft-burgundy font-elegant text-center">
              Demo Credentials:<br />
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
