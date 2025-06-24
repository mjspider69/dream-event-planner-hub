
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Shield, CheckCircle, Loader } from "lucide-react";

interface PaymentData {
  amount: number;
  currency: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
}

const PaymentIntegration = ({ paymentData, onSuccess, onError }: {
  paymentData: PaymentData;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');

  // Note: This is a mock implementation. In production, you would integrate with Razorpay
  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      const mockPaymentId = `pay_${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      onSuccess(mockPaymentId);
      
    } catch (error) {
      onError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI', icon: Shield },
    { id: 'netbanking', name: 'Net Banking', icon: CheckCircle }
  ];

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Secure Payment</CardTitle>
          <Badge className="bg-green-100 text-green-800 mx-auto">
            SSL Encrypted
          </Badge>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Payment Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-mono">{paymentData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Description:</span>
                <span>{paymentData.description}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total Amount:</span>
                <span className="text-green-600">
                  ₹{paymentData.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="font-semibold mb-3">Select Payment Method</h3>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`
                    flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all
                    ${paymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                    }
                  `}
                >
                  <method.icon className="h-5 w-5 mr-3 text-blue-600" />
                  <span className="font-medium">{method.name}</span>
                  {paymentMethod === method.id && (
                    <CheckCircle className="h-5 w-5 ml-auto text-blue-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Billing Details</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {paymentData.customerName}</p>
              <p><strong>Email:</strong> {paymentData.customerEmail}</p>
              <p><strong>Phone:</strong> {paymentData.customerPhone}</p>
            </div>
          </div>

          {/* Security Features */}
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>PCI Compliant</span>
            </div>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-full"
          >
            {loading ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Pay ₹{paymentData.amount.toLocaleString()}
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
            Your payment is secured by industry-standard encryption.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentIntegration;
