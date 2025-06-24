
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubscriptionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('aaroham-subscription-popup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const plans = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "₹999",
      duration: "/month",
      features: ["5 AI Chat Sessions", "Basic Vendor Matching", "Email Support"],
      popular: false
    },
    {
      id: "premium",
      name: "Premium Plan", 
      price: "₹2,499",
      duration: "/month",
      features: ["Unlimited AI Chat", "Premium Vendor Matching", "Voice Bot Access", "Priority Support", "Custom Packages"],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: "₹4,999", 
      duration: "/month",
      features: ["Everything in Premium", "Dedicated Account Manager", "Custom Integrations", "Advanced Analytics"],
      popular: false
    }
  ];

  const handleSubscribe = () => {
    if (email) {
      localStorage.setItem('aaroham-subscription-popup', 'seen');
      localStorage.setItem('aaroham-user-email', email);
      localStorage.setItem('aaroham-subscription-plan', selectedPlan);
      setIsOpen(false);
      navigate('/ai-chatbot');
    }
  };

  const handleClose = () => {
    localStorage.setItem('aaroham-subscription-popup', 'seen');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl p-0 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 z-10"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <DialogHeader className="p-8 pb-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
                <Crown className="h-8 w-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Welcome to Aaroham Premium
            </DialogTitle>
            <p className="text-lg text-gray-600 mt-2">
              Unlock the full power of AI-driven event planning
            </p>
          </DialogHeader>

          <div className="px-8 pb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-amber-400 shadow-xl scale-105' 
                      : 'hover:shadow-lg'
                  } ${plan.popular ? 'border-amber-400' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-1">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-amber-600">{plan.price}</span>
                      <span className="text-gray-500">{plan.duration}</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center justify-center">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 h-12 text-center border-2 border-amber-200 focus:border-amber-400"
              />
              
              <Button
                onClick={handleSubscribe}
                disabled={!email}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white font-semibold text-lg"
              >
                Start Your AI Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionPopup;
