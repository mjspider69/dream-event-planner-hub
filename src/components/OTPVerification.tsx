
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Shield, RefreshCw } from "lucide-react";
import { useOTP } from "@/hooks/useOTP";
import { toast } from "sonner";

interface OTPVerificationProps {
  email: string;
  phone?: string;
  purpose?: string;
  onVerified: () => void;
  onCancel: () => void;
}

const OTPVerification = ({ 
  email, 
  phone, 
  purpose = 'signup', 
  onVerified, 
  onCancel 
}: OTPVerificationProps) => {
  const [otpCode, setOtpCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const { sendOTP, verifyOTP, loading } = useOTP();

  useState(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  });

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    const result = await verifyOTP(email, otpCode, purpose);
    if (result.success) {
      onVerified();
    }
  };

  const handleResendOTP = async () => {
    const result = await sendOTP(email, phone, purpose);
    if (result.success) {
      setTimeLeft(300);
      setOtpCode('');
      toast.success('New OTP sent successfully!');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
          Verify OTP
        </CardTitle>
        <p className="text-gray-600">
          We've sent a 6-digit code to {email}
          {phone && ` and ${phone}`}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter OTP Code
          </label>
          <Input
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="123456"
            className="text-center text-lg tracking-widest"
            maxLength={6}
          />
        </div>

        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-600">
              Code expires in <span className="font-semibold text-amber-600">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-red-600">OTP has expired</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResendOTP}
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Resend OTP
              </Button>
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerifyOTP}
            disabled={loading || otpCode.length !== 6 || timeLeft === 0}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Verify OTP
          </Button>
        </div>

        {timeLeft > 0 && (
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResendOTP}
              disabled={loading || timeLeft > 240} // Allow resend after 1 minute
            >
              Didn't receive code? Resend
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OTPVerification;
