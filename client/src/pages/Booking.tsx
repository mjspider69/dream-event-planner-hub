
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, CreditCard, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Booking = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const bookingSummary = {
    totalAmount: 573300,
    advanceAmount: 114660, // 20% advance
    balanceAmount: 458640,
    vendors: [
      { name: "Royal Wedding Photographers", amount: 45000 },
      { name: "Elegant Event Decorators", amount: 85000 },
      { name: "Spice Route Caterers", amount: 240000 },
      { name: "Melody Makers DJ", amount: 25000 },
      { name: "Sacred Ceremonies", amount: 15000 },
      { name: "Luxury Transport Services", amount: 35000 }
    ],
    eventDetails: {
      type: "Traditional Wedding",
      date: "March 15, 2024",
      time: "Morning (10:00 AM - 6:00 PM)",
      location: "Mumbai, Maharashtra",
      guests: 300
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Confirm Your Booking
            </h1>
            <p className="text-xl text-gray-600">
              You're just one step away from your perfect event!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Details Confirmation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-amber-600" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Date</label>
                      <Input type="date" defaultValue="2024-03-15" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Time</label>
                      <Select defaultValue="morning">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (10:00 AM - 6:00 PM)</SelectItem>
                          <SelectItem value="evening">Evening (4:00 PM - 12:00 AM)</SelectItem>
                          <SelectItem value="full-day">Full Day (10:00 AM - 12:00 AM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Final Guest Count</label>
                    <Input placeholder="300" />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Primary Contact Name</label>
                      <Input placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Event Venue Address</label>
                    <Input placeholder="Complete venue address" />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-amber-600" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Payment Method</label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="netbanking">Net Banking</SelectItem>
                          <SelectItem value="wallet">Digital Wallet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {paymentMethod === "card" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Card Number</label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Expiry Date</label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CVV</label>
                            <Input placeholder="123" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                          <Input placeholder="Name on card" />
                        </div>
                      </>
                    )}

                    {paymentMethod === "upi" && (
                      <div>
                        <label className="block text-sm font-medium mb-2">UPI ID</label>
                        <Input placeholder="your-id@paytm" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="terms" 
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                      />
                      <div className="text-sm">
                        <label htmlFor="terms" className="font-medium cursor-pointer">
                          I agree to the Terms of Service and Refund Policy
                        </label>
                        <p className="text-gray-600 mt-1">
                          By proceeding, you accept our booking terms, cancellation policy, and privacy policy.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Your payment is secured with 256-bit SSL encryption</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                      <h3 className="font-semibold text-lg">{bookingSummary.eventDetails.type}</h3>
                      <p className="text-gray-600">{bookingSummary.eventDetails.date}</p>
                      <p className="text-gray-600">{bookingSummary.eventDetails.guests} guests</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Selected Vendors:</h4>
                      {bookingSummary.vendors.map((vendor, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="truncate mr-2">{vendor.name}</span>
                          <span>₹{vendor.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{(bookingSummary.totalAmount / 1.18).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GST (18%)</span>
                        <span>₹{(bookingSummary.totalAmount - bookingSummary.totalAmount / 1.18).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span>₹{bookingSummary.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-amber-800 mb-2">Payment Breakdown</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Advance Payment (20%)</span>
                          <span className="font-semibold">₹{bookingSummary.advanceAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Balance (Due on event day)</span>
                          <span>₹{bookingSummary.balanceAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <Link to="/deal-done">
                      <Button 
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 py-6 text-lg"
                        disabled={!agreedToTerms}
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Pay ₹{bookingSummary.advanceAmount.toLocaleString()} Now
                      </Button>
                    </Link>

                    <p className="text-xs text-gray-500 text-center">
                      Secured by Razorpay • Money-back guarantee
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
