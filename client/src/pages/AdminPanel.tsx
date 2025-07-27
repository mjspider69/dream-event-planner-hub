
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, UserCheck, Calendar, DollarSign, Settings, Search, Eye, 
  CheckCircle, XCircle, Crown, LogOut, Edit, Trash2, Plus, 
  TrendingUp, Activity, Bell, Database, Globe, Image,
  BarChart3, PieChart, LineChart, MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const email = localStorage.getItem("adminEmail");
    if (email) setAdminEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminEmail");
    toast({
      title: "Logged Out",
      description: "Successfully logged out from admin panel",
    });
    navigate("/admin/login");
  };

  const stats = {
    totalUsers: 2543,
    totalVendors: 456,
    totalBookings: 1289,
    monthlyRevenue: 2850000,
    pendingApprovals: 12,
    activeChats: 34,
    todaySignups: 23,
    conversionRate: 15.8
  };

  const pendingVendors = [
    { id: 1, name: "Royal Wedding Photographers", category: "Photography", location: "Mumbai", appliedDate: "2024-02-10", rating: 4.8, phone: "+91 98765 43210" },
    { id: 2, name: "Elegant Decorators", category: "Decoration", location: "Delhi", appliedDate: "2024-02-11", rating: 4.6, phone: "+91 98765 43211" },
    { id: 3, name: "Spice Caterers", category: "Catering", location: "Bangalore", appliedDate: "2024-02-12", rating: 4.9, phone: "+91 98765 43212" }
  ];

  const recentBookings = [
    { id: 1, customer: "Priya Sharma", vendor: "Royal Photographers", event: "Wedding", amount: 45000, date: "2024-03-15", status: "Confirmed", phone: "+91 98765 11111" },
    { id: 2, customer: "Rajesh Kumar", vendor: "Elite Caterers", event: "Corporate", amount: 85000, date: "2024-03-20", status: "Pending", phone: "+91 98765 22222" },
    { id: 3, customer: "Anita Gupta", vendor: "Party Planners", event: "Birthday", amount: 25000, date: "2024-03-25", status: "Confirmed", phone: "+91 98765 33333" }
  ];

  const recentUsers = [
    { id: 1, name: "Rahul Verma", email: "rahul@email.com", joinDate: "2024-02-20", location: "Mumbai", bookings: 3 },
    { id: 2, name: "Sneha Patel", email: "sneha@email.com", joinDate: "2024-02-21", location: "Ahmedabad", bookings: 1 },
    { id: 3, name: "Vikram Singh", email: "vikram@email.com", joinDate: "2024-02-22", location: "Jaipur", bookings: 2 }
  ];

  const websiteContent = [
    { section: "Hero Section", lastUpdated: "2024-02-15", status: "Active" },
    { section: "Testimonials", lastUpdated: "2024-02-10", status: "Active" },
    { section: "Packages", lastUpdated: "2024-02-12", status: "Active" },
    { section: "Footer", lastUpdated: "2024-02-08", status: "Active" }
  ];

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen royal-section-pastel">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b-2 border-pastel-gold">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 pastel-gradient rounded-full flex items-center justify-center shadow-xl">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-majestic text-gradient-royal">AAROHAM</h1>
                  <p className="text-sm font-elegant text-soft-burgundy">Admin Dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-royal text-soft-burgundy">Welcome Admin</p>
                  <p className="text-xs text-royal-purple">{adminEmail}</p>
                </div>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="border-soft-burgundy text-soft-burgundy hover:bg-soft-burgundy hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Stats Overview */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
              <Card className="royal-card-pastel">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-soft-burgundy font-majestic">{stats.totalUsers.toLocaleString()}</p>
                      <p className="text-royal-purple font-elegant">Total Users</p>
                      <p className="text-xs text-pastel-gold mt-1">+{stats.todaySignups} today</p>
                    </div>
                    <Users className="h-8 w-8 text-pastel-rose" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="royal-card-pastel">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-soft-burgundy font-majestic">{stats.totalVendors}</p>
                      <p className="text-royal-purple font-elegant">Active Vendors</p>
                      <p className="text-xs text-pastel-gold mt-1">{stats.pendingApprovals} pending</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-pastel-mint" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="royal-card-pastel">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-soft-burgundy font-majestic">{stats.totalBookings.toLocaleString()}</p>
                      <p className="text-royal-purple font-elegant">Total Bookings</p>
                      <p className="text-xs text-pastel-gold mt-1">{stats.conversionRate}% conversion</p>
                    </div>
                    <Calendar className="h-8 w-8 text-pastel-lavender" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="royal-card-pastel">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-soft-burgundy font-majestic">₹{(stats.monthlyRevenue / 100000).toFixed(1)}L</p>
                      <p className="text-royal-purple font-elegant">Monthly Revenue</p>
                      <p className="text-xs text-pastel-gold mt-1">+12% from last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-pastel-peach" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-8 bg-cream-white border-2 border-pastel-gold">
                <TabsTrigger value="dashboard" className="font-royal">Dashboard</TabsTrigger>
                <TabsTrigger value="vendors" className="font-royal">Vendors</TabsTrigger>
                <TabsTrigger value="users" className="font-royal">Users</TabsTrigger>
                <TabsTrigger value="bookings" className="font-royal">Bookings</TabsTrigger>
                <TabsTrigger value="content" className="font-royal">Website</TabsTrigger>
                <TabsTrigger value="analytics" className="font-royal">Analytics</TabsTrigger>
                <TabsTrigger value="settings" className="font-royal">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="royal-card-pastel">
                    <CardHeader>
                      <CardTitle className="flex items-center font-majestic text-soft-burgundy">
                        <TrendingUp className="w-6 h-6 mr-3 text-pastel-gold" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center p-3 bg-pastel-gold/10 rounded-lg">
                          <Activity className="w-5 h-5 text-pastel-gold mr-3" />
                          <div>
                            <p className="font-elegant text-soft-burgundy">New vendor registration</p>
                            <p className="text-xs text-royal-purple">Royal Photographers - 2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-pastel-mint/10 rounded-lg">
                          <Bell className="w-5 h-5 text-pastel-mint mr-3" />
                          <div>
                            <p className="font-elegant text-soft-burgundy">Booking completed</p>
                            <p className="text-xs text-royal-purple">Wedding event ₹45,000 - 4 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-pastel-rose/10 rounded-lg">
                          <MessageSquare className="w-5 h-5 text-pastel-rose mr-3" />
                          <div>
                            <p className="font-elegant text-soft-burgundy">Customer support ticket</p>
                            <p className="text-xs text-royal-purple">Payment query resolved - 6 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="royal-card-pastel">
                    <CardHeader>
                      <CardTitle className="flex items-center font-majestic text-soft-burgundy">
                        <BarChart3 className="w-6 h-6 mr-3 text-pastel-gold" />
                        Quick Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pastel-gold/10 to-pastel-peach/10 rounded-lg">
                          <span className="font-elegant text-soft-burgundy">Active Chats</span>
                          <Badge className="bg-pastel-gold text-soft-burgundy">{stats.activeChats}</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pastel-mint/10 to-sage-green/10 rounded-lg">
                          <span className="font-elegant text-soft-burgundy">Pending Reviews</span>
                          <Badge className="bg-pastel-mint text-soft-burgundy">8</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pastel-rose/10 to-pastel-lavender/10 rounded-lg">
                          <span className="font-elegant text-soft-burgundy">Support Tickets</span>
                          <Badge className="bg-pastel-rose text-white">3</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="vendors" className="mt-6">
                <Card className="royal-card-pastel">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="font-majestic text-soft-burgundy">Vendor Management</CardTitle>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-royal-purple" />
                        <Input
                          placeholder="Search vendors..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 max-w-sm border-pastel-gold focus:border-royal-purple"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingVendors.map((vendor) => (
                        <div key={vendor.id} className="flex items-center justify-between p-6 border-2 border-pastel-gold/30 rounded-lg bg-gradient-to-r from-cream-white to-pastel-gold/5 hover:shadow-lg transition-all duration-300">
                          <div className="flex-1">
                            <h4 className="font-majestic text-lg text-soft-burgundy">{vendor.name}</h4>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge className="bg-pastel-lavender text-soft-burgundy">{vendor.category}</Badge>
                              <span className="text-royal-purple font-elegant">{vendor.location}</span>
                              <span className="text-pastel-gold font-elegant">★ {vendor.rating}</span>
                            </div>
                            <p className="text-sm text-royal-purple mt-1">Applied: {vendor.appliedDate} • {vendor.phone}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-pastel-gold text-pastel-gold hover:bg-pastel-gold hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="bg-pastel-mint text-soft-burgundy hover:bg-sage-green">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="bg-pastel-rose text-white hover:bg-soft-burgundy">
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
                <Card className="royal-card-pastel">
                  <CardHeader>
                    <CardTitle className="font-majestic text-soft-burgundy">User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-6 border-2 border-pastel-gold/30 rounded-lg bg-gradient-to-r from-cream-white to-pastel-mint/5 hover:shadow-lg transition-all duration-300">
                          <div className="flex-1">
                            <h4 className="font-majestic text-lg text-soft-burgundy">{user.name}</h4>
                            <p className="text-royal-purple font-elegant">{user.email}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-pastel-gold">Joined: {user.joinDate}</span>
                              <Badge className="bg-pastel-peach text-soft-burgundy">{user.location}</Badge>
                              <span className="text-sm text-royal-purple">{user.bookings} bookings</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-pastel-gold text-pastel-gold hover:bg-pastel-gold hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="bookings" className="mt-6">
                <Card className="royal-card-pastel">
                  <CardHeader>
                    <CardTitle className="font-majestic text-soft-burgundy">Booking Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-6 border-2 border-pastel-gold/30 rounded-lg bg-gradient-to-r from-cream-white to-pastel-rose/5 hover:shadow-lg transition-all duration-300">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <h4 className="font-majestic text-lg text-soft-burgundy">{booking.customer}</h4>
                              <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className={booking.status === 'Confirmed' ? 'bg-pastel-mint text-soft-burgundy' : 'bg-pastel-peach text-soft-burgundy'}>
                                {booking.status}
                              </Badge>
                            </div>
                            <p className="text-royal-purple font-elegant">{booking.vendor} • {booking.event}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-pastel-gold font-semibold">₹{booking.amount.toLocaleString()}</span>
                              <span className="text-sm text-royal-purple">{booking.date}</span>
                              <span className="text-sm text-royal-purple">{booking.phone}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-pastel-gold text-pastel-gold hover:bg-pastel-gold hover:text-white">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="content" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="royal-card-pastel">
                    <CardHeader>
                      <CardTitle className="font-majestic text-soft-burgundy flex items-center">
                        <Globe className="w-6 h-6 mr-3 text-pastel-gold" />
                        Website Content Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {websiteContent.map((content, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border-2 border-pastel-gold/30 rounded-lg bg-gradient-to-r from-cream-white to-pastel-gold/5">
                            <div>
                              <h4 className="font-elegant text-soft-burgundy font-semibold">{content.section}</h4>
                              <p className="text-sm text-royal-purple">Updated: {content.lastUpdated}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-pastel-mint text-soft-burgundy">{content.status}</Badge>
                              <Button size="sm" variant="outline" className="border-pastel-gold text-pastel-gold hover:bg-pastel-gold hover:text-white">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="royal-card-pastel">
                    <CardHeader>
                      <CardTitle className="font-majestic text-soft-burgundy flex items-center">
                        <Image className="w-6 h-6 mr-3 text-pastel-gold" />
                        Media Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full royal-button-pastel font-majestic">
                          <Plus className="h-4 w-4 mr-2" />
                          Upload New Images
                        </Button>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="aspect-square bg-gradient-to-br from-pastel-gold to-pastel-peach rounded-lg flex items-center justify-center">
                            <Image className="h-8 w-8 text-white" />
                          </div>
                          <div className="aspect-square bg-gradient-to-br from-pastel-mint to-sage-green rounded-lg flex items-center justify-center">
                            <Image className="h-8 w-8 text-white" />
                          </div>
                          <div className="aspect-square bg-gradient-to-br from-pastel-rose to-pastel-lavender rounded-lg flex items-center justify-center">
                            <Image className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-6">
                <div className="grid lg:grid-cols-3 gap-8">
                  <Card className="royal-card-pastel">
                    <CardHeader>
                      <CardTitle className="font-majestic text-soft-burgundy flex items-center">
                        <PieChart className="w-6 h-6 mr-3 text-pastel-gold" />
                        Revenue Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-majestic text-gradient-royal">₹28.5L</p>
                          <p className="text-royal-purple font-elegant">This Month</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-elegant text-soft-burgundy">Weddings</span>
                            <span className="text-pastel-gold">60%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-elegant text-soft-burgundy">Corporate</span>
                            <span className="text-pastel-mint">25%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-elegant text-soft-burgundy">Others</span>
                            <span className="text-pastel-rose">15%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="royal-card-pastel">
                    <CardHeader>
                      <CardTitle className="font-majestic text-soft-burgundy flex items-center">
                        <LineChart className="w-6 h-6 mr-3 text-pastel-gold" />
                        User Growth
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-majestic text-gradient-royal">+23%</p>
                          <p className="text-royal-purple font-elegant">Growth Rate</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-elegant text-soft-burgundy">New Users</span>
                            <span className="text-pastel-gold">156</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-elegant text-soft-burgundy">Returning</span>
                            <span className="text-pastel-mint">89%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="royal-card-pastel">
                    <CardHeader>
                      <CardTitle className="font-majestic text-soft-burgundy flex items-center">
                        <BarChart3 className="w-6 h-6 mr-3 text-pastel-gold" />
                        Conversion Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-majestic text-gradient-royal">15.8%</p>
                          <p className="text-royal-purple font-elegant">Conversion Rate</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-elegant text-soft-burgundy">Leads</span>
                            <span className="text-pastel-gold">1,245</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-elegant text-soft-burgundy">Bookings</span>
                            <span className="text-pastel-mint">197</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="royal-card-pastel">
                    <CardHeader>
                      <CardTitle className="font-majestic text-soft-burgundy flex items-center">
                        <Settings className="w-6 h-6 mr-3 text-pastel-gold" />
                        System Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full royal-button-pastel font-majestic justify-start">
                          <Database className="h-4 w-4 mr-2" />
                          Database Management
                        </Button>
                        <Button className="w-full royal-button-pastel font-majestic justify-start">
                          <Globe className="h-4 w-4 mr-2" />
                          SEO Settings
                        </Button>
                        <Button className="w-full royal-button-pastel font-majestic justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Site Configuration
                        </Button>
                        <Button className="w-full royal-button-pastel font-majestic justify-start">
                          <Bell className="h-4 w-4 mr-2" />
                          Notification Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="royal-card-pastel">
                    <CardHeader>
                      <CardTitle className="font-majestic text-soft-burgundy flex items-center">
                        <Crown className="w-6 h-6 mr-3 text-pastel-gold" />
                        Admin Tools
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full royal-button-pastel font-majestic justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          Bulk User Actions
                        </Button>
                        <Button className="w-full royal-button-pastel font-majestic justify-start">
                          <Database className="h-4 w-4 mr-2" />
                          Data Export
                        </Button>
                        <Button className="w-full royal-button-pastel font-majestic justify-start">
                          <Activity className="h-4 w-4 mr-2" />
                          System Logs
                        </Button>
                        <Button className="w-full royal-button-pastel font-majestic justify-start">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Support Center
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
};Route>
  );
};

export default AdminPanel;
