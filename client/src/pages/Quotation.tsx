
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Edit, Check, MessageCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Quotation = () => {
  const quotationData = {
    id: "AH-QT-2024-001",
    eventType: "Traditional Wedding",
    eventDate: "March 15, 2024",
    guestCount: 300,
    location: "Mumbai, Maharashtra",
    generatedDate: "February 10, 2024",
    validUntil: "March 1, 2024",
    totalAmount: 485000,
    vendors: [
      {
        id: 1,
        name: "Royal Wedding Photographers",
        category: "Photography",
        services: ["Pre-wedding Shoot", "Wedding Day Photography", "Reception Coverage"],
        amount: 45000,
        rating: 4.8,
        aiRecommended: true
      },
      {
        id: 2,
        name: "Elegant Event Decorators",
        category: "Decoration",
        services: ["Mandap Decoration", "Reception Setup", "Floral Arrangements"],
        amount: 85000,
        rating: 4.6,
        aiRecommended: true
      },
      {
        id: 3,
        name: "Spice Route Caterers",
        category: "Catering",
        services: ["Welcome Drinks", "Lunch Service", "Dinner Service"],
        amount: 240000,
        rating: 4.9,
        aiRecommended: false
      },
      {
        id: 4,
        name: "Melody Makers DJ",
        category: "DJ & Music",
        services: ["Sound System", "DJ Services", "Live Music Setup"],
        amount: 25000,
        rating: 4.7,
        aiRecommended: true
      },
      {
        id: 5,
        name: "Sacred Ceremonies",
        category: "Priest",
        services: ["Wedding Ceremony", "Pre-wedding Rituals"],
        amount: 15000,
        rating: 4.9,
        aiRecommended: false
      },
      {
        id: 6,
        name: "Luxury Transport Services",
        category: "Transport",
        services: ["Groom's Car", "Guest Transportation"],
        amount: 35000,
        rating: 4.5,
        aiRecommended: false
      }
    ]
  };

  const taxes = quotationData.totalAmount * 0.18; // 18% GST
  const grandTotal = quotationData.totalAmount + taxes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Quotation Header */}
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <FileText className="h-6 w-6 mr-2" />
                    Event Quotation
                  </CardTitle>
                  <p className="text-amber-100">Quote ID: {quotationData.id}</p>
                </div>
                <Badge className="bg-white text-amber-600">
                  AI Generated
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Event Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Event Type:</span> {quotationData.eventType}</p>
                    <p><span className="font-medium">Date:</span> {quotationData.eventDate}</p>
                    <p><span className="font-medium">Location:</span> {quotationData.location}</p>
                    <p><span className="font-medium">Guest Count:</span> {quotationData.guestCount}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Quotation Info</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Generated:</span> {quotationData.generatedDate}</p>
                    <p><span className="font-medium">Valid Until:</span> {quotationData.validUntil}</p>
                    <p><span className="font-medium">Status:</span> <Badge className="bg-green-100 text-green-700">Active</Badge></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Vendor Breakdown</CardTitle>
              <p className="text-gray-600">Your AI-curated vendor selection</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quotationData.vendors.map((vendor, index) => (
                  <div key={vendor.id}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-lg">{vendor.name}</h4>
                          <Badge variant="outline">{vendor.category}</Badge>
                          {vendor.aiRecommended && (
                            <Badge className="bg-purple-100 text-purple-700">AI Pick</Badge>
                          )}
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{vendor.rating}</span>
                          </div>
                        </div>
                        <div className="text-gray-600">
                          <p className="font-medium mb-1">Services Included:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {vendor.services.map((service, idx) => (
                              <li key={idx} className="text-sm">{service}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-amber-600">
                          ₹{vendor.amount.toLocaleString()}
                        </p>
                        <div className="space-x-2 mt-2">
                          <Link to={`/vendor/${vendor.id}`}>
                            <Button size="sm" variant="outline">View</Button>
                          </Link>
                          <Link to={`/talk-to-vendor/${vendor.id}`}>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {index < quotationData.vendors.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Total Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Cost Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal (All Vendors)</span>
                  <span className="font-semibold">₹{quotationData.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="font-semibold">₹{taxes.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Grand Total</span>
                  <span className="text-amber-600">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-4 gap-4">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
              <Check className="h-4 w-4 mr-2" />
              Accept Quote
            </Button>
            <Link to="/booking">
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                Proceed to Book
              </Button>
            </Link>
            <Link to="/custom-input">
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Modify Requirements
              </Button>
            </Link>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              This quotation is valid until {quotationData.validUntil}. 
              <Link to="/customer-care" className="text-amber-600 hover:underline ml-1">
                Need help? Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotation;
