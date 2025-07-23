
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, MessageCircle, HelpCircle, CreditCard, User, ExternalLink, Instagram, Linkedin } from "lucide-react";
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
                <a href="tel:+917698889321" className="text-gray-600 hover:text-amber-600 transition-colors">
                  +91 769 888 9321
                </a>
                <p className="text-sm text-gray-500 mt-1">24/7 Support</p>
                <Button 
                  size="sm" 
                  className="mt-3 bg-amber-600 hover:bg-amber-700"
                  onClick={() => window.open('tel:+917698889321')}
                >
                  📱 Call Us Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-amber-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <a href="mailto:aaroham.net@gmail.com" className="text-gray-600 hover:text-amber-600 transition-colors">
                  aaroham.net@gmail.com
                </a>
                <p className="text-sm text-gray-500 mt-1">Quick Response</p>
                <Button 
                  size="sm" 
                  className="mt-3 bg-amber-600 hover:bg-amber-700"
                  onClick={() => window.open('mailto:aaroham.net@gmail.com')}
                >
                  📬 Drop Us a Mail
                </Button>
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

          {/* Social Media & Career Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Instagram className="h-5 w-5 text-amber-600" />
                  Follow Our Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Stay updated with our latest events, behind-the-scenes content, and royal celebrations on Instagram.
                </p>
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={() => window.open('https://www.instagram.com/aaroham_', '_blank')}
                >
                  📸 Follow Our Journey <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                  Join Our Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Connect with vendors, partners, and event professionals in our exclusive LinkedIn community.
                </p>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  onClick={() => window.open('https://www.linkedin.com/groups/14719662/', '_blank')}
                >
                  👥 Join Our Network <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Careers Section */}
          <Card className="mb-16 bg-gradient-to-r from-amber-600/10 to-orange-600/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Work With Us</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join our team of passionate event planning professionals. We're always looking for talented individuals 
                to help us create magical moments across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                  onClick={() => window.open('mailto:withaaroham@aaroham', '_blank')}
                >
                  💼 Career Opportunities
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-amber-600 text-amber-600 hover:bg-amber-50"
                  onClick={() => window.open('mailto:withaaroham@aaroham', '_blank')}
                >
                  🎓 Internship Programs
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Send your resume to: <a href="mailto:withaaroham@aaroham" className="text-amber-600 hover:underline">withaaroham@aaroham</a>
              </p>
            </CardContent>
          </Card>
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
