
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Camera } from "lucide-react";

interface VendorData {
  business_name?: string;
  category?: string;
  description?: string;
  location?: string;
  price_range?: string;
}

interface VendorProfileProps {
  vendorData: VendorData | null;
  setVendorData: (data: VendorData) => void;
  updateVendorProfile: (data: VendorData) => void;
}

const VendorProfile = ({ vendorData, setVendorData, updateVendorProfile }: VendorProfileProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <Input
                value={vendorData?.business_name || ''}
                onChange={(e) => setVendorData({ ...vendorData, business_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Input
                value={vendorData?.category || ''}
                onChange={(e) => setVendorData({ ...vendorData, category: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              value={vendorData?.description || ''}
              onChange={(e) => setVendorData({ ...vendorData, description: e.target.value })}
              rows={4}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Input
                value={vendorData?.location || ''}
                onChange={(e) => setVendorData({ ...vendorData, location: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <Input
                value={vendorData?.price_range || ''}
                onChange={(e) => setVendorData({ ...vendorData, price_range: e.target.value })}
                placeholder="e.g., ₹50,000 - ₹1,50,000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload your portfolio images</p>
              <Button variant="outline" className="mt-2">
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </div>

          <Button 
            onClick={() => updateVendorProfile(vendorData)}
            className="bg-gradient-to-r from-amber-500 to-orange-500"
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorProfile;
