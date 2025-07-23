
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RefreshCw, CreditCard, Clock, CheckCircle } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-gold via-white to-light-gold">
      <Header />
      
      <section className="py-20 bg-gradient-to-r from-navy-blue to-royal-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <RefreshCw className="h-16 w-16 text-bright-gold mr-4" />
            <h1 className="text-5xl font-majestic font-bold">Refund Policy</h1>
          </div>
          <p className="text-xl font-elegant max-w-3xl mx-auto">
            Clear and fair refund terms for all Aaroham bookings and services.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue flex items-center">
              <Clock className="h-8 w-8 mr-3 text-bright-gold" />
              Cancellation Timeline & Refunds
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-2">30+ Days Before Event</h3>
                <p className="text-green-700"><strong>Full Refund (100%)</strong> - Minus payment processing fees (2-3%)</p>
                <p className="text-sm text-green-600 mt-1">Perfect for early planning changes with minimal impact</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">15-29 Days Before Event</h3>
                <p className="text-blue-700"><strong>75% Refund</strong> - Allows vendors reasonable notice</p>
                <p className="text-sm text-blue-600 mt-1">Good balance between customer flexibility and vendor protection</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6 py-4 bg-yellow-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">7-14 Days Before Event</h3>
                <p className="text-yellow-700"><strong>50% Refund</strong> - Partial compensation for last-minute changes</p>
                <p className="text-sm text-yellow-600 mt-1">Vendors may have already declined other bookings</p>
              </div>

              <div className="border-l-4 border-red-500 pl-6 py-4 bg-red-50 rounded-r-lg">
                <h3 className="text-xl font-semibold text-red-800 mb-2">Less than 7 Days Before Event</h3>
                <p className="text-red-700"><strong>25% Refund</strong> - Emergency situations only</p>
                <p className="text-sm text-red-600 mt-1">Vendors have likely prepared extensively for your event</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue flex items-center">
              <CheckCircle className="h-8 w-8 mr-3 text-bright-gold" />
              Special Circumstances
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Medical Emergencies</h3>
                <p className="text-blue-700">Full refund available with valid medical documentation</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Natural Disasters/Force Majeure</h3>
                <p className="text-orange-700">Full refund for events cancelled due to natural disasters or government restrictions</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Vendor Cancellation</h3>
                <p className="text-purple-700">100% refund if vendor cancels, plus assistance finding replacement</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Service Quality Issues</h3>
                <p className="text-green-700">Partial or full refund based on investigation of service quality complaints</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue flex items-center">
              <CreditCard className="h-8 w-8 mr-3 text-bright-gold" />
              Refund Processing
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Processing Time:</strong> Refunds are processed within 7-10 business days after approval</p>
              <p><strong>Refund Method:</strong> Refunds are issued to the original payment method used for booking</p>
              <p><strong>Bank Processing:</strong> Additional 3-5 business days may be required by banks/card issuers</p>
              <p><strong>Platform Fees:</strong> Non-refundable platform service fees (2-5% of booking value) may apply</p>
              <p><strong>Currency:</strong> Refunds are processed in the same currency as the original payment</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue">How to Request a Refund</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3">
                <div className="bg-bright-gold text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Login to Your Dashboard</h3>
                  <p>Navigate to your customer dashboard and find the booking you want to cancel</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-bright-gold text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Click 'Cancel Booking'</h3>
                  <p>Select the cancellation option and choose your reason for cancellation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-bright-gold text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Submit Documentation</h3>
                  <p>For special circumstances, upload supporting documents (medical certificates, etc.)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-bright-gold text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h3 className="font-semibold mb-1">Await Processing</h3>
                  <p>Our team will review your request and process the refund within 2-3 business days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue">Contact Support</h2>
            <div className="space-y-4 text-gray-700">
              <p>Need help with a refund or have questions about our policy?</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Customer Support</h3>
                  <p><strong>Email:</strong> support@aaroham.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Hours:</strong> 9 AM - 8 PM (Mon-Sat)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Refund Helpline</h3>
                  <p><strong>Email:</strong> refunds@aaroham.com</p>
                  <p><strong>WhatsApp:</strong> +91 98765 43210</p>
                  <p><strong>Response Time:</strong> Within 24 hours</p>
                </div>
              </div>
              <p className="text-sm mt-6"><strong>Last Updated:</strong> December 2024</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
