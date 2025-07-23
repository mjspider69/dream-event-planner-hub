import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Users, Calendar, MapPin, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const packages = [{
    id: 1,
    name: "Royal Wedding Elegance",
    category: "wedding",
    price: "₹2,50,000 - ₹5,00,000",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    description: "Complete wedding package with premium vendors and royal treatment",
    inclusions: ["Premium Photography & Videography", "Royal Decoration & Mandap", "Professional DJ & Live Music", "Traditional Priest Services", "Luxury Transportation", "Bridal Makeup & Hair Styling"],
    guestCount: "200-500 guests",
    duration: "Full Day Event",
    rating: 4.9,
    bookings: 150,
    featured: true
  }, {
    id: 2,
    name: "Corporate Excellence",
    category: "corporate",
    price: "₹1,00,000 - ₹3,00,000",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    description: "Professional corporate event management with modern touch",
    inclusions: ["Professional Sound System", "LED Stage & Lighting", "Corporate Catering", "Event Photography", "Registration Management", "Welcome Reception Setup"],
    guestCount: "50-300 guests",
    duration: "Half/Full Day",
    rating: 4.7,
    bookings: 89,
    featured: false
  }, {
    id: 3,
    name: "Birthday Celebration Deluxe",
    category: "birthday",
    price: "₹25,000 - ₹1,00,000",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    description: "Magical birthday celebrations with personalized themes",
    inclusions: ["Theme-based Decoration", "Birthday Photography", "DJ & Entertainment", "Cake & Catering Services", "Party Games & Activities", "Return Gift Management"],
    guestCount: "20-100 guests",
    duration: "3-6 Hours",
    rating: 4.8,
    bookings: 234,
    featured: true
  }, {
    id: 4,
    name: "Social Gathering Premium",
    category: "social",
    price: "₹50,000 - ₹2,00,000",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    description: "Elegant social events for anniversaries, reunions, and celebrations",
    inclusions: ["Elegant Venue Decoration", "Professional Catering", "Live Music Arrangement", "Event Photography", "Welcome Drinks Setup", "Cultural Performance (Optional)"],
    guestCount: "30-200 guests",
    duration: "3-8 Hours",
    rating: 4.6,
    bookings: 76,
    featured: false
  }, {
    id: 5,
    name: "Engagement Ceremony Royal",
    category: "engagement",
    price: "₹75,000 - ₹2,50,000",
    image: "https://images.unsplash.com/photo-1606800052890-90cda8ad5084?auto=format&fit=crop&w=800&q=80",
    description: "Traditional engagement ceremonies with modern elegance",
    inclusions: ["Traditional Mandap Setup", "Floral Decoration", "Engagement Photography", "Traditional Music", "Priest Services", "Reception Arrangements"],
    guestCount: "50-300 guests",
    duration: "4-6 Hours",
    rating: 4.8,
    bookings: 112,
    featured: true
  }, {
    id: 6,
    name: "Festival Celebration Grand",
    category: "festival",
    price: "₹40,000 - ₹1,50,000",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    description: "Grand festival celebrations with cultural authenticity",
    inclusions: ["Cultural Stage Setup", "Traditional Decoration", "Cultural Programs", "Festival Photography", "Community Catering", "Cultural Activities"],
    guestCount: "100-500 guests",
    duration: "Full Day",
    rating: 4.7,
    bookings: 98,
    featured: false
  }];
  const categories = [{
    id: "all",
    name: "All Packages",
    icon: Crown
  }, {
    id: "wedding",
    name: "Wedding",
    icon: Sparkles
  }, {
    id: "corporate",
    name: "Corporate",
    icon: Users
  }, {
    id: "birthday",
    name: "Birthday",
    icon: Star
  }, {
    id: "social",
    name: "Social",
    icon: Calendar
  }, {
    id: "engagement",
    name: "Engagement",
    icon: Crown
  }, {
    id: "festival",
    name: "Festival",
    icon: Sparkles
  }];
  const filteredPackages = selectedCategory === "all" ? packages : packages.filter(pkg => pkg.category === selectedCategory);
  const featuredPackages = packages.filter(pkg => pkg.featured);
  return <div className="min-h-screen bg-gradient-to-br from-cream-gold via-white to-light-gold">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-navy-blue via-royal-blue to-deep-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-bright-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-golden-yellow rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-majestic font-bold mb-6 text-amber-300">
              Royal Event Packages
            </h1>
            <p className="text-xl md:text-2xl font-elegant mb-8 text-amber-400">
              Curated packages designed for every celebration, crafted with royal elegance and modern sophistication
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <CheckCircle className="h-5 w-5 text-bright-gold bg-amber-400" />
                <span className="font-semibold text-amber-400">AI-Matched Vendors</span>
              </div>
              <div className="flex items-center space-x-2 backdrop-blur-sm rounded-full px-6 py-3 bg-amber-400">
                <Star className="h-5 w-5 text-bright-gold" />
                <span className="font-semibold">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Crown className="h-5 w-5 text-bright-gold" />
                <span className="font-semibold text-amber-400">Royal Treatment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-majestic font-bold mb-4 text-navy-blue">
              Featured Packages
            </h2>
            <p className="text-xl text-gray-600">Most popular choices for royal celebrations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {featuredPackages.map(pkg => <Card key={pkg.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden">
                <div className="relative">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-bright-gold to-golden-yellow text-navy-blue font-semibold">
                      <Crown className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-sm">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-2xl font-majestic font-bold mb-2 text-navy-blue">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-bright-gold">{pkg.price}</span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{pkg.guestCount}</span>
                    </div>
                  </div>
                  
                  <Link to={`/plan-event?package=${pkg.id}`}>
                    <Button className="w-full bg-gradient-to-r from-royal-blue to-bright-gold hover:from-navy-blue hover:to-golden-yellow text-white font-semibold py-3">
                      Select Package
                    </Button>
                  </Link>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gradient-to-r from-light-gold to-cream-gold">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => {
            const IconComponent = category.icon;
            return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category.id ? 'bg-gradient-to-r from-royal-blue to-navy-blue text-white shadow-lg scale-105' : 'bg-white text-navy-blue hover:bg-gray-50 shadow-md hover:scale-105'}`}>
                  <IconComponent className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>;
          })}
          </div>
        </div>
      </section>

      {/* All Packages */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-majestic font-bold mb-4 text-navy-blue">
              {selectedCategory === "all" ? "All Packages" : `${categories.find(c => c.id === selectedCategory)?.name} Packages`}
            </h2>
            <p className="text-xl text-gray-600">
              {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} available
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map(pkg => <Card key={pkg.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden">
                <div className="relative">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  {pkg.featured && <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-bright-gold to-golden-yellow text-navy-blue">
                        <Crown className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-majestic font-bold mb-2 text-navy-blue">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-bright-gold">{pkg.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-sm">{pkg.rating}</span>
                        <span className="text-gray-500 text-sm">({pkg.bookings})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{pkg.guestCount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-navy-blue mb-2">Package Includes:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {pkg.inclusions.slice(0, 3).map((inclusion, index) => <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span>{inclusion}</span>
                        </div>)}
                      {pkg.inclusions.length > 3 && <p className="text-xs text-gray-500 mt-1">
                          +{pkg.inclusions.length - 3} more services
                        </p>}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/plan-event?package=${pkg.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-royal-blue to-bright-gold hover:from-navy-blue hover:to-golden-yellow text-white">
                        Select Package
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
          
          {filteredPackages.length === 0 && <div className="text-center py-12">
              <p className="text-xl text-gray-600">No packages found for this category.</p>
              <Button onClick={() => setSelectedCategory("all")} className="mt-4 bg-gradient-to-r from-royal-blue to-bright-gold text-white">
                View All Packages
              </Button>
            </div>}
        </div>
      </section>

      <Footer />
    </div>;
};
export default Packages;