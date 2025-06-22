
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Clock, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your AI event planner. I'm here to help you create the perfect celebration. What kind of event are you planning?",
      time: "2:00 PM"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [showLoginWall, setShowLoginWall] = useState(false);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: "That sounds wonderful! Let me help you with that. Based on your requirements, I can suggest some great vendors and packages. Would you like me to show you photographers, decorators, or caterers first?",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const quickSuggestions = [
    "Plan a wedding for 200 guests",
    "Corporate event in Mumbai",
    "Birthday party for kids",
    "Anniversary celebration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <Badge className="mb-4 bg-amber-100 text-amber-700">AI Assistant</Badge>
            <h1 className="text-3xl font-bold mb-2">Chat with AI Event Planner</h1>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Free trial: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} remaining</span>
            </div>
          </div>

          {/* Chat Interface */}
          <Card className="h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'ai' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gray-300'}`}>
                      {message.sender === 'ai' ? (
                        <Bot className="h-4 w-4 text-white" />
                      ) : (
                        <span className="text-gray-600 text-sm font-semibold">U</span>
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${message.sender === 'ai' ? 'bg-white shadow-sm' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'}`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'ai' ? 'text-gray-500' : 'text-amber-100'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div className="px-6 py-3 border-t">
              <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-6 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={showLoginWall}
                />
                <Button 
                  onClick={sendMessage}
                  disabled={showLoginWall}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Login Wall */}
          {showLoginWall && (
            <div className="mt-6">
              <Card className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
                <CardContent className="p-8 text-center">
                  <LogIn className="h-12 w-12 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Continue Planning Your Event</h2>
                  <p className="mb-6">Your free trial has ended. Login to continue chatting with our AI and plan your perfect event.</p>
                  <div className="space-x-4">
                    <Link to="/login">
                      <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
                        Login to Continue
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
