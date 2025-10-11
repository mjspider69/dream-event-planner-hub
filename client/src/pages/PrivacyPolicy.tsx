
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Eye, Lock, UserCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-gold via-white to-light-gold">
      <Header />
      
      <section className="py-20 bg-gradient-to-r from-navy-blue to-royal-blue text-brand-cream">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-bright-gold mr-4" />
            <h1 className="text-5xl font-majestic font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl font-elegant max-w-3xl mx-auto">
            Your privacy is paramount to us. Learn how Aaroham protects and handles your personal information.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-brand-cream rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue flex items-center">
              <Eye className="h-8 w-8 mr-3 text-bright-gold" />
              Information We Collect
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Personal Information:</strong> Name, email address, phone number, and location when you register or book services.</p>
              <p><strong>Event Details:</strong> Information about your events, preferences, and requirements to match you with suitable vendors.</p>
              <p><strong>Payment Information:</strong> Billing details processed securely through our payment partners (we don't store complete payment card details).</p>
              <p><strong>Usage Data:</strong> How you interact with our platform to improve our services and user experience.</p>
            </div>
          </div>

          <div className="bg-brand-cream rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue flex items-center">
              <Lock className="h-8 w-8 mr-3 text-bright-gold" />
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Service Delivery:</strong> To provide event planning services, match you with vendors, and facilitate bookings.</p>
              <p><strong>Communication:</strong> To send booking confirmations, updates, and customer support communications.</p>
              <p><strong>Platform Improvement:</strong> To analyze usage patterns and enhance our AI-powered recommendations.</p>
              <p><strong>Marketing:</strong> To send promotional offers and updates (only with your consent).</p>
            </div>
          </div>

          <div className="bg-brand-cream rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue flex items-center">
              <UserCheck className="h-8 w-8 mr-3 text-bright-gold" />
              Your Rights and Choices
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Access:</strong> Request access to your personal information we hold.</p>
              <p><strong>Correction:</strong> Update or correct your personal information at any time.</p>
              <p><strong>Deletion:</strong> Request deletion of your account and associated data.</p>
              <p><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time.</p>
              <p><strong>Data Portability:</strong> Request a copy of your data in a portable format.</p>
            </div>
          </div>

          <div className="bg-brand-cream rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue">Data Security</h2>
            <div className="space-y-4 text-gray-700">
              <p>We implement industry-standard security measures including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL encryption for all data transmission</li>
                <li>Secure server infrastructure with regular security updates</li>
                <li>Access controls and authentication measures</li>
                <li>Regular security audits and monitoring</li>
                <li>Compliance with data protection regulations</li>
              </ul>
            </div>
          </div>

          <div className="bg-brand-cream rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue">Third-Party Services</h2>
            <div className="space-y-4 text-gray-700">
              <p>We work with trusted third-party service providers for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payment processing (Razorpay, Stripe)</li>
                <li>Cloud hosting and data storage</li>
                <li>Analytics and performance monitoring</li>
                <li>Email and SMS communications</li>
              </ul>
              <p>These partners are contractually bound to protect your data and use it only for specified purposes.</p>
            </div>
          </div>

          <div className="bg-brand-cream rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-majestic font-bold mb-6 text-navy-blue">Contact Us</h2>
            <div className="space-y-4 text-gray-700">
              <p>For privacy-related questions or to exercise your rights, contact us:</p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@aaroham.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> Aaroham Events Pvt. Ltd., Mumbai, India</p>
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

export default PrivacyPolicy;
