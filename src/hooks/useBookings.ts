
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Booking {
  id: string;
  customer_id: string | null;
  vendor_ids: string[] | null;
  event_type: string;
  event_date: string;
  event_location: string;
  guest_count: number | null;
  budget: number | null;
  requirements: string | null;
  status: string;
  total_amount: number | null;
  payment_status: string;
  booking_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateBookingData {
  event_type: string;
  vendor_ids: string[];
  event_date: string;
  event_location: string;
  guest_count: number;
  budget: number;
  requirements?: string;
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: CreateBookingData) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to create booking');
      }

      // Set booking expiry to 24 hours from now
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 24);

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          customer_id: user.id,
          vendor_ids: bookingData.vendor_ids,
          event_type: bookingData.event_type,
          event_date: bookingData.event_date,
          event_location: bookingData.event_location,
          guest_count: bookingData.guest_count,
          budget: bookingData.budget,
          requirements: bookingData.requirements,
          status: 'pending',
          payment_status: 'pending',
          booking_expires_at: expiryDate.toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error('Booking creation error:', error);
        throw error;
      }

      // Create notifications for vendors
      if (bookingData.vendor_ids.length > 0) {
        const notifications = bookingData.vendor_ids.map(vendorId => ({
          user_id: vendorId,
          user_type: 'vendor',
          title: 'New Booking Request',
          message: `You have received a new booking request for ${bookingData.event_type}`,
          type: 'info',
          booking_id: data.id,
        }));

        await supabase.from('notifications').insert(notifications);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking created successfully!');
    },
    onError: (error) => {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    },
  });
};

export const useUserBookings = () => {
  return useQuery({
    queryKey: ['user-bookings'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated');
      }

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Booking[];
    },
  });
};
