
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Filter, Heart, Bot, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CulturalBackdrop from "@/components/CulturalBackdrop";
import LoginPromptModal from "@/components/LoginPromptModal";
import { useVendors } from "@/hooks/useVendors";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { VENDOR_CATEGORIES, CATEGORY_GROUPS } from "@/constants/vendorCategories";

const VendorListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all cities");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [filters, setFilters] = useState({
    speciality: "",
    city: "",
    rating: "",
    priceRange: "",
  });

  const { data: vendors = [], isLoading, error } = useVendors(filters);

  // Check authentication status
  useState(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  });

  // Filter vendors based on search term and approval status
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.city?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Only show approved and online vendors
    const isApproved = vendor.is_approved === true;
    const isOnline = vendor.is_online === true;
    
    return matchesSearch && isApproved && isOnline;
  });

  const locations = ["All Cities", "Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Hyderabad", "Ahmedabad", "Jaipur", "Kolkata", "Kochi", "Lucknow"];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value.toLowerCase()
    }));
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value.toLowerCase());
    handleFilterChange('city', value);
  };

  const clearFilters = () => {
    setFilters({
      speciality: "",
      city: "",
      rating: "",
      priceRange: "",
    });
    setSearchTerm("");
    setSelectedLocation("all cities");
  };

  const handleVendorClick = (vendorName: string) => {
    if (!user) {
      setSelectedVendor(vendorName);
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  if (error) {
    toast.error("Failed to load vendors. Please try again.");
    console.error("Vendor loading error:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      {/* Hero Section with Cultural Backdrop */}
      <section className="relative py-16 overflow-hidden">
        <CulturalBackdrop location={selectedLocation} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              Find Perfect Vendors
            </h1>
            <p className="text-xl text-white/90 mb-8 drop-shadow">
              Discover verified vendors matched by AI for your perfect celebration
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search vendors, services, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-white/95 backdrop-blur"
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
            
            <Select onValueChange={(value) => handleFilterChange('speciality', value)}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(CATEGORY_GROUPS).map(([groupName, categories]) => (
                  <div key={groupName}>
                    <div className="px-2 py-1 text-sm font-semibold text-gray-700 bg-gray-100">
                      {groupName}
                    </div>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
            
            <Select onValueChange={handleLocationChange}>
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
            
            <Select onValueChange={(value) => handleFilterChange('priceRange', value)}>
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
            
            <Select onValueChange={(value) => handleFilterChange('rating', value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                <SelectItem value="4.8+">4.8+ Stars</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Vendor Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              Available Vendors ({filteredVendors.length})
              {isLoading && <Loader2 className="inline-block ml-2 h-5 w-5 animate-spin" />}
            </h2>
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
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredVendors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No approved vendors found matching your criteria.</p>
              <Button onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVendors.map((vendor) => {
                const specialityArray = Array.isArray(vendor.speciality) ? vendor.speciality : [];
                const portfolioImages = Array.isArray(vendor.portfolio_images) ? vendor.portfolio_images : [];
                const mainImage = portfolioImages.length > 0 ? portfolioImages[0] : 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80';
                
                return (
                  <Card key={vendor.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative overflow-hidden">
                      <img 
                        src={mainImage}
                        alt={vendor.business_name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {vendor.is_featured && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            <Bot className="h-3 w-3 mr-1" />
                            AI Pick
                          </Badge>
                        )}
                        {vendor.is_approved && (
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
                            {vendor.business_name}
                          </h3>
                          <p className="text-gray-600">{specialityArray.join(', ')}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{vendor.rating}</span>
                          <span className="text-gray-500 text-sm">({vendor.total_bookings})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{vendor.city}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-amber-600">{vendor.price_range}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        {handleVendorClick(vendor.business_name) ? (
                          <Link to={`/vendor/${vendor.id}`} className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                              View Details
                            </Button>
                          </Link>
                        ) : (
                          <Button 
                            onClick={() => handleVendorClick(vendor.business_name)}
                            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                          >
                            View Details
                          </Button>
                        )}
                        <Button variant="outline" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
          
          {/* Load More */}
          {!isLoading && filteredVendors.length > 0 && (
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="border-amber-400 text-amber-600 hover:bg-amber-50">
                Load More Vendors
              </Button>
            </div>
          )}
        </div>
      </section>

      <LoginPromptModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        vendorName={selectedVendor}
      />

      <Footer />
    </div>
  );
};

export default VendorListing;
