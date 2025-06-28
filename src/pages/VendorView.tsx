
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Phone, Mail, Calendar, Heart, MessageCircle, CheckCircle, Camera, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVendorById } from "@/hooks/useVendors";
import { toast } from "sonner";

const VendorView = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { data: vendor, isLoading, error } = useVendorById(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-96">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            <span className="ml-2 text-lg">Loading vendor details...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !vendor) {
    toast.error("Vendor not found");
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor Not Found</h1>
            <p className="text-gray-600 mb-6">The vendor you're looking for doesn't exist or is no longer available.</p>
            <Link to="/vendors">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                Back to Vendors
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const portfolioImages = Array.isArray(vendor.portfolio_images) ? vendor.portfolio_images : [];
  const defaultImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80";
  const mainImage = portfolioImages.length > 0 ? portfolioImages[selectedImage] || defaultImage : defaultImage;

  // Mock services for display - in a real app this would come from the database
  const services = [
    { name: "Basic Package", price: vendor.price_range },
    { name: "Premium Package", price: vendor.price_range },
    { name: "Custom Package", price: "Contact for pricing" }
  ];

  const testimonials = [
    {
      name: "Happy Customer",
      rating: 5,
      text: "Excellent service and professional approach. Highly recommended!",
      date: "Recent"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Vendor Header */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Portfolio Images */}
            <div>
              <div className="relative mb-4">
                <img 
                  src={mainImage}
                  alt="Portfolio"
                  className="w-full h-96 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              {portfolioImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {portfolioImages.map((image, index) => (
                    <img
                      key={index}
                      src={image || defaultImage}
                      alt={`Portfolio ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer flex-shrink-0 ${
                        selectedImage === index ? 'ring-2 ring-amber-500' : ''
                      }`}
                      onClick={() => setSelectedImage(index)}
                      onError={(e) => {
                        e.currentTarget.src = defaultImage;
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Vendor Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{vendor.business_name}</h1>
                  <p className="text-gray-600 text-lg">{vendor.category}</p>
                </div>
                {vendor.is_approved && (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{vendor.rating || '0.0'}</span>
                  <span className="text-gray-500 ml-1">({vendor.total_bookings} bookings)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{vendor.city}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{vendor.description || 'Professional service provider with years of experience.'}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <span className="font-semibold w-24">Price:</span>
                  <span className="text-amber-600 font-semibold">{vendor.price_range || 'Contact for pricing'}</span>
                </div>
                {vendor.contact_person && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{vendor.phone}</span>
                  </div>
                )}
                {vendor.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{vendor.email}</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <Link to={`/talk-to-vendor/${vendor.id}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Talk to Vendor
                  </Button>
                </Link>
                <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  Add to Event
                </Button>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="services">Services & Pricing</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services & Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{service.name}</h4>
                        </div>
                        <span className="font-semibold text-amber-600">{service.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="portfolio" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Portfolio Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {portfolioImages.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-4">
                      {portfolioImages.map((image, index) => (
                        <img
                          key={index}
                          src={image || defaultImage}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                          onError={(e) => {
                            e.currentTarget.src = defaultImage;
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>No portfolio images available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="availability" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Check Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">Contact vendor to check availability for your event date</p>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                      Contact for Availability
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {testimonials.map((review, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{review.name}</h4>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-gray-500 text-sm ml-2">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VendorView;
