import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

export interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  amount: number;
  currency: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;
}

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
      const paymentPayload = {
        bookingId: paymentData.bookingId,
        amount: paymentData.amount,
        currency: 'INR',
        paymentStatus: 'pending',
      };

      const payment = await apiClient.createPayment(paymentPayload);

      // In production, this would integrate with Razorpay API
      // For now, we'll return mock data for testing
      return {
        ...payment,
        razorpay_order_id: `order_${Date.now()}`,
        amount: paymentData.amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        key: 'rzp_test_your_key_here', // Replace with actual Razorpay key
      };
    },
    onError: (error: any) => {
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
      const paymentUpdates = {
        razorpayOrderId: verificationData.razorpay_order_id,
        razorpayPaymentId: verificationData.razorpay_payment_id,
        razorpaySignature: verificationData.razorpay_signature,
        paymentStatus: 'completed',
        paymentDate: new Date().toISOString(),
      };

      // Find the payment by booking ID and update it
      const payments = await apiClient.getPayments(verificationData.bookingId);
      if (payments.length === 0) {
        throw new Error('Payment not found');
      }

      const payment = payments[0];
      const updatedPayment = await apiClient.updatePayment(payment.id, paymentUpdates);

      // Update booking status to confirmed
      await apiClient.updateBooking(verificationData.bookingId, {
        status: 'confirmed',
      });

      return updatedPayment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      toast.success('Payment verified successfully!');
    },
    onError: (error: any) => {
      console.error('Error verifying payment:', error);
      toast.error('Payment verification failed. Please contact support.');
    },
  });
};

export const usePayments = (bookingId?: string) => {
  return useQuery({
    queryKey: ['payments', bookingId],
    queryFn: async () => {
      return await apiClient.getPayments(bookingId);
    },
    retry: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const usePayment = (paymentId: string) => {
  return useQuery({
    queryKey: ['payment', paymentId],
    queryFn: async () => {
      const payments = await apiClient.getPayments();
      return payments.find((p: Payment) => p.id === paymentId);
    },
    enabled: !!paymentId,
    retry: 1,
  });
};