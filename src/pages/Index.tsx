import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Star, Users, Shield, Calendar, CheckCircle, Bot, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatbotIntroPopup from "@/components/ChatbotIntroPopup";
import EventPackages from "@/components/EventPackages";
import SignUpModal from "@/components/SignUpModal";
import SEOOptimization from "@/components/SEOOptimization";
import { useAuth } from "@/hooks/useAuth";
import heroBackground from "@/assets/hero-bg.jpg";

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
      <SEOOptimization 
        title="Aaroham - India's Premier AI-Powered Event Planning Platform"
        description="Plan perfect events with Aaroham's AI-powered platform. 1000+ verified vendors, secure payments, 24/7 support. From weddings to corporate events across India."
        keywords="event planning, wedding planner, AI event planning, India events, vendor booking, corporate events, birthday parties, aaroham, celebration planning"
        ogImage="https://aaroham-com.lovable.app/og-image.jpg"
        canonicalUrl="https://aaroham-com.lovable.app/"
      />
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
      
      {/* Customer Support CTA - Fixed Position */}
      <div className="fixed top-20 right-6 z-40 flex flex-col space-y-2">
        <Button 
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg rounded-full p-3"
          onClick={() => window.open('https://wa.me/917698889321', '_blank')}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg rounded-full p-3"
          onClick={() => window.open('tel:+917698889321', '_blank')}
        >
          <Phone className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBackground})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-gold/20 to-warm-gold/30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-8 leading-tight text-pearl-white drop-shadow-lg">
              Celebrate Elegance
            </h1>
            <h2 className="font-playfair text-4xl md:text-6xl font-semibold mb-6 text-gradient-gold drop-shadow-lg">
              Plan with Aaroham
            </h2>
            <p className="font-playfair text-2xl md:text-3xl font-medium mb-12 text-gradient-gold drop-shadow-lg">
              ELEVATE EVERY OCCASION
            </p>
            
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

      {/* How It Works Section */}
      <section className="luxury-section py-20 bg-gradient-to-br from-pearl-white to-soft-sand">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl font-bold mb-6 gold-shimmer-text">
              How Aaroham Works
            </h2>
            <p className="font-cormorant text-2xl text-charcoal-gray max-w-3xl mx-auto">
              Experience the seamless journey from dream to celebration with our proven process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-royal-gold via-warm-gold to-deep-gold rounded-full flex items-center justify-center mx-auto mb-6 text-pearl-white text-3xl font-bold shadow-xl group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                1
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-3 text-gradient-gold">Tell Us Your Vision</h3>
              <p className="font-poppins text-charcoal-gray text-lg leading-relaxed">Share your event details, preferences, and budget with our intelligent platform</p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-deep-gold via-royal-gold to-warm-gold rounded-full flex items-center justify-center mx-auto mb-6 text-pearl-white text-3xl font-bold shadow-xl group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                2
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-3 text-gradient-gold">Get Matched</h3>
              <p className="font-poppins text-charcoal-gray text-lg leading-relaxed">Our AI algorithm connects you with the perfect vendors based on your requirements</p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-warm-gold via-deep-gold to-royal-gold rounded-full flex items-center justify-center mx-auto mb-6 text-pearl-white text-3xl font-bold shadow-xl group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                3
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-3 text-gradient-gold">Book & Pay Securely</h3>
              <p className="font-poppins text-charcoal-gray text-lg leading-relaxed">Confirm your vendors with secure payments and comprehensive protection</p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-royal-gold via-warm-gold to-deep-gold rounded-full flex items-center justify-center mx-auto mb-6 text-pearl-white text-3xl font-bold shadow-xl group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                4
              </div>
              <h3 className="font-playfair text-2xl font-semibold mb-3 text-gradient-gold">Celebrate</h3>
              <p className="font-poppins text-charcoal-gray text-lg leading-relaxed">Relax and enjoy your perfectly orchestrated event while we handle everything</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Packages Section */}
      <EventPackages />

      {/* Testimonials Section */}
      <section className="luxury-section py-20 bg-gradient-to-br from-soft-sand via-pearl-white to-misty-rose">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl font-bold mb-6 gold-shimmer-text">
              Stories of Success
            </h2>
            <p className="font-cormorant text-2xl text-charcoal-gray max-w-3xl mx-auto mb-4">
              Real experiences from families who trusted Aaroham with their most precious moments
            </p>
            <div className="cultural-quote text-2xl font-great-vibes text-royal-gold opacity-80">
              "Every celebration tells a story of love and tradition"
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card group">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-3 border-royal-gold shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-royal-gold to-warm-gold rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-pearl-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-playfair font-bold text-xl text-royal-gold">{testimonial.name}</h4>
                    <p className="font-poppins text-charcoal-gray">{testimonial.event}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-royal-gold fill-current" />
                  ))}
                </div>
                
                <p className="font-poppins text-charcoal-gray text-lg leading-relaxed italic">
                  "{testimonial.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-royal-gold via-warm-gold to-deep-gold text-pearl-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-6xl font-bold mb-6 drop-shadow-lg">
              Your Dream Event Awaits
            </h2>
            <p className="font-cormorant text-2xl mb-12 opacity-95 leading-relaxed">
              Join thousands of satisfied families who trusted Aaroham to create their most cherished memories
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-pearl-white text-royal-gold hover:bg-soft-sand px-12 py-6 text-xl font-poppins font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-full"
              >
                Start Planning Now
                <Sparkles className="ml-3 h-6 w-6" />
              </Button>
              
              <Link to="/vendors">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-3 border-pearl-white bg-pearl-white/10 backdrop-blur-sm text-pearl-white hover:bg-pearl-white hover:text-royal-gold px-12 py-6 text-xl font-poppins font-bold transition-all duration-300 rounded-full"
                >
                  Browse Vendors
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Chatbot */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="group relative">
          <Link to="/ai-chatbot">
            <Button 
              className="w-20 h-20 rounded-full bg-gradient-to-br from-royal-gold via-warm-gold to-deep-gold text-pearl-white shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-4 border-pearl-white/20"
            >
              <Bot className="h-9 w-9" />
            </Button>
          </Link>
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-charcoal-gray text-pearl-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with Aarohi AI
          </div>
        </div>
      </div>

      <ChatbotIntroPopup />
      
      {showSignUp && (
        <SignUpModal 
          isOpen={showSignUp}
          onClose={() => setShowSignUp(false)}
          onSuccess={handleSignUpSuccess}
        />
      )}
    </div>
  );
};

export default Index;