
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How does Aaroham's AI event planning work?",
          answer: "Our AI analyzes your event requirements, budget, and preferences to match you with the best vendors in your area. Simply tell us about your event, and we'll provide personalized recommendations within minutes."
        },
        {
          question: "Is the AI chat really free?",
          answer: "Yes! You get 5 minutes of free AI chat and 2 minutes of free voice chat to explore our platform. After that, you can subscribe for unlimited access to all AI features."
        },
        {
          question: "How do I create an account?",
          answer: "Click on 'Plan My Event' or 'AI Chat' and you'll be guided to create your account. We offer separate registration for customers and vendors."
        }
      ]
    },
    {
      category: "Booking & Payments",
      questions: [
        {
          question: "How secure are my payments?",
          answer: "We use industry-standard SSL encryption and are PCI compliant. All payments are processed through secure gateways like Razorpay, ensuring your financial information is completely safe."
        },
        {
          question: "Can I get a refund if I'm not satisfied?",
          answer: "Yes, we have a comprehensive refund policy. If a vendor fails to deliver as promised, you can request a full or partial refund based on our terms and conditions."
        },
        {
          question: "Do I need to pay the full amount upfront?",
          answer: "No, you can pay in installments. Typically, we require a small booking fee (10-20%) to confirm your vendor, with the remaining amount due closer to your event date."
        }
      ]
    },
    {
      category: "Vendors",
      questions: [
        {
          question: "How are vendors verified?",
          answer: "All vendors go through a strict verification process including document verification, background checks, portfolio review, and customer feedback analysis before being approved on our platform."
        },
        {
          question: "What if a vendor doesn't show up?",
          answer: "We have a 100% vendor reliability guarantee. If a confirmed vendor doesn't show up, we'll immediately arrange a replacement vendor at no extra cost, or provide a full refund."
        },
        {
          question: "Can I communicate directly with vendors?",
          answer: "Yes! Once you've selected a vendor, you can chat with them directly through our platform to discuss your requirements and finalize details."
        }
      ]
    },
    {
      category: "Events & Services",
      questions: [
        {
          question: "What types of events do you support?",
          answer: "We support all types of events including weddings, corporate events, birthday parties, anniversaries, religious ceremonies, baby showers, and more. Our AI can plan any celebration!"
        },
        {
          question: "Do you work in all Indian cities?",
          answer: "We currently operate in 50+ major cities across India, with new cities being added regularly. Check our vendor listings to see if we serve your area."
        },
        {
          question: "Can you handle large-scale events?",
          answer: "Absolutely! We've successfully managed events from intimate gatherings of 20 people to grand celebrations with 1000+ guests. Our vendor network can scale to any size."
        }
      ]
    },
    {
      category: "Pricing & Packages",
      questions: [
        {
          question: "Are your packages customizable?",
          answer: "Yes! While we offer pre-designed packages for convenience, everything can be customized to match your specific needs, preferences, and budget."
        },
        {
          question: "Do you charge any platform fees?",
          answer: "Our AI consultation and vendor matching is free. We only earn a small commission from vendors when you successfully book through our platform - this doesn't add to your costs."
        },
        {
          question: "How accurate are your price estimates?",
          answer: "Our AI provides estimates based on current market rates and your requirements. Final prices are confirmed directly with vendors, and we ensure transparency in all pricing."
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-blue-100 text-blue-800 px-6 py-2 rounded-full">
          <HelpCircle className="w-4 h-4 mr-2" />
          Frequently Asked Questions
        </Badge>
        <h2 className="text-4xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
            Got Questions?
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about Aaroham's AI-powered event planning platform
        </p>
      </div>

      <div className="space-y-8">
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">{categoryIndex + 1}</span>
              </div>
              {category.category}
            </h3>
            
            <div className="space-y-3">
              {category.questions.map((faq, questionIndex) => {
                const globalIndex = categoryIndex * 10 + questionIndex;
                const isOpen = openItems.includes(globalIndex);
                
                return (
                  <Card key={questionIndex} className="shadow-md border-0 overflow-hidden">
                    <Button
                      onClick={() => toggleItem(globalIndex)}
                      className="w-full p-6 text-left bg-white hover:bg-gray-50 border-0 rounded-lg flex items-center justify-between"
                      variant="ghost"
                    >
                      <span className="font-semibold text-gray-900 text-lg">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-blue-600 flex-shrink-0 ml-4" />
                      )}
                    </Button>
                    
                    {isOpen && (
                      <CardContent className="px-6 pb-6 pt-0">
                        <div className="border-t pt-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <Card className="mt-12 bg-gradient-to-r from-blue-50 to-amber-50 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you 24/7. Get in touch for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-blue-600 to-amber-500 text-white">
              Chat with Support
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">
              Call Us: +91-9876543210
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQ;
