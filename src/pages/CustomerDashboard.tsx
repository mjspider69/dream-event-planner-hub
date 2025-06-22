
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, MessageCircle, Heart, FileText, Calendar, LogOut, Settings, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const CustomerDashboard = () => {
  const bookings = [
    { id: 1, event: "Wedding Ceremony", date: "2024-03-15", status: "Confirmed", vendors: 5 },
    { id: 2, event: "Birthday Party", date: "2024-02-28", status: "In Progress", vendors: 3 },
  ];

  const savedVendors = [
    { id: 1, name: "Royal Photographers", category: "Photography", rating: 4.8, saved: true },
    { id: 2, name: "Elegant Decorators", category: "Decoration", rating: 4.6, saved: true },
    { id: 3, name: "Spice Caterers", category: "Catering", rating: 4.9, saved: true },
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
                    PS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">Welcome back, Priya!</h1>
                  <p className="text-gray-600">Let's make your events extraordinary</p>
                </div>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <h3 className="font-semibold">Profile</h3>
                <p className="text-sm text-gray-600">Manage your account</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">My Bookings</h3>
                <p className="text-sm text-gray-600">Track your events</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Chat</h3>
                <p className="text-sm text-gray-600">Talk to vendors</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                <h3 className="font-semibold">Saved</h3>
                <p className="text-sm text-gray-600">Your favorite vendors</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Bookings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Bookings</CardTitle>
                <Link to="/booking">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{booking.event}</h4>
                        <p className="text-sm text-gray-600">{booking.date}</p>
                        <p className="text-sm text-gray-500">{booking.vendors} vendors booked</p>
                      </div>
                      <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Saved Vendors */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saved Vendors</CardTitle>
                <Link to="/vendors">
                  <Button variant="outline" size="sm">Browse More</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedVendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{vendor.name}</h4>
                        <p className="text-sm text-gray-600">{vendor.category}</p>
                        <p className="text-sm text-amber-600">★ {vendor.rating}</p>
                      </div>
                      <div className="space-x-2">
                        <Link to={`/talk-to-vendor/${vendor.id}`}>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Link to="/plan-event">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                      Plan New Event
                    </Button>
                  </Link>
                  <Link to="/quotation">
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      View Quotes
                    </Button>
                  </Link>
                  <Link to="/customer-care">
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Support
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
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

export default CustomerDashboard;
