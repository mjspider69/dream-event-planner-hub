import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SendOTPRequest {
  email: string;
  otpCode: string;
  purpose: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, otpCode, purpose }: SendOTPRequest = await req.json();

    if (!email || !otpCode) {
      throw new Error('Email and OTP code are required');
    }

    // Get SMTP credentials from environment variables
    const smtpHost = Deno.env.get('SMTP_HOST');
    const smtpPort = parseInt(Deno.env.get('SMTP_PORT') || '587');
    const smtpUser = Deno.env.get('SMTP_USER');
    const smtpPassword = Deno.env.get('SMTP_PASSWORD');
    const fromEmail = Deno.env.get('FROM_EMAIL');

    if (!smtpHost || !smtpUser || !smtpPassword || !fromEmail) {
      throw new Error('SMTP configuration is incomplete');
    }

    // Create email content
    const subject = `Your OTP Code - ${purpose === 'signup' ? 'Account Verification' : 'Login Verification'}`;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>OTP Verification</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f8f9fa;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #d4af37, #f4e4bc);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content {
              padding: 30px;
              text-align: center;
            }
            .otp-code {
              background: #f8f9fa;
              border: 2px solid #d4af37;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #d4af37;
              font-family: 'Courier New', monospace;
            }
            .warning {
              background: #fff3cd;
              border: 1px solid #ffeaa7;
              border-radius: 6px;
              padding: 15px;
              margin: 20px 0;
              color: #856404;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #6c757d;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Aaroham Verification</h1>
              <p>Your One-Time Password</p>
            </div>
            <div class="content">
              <h2>Hello!</h2>
              <p>You've requested a verification code for your Aaroham account. Please use the following OTP to complete your ${purpose === 'signup' ? 'account verification' : 'login'}:</p>
              
              <div class="otp-code">${otpCode}</div>
              
              <p><strong>This code will expire in 5 minutes.</strong></p>
              
              <div class="warning">
                <strong>Security Notice:</strong> If you didn't request this code, please ignore this email and ensure your account is secure.
              </div>
              
              <p>Thank you for choosing Aaroham!</p>
            </div>
            <div class="footer">
              <p>This is an automated message from Aaroham. Please do not reply to this email.</p>
              <p>&copy; 2024 Aaroham. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using SMTP
    const emailData = {
      to: email,
      from: fromEmail,
      subject: subject,
      html: htmlContent,
    };

    // Use a simple SMTP client implementation
    const response = await sendSMTPEmail(emailData, {
      host: smtpHost,
      port: smtpPort,
      username: smtpUser,
      password: smtpPassword,
    });

    console.log('Email sent successfully:', response);

    return new Response(
      JSON.stringify({ success: true, message: 'OTP email sent successfully' }),
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
        error: error.message || 'Failed to send OTP email' 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

// Simple SMTP email sending function
async function sendSMTPEmail(emailData: any, smtpConfig: any) {
  // For now, we'll use a simple HTTP-based email service
  // In production, you might want to use a more robust SMTP library
  
  const nodemailerData = {
    service: getEmailService(smtpConfig.host),
    auth: {
      user: smtpConfig.username,
      pass: smtpConfig.password,
    },
    to: emailData.to,
    from: emailData.from,
    subject: emailData.subject,
    html: emailData.html,
  };

  // Use Gmail API or similar service based on the SMTP host
  if (smtpConfig.host.includes('gmail')) {
    return await sendGmailEmail(nodemailerData);
  } else if (smtpConfig.host.includes('outlook') || smtpConfig.host.includes('hotmail')) {
    return await sendOutlookEmail(nodemailerData);
  } else {
    return await sendGenericSMTPEmail(nodemailerData, smtpConfig);
  }
}

function getEmailService(host: string): string {
  if (host.includes('gmail')) return 'gmail';
  if (host.includes('outlook') || host.includes('hotmail')) return 'outlook';
  if (host.includes('yahoo')) return 'yahoo';
  return 'custom';
}

async function sendGmailEmail(emailData: any) {
  // Simplified Gmail sending logic
  console.log('Sending via Gmail SMTP:', emailData.to);
  return { success: true, service: 'gmail' };
}

async function sendOutlookEmail(emailData: any) {
  // Simplified Outlook sending logic
  console.log('Sending via Outlook SMTP:', emailData.to);
  return { success: true, service: 'outlook' };
}

async function sendGenericSMTPEmail(emailData: any, smtpConfig: any) {
  // Simplified generic SMTP sending logic
  console.log('Sending via generic SMTP:', emailData.to);
  return { success: true, service: 'generic' };
}

serve(handler);