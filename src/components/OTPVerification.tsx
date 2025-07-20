import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, RefreshCw, ArrowLeft, CheckCircle, Clock } from "lucide-react";
import { useOTP } from "@/hooks/useOTP";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  const [otpCode, setOtpCode] = useState<string[]>(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isVerified, setIsVerified] = useState(false);
  const { sendOTP, verifyOTP, loading } = useOTP();
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

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
  }, [timeLeft]);

  const handleVerifyOTP = async () => {
    const otpString = otpCode.join('');
    if (!otpString || otpString.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    const result = await verifyOTP(email, otpString, purpose);
    if (result.success) {
      setIsVerified(true);
      toast.success('Email verified successfully!');
      setTimeout(() => {
        onVerified();
      }, 1500);
    }
  };

  const handleResendOTP = async () => {
    const result = await sendOTP(email, phone, purpose);
    if (result.success) {
      setTimeLeft(300);
      setOtpCode(Array(6).fill(''));
      inputRefs.current[0]?.focus();
      toast.success('New OTP sent successfully!');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    const newValue = value.replace(/\D/g, '');
    if (newValue.length > 1) return;

    const newOtpCode = [...otpCode];
    newOtpCode[index] = newValue;
    setOtpCode(newOtpCode);

    // Auto-focus next input
    if (newValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtpCode = Array(6).fill('');
    for (let i = 0; i < pastedData.length; i++) {
      newOtpCode[i] = pastedData[i];
    }
    setOtpCode(newOtpCode);
    if (pastedData.length === 6) {
      inputRefs.current[5]?.focus();
    } else if (pastedData.length > 0) {
      inputRefs.current[pastedData.length - 1]?.focus();
    }
  };

  if (isVerified) {
    return (
      <Card className="w-full max-w-md mx-auto luxury-card animate-scale-in">
        <CardContent className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-br from-royal-gold to-warm-gold rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
            <CheckCircle className="h-10 w-10 text-pearl-white" />
          </div>
          <CardTitle className="text-2xl font-playfair text-gradient-gold mb-4">
            Verification Successful!
          </CardTitle>
          <p className="text-charcoal-gray">
            Your email has been verified successfully. Redirecting...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto luxury-card animate-fade-in-up">
      <CardHeader className="text-center pb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="absolute top-4 left-4 text-charcoal-gray hover:text-royal-gold"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <div className="w-20 h-20 bg-gradient-to-br from-royal-gold to-warm-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Mail className="h-10 w-10 text-pearl-white" />
        </div>
        
        <CardTitle className="text-3xl font-playfair text-gradient-gold mb-2">
          Verify Your Email
        </CardTitle>
        
        <p className="text-charcoal-gray/80 font-poppins">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-royal-gold font-semibold font-poppins">
          {email}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-charcoal-gray mb-4 text-center">
            Enter Verification Code
          </label>
          <div className="flex justify-center space-x-3" onPaste={handlePaste}>
            {otpCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold border-2 border-soft-sand rounded-lg focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 outline-none transition-all duration-200 bg-pearl-white text-charcoal-gray"
                maxLength={1}
                disabled={loading}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          {timeLeft > 0 ? (
            <div className="flex items-center justify-center space-x-2 text-charcoal-gray/70">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Code expires in <span className="font-semibold text-royal-gold">{formatTime(timeLeft)}</span>
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-600 font-medium">OTP has expired</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResendOTP}
                disabled={loading}
                className="border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-pearl-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Get New Code
              </Button>
            </div>
          )}
        </div>

        <Button
          onClick={handleVerifyOTP}
          disabled={loading || otpCode.some(digit => !digit) || timeLeft === 0}
          className="w-full luxury-button h-12 text-lg font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Verifying...
            </>
          ) : (
            'Verify Code'
          )}
        </Button>

        {timeLeft > 0 && (
          <div className="text-center">
            <p className="text-sm text-charcoal-gray/70 mb-2">
              Didn't receive the code?
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResendOTP}
              disabled={loading || timeLeft > 240} // Allow resend after 1 minute
              className="text-royal-gold hover:text-deep-gold hover:bg-light-gold font-medium"
            >
              Resend Code
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OTPVerification;