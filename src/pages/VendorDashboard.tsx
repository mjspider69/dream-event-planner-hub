
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, MessageCircle, DollarSign, Star, Settings, Camera, TrendingUp } from "lucide-react";
import Header from "@/components/Header";

const VendorDashboard = () => {
  const vendorData = {
    name: "Royal Wedding Photographers",
    category: "Photography",
    rating: 4.8,
    totalBookings: 156,
    monthlyRevenue: 285000,
    activeChats: 8,
    upcomingEvents: 4
  };

  const recentBookings = [
    { id: 1, client: "Priya & Arjun", event: "Wedding", date: "Mar 15, 2024", amount: 45000, status: "Confirmed" },
    { id: 2, client: "Sharma Family", event: "Anniversary", date: "Mar 22, 2024", amount: 25000, status: "Pending" },
    { id: 3, client: "Corporate Event", event: "Product Launch", date: "Mar 28, 2024", amount: 35000, status: "Confirmed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xl">
                    RW
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">Welcome, {vendorData.name}!</h1>
                  <p className="text-gray-600">{vendorData.category} • ⭐ {vendorData.rating} rating</p>
                </div>
              </div>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{vendorData.upcomingEvents}</p>
                <p className="text-gray-600">Upcoming Events</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{vendorData.activeChats}</p>
                <p className="text-gray-600">Active Chats</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">₹{(vendorData.monthlyRevenue / 1000).toFixed(0)}K</p>
                <p className="text-gray-600">Monthly Revenue</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{vendorData.totalBookings}</p>
                <p className="text-gray-600">Total Bookings</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{booking.client}</h4>
                        <p className="text-sm text-gray-600">{booking.event} • {booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{booking.amount.toLocaleString()}</p>
                        <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex-col bg-gradient-to-r from-blue-500 to-purple-500">
                    <Calendar className="h-6 w-6 mb-2" />
                    Manage Calendar
                  </Button>
                  <Button className="h-20 flex-col bg-gradient-to-r from-green-500 to-blue-500">
                    <MessageCircle className="h-6 w-6 mb-2" />
                    View Messages
                  </Button>
                  <Button className="h-20 flex-col bg-gradient-to-r from-purple-500 to-pink-500">
                    <Camera className="h-6 w-6 mb-2" />
                    Update Portfolio
                  </Button>
                  <Button className="h-20 flex-col bg-gradient-to-r from-amber-500 to-orange-500">
                    <Star className="h-6 w-6 mb-2" />
                    View Reviews
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

export default VendorDashboard;
