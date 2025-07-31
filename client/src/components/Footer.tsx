import { Sparkles, Crown, Diamond, Heart, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-gradient-to-br from-amber-800 via-orange-800 to-amber-900 text-white py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-32 h-32 bg-golden-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-bright-gold rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-bright-gold to-golden-yellow rounded-full flex items-center justify-center shadow-xl">
                <Crown className="h-9 w-9 text-navy-blue" />
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-majestic font-bold text-white">AAROHAM</span>
                <span className="text-sm font-signature text-bright-gold tracking-widest">Royal Events</span>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed font-elegant text-base mb-6">
              India's premier AI-powered royal event planning platform, elevating every celebration 
              with sophisticated technology and deep cultural reverence for unforgettable experiences.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/80">
                <Phone className="h-4 w-4 text-bright-gold" />
                <a href="tel:+917698889321" className="text-sm hover:text-bright-gold transition-colors">
                  +91 769 888 9321
                </a>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Mail className="h-4 w-4 text-bright-gold" />
                <a href="mailto:aaroham.net@gmail.com" className="text-sm hover:text-bright-gold transition-colors">
                  aaroham.net@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Mail className="h-4 w-4 text-bright-gold" />
                <a href="mailto:withaaroham@aaroham.com" className="text-sm hover:text-bright-gold transition-colors">
                  withaaroham@aaroham.com
                </a>
                <span className="text-xs text-bright-gold">(Careers)</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-2xl font-majestic font-semibold mb-6 flex items-center text-white">
              <Diamond className="w-5 h-5 mr-3 text-bright-gold" />
              Royal Services
            </h4>
            <ul className="space-y-3 text-white/90 font-elegant">
              <li>
                <Link to="/vendors?category=wedding" className="hover:text-bright-gold transition-colors text-base hover:translate-x-2 inline-block transition-transform duration-300">
                  Royal Wedding Planning
                </Link>
              </li>
              <li>
                <Link to="/vendors?category=corporate" className="hover:text-bright-gold transition-colors text-base hover:translate-x-2 inline-block transition-transform duration-300">
                  Elite Corporate Events
                </Link>
              </li>
              <li>
                <Link to="/vendors?category=birthday" className="hover:text-bright-gold transition-colors text-base hover:translate-x-2 inline-block transition-transform duration-300">
                  Premium Birthday Parties
                </Link>
              </li>
              <li>
                <Link to="/vendors?category=social" className="hover:text-bright-gold transition-colors text-base hover:translate-x-2 inline-block transition-transform duration-300">
                  Exclusive Social Events
                </Link>
              </li>
              <li>
                <Link to="/plan-my-event" className="hover:text-bright-gold transition-colors text-base hover:translate-x-2 inline-block transition-transform duration-300">
                  AI Event Planning
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-2xl font-majestic font-semibold mb-6 flex items-center text-white">
              <Sparkles className="w-5 h-5 mr-3 text-bright-gold" />
              Royal Company
            </h4>
            <ul className="space-y-3 text-white/90 font-elegant">
              <li>
                <Link to="/about" className="hover:text-bright-gold transition-colors text-base hover:translate-x-2 inline-block transition-transform duration-300">
                  About Our Legacy
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="hover:text-bright-gold transition-colors text-base hover:translate-x-2 inline-block transition-transform duration-300">
                  Elite Vendors
                </Link>
              </li>
              <li>
                <Link to="/customer-care" className="hover:text-bright-gold transition-colors text-base hover:translate-x-2 inline-block transition-transform duration-300">
                  Royal Support
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-bright-gold transition-colors text-base hover:translate-x-2 inline-block transition-transform duration-300">
                  Join Aaroham
                </Link>
              </li>
              <li>
                <a href="mailto:withaaroham@aaroham.com" className="hover:text-bright-gold transition-colors text-base hover:translate-x-2 inline-block transition-transform duration-300">
                  Work With Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-2xl font-majestic font-semibold mb-6 flex items-center text-white">
              <Heart className="w-5 h-5 mr-3 text-bright-gold" />
              Royal Connect
            </h4>
            <p className="text-white/90 mb-6 font-elegant text-base">
              Stay connected with our latest royal events and AI innovations
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.instagram.com/aaroham_" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-12 h-12 bg-gradient-to-r from-bright-gold to-golden-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                  <span className="text-lg font-majestic font-bold text-navy-blue group-hover:scale-110 transition-transform duration-300">ig</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/groups/14719662/" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-12 h-12 bg-gradient-to-r from-bright-gold to-golden-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                  <span className="text-lg font-majestic font-bold text-navy-blue group-hover:scale-110 transition-transform duration-300">in</span>
                </div>
              </a>
              <a href="mailto:aaroham.net@gmail.com" className="group">
                <div className="w-12 h-12 bg-gradient-to-r from-bright-gold to-golden-yellow rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg">
                  <Mail className="h-5 w-5 text-navy-blue group-hover:scale-110 transition-transform duration-300" />
                </div>
              </a>
            </div>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-bright-gold" />
                <span className="text-sm">Mumbai, Delhi, Bangalore</span>
              </div>
              <p className="text-sm">Pan-India Service Available</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <a href="https://www.instagram.com/aaroram_" target="_blank" rel="noopener noreferrer" className="text-xs bg-bright-gold/20 text-bright-gold px-2 py-1 rounded-full hover:bg-bright-gold/30 transition-colors flex items-center gap-1">
                  📸 Follow Our Journey <ExternalLink className="h-3 w-3" />
                </a>
                <a href="https://www.linkedin.com/groups/14719662/" target="_blank" rel="noopener noreferrer" className="text-xs bg-bright-gold/20 text-bright-gold px-2 py-1 rounded-full hover:bg-bright-gold/30 transition-colors flex items-center gap-1">
                  👥 Join Our Network <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t-2 border-bright-gold/30 mt-16 pt-12 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-white/90 font-elegant text-base">
              &copy; 2024 Aaroham Royal Events. All rights reserved. 
            </p>
            <div className="flex space-x-6 text-sm text-white/80">
              <Link to="/privacy-policy" className="hover:text-bright-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-bright-gold transition-colors">Terms of Service</Link>
              <Link to="/refund-policy" className="hover:text-bright-gold transition-colors">Refund Policy</Link>
            </div>
            <p className="text-bright-gold font-signature text-xl">
              Rising with every royal celebration ✨
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;