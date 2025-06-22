
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Calendar, MessageCircle, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const DealDone = () => {
  const bookingDetails = {
    bookingId: "AH-BK-2024-001",
    eventType: "Traditional Wedding",
    eventDate: "March 15, 2024",
    eventTime: "10:00 AM - 6:00 PM",
    location: "Mumbai, Maharashtra",
    totalAmount: 573300,
    advancePaid: 114660,
    balanceAmount: 458640,
    paymentId: "pay_MH4NCyOGbMt4bV7z",
    transactionDate: "February 10, 2024",
    vendors: [
      { name: "Royal Wedding Photographers", contact: "+91 98765 43210", amount: 45000 },
      { name: "Elegant Event Decorators", contact: "+91 98765 43211", amount: 85000 },
      { name: "Spice Route Caterers", contact: "+91 98765 43212", amount: 240000 },
      { name: "Melody Makers DJ", contact: "+91 98765 43213", amount: 25000 },
      { name: "Sacred Ceremonies", contact: "+91 98765 43214", amount: 15000 },
      { name: "Luxury Transport Services", contact: "+91 98765 43215", amount: 35000 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Congratulations! Your event has been successfully booked.
            </p>
            <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
              Booking ID: {bookingDetails.bookingId}
            </Badge>
          </div>

          {/* Booking Summary */}
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Event Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Event:</span> {bookingDetails.eventType}</p>
                    <p><span className="font-medium">Date:</span> {bookingDetails.eventDate}</p>
                    <p><span className="font-medium">Time:</span> {bookingDetails.eventTime}</p>
                    <p><span className="font-medium">Location:</span> {bookingDetails.location}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Payment Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Total Amount:</span> ₹{bookingDetails.totalAmount.toLocaleString()}</p>
                    <p><span className="font-medium">Advance Paid:</span> ₹{bookingDetails.advancePaid.toLocaleString()}</p>
                    <p><span className="font-medium">Balance Due:</span> ₹{bookingDetails.balanceAmount.toLocaleString()}</p>
                    <p><span className="font-medium">Payment ID:</span> {bookingDetails.paymentId}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Contacts */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Vendor Team</CardTitle>
              <p className="text-gray-600">All vendors have been notified about your booking</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {bookingDetails.vendors.map((vendor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-amber-50 to-orange-50">
                    <div>
                      <h4 className="font-semibold">{vendor.name}</h4>
                      <p className="text-sm text-gray-600">{vendor.contact}</p>
                      <p className="text-sm font-medium text-amber-600">₹{vendor.amount.toLocaleString()}</p>
                    </div>
                    <Link to={`/talk-to-vendor/${index + 1}`}>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-amber-600" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Vendor Coordination</h4>
                    <p className="text-gray-600">Our team will coordinate with all vendors to ensure seamless planning.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Pre-Event Planning</h4>
                    <p className="text-gray-600">Schedule planning meetings and finalize all details 2 weeks before your event.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Event Day Support</h4>
                    <p className="text-gray-600">Our support team will be available on your event day for any assistance.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Link to="/customer-dashboard">
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                <Calendar className="h-4 w-4 mr-2" />
                Track Booking
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat Support
            </Button>
            <Button variant="outline" className="w-full">
              <Star className="h-4 w-4 mr-2" />
              Rate Experience
            </Button>
          </div>

          {/* Thank You Message */}
          <Card className="bg-gradient-to-r from-amber-100 to-orange-100">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Thank You for Choosing Aaroham! 🙏</h2>
              <p className="text-gray-700 mb-4">
                We're excited to be part of your special celebration. Our AI-powered platform has carefully matched you with the best vendors, and our team will ensure everything goes perfectly.
              </p>
              <p className="text-amber-700 font-semibold">
                Your event is in safe hands. Let's make it extraordinary together!
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-sm">
            <p className="text-gray-600 mb-2">Need immediate assistance?</p>
            <div className="flex justify-center space-x-6">
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-amber-600">+91 98765 43210</p>
              </div>
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-amber-600">support@aaroham.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealDone;
