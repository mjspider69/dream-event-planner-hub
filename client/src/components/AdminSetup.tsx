import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Check, AlertTriangle, Copy } from 'lucide-react';
import { toast } from 'sonner';

const AdminSetup = () => {
  const [upiId, setUpiId] = useState('your-business@upi');
  const [senderEmail, setSenderEmail] = useState('noreply@aaroham.com');
  
  const setupSteps = [
    {
      title: 'UPI Payment Setup',
      status: 'pending',
      description: 'Configure your business UPI ID for payments',
      action: 'Update UPI ID in payment component'
    },
    {
      title: 'SendGrid Email Service',
      status: 'pending', 
      description: 'Set up email OTP delivery',
      action: 'Add SENDGRID_API_KEY to secrets'
    },
    {
      title: 'Twilio SMS Service',
      status: 'pending',
      description: 'Set up SMS OTP delivery', 
      action: 'Add Twilio credentials to secrets'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const apiKeyExamples = {
    sendgrid: 'SG.xxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    twilio_sid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    twilio_token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    twilio_phone: '+1234567890'
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Aaroham Platform Setup</CardTitle>
              <p className="text-gray-600">Configure UPI payments and OTP services</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* UPI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>1. UPI Payment Configuration</span>
            <Badge variant="secondary">Required</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="upi-id">Business UPI ID</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                id="upi-id"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="business@bankname"
                className="flex-1"
              />
              <Button 
                onClick={() => copyToClipboard(upiId)}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Get this from your bank's business banking section or payment provider
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Update Required:</h4>
            <p className="text-sm text-blue-700">
              Replace 'your-business@upi' in <code>PaymentIntegration.tsx</code> with your actual UPI ID
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SendGrid Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>2. SendGrid Email Setup</span>
            <Badge variant="secondary">For Email OTP</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Steps:</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside text-gray-600">
                <li>Create account at sendgrid.com</li>
                <li>Get API key from Settings → API Keys</li>
                <li>Add SENDGRID_API_KEY to Replit secrets</li>
                <li>Verify sender domain (optional)</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">API Key Format:</h4>
              <div className="bg-gray-100 p-2 rounded text-xs font-mono">
                {apiKeyExamples.sendgrid}
              </div>
              <Button 
                onClick={() => copyToClipboard(apiKeyExamples.sendgrid)}
                variant="outline" 
                size="sm" 
                className="mt-2"
              >
                Copy Example
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="sender-email">Sender Email</Label>
            <Input
              id="sender-email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="noreply@yourdomain.com"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Use your verified domain for better deliverability
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Twilio Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>3. Twilio SMS Setup</span>
            <Badge variant="secondary">For SMS OTP</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Required Secrets:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>TWILIO_ACCOUNT_SID</span>
                  <Button 
                    onClick={() => copyToClipboard('TWILIO_ACCOUNT_SID')}
                    variant="ghost" 
                    size="sm"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>TWILIO_AUTH_TOKEN</span>
                  <Button 
                    onClick={() => copyToClipboard('TWILIO_AUTH_TOKEN')}
                    variant="ghost" 
                    size="sm"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>TWILIO_PHONE_NUMBER</span>
                  <Button 
                    onClick={() => copyToClipboard('TWILIO_PHONE_NUMBER')}
                    variant="ghost" 
                    size="sm"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Example Values:</h4>
              <div className="space-y-2 text-xs">
                <div className="bg-gray-100 p-2 rounded font-mono">
                  {apiKeyExamples.twilio_sid}
                </div>
                <div className="bg-gray-100 p-2 rounded font-mono">
                  {apiKeyExamples.twilio_token}
                </div>
                <div className="bg-gray-100 p-2 rounded font-mono">
                  {apiKeyExamples.twilio_phone}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Cost Notice:</h4>
                <p className="text-sm text-yellow-700">
                  Twilio charges per SMS (~$0.0075 per message in India). Free trial includes $15 credit.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Section */}
      <Card>
        <CardHeader>
          <CardTitle>4. Testing Your Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">UPI Testing</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Test payment flow</li>
                <li>• Verify UPI app opening</li>
                <li>• Check manual payment details</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Email Testing</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Try signup with email</li>
                <li>• Check spam folder</li>
                <li>• Verify OTP delivery</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">SMS Testing</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Test with phone signup</li>
                <li>• Check SMS delivery</li>
                <li>• Verify different carriers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Check className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Ready to Go!</h3>
              <p className="text-gray-600">
                Once you've added the API keys and updated the UPI ID, your Aaroham platform will have fully functional OTP and payment systems.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;