import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Clock, LogIn, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: number;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  isVoice?: boolean;
}

const AIChatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm Aarohi, your AI event planning assistant. I can help you with weddings, corporate events, birthday parties, anniversaries, festivals, and any celebration you have in mind. I can also assist with vendor recommendations, budget planning, venue selection, catering options, decoration ideas, and much more. What would you like to know about?",
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(user ? 1800 : 60); // 30 min for logged in, 1 min for guests
  const [showLoginWall, setShowLoginWall] = useState(false);
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
  const [voiceTimeLeft, setVoiceTimeLeft] = useState(user ? 600 : 30); // 10 min for logged in, 30 sec for guests
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
    } else if (timeLeft === 0 && !user) {
      setShowLoginWall(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, showLoginWall, user]);

  useEffect(() => {
    let voiceTimer: NodeJS.Timeout;
    if (isVoiceChatActive && voiceTimeLeft > 0) {
      voiceTimer = setTimeout(() => {
        setVoiceTimeLeft(voiceTimeLeft - 1);
      }, 1000);
    } else if (voiceTimeLeft === 0 && isVoiceChatActive) {
      setIsVoiceChatActive(false);
      setIsListening(false);
      if (!user) {
        setShowLoginWall(true);
      }
    }
    return () => clearTimeout(voiceTimer);
  }, [isVoiceChatActive, voiceTimeLeft, user]);

  const sendMessage = () => {
    if (!inputMessage.trim() || (showLoginWall && !user)) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage("");
    
    // Enhanced AI responses for comprehensive query handling
    setTimeout(() => {
      const getAIResponse = (userMessage: string) => {
        const message = userMessage.toLowerCase();
        
        // Wedding related queries
        if (message.includes('wedding') || message.includes('marriage') || message.includes('shaadi')) {
          return "For weddings, I can help you with everything! Here's what I recommend: 1) Photography & Videography - Budget ₹50,000-2,00,000 depending on coverage. 2) Venue - Consider banquet halls, farmhouses, or destination weddings. 3) Catering - Plan ₹800-2000 per person. 4) Decoration - Floral, lighting, and theme-based setups. 5) Music & Entertainment - DJ, live bands, or traditional musicians. Would you like detailed recommendations for any specific aspect?";
        }
        
        // Budget related queries
        if (message.includes('budget') || message.includes('cost') || message.includes('price')) {
          return "I can help you plan within any budget! Here are typical ranges: Small gatherings (50 people): ₹1-3 lakhs, Medium events (100-200 people): ₹3-8 lakhs, Large celebrations (300+ people): ₹8-20 lakhs+. This includes venue, catering, decoration, and entertainment. What's your approximate budget range?";
        }
        
        // Venue related queries
        if (message.includes('venue') || message.includes('location') || message.includes('place')) {
          return "Great! For venues, I can suggest: 1) Banquet Halls - Traditional, AC, good for 100-500 guests. 2) Farmhouses - Outdoor feel, customizable, great for themed events. 3) Hotels - Premium service, multiple options. 4) Destination venues - Goa, Udaipur, Jim Corbett for special occasions. 5) Community centers - Budget-friendly options. Which type interests you most?";
        }
        
        // Catering queries
        if (message.includes('food') || message.includes('catering') || message.includes('menu')) {
          return "Food is crucial for any event! I can suggest: 1) North Indian cuisine - Roti, dal, paneer dishes, biryani. 2) South Indian - Dosa, idli, sambar, coconut-based curries. 3) Chinese & Continental - Popular for corporate events. 4) Street food counters - Chaat, pani puri, live cooking. 5) Traditional sweets - Gulab jamun, rasmalai, jalebi. Budget: ₹400-1500 per person. What cuisine do you prefer?";
        }
        
        // Decoration queries
        if (message.includes('decoration') || message.includes('theme') || message.includes('flowers')) {
          return "Decorations set the mood! Popular options: 1) Floral arrangements - Roses, marigolds, jasmine for traditional events. 2) Lighting - Fairy lights, spotlights, LED setups. 3) Theme-based - Bollywood, vintage, modern, royal themes. 4) Backdrop & stage - Photo opportunities, main event area. 5) Table settings - Centerpieces, linens, place settings. Budget: ₹20,000-2,00,000. What theme do you have in mind?";
        }
        
        // Entertainment queries
        if (message.includes('music') || message.includes('dj') || message.includes('entertainment') || message.includes('dance')) {
          return "Entertainment makes events memorable! Options include: 1) DJ services - Latest Bollywood, regional, international music. 2) Live bands - Classical, folk, fusion, rock bands. 3) Traditional artists - Dhol players, folk dancers, classical musicians. 4) Modern entertainment - LED walls, photo booths, games. 5) Cultural programs - Dance performances, singing competitions. What type of entertainment do you prefer?";
        }
        
        // Photography queries
        if (message.includes('photo') || message.includes('video') || message.includes('camera')) {
          return "Capture your precious moments! Photography packages: 1) Basic - 1 photographer, 300-500 edited photos, ₹25,000-50,000. 2) Standard - 2 photographers, videography, 500-800 photos, ₹50,000-1,00,000. 3) Premium - Team of 3-4, drone shots, same-day editing, albums, ₹1,00,000-2,50,000. 4) Cinematic videos - Story-based editing, multiple camera angles. Which package interests you?";
        }
        
        // Corporate event queries
        if (message.includes('corporate') || message.includes('office') || message.includes('business') || message.includes('company')) {
          return "Corporate events need professional planning! I can help with: 1) Conference & seminars - AV equipment, seating, refreshments. 2) Team building - Outdoor activities, workshops, games. 3) Product launches - Stage setup, media coverage, networking. 4) Annual parties - Entertainment, awards, dinner. 5) Client meetings - Venue booking, catering, presentations. What type of corporate event are you planning?";
        }
        
        // Birthday party queries
        if (message.includes('birthday') || message.includes('party') || message.includes('celebration')) {
          return "Birthday celebrations are special! Ideas for you: 1) Theme parties - Superhero, princess, cartoon characters for kids. 2) Adult parties - Cocktail, dinner, dance parties. 3) Surprise parties - Coordination with friends/family. 4) Venue options - Home, restaurants, party halls, outdoor spaces. 5) Entertainment - Games, music, photo booth, cake cutting ceremony. What age group and what kind of vibe are you looking for?";
        }
        
        // Default comprehensive response
        return "I'm here to help with all your event planning needs! I can assist with: ✨ Weddings & Engagements ✨ Corporate Events ✨ Birthday Parties ✨ Anniversaries ✨ Festivals & Religious Ceremonies ✨ Baby Showers ✨ Housewarming ✨ Retirement Parties. I can help you find vendors, plan budgets, suggest venues, arrange catering, plan decorations, book entertainment, and coordinate everything. What specific event are you planning? Just tell me more details and I'll provide personalized recommendations!";
      };
      
      const aiResponse: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: getAIResponse(inputMessage),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleVoiceChat = () => {
    if (!isVoiceChatActive) {
      setIsVoiceChatActive(true);
      setVoiceTimeLeft(user ? 600 : 30);
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
        const voiceMessage: Message = {
          id: messages.length + 1,
          sender: 'user',
          text: "I need help planning a wedding reception for 300 guests in Delhi",
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          isVoice: true
        };
        setMessages(prev => [...prev, voiceMessage]);
        
        // Simulate AI voice response
        setTimeout(() => {
          const aiVoiceResponse: Message = {
            id: messages.length + 2,
            sender: 'ai',
            text: "Perfect! For a 300-guest wedding reception in Delhi, I recommend banquet halls like The Grand, Shangri-La, or farmhouses in Chattarpur. Budget around ₹8-15 lakhs total. For catering, consider ₹1200-2000 per person for a good spread. I can connect you with our verified vendors for photography, decoration, and entertainment. Would you like me to show you specific venue options first?",
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            isVoice: true
          };
          setMessages(prev => [...prev, aiVoiceResponse]);
          setIsSpeaking(false);
        }, 3000);
      }, 4000);
    }
  };

  const quickSuggestions = [
    "Plan a wedding for 200 guests",
    "Corporate event in Mumbai", 
    "Birthday party for kids",
    "Anniversary celebration",
    "Baby shower planning",
    "Engagement ceremony",
    "Festival celebration",
    "Budget-friendly wedding",
    "Destination wedding",
    "Photography recommendations"
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-yellow-100 text-blue-800 px-6 py-2 rounded-full">
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </Badge>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              Chat with Aarohi - Your AI Event Planner
            </h1>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="h-4 w-4" />
                <span>Chat Time: {formatTime(timeLeft)} remaining</span>
              </div>
              {isVoiceChatActive && (
                <div className="flex items-center space-x-2 text-yellow-600">
                  <Mic className="h-4 w-4" />
                  <span>Voice Chat: {formatTime(voiceTimeLeft)} remaining</span>
                </div>
              )}
              {!user && (
                <Badge className="bg-red-100 text-red-800">
                  Guest Mode - Limited Time
                </Badge>
              )}
            </div>
          </div>

          {/* Voice Chat Controls */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleVoiceChat}
                className={`${isVoiceChatActive 
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' 
                  : 'bg-gradient-to-r from-blue-600 to-yellow-500'
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
                    Start Voice Chat ({user ? '10 min' : '30 sec'})
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
              <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-yellow-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isSpeaking ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 voice-bot-active' : 
                    isListening ? 'bg-gradient-to-r from-blue-400 to-blue-600 voice-bot-active' : 
                    'bg-gray-200'
                  }`}>
                    <Bot className={`h-8 w-8 ${isSpeaking || isListening ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  
                  {/* Enhanced Visual Elements */}
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-2 rounded-full transition-all duration-300 ${
                          isSpeaking 
                            ? `voice-wave bg-yellow-400` 
                            : isListening 
                            ? `voice-wave bg-blue-400`
                            : 'h-2 bg-gray-300'
                        }`}
                        style={{
                          height: (isSpeaking || isListening) ? `${Math.floor(Math.random() * 20) + 8}px` : '8px',
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="text-sm">
                    {isSpeaking ? (
                      <span className="text-yellow-600 font-medium">Aarohi is speaking...</span>
                    ) : isListening ? (
                      <span className="text-blue-600 font-medium">Listening to you...</span>
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
                        ? 'bg-gradient-to-r from-blue-600 to-yellow-500' 
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
                        : 'bg-gradient-to-r from-blue-600 to-yellow-500 text-white shadow-lg'
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
                    disabled={showLoginWall && !user}
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
                  placeholder={showLoginWall && !user ? "Session expired. Please login to continue..." : "Ask me anything about event planning..."}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  disabled={showLoginWall && !user}
                  className="border-gray-200 focus:border-blue-500"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={(showLoginWall && !user) || !inputMessage.trim()}
                  className="bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Login Wall */}
          {showLoginWall && !user && (
            <div className="mt-6">
              <Card className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <LogIn className="h-12 w-12 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Your Free Session Has Ended</h2>
                  <p className="mb-6 opacity-90">
                    Please login to continue chatting with Aarohi AI and unlock unlimited access to our platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/auth">
                      <Button 
                        size="lg" 
                        className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                      >
                        Login / Sign Up
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => window.location.reload()}
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white/10"
                    >
                      Start New Session
                    </Button>
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