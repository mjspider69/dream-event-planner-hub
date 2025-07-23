
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Phone, Video, Calendar, Star, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";

const TalkToVendor = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'vendor',
      text: "Hello! Thank you for your interest in our photography services. I'd be happy to discuss your wedding photography needs.",
      time: "2:30 PM",
      read: true
    },
    {
      id: 2,
      sender: 'customer',
      text: "Hi! We're planning a traditional Indian wedding for March 15th. Can you share your packages?",
      time: "2:32 PM",
      read: true
    },
    {
      id: 3,
      sender: 'vendor',
      text: "Congratulations on your upcoming wedding! I have several packages tailored for traditional Indian weddings. Would you prefer a call to discuss details, or shall I send you our brochure?",
      time: "2:35 PM",
      read: true
    }
  ]);

  const vendor = {
    name: "Royal Wedding Photographers",
    category: "Photography",
    rating: 4.8,
    responseTime: "Usually responds within 30 minutes",
    verified: true,
    online: true
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'customer',
      text: message,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Vendor Info Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xl">
                      RW
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h2 className="text-xl font-bold">{vendor.name}</h2>
                      {vendor.verified && (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {vendor.online && (
                        <Badge className="bg-green-100 text-green-700">Online</Badge>
                      )}
                    </div>
                    <p className="text-gray-600">{vendor.category}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{vendor.rating} rating</span>
                      </div>
                      <span>{vendor.responseTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Chat with {vendor.name}</CardTitle>
            </CardHeader>
            
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${msg.sender === 'customer' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={`${msg.sender === 'vendor' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : 'bg-gray-300'}`}>
                        {msg.sender === 'vendor' ? 'V' : 'You'}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg p-3 ${msg.sender === 'vendor' ? 'bg-white shadow-sm border' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'}`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'vendor' ? 'text-gray-500' : 'text-amber-100'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-3 border-t border-b bg-gray-50">
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => setMessage("Can you share your portfolio?")}>
                  Share Portfolio
                </Button>
                <Button size="sm" variant="outline" onClick={() => setMessage("What are your packages?")}>
                  View Packages
                </Button>
                <Button size="sm" variant="outline" onClick={() => setMessage("Are you available on March 15th?")}>
                  Check Availability
                </Button>
                <Button size="sm" variant="outline" onClick={() => setMessage("Can we schedule a call?")}>
                  Schedule Call
                </Button>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-6">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button 
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="mt-6 text-center">
            <Card className="bg-gradient-to-r from-amber-100 to-orange-100">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Ready to book?</h3>
                <p className="text-gray-600 mb-4">
                  Once you're satisfied with the discussion, you can add this vendor to your event or request a formal quote.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Add to Event
                  </Button>
                  <Button variant="outline">
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkToVendor;
