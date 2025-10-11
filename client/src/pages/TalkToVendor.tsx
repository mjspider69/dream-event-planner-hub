import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Star, MapPin, ArrowLeft, Clock, CheckCircle, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVendorById, type Vendor } from "@/hooks/useVendors";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const TalkToVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: vendor, isLoading } = useVendorById(id || '') as { data: Vendor | undefined; isLoading: boolean };
  const [hasCalledBefore, setHasCalledBefore] = useState(false);

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
      <div className="min-h-screen bg-brand-cream">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-peach mx-auto mb-4"></div>
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
      <div className="min-h-screen bg-brand-cream">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">Vendor not found</h2>
            <Button onClick={() => navigate('/')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => navigate(-1)} 
            variant="ghost" 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vendor Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{vendor.businessName}</CardTitle>
                  {vendor.isApproved && (
                    <Badge variant="secondary" className="bg-brand-tan/20 text-brand-dark">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {vendor.category}
                    </Badge>
                    {vendor.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-brand-tan text-brand-tan mr-1" />
                        <span className="text-sm font-medium">{vendor.rating}</span>
                      </div>
                    )}
                  </div>

                  {vendor.city && (
                    <div className="flex items-center text-brand-dark/70">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{vendor.city}</span>
                    </div>
                  )}

                  {vendor.description && (
                    <p className="text-brand-dark/80">{vendor.description}</p>
                  )}

                  {vendor.priceRange && (
                    <div>
                      <span className="font-medium">Price Range: </span>
                      <span className="text-brand-peach">{vendor.priceRange}</span>
                    </div>
                  )}

                  {vendor.speciality && vendor.speciality.length > 0 && (
                    <div>
                      <span className="font-medium mb-2 block">Specialties:</span>
                      <div className="flex flex-wrap gap-2">
                        {vendor.speciality.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Vendor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {!hasCalledBefore ? (
                    <div className="bg-brand-peach/20 p-6 rounded-lg border border-brand-peach">
                      <div className="flex items-center mb-4">
                        <Phone className="h-6 w-6 text-brand-dark mr-2" />
                        <h3 className="font-semibold text-brand-dark">Free First Call</h3>
                      </div>
                      <p className="text-brand-dark/80 mb-4">
                        Get started with a complimentary call to discuss your requirements and evaluate this vendor.
                      </p>
                      <Button 
                        onClick={handleFirstCall}
                        className="w-full bg-gradient-to-r from-brand-peach to-brand-tan hover:opacity-90 text-brand-dark"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now (Free)
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-brand-tan/20 p-6 rounded-lg border border-brand-tan">
                      <div className="flex items-center mb-4">
                        <Clock className="h-6 w-6 text-brand-dark mr-2" />
                        <h3 className="font-semibold text-brand-dark">Book for More Calls</h3>
                      </div>
                      <p className="text-brand-dark/80 mb-4">
                        You've already used your free call. Book a consultation for detailed discussions.
                      </p>
                      <Button 
                        onClick={handleBookingRequired}
                        className="w-full bg-gradient-to-r from-brand-tan to-brand-dark hover:opacity-90 text-brand-cream"
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

                  <div className="bg-brand-cream p-4 rounded-lg border border-brand-tan/30">
                    <p className="text-sm text-brand-dark/80">
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