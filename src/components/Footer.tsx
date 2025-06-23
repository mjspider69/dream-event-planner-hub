
import { Sparkles, Crown, Diamond, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="royal-gradient text-gold py-16 royal-section">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-metallic-gold to-royal-gold rounded-full flex items-center justify-center shadow-xl">
                <Crown className="h-7 w-7 text-burgundy" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-royal font-bold shimmer-text">AAROHAM</span>
                <span className="text-xs font-elegant text-gold/70 tracking-widest">ROYAL EVENTS</span>
              </div>
            </div>
            <p className="text-gold/80 leading-relaxed font-elegant text-lg">
              India's premier AI-powered royal event planning platform, elevating every celebration 
              with sophisticated technology and deep cultural reverence for unforgettable experiences.
            </p>
          </div>
          
          <div>
            <h4 className="text-2xl font-royal font-semibold mb-6 flex items-center">
              <Diamond className="w-5 h-5 mr-2" />
              Royal Services
            </h4>
            <ul className="space-y-3 text-gold/80 font-elegant">
              <li><Link to="/vendors/wedding" className="hover:text-metallic-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Royal Wedding Planning</Link></li>
              <li><Link to="/vendors/corporate" className="hover:text-metallic-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Elite Corporate Events</Link></li>
              <li><Link to="/vendors/birthday" className="hover:text-metallic-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Premium Birthday Parties</Link></li>
              <li><Link to="/vendors/social" className="hover:text-metallic-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Exclusive Social Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-2xl font-royal font-semibold mb-6 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Royal Company
            </h4>
            <ul className="space-y-3 text-gold/80 font-elegant">
              <li><Link to="/about" className="hover:text-metallic-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">About Our Legacy</Link></li>
              <li><Link to="/vendors" className="hover:text-metallic-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Elite Vendors</Link></li>
              <li><Link to="/testimonials" className="hover:text-metallic-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Royal Testimonials</Link></li>
              <li><Link to="/customer-care" className="hover:text-metallic-gold transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300">Royal Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-2xl font-royal font-semibold mb-6 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Royal Connect
            </h4>
            <p className="text-gold/80 mb-6 font-elegant text-lg">Stay connected with our latest royal events and AI innovations</p>
            <div className="flex space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-metallic-gold to-royal-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-xl group">
                <span className="text-lg font-royal font-bold text-burgundy group-hover:scale-110 transition-transform duration-300">f</span>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-metallic-gold to-royal-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-xl group">
                <span className="text-lg font-royal font-bold text-burgundy group-hover:scale-110 transition-transform duration-300">t</span>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-metallic-gold to-royal-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-xl group">
                <span className="text-lg font-royal font-bold text-burgundy group-hover:scale-110 transition-transform duration-300">i</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t-2 border-metallic-gold/30 mt-16 pt-12 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gold/80 font-elegant text-lg">
              &copy; 2024 Aaroham Royal Events. All rights reserved. 
            </p>
            <p className="text-metallic-gold font-script text-xl mt-4 md:mt-0">
              Rising with every royal celebration ✨
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
