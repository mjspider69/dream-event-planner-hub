
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Calendar, MapPin } from "lucide-react";
import SignUpModal from './SignUpModal';

const EventPackages = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const packages = [
    {
      id: 1,
      name: "Birthday Party Package",
      price: "₹30,000",
      guestCount: "30 guests",
      color: "from-pink-500 to-rose-500",
      features: [
        "Complete decoration setup",
        "Professional anchor",
        "Catering for 30 guests",
        "Photographer (2 hours)",
        "DJ setup with music",
        "Return gifts for guests",
        "Dedicated event manager"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Budget Wedding Package",
      price: "₹2,00,000",
      guestCount: "100 guests",
      color: "from-amber-500 to-orange-500",
      features: [
        "Venue decoration",
        "Photography & videography (full day)",
        "Catering for 100 guests",
        "Bridal makeup",
        "Sound system",
        "Seating arrangements",
        "Coordination team"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Corporate Event Package",
      price: "₹75,000",
      guestCount: "50 guests",
      color: "from-blue-500 to-indigo-500",
      features: [
        "Projector & audio setup",
        "Catering for 50",
        "Photographer (3 hours)",
        "Professional anchor",
        "Branding standees",
        "Technical support",
        "Event coordination"
      ],
      popular: false
    },
    {
      id: 4,
      name: "College/Youth Fest Package",
      price: "₹50,000",
      guestCount: "100+ guests",
      color: "from-purple-500 to-violet-500",
      features: [
        "DJ night setup",
        "Photographer/videographer (5 hours)",
        "Stalls setup",
        "Mic & anchor",
        "Security volunteers",
        "Permission letter templates",
        "Youth-focused entertainment"
      ],
      popular: false
    },
    {
      id: 5,
      name: "Baby Shower Package",
      price: "₹35,000",
      guestCount: "40 guests",
      color: "from-green-500 to-emerald-500",
      features: [
        "Theme decoration",
        "Catering for 40",
        "Photographer (2 hours)",
        "Return gifts",
        "Chair covers & stage setup",
        "Baby-friendly arrangements",
        "Memory book creation"
      ],
      popular: false
    }
  ];

  const handleBookNow = () => {
    setShowSignUp(true);
  };

  const handleSignUpSuccess = () => {
    setShowSignUp(false);
    // Redirect to customer dashboard or booking page
    window.location.href = '/customer-dashboard';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Our Event Packages
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully curated packages designed for every celebration. 
            All packages include professional coordination and quality assurance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 ${pkg.popular ? 'ring-2 ring-amber-400' : ''}`}>
              {pkg.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-amber-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className={`bg-gradient-to-r ${pkg.color} text-white p-6`}>
                <CardTitle className="text-2xl font-bold mb-2">{pkg.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{pkg.price}</div>
                  <div className="flex items-center space-x-4 text-sm opacity-90">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {pkg.guestCount}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleBookNow}
                  className={`w-full py-3 font-semibold bg-gradient-to-r ${pkg.color} hover:opacity-90 text-white`}
                >
                  Book Now
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Payment via Razorpay • No cash payments accepted
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Why Choose Our Packages?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold mb-2">All-Inclusive</h4>
                <p className="text-sm text-gray-600">Everything you need in one package</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold mb-2">Quality Assured</h4>
                <p className="text-sm text-gray-600">Verified vendors and premium services</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold mb-2">Expert Support</h4>
                <p className="text-sm text-gray-600">Dedicated event managers for each booking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SignUpModal 
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSuccess={handleSignUpSuccess}
      />
    </section>
  );
};

export default EventPackages;
