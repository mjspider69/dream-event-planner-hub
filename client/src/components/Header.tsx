import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, User, LogOut, Settings, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (!result?.error) {
        navigate('/');
        toast.success("Signed out successfully");
      } else {
        toast.error("Failed to sign out");
      }
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const getUserDashboard = () => {
    const userType = getUserType();
    switch (userType) {
      case 'vendor': return '/vendor-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/customer-dashboard';
    }
  };

  const getUserName = () => {
    return (user as any)?.full_name || user?.email?.split('@')[0] || 'User';
  };

  const getUserType = () => {
    return (user as any)?.user_type || 'customer';
  };

  return (
    <header className="luxury-nav sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-royal-gold to-warm-gold rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-pearl-white" />
            </div>
            <div>
              <h1 className="font-playfair text-2xl font-bold gold-shimmer-text">
                Aaroham
              </h1>
              <p className="font-poppins text-xs text-charcoal-gray -mt-1">AI Event Planning</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/vendors"
              className="font-poppins text-charcoal-gray hover:text-royal-gold transition-colors font-medium"
            >
              Find Vendors
            </Link>
            
            <Link
              to="/packages"
              className="font-poppins text-charcoal-gray hover:text-royal-gold transition-colors font-medium"
            >
              Packages
            </Link>
            
            {/* Only show these links when user is authenticated */}
            {user && (
              <Link
                to="/ai-chatbot"
                className="font-poppins text-charcoal-gray hover:text-royal-gold transition-colors font-medium flex items-center"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat with Aarohi
              </Link>
            )}
            
            <Link
              to="/about"
              className="font-poppins text-charcoal-gray hover:text-royal-gold transition-colors font-medium"
            >
              About
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-soft-sand">
                    <div className="w-8 h-8 bg-gradient-to-r from-royal-gold to-warm-gold rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-pearl-white" />
                    </div>
                    <span className="font-cormorant font-medium text-royal-gold">{getUserName()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-pearl-white border-soft-sand">
                  <DropdownMenuItem asChild>
                    <Link to={getUserDashboard()} className="flex items-center font-poppins">
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="font-poppins">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button variant="ghost" className="font-poppins text-charcoal-gray hover:text-royal-gold hover:bg-soft-sand">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="luxury-button">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/vendors"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Find Vendors
              </Link>
              
              <Link
                to="/packages"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Packages
              </Link>
              
              {/* Only show these links when user is authenticated */}
              {user && (
                <Link
                  to="/ai-chatbot"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat with Aarohi
                </Link>
              )}
              
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              
              {user ? (
                <div className="border-t pt-4 space-y-2">
                  <Link
                    to={getUserDashboard()}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Platform Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium w-full text-left"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t pt-4 space-y-2">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-yellow-500 hover:from-blue-600 hover:to-yellow-600 text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;