import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Check, AlertTriangle, Copy, Save, TestTube2 } from 'lucide-react';
import { toast } from 'sonner';

interface UPIConfig {
  businessUpiId: string;
  businessName: string;
  accountHolder: string;
  bankName: string;
  isConfigured: boolean;
}

const UPIConfiguration = () => {
  const [config, setConfig] = useState<UPIConfig>({
    businessUpiId: '',
    businessName: 'Aaroham Events',
    accountHolder: '',
    bankName: '',
    isConfigured: false
  });

  const [testAmount, setTestAmount] = useState('1');
  const [isTestingPayment, setIsTestingPayment] = useState(false);

  useEffect(() => {
    // Load existing configuration
    const savedConfig = localStorage.getItem('aaroham_upi_config');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setConfig(parsed);
    }
  }, []);

  const handleSaveConfig = async () => {
    if (!config.businessUpiId || !config.accountHolder) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate UPI ID format
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    if (!upiRegex.test(config.businessUpiId)) {
      toast.error('Please enter a valid UPI ID (e.g., business@sbi)');
      return;
    }

    try {
      const configToSave = { ...config, isConfigured: true };
      localStorage.setItem('aaroham_upi_config', JSON.stringify(configToSave));
      
      // Update the payment component configuration
      await updatePaymentConfig(configToSave);
      
      setConfig(configToSave);
      toast.success('UPI configuration saved successfully!');
    } catch (error) {
      toast.error('Failed to save UPI configuration');
    }
  };

  const updatePaymentConfig = async (upiConfig: UPIConfig) => {
    // This would typically update the backend configuration
    // For now, we'll store it locally and update the payment component
    return Promise.resolve();
  };

  const testPaymentFlow = async () => {
    if (!config.businessUpiId) {
      toast.error('Please configure UPI ID first');
      return;
    }

    setIsTestingPayment(true);
    
    try {
      // Generate test UPI payment URL
      const amount = parseFloat(testAmount);
      const upiUrl = `upi://pay?pa=${config.businessUpiId}&pn=${encodeURIComponent(config.businessName)}&am=${amount}&cu=INR&tn=Test%20Payment%20Aaroham`;
      
      // Try to open UPI app
      const opened = window.open(upiUrl, '_blank');
      
      if (opened) {
        toast.success(`Test payment initiated! Check your UPI app for ₹${amount} payment request.`);
      } else {
        // Fallback: Show manual payment details
        toast.info(`Manual test: Send ₹${amount} to ${config.businessUpiId} via any UPI app`);
      }
    } catch (error) {
      toast.error('Failed to initiate test payment');
    } finally {
      setIsTestingPayment(false);
    }
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(config.businessUpiId);
    toast.success('UPI ID copied to clipboard!');
  };

  const getPopularBanks = () => [
    { name: 'State Bank of India', upiSuffix: '@sbi' },
    { name: 'HDFC Bank', upiSuffix: '@hdfc' },
    { name: 'ICICI Bank', upiSuffix: '@icici' },
    { name: 'Axis Bank', upiSuffix: '@axis' },
    { name: 'Paytm', upiSuffix: '@paytm' },
    { name: 'Google Pay', upiSuffix: '@okaxis' },
    { name: 'PhonePe', upiSuffix: '@ybl' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">UPI Payment Configuration</CardTitle>
              <p className="text-gray-600">Set up your business UPI ID for receiving payments</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Configuration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Configuration Status</span>
            {config.isConfigured ? (
              <Badge className="bg-green-100 text-green-800">Configured</Badge>
            ) : (
              <Badge variant="outline">Not Configured</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {config.isConfigured ? (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">UPI Payments Active</span>
              </div>
              <div className="text-sm text-green-700 space-y-1">
                <p><strong>UPI ID:</strong> {config.businessUpiId}</p>
                <p><strong>Business:</strong> {config.businessName}</p>
                <p><strong>Account Holder:</strong> {config.accountHolder}</p>
                <p><strong>Bank:</strong> {config.bankName}</p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span className="font-semibold text-amber-800">UPI Configuration Required</span>
              </div>
              <p className="text-sm text-amber-700">
                Configure your business UPI ID to accept payments from customers.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* UPI Configuration Form */}
      <Card>
        <CardHeader>
          <CardTitle>UPI Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business-upi" className="text-sm font-medium">
                Business UPI ID <span className="text-red-500">*</span>
              </Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="business-upi"
                  value={config.businessUpiId}
                  onChange={(e) => setConfig(prev => ({ ...prev, businessUpiId: e.target.value.toLowerCase() }))}
                  placeholder="aarohamevents@sbi"
                  className="flex-1"
                />
                {config.businessUpiId && (
                  <Button onClick={copyUpiId} variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Get this from your bank's business banking section
              </p>
            </div>
            
            <div>
              <Label htmlFor="business-name" className="text-sm font-medium">Business Name</Label>
              <Input
                id="business-name"
                value={config.businessName}
                onChange={(e) => setConfig(prev => ({ ...prev, businessName: e.target.value }))}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="account-holder" className="text-sm font-medium">
                Account Holder Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="account-holder"
                value={config.accountHolder}
                onChange={(e) => setConfig(prev => ({ ...prev, accountHolder: e.target.value }))}
                placeholder="As per bank records"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="bank-name" className="text-sm font-medium">Bank Name</Label>
              <Input
                id="bank-name"
                value={config.bankName}
                onChange={(e) => setConfig(prev => ({ ...prev, bankName: e.target.value }))}
                placeholder="State Bank of India"
                className="mt-1"
              />
            </div>
          </div>
          
          <Button onClick={handleSaveConfig} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save UPI Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Popular Banks Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Popular UPI Providers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {getPopularBanks().map((bank) => (
              <div 
                key={bank.name}
                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  const businessName = config.businessName.toLowerCase().replace(/\s+/g, '');
                  const suggestedUpi = `${businessName}${bank.upiSuffix}`;
                  setConfig(prev => ({ 
                    ...prev, 
                    businessUpiId: suggestedUpi,
                    bankName: bank.name 
                  }));
                }}
              >
                <p className="font-medium text-sm">{bank.name}</p>
                <p className="text-xs text-gray-500">Format: name{bank.upiSuffix}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Click on a bank to auto-generate your UPI ID format
          </p>
        </CardContent>
      </Card>

      {/* Test Payment */}
      {config.isConfigured && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TestTube2 className="h-5 w-5" />
              <span>Test Payment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div>
                <Label htmlFor="test-amount" className="text-sm font-medium">Test Amount (₹)</Label>
                <Input
                  id="test-amount"
                  type="number"
                  value={testAmount}
                  onChange={(e) => setTestAmount(e.target.value)}
                  className="w-32 mt-1"
                  min="1"
                  max="100"
                />
              </div>
              <div className="pt-6">
                <Button 
                  onClick={testPaymentFlow}
                  disabled={isTestingPayment}
                  variant="outline"
                >
                  {isTestingPayment ? 'Testing...' : 'Test UPI Payment'}
                </Button>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Test Instructions</h4>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Click "Test UPI Payment" to generate a payment request</li>
                <li>Your UPI app will open with the payment details</li>
                <li>Complete the payment to verify the configuration</li>
                <li>Check your bank account for the test amount</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Configure UPI ID</h4>
                <p className="text-sm text-gray-600">Enter your business UPI ID and account details above</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-600">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Test Payment</h4>
                <p className="text-sm text-gray-600">Process a small test transaction to verify everything works</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-green-600">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Go Live</h4>
                <p className="text-sm text-gray-600">Your platform is ready to accept real customer payments!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UPIConfiguration;