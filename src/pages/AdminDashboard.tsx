
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  DollarSign, 
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  Settings,
  FileText,
  BarChart3
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingVendors: 0,
  });
  const [vendors, setVendors] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch vendors
      const { data: vendorsData, error: vendorsError } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

      if (vendorsError) throw vendorsError;
      setVendors(vendorsData || []);

      // Fetch profiles (users)
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Calculate stats
      const pendingVendors = vendorsData?.filter(v => v.status === 'pending').length || 0;
      const totalRevenue = bookingsData?.reduce((sum, booking) => sum + (booking.budget || 0), 0) || 0;

      setStats({
        totalUsers: usersData?.length || 0,
        totalVendors: vendorsData?.length || 0,
        totalBookings: bookingsData?.length || 0,
        totalRevenue,
        pendingVendors,
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
      const { error } = await supabase
        .from('vendors')
        .update({ status: 'approved', is_approved: true })
        .eq('id', vendorId);

      if (error) throw error;
      
      setVendors(vendors.map(v => 
        v.id === vendorId 
          ? { ...v, status: 'approved', is_approved: true }
          : v
      ));
      
      toast.success('Vendor approved successfully!');
    } catch (error: any) {
      toast.error('Error approving vendor');
    }
  };

  const rejectVendor = async (vendorId: string) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ status: 'rejected', is_approved: false })
        .eq('id', vendorId);

      if (error) throw error;
      
      setVendors(vendors.map(v => 
        v.id === vendorId 
          ? { ...v, status: 'rejected', is_approved: false }
          : v
      ));
      
      toast.success('Vendor rejected');
    } catch (error: any) {
      toast.error('Error rejecting vendor');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your Aaroham platform</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                        <p className="text-sm text-gray-500">{vendor.location}</p>
                        <p className="text-sm text-amber-600 font-medium">{vendor.price_range}</p>
                      </div>
                      <Badge className={getStatusColor(vendor.status)}>
                        {vendor.status || 'pending'}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>Rating: {vendor.rating || 'N/A'}</p>
                        <p>Joined: {new Date(vendor.created_at).toLocaleDateString()}</p>
                      </div>
                      
                      {vendor.status === 'pending' && (
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
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
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
