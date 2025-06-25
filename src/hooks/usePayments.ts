
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface InitiatePaymentData {
  bookingId: string;
  amount: number;
}

interface VerifyPaymentData {
  bookingId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: async (paymentData: InitiatePaymentData) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated');
      }

      // Create payment record in database
      const { data, error } = await supabase
        .from('payments')
        .insert({
          booking_id: paymentData.bookingId,
          customer_id: user.id,
          amount: paymentData.amount,
          currency: 'INR',
          payment_status: 'pending',
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Here you would typically call Razorpay API to create order
      // For now, we'll return mock data
      return {
        ...data,
        razorpay_order_id: `order_${Date.now()}`,
        amount: paymentData.amount * 100, // Razorpay expects amount in paise
      };
    },
    onError: (error) => {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment. Please try again.');
    },
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (verificationData: VerifyPaymentData) => {
      // Update payment record with Razorpay details
      const { data, error } = await supabase
        .from('payments')
        .update({
          razorpay_order_id: verificationData.razorpay_order_id,
          razorpay_payment_id: verificationData.razorpay_payment_id,
          razorpay_signature: verificationData.razorpay_signature,
          payment_status: 'completed',
          payment_date: new Date().toISOString(),
        })
        .eq('booking_id', verificationData.bookingId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update booking status to confirmed
      await supabase
        .from('bookings')
        .update({
          status: 'confirmed',
          payment_status: 'paid',
        })
        .eq('id', verificationData.bookingId);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      toast.success('Payment verified successfully! Your booking is confirmed.');
    },
    onError: (error) => {
      console.error('Error verifying payment:', error);
      toast.error('Payment verification failed. Please contact support.');
    },
  });
};
