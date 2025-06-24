
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, DollarSign, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface BookingData {
  eventType: string;
  date: string;
  location: string;
  guests: number;
  budget: string;
  services: string[];
}

const BookingWizard = ({ onComplete }: { onComplete: (data: BookingData) => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    eventType: '',
    date: '',
    location: '',
    guests: 0,
    budget: '',
    services: []
  });

  const eventTypes = [
    "Wedding", "Corporate Event", "Birthday Party", "Anniversary", 
    "Baby Shower", "Engagement", "Religious Ceremony", "Conference"
  ];

  const budgetRanges = [
    "₹50,000 - ₹1,00,000", "₹1,00,000 - ₹3,00,000", 
    "₹3,00,000 - ₹7,00,000", "₹7,00,000 - ₹15,00,000", "₹15,00,000+"
  ];

  const availableServices = [
    "Photography", "Videography", "Decoration", "Catering", 
    "Music & DJ", "Transportation", "Venue", "Priest", "Gifts"
  ];

  const steps = [
    { number: 1, title: "Event Type", icon: Calendar },
    { number: 2, title: "Details", icon: MapPin },
    { number: 3, title: "Budget", icon: DollarSign },
    { number: 4, title: "Services", icon: CheckCircle }
  ];

  const updateBookingData = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    setBookingData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    onComplete(bookingData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {steps.map((step) => (
          <div key={step.number} className="flex items-center">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${currentStep >= step.number 
                ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white' 
                : 'bg-gray-200 text-gray-600'
              }
            `}>
              <step.icon className="h-6 w-6" />
            </div>
            <div className="ml-3 hidden md:block">
              <p className="text-sm text-gray-600">Step {step.number}</p>
              <p className="font-semibold">{step.title}</p>
            </div>
          </div>
        ))}
      </div>

      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50">
          <CardTitle className="text-2xl text-center">
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8">
          {/* Step 1: Event Type */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-6">What type of event are you planning?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {eventTypes.map((type) => (
                  <div
                    key={type}
                    onClick={() => updateBookingData('eventType', type)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer text-center transition-all
                      ${bookingData.eventType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300'
                      }
                    `}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Event Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Event Date</label>
                <Input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => updateBookingData('date', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  placeholder="Enter city or venue"
                  value={bookingData.location}
                  onChange={(e) => updateBookingData('location', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Number of Guests</label>
                <Input
                  type="number"
                  placeholder="Expected number of guests"
                  value={bookingData.guests || ''}
                  onChange={(e) => updateBookingData('guests', parseInt(e.target.value) || 0)}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-6">What's your budget range?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetRanges.map((range) => (
                  <div
                    key={range}
                    onClick={() => updateBookingData('budget', range)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer text-center transition-all
                      ${bookingData.budget === range
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-200 hover:border-amber-300'
                      }
                    `}
                  >
                    {range}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Services */}
          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Which services do you need?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {availableServices.map((service) => (
                  <div
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer text-center transition-all
                      ${bookingData.services.includes(service)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                      }
                    `}
                  >
                    {service}
                    {bookingData.services.includes(service) && (
                      <CheckCircle className="h-4 w-4 ml-2 inline" />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Event Summary</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Event:</strong> {bookingData.eventType}</p>
                  <p><strong>Date:</strong> {bookingData.date}</p>
                  <p><strong>Location:</strong> {bookingData.location}</p>
                  <p><strong>Guests:</strong> {bookingData.guests}</p>
                  <p><strong>Budget:</strong> {bookingData.budget}</p>
                  <p><strong>Services:</strong> {bookingData.services.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-amber-500 text-white flex items-center"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white flex items-center"
              >
                Complete Booking
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingWizard;
