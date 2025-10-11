
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Mock supabase for now - replace with actual Supabase client
const supabase = {
  from: (table: string) => ({
    select: (fields: string) => ({
      eq: (field: string, value: any) => ({
        single: async () => ({ data: null, error: null }),
        order: (field: string, options: any) => ({ data: [], error: null })
      }),
      order: (field: string, options: any) => Promise.resolve({ data: [], error: null })
    }),
    update: (data: any) => ({
      eq: (field: string, value: any) => Promise.resolve({ error: null })
    })
  })
};

// Import the vendor components
import VendorStats from "@/components/vendor/VendorStats";
import VendorBookings from "@/components/vendor/VendorBookings";
import VendorEarnings from "@/components/vendor/VendorEarnings";
import VendorProfile from "@/components/vendor/VendorProfile";
import VendorAvailabilityTab from "@/components/vendor/VendorAvailabilityTab";
import VendorMessages from "@/components/vendor/VendorMessages";

const VendorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [earnings, setEarnings] = useState<any[]>([]);
  const [clientSelections, setClientSelections] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      console.log('No user found, redirecting to auth');
      navigate('/vendor-auth');
      return;
    }
    fetchVendorData();
  }, [user, navigate]);

  useEffect(() => {
    if (vendorData?.id) {
      fetchBookings();
      fetchEarnings();
      fetchClientSelections();
    }
  }, [vendorData]);

  const fetchVendorData = async () => {
    try {
      console.log('Fetching vendor data for user:', user?.id);
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching vendor data:', error);
        throw error;
      }
      
      console.log('Vendor data fetched:', data);
      setVendorData(data);
    } catch (error: any) {
      console.error('Error fetching vendor data:', error);
      toast.error('Error loading vendor profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      console.log('Fetching bookings for vendor:', vendorData?.id);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('vendor_id', vendorData?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }
      
      console.log('Bookings fetched:', data);
      setBookings(data || []);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast.error('Error loading bookings');
    }
  };

  const fetchEarnings = async () => {
    try {
      console.log('Fetching earnings for vendor:', vendorData?.id);
      const { data, error } = await supabase
        .from('vendor_earnings')
        .select('*')
        .eq('vendor_id', vendorData?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching earnings:', error);
        setEarnings([]);
        return;
      }
      
      console.log('Earnings fetched:', data);
      setEarnings(data || []);
    } catch (error: any) {
      console.error('Error fetching earnings:', error);
      setEarnings([]);
    }
  };

  const fetchClientSelections = async () => {
    try {
      console.log('Fetching client selections for vendor:', vendorData?.id);
      const { data, error } = await supabase
        .from('bookings')
        .select('customer_id')
        .eq('vendor_id', vendorData?.id);

      if (error) {
        console.error('Error fetching client selections:', error);
        throw error;
      }
      
      const uniqueClients = new Set(data?.map(booking => booking.customer_id) || []);
      console.log('Unique clients:', uniqueClients.size);
      setClientSelections(uniqueClients.size);
    } catch (error: any) {
      console.error('Error fetching client selections:', error);
      toast.error('Error loading client data');
    }
  };

  const updateVendorProfile = async (updatedData: any) => {
    try {
      console.log('Updating vendor profile:', updatedData);
      const { error } = await supabase
        .from('vendors')
        .update(updatedData)
        .eq('id', vendorData?.id);

      if (error) {
        console.error('Error updating vendor profile:', error);
        throw error;
      }
      
      setVendorData({ ...vendorData, ...updatedData });
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  const totalEarnings = earnings.reduce((sum, earning) => sum + Number(earning.net_amount || 0), 0);
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const completedBookings = bookings.filter(b => b.status === 'confirmed').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-peach"></div>
      </div>
    );
  }

  if (!vendorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br bg-brand-cream">
        <Header />
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Vendor Profile Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            You need to complete your vendor onboarding first.
          </p>
          <button 
            onClick={() => navigate('/vendor-onboarding')}
            className="bg-gradient-to-r from-brand-peach to-brand-tan text-brand-cream px-8 py-3 rounded-lg hover:opacity-90 transition-colors"
          >
            Complete Vendor Setup
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-brand-cream">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vendor Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {vendorData?.business_name || 'Vendor'}!
          </p>
        </div>

        <VendorStats
          totalEarnings={totalEarnings}
          clientSelections={clientSelections}
          pendingBookings={pendingBookings}
          completedBookings={completedBookings}
          rating={vendorData?.rating || 0}
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
