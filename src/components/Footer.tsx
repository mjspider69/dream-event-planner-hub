
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Aaroham</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              India's first AI-powered event planning platform, elevating every celebration 
              with intelligent technology and cultural respect.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/vendors/wedding" className="hover:text-amber-400 transition-colors">Wedding Planning</Link></li>
              <li><Link to="/vendors/corporate" className="hover:text-amber-400 transition-colors">Corporate Events</Link></li>
              <li><Link to="/vendors/birthday" className="hover:text-amber-400 transition-colors">Birthday Parties</Link></li>
              <li><Link to="/vendors/social" className="hover:text-amber-400 transition-colors">Social Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link to="/vendors" className="hover:text-amber-400 transition-colors">Vendors</Link></li>
              <li><Link to="/testimonials" className="hover:text-amber-400 transition-colors">Testimonials</Link></li>
              <li><Link to="/customer-care" className="hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <p className="text-gray-400 mb-4">Stay updated with our latest events and AI innovations</p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors cursor-pointer">
                <span className="text-sm font-bold">i</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Aaroham. All rights reserved. Rising with every celebration. 🚀</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
