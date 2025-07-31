import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export interface Booking {
  id: string;
  customerId: string;
  vendorId: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: number;
  budget: number;
  requirements?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount?: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  bookingExpiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateBookingData {
  eventType: string;
  vendorId: string;
  eventDate: Date;
  eventLocation: string;
  guestCount: number;
  budget: number;
  requirements?: string;
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: CreateBookingData) => {
      // Transform the data to match our API schema
      const bookingPayload = {
        customerId: 'temp-customer-id', // TODO: Get from auth context
        vendorId: bookingData.vendorId,
        eventType: bookingData.eventType,
        eventDate: bookingData.eventDate,
        eventLocation: bookingData.eventLocation,
        guestCount: bookingData.guestCount,
        budget: bookingData.budget.toString(),
        requirements: bookingData.requirements,
        status: 'pending',
        paymentStatus: 'pending',
      };

      return await apiClient.createBooking(bookingPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      toast.success('Booking created successfully!');
    },
    onError: (error: any) => {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    },
  });
};

export const useUserBookings = () => {
  return useQuery({
    queryKey: ['user-bookings'],
    queryFn: async () => {
      // Get bookings for the current user
      // Note: In a real implementation, you'd get the user ID from the auth context
      const bookings = await apiClient.getBookings();
      return bookings;
    },
    retry: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useBookings = (filters: { customerId?: string; vendorId?: string; status?: string } = {}) => {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: async () => {
      return await apiClient.getBookings(filters);
    },
    retry: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      return await apiClient.getBooking(id);
    },
    enabled: !!id,
    retry: 1,
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Booking> }) => {
      return await apiClient.updateBooking(id, updates);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', variables.id] });
      toast.success('Booking updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update booking');
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      return await apiClient.updateBooking(bookingId, { status: 'cancelled' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      toast.success('Booking cancelled successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel booking');
    },
  });
};