import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

interface SendOTPRequest {
  email: string;
  otpCode: string;
  purpose: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('OTP Email function called with method:', req.method);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    const requestBody = await req.json();
    console.log('Request body received:', requestBody);

    const { email, otpCode, purpose }: SendOTPRequest = requestBody;

    if (!email || !otpCode) {
      throw new Error('Email and OTP code are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Validate OTP format
    if (!/^\d{6}$/.test(otpCode)) {
      throw new Error('OTP must be a 6-digit number');
    }

    console.log('Sending OTP email to:', email, 'with code:', otpCode, 'for purpose:', purpose);

    // Create enhanced email content
    const subject = `🔐 Your Aaroham Verification Code - ${getPurposeTitle(purpose)}`;
    const htmlContent = createEmailTemplate(email, otpCode, purpose);

    // For development/demo purposes, we'll simulate email sending
    // In production, integrate with actual email service (SendGrid, AWS SES, etc.)
    
    console.log('Email would be sent with subject:', subject);
    console.log('Email content length:', htmlContent.length);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Log the OTP for development purposes (remove in production)
    console.log(`📧 OTP Email Sent to ${email}: ${otpCode}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP email sent successfully',
        email: email,
        purpose: purpose,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-otp-email function:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send OTP email',
        details: 'Please check your email address and try again.',
        timestamp: new Date().toISOString()
      }),
      {
        status: 400,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

function getPurposeTitle(purpose: string): string {
  switch (purpose) {
    case 'signup': return 'Welcome to Aaroham!';
    case 'login': return 'Secure Login';
    case 'password_reset': return 'Password Reset';
    case 'vendor_signup': return 'Vendor Registration';
    default: return 'Verification Required';
  }
}

function createEmailTemplate(email: string, otpCode: string, purpose: string): string {
  const purposeMessages = {
    signup: 'Welcome to Aaroham! We\'re excited to have you join our premium event planning community.',
    login: 'Please use this code to complete your secure login to Aaroham.',
    password_reset: 'You requested to reset your password. Use this code to proceed.',
    vendor_signup: 'Thank you for joining Aaroham as a vendor partner. Complete your registration with this code.'
  };

  const message = purposeMessages[purpose as keyof typeof purposeMessages] || 'Please verify your account with this code.';

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Aaroham - Email Verification</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Poppins', Arial, sans-serif;
            line-height: 1.6;
            color: #2E2E2E;
            background: linear-gradient(135deg, #FAF9F6 0%, #EDE6D6 50%, #F9E9E1 100%);
            margin: 0;
            padding: 20px;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #FAF9F6;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(212, 175, 55, 0.15);
            overflow: hidden;
            border: 2px solid #EDE6D6;
          }
          
          .header {
            background: linear-gradient(135deg, #D4AF37 0%, #f4e4bc 50%, #D4AF37 100%);
            color: #FAF9F6;
            padding: 40px 30px;
            text-align: center;
            position: relative;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
            pointer-events: none;
          }
          
          .header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
          }
          
          .header p {
            font-size: 16px;
            font-weight: 400;
            opacity: 0.95;
            position: relative;
            z-index: 1;
          }
          
          .content {
            padding: 40px 30px;
            text-align: center;
          }
          
          .greeting {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            color: #D4AF37;
            margin-bottom: 20px;
            font-weight: 600;
          }
          
          .message {
            font-size: 16px;
            color: #2E2E2E;
            margin-bottom: 30px;
            line-height: 1.7;
          }
          
          .otp-container {
            background: linear-gradient(135deg, #FAF9F6 0%, #EDE6D6 100%);
            border: 3px solid #D4AF37;
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
            position: relative;
          }
          
          .otp-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 500;
          }
          
          .otp-code {
            font-family: 'Courier New', monospace;
            font-size: 42px;
            font-weight: bold;
            letter-spacing: 12px;
            color: #D4AF37;
            margin: 10px 0;
            text-shadow: 2px 2px 4px rgba(212, 175, 55, 0.3);
          }
          
          .otp-timer {
            font-size: 14px;
            color: #666;
            margin-top: 15px;
            font-weight: 500;
          }
          
          .security-notice {
            background: linear-gradient(135deg, #FFF3CD 0%, #FFEAA7 100%);
            border: 1px solid #D4AF37;
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
            color: #856404;
            font-size: 14px;
            line-height: 1.6;
          }
          
          .security-notice strong {
            color: #D4AF37;
            font-weight: 600;
          }
          
          .footer {
            background: #EDE6D6;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #D4AF37;
          }
          
          .footer p {
            margin: 8px 0;
          }
          
          .brand-name {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            color: #D4AF37;
            font-size: 16px;
          }
          
          .divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, #D4AF37, transparent);
            margin: 20px 0;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 16px;
            }
            
            .header {
              padding: 30px 20px;
            }
            
            .header h1 {
              font-size: 28px;
            }
            
            .content {
              padding: 30px 20px;
            }
            
            .otp-code {
              font-size: 36px;
              letter-spacing: 8px;
            }
            
            .footer {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>🌟 Aaroham</h1>
            <p>Premium Event Planning & Wedding Services</p>
          </div>
          
          <div class="content">
            <div class="greeting">${getPurposeTitle(purpose)}</div>
            
            <p class="message">${message}</p>
            
            <div class="otp-container">
              <div class="otp-label">Your Verification Code</div>
              <div class="otp-code">${otpCode}</div>
              <div class="otp-timer">⏱️ Expires in 5 minutes</div>
            </div>
            
            <div class="divider"></div>
            
            <div class="security-notice">
              <strong>🔒 Security Notice:</strong><br>
              This code is confidential and should not be shared with anyone. 
              If you didn't request this verification, please ignore this email 
              and ensure your account is secure.
            </div>
            
            <p style="margin-top: 30px; color: #D4AF37; font-weight: 500;">
              Thank you for choosing <span class="brand-name">Aaroham</span> for your special moments!
            </p>
          </div>
          
          <div class="footer">
            <p><strong>This is an automated message from Aaroham.</strong></p>
            <p>Please do not reply to this email.</p>
            <div class="divider" style="margin: 15px 0;"></div>
            <p>&copy; 2024 <span class="brand-name">Aaroham</span>. All rights reserved.</p>
            <p>Premium Event Planning & Wedding Services</p>
            <p>Email: aaroham.net@gmail.com | Phone: +91 769 888 9321</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

serve(handler);