
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Phone, Mail, Calendar, Heart, MessageCircle, CheckCircle, Camera } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VendorView = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const vendor = {
    id: 1,
    name: "Royal Wedding Photographers",
    category: "Photography",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    reviews: 156,
    priceRange: "₹25,000 - ₹50,000",
    description: "Professional wedding photographers specializing in traditional Indian weddings. We capture the essence of your special day with artistic flair and cultural sensitivity.",
    phone: "+91 98765 43210",
    email: "info@royalweddingphotographers.com",
    verified: true,
    experience: "8+ years",
    portfolio: [
      "photo-1649972904349-6e44c42644a7",
      "photo-1581091226825-a6a2a5aee158",
      "photo-1488590528505-98d2b5aba04b",
      "photo-1526374965328-7f61d4dc18c5"
    ],
    services: [
      { name: "Pre-Wedding Shoot", price: "₹15,000" },
      { name: "Wedding Day Photography", price: "₹35,000" },
      { name: "Reception Photography", price: "₹25,000" },
      { name: "Album Design", price: "₹8,000" }
    ],
    availability: {
      "2024-03-15": "available",
      "2024-03-22": "booked",
      "2024-03-29": "available"
    }
  };

  const testimonials = [
    {
      name: "Priya & Arjun",
      rating: 5,
      text: "Absolutely amazing! They captured every precious moment of our wedding beautifully.",
      date: "February 2024"
    },
    {
      name: "Sneha Patel",
      rating: 5,
      text: "Professional, creative, and very respectful of our traditions. Highly recommended!",
      date: "January 2024"
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
                  src={`https://images.unsplash.com/${vendor.portfolio[selectedImage]}?auto=format&fit=crop&w=600&q=80`}
                  alt="Portfolio"
                  className="w-full h-96 object-cover rounded-lg"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {vendor.portfolio.map((image, index) => (
                  <img
                    key={index}
                    src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=150&q=80`}
                    alt={`Portfolio ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded cursor-pointer flex-shrink-0 ${
                      selectedImage === index ? 'ring-2 ring-amber-500' : ''
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Vendor Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{vendor.name}</h1>
                  <p className="text-gray-600 text-lg">{vendor.category}</p>
                </div>
                {vendor.verified && (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{vendor.rating}</span>
                  <span className="text-gray-500 ml-1">({vendor.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{vendor.location}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{vendor.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <span className="font-semibold w-24">Price:</span>
                  <span className="text-amber-600 font-semibold">{vendor.priceRange}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-24">Experience:</span>
                  <span>{vendor.experience}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{vendor.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{vendor.email}</span>
                </div>
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
                    {vendor.services.map((service, index) => (
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
                  <div className="grid md:grid-cols-3 gap-4">
                    {vendor.portfolio.map((image, index) => (
                      <img
                        key={index}
                        src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=300&q=80`}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                      />
                    ))}
                  </div>
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
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {/* Calendar would go here - simplified for demo */}
                    <div className="text-center p-2 border rounded">Mar 15</div>
                    <div className="text-center p-2 border rounded bg-green-100">Available</div>
                    <div className="text-center p-2 border rounded">Mar 22</div>
                    <div className="text-center p-2 border rounded bg-red-100">Booked</div>
                    <div className="text-center p-2 border rounded">Mar 29</div>
                    <div className="text-center p-2 border rounded bg-green-100">Available</div>
                  </div>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    Check Specific Date
                  </Button>
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
