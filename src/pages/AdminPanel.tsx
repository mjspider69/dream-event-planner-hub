
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Users, UserCheck, Calendar, DollarSign, Settings, Search, Eye, CheckCircle, XCircle } from "lucide-react";
import Header from "@/components/Header";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = {
    totalUsers: 2543,
    totalVendors: 456,
    totalBookings: 1289,
    monthlyRevenue: 2850000
  };

  const pendingVendors = [
    { id: 1, name: "Royal Wedding Photographers", category: "Photography", location: "Mumbai", appliedDate: "2024-02-10" },
    { id: 2, name: "Elegant Decorators", category: "Decoration", location: "Delhi", appliedDate: "2024-02-11" },
    { id: 3, name: "Spice Caterers", category: "Catering", location: "Bangalore", appliedDate: "2024-02-12" }
  ];

  const recentBookings = [
    { id: 1, customer: "Priya Sharma", vendor: "Royal Photographers", event: "Wedding", amount: 45000, date: "2024-03-15", status: "Confirmed" },
    { id: 2, customer: "Rajesh Kumar", vendor: "Elite Caterers", event: "Corporate", amount: 85000, date: "2024-03-20", status: "Pending" },
    { id: 3, customer: "Anita Gupta", vendor: "Party Planners", event: "Birthday", amount: 25000, date: "2024-03-25", status: "Confirmed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your Aaroham platform</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-gray-600">Total Users</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{stats.totalVendors}</p>
                <p className="text-gray-600">Active Vendors</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{stats.totalBookings.toLocaleString()}</p>
                <p className="text-gray-600">Total Bookings</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">₹{(stats.monthlyRevenue / 100000).toFixed(1)}L</p>
                <p className="text-gray-600">Monthly Revenue</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="vendors" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="vendors">Vendor Approvals</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vendors" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Vendor Approvals</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 max-w-sm"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingVendors.map((vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{vendor.name}</h4>
                          <p className="text-sm text-gray-600">{vendor.category} • {vendor.location}</p>
                          <p className="text-sm text-gray-500">Applied: {vendor.appliedDate}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">User management features coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{booking.customer}</h4>
                          <p className="text-sm text-gray-600">{booking.vendor} • {booking.event}</p>
                          <p className="text-sm text-gray-500">{booking.date}</p>
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
            </TabsContent>
            
            <TabsContent value="content" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Homepage Content</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Hero Section
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Manage Testimonials
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Update Packages
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Site Settings</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          SEO Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Contact Information
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Social Media Links
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
