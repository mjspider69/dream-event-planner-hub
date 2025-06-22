
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Filter, Heart, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VendorListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const vendors = [
    {
      id: 1,
      name: "Royal Wedding Photographers",
      category: "Photography",
      location: "Mumbai, Maharashtra",
      rating: 4.8,
      reviews: 156,
      price: "₹25,000 - ₹50,000",
      image: "photo-1649972904349-6e44c42644a7",
      aiRecommended: true,
      verified: true
    },
    {
      id: 2,
      name: "Elegant Event Decorators",
      category: "Decoration",
      location: "Delhi, NCR",
      rating: 4.6,
      reviews: 89,
      price: "₹15,000 - ₹40,000",
      image: "photo-1506744038136-46273834b3fb",
      aiRecommended: true,
      verified: true
    },
    {
      id: 3,
      name: "Spice Route Caterers",
      category: "Catering",
      location: "Bangalore, Karnataka",
      rating: 4.9,
      reviews: 234,
      price: "₹800 - ₹1,500 per plate",
      image: "photo-1517022812141-23620dba5c23",
      aiRecommended: false,
      verified: true
    },
    {
      id: 4,
      name: "Melody Makers DJ",
      category: "DJ & Music",
      location: "Mumbai, Maharashtra",
      rating: 4.7,
      reviews: 67,
      price: "₹8,000 - ₹20,000",
      image: "photo-1488590528505-98d2b5aba04b",
      aiRecommended: true,
      verified: true
    },
    {
      id: 5,
      name: "Sacred Ceremonies",
      category: "Priest",
      location: "Pune, Maharashtra",
      rating: 4.9,
      reviews: 45,
      price: "₹2,000 - ₹5,000",
      image: "photo-1526374965328-7f61d4dc18c5",
      aiRecommended: false,
      verified: true
    },
    {
      id: 6,
      name: "Luxury Transport Services",
      category: "Transport",
      location: "Delhi, NCR",
      rating: 4.5,
      reviews: 123,
      price: "₹3,000 - ₹15,000",
      image: "photo-1461749280684-dccba630e2f6",
      aiRecommended: false,
      verified: true
    }
  ];

  const categories = ["All", "Photography", "Decoration", "Catering", "DJ & Music", "Priest", "Transport"];
  const locations = ["All Cities", "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600/10 to-orange-600/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Find Perfect Vendors
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover verified vendors matched by AI for your perfect celebration
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search vendors, services, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location.toLowerCase()}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget Friendly</SelectItem>
                <SelectItem value="mid">Mid Range</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                <SelectItem value="4.8+">4.8+ Stars</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Vendor Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Available Vendors ({vendors.length})</h2>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">AI Recommended</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map((vendor) => (
              <Card key={vendor.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${vendor.image}?auto=format&fit=crop&w=400&q=80`}
                    alt={vendor.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {vendor.aiRecommended && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <Bot className="h-3 w-3 mr-1"  />
                        AI Pick
                      </Badge>
                    )}
                    {vendor.verified && (
                      <Badge className="bg-green-500 text-white">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-amber-600 transition-colors">
                        {vendor.name}
                      </h3>
                      <p className="text-gray-600">{vendor.category}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{vendor.rating}</span>
                      <span className="text-gray-500 text-sm">({vendor.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{vendor.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-amber-600">{vendor.price}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/vendor/${vendor.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-amber-400 text-amber-600 hover:bg-amber-50">
              Load More Vendors
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VendorListing;
