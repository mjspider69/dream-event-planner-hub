
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Heart, Camera, Users, Star, Phone, Mail, MapPin, ArrowRight, Sparkles, Gift, Music, Bot, Shield, CheckCircle, User, Utensils, Car, Flower2 } from "lucide-react";
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
    { name: "Photographer", icon: Camera, color: "bg-burgundy" },
    { name: "DJ", icon: Music, color: "bg-dark-burgundy" },
    { name: "Decorator", icon: Flower2, color: "bg-burgundy" },
    { name: "Caterer", icon: Utensils, color: "bg-dark-burgundy" },
    { name: "Priest", icon: User, color: "bg-burgundy" },
    { name: "Gifts", icon: Gift, color: "bg-dark-burgundy" },
    { name: "Transport", icon: Car, color: "bg-burgundy" }
  ];

  const featuredPackages = [
    {
      title: "Royal Wedding Package",
      price: "₹5,00,000",
      image: "photo-1649972904349-6e44c42644a7",
      features: ["Photography", "Decoration", "Catering", "Music"]
    },
    {
      title: "Corporate Elite Package",
      price: "₹2,50,000", 
      image: "photo-1486312338219-ce68d2c6f44d",
      features: ["Venue", "Catering", "AV Setup", "Photography"]
    },
    {
      title: "Birthday Celebration Package",
      price: "₹75,000",
      image: "photo-1721322800607-8c38375eef04", 
      features: ["Decoration", "Cake", "Photography", "Entertainment"]
    }
  ];

  const howItWorks = [
    {
      title: "AI Chatbot",
      description: "Our intelligent AI understands your needs and provides personalized recommendations",
      icon: Bot,
      color: "from-burgundy to-dark-burgundy"
    },
    {
      title: "Smart Vendor Match", 
      description: "Advanced algorithms match you with the perfect vendors for your event",
      icon: Users,
      color: "from-dark-burgundy to-burgundy"
    },
    {
      title: "Verified Vendors",
      description: "All our vendors are thoroughly verified and trusted by thousands of customers",
      icon: Shield,
      color: "from-burgundy to-dark-burgundy"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      event: "Wedding Planning",
      rating: 5,
      text: "Aaroham made our dream wedding come true! The AI recommendations were spot-on and saved us so much time.",
      image: "photo-1472396961693-142e6e269027"
    },
    {
      name: "Rajesh Kumar",
      event: "Corporate Event",
      rating: 5,
      text: "Exceptional service! The vendor matching was perfect and our corporate event was a huge success.",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      name: "Anita Gupta",
      event: "Birthday Party",
      rating: 5,
      text: "The AI chatbot understood exactly what we wanted for our daughter's birthday. Amazing experience!",
      image: "photo-1582562124811-c09040d0a901"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-gold via-white to-amber-50">
      <Header />

      {/* Hero Section */}
      <section ref={heroAnimation.elementRef} className="relative py-20 overflow-hidden luxury-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy/90 to-dark-burgundy/90"></div>
        <div className="container mx-auto px-6 relative">
          <div className={`text-center max-w-4xl mx-auto ${heroAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-6 bg-gold/20 text-gold border-gold/30 hover:bg-gold/30">
              ✨ India's First AI-Powered Event Planning Platform
            </Badge>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 text-gold-gradient leading-tight ${heroAnimation.isVisible ? 'animate-fade-in-up animate-stagger-1' : ''}`}>
              "Elevate Every Occasion
              <br />
              with Aaroham"
            </h1>
            <p className={`text-xl text-gold/90 mb-8 max-w-3xl mx-auto leading-relaxed ${heroAnimation.isVisible ? 'animate-fade-in-up animate-stagger-2' : ''}`}>
              India's first AI-powered event planning platform blending tradition with technology. 
              Experience seamless event planning with our intelligent matching system.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${heroAnimation.isVisible ? 'animate-fade-in-up animate-stagger-3' : ''}`}>
              <Link to="/plan-event">
                <Button size="lg" className="gold-gradient hover:opacity-90 text-lg px-8 py-6 text-burgundy font-semibold hover-lift">
                  Start Planning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/vendor-onboarding">
                <Button size="lg" variant="outline" className="border-2 border-gold text-gold hover:bg-gold/10 text-lg px-8 py-6 hover-lift">
                  Explore Services
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gold/20 rounded-full opacity-50 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gold/30 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-gold/40 rounded-full opacity-50 animate-bounce" style={{animationDelay: '2s'}}></div>
      </section>

      {/* About Snippet */}
      <section ref={aboutAnimation.elementRef} className="py-16 bg-gradient-to-r from-light-gold to-white">
        <div className={`container mx-auto px-6 text-center ${aboutAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
          <h2 className="text-3xl font-bold mb-6 text-burgundy">About Aaroham</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Aaroham means "rising" in Sanskrit, symbolizing how we elevate every celebration. 
            We combine cutting-edge AI technology with deep cultural understanding to create 
            unforgettable experiences that honor traditions while embracing innovation.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksAnimation.elementRef} className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 ${howItWorksAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-4 bg-burgundy/10 text-burgundy">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold-gradient">
              Three Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform makes event planning effortless with intelligent recommendations and verified vendors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 hover-lift border-0 bg-gradient-to-br from-white to-light-gold/30 ${howItWorksAnimation.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : ''}`}>
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                      <step.icon className="h-8 w-8 text-gold" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-burgundy">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Categories Grid */}
      <section ref={vendorAnimation.elementRef} className="py-20 bg-gradient-to-br from-light-gold/50 to-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 ${vendorAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-4 bg-burgundy/10 text-burgundy">Vendor Categories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold-gradient">
              All Your Event Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From photographers to caterers, find verified vendors for every aspect of your celebration.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {vendorCategories.map((category, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 hover-lift cursor-pointer ${vendorAnimation.isVisible ? `animate-scale-in animate-stagger-${index + 1}` : ''}`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                    <category.icon className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="font-semibold text-burgundy group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section ref={packagesAnimation.elementRef} className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 ${packagesAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-4 bg-burgundy/10 text-burgundy">Featured Packages</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold-gradient">
              Curated Event Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our expertly crafted packages designed for different occasions and budgets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, index) => (
              <Card key={index} className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover-lift ${packagesAnimation.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : ''}`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${pkg.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={pkg.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-burgundy text-gold">
                      {pkg.price}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-burgundy group-hover:text-gold transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-burgundy mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-burgundy hover:bg-dark-burgundy text-gold hover-lift">
                    View Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section ref={testimonialsAnimation.elementRef} className="py-20 bg-gradient-to-br from-light-gold/50 to-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 ${testimonialsAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
            <Badge className="mb-4 bg-burgundy/10 text-burgundy">Client Reviews</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold-gradient">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from thousands of satisfied customers who trusted Aaroham with their special moments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-light-gold/30 hover-lift ${testimonialsAnimation.isVisible ? `animate-fade-in-up animate-stagger-${index + 1}` : ''}`}>
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-burgundy to-dark-burgundy rounded-full flex items-center justify-center text-gold font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-burgundy">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.event}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactAnimation.elementRef} id="contact" className="py-20 luxury-gradient text-gold">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className={`text-center mb-16 ${contactAnimation.isVisible ? 'animate-fade-in-up' : ''}`}>
              <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">Get In Touch</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">
                Ready to Plan Your Perfect Event?
              </h2>
              <p className="text-xl text-gold/80 max-w-3xl mx-auto">
                Start your journey with Aaroham today. Our AI-powered platform is ready to make your celebration extraordinary.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className={`${contactAnimation.isVisible ? 'animate-fade-in-left' : ''}`}>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 mr-4 text-gold/80" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gold/80">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 mr-4 text-gold/80" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gold/80">hello@aaroham.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 mr-4 text-gold/80" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-gold/80">Mumbai, India</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`${contactAnimation.isVisible ? 'animate-fade-in-right' : ''}`}>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Your Name" 
                      className="bg-gold/10 border-gold/30 text-gold placeholder:text-gold/60"
                    />
                    <Input 
                      placeholder="Email Address" 
                      type="email"
                      className="bg-gold/10 border-gold/30 text-gold placeholder:text-gold/60"
                    />
                  </div>
                  <Input 
                    placeholder="Event Type" 
                    className="bg-gold/10 border-gold/30 text-gold placeholder:text-gold/60"
                  />
                  <Textarea 
                    placeholder="Tell us about your event..." 
                    rows={4}
                    className="bg-gold/10 border-gold/30 text-gold placeholder:text-gold/60 resize-none"
                  />
                  <Button 
                    size="lg" 
                    className="w-full gold-gradient text-burgundy hover:opacity-90 font-semibold hover-lift"
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
