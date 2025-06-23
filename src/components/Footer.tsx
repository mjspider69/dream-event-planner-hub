
import { Sparkles, Crown, Diamond, Heart, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pastel-gradient text-white py-20 royal-section-pastel">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16">
          <div>
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-16 h-16 bg-gradient-to-r from-pastel-gold to-white rounded-full flex items-center justify-center shadow-xl">
                <Crown className="h-9 w-9 text-soft-burgundy" />
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-majestic font-bold text-white">AAROHAM</span>
                <span className="text-sm font-signature text-white/80 tracking-widest">Royal Events</span>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed font-elegant text-lg">
              India's premier AI-powered royal event planning platform, elevating every celebration 
              with sophisticated technology and deep cultural reverence for unforgettable experiences.
            </p>
          </div>
          
          <div>
            <h4 className="text-3xl font-majestic font-semibold mb-8 flex items-center">
              <Diamond className="w-6 h-6 mr-3" />
              Royal Services
            </h4>
            <ul className="space-y-4 text-white/90 font-elegant">
              <li><Link to="/vendors/wedding" className="hover:text-pastel-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Royal Wedding Planning</Link></li>
              <li><Link to="/vendors/corporate" className="hover:text-pastel-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Elite Corporate Events</Link></li>
              <li><Link to="/vendors/birthday" className="hover:text-pastel-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Premium Birthday Parties</Link></li>
              <li><Link to="/vendors/social" className="hover:text-pastel-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Exclusive Social Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-3xl font-majestic font-semibold mb-8 flex items-center">
              <Sparkles className="w-6 h-6 mr-3" />
              Royal Company
            </h4>
            <ul className="space-y-4 text-white/90 font-elegant">
              <li><Link to="/about" className="hover:text-pastel-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">About Our Legacy</Link></li>
              <li><Link to="/vendors" className="hover:text-pastel-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Elite Vendors</Link></li>
              <li><Link to="/testimonials" className="hover:text-pastel-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Royal Testimonials</Link></li>
              <li><Link to="/customer-care" className="hover:text-pastel-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Royal Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-3xl font-majestic font-semibold mb-8 flex items-center">
              <Heart className="w-6 h-6 mr-3" />
              Royal Connect
            </h4>
            <p className="text-white/90 mb-8 font-elegant text-lg">Stay connected with our latest royal events and AI innovations</p>
            <div className="flex space-x-5">
              <div className="w-16 h-16 bg-gradient-to-r from-pastel-gold to-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-xl group">
                <span className="text-xl font-majestic font-bold text-soft-burgundy group-hover:scale-110 transition-transform duration-300">f</span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-pastel-gold to-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-xl group">
                <span className="text-xl font-majestic font-bold text-soft-burgundy group-hover:scale-110 transition-transform duration-300">t</span>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-pastel-gold to-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-xl group">
                <span className="text-xl font-majestic font-bold text-soft-burgundy group-hover:scale-110 transition-transform duration-300">i</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t-2 border-pastel-gold/40 mt-20 pt-16 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/90 font-elegant text-xl">
              &copy; 2024 Aaroham Royal Events. All rights reserved. 
            </p>
            <p className="text-pastel-gold font-signature text-2xl mt-4 md:mt-0">
              Rising with every royal celebration ✨
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
