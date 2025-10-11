import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, CreditCard, Mail, Phone, Save, Check, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [upiSettings, setUpiSettings] = useState({
    businessUpiId: '',
    businessName: 'Aaroham Events',
    accountHolder: '',
    bankName: ''
  });

  const [emailSettings, setEmailSettings] = useState({
    senderEmail: 'noreply@aaroham.com',
    senderName: 'Aaroham Events',
    useBackupService: true
  });

  const [smsSettings, setSmsSettings] = useState({
    senderName: 'AAROHAM',
    useBackupService: true
  });

  const [testResults, setTestResults] = useState<{
    email: string | null;
    sms: string | null;
    upi: string | null;
  }>({
    email: null,
    sms: null,
    upi: null
  });

  const saveUpiSettings = async () => {
    try {
      // In a real app, this would save to backend
      localStorage.setItem('aaroham_upi_settings', JSON.stringify(upiSettings));
      toast.success('UPI settings saved successfully!');
      setTestResults(prev => ({ ...prev, upi: 'saved' }));
    } catch (error) {
      toast.error('Failed to save UPI settings');
    }
  };

  const testEmailOTP = async () => {
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          purpose: 'test'
        })
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Test email OTP sent successfully!');
        setTestResults(prev => ({ ...prev, email: 'success' }));
        
        // Show OTP in development
        if (result.otpCode) {
          toast.info(`Test OTP Code: ${result.otpCode}`);
        }
      } else {
        toast.error('Email OTP test failed');
        setTestResults(prev => ({ ...prev, email: 'failed' }));
      }
    } catch (error) {
      toast.error('Email OTP test failed');
      setTestResults(prev => ({ ...prev, email: 'failed' }));
    }
  };

  const testSMSOTP = async () => {
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: '+919999999999',
          purpose: 'test'
        })
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Test SMS OTP sent successfully!');
        setTestResults(prev => ({ ...prev, sms: 'success' }));
        
        // Show OTP in development
        if (result.otpCode) {
          toast.info(`Test OTP Code: ${result.otpCode}`);
        }
      } else {
        toast.error('SMS OTP test failed');
        setTestResults(prev => ({ ...prev, sms: 'failed' }));
      }
    } catch (error) {
      toast.error('SMS OTP test failed');
      setTestResults(prev => ({ ...prev, sms: 'failed' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-brand-cream p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-brand-tan bg-gradient-to-br from-brand-cream to-brand-peach/20">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-brand-tan to-brand-peach rounded-full flex items-center justify-center">
                <Settings className="h-6 w-6 text-brand-cream" />
              </div>
              <div>
                <CardTitle className="text-2xl">Platform Settings</CardTitle>
                <p className="text-gray-600">Configure UPI payments and OTP services</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* UPI Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>UPI Payment Configuration</span>
              <Badge variant="secondary">Required</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business-upi">Business UPI ID</Label>
                <Input
                  id="business-upi"
                  value={upiSettings.businessUpiId}
                  onChange={(e) => setUpiSettings(prev => ({ ...prev, businessUpiId: e.target.value }))}
                  placeholder="businessname@bank (e.g., aaroham@sbi)"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Get this from your bank's business banking section
                </p>
              </div>
              
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  value={upiSettings.businessName}
                  onChange={(e) => setUpiSettings(prev => ({ ...prev, businessName: e.target.value }))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="account-holder">Account Holder Name</Label>
                <Input
                  id="account-holder"
                  value={upiSettings.accountHolder}
                  onChange={(e) => setUpiSettings(prev => ({ ...prev, accountHolder: e.target.value }))}
                  placeholder="As per bank records"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input
                  id="bank-name"
                  value={upiSettings.bankName}
                  onChange={(e) => setUpiSettings(prev => ({ ...prev, bankName: e.target.value }))}
                  placeholder="State Bank of India"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button onClick={saveUpiSettings} className="bg-brand-tan hover:bg-brand-dark">
                <Save className="h-4 w-4 mr-2" />
                Save UPI Settings
              </Button>
              
              {testResults.upi === 'saved' && (
                <div className="flex items-center text-brand-tan">
                  <Check className="h-4 w-4 mr-1" />
                  <span className="text-sm">Settings saved</span>
                </div>
              )}
            </div>
            
            {upiSettings.businessUpiId && (
              <div className="bg-brand-peach/20 p-4 rounded-lg border border-brand-peach">
                <h4 className="font-semibold text-brand-dark mb-2">UPI Payment Details</h4>
                <div className="text-sm text-brand-dark space-y-1">
                  <p><strong>UPI ID:</strong> {upiSettings.businessUpiId}</p>
                  <p><strong>Business:</strong> {upiSettings.businessName}</p>
                  <p><strong>Account Holder:</strong> {upiSettings.accountHolder}</p>
                  <p><strong>Bank:</strong> {upiSettings.bankName}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email OTP Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Email OTP Configuration</span>
              <Badge className="bg-brand-tan/20 text-brand-dark">Free Service</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sender-email">Sender Email</Label>
                <Input
                  id="sender-email"
                  value={emailSettings.senderEmail}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, senderEmail: e.target.value }))}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Email address that will send OTP codes
                </p>
              </div>
              
              <div>
                <Label htmlFor="sender-name">Sender Name</Label>
                <Input
                  id="sender-name"
                  value={emailSettings.senderName}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, senderName: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="bg-brand-cream p-4 rounded-lg border border-brand-tan/30">
              <h4 className="font-semibold text-brand-dark mb-2">Free Email OTP Service</h4>
              <p className="text-sm text-brand-dark mb-3">
                Using built-in email service for OTP delivery. No external API keys required for basic functionality.
              </p>
              <div className="flex items-center space-x-4">
                <Button onClick={testEmailOTP} variant="outline" size="sm">
                  Test Email OTP
                </Button>
                
                {testResults.email === 'success' && (
                  <div className="flex items-center text-brand-tan">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-sm">Email working</span>
                  </div>
                )}
                
                {testResults.email === 'failed' && (
                  <div className="flex items-center text-brand-dark">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Email failed</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-brand-peach/20 p-4 rounded-lg border border-brand-tan">
              <h4 className="font-semibold text-brand-dark mb-2">Upgrade to Premium Email</h4>
              <p className="text-sm text-brand-dark/80 mb-2">
                For higher delivery rates and professional branding, add SendGrid API key to Replit secrets.
              </p>
              <p className="text-xs text-brand-dark/70">
                SendGrid offers 100 free emails per day with better deliverability.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SMS OTP Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>SMS OTP Configuration</span>
              <Badge variant="outline">Optional</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sms-sender">SMS Sender Name</Label>
              <Input
                id="sms-sender"
                value={smsSettings.senderName}
                onChange={(e) => setSmsSettings(prev => ({ ...prev, senderName: e.target.value }))}
                className="mt-1"
                maxLength={6}
              />
              <p className="text-sm text-gray-500 mt-1">
                6 characters max (e.g., AAROHA)
              </p>
            </div>
            
            <div className="bg-brand-peach/20 p-4 rounded-lg border border-brand-tan/30">
              <h4 className="font-semibold text-brand-dark mb-2">SMS Service Status</h4>
              <p className="text-sm text-brand-dark/80 mb-3">
                SMS OTP requires Twilio API credentials. Add to Replit secrets for SMS functionality.
              </p>
              <div className="flex items-center space-x-4">
                <Button onClick={testSMSOTP} variant="outline" size="sm">
                  Test SMS OTP
                </Button>
                
                {testResults.sms === 'success' && (
                  <div className="flex items-center text-brand-tan">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-sm">SMS working</span>
                  </div>
                )}
                
                {testResults.sms === 'failed' && (
                  <div className="flex items-center text-brand-dark">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span className="text-sm">SMS not configured</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Required Secrets for SMS</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• TWILIO_ACCOUNT_SID</p>
                <p>• TWILIO_AUTH_TOKEN</p>
                <p>• TWILIO_PHONE_NUMBER</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Service Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-brand-peach/20 rounded-lg">
                <CreditCard className="h-8 w-8 mx-auto text-brand-tan mb-2" />
                <h4 className="font-semibold text-brand-dark">UPI Payments</h4>
                <p className="text-sm text-brand-tan">
                  {upiSettings.businessUpiId ? 'Configured' : 'Needs Setup'}
                </p>
              </div>
              
              <div className="text-center p-4 bg-brand-cream rounded-lg">
                <Mail className="h-8 w-8 mx-auto text-brand-dark mb-2" />
                <h4 className="font-semibold text-brand-dark">Email OTP</h4>
                <p className="text-sm text-brand-dark">Free Service Active</p>
              </div>
              
              <div className="text-center p-4 bg-brand-peach/20 rounded-lg">
                <Phone className="h-8 w-8 mx-auto text-brand-dark mb-2" />
                <h4 className="font-semibold text-brand-dark">SMS OTP</h4>
                <p className="text-sm text-brand-dark">Optional Add-on</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;