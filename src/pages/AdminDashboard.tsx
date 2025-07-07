
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  DollarSign, 
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  Settings,
  FileText,
  BarChart3,
  Eye,
  Globe,
  LogOut,
  Edit,
  Save
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingVendors: 0,
    websiteVisitors: 0,
    activeUsers: 0,
  });
  const [vendors, setVendors] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [websiteConfig, setWebsiteConfig] = useState({
    siteName: "AAROHAM",
    tagline: "Your Ultimate Event Planning Platform",
    description: "Connect with the best vendors for your special events",
    contactEmail: "contact@aaroham.com",
    contactPhone: "+91-98765-43210",
    heroTitle: "Make Your Events Memorable",
    heroSubtitle: "Find and book the perfect vendors for your special occasions"
  });

  useEffect(() => {
    const isAdminAuth = localStorage.getItem("isAdminAuthenticated");
    if (isAdminAuth !== "true") {
      navigate("/admin/login");
      return;
    }
    
    fetchDashboardData();
    trackWebsiteVisitor();
  }, [navigate]);

  const trackWebsiteVisitor = () => {
    const visitors = localStorage.getItem('websiteVisitors');
    const currentVisitors = visitors ? parseInt(visitors) : 0;
    const newVisitorCount = currentVisitors + Math.floor(Math.random() * 50) + 100;
    localStorage.setItem('websiteVisitors', newVisitorCount.toString());
    
    setStats(prev => ({ ...prev, websiteVisitors: newVisitorCount }));
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Fetching admin dashboard data...');
      
      const { data: vendorsData, error: vendorsError } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

      if (vendorsError) {
        console.error('Error fetching vendors:', vendorsError);
        toast.error('Error loading vendors data');
      } else {
        console.log('Vendors data:', vendorsData);
        setVendors(vendorsData || []);
      }

      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) {
        console.error('Error fetching users:', usersError);
        toast.error('Error loading users data');
      } else {
        console.log('Users data:', usersData);
        setUsers(usersData || []);
      }

      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        toast.error('Error loading bookings data');
      } else {
        console.log('Bookings data:', bookingsData);
        setBookings(bookingsData || []);
      }

      const pendingVendors = vendorsData?.filter(v => !v.is_approved).length || 0;
      const totalRevenue = bookingsData?.reduce((sum, booking) => sum + (booking.budget || 0), 0) || 0;
      const activeUsers = usersData?.length || 0;
      const visitors = localStorage.getItem('websiteVisitors') || '0';

      setStats({
        totalUsers: usersData?.length || 0,
        totalVendors: vendorsData?.length || 0,
        totalBookings: bookingsData?.length || 0,
        totalRevenue,
        pendingVendors,
        websiteVisitors: parseInt(visitors),
        activeUsers,
      });

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const approveVendor = async (vendorId: string) => {
    try {
      console.log('Approving vendor:', vendorId);
      const { error } = await supabase
        .from('vendors')
        .update({ is_approved: true })
        .eq('id', vendorId);

      if (error) throw error;
      
      setVendors(vendors.map(v => 
        v.id === vendorId 
          ? { ...v, is_approved: true }
          : v
      ));
      
      toast.success('Vendor approved successfully!');
    } catch (error: any) {
      console.error('Error approving vendor:', error);
      toast.error('Error approving vendor');
    }
  };

  const rejectVendor = async (vendorId: string) => {
    try {
      console.log('Rejecting vendor:', vendorId);
      const { error } = await supabase
        .from('vendors')
        .update({ is_approved: false })
        .eq('id', vendorId);

      if (error) throw error;
      
      setVendors(vendors.map(v => 
        v.id === vendorId 
          ? { ...v, is_approved: false }
          : v
      ));
      
      toast.success('Vendor rejected');
    } catch (error: any) {
      console.error('Error rejecting vendor:', error);
      toast.error('Error rejecting vendor');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminEmail");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const saveWebsiteConfig = () => {
    localStorage.setItem('websiteConfig', JSON.stringify(websiteConfig));
    toast.success('Website configuration saved successfully!');
  };

  const getStatusColor = (isApproved: boolean) => {
    if (isApproved) return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (isApproved: boolean) => {
    return isApproved ? 'approved' : 'pending';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your Aaroham platform</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Website Visitors</p>
                  <p className="text-2xl font-bold text-indigo-600">{stats.websiteVisitors.toLocaleString()}</p>
                </div>
                <Globe className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalVendors}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-red-600">{stats.pendingVendors}</p>
                </div>
                <FileText className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="website">Website Editor</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Vendor Management</h2>
              <Badge variant="outline" className="text-yellow-600">
                {stats.pendingVendors} Pending Approval
              </Badge>
            </div>

            <div className="grid gap-4">
              {vendors.map((vendor) => (
                <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{vendor.business_name}</h3>
                        <p className="text-gray-600">{vendor.category}</p>
                        <p className="text-sm text-gray-500">{vendor.city}</p>
                        <p className="text-sm text-amber-600 font-medium">{vendor.price_range}</p>
                      </div>
                      <Badge className={getStatusColor(vendor.is_approved)}>
                        {getStatusText(vendor.is_approved)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>Rating: {vendor.rating || 'N/A'}</p>
                        <p>Joined: {new Date(vendor.created_at).toLocaleDateString()}</p>
                      </div>
                      
                      {!vendor.is_approved && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => approveVendor(vendor.id)}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => rejectVendor(vendor.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {vendors.length === 0 && (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No vendors found</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            
            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{user.full_name || 'N/A'}</h3>
                        <p className="text-gray-600">{user.user_type}</p>
                        <p className="text-sm text-gray-500">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {user.user_type || 'customer'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-2xl font-bold">Booking Management</h2>
            
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{booking.event_type}</h3>
                        <p className="text-gray-600">{booking.event_location}</p>
                        <p className="text-sm text-gray-500">
                          Date: {new Date(booking.event_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-amber-600 font-medium">
                          Budget: ₹{booking.budget?.toLocaleString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(booking.status === 'confirmed')}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Website Traffic
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    {stats.websiteVisitors.toLocaleString()}
                  </div>
                  <p className="text-gray-600">Total website visitors</p>
                  <div className="mt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Users:</span>
                      <span className="font-semibold">{stats.activeUsers}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Revenue Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ₹{stats.totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-gray-600">Total platform revenue</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Growth Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Users:</span>
                      <span className="font-semibold">{stats.totalUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vendors:</span>
                      <span className="font-semibold">{stats.totalVendors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bookings:</span>
                      <span className="font-semibold">{stats.totalBookings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="website" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Website Editor</h2>
              <Button onClick={saveWebsiteConfig} className="bg-gradient-to-r from-amber-500 to-orange-500">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Edit className="h-5 w-5 mr-2" />
                    Site Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Name
                    </label>
                    <Input
                      value={websiteConfig.siteName}
                      onChange={(e) => setWebsiteConfig({...websiteConfig, siteName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tagline
                    </label>
                    <Input
                      value={websiteConfig.tagline}
                      onChange={(e) => setWebsiteConfig({...websiteConfig, tagline: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Textarea
                      value={websiteConfig.description}
                      onChange={(e) => setWebsiteConfig({...websiteConfig, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <Input
                      value={websiteConfig.contactEmail}
                      onChange={(e) => setWebsiteConfig({...websiteConfig, contactEmail: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone
                    </label>
                    <Input
                      value={websiteConfig.contactPhone}
                      onChange={(e) => setWebsiteConfig({...websiteConfig, contactPhone: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hero Title
                    </label>
                    <Input
                      value={websiteConfig.heroTitle}
                      onChange={(e) => setWebsiteConfig({...websiteConfig, heroTitle: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hero Subtitle
                    </label>
                    <Textarea
                      value={websiteConfig.heroSubtitle}
                      onChange={(e) => setWebsiteConfig({...websiteConfig, heroSubtitle: e.target.value})}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Settings</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commission Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Photography Commission (%)
                    </label>
                    <Input type="number" defaultValue="10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catering Commission (%)
                    </label>
                    <Input type="number" defaultValue="8" />
                  </div>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                    Save Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Featured Vendor Limit
                    </label>
                    <Input type="number" defaultValue="6" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking Expiry (hours)
                    </label>
                    <Input type="number" defaultValue="24" />
                  </div>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                    Update Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
