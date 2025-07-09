
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Star, Users, Shield, Calendar, CheckCircle, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatbotIntroPopup from "@/components/ChatbotIntroPopup";
import EventPackages from "@/components/EventPackages";
import SignUpModal from "@/components/SignUpModal";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const { user } = useAuth();

  const handleGetStarted = () => {
    setShowSignUp(true);
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
    window.location.href = '/customer-dashboard';
  };

  const vendors = [
    {
      id: 1,
      name: "Rajesh Singh",
      speciality: "Photographer",
      location: "Jaipur",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      rating: 4.8,
      isApproved: true,
      isOnline: true
    },
    {
      id: 2,
      name: "Elegant Decor",
      speciality: "Decorator",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop",
      rating: 4.9,
      isApproved: true,
      isOnline: true
    },
    {
      id: 3,
      name: "Sweet Treats",
      speciality: "Bakery",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
      rating: 4.7,
      isApproved: true,
      isOnline: true
    },
    {
      id: 4,
      name: "DJ Arjun",
      speciality: "DJ",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=face",
      rating: 4.8,
      isApproved: true,
      isOnline: true
    }
  ];

  const packages = [
    {
      name: "Golden Package",
      price: "₹50,000",
      includes: ["Venue", "Catering", "Decoration"],
      popular: true
    },
    {
      name: "Silver Package", 
      price: "₹30,000",
      includes: ["Photography", "Sound & Lighting"],
      popular: false
    },
    {
      name: "Platinum Package",
      price: "Customizable",
      includes: ["Personalize all services"],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Priya & Arjun",
      event: "Wedding in Mumbai",
      rating: 5,
      review: "Aaroham made our dream wedding come true! The coordination was flawless and every vendor was professional.",
      image: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Rajesh Kumar",
      event: "Corporate Event",
      rating: 5,
      review: "Outstanding service for our company's annual day. Everything was perfectly organized and within budget.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Meera Sharma",
      event: "Birthday Party",
      rating: 5,
      review: "My daughter's birthday party was magical! The team handled everything while I enjoyed the celebration.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b562?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSpeciality = !selectedSpeciality || vendor.speciality === selectedSpeciality;
    const matchesLocation = !selectedLocation || vendor.location === selectedLocation;
    return vendor.isApproved && vendor.isOnline && matchesSpeciality && matchesLocation;
  });

  const handleVendorClick = (vendor: any) => {
    if (!user) {
      alert("Please log in to view full vendor details and contact options.");
      return;
    }
    // Navigate to vendor details
  };

  return (
    <div className="min-h-screen bg-pearl-white">
      <Helmet>
        <title>Aaroham - India's Premier AI Event Planning Platform</title>
        <meta name="description" content="Plan perfect events with Aaroham's AI-powered platform. 1000+ verified vendors, secure payments, 24/7 support. From weddings to corporate events across India." />
        <meta name="keywords" content="event planning, wedding planner, AI event planning, India events, vendor booking, corporate events, birthday parties" />
        <meta property="og:title" content="Aaroham - India's Premier AI Event Planning Platform" />
        <meta property="og:description" content="Plan perfect events with Aaroham's AI-powered platform. 1000+ verified vendors, secure payments, 24/7 support." />
        <meta property="og:image" content="https://aaroham-com.lovable.app/og-image.jpg" />
        <meta property="og:url" content="https://aaroham-com.lovable.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aaroham - India's Premier AI Event Planning Platform" />
        <meta name="twitter:description" content="Plan perfect events with Aaroham's AI-powered platform. 1000+ verified vendors across India." />
        <link rel="canonical" href="https://aaroham-com.lovable.app/" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-gold/20 to-warm-gold/30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-8 leading-tight text-pearl-white drop-shadow-lg">
              Celebrate Elegance
            </h1>
            <h2 className="font-playfair text-4xl md:text-6xl font-semibold mb-12 text-gradient-gold drop-shadow-lg">
              Plan with Aaroham
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="luxury-button px-12 py-6 text-xl font-poppins font-semibold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                Plan My Event
              </Button>
              
              <Link to="/vendors">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-3 border-pearl-white bg-pearl-white/20 backdrop-blur-sm text-pearl-white hover:bg-pearl-white hover:text-royal-gold px-12 py-6 text-xl font-poppins font-semibold rounded-full shadow-2xl transition-all duration-300"
                >
                  Explore Vendors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Showcase Section */}
      <section className="luxury-section py-20 bg-pearl-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-5xl font-bold mb-4 gold-shimmer-text">
              Vendors
            </h2>
            <div className="flex justify-end mb-8">
              <span className="font-poppins text-charcoal-gray">Sort by</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex gap-6 mb-12 max-w-2xl">
            <div className="flex-1">
              <select 
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
                className="w-full p-4 border-2 border-soft-sand rounded-lg bg-pearl-white font-poppins text-charcoal-gray focus:border-royal-gold focus:outline-none"
              >
                <option value="">Speciality</option>
                <option value="Photographer">Photographer</option>
                <option value="Decorator">Decorator</option>
                <option value="Bakery">Bakery</option>
                <option value="DJ">DJ</option>
              </select>
            </div>
            <div className="flex-1">
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-4 border-2 border-soft-sand rounded-lg bg-pearl-white font-poppins text-charcoal-gray focus:border-royal-gold focus:outline-none"
              >
                <option value="">Location</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
          </div>

          {/* Vendor Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="vendor-card p-6 cursor-pointer" onClick={() => handleVendorClick(vendor)}>
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2 text-charcoal-gray">{vendor.name}</h3>
                <p className="font-poppins text-charcoal-gray mb-1">{vendor.speciality}</p>
                <div className="flex items-center mb-4">
                  <Star className="h-4 w-4 text-royal-gold fill-current mr-1" />
                  <span className="font-poppins text-charcoal-gray">{vendor.location}</span>
                </div>
                <Button className="w-full luxury-button font-poppins font-medium">
                  Add to Event
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="luxury-section py-20 bg-soft-sand">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl font-bold mb-4 gold-shimmer-text">
              Packages
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={index} className="luxury-card p-8 relative">
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-royal-gold to-warm-gold text-pearl-white px-4 py-2 rounded-bl-lg rounded-tr-lg">
                    <span className="font-poppins font-semibold text-sm">Popular</span>
                  </div>
                )}
                <h3 className="font-playfair text-2xl font-bold mb-2 text-gradient-gold">{pkg.name}</h3>
                <div className="font-playfair text-3xl font-bold mb-6 text-charcoal-gray">{pkg.price}</div>
                {pkg.name === "Silver Package" && (
                  <div className="mb-6">
                    <p className="font-poppins text-charcoal-gray font-medium">Includes</p>
                  </div>
                )}
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-royal-gold rounded-full mr-3"></span>
                      <span className="font-poppins text-charcoal-gray">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full luxury-button font-poppins font-medium">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-section py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold mb-4 gold-shimmer-text">
              How Aaroham Works
            </h2>
            <p className="font-cormorant text-xl text-charcoal-gray">Simple steps to your perfect event</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-royal-gold to-warm-gold rounded-full flex items-center justify-center mx-auto mb-4 text-pearl-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="font-cormorant text-xl font-semibold mb-2 text-gradient-gold">Choose Package</h3>
              <p className="font-poppins text-charcoal-gray">Select from our curated event packages or customize your own</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-deep-gold to-royal-gold rounded-full flex items-center justify-center mx-auto mb-4 text-pearl-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="font-cormorant text-xl font-semibold mb-2 text-gradient-gold">OTP Verification</h3>
              <p className="font-poppins text-charcoal-gray">Quick sign-up with email/SMS OTP for secure account creation</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-warm-gold to-deep-gold rounded-full flex items-center justify-center mx-auto mb-4 text-pearl-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="font-cormorant text-xl font-semibold mb-2 text-gradient-gold">Get Matched</h3>
              <p className="font-poppins text-charcoal-gray">Our AI connects you with the best vendors for your needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-royal-gold to-warm-gold rounded-full flex items-center justify-center mx-auto mb-4 text-pearl-white text-2xl font-bold shadow-lg">
                4
              </div>
              <h3 className="font-cormorant text-xl font-semibold mb-2 text-gradient-gold">Celebrate</h3>
              <p className="font-poppins text-charcoal-gray">Relax and enjoy your perfectly planned event</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Packages */}
      <EventPackages />

      <section className="luxury-section py-16 bg-soft-sand">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold mb-4 gold-shimmer-text">
              What Our Customers Say
            </h2>
            <p className="font-cormorant text-xl text-charcoal-gray">Real stories from real celebrations</p>
            <div className="cultural-quote">"Every celebration tells a story of love and tradition"</div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-royal-gold"
                  />
                  <div>
                    <h4 className="font-cormorant font-semibold text-royal-gold">{testimonial.name}</h4>
                    <p className="font-poppins text-sm text-charcoal-gray">{testimonial.event}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-royal-gold fill-current" />
                  ))}
                </div>
                
                <p className="font-poppins text-charcoal-gray italic">{testimonial.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-royal-gold to-warm-gold text-pearl-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-4">Ready to Plan Your Perfect Event?</h2>
          <p className="font-cormorant text-xl mb-8 opacity-90">Join thousands of satisfied customers who trusted Aaroham</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-pearl-white text-royal-gold hover:bg-soft-sand px-8 py-4 text-lg font-poppins font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Planning Now
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
            
            {/* Only show AI chatbot link if user is authenticated */}
            {user ? (
              <Link to="/ai-chatbot">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-pearl-white text-pearl-white hover:bg-pearl-white hover:text-royal-gold px-8 py-4 text-lg font-poppins transition-all duration-300"
                >
                  <Bot className="mr-2 h-5 w-5" />
                  Talk to Aarohi
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-pearl-white text-pearl-white hover:bg-pearl-white hover:text-royal-gold px-8 py-4 text-lg font-poppins transition-all duration-300"
                >
                  <Bot className="mr-2 h-5 w-5" />
                  Sign In to Chat
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotIntroPopup />
      
      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          className="luxury-chatbot w-16 h-16 rounded-full shadow-2xl"
          onClick={() => user ? window.location.href = '/ai-chatbot' : window.location.href = '/auth'}
        >
          <Bot className="h-6 w-6" />
        </Button>
        <div className="absolute -top-12 right-0 bg-pearl-white text-charcoal-gray px-3 py-1 rounded-lg shadow-lg font-poppins text-sm whitespace-nowrap">
          How can I assist you?
        </div>
      </div>
      
      <SignUpModal 
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSuccess={handleSignUpSuccess}
      />
    </div>
  );
};

export default Index;
