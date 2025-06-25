
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Scale, CheckCircle, AlertCircle } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-gold via-white to-light-gold">
      <Header />
      
      <section className="py-20 bg-gradient-to-r from-navy-blue to-royal-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Scale className="h-16 w-16 text-bright-gold mr-4" />
            <h1 className="text-5xl font-majestic font-bold">Terms of Service</h1>
          </div>
          <p className="text-xl font-elegant max-w-3xl mx-auto">
            These terms govern your use of Aaroham's event planning platform and services.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue flex items-center">
              <FileText className="h-8 w-8 mr-3 text-bright-gold" />
              Service Agreement
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>By using Aaroham's platform, you agree to these terms and conditions. Aaroham serves as a marketplace connecting customers with verified event service providers.</p>
              <p><strong>Platform Purpose:</strong> We facilitate connections between customers and vendors for event planning services including weddings, corporate events, birthdays, and other celebrations.</p>
              <p><strong>Service Scope:</strong> Our AI-powered platform provides vendor matching, booking management, payment processing, and customer support.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue flex items-center">
              <CheckCircle className="h-8 w-8 mr-3 text-bright-gold" />
              User Responsibilities
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Account Information:</strong> Provide accurate and complete information during registration and keep it updated.</p>
              <p><strong>Booking Commitments:</strong> Honor confirmed bookings and communicate any changes promptly.</p>
              <p><strong>Payment Obligations:</strong> Complete payments as agreed for booked services.</p>
              <p><strong>Respectful Conduct:</strong> Interact respectfully with vendors and our support team.</p>
              <p><strong>Compliance:</strong> Use our platform in accordance with applicable laws and regulations.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue">Booking and Cancellation Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Booking Confirmation:</strong> Bookings are confirmed upon payment and vendor acceptance.</p>
              <p><strong>Cancellation Terms:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>30+ days before event: Full refund minus processing fees</li>
                <li>15-29 days before event: 75% refund</li>
                <li>7-14 days before event: 50% refund</li>
                <li>Less than 7 days: 25% refund</li>
                <li>Emergency cancellations may be eligible for different terms</li>
              </ul>
              <p><strong>Vendor Cancellations:</strong> If a vendor cancels, we'll provide alternative options or full refund.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue">Payment Terms</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Payment Processing:</strong> Payments are processed securely through our verified payment partners.</p>
              <p><strong>Service Fees:</strong> Platform fees are clearly disclosed before payment confirmation.</p>
              <p><strong>Refund Processing:</strong> Eligible refunds are processed within 7-10 business days.</p>
              <p><strong>Dispute Resolution:</strong> Payment disputes are handled through our customer support team.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue flex items-center">
              <AlertCircle className="h-8 w-8 mr-3 text-bright-gold" />
              Limitations and Disclaimers
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Platform Role:</strong> Aaroham is a marketplace facilitator and not directly responsible for vendor service quality.</p>
              <p><strong>Vendor Verification:</strong> While we verify basic credentials, customers should conduct due diligence.</p>
              <p><strong>Service Availability:</strong> Platform availability may be affected by maintenance or technical issues.</p>
              <p><strong>Liability Limits:</strong> Our liability is limited to the amount paid for platform services.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue">Intellectual Property</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Platform Content:</strong> All content, design, and technology on Aaroham platform is protected by intellectual property rights.</p>
              <p><strong>User Content:</strong> You retain rights to content you upload but grant us license to use it for platform operations.</p>
              <p><strong>Restrictions:</strong> Users may not copy, modify, or distribute platform content without permission.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue">Contact and Updates</h2>
            <div className="space-y-4 text-gray-700">
              <p>For questions about these terms or our services:</p>
              <div className="space-y-2">
                <p><strong>Email:</strong> legal@aaroham.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> Aaroham Events Pvt. Ltd., Mumbai, India</p>
              </div>
              <p><strong>Updates:</strong> We may update these terms occasionally. Users will be notified of significant changes.</p>
              <p className="text-sm mt-6"><strong>Last Updated:</strong> December 2024</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
