
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gold/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-burgundy to-dark-burgundy rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-gold" />
            </div>
            <span className="text-2xl font-bold text-gold-gradient">
              AAROHAM
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-burgundy hover:text-gold transition-colors font-medium">Home</Link>
            <Link to="/vendors" className="text-burgundy hover:text-gold transition-colors font-medium">Vendors</Link>
            <Link to="/about" className="text-burgundy hover:text-gold transition-colors font-medium">Services</Link>
            <Link to="/plan-event" className="text-burgundy hover:text-gold transition-colors font-medium">Gallery</Link>
            <Link to="/customer-care" className="text-burgundy hover:text-gold transition-colors font-medium">Contact</Link>
            <Link to="/login">
              <Button variant="outline" className="border-burgundy text-burgundy hover:bg-burgundy hover:text-gold">
                Customer Login
              </Button>
            </Link>
            <Link to="/vendor-onboarding">
              <Button className="gold-gradient text-burgundy hover:opacity-90 font-semibold">
                Vendor Login
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-burgundy">
                Admin
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
