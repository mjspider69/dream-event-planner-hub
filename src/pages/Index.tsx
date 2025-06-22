
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Heart, Camera, Users, Star, Phone, Mail, MapPin, ArrowRight, Sparkles, Gift, Music, Bot, Shield, CheckCircle, User, Utensils, Car, Flower2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const vendorCategories = [
    { name: "Photographer", icon: Camera, color: "bg-pink-500" },
    { name: "DJ", icon: Music, color: "bg-purple-500" },
    { name: "Decorator", icon: Flower2, color: "bg-green-500" },
    { name: "Caterer", icon: Utensils, color: "bg-orange-500" },
    { name: "Priest", icon: User, color: "bg-blue-500" },
    { name: "Gifts", icon: Gift, color: "bg-red-500" },
    { name: "Transport", icon: Car, color: "bg-gray-500" }
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
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Smart Vendor Match", 
      description: "Advanced algorithms match you with the perfect vendors for your event",
      icon: Users,
      color: "from-green-500 to-blue-500"
    },
    {
      title: "Verified Vendors",
      description: "All our vendors are thoroughly verified and trusted by thousands of customers",
      icon: Shield,
      color: "from-purple-500 to-pink-500"
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Aaroham
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-gray-700 hover:text-amber-600 transition-colors">About</Link>
              <Link to="/vendors" className="text-gray-700 hover:text-amber-600 transition-colors">Vendors</Link>
              <Link to="/packages" className="text-gray-700 hover:text-amber-600 transition-colors">Packages</Link>
              <Link to="/plan-event" className="text-gray-700 hover:text-amber-600 transition-colors">Plan My Event</Link>
              <Link to="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">Contact</Link>
              <Link to="/login" className="text-gray-700 hover:text-amber-600 transition-colors">Login</Link>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                Plan My Event
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-amber-100 text-amber-700 hover:bg-amber-200">
              ✨ India's First AI-Powered Event Planning Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
              Elevate Every Occasion
              <br />
              with Aaroham
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              India's first AI-powered event planning platform blending tradition with technology. 
              Experience seamless event planning with our intelligent matching system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg px-8 py-6 text-white">
                Plan My Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-amber-400 text-amber-600 hover:bg-amber-50 text-lg px-8 py-6">
                Join as Vendor
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-50 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-red-200 rounded-full opacity-50 animate-bounce" style={{animationDelay: '2s'}}></div>
      </section>

      {/* About Snippet */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">About Aaroham</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Aaroham means "rising" in Sanskrit, symbolizing how we elevate every celebration. 
            We combine cutting-edge AI technology with deep cultural understanding to create 
            unforgettable experiences that honor traditions while embracing innovation.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-700">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Three Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform makes event planning effortless with intelligent recommendations and verified vendors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Categories Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-700">Vendor Categories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              All Your Event Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From photographers to caterers, find verified vendors for every aspect of your celebration.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {vendorCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700">Featured Packages</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Curated Event Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our expertly crafted packages designed for different occasions and budgets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${pkg.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={pkg.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-amber-500 text-white">
                      {pkg.price}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-amber-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                    View Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700">Client Reviews</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from thousands of satisfied customers who trusted Aaroham with their special moments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-amber-50">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
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
      <section id="contact" className="py-20 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-white/20 text-white">Get In Touch</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Plan Your Perfect Event?
              </h2>
              <p className="text-xl text-amber-100 max-w-3xl mx-auto">
                Start your journey with Aaroham today. Our AI-powered platform is ready to make your celebration extraordinary.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 mr-4 text-amber-200" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-amber-100">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 mr-4 text-amber-200" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-amber-100">hello@aaroham.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 mr-4 text-amber-200" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-amber-100">Mumbai, India</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Your Name" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-amber-200"
                    />
                    <Input 
                      placeholder="Email Address" 
                      type="email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-amber-200"
                    />
                  </div>
                  <Input 
                    placeholder="Event Type" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-amber-200"
                  />
                  <Textarea 
                    placeholder="Tell us about your event..." 
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-amber-200 resize-none"
                  />
                  <Button 
                    size="lg" 
                    className="w-full bg-white text-amber-600 hover:bg-amber-50 font-semibold"
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
                <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
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
    </div>
  );
};

export default Index;
