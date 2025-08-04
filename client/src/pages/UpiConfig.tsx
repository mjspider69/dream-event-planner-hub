import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Save, CheckCircle, AlertCircle, Smartphone, CreditCard, Building } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface UpiConfigData {
  businessUpiId: string;
  businessName: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
  phoneNumber: string;
}

export default function UpiConfig() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<UpiConfigData>({
    businessUpiId: '9491422983@paytm',
    businessName: 'Aaroham Events',
    accountHolderName: 'Aaroham Events Private Limited',
    bankName: 'Kotak Mahindra Bank',
    accountNumber: '4950746469',
    ifscCode: 'KKBK0007813',
    branchName: 'Mumbai Main Branch',
    phoneNumber: '9491422983'
  });

  useEffect(() => {
    // Load existing configuration
    const savedConfig = localStorage.getItem('aaroham_upi_config');
    if (savedConfig) {
      setConfig(prev => ({ ...prev, ...JSON.parse(savedConfig) }));
    }
  }, []);

  const handleInputChange = (field: keyof UpiConfigData, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const validateUpiId = (upiId: string) => {
    const upiRegex = /^[a-zA-Z0-9.-]{2,256}@[a-zA-Z]{2,64}$/;
    return upiRegex.test(upiId);
  };

  const validateIFSC = (ifsc: string) => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(ifsc);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSave = async () => {
    if (!config.businessUpiId || !validateUpiId(config.businessUpiId)) {
      toast({
        title: "Invalid UPI ID",
        description: "Please enter a valid UPI ID (e.g., yourname@paytm, yourname@phonepe)",
        variant: "destructive",
      });
      return;
    }

    if (!config.accountHolderName || !config.bankName) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in account holder name and bank name",
        variant: "destructive",
      });
      return;
    }

    if (config.ifscCode && !validateIFSC(config.ifscCode)) {
      toast({
        title: "Invalid IFSC Code",
        description: "Please enter a valid IFSC code (e.g., HDFC0000123)",
        variant: "destructive",
      });
      return;
    }

    if (config.phoneNumber && !validatePhone(config.phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Indian mobile number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Save configuration to localStorage
      localStorage.setItem('aaroham_upi_config', JSON.stringify(config));
      
      // Save to backend (optional - for admin dashboard)
      await fetch('/api/upi-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      toast({
        title: "UPI Configuration Saved",
        description: "Your bank account details have been configured successfully",
      });

      // Navigate back after a delay
      setTimeout(() => navigate(-1), 1500);
    } catch (error) {
      console.error('Save UPI config error:', error);
      toast({
        title: "Save Failed",
        description: "Configuration saved locally but failed to sync with server",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isConfigured = config.businessUpiId && config.accountHolderName && config.bankName;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pearl-50 to-amber-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">UPI Bank Account Configuration</h1>
            <p className="text-gray-600 mt-1">Configure your bank account details for receiving payments</p>
          </div>
        </div>

        {/* Status Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              {isConfigured ? (
                <>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-700">UPI Configuration Active</p>
                    <p className="text-sm text-green-600">Your bank account is configured and ready to receive payments</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-700">UPI Configuration Required</p>
                    <p className="text-sm text-amber-600">Please configure your bank account details to receive payments</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* UPI Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2 text-blue-600" />
                UPI Details
              </CardTitle>
              <CardDescription>
                Your UPI ID for receiving payments through mobile apps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessUpiId">Business UPI ID *</Label>
                <Input
                  id="businessUpiId"
                  value={config.businessUpiId}
                  onChange={(e) => handleInputChange('businessUpiId', e.target.value)}
                  placeholder="yourname@paytm / yourname@phonepe"
                  data-testid="input-upi-id"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your UPI ID from any UPI app (PhonePe, Paytm, GPay, etc.)
                </p>
              </div>

              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={config.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Your Business Name"
                  data-testid="input-business-name"
                />
              </div>

              <div>
                <Label htmlFor="phoneNumber">Registered Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={config.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="9876543210"
                  data-testid="input-phone"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Phone number linked to your UPI ID
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bank Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2 text-green-600" />
                Bank Account Details
              </CardTitle>
              <CardDescription>
                Bank account information for verification and backup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                <Input
                  id="accountHolderName"
                  value={config.accountHolderName}
                  onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                  placeholder="Full Name as per Bank Records"
                  data-testid="input-account-holder"
                />
              </div>

              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  value={config.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  placeholder="State Bank of India / HDFC Bank / ICICI Bank"
                  data-testid="input-bank-name"
                />
              </div>

              <div>
                <Label htmlFor="accountNumber">Account Number (Optional)</Label>
                <Input
                  id="accountNumber"
                  value={config.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="1234567890123456"
                  data-testid="input-account-number"
                />
              </div>

              <div>
                <Label htmlFor="ifscCode">IFSC Code (Optional)</Label>
                <Input
                  id="ifscCode"
                  value={config.ifscCode}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                  placeholder="HDFC0000123"
                  data-testid="input-ifsc"
                />
              </div>

              <div>
                <Label htmlFor="branchName">Branch Name (Optional)</Label>
                <Input
                  id="branchName"
                  value={config.branchName}
                  onChange={(e) => handleInputChange('branchName', e.target.value)}
                  placeholder="Main Branch / City Center"
                  data-testid="input-branch"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-amber-600" />
              How to Get Your UPI ID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">PhonePe</h4>
                <p className="text-blue-700">
                  1. Open PhonePe app<br />
                  2. Go to Profile → Payment Settings<br />
                  3. Find your UPI ID (like: name@ybl)
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Google Pay</h4>
                <p className="text-green-700">
                  1. Open Google Pay app<br />
                  2. Tap profile picture → Settings<br />
                  3. Find your UPI ID (like: name@okaxis)
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">Paytm</h4>
                <p className="text-purple-700">
                  1. Open Paytm app<br />
                  2. Go to Profile → Payment Settings<br />
                  3. Find your UPI ID (like: name@paytm)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-700 hover:to-amber-700 text-white px-8 py-3"
            data-testid="button-save-config"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}