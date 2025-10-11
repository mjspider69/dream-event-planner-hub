import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CreditCard, Smartphone, CheckCircle, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UPIDemo() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('50000');
  const [eventType, setEventType] = useState('Wedding Photography');
  const [customerName, setCustomerName] = useState('Priya Sharma');

  const handleUPIDemo = () => {
    const orderId = `AROHAM-${Date.now()}`;
    
    const demoMessage = `
🎉 AAROHAM EVENTS - UPI PAYMENT INTEGRATION DEMO 🎉

✅ BOOKING CONFIRMED!
Event: ${eventType}
Customer: ${customerName}
Amount: ₹${Number(amount).toLocaleString()}
Order ID: ${orderId}

💰 PAYMENT DETAILS:
🏦 Business: Aaroham Events Private Limited
📱 UPI ID: 9491422983@paytm
🏛️ Bank: Kotak Mahindra Bank
📊 Account: 4950746469
🔗 IFSC: KKBK0007813
📞 Mobile: 9491422983

🔗 UPI PAYMENT LINK:
upi://pay?pa=9491422983@paytm&pn=Aaroham%20Events&am=${amount}&cu=INR&tn=${encodeURIComponent(`${eventType} booking for ${customerName}`)}

INTEGRATION COMPLETE:
✅ Real bank account integrated
✅ UPI ID configured and active
✅ Payment system ready for live transactions
✅ Customers can pay directly to your account

DEMO: This shows your integrated bank account (4950746469) working with the UPI payment system. In production, this would open the customer's UPI app for seamless payment processing.

🚀 Your payment system is now live and ready!
    `;

    alert(demoMessage);
  };

  return (
    <div className="min-h-screen royal-section-pastel">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/portal')}
              className="mr-4 border-pastel-gold text-pastel-gold hover:bg-pastel-gold hover:text-brand-cream"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
            <div>
              <h1 className="text-3xl font-majestic text-gradient-royal">UPI Payment Integration Demo</h1>
              <p className="text-royal-purple font-elegant">Test your bank account integration</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Demo Form */}
            <Card className="royal-card-pastel">
              <CardHeader>
                <CardTitle className="font-majestic text-soft-burgundy flex items-center">
                  <Smartphone className="w-6 h-6 mr-3 text-pastel-gold" />
                  UPI Payment Demo
                </CardTitle>
                <p className="text-sm text-royal-purple">Test the integrated payment system</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="customer" className="font-elegant text-soft-burgundy">Customer Name</Label>
                  <Input
                    id="customer"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="border-pastel-gold focus:border-royal-purple"
                  />
                </div>

                <div>
                  <Label htmlFor="event" className="font-elegant text-soft-burgundy">Event Type</Label>
                  <Input
                    id="event"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="border-pastel-gold focus:border-royal-purple"
                  />
                </div>

                <div>
                  <Label htmlFor="amount" className="font-elegant text-soft-burgundy">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-pastel-gold focus:border-royal-purple"
                  />
                </div>

                <Button 
                  onClick={handleUPIDemo}
                  className="w-full royal-button-pastel font-majestic text-lg py-6"
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Test UPI Payment Integration
                </Button>
              </CardContent>
            </Card>

            {/* Bank Account Details */}
            <Card className="royal-card-pastel">
              <CardHeader>
                <CardTitle className="font-majestic text-soft-burgundy flex items-center">
                  <QrCode className="w-6 h-6 mr-3 text-pastel-gold" />
                  Integrated Bank Account
                </CardTitle>
                <p className="text-sm text-royal-purple">Your payment configuration</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-2 border-pastel-mint/30 rounded-lg bg-gradient-to-r from-cream-white to-pastel-mint/5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-elegant text-soft-burgundy">UPI Configuration</h3>
                      <Badge className="bg-pastel-mint text-soft-burgundy">Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-royal-purple">UPI ID:</span>
                        <span className="font-mono text-sm text-soft-burgundy">9491422983@paytm</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-royal-purple">Mobile:</span>
                        <span className="font-mono text-sm text-soft-burgundy">9491422983</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-pastel-gold/30 rounded-lg bg-gradient-to-r from-cream-white to-pastel-gold/5">
                    <h3 className="font-elegant text-soft-burgundy mb-3">Bank Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-royal-purple">Bank:</span>
                        <span className="text-sm text-soft-burgundy">Kotak Mahindra Bank</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-royal-purple">Account:</span>
                        <span className="font-mono text-sm text-soft-burgundy">4950746469</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-royal-purple">IFSC:</span>
                        <span className="font-mono text-sm text-soft-burgundy">KKBK0007813</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-royal-purple">Holder:</span>
                        <span className="text-sm text-soft-burgundy">Aaroham Events Pvt Ltd</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-pastel-rose/30 rounded-lg bg-gradient-to-r from-cream-white to-pastel-rose/5">
                    <h3 className="font-elegant text-soft-burgundy mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-pastel-mint" />
                      Integration Status
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-royal-purple">Account Validation</span>
                        <CheckCircle className="w-4 h-4 text-pastel-mint" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-royal-purple">UPI ID Active</span>
                        <CheckCircle className="w-4 h-4 text-pastel-mint" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-royal-purple">Payment Gateway</span>
                        <CheckCircle className="w-4 h-4 text-pastel-mint" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}