
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Heart, Camera, Users, Star, Phone, Mail, MapPin, ArrowRight, Sparkles, Gift, Music } from "lucide-react";

const Index = () => {
  const services = [
    {
      title: "Wedding Planning",
      description: "Create your dream wedding with our comprehensive planning services",
      icon: Heart,
      image: "photo-1649972904349-6e44c42644a7",
      features: ["Venue Selection", "Vendor Coordination", "Timeline Management", "Day-of Coordination"]
    },
    {
      title: "Corporate Events",
      description: "Professional corporate event planning for conferences and meetings",
      icon: Users,
      image: "photo-1486312338219-ce68d2c6f44d",
      features: ["Conference Planning", "Team Building", "Product Launches", "Networking Events"]
    },
    {
      title: "Birthday Parties",
      description: "Memorable birthday celebrations for all ages",
      icon: Gift,
      image: "photo-1721322800607-8c38375eef04",
      features: ["Theme Planning", "Decoration Setup", "Entertainment", "Catering Services"]
    },
    {
      title: "Social Events",
      description: "Elegant social gatherings and special occasions",
      icon: Music,
      image: "photo-1506744038136-46273834b3fb",
      features: ["Anniversary Parties", "Engagement Parties", "Holiday Events", "Milestone Celebrations"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      event: "Wedding Planning",
      rating: 5,
      text: "Absolutely incredible service! They made our dream wedding come true with every detail perfectly planned.",
      image: "photo-1472396961693-142e6e269027"
    },
    {
      name: "Michael Chen",
      event: "Corporate Event",
      rating: 5,
      text: "Professional, organized, and exceeded all expectations. Our product launch was a huge success!",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      name: "Emily Rodriguez",
      event: "Birthday Party",
      rating: 5,
      text: "They created the most magical birthday party for my daughter. Every child was amazed!",
      image: "photo-1582562124811-c09040d0a901"
    }
  ];

  const portfolio = [
    { title: "Elegant Garden Wedding", category: "Wedding", image: "photo-1649972904349-6e44c42644a7" },
    { title: "Tech Conference 2024", category: "Corporate", image: "photo-1486312338219-ce68d2c6f44d" },
    { title: "Princess Birthday Party", category: "Birthday", image: "photo-1721322800607-8c38375eef04" },
    { title: "Anniversary Celebration", category: "Social", image: "photo-1506744038136-46273834b3fb" },
    { title: "Outdoor Wedding Venue", category: "Wedding", image: "photo-1472396961693-142e6e269027" },
    { title: "Corporate Gala", category: "Corporate", image: "photo-1581091226825-a6a2a5aee158" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-pink-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                DreamEvents
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-pink-600 transition-colors">Services</a>
              <a href="#portfolio" className="text-gray-700 hover:text-pink-600 transition-colors">Portfolio</a>
              <a href="#testimonials" className="text-gray-700 hover:text-pink-600 transition-colors">Reviews</a>
              <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors">Contact</a>
              <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                Get Quote
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-pink-100 text-pink-700 hover:bg-pink-200">
              ✨ Premium Event Planning Services
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Creating Unforgettable
              <br />
              Moments Together
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              From intimate gatherings to grand celebrations, we bring your vision to life with 
              meticulous planning, creative design, and flawless execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-lg px-8 py-6">
                Start Planning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 text-lg px-8 py-6">
                View Portfolio
                <Camera className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-50 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-200 rounded-full opacity-50 animate-bounce" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Comprehensive Event Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in creating extraordinary experiences across all types of events, 
              from intimate celebrations to large-scale productions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700">Our Work</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Event Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our recent events and celebrations that we've brought to life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-pink-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">Professional {item.category.toLowerCase()} planning and execution</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700">Client Reviews</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients about their amazing experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-pink-50">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
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
      <section id="contact" className="py-20 bg-gradient-to-br from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-white/20 text-white">Get In Touch</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Plan Your Perfect Event
              </h2>
              <p className="text-xl text-pink-100 max-w-3xl mx-auto">
                Ready to start planning? Contact us today for a free consultation and let's make your event dreams come true.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 mr-4 text-pink-200" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-pink-100">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 mr-4 text-pink-200" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-pink-100">hello@dreamevents.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 mr-4 text-pink-200" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-pink-100">New York, NY</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Your Name" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-pink-200"
                    />
                    <Input 
                      placeholder="Email Address" 
                      type="email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-pink-200"
                    />
                  </div>
                  <Input 
                    placeholder="Event Type" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-pink-200"
                  />
                  <Textarea 
                    placeholder="Tell us about your event..." 
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-pink-200 resize-none"
                  />
                  <Button 
                    size="lg" 
                    className="w-full bg-white text-pink-600 hover:bg-pink-50 font-semibold"
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
                <Sparkles className="h-8 w-8 text-pink-400" />
                <span className="text-2xl font-bold">DreamEvents</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Creating unforgettable moments and bringing your event dreams to life with 
                professional planning and execution.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Wedding Planning</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Corporate Events</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Birthday Parties</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Social Events</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest events and news</p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">i</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DreamEvents. All rights reserved. Crafted with ❤️ for unforgettable moments.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
