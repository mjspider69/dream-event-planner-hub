
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

      // In production, this would integrate with Razorpay API
      // For now, we'll return mock data for testing
      return {
        ...data,
        razorpay_order_id: `order_${Date.now()}`,
        amount: paymentData.amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        key: 'rzp_test_your_key_here', // Replace with actual Razorpay key
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

      // Calculate and create vendor earnings
      const { data: booking } = await supabase
        .from('bookings')
        .select('vendor_id, budget')
        .eq('id', verificationData.bookingId)
        .single();

      if (booking) {
        const commissionRate = 0.10; // 10% commission
        const grossAmount = booking.budget || 0;
        const commissionAmount = grossAmount * commissionRate;
        const netAmount = grossAmount - commissionAmount;

        await supabase
          .from('vendor_earnings')
          .insert({
            vendor_id: booking.vendor_id,
            booking_id: verificationData.bookingId,
            amount: grossAmount,
            commission_amount: commissionAmount,
            commission_rate: commissionRate,
            net_amount: netAmount,
            status: 'completed',
          });
      }

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

export const useRazorpayPayment = () => {
  const { mutateAsync: initiatePayment } = useInitiatePayment();
  const { mutateAsync: verifyPayment } = useVerifyPayment();

  const processPayment = async (bookingId: string, amount: number) => {
    try {
      // Step 1: Create order on backend
      const orderData = await initiatePayment({ bookingId, amount });

      // Step 2: Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Step 3: Open Razorpay payment modal
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Aaroham',
        description: 'Event Booking Payment',
        order_id: orderData.razorpay_order_id,
        handler: async (response: any) => {
          try {
            // Step 4: Verify payment on backend
            await verifyPayment({
              bookingId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#F59E0B', // Amber color
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment process failed:', error);
      toast.error('Payment process failed');
    }
  };

  return { processPayment };
};

// Extend window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}
