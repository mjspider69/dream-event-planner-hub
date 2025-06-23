
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b-2 border-pastel-gold">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-14 h-14 pastel-gradient rounded-full flex items-center justify-center shadow-xl">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-majestic font-bold shimmer-text-pastel">
                AAROHAM
              </span>
              <span className="text-sm font-signature text-soft-burgundy tracking-widest">
                Royal Events
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <Link to="/" className="text-soft-burgundy hover:text-royal-purple transition-all duration-300 font-royal font-medium text-lg tracking-wide hover:scale-105 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pastel-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/vendors" className="text-soft-burgundy hover:text-royal-purple transition-all duration-300 font-royal font-medium text-lg tracking-wide hover:scale-105 relative group">
              Vendors
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pastel-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-soft-burgundy hover:text-royal-purple transition-all duration-300 font-royal font-medium text-lg tracking-wide hover:scale-105 relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pastel-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/plan-event" className="text-soft-burgundy hover:text-royal-purple transition-all duration-300 font-royal font-medium text-lg tracking-wide hover:scale-105 relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pastel-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/customer-care" className="text-soft-burgundy hover:text-royal-purple transition-all duration-300 font-royal font-medium text-lg tracking-wide hover:scale-105 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pastel-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-2 border-soft-burgundy text-soft-burgundy hover:bg-soft-burgundy hover:text-white font-royal font-semibold px-6 py-2 rounded-full transition-all duration-300">
                Customer Login
              </Button>
            </Link>
            <Link to="/vendor-onboarding">
              <Button className="royal-button-pastel px-8 py-3 font-majestic text-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Vendor Login
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" className="border-2 border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white font-royal font-semibold px-6 py-2 rounded-full transition-all duration-300">
                Admin Panel
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-soft-burgundy hover:text-royal-purple transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 border-t border-pastel-gold/30">
            <nav className="flex flex-col space-y-4 mt-6">
              <Link to="/" className="text-soft-burgundy hover:text-royal-purple font-royal font-medium text-lg">Home</Link>
              <Link to="/vendors" className="text-soft-burgundy hover:text-royal-purple font-royal font-medium text-lg">Vendors</Link>
              <Link to="/about" className="text-soft-burgundy hover:text-royal-purple font-royal font-medium text-lg">Services</Link>
              <Link to="/plan-event" className="text-soft-burgundy hover:text-royal-purple font-royal font-medium text-lg">Gallery</Link>
              <Link to="/customer-care" className="text-soft-burgundy hover:text-royal-purple font-royal font-medium text-lg">Contact</Link>
              <div className="flex flex-col space-y-3 pt-6">
                <Link to="/login">
                  <Button variant="outline" className="w-full border-soft-burgundy text-soft-burgundy hover:bg-soft-burgundy hover:text-white font-royal">
                    Customer Login
                  </Button>
                </Link>
                <Link to="/vendor-onboarding">
                  <Button className="w-full royal-button-pastel font-majestic">
                    Vendor Login
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
