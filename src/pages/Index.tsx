
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Star, ArrowRight, Sparkles, Gift, Music, Bot, Shield, CheckCircle, User, Utensils, Car, Flower2, Crown, Diamond } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscriptionPopup from "@/components/SubscriptionPopup";
import SEOOptimization from "@/components/SEOOptimization";
import ChatbotIntroPopup from "@/components/ChatbotIntroPopup";

const Index = () => {
  const featuredPackages = [
    {
      title: "Royal Wedding Package",
      price: "₹5,00,000",
      originalPrice: "₹7,00,000",
      image: "photo-1649972904349-6e44c42644a7",
      features: ["Photography", "Decoration", "Catering", "Music", "Transportation"],
      badge: "Premium",
      rating: 4.9,
      bookings: "500+"
    },
    {
      title: "Corporate Elite Package",
      price: "₹2,50,000", 
      originalPrice: "₹3,50,000",
      image: "photo-1486312338219-ce68d2c6f44d",
      features: ["Venue", "Catering", "AV Setup", "Photography", "Coordination"],
      badge: "Business",
      rating: 4.8,
      bookings: "300+"
    },
    {
      title: "Birthday Celebration",
      price: "₹75,000",
      originalPrice: "₹1,00,000",
      image: "photo-1721322800607-8c38375eef04", 
      features: ["Decoration", "Cake", "Photography", "Entertainment", "Gifts"],
      badge: "Celebration",
      rating: 4.7,
      bookings: "800+"
    }
  ];

  const howItWorks = [
    {
      title: "AI-Powered Planning",
      description: "Tell our AI about your event vision and get instant personalized recommendations",
      icon: Bot,
      step: "1"
    },
    {
      title: "Smart Vendor Matching", 
      description: "Get matched with verified vendors based on your budget, location, and preferences",
      icon: Crown,
      step: "2"
    },
    {
      title: "Seamless Booking",
      description: "Book all services, track progress, and communicate with vendors in one place",
      icon: Diamond,
      step: "3"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      event: "Royal Wedding",
      rating: 5,
      text: "Aaroham's AI made planning our 500-guest wedding effortless. Every vendor was perfect!",
      image: "PS",
      location: "Delhi"
    },
    {
      name: "Rajesh Kumar", 
      event: "Corporate Event",
      rating: 5,
      text: "Incredible service! The platform saved us weeks of vendor hunting for our annual conference.",
      image: "RK",
      location: "Mumbai"
    },
    {
      name: "Anita Gupta",
      event: "Birthday Party",
      rating: 5,
      text: "The AI recommendations were spot-on. Our daughter's party was magical beyond expectations!",
      image: "AG",
      location: "Bangalore"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Events Planned" },
    { number: "5,000+", label: "Happy Clients" },
    { number: "1,000+", label: "Verified Vendors" },
    { number: "50+", label: "Cities Covered" }
  ];

  return (
    <>
      <SEOOptimization 
        title="Aaroham - India's Premier AI-Powered Event Planning Platform"
        description="Plan perfect events with AI. From weddings to corporate events, connect with verified vendors across India. Smart matching, instant quotes, seamless booking."
        keywords="AI event planning, wedding planning, corporate events, vendor booking, event management India"
      />
      <div className="min-h-screen bg-white">
        <Header />
        <SubscriptionPopup />
        <ChatbotIntroPopup />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-amber-50 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-amber-500/5"></div>
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-amber-100 text-blue-800 border-blue-200 px-6 py-2 text-sm font-medium rounded-full">
                <Bot className="w-4 h-4 mr-2" />
                India's First AI-Powered Event Platform
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Elevate Every
                </span>
                <br />
                <span className="text-gray-900">Occasion</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your event dreams into reality with AI-powered planning. Connect with verified vendors, 
                get instant quotes, and plan unforgettable celebrations across India.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/plan-event">
                  <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Plan My Event
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/ai-chatbot">
                  <Button size="lg" variant="outline" className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg rounded-full">
                    <Bot className="mr-2 h-5 w-5" />
                    Try AI Assistant
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 px-6 py-2 rounded-full">
                How It Works
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  Three Simple Steps
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our AI-powered platform makes event planning effortless and enjoyable
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {howItWorks.map((step, index) => (
                <Card key={index} className="relative bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Packages */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-amber-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-amber-100 text-amber-800 px-6 py-2 rounded-full">
                Featured Packages
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  Curated Event Packages
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Ready-to-book packages designed by experts for different occasions and budgets
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredPackages.map((pkg, index) => (
                <Card key={index} className="group overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/${pkg.image}?auto=format&fit=crop&w=800&q=80`}
                      alt={pkg.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-800 font-semibold px-3 py-1">
                        {pkg.badge}
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Save 30%
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {pkg.rating} ({pkg.bookings} bookings)
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                      {pkg.title}
                    </h3>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-amber-600">{pkg.price}</span>
                        <span className="text-sm text-gray-400 line-through">{pkg.originalPrice}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white">
                      <Crown className="mr-2 h-4 w-4" />
                      Book Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-amber-100 text-amber-800 px-6 py-2 rounded-full">
                Customer Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  What Our Clients Say
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trusted Aaroham for their special moments
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.image}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.event} • {testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-500">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Plan Your Perfect Event?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Let our AI help you create unforgettable moments. Start planning in minutes!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/plan-event">
                  <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full">
                    <Bot className="mr-2 h-5 w-5" />
                    Start Planning Now
                  </Button>
                </Link>
                <Link to="/ai-chatbot">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full">
                    Try AI Chat Free
                  </Button>
                </Link>
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
