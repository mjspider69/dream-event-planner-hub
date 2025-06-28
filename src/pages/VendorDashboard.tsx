import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Import the new components
import VendorStats from "@/components/vendor/VendorStats";
import VendorBookings from "@/components/vendor/VendorBookings";
import VendorEarnings from "@/components/vendor/VendorEarnings";
import VendorProfile from "@/components/vendor/VendorProfile";
import VendorAvailabilityTab from "@/components/vendor/VendorAvailabilityTab";
import VendorMessages from "@/components/vendor/VendorMessages";

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
      const { data, error } = await supabase
        .from('bookings')
        .select('customer_id')
        .eq('vendor_id', vendorData?.id);

      if (error) throw error;
      
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

        <VendorStats
          totalEarnings={totalEarnings}
          clientSelections={clientSelections}
          pendingBookings={pendingBookings}
          completedBookings={completedBookings}
          rating={vendorData?.rating}
        />

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <VendorBookings bookings={bookings} />
          </TabsContent>

          <TabsContent value="earnings">
            <VendorEarnings earnings={earnings} totalEarnings={totalEarnings} />
          </TabsContent>

          <TabsContent value="availability">
            <VendorAvailabilityTab />
          </TabsContent>

          <TabsContent value="profile">
            <VendorProfile
              vendorData={vendorData}
              setVendorData={setVendorData}
              updateVendorProfile={updateVendorProfile}
            />
          </TabsContent>

          <TabsContent value="messages">
            <VendorMessages />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default VendorDashboard;
