
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
  const { user } = useAuth();

  const handleGetStarted = () => {
    setShowSignUp(true);
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
    window.location.href = '/customer-dashboard';
  };

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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-yellow-600/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-soft-sand text-charcoal-gray px-4 py-2 border border-royal-gold">
              AI-Powered Event Planning
            </Badge>
            
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gradient-gold">
                ELEVATE EVERY OCCASION
              </span>
            </h1>
            
            <p className="font-poppins text-xl md:text-2xl text-charcoal-gray mb-8 leading-relaxed">
              Transform your celebrations with India's most trusted event planning platform. 
              From intimate gatherings to grand celebrations, we make every moment unforgettable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-royal-gold to-warm-gold hover:from-deep-gold hover:to-royal-gold text-pearl-white px-8 py-4 text-lg font-poppins transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              {/* Only show AI chatbot link if user is authenticated */}
              {user ? (
                <Link to="/ai-chatbot">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-royal-gold text-royal-gold hover:bg-soft-sand px-8 py-4 text-lg font-poppins transition-all duration-300"
                  >
                    <Bot className="mr-2 h-5 w-5" />
                    Chat with Aarohi
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-royal-gold text-royal-gold hover:bg-soft-sand px-8 py-4 text-lg font-poppins transition-all duration-300"
                  >
                    <Bot className="mr-2 h-5 w-5" />
                    Sign In to Chat
                  </Button>
                </Link>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-royal-gold to-warm-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-pearl-white" />
                </div>
                <h3 className="font-cormorant text-xl font-semibold mb-2 text-gradient-gold">1000+ Verified Vendors</h3>
                <p className="font-poppins text-charcoal-gray">Handpicked professionals across India</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-royal-gold to-warm-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="h-8 w-8 text-pearl-white" />
                </div>
                <h3 className="font-cormorant text-xl font-semibold mb-2 text-gradient-gold">Secure Payments</h3>
                <p className="font-poppins text-charcoal-gray">Razorpay powered safe transactions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-royal-gold to-warm-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="h-8 w-8 text-pearl-white" />
                </div>
                <h3 className="font-cormorant text-xl font-semibold mb-2 text-gradient-gold">24/7 Support</h3>
                <p className="font-poppins text-charcoal-gray">Dedicated assistance throughout your journey</p>
              </div>
            </div>
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
      
      <SignUpModal 
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSuccess={handleSignUpSuccess}
      />
    </div>
  );
};

export default Index;
