import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, RefreshCw, ArrowLeft, CheckCircle, Clock, Phone } from "lucide-react";
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
  const [otpCode, setOtpCode] = useState<string[]>(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const { verifyOTP, resendOTP, loading } = useOTP();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
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

    try {
      const result = await verifyOTP(email, otpString, purpose, phone);
      if (result.success) {
        setIsVerified(true);
        toast.success('Verification successful!');
        setTimeout(() => {
          onVerified();
        }, 1500);
      } else {
        // Clear OTP inputs on failure
        setOtpCode(Array(6).fill(''));
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setOtpCode(Array(6).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendOTP = async () => {
    if (resendCount >= 3) {
      toast.error('Maximum resend attempts reached. Please try again later.');
      return;
    }

    try {
      const result = await resendOTP(email, phone, purpose);
      if (result.success) {
        setTimeLeft(300);
        setCanResend(false);
        setResendCount(prev => prev + 1);
        setOtpCode(Array(6).fill(''));
        inputRefs.current[0]?.focus();
        toast.success('New OTP sent successfully!');
      }
    } catch (error) {
      console.error('OTP resend error:', error);
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
    if (e.key === 'Enter') {
      handleVerifyOTP();
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
      // Auto-verify if complete OTP is pasted
      setTimeout(() => {
        handleVerifyOTP();
      }, 100);
    } else if (pastedData.length > 0) {
      inputRefs.current[pastedData.length - 1]?.focus();
    }
  };

  if (isVerified) {
    return (
      <Card className="w-full max-w-md mx-auto luxury-card animate-scale-in">
        <CardContent className="text-center py-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600 mb-4">
            Verification Successful!
          </CardTitle>
          <p className="text-gray-600">
            Your {email ? 'email' : 'phone'} has been verified successfully. Redirecting...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl border-0 animate-in zoom-in-95 duration-300">
      <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-amber-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="absolute top-4 left-4 text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          {email ? <Mail className="h-10 w-10 text-white" /> : <Phone className="h-10 w-10 text-white" />}
        </div>
        
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent mb-2">
          Verify Your {email ? 'Email' : 'Phone'}
        </CardTitle>
        
        <p className="text-gray-600">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-blue-600 font-semibold">
          {email || phone}
        </p>
        {email && phone && (
          <p className="text-sm text-gray-500 mt-1">
            Check both your email and SMS messages
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            Enter Verification Code
          </label>
          <div className="flex justify-center space-x-3" onPaste={handlePaste}>
            {otpCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white"
                maxLength={1}
                disabled={loading}
                autoComplete="one-time-code"
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          {timeLeft > 0 && !canResend ? (
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Code expires in <span className="font-semibold text-blue-600">{formatTime(timeLeft)}</span>
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-600 font-medium">
                {timeLeft === 0 ? 'OTP has expired' : 'Didn\'t receive the code?'}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResendOTP}
                disabled={loading || resendCount >= 3}
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {resendCount >= 3 ? 'Max attempts reached' : 'Resend Code'}
              </Button>
              {resendCount > 0 && resendCount < 3 && (
                <p className="text-xs text-gray-500">
                  Resent {resendCount}/3 times
                </p>
              )}
            </div>
          )}
        </div>

        <Button
          onClick={handleVerifyOTP}
          disabled={loading || otpCode.some(digit => !digit)}
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600"
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

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Two-Way Verification</span>
          </div>
          <p className="text-sm text-blue-700">
            {email && phone 
              ? 'We\'ve sent the same code to both your email and phone for enhanced security.'
              : email 
              ? 'Verification code sent to your email address.'
              : 'Verification code sent to your phone number.'
            }
          </p>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Having trouble? Contact our support team for assistance.
        </p>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;