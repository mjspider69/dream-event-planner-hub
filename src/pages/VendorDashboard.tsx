import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  MessageCircle, 
  Settings, 
  Upload,
  TrendingUp,
  Star,
  Camera,
  UserCheck
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VendorDashboard = () => {
  const { user } = useAuth();
  const [vendorData, setVendorData] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [earnings, setEarnings] = useState<any[]>([]);
  const [clientSelections, setClientSelections] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchVendorData();
      fetchBookings();
      fetchEarnings();
      fetchClientSelections();
    }
  }, [user]);

  const fetchVendorData = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setVendorData(data);
    } catch (error: any) {
      console.error('Error fetching vendor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('vendor_id', vendorData?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchEarnings = async () => {
    try {
      const { data, error } = await supabase
        .from('vendor_earnings')
        .select('*')
        .eq('vendor_id', vendorData?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEarnings(data || []);
    } catch (error: any) {
      console.error('Error fetching earnings:', error);
    }
  };

  const fetchClientSelections = async () => {
    try {
      // Count unique customers who have selected this vendor (made bookings)
      const { data, error } = await supabase
        .from('bookings')
        .select('customer_id')
        .eq('vendor_id', vendorData?.id);

      if (error) throw error;
      
      // Count unique customer IDs
      const uniqueClients = new Set(data?.map(booking => booking.customer_id) || []);
      setClientSelections(uniqueClients.size);
    } catch (error: any) {
      console.error('Error fetching client selections:', error);
    }
  };

  const updateVendorProfile = async (updatedData: any) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update(updatedData)
        .eq('id', vendorData?.id);

      if (error) throw error;
      setVendorData({ ...vendorData, ...updatedData });
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error('Error updating profile');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEarnings = earnings.reduce((sum, earning) => sum + Number(earning.net_amount), 0);
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const completedBookings = bookings.filter(b => b.status === 'confirmed').length;

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
            Vendor Dashboard
          </h1>
          <p className="text-gray-600">
            {vendorData?.business_name || 'Welcome to your vendor dashboard'}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{totalEarnings.toLocaleString()}
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
                  <p className="text-sm font-medium text-gray-600">Clients Selected</p>
                  <p className="text-2xl font-bold text-blue-600">{clientSelections}</p>
                </div>
                <UserCheck className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Events</p>
                  <p className="text-2xl font-bold text-purple-600">{completedBookings}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {vendorData?.rating || '0.0'}
                  </p>
                </div>
                <Star className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Bookings</h2>
              <Badge variant="outline">
                {bookings.length} Total Bookings
              </Badge>
            </div>

            {bookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600">Your bookings will appear here when customers book your services.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{booking.event_type}</h3>
                          <p className="text-gray-600">{booking.event_location}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.event_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Guests: {booking.guest_count} | Budget: ₹{booking.budget?.toLocaleString()}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                          {booking.status === 'pending' && (
                            <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500">
                              Accept
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Earnings</h2>
              <div className="text-lg font-semibold text-green-600">
                Total: ₹{totalEarnings.toLocaleString()}
              </div>
            </div>

            {earnings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No earnings yet</h3>
                  <p className="text-gray-600">Complete bookings to start earning!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {earnings.map((earning) => (
                  <Card key={earning.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">₹{Number(earning.net_amount).toLocaleString()}</p>
                          <p className="text-sm text-gray-600">
                            Commission: ₹{Number(earning.commission_amount).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(earning.payment_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={
                          earning.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }>
                          {earning.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <h2 className="text-2xl font-bold">Availability Calendar</h2>
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar Coming Soon</h3>
                <p className="text-gray-600">Manage your availability and blocked dates.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    <Input
                      value={vendorData?.business_name || ''}
                      onChange={(e) => setVendorData({ ...vendorData, business_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <Input
                      value={vendorData?.category || ''}
                      onChange={(e) => setVendorData({ ...vendorData, category: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    value={vendorData?.description || ''}
                    onChange={(e) => setVendorData({ ...vendorData, description: e.target.value })}
                    rows={4}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <Input
                      value={vendorData?.location || ''}
                      onChange={(e) => setVendorData({ ...vendorData, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range
                    </label>
                    <Input
                      value={vendorData?.price_range || ''}
                      onChange={(e) => setVendorData({ ...vendorData, price_range: e.target.value })}
                      placeholder="e.g., ₹50,000 - ₹1,50,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Portfolio Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload your portfolio images</p>
                    <Button variant="outline" className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={() => updateVendorProfile(vendorData)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold">Messages</h2>
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                <p className="text-gray-600">Customer messages will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default VendorDashboard;
