import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, RefreshCw, ArrowLeft, CheckCircle, Clock, Phone } from "lucide-react";
import { useOTP } from "@/hooks/useOTP";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface OTPVerificationProps {
  email: string;
  phone?: string;
  purpose?: string;
  userData?: any;
  userType?: string;
  onSuccess: () => void;
  onBack: () => void;
}

const OTPVerification = ({ 
  email, 
  phone, 
  purpose = 'signup', 
  userData = {},
  userType = 'customer',
  onSuccess, 
  onBack 
}: OTPVerificationProps) => {
  const [otpCode, setOtpCode] = useState<string[]>(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const { verifyOTP, sendOTP, loading } = useOTP();
  const { signUp } = useAuth();
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

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedCode = value.slice(0, 6);
      const newOtpCode = [...otpCode];
      for (let i = 0; i < pastedCode.length; i++) {
        if (index + i < 6) {
          newOtpCode[index + i] = pastedCode[i];
        }
      }
      setOtpCode(newOtpCode);
      
      // Focus next available input or verify if complete
      const nextIndex = Math.min(index + pastedCode.length, 5);
      inputRefs.current[nextIndex]?.focus();
      
      if (newOtpCode.every(digit => digit !== '')) {
        handleVerifyOTP(newOtpCode.join(''));
      }
      return;
    }

    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtpCode = [...otpCode];
    newOtpCode[index] = value;
    setOtpCode(newOtpCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newOtpCode.every(digit => digit !== '')) {
      handleVerifyOTP(newOtpCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (codeToVerify?: string) => {
    const code = codeToVerify || otpCode.join('');
    
    console.log(`🔐 Attempting to verify OTP: ${code} for ${email}`);
    
    if (code.length !== 6) {
      toast.error('Please enter a complete 6-digit code');
      return;
    }

    try {
      console.log(`🔐 Calling verifyOTP with: email=${email}, code=${code}, phone=${phone}, purpose=${purpose}`);
      const result = await verifyOTP(email, code, phone, purpose);
      console.log(`🔐 OTP verification result:`, result);
      
      if (purpose === 'signup') {
        // Complete registration process
        const registrationData = {
          email,
          fullName: userData.fullName,
          phone: userData.phone,
          city: userData.city,
          userType,
          businessName: userData.businessName,
          category: userData.category,
        };

        await signUp(email, userData.password || 'temp-password', registrationData);
      }
      
      setIsVerified(true);
      toast.success('Verification successful!');
      setTimeout(() => {
        onSuccess();
      }, 1500);
      
    } catch (error: any) {
      console.error('OTP verification failed:', error);
      toast.error(error.message || 'Invalid verification code');
      // Clear the code on error
      setOtpCode(Array(6).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || resendCount >= 3) return;

    try {
      console.log(`🔄 Resending OTP to ${email}, phone: ${phone}`);
      await sendOTP(email, phone, purpose);
      setTimeLeft(300);
      setCanResend(false);
      setResendCount(prev => prev + 1);
      setOtpCode(Array(6).fill(''));
      inputRefs.current[0]?.focus();
      toast.success('New verification code sent!');
    } catch (error: any) {
      console.error('Resend OTP failed:', error);
      toast.error(error.message || 'Failed to resend code');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isVerified) {
    return (
      <Card className="w-full max-w-md mx-auto premium-card">
        <CardContent className="text-center py-8">
          <div className="mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Verified Successfully!</h3>
          <p className="text-muted-foreground">Your account has been verified and you'll be redirected shortly.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto premium-card">
      <CardHeader className="text-center">
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-4"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        
        <CardTitle className="text-2xl font-heading text-foreground">
          Verify Your Account
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          We've sent a 6-digit verification code to:
        </p>
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-primary" />
            <span className="font-medium">{email}</span>
          </div>
          {phone && (
            <div className="flex items-center justify-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span className="font-medium">+91 {phone}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* OTP Input */}
        <div className="space-y-4">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otpCode.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={e => handleInputChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-semibold border-2 rounded-lg focus:border-primary focus:outline-none transition-colors bg-background"
                disabled={loading || isVerified}
              />
            ))}
          </div>
          
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              {timeLeft > 0 ? `Code expires in ${formatTime(timeLeft)}` : 'Code expired'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => handleVerifyOTP()}
            disabled={loading || otpCode.some(digit => !digit) || isVerified}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Didn't receive the code?
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResendOTP}
              disabled={!canResend || resendCount >= 3 || loading}
              className="text-primary"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              {resendCount >= 3 ? 'Max attempts reached' : 'Resend Code'}
            </Button>
            {resendCount > 0 && resendCount < 3 && (
              <p className="text-xs text-muted-foreground mt-1">
                {3 - resendCount} attempts remaining
              </p>
            )}
          </div>
        </div>

        {/* Security Note */}
        <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded-lg">
          🔒 This code is valid for 5 minutes and can only be used once for security.
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;