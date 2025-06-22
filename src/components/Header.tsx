
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Aaroham
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-amber-600 transition-colors">About</Link>
            <Link to="/vendors" className="text-gray-700 hover:text-amber-600 transition-colors">Vendors</Link>
            <Link to="/packages" className="text-gray-700 hover:text-amber-600 transition-colors">Packages</Link>
            <Link to="/plan-event" className="text-gray-700 hover:text-amber-600 transition-colors">Plan My Event</Link>
            <Link to="/customer-care" className="text-gray-700 hover:text-amber-600 transition-colors">Contact</Link>
            <Link to="/login" className="text-gray-700 hover:text-amber-600 transition-colors">Login</Link>
            <Link to="/plan-event">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                Plan My Event
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
