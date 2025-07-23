
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Phone, Mail, Users } from "lucide-react";

interface ConsentFormProps {
  onSubmit: (consents: ConsentData) => void;
  onCancel: () => void;
}

interface ConsentData {
  acceptTerms: boolean;
  acceptVendorPolicies: boolean;
  acceptCommunication: boolean;
  shareDetailsWithVendors: boolean;
  acceptPromotions: boolean;
}

const ConsentForm = ({ onSubmit, onCancel }: ConsentFormProps) => {
  const [consents, setConsents] = useState<ConsentData>({
    acceptTerms: false,
    acceptVendorPolicies: false,
    acceptCommunication: false,
    shareDetailsWithVendors: false,
    acceptPromotions: false
  });

  const handleConsentChange = (key: keyof ConsentData, value: boolean) => {
    setConsents(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = consents.acceptTerms && 
                    consents.acceptVendorPolicies && 
                    consents.acceptCommunication && 
                    consents.shareDetailsWithVendors;

  const handleSubmit = () => {
    if (canProceed) {
      onSubmit(consents);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full bg-white shadow-2xl border-0 max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Consent & Agreement</CardTitle>
          <p className="text-gray-600">Please review and accept the following terms before proceeding with payment</p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Mandatory Consents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-600 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Mandatory Agreements
            </h3>

            <div className="space-y-4 bg-red-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms"
                  checked={consents.acceptTerms}
                  onCheckedChange={(checked) => handleConsentChange('acceptTerms', checked === true)}
                />
                <div className="text-sm">
                  <label htmlFor="terms" className="font-medium cursor-pointer">
                    I accept Aaroham's Terms & Conditions and Privacy Policy *
                  </label>
                  <p className="text-gray-600 mt-1">
                    By checking this box, you agree to our platform's terms of service and privacy practices.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="vendor-policies"
                  checked={consents.acceptVendorPolicies}
                  onCheckedChange={(checked) => handleConsentChange('acceptVendorPolicies', checked === true)}
                />
                <div className="text-sm">
                  <label htmlFor="vendor-policies" className="font-medium cursor-pointer">
                    I acknowledge vendor-specific cancellation and refund policies *
                  </label>
                  <p className="text-gray-600 mt-1">
                    Each vendor may have different cancellation and refund terms which will be clearly communicated.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="communication"
                  checked={consents.acceptCommunication}
                  onCheckedChange={(checked) => handleConsentChange('acceptCommunication', checked === true)}
                />
                <div className="text-sm">
                  <label htmlFor="communication" className="font-medium cursor-pointer">
                    I agree to receive communication via phone and email *
                  </label>
                  <p className="text-gray-600 mt-1 flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    <Mail className="h-4 w-4 mr-1" />
                    For booking updates, event coordination, and important notifications.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="share-details"
                  checked={consents.shareDetailsWithVendors}
                  onCheckedChange={(checked) => handleConsentChange('shareDetailsWithVendors', checked === true)}
                />
                <div className="text-sm">
                  <label htmlFor="share-details" className="font-medium cursor-pointer">
                    I consent to sharing my contact details with selected vendors *
                  </label>
                  <p className="text-gray-600 mt-1 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Required for vendors to coordinate directly with you for your event.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Consents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Optional Preferences
            </h3>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="promotions"
                  checked={consents.acceptPromotions}
                  onCheckedChange={(checked) => handleConsentChange('acceptPromotions', checked === true)}
                />
                <div className="text-sm">
                  <label htmlFor="promotions" className="font-medium cursor-pointer">
                    I'd like to receive promotional offers and event recommendations
                  </label>
                  <p className="text-gray-600 mt-1">
                    Get notified about special deals, seasonal packages, and new vendors in your area.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Your Data is Secure</span>
            </div>
            <p className="text-sm text-gray-600">
              We use industry-standard encryption to protect your personal information. 
              Your data will only be used as specified in these consent agreements.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!canProceed}
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white"
            >
              Accept & Proceed to Payment
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            * Required fields must be accepted to proceed with booking
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentForm;
