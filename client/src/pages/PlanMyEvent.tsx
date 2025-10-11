
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, DollarSign, Bot, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PlanMyEvent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-peach via-white to-brand-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-brand-peach/10 to-brand-dark/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-brand-peach text-brand-peach">AI-Powered Planning</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-peach to-brand-dark bg-clip-text text-transparent">
              Plan Your Perfect Event
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Let our AI understand your vision and match you with the perfect vendors for your celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Input Form */}
      <section className="py-16 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Quick Event Details</CardTitle>
                <p className="text-gray-600">Tell us about your event and we'll handle the rest</p>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="birthday">Birthday Party</SelectItem>
                          <SelectItem value="corporate">Corporate Event</SelectItem>
                          <SelectItem value="anniversary">Anniversary</SelectItem>
                          <SelectItem value="social">Social Gathering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="City or venue" className="pl-10" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type="date" className="pl-10" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Select>
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50000-100000">₹50K - ₹1L</SelectItem>
                            <SelectItem value="100000-250000">₹1L - ₹2.5L</SelectItem>
                            <SelectItem value="250000-500000">₹2.5L - ₹5L</SelectItem>
                            <SelectItem value="500000+">₹5L+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Guest Count</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input placeholder="Number of guests" className="pl-10" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link to="/ai-chatbot">
                      <Button size="lg" className="bg-gradient-to-r from-brand-peach to-brand-dark hover:from-brand-peach hover:to-brand-dark px-8 py-6 text-lg">
                        <Bot className="mr-2 h-5 w-5" />
                        Start Planning with AI
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Chatbot Preview */}
      <section className="py-16 bg-gradient-to-br from-brand-peach to-brand-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Your AI Event Planner</h2>
              <p className="text-gray-600">Experience intelligent event planning like never before</p>
            </div>
            
            <Card className="bg-gradient-to-br from-white to-brand-tan">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-peach to-brand-dark rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6 text-brand-cream" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-brand-cream rounded-lg p-4 shadow-sm">
                      <p className="text-gray-800">
                        Hi! I'm your AI event planner. I'll help you create the perfect celebration by understanding your preferences, cultural needs, and budget. What kind of event are you planning?
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 justify-end">
                  <div className="flex-1 max-w-sm">
                    <div className="bg-gradient-to-r from-brand-peach to-brand-dark text-brand-cream rounded-lg p-4">
                      <p>I'm planning a traditional Indian wedding for 300 guests in Mumbai with a budget of ₹5 lakhs.</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">You</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-brand-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Happens Next?</h2>
            <p className="text-gray-600">Your journey to the perfect event in simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-tan to-brand-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-cream font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-gray-600">Our AI analyzes your requirements and preferences</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-peach to-brand-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-cream font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold mb-2">Vendor Matching</h3>
                <p className="text-gray-600">Get matched with verified vendors perfect for your event</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-tan to-brand-tan rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-cream font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold mb-2">Custom Quote</h3>
                <p className="text-gray-600">Receive personalized quotations and book instantly</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlanMyEvent;
