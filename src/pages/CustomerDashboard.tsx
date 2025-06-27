
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Heart, MessageCircle, FileText, User, Download, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useUserBookings } from "@/hooks/useBookings";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { data: bookings = [], isLoading } = useUserBookings();
  const [profile, setProfile] = useState<any>(null);
  const [savedVendors, setSavedVendors] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchSavedVendors();
      fetchNotifications();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSavedVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_vendors')
        .select(`
          *,
          vendors (*)
        `)
        .eq('customer_id', user?.id);

      if (error) throw error;
      setSavedVendors(data || []);
    } catch (error: any) {
      console.error('Error fetching saved vendors:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
    }
  };

  const updateProfile = async (updatedData: any) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updatedData)
        .eq('id', user?.id);

      if (error) throw error;
      setProfile({ ...profile, ...updatedData });
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error('Error updating profile');
    }
  };

  const removeSavedVendor = async (vendorId: string) => {
    try {
      const { error } = await supabase
        .from('saved_vendors')
        .delete()
        .eq('customer_id', user?.id)
        .eq('vendor_id', vendorId);

      if (error) throw error;
      setSavedVendors(savedVendors.filter(sv => sv.vendor_id !== vendorId));
      toast.success('Vendor removed from saved list');
    } catch (error: any) {
      toast.error('Error removing vendor');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name || user?.email}!
          </h1>
          <p className="text-gray-600">Manage your events and bookings</p>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bookings" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>My Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Saved Vendors</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Messages</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Bookings</h2>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </div>

            {isLoading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600 mb-4">Start planning your next event!</p>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                    Browse Vendors
                  </Button>
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
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <h2 className="text-2xl font-bold">Saved Vendors</h2>
            
            {savedVendors.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved vendors</h3>
                  <p className="text-gray-600 mb-4">Save vendors you like for easy access later!</p>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                    Browse Vendors
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedVendors.map((savedVendor) => {
                  const vendor = savedVendor.vendors;
                  return (
                    <Card key={savedVendor.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{vendor.business_name}</h3>
                            <p className="text-gray-600">{vendor.category}</p>
                            <p className="text-sm text-gray-500">{vendor.location}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSavedVendor(vendor.id)}
                          >
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-amber-600 font-semibold">
                            {vendor.price_range}
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold">Messages</h2>
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                <p className="text-gray-600">Start a conversation with vendors!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile?.full_name || ''}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profile?.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <Button 
                  onClick={() => updateProfile({ 
                    full_name: profile?.full_name, 
                    phone: profile?.phone 
                  })}
                  className="bg-gradient-to-r from-amber-500 to-orange-500"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <h2 className="text-2xl font-bold">Support & Help</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Raise a Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Need help? Contact our support team.</p>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Ticket
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">Email: aaroham.net@gmail.com</p>
                  <p className="text-sm">Phone: +91 76988 8931</p>
                  <p className="text-sm">Support Hours: 9 AM - 6 PM</p>
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

export default CustomerDashboard;
