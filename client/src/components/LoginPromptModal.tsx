import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, X, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName?: string;
}

const LoginPromptModal = ({ isOpen, onClose, vendorName }: LoginPromptModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white shadow-2xl border-0 animate-in zoom-in-95 duration-300">
        <CardHeader className="text-center bg-gradient-to-r from-amber-50 to-orange-50 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>

          <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>

          <CardTitle className="text-2xl font-bold text-gray-900">
            Login Required
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 text-center">
          <p className="text-gray-600 mb-6">
            {vendorName 
              ? `To view full details and contact information for ${vendorName}, please login to your account.`
              : "Please log in to view full vendor details and contact options."
            }
          </p>

          <div className="bg-amber-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="font-semibold text-amber-800">Member Benefits</span>
            </div>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• View full vendor profiles & portfolios</li>
              <li>• Get direct contact information</li>
              <li>• First consultation call FREE</li>
              <li>• Save favorite vendors</li>
              <li>• Get personalized recommendations</li>
            </ul>
          </div>

          <div className="flex flex-col space-y-3">
            <Link to="/login" onClick={onClose}>
              <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white">
                <LogIn className="mr-2 h-4 w-4" />
                Login to Continue
              </Button>
            </Link>

            <Link to="/login" onClick={onClose}>
              <Button 
                variant="outline" 
                className="w-full border-amber-200 text-amber-600 hover:bg-amber-50"
              >
                Create New Account
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-gray-500 hover:bg-gray-50"
            >
              Maybe Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPromptModal;