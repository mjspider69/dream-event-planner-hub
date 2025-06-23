
import { Button } from "@/components/ui/button";
import { Sparkles, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b-4 border-metallic-gold">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 royal-gradient rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-7 w-7 text-metallic-gold" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-royal font-bold shimmer-text">
                AAROHAM
              </span>
              <span className="text-xs font-elegant text-burgundy/70 tracking-widest">
                ROYAL EVENTS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-burgundy hover:text-metallic-gold transition-all duration-300 font-elegant font-medium text-lg tracking-wide hover:scale-105">
              Home
            </Link>
            <Link to="/vendors" className="text-burgundy hover:text-metallic-gold transition-all duration-300 font-elegant font-medium text-lg tracking-wide hover:scale-105">
              Vendors
            </Link>
            <Link to="/about" className="text-burgundy hover:text-metallic-gold transition-all duration-300 font-elegant font-medium text-lg tracking-wide hover:scale-105">
              Services
            </Link>
            <Link to="/plan-event" className="text-burgundy hover:text-metallic-gold transition-all duration-300 font-elegant font-medium text-lg tracking-wide hover:scale-105">
              Gallery
            </Link>
            <Link to="/customer-care" className="text-burgundy hover:text-metallic-gold transition-all duration-300 font-elegant font-medium text-lg tracking-wide hover:scale-105">
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-gold font-elegant font-semibold px-6 py-2 rounded-full transition-all duration-300">
                Customer Login
              </Button>
            </Link>
            <Link to="/vendor-onboarding">
              <Button className="royal-button px-8 py-2 rounded-full font-royal text-lg">
                Vendor Login
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" className="border-2 border-metallic-gold text-metallic-gold hover:bg-metallic-gold hover:text-burgundy font-elegant font-semibold px-6 py-2 rounded-full transition-all duration-300">
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-burgundy hover:text-metallic-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gold/20">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link to="/" className="text-burgundy hover:text-metallic-gold font-elegant font-medium">Home</Link>
              <Link to="/vendors" className="text-burgundy hover:text-metallic-gold font-elegant font-medium">Vendors</Link>
              <Link to="/about" className="text-burgundy hover:text-metallic-gold font-elegant font-medium">Services</Link>
              <Link to="/plan-event" className="text-burgundy hover:text-metallic-gold font-elegant font-medium">Gallery</Link>
              <Link to="/customer-care" className="text-burgundy hover:text-metallic-gold font-elegant font-medium">Contact</Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/login">
                  <Button variant="outline" className="w-full border-burgundy text-burgundy hover:bg-burgundy hover:text-gold">
                    Customer Login
                  </Button>
                </Link>
                <Link to="/vendor-onboarding">
                  <Button className="w-full royal-button">
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
