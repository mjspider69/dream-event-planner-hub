import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ChevronLeft, ChevronRight, Users, Phone, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useVendors, type Vendor } from "@/hooks/useVendors";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface HorizontalVendorScrollProps {
  title?: string;
  category?: string;
  featured?: boolean;
}

const HorizontalVendorScroll = ({ 
  title = "Featured Vendors", 
  category,
  featured = true 
}: HorizontalVendorScrollProps) => {
  const { data: vendors, isLoading } = useVendors({ 
    speciality: category, 
    featured 
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleVendorClick = (vendorId: string) => {
    if (!user) {
      toast.error("Please sign in to view vendor details");
      navigate('/auth');
      return;
    }
    navigate(`/vendor/${vendorId}`);
  };

  const handleTalkToVendor = (vendorId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please sign in to contact vendors");
      navigate('/auth');
      return;
    }
    navigate(`/talk-to-vendor/${vendorId}`);
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('vendor-scroll-container');
    if (container) {
      const scrollAmount = 320; // Width of card + gap
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
          <div className="flex space-x-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[300px] h-48 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!vendors || vendors.length === 0) {
    return null;
  }

  return (
    <div className="py-12 bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          id="vendor-scroll-container"
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {vendors.map((vendor: Vendor) => (
            <Card
              key={vendor.id}
              className="min-w-[300px] cursor-pointer group hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => handleVendorClick(vendor.id)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={vendor.portfolioImages?.[0] || `https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&h=200&q=80`}
                    alt={vendor.businessName}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {vendor.isFeatured && (
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      Featured
                    </Badge>
                  )}
                  {vendor.isApproved && (
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {vendor.businessName}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {vendor.category}
                    </Badge>
                    {vendor.city && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{vendor.city}</span>
                      </div>
                    )}
                  </div>

                  {vendor.rating > 0 && (
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{vendor.rating}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({vendor.totalBookings} bookings)
                      </span>
                    </div>
                  )}

                  {vendor.priceRange && (
                    <p className="text-sm text-amber-600 font-medium mb-3">
                      {vendor.priceRange}
                    </p>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      onClick={(e) => handleTalkToVendor(vendor.id, e)}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleVendorClick(vendor.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to={`/vendors${category ? `?category=${category}` : ''}`}>
            <Button variant="outline" className="px-8">
              View All Vendors
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HorizontalVendorScroll;