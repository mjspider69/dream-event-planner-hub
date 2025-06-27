
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, X, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ChatbotIntroPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds if user hasn't seen it before
    const hasSeenPopup = localStorage.getItem('aaroham-chatbot-intro-seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('aaroham-chatbot-intro-seen', 'true');
  };

  const handleTryNow = () => {
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white shadow-2xl border-0 animate-in zoom-in-95 duration-300">
        <CardHeader className="text-center bg-gradient-to-r from-amber-50 to-orange-50 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
          
          <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="h-8 w-8 text-white" />
          </div>
          
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            Meet Your AI Event Planner
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 text-center">
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3 text-left">
              <Sparkles className="h-5 w-5 text-amber-500 flex-shrink-0" />
              <span className="text-gray-700">Get instant event recommendations</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <MessageCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
              <span className="text-gray-700">Chat naturally about your event needs</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <Bot className="h-5 w-5 text-amber-500 flex-shrink-0" />
              <span className="text-gray-700">Find perfect vendors in seconds</span>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-amber-800">
              <strong>Try it free!</strong> Chat for 2 minutes without signing up. 
              Login for unlimited access and personalized recommendations.
            </p>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link to="/ai-chatbot" onClick={handleTryNow}>
              <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white">
                <Bot className="mr-2 h-4 w-4" />
                Try AI Assistant Now
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Maybe Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotIntroPopup;
