
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Clock, LogIn, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your AI event planning assistant. I can help you plan weddings, corporate events, birthday parties, and more. What kind of celebration are you planning?",
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showLoginWall, setShowLoginWall] = useState(false);
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
  const [voiceTimeLeft, setVoiceTimeLeft] = useState(120); // 2 minutes for voice
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !showLoginWall) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowLoginWall(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, showLoginWall]);

  useEffect(() => {
    let voiceTimer: NodeJS.Timeout;
    if (isVoiceChatActive && voiceTimeLeft > 0) {
      voiceTimer = setTimeout(() => {
        setVoiceTimeLeft(voiceTimeLeft - 1);
      }, 1000);
    } else if (voiceTimeLeft === 0 && isVoiceChatActive) {
      setIsVoiceChatActive(false);
      setIsListening(false);
    }
    return () => clearTimeout(voiceTimer);
  }, [isVoiceChatActive, voiceTimeLeft]);

  const sendMessage = () => {
    if (!inputMessage.trim() || showLoginWall) return;
    
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
      const responses = [
        "That sounds wonderful! Based on your requirements, I can suggest some excellent vendors. What's your budget range?",
        "Great choice! I can help you find the perfect vendors for that. Which city are you planning this event in?",
        "Perfect! Let me connect you with our top-rated vendors for your event. Would you like to see photography options first?",
        "Excellent! I have some amazing package recommendations for you. When is your event date?",
        "That's exciting! I can help you plan every detail. What's the expected number of guests?"
      ];
      
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleVoiceChat = () => {
    if (!isVoiceChatActive) {
      setIsVoiceChatActive(true);
      setVoiceTimeLeft(120);
    } else {
      setIsVoiceChatActive(false);
      setIsListening(false);
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (!isVoiceChatActive) return;
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        setIsListening(false);
        setIsSpeaking(true);
        
        // Add user voice message
        const voiceMessage = {
          id: messages.length + 1,
          sender: 'user',
          text: "I'm planning a wedding for 200 guests in Mumbai",
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          isVoice: true
        };
        setMessages(prev => [...prev, voiceMessage]);
        
        // Simulate AI voice response
        setTimeout(() => {
          const aiVoiceResponse = {
            id: messages.length + 2,
            sender: 'ai',
            text: "Wonderful! Mumbai has excellent wedding venues. I can suggest photographers, decorators, and caterers. What's your budget range?",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            isVoice: true
          };
          setMessages(prev => [...prev, aiVoiceResponse]);
          setIsSpeaking(false);
        }, 2000);
      }, 3000);
    }
  };

  const quickSuggestions = [
    "Plan a wedding for 200 guests",
    "Corporate event in Mumbai", 
    "Birthday party for kids",
    "Anniversary celebration",
    "Baby shower planning",
    "Engagement ceremony"
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-amber-100 text-blue-800 px-6 py-2 rounded-full">
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Badge>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Chat with AI Event Planner
            </h1>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-4 w-4" />
                <span>Text Chat: {formatTime(timeLeft)} remaining</span>
              </div>
              {isVoiceChatActive && (
                <div className="flex items-center space-x-2 text-amber-600">
                  <Mic className="h-4 w-4" />
                  <span>Voice Chat: {formatTime(voiceTimeLeft)} remaining</span>
                </div>
              )}
            </div>
          </div>

          {/* Voice Chat Controls */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleVoiceChat}
                className={`${isVoiceChatActive 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600' 
                  : 'bg-gradient-to-r from-blue-600 to-amber-500'
                } text-white`}
              >
                {isVoiceChatActive ? (
                  <>
                    <VolumeX className="h-4 w-4 mr-2" />
                    End Voice Chat
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Start Voice Chat (2 min free)
                  </>
                )}
              </Button>
              
              {isVoiceChatActive && (
                <Button
                  onClick={toggleListening}
                  variant="outline"
                  className={`border-2 ${isListening 
                    ? 'border-red-500 bg-red-50 text-red-600' 
                    : 'border-blue-500 text-blue-600'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Start Speaking
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Voice Chat Visualization */}
          {isVoiceChatActive && (
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-amber-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isSpeaking ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 
                    isListening ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 
                    'bg-gray-200'
                  }`}>
                    <Bot className={`h-8 w-8 ${isSpeaking || isListening ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  
                  {/* Dynamic Visual Elements */}
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-2 rounded-full transition-all duration-300 ${
                          isSpeaking 
                            ? `h-${Math.floor(Math.random() * 8) + 4} bg-amber-400` 
                            : isListening 
                            ? `h-${Math.floor(Math.random() * 6) + 2} bg-blue-400`
                            : 'h-2 bg-gray-300'
                        }`}
                        style={{
                          animation: (isSpeaking || isListening) ? `pulse 0.${i}s infinite alternate` : 'none'
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="text-sm">
                    {isSpeaking ? (
                      <span className="text-amber-600 font-medium">AI is speaking...</span>
                    ) : isListening ? (
                      <span className="text-blue-600 font-medium">Listening...</span>
                    ) : (
                      <span className="text-gray-500">Voice chat ready</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat Interface */}
          <Card className="h-[500px] flex flex-col shadow-xl border-0">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-white to-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'ai' 
                        ? 'bg-gradient-to-r from-blue-600 to-amber-500' 
                        : 'bg-gradient-to-r from-gray-400 to-gray-600'
                    }`}>
                      {message.sender === 'ai' ? (
                        <Bot className="h-4 w-4 text-white" />
                      ) : (
                        <span className="text-white text-sm font-semibold">U</span>
                      )}
                    </div>
                    <div className={`rounded-2xl p-4 ${
                      message.sender === 'ai' 
                        ? 'bg-white shadow-md border border-gray-100' 
                        : 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className={`text-xs ${
                          message.sender === 'ai' ? 'text-gray-500' : 'text-white/80'
                        }`}>
                          {message.time}
                        </p>
                        {message.isVoice && (
                          <Volume2 className={`h-3 w-3 ${
                            message.sender === 'ai' ? 'text-blue-500' : 'text-white/80'
                          }`} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-6 py-3 border-t bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(suggestion)}
                    className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                    disabled={showLoginWall}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-6 border-t bg-white">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={showLoginWall ? "Login to continue chatting..." : "Type your message..."}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={showLoginWall}
                  className="border-gray-200 focus:border-blue-500"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={showLoginWall || !inputMessage.trim()}
                  className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Login Wall */}
          {showLoginWall && (
            <div className="mt-6">
              <Card className="bg-gradient-to-r from-blue-600 to-amber-500 text-white border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <LogIn className="h-12 w-12 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Continue Planning Your Event</h2>
                  <p className="mb-6 opacity-90">
                    Your free trial has ended. Login to continue chatting with our AI and unlock unlimited planning features.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/login">
                      <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
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
