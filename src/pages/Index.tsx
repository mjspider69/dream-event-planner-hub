
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Heart, Camera, Users, Star, Phone, Mail, MapPin, ArrowRight, Sparkles, Gift, Music, Bot, Shield, CheckCircle, User, Utensils, Car, Flower2, Crown, Diamond } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const heroAnimation = useScrollAnimation();
  const aboutAnimation = useScrollAnimation();
  const howItWorksAnimation = useScrollAnimation();
  const vendorAnimation = useScrollAnimation();
  const packagesAnimation = useScrollAnimation();
  const testimonialsAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();

  const vendorCategories = [
    { name: "Photographer", icon: Camera, color: "royal-gradient" },
    { name: "DJ", icon: Music, color: "royal-gradient" },
    { name: "Decorator", icon: Flower2, color: "royal-gradient" },
    { name: "Caterer", icon: Utensils, color: "royal-gradient" },
    { name: "Priest", icon: User, color: "royal-gradient" },
    { name: "Gifts", icon: Gift, color: "royal-gradient" },
    { name: "Transport", icon: Car, color: "royal-gradient" }
  ];

  const featuredPackages = [
    {
      title: "Royal Wedding Package",
      price: "₹5,00,000",
      image: "photo-1649972904349-6e44c42644a7",
      features: ["Photography", "Decoration", "Catering", "Music"],
      badge: "Premium"
    },
    {
      title: "Corporate Elite Package",
      price: "₹2,50,000", 
      image: "photo-1486312338219-ce68d2c6f44d",
      features: ["Venue", "Catering", "AV Setup", "Photography"],
      badge: "Business"
    },
    {
      title: "Birthday Celebration Package",
      price: "₹75,000",
      image: "photo-1721322800607-8c38375eef04", 
      features: ["Decoration", "Cake", "Photography", "Entertainment"],
      badge: "Celebration"
    }
  ];

  const howItWorks = [
    {
      title: "AI Royal Assistant",
      description: "Our sophisticated AI understands your royal preferences and provides premium recommendations",
      icon: Bot,
      color: "from-metallic-gold to-royal-gold"
    },
    {
      title: "Elite Vendor Matching", 
      description: "Premium algorithms connect you with the finest vendors for your prestigious event",
      icon: Crown,
      color: "from-royal-gold to-metallic-gold"
    },
    {
      title: "Verified Excellence",
      description: "All our vendors are thoroughly vetted and trusted by elite clientele nationwide",
      icon: Diamond,
      color: "from-metallic-gold to-royal-gold"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      event: "Royal Wedding",
      rating: 5,
      text: "Aaroham transformed our wedding into a royal affair! The AI recommendations were exceptional and every detail was perfect.",
      image: "photo-1472396961693-142e6e269027"
    },
    {
      name: "Rajesh Kumar",
      event: "Corporate Gala",
      rating: 5,
      text: "Outstanding service! The elite vendor matching was flawless and our corporate gala exceeded all expectations.",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      name: "Anita Gupta",
      event: "Diamond Jubilee",
      rating: 5,
      text: "The royal treatment we received was incredible. Every vendor was premium quality and the experience was unforgettable!",
      image: "photo-1582562124811-c09040d0a901"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section ref={heroAnimation.elementRef} className="relative py-24 overflow-hidden royal-gradient royal-section">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy/95 to-dark-burgundy/90"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-metallic-gold/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-royal-gold/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className={`text-center max-w-5xl mx-auto ${heroAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-8 bg-metallic-gold/20 text-metallic-gold border-2 border-metallic-gold/50 hover:bg-metallic-gold/30 px-6 py-2 text-lg font-elegant">
              <Crown className="w-5 h-5 mr-2" />
              India's Premier AI-Powered Royal Event Planning
            </Badge>
            
            <h1 className={`text-6xl md:text-8xl font-royal font-bold mb-8 leading-tight ${heroAnimation.isVisible ? 'animate-fade-in-up animate-stagger-1' : ''}`}>
              <span className="shimmer-text block mb-4">Elevate Every</span>
              <span className="text-gold-gradient font-script text-7xl md:text-9xl">Celebration</span>
              <span className="shimmer-text block mt-4">with Aaroham</span>
            </h1>
            
            <p className={`text-2xl text-gold/90 mb-12 max-w-4xl mx-auto leading-relaxed font-elegant ${heroAnimation.isVisible ? 'animate-fade-in-up animate-stagger-2' : ''}`}>
              Experience India's most sophisticated AI-powered event planning platform. 
              Where royal traditions meet cutting-edge technology for unforgettable celebrations.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center ${heroAnimation.isVisible ? 'animate-fade-in-up animate-stagger-3' : ''}`}>
              <Link to="/plan-event">
                <Button size="lg" className="royal-button text-xl px-12 py-8 font-royal">
                  <Sparkles className="mr-3 h-6 w-6" />
                  Begin Your Royal Journey
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/vendor-onboarding">
                <Button size="lg" variant="outline" className="border-3 border-metallic-gold text-metallic-gold hover:bg-metallic-gold/10 text-xl px-12 py-8 font-elegant backdrop-blur-sm">
                  <Crown className="mr-3 h-6 w-6" />
                  Explore Premium Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutAnimation.elementRef} className="py-20 bg-gradient-to-r from-amber-50 to-yellow-50 royal-section">
        <div className={`container mx-auto px-6 text-center ${aboutAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
          <Badge className="mb-6 bg-burgundy/10 text-burgundy border-burgundy/30 px-6 py-2 text-lg font-elegant">
            About Aaroham
          </Badge>
          <h2 className="text-5xl font-royal font-bold mb-8 text-burgundy">The Royal Legacy</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-elegant leading-relaxed">
            Aaroham means "rising" in Sanskrit, symbolizing how we elevate every celebration to royal heights. 
            We masterfully blend sophisticated AI technology with deep cultural reverence to create 
            extraordinary experiences that honor ancient traditions while embracing modern innovation.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksAnimation.elementRef} className="py-24 bg-white royal-section">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 ${howItWorksAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-6 bg-burgundy/10 text-burgundy border-burgundy/30 px-6 py-2 text-lg font-elegant">
              Royal Process
            </Badge>
            <h2 className="text-5xl md:text-6xl font-royal font-bold mb-8 shimmer-text">
              Three Elite Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-elegant">
              Our royal AI-powered platform transforms event planning into an effortless, luxurious experience with premium recommendations and elite vendor partnerships.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {howItWorks.map((step, index) => (
              <div key={index} className={`group ${howItWorksAnimation.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : ''}`}>
                <Card className="royal-card h-full">
                  <CardContent className="p-10 text-center">
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-2xl`}>
                        <step.icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-metallic-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <h3 className="text-2xl font-royal font-bold mb-4 text-burgundy">{step.title}</h3>
                    <p className="text-gray-600 font-elegant leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section ref={vendorAnimation.elementRef} className="py-24 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 royal-section">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 ${vendorAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-6 bg-burgundy/10 text-burgundy border-burgundy/30 px-6 py-2 text-lg font-elegant">
              Elite Vendor Categories
            </Badge>
            <h2 className="text-5xl md:text-6xl font-royal font-bold mb-8 shimmer-text">
              Premium Event Services
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-elegant">
              From royal photographers to master chefs, discover our curated collection of premium vendors for every aspect of your celebration.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {vendorCategories.map((category, index) => (
              <div key={index} className={`group cursor-pointer ${vendorAnimation.isVisible ? `animate-scale-in animate-stagger-${index + 1}` : ''}`}>
                <Card className="royal-card text-center h-full">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-xl`}>
                      <category.icon className="h-8 w-8 text-gold" />
                    </div>
                    <h3 className="font-elegant font-semibold text-burgundy group-hover:text-metallic-gold transition-colors text-lg">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section ref={packagesAnimation.elementRef} className="py-24 bg-white royal-section">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 ${packagesAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-6 bg-burgundy/10 text-burgundy border-burgundy/30 px-6 py-2 text-lg font-elegant">
              Royal Packages
            </Badge>
            <h2 className="text-5xl md:text-6xl font-royal font-bold mb-8 shimmer-text">
              Curated Elite Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-elegant">
              Choose from our meticulously crafted packages designed for different occasions and refined for the most discerning clientele.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {featuredPackages.map((pkg, index) => (
              <div key={index} className={`group ${packagesAnimation.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : ''}`}>
                <Card className="royal-card overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/${pkg.image}?auto=format&fit=crop&w=800&q=80`}
                      alt={pkg.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-metallic-gold text-burgundy font-elegant font-semibold px-4 py-2">
                        {pkg.badge}
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-burgundy text-gold font-royal font-bold text-lg px-4 py-2">
                        {pkg.price}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <h3 className="text-2xl font-royal font-bold mb-6 text-burgundy group-hover:text-metallic-gold transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-gray-600 font-elegant">
                          <CheckCircle className="h-5 w-5 text-metallic-gold mr-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full royal-button font-royal text-lg py-3">
                      <Crown className="mr-2 h-5 w-5" />
                      Select Royal Package
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsAnimation.elementRef} className="py-24 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 royal-section">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 ${testimonialsAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-6 bg-burgundy/10 text-burgundy border-burgundy/30 px-6 py-2 text-lg font-elegant">
              Royal Testimonials
            </Badge>
            <h2 className="text-5xl md:text-6xl font-royal font-bold mb-8 shimmer-text">
              Elite Client Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-elegant">
              Discover how thousands of discerning clients have trusted Aaroham to create their most precious and unforgettable moments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`${testimonialsAnimation.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : ''}`}>
                <Card className="royal-card h-full">
                  <CardContent className="p-8">
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-metallic-gold fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-8 italic leading-relaxed font-elegant text-lg">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-16 h-16 royal-gradient rounded-full flex items-center justify-center text-gold font-royal font-bold text-xl mr-4 shadow-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-royal font-bold text-burgundy text-lg">{testimonial.name}</h4>
                        <p className="text-metallic-gold font-elegant">{testimonial.event}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactAnimation.elementRef} id="contact" className="py-24 royal-gradient text-gold royal-section">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center mb-20 ${contactAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
              <Badge className="mb-8 bg-metallic-gold/20 text-metallic-gold border-2 border-metallic-gold/50 px-6 py-2 text-lg font-elegant">
                <Diamond className="w-5 h-5 mr-2" />
                Royal Consultation
              </Badge>
              <h2 className="text-5xl md:text-6xl font-royal font-bold mb-8 shimmer-text">
                Begin Your Royal Event Journey
              </h2>
              <p className="text-xl text-gold/90 max-w-4xl mx-auto font-elegant">
                Connect with our royal concierge today. Our AI-powered platform awaits to transform your celebration into an extraordinary, unforgettable experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16">
              <div className={`${contactAnimation.isVisible ? 'animate-fade-in-left' : ''}`}>
                <h3 className="text-3xl font-royal font-bold mb-8">Royal Contact Information</h3>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-metallic-gold rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                      <Phone className="h-8 w-8 text-burgundy" />
                    </div>
                    <div>
                      <p className="font-royal font-semibold text-xl">Royal Hotline</p>
                      <p className="text-gold/80 font-elegant text-lg">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-metallic-gold rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                      <Mail className="h-8 w-8 text-burgundy" />
                    </div>
                    <div>
                      <p className="font-royal font-semibold text-xl">Royal Email</p>
                      <p className="text-gold/80 font-elegant text-lg">hello@aaroham.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-metallic-gold rounded-2xl flex items-center justify-center mr-6 shadow-xl">
                      <MapPin className="h-8 w-8 text-burgundy" />
                    </div>
                    <div>
                      <p className="font-royal font-semibold text-xl">Royal Palace</p>
                      <p className="text-gold/80 font-elegant text-lg">Mumbai, India</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`${contactAnimation.isVisible ? 'animate-fade-in-right' : ''}`}>
                <div className="royal-card bg-white/10 backdrop-blur-xl border-2 border-metallic-gold/50">
                  <CardContent className="p-8">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input 
                          placeholder="Your Royal Name" 
                          className="bg-gold/10 border-2 border-metallic-gold/50 text-gold placeholder:text-gold/60 font-elegant text-lg py-3"
                        />
                        <Input 
                          placeholder="Royal Email Address" 
                          type="email"
                          className="bg-gold/10 border-2 border-metallic-gold/50 text-gold placeholder:text-gold/60 font-elegant text-lg py-3"
                        />
                      </div>
                      <Input 
                        placeholder="Event Type" 
                        className="bg-gold/10 border-2 border-metallic-gold/50 text-gold placeholder:text-gold/60 font-elegant text-lg py-3"
                      />
                      <Textarea 
                        placeholder="Tell us about your royal celebration..." 
                        rows={4}
                        className="bg-gold/10 border-2 border-metallic-gold/50 text-gold placeholder:text-gold/60 resize-none font-elegant text-lg"
                      />
                      <Button 
                        size="lg" 
                        className="w-full royal-button font-royal text-xl py-4"
                      >
                        <Crown className="mr-3 h-6 w-6" />
                        Send Royal Message
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                    </form>
                  </CardContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
