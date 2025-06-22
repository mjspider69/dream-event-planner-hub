
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Camera, DollarSign, Share2, FileCheck, ArrowRight, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

const VendorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Basic Information", icon: User },
    { number: 2, title: "Portfolio Upload", icon: Camera },
    { number: 3, title: "Pricing Setup", icon: DollarSign },
    { number: 4, title: "Social Media", icon: Share2 },
    { number: 5, title: "Final Review", icon: FileCheck }
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Join Aaroham as a Vendor
            </h1>
            <p className="text-xl text-gray-600">
              Complete your profile to start receiving bookings
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step) => (
                <div key={step.number} className={`flex items-center ${currentStep >= step.number ? 'text-amber-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= step.number ? 'border-amber-600 bg-amber-100' : 'border-gray-300'}`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="ml-2 text-sm font-medium hidden md:block">{step.title}</span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-gray-600 mt-2">Step {currentStep} of {totalSteps}</p>
          </div>

          {/* Step Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div>
                  <CardHeader className="px-0 pb-6">
                    <CardTitle className="flex items-center">
                      <User className="h-6 w-6 mr-2 text-amber-600" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Business Name</label>
                        <Input placeholder="Your business name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="photography">Photography</SelectItem>
                            <SelectItem value="decoration">Decoration</SelectItem>
                            <SelectItem value="catering">Catering</SelectItem>
                            <SelectItem value="dj">DJ & Music</SelectItem>
                            <SelectItem value="priest">Priest</SelectItem>
                            <SelectItem value="transport">Transport</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Description</label>
                      <Textarea placeholder="Tell us about your business..." rows={4} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <Input placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input type="email" placeholder="business@email.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Areas</label>
                      <Input placeholder="Mumbai, Pune, Nashik..." />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <CardHeader className="px-0 pb-6">
                    <CardTitle className="flex items-center">
                      <Camera className="h-6 w-6 mr-2 text-amber-600" />
                      Portfolio Upload
                    </CardTitle>
                  </CardHeader>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload Portfolio Images</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                        <Button variant="outline">Choose Files</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {/* Placeholder for uploaded images */}
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Image 1</span>
                      </div>
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Image 2</span>
                      </div>
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Image 3</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <CardHeader className="px-0 pb-6">
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-6 w-6 mr-2 text-amber-600" />
                      Pricing Setup
                    </CardTitle>
                  </CardHeader>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Packages</label>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Input placeholder="Package Name" className="mr-4" />
                            <Input placeholder="Price" className="w-32" />
                          </div>
                          <Textarea placeholder="Package description..." rows={2} />
                        </div>
                        <Button variant="outline" className="w-full">+ Add Another Package</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <CardHeader className="px-0 pb-6">
                    <CardTitle className="flex items-center">
                      <Share2 className="h-6 w-6 mr-2 text-amber-600" />
                      Social Media Links
                    </CardTitle>
                  </CardHeader>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Instagram</label>
                        <Input placeholder="https://instagram.com/yourbusiness" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Facebook</label>
                        <Input placeholder="https://facebook.com/yourbusiness" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Website</label>
                        <Input placeholder="https://yourbusiness.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">YouTube</label>
                        <Input placeholder="https://youtube.com/channel/..." />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <CardHeader className="px-0 pb-6">
                    <CardTitle className="flex items-center">
                      <FileCheck className="h-6 w-6 mr-2 text-amber-600" />
                      Final Review & Agreement
                    </CardTitle>
                  </CardHeader>
                  <div className="space-y-6">
                    <div className="bg-amber-50 p-6 rounded-lg">
                      <h3 className="font-semibold mb-4">Review Your Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Business:</strong> Royal Wedding Photographers</p>
                        <p><strong>Category:</strong> Photography</p>
                        <p><strong>Location:</strong> Mumbai, Pune, Nashik</p>
                        <p><strong>Portfolio:</strong> 8 images uploaded</p>
                        <p><strong>Packages:</strong> 3 packages configured</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox id="terms" />
                        <label htmlFor="terms" className="text-sm">
                          I agree to Aaroham's <a href="#" className="text-amber-600 hover:underline">Terms of Service</a> and <a href="#" className="text-amber-600 hover:underline">Vendor Agreement</a>
                        </label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox id="commission" />
                        <label htmlFor="commission" className="text-sm">
                          I understand that Aaroham charges a 5% commission on successful bookings
                        </label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox id="quality" />
                        <label htmlFor="quality" className="text-sm">
                          I commit to maintaining high service quality and professional standards
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button 
                onClick={nextStep}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                Submit Application
                <FileCheck className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>

          {currentStep === totalSteps && (
            <div className="mt-8 text-center">
              <Badge className="bg-amber-100 text-amber-700 px-4 py-2">
                Your application will be reviewed within 24-48 hours
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorOnboarding;
