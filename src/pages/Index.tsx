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
import SEOOptimization from "@/components/SEOOptimization";

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
    <>
      <SEOOptimization 
        title="Aaroham - India's Premier AI-Powered Royal Event Planning Platform"
        description="Transform your celebrations with Aaroham's AI-powered event planning. From royal weddings to corporate events, we connect you with verified vendors across India."
        keywords="event planning, wedding planning, AI event planner, royal events, Indian weddings, corporate events, birthday parties, event management, vendor booking"
      />
      <div className="min-h-screen bg-gradient-to-br from-cream-white via-white to-pastel-gold/20">
        <Header />

        {/* Hero Section */}
        <section ref={heroAnimation.elementRef} className="relative py-32 overflow-hidden pastel-gradient royal-section-pastel">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-soft-burgundy/90 to-royal-purple/85"></div>
            <div className="absolute top-20 left-20 w-40 h-40 bg-pastel-gold/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-pastel-rose/30 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
          </div>
          
          <div className="container mx-auto px-6 relative">
            <div className={`text-center max-w-6xl mx-auto ${heroAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
              <Badge className="mb-10 bg-pastel-gold/30 text-white border-2 border-pastel-gold/60 hover:bg-pastel-gold/40 px-8 py-3 text-xl font-royal rounded-full">
                <Crown className="w-6 h-6 mr-3" />
                India's Premier AI-Powered Royal Event Planning
              </Badge>
              
              <h1 className={`text-7xl md:text-9xl font-majestic font-bold mb-12 leading-tight text-white ${heroAnimation.isVisible ? 'animate-fade-in-up animate-stagger-1' : ''}`}>
                <span className="block mb-6">Elevate Every</span>
                <span className="font-signature text-8xl md:text-10xl text-pastel-gold block mb-6">Celebration</span>
                <span className="block">with Aaroham</span>
              </h1>
              
              <p className={`text-2xl text-white/90 mb-16 max-w-5xl mx-auto leading-relaxed font-elegant ${heroAnimation.isVisible ? 'animate-fade-in-up animate-stagger-2' : ''}`}>
                Experience India's most sophisticated AI-powered event planning platform. 
                Where royal traditions meet cutting-edge technology for unforgettable celebrations.
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-8 justify-center ${heroAnimation.isVisible ? 'animate-fade-in-up animate-stagger-3' : ''}`}>
                <Link to="/plan-event">
                  <Button size="lg" className="royal-button-pastel text-xl px-16 py-10 font-majestic shadow-2xl">
                    <Sparkles className="mr-4 h-7 w-7" />
                    Begin Your Royal Journey
                    <ArrowRight className="ml-4 h-7 w-7" />
                  </Button>
                </Link>
                <Link to="/vendor-onboarding">
                  <Button size="lg" variant="outline" className="border-3 border-pastel-gold text-white hover:bg-pastel-gold/20 text-xl px-16 py-10 font-royal backdrop-blur-sm rounded-full">
                    <Crown className="mr-4 h-7 w-7" />
                    Explore Premium Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutAnimation.elementRef} className="py-28 bg-gradient-to-r from-cream-white to-pastel-gold/30 royal-section-pastel">
          <div className={`container mx-auto px-6 text-center ${aboutAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-8 bg-soft-burgundy/10 text-soft-burgundy border-soft-burgundy/30 px-8 py-3 text-xl font-royal rounded-full">
              About Aaroham
            </Badge>
            <h2 className="text-6xl font-majestic font-bold mb-12 text-gradient-royal">The Royal Legacy</h2>
            <p className="text-2xl text-gray-700 max-w-5xl mx-auto font-elegant leading-relaxed">
              Aaroham means "rising" in Sanskrit, symbolizing how we elevate every celebration to royal heights. 
              We masterfully blend sophisticated AI technology with deep cultural reverence to create 
              extraordinary experiences that honor ancient traditions while embracing modern innovation.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section ref={howItWorksAnimation.elementRef} className="py-32 bg-white royal-section-pastel">
          <div className="container mx-auto px-6">
            <div className={`text-center mb-24 ${howItWorksAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
              <Badge className="mb-8 bg-soft-burgundy/10 text-soft-burgundy border-soft-burgundy/30 px-8 py-3 text-xl font-royal rounded-full">
                Royal Process
              </Badge>
              <h2 className="text-6xl md:text-7xl font-majestic font-bold mb-12 shimmer-text-pastel">
                Three Elite Steps
              </h2>
              <p className="text-2xl text-gray-600 max-w-5xl mx-auto font-elegant">
                Our royal AI-powered platform transforms event planning into an effortless, luxurious experience with premium recommendations and elite vendor partnerships.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {howItWorks.map((step, index) => (
                <div key={index} className={`group ${howItWorksAnimation.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : ''}`}>
                  <Card className="royal-card-pastel h-full">
                    <CardContent className="p-12 text-center">
                      <div className="relative mb-10">
                        <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-2xl`}>
                          <step.icon className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-pastel-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <h3 className="text-3xl font-majestic font-bold mb-6 text-soft-burgundy">{step.title}</h3>
                      <p className="text-gray-600 font-elegant leading-relaxed text-lg">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vendor Categories */}
        <section ref={vendorAnimation.elementRef} className="py-32 bg-gradient-to-br from-pastel-lavender/20 to-pastel-mint/20 royal-section-pastel">
          <div className="container mx-auto px-6">
            <div className={`text-center mb-24 ${vendorAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
              <Badge className="mb-8 bg-soft-burgundy/10 text-soft-burgundy border-soft-burgundy/30 px-8 py-3 text-xl font-royal rounded-full">
                Elite Vendor Categories
              </Badge>
              <h2 className="text-6xl md:text-7xl font-majestic font-bold mb-12 shimmer-text-pastel">
                Premium Event Services
              </h2>
              <p className="text-2xl text-gray-600 max-w-5xl mx-auto font-elegant">
                From royal photographers to master chefs, discover our curated collection of premium vendors for every aspect of your celebration.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
              {vendorCategories.map((category, index) => (
                <div key={index} className={`group cursor-pointer ${vendorAnimation.isVisible ? `animate-scale-in animate-stagger-${index + 1}` : ''}`}>
                  <Card className="royal-card-pastel text-center h-full">
                    <CardContent className="p-10">
                      <div className={`w-20 h-20 ${category.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 mx-auto shadow-xl`}>
                        <category.icon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="font-royal font-semibold text-soft-burgundy group-hover:text-royal-purple transition-colors text-xl">
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
        <section ref={packagesAnimation.elementRef} className="py-32 bg-white royal-section-pastel">
          <div className="container mx-auto px-6">
            <div className={`text-center mb-24 ${packagesAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
              <Badge className="mb-8 bg-soft-burgundy/10 text-soft-burgundy border-soft-burgundy/30 px-8 py-3 text-xl font-royal rounded-full">
                Royal Packages
              </Badge>
              <h2 className="text-6xl md:text-7xl font-majestic font-bold mb-12 shimmer-text-pastel">
                Curated Elite Experiences
              </h2>
              <p className="text-2xl text-gray-600 max-w-5xl mx-auto font-elegant">
                Choose from our meticulously crafted packages designed for different occasions and refined for the most discerning clientele.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {featuredPackages.map((pkg, index) => (
                <div key={index} className={`group ${packagesAnimation.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : ''}`}>
                  <Card className="royal-card-pastel overflow-hidden h-full">
                    <div className="relative overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/${pkg.image}?auto=format&fit=crop&w=800&q=80`}
                        alt={pkg.title}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-pastel-gold text-soft-burgundy font-royal font-semibold px-6 py-3 text-lg rounded-full">
                          {pkg.badge}
                        </Badge>
                      </div>
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-soft-burgundy text-white font-majestic font-bold text-xl px-6 py-3 rounded-full">
                          {pkg.price}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-10">
                      <h3 className="text-3xl font-majestic font-bold mb-8 text-soft-burgundy group-hover:text-royal-purple transition-colors">
                        {pkg.title}
                      </h3>
                      <div className="space-y-4 mb-10">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-gray-600 font-elegant text-lg">
                            <CheckCircle className="h-6 w-6 text-pastel-gold mr-4" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button className="w-full royal-button-pastel font-majestic text-xl py-4">
                        <Crown className="mr-3 h-6 w-6" />
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
        <section ref={testimonialsAnimation.elementRef} className="py-32 bg-gradient-to-br from-pastel-peach/20 to-pastel-rose/20 royal-section-pastel">
          <div className="container mx-auto px-6">
            <div className={`text-center mb-24 ${testimonialsAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
              <Badge className="mb-8 bg-soft-burgundy/10 text-soft-burgundy border-soft-burgundy/30 px-8 py-3 text-xl font-royal rounded-full">
                Royal Testimonials
              </Badge>
              <h2 className="text-6xl md:text-7xl font-majestic font-bold mb-12 shimmer-text-pastel">
                Elite Client Experiences
              </h2>
              <p className="text-2xl text-gray-600 max-w-5xl mx-auto font-elegant">
                Discover how thousands of discerning clients have trusted Aaroham to create their most precious and unforgettable moments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`${testimonialsAnimation.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : ''}`}>
                  <Card className="royal-card-pastel h-full">
                    <CardContent className="p-10">
                      <div className="flex mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-7 w-7 text-pastel-gold fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-10 italic leading-relaxed font-elegant text-xl">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center">
                        <div className="w-20 h-20 pastel-gradient rounded-full flex items-center justify-center text-white font-majestic font-bold text-2xl mr-6 shadow-xl">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-majestic font-bold text-soft-burgundy text-xl">{testimonial.name}</h4>
                          <p className="text-royal-purple font-elegant text-lg">{testimonial.event}</p>
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
        <section ref={contactAnimation.elementRef} id="contact" className="py-32 pastel-gradient text-white royal-section-pastel">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className={`text-center mb-24 ${contactAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
                <Badge className="mb-10 bg-pastel-gold/30 text-white border-2 border-pastel-gold/60 px-8 py-3 text-xl font-royal rounded-full">
                  <Diamond className="w-6 h-6 mr-3" />
                  Royal Consultation
                </Badge>
                <h2 className="text-6xl md:text-7xl font-majestic font-bold mb-12 text-white">
                  Begin Your Royal Event Journey
                </h2>
                <p className="text-2xl text-white/90 max-w-5xl mx-auto font-elegant">
                  Connect with our royal concierge today. Our AI-powered platform awaits to transform your celebration into an extraordinary, unforgettable experience.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-20">
                <div className={`${contactAnimation.isVisible ? 'animate-fade-in-left' : ''}`}>
                  <h3 className="text-4xl font-majestic font-bold mb-12">Royal Contact Information</h3>
                  <div className="space-y-10">
                    <div className="flex items-center">
                      <div className="w-20 h-20 bg-pastel-gold rounded-3xl flex items-center justify-center mr-8 shadow-xl">
                        <Phone className="h-10 w-10 text-soft-burgundy" />
                      </div>
                      <div>
                        <p className="font-majestic font-semibold text-2xl">Royal Hotline</p>
                        <p className="text-white/80 font-elegant text-xl">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 h-20 bg-pastel-gold rounded-3xl flex items-center justify-center mr-8 shadow-xl">
                        <Mail className="h-10 w-10 text-soft-burgundy" />
                      </div>
                      <div>
                        <p className="font-majestic font-semibold text-2xl">Royal Email</p>
                        <p className="text-white/80 font-elegant text-xl">hello@aaroham.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 h-20 bg-pastel-gold rounded-3xl flex items-center justify-center mr-8 shadow-xl">
                        <MapPin className="h-10 w-10 text-soft-burgundy" />
                      </div>
                      <div>
                        <p className="font-majestic font-semibold text-2xl">Royal Palace</p>
                        <p className="text-white/80 font-elegant text-xl">Mumbai, India</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`${contactAnimation.isVisible ? 'animate-fade-in-right' : ''}`}>
                  <div className="royal-card-pastel bg-white/15 backdrop-blur-xl border-2 border-pastel-gold/60">
                    <CardContent className="p-10">
                      <form className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <Input 
                            placeholder="Your Royal Name" 
                            className="bg-white/20 border-2 border-pastel-gold/60 text-white placeholder:text-white/70 font-elegant text-xl py-4 rounded-xl"
                          />
                          <Input 
                            placeholder="Royal Email Address" 
                            type="email"
                            className="bg-white/20 border-2 border-pastel-gold/60 text-white placeholder:text-white/70 font-elegant text-xl py-4 rounded-xl"
                          />
                        </div>
                        <Input 
                          placeholder="Event Type" 
                          className="bg-white/20 border-2 border-pastel-gold/60 text-white placeholder:text-white/70 font-elegant text-xl py-4 rounded-xl"
                        />
                        <Textarea 
                          placeholder="Tell us about your royal celebration..." 
                          rows={5}
                          className="bg-white/20 border-2 border-pastel-gold/60 text-white placeholder:text-white/70 resize-none font-elegant text-xl rounded-xl"
                        />
                        <Button 
                          size="lg" 
                          className="w-full royal-button-pastel font-majestic text-2xl py-6"
                        >
                          <Crown className="mr-4 h-7 w-7" />
                          Send Royal Message
                          <ArrowRight className="ml-4 h-7 w-7" />
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
    </>
  );
};

export default Index;
