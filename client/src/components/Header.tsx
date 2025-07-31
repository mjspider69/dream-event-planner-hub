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
      await signOut();
      navigate('/');
      toast.success("Signed out successfully");
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
            <div className="relative group">
              <button className="font-poppins text-charcoal-gray hover:text-royal-gold transition-colors font-medium flex items-center space-x-1">
                <span>Services</span>
                <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-pearl-white shadow-xl rounded-lg border border-royal-gold/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link to="/vendor-listing" className="block px-4 py-2 text-charcoal-gray hover:text-royal-gold hover:bg-royal-gold/5 transition-colors">
                    Find Vendors
                  </Link>
                  <Link to="/packages" className="block px-4 py-2 text-charcoal-gray hover:text-royal-gold hover:bg-royal-gold/5 transition-colors">
                    Event Packages
                  </Link>
                  <Link to="/plan-my-event" className="block px-4 py-2 text-charcoal-gray hover:text-royal-gold hover:bg-royal-gold/5 transition-colors">
                    Plan My Event
                  </Link>
                  <Link to="/quotation" className="block px-4 py-2 text-charcoal-gray hover:text-royal-gold hover:bg-royal-gold/5 transition-colors">
                    Get Quotation
                  </Link>
                </div>
              </div>
            </div>
            
            <Link
              to="/about"
              className="font-poppins text-charcoal-gray hover:text-royal-gold transition-colors font-medium"
            >
              About
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
            className="md:hidden p-2 rounded-md text-charcoal-gray hover:text-royal-gold hover:bg-soft-sand transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-royal-gold/20 py-4 bg-pearl-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4 px-4">
              <Link
                to="/vendor-listing"
                className="text-charcoal-gray hover:text-royal-gold transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Find Vendors
              </Link>
              <Link
                to="/packages"
                className="text-charcoal-gray hover:text-royal-gold transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Event Packages
              </Link>
              <Link
                to="/plan-my-event"
                className="text-charcoal-gray hover:text-royal-gold transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Plan My Event
              </Link>
              <Link
                to="/quotation"
                className="text-charcoal-gray hover:text-royal-gold transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Get Quotation
              </Link>
              <Link
                to="/about"
                className="text-charcoal-gray hover:text-royal-gold transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              
              {/* Mobile User Actions */}
              <div className="border-t border-royal-gold/20 pt-4 mt-4">
                {user ? (
                  <div className="space-y-3">
                    <Link
                      to={getUserDashboard()}
                      className="flex items-center space-x-2 text-charcoal-gray hover:text-royal-gold transition-colors font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 text-charcoal-gray hover:text-royal-gold transition-colors font-medium py-2 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/auth"
                      className="block text-charcoal-gray hover:text-royal-gold transition-colors font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth"
                      className="block"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button className="w-full luxury-button">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;