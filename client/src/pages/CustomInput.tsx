
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Users, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const CustomInput = () => {
  const eventTypes = ["Wedding", "Birthday Party", "Corporate Event", "Anniversary", "Religious Ceremony"];
  const timeSlots = ["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-12AM)", "Full Day"];
  const culturalStyles = ["Traditional Indian", "Contemporary", "Fusion", "Western", "Regional Specific"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-amber-100 text-amber-700">Customize Your Event</Badge>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Tell Us Your Vision
            </h1>
            <p className="text-xl text-gray-600">
              Share your specific requirements and we'll create a perfect quote for you
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-amber-600" />
                Event Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form className="space-y-8">
                {/* Event Type & Basic Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10" />
                    </div>
                  </div>
                </div>

                {/* Time Slots & Guest Count */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Preference</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Number of guests" className="pl-10" />
                    </div>
                  </div>
                </div>

                {/* Cultural Preferences */}
                <div>
                  <label className="block text-sm font-medium mb-3">Cultural Style Preference</label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {culturalStyles.map((style) => (
                      <div key={style} className="flex items-center space-x-2">
                        <Checkbox id={style} />
                        <label htmlFor={style} className="text-sm">{style}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Requirements */}
                <div>
                  <label className="block text-sm font-medium mb-2">Special Requirements</label>
                  <Textarea 
                    placeholder="Tell us about any specific needs, themes, dietary restrictions, accessibility requirements, or special traditions you'd like to include..."
                    rows={4}
                  />
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="mid">₹1,00,000 - ₹2,50,000</SelectItem>
                      <SelectItem value="premium">₹2,50,000 - ₹5,00,000</SelectItem>
                      <SelectItem value="luxury">₹5,00,000 - ₹10,00,000</SelectItem>
                      <SelectItem value="ultra">₹10,00,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Vendor Preferences */}
                <div>
                  <label className="block text-sm font-medium mb-3">Required Services</label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {["Photography", "Videography", "Decoration", "Catering", "DJ/Music", "Transportation", "Priest/Officiant", "Security", "Gifts/Favors"].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox id={service} />
                        <label htmlFor={service} className="text-sm">{service}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Preferences */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How should we contact you?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="app">In-App Chat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Best Time to Contact</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Select>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9AM-12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                          <SelectItem value="evening">Evening (5PM-8PM)</SelectItem>
                          <SelectItem value="anytime">Anytime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Link to="/quotation">
                    <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-12 py-6 text-lg">
                      <Heart className="h-5 w-5 mr-2" />
                      Generate My Custom Quote
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-500 mt-3">
                    Our AI will process your requirements and connect you with perfect vendors within 24 hours
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomInput;
