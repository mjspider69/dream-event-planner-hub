
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Phone, Video, Calendar, Star, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";

const TalkToVendor = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'vendor',
      text: "Hello! Thank you for your interest in our photography services. I'd be happy to discuss your wedding photography needs.",
      time: "2:30 PM",
      read: true
    },
    {
      id: 2,
      sender: 'customer',
      text: "Hi! We're planning a traditional Indian wedding for March 15th. Can you share your packages?",
      time: "2:32 PM",
      read: true
    },
    {
      id: 3,
      sender: 'vendor',
      text: "Congratulations on your upcoming wedding! I have several packages tailored for traditional Indian weddings. Would you prefer a call to discuss details, or shall I send you our brochure?",
      time: "2:35 PM",
      read: true
    }
  ]);

  const vendor = {
    name: "Royal Wedding Photographers",
    category: "Photography",
    rating: 4.8,
    responseTime: "Usually responds within 30 minutes",
    verified: true,
    online: true
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'customer',
      text: message,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Vendor Info Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xl">
                      RW
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h2 className="text-xl font-bold">{vendor.name}</h2>
                      {vendor.verified && (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {vendor.online && (
                        <Badge className="bg-green-100 text-green-700">Online</Badge>
                      )}
                    </div>
                    <p className="text-gray-600">{vendor.category}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{vendor.rating} rating</span>
                      </div>
                      <span>{vendor.responseTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Chat with {vendor.name}</CardTitle>
            </CardHeader>
            
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${msg.sender === 'customer' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={`${msg.sender === 'vendor' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : 'bg-gray-300'}`}>
                        {msg.sender === 'vendor' ? 'V' : 'You'}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg p-3 ${msg.sender === 'vendor' ? 'bg-white shadow-sm border' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'}`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'vendor' ? 'text-gray-500' : 'text-amber-100'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-3 border-t border-b bg-gray-50">
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => setMessage("Can you share your portfolio?")}>
                  Share Portfolio
                </Button>
                <Button size="sm" variant="outline" onClick={() => setMessage("What are your packages?")}>
                  View Packages
                </Button>
                <Button size="sm" variant="outline" onClick={() => setMessage("Are you available on March 15th?")}>
                  Check Availability
                </Button>
                <Button size="sm" variant="outline" onClick={() => setMessage("Can we schedule a call?")}>
                  Schedule Call
                </Button>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-6">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button 
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="mt-6 text-center">
            <Card className="bg-gradient-to-r from-amber-100 to-orange-100">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Ready to book?</h3>
                <p className="text-gray-600 mb-4">
                  Once you're satisfied with the discussion, you can add this vendor to your event or request a formal quote.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Add to Event
                  </Button>
                  <Button variant="outline">
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkToVendor;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Star, MapPin, ArrowLeft, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVendorById } from "@/hooks/useVendors";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const TalkToVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: vendor, isLoading } = useVendorById(id || '');
  const [hasCalledBefore, setHasCalledBefore] = useState(false);
  const [showCallConfirm, setShowCallConfirm] = useState(false);

  useEffect(() => {
    // Check if user has called this vendor before
    const calledVendors = JSON.parse(localStorage.getItem('calledVendors') || '[]');
    setHasCalledBefore(calledVendors.includes(id));
  }, [id]);

  const handleFirstCall = () => {
    if (!vendor?.phone) {
      toast.error("Vendor phone number not available");
      return;
    }

    // Mark as called
    const calledVendors = JSON.parse(localStorage.getItem('calledVendors') || '[]');
    calledVendors.push(id);
    localStorage.setItem('calledVendors', JSON.stringify(calledVendors));
    setHasCalledBefore(true);

    // Initiate call
    window.open(`tel:${vendor.phone}`);
    toast.success("Call initiated! Future calls will require booking.");
  };

  const handleBookingRequired = () => {
    toast.info("Please book a consultation for further calls");
    navigate(`/booking?vendor=${id}`);
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <p>Loading vendor details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor Not Found</h1>
            <Button onClick={() => navigate('/vendors')} className="bg-gradient-to-r from-amber-500 to-orange-500">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Vendors
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => navigate(`/vendor/${id}`)} 
            variant="outline" 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vendor Profile
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vendor Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{vendor.business_name}</CardTitle>
                    <p className="text-gray-600">{vendor.category}</p>
                  </div>
                  {vendor.is_approved && (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                    <span className="font-semibold">{vendor.rating || '0.0'}</span>
                    <span className="text-gray-500 ml-1">({vendor.total_bookings} bookings)</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{vendor.city}</span>
                  </div>
                  
                  <p className="text-gray-700">{vendor.description || 'Professional service provider'}</p>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="font-semibold text-amber-800">Price Range</p>
                    <p className="text-amber-600">{vendor.price_range || 'Contact for pricing'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Vendor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {!hasCalledBefore ? (
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                        <h3 className="font-semibold text-green-800">First Call Free!</h3>
                      </div>
                      <p className="text-green-700 mb-4">
                        You can make your first call to this vendor for free through our platform.
                      </p>
                      <Button 
                        onClick={handleFirstCall}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now (Free)
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                      <div className="flex items-center mb-4">
                        <Clock className="h-6 w-6 text-amber-600 mr-2" />
                        <h3 className="font-semibold text-amber-800">Book for More Calls</h3>
                      </div>
                      <p className="text-amber-700 mb-4">
                        You've already used your free call. Book a consultation for detailed discussions.
                      </p>
                      <Button 
                        onClick={handleBookingRequired}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Consultation
                      </Button>
                    </div>
                  )}

                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-3">Alternative Contact</h4>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/booking?vendor=${id}`)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message & Book
                    </Button>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Note:</strong> Our platform ensures verified vendors and secure communication. 
                      Your first call is free to help you evaluate the vendor.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TalkToVendor;
