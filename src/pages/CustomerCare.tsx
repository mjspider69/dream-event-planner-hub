
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, MessageCircle, HelpCircle, CreditCard, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CustomerCare = () => {
  const faqs = [
    {
      question: "How does AI-powered event planning work?",
      answer: "Our AI chatbot understands your event requirements and matches you with the perfect vendors based on your preferences, budget, and location."
    },
    {
      question: "Are all vendors verified?",
      answer: "Yes, all vendors on our platform go through a thorough verification process including background checks, portfolio review, and customer feedback analysis."
    },
    {
      question: "What's the refund policy?",
      answer: "We offer flexible refund policies depending on the cancellation timeline. Full refunds are available up to 30 days before the event date."
    },
    {
      question: "Can I customize my event package?",
      answer: "Absolutely! Our AI system allows complete customization of event packages to match your specific cultural preferences and requirements."
    }
  ];

  const helpCategories = [
    { title: "Account Issues", icon: User, description: "Login, registration, profile management" },
    { title: "Booking Support", icon: MessageCircle, description: "Event planning, vendor selection, scheduling" },
    { title: "Payment Help", icon: CreditCard, description: "Billing, refunds, payment methods" },
    { title: "General Inquiries", icon: HelpCircle, description: "Platform features, how-to guides" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600/10 to-orange-600/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-amber-100 text-amber-700">Customer Support</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              We're Here to Help
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get instant support for all your event planning needs. Our team is available 24/7 to ensure your celebration is perfect.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-amber-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">+91 98765 43210</p>
                <p className="text-sm text-gray-500">24/7 Support</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-amber-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600">help@aaroham.com</p>
                <p className="text-sm text-gray-500">Quick Response</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-amber-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600">Mumbai, India</p>
                <p className="text-sm text-gray-500">Business Hours</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-amber-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-gray-600">&lt; 2 Hours</p>
                <p className="text-sm text-gray-500">Average</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Help Categories */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Email Address" type="email" />
                  </div>
                  <Input placeholder="Mobile Number" />
                  <Textarea placeholder="How can we help you?" rows={4} />
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Help Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Help Categories</h2>
              <div className="space-y-4">
                {helpCategories.map((category, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex items-center">
                      <category.icon className="h-8 w-8 text-amber-600 mr-4" />
                      <div>
                        <h3 className="font-semibold">{category.title}</h3>
                        <p className="text-gray-600 text-sm">{category.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerCare;
