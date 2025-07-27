# UPI and API Services Setup Guide for Aaroham Platform

## UPI Payment Setup

### Current Configuration
- **UPI ID**: aaroham@upi (currently placeholder)
- **Payment Method**: Direct UPI transfer
- **Supported Apps**: All UPI-enabled apps (PhonePe, Google Pay, Paytm, etc.)

### Steps to Configure Your UPI ID:
1. **Get your business UPI ID** from your bank or payment provider
2. **Update the UPI ID** in the payment component
3. **Test payments** with small amounts

### To Update UPI ID:
Replace `aaroham@upi` with your actual UPI ID in:
- `client/src/components/PaymentIntegration.tsx` (line 36, 170)

## SendGrid Email Service Setup

### Step 1: Create SendGrid Account
1. Go to https://sendgrid.com
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### Step 2: Get API Key
1. Go to Settings > API Keys
2. Click "Create API Key"
3. Choose "Full Access" or "Restricted Access" with Mail Send permissions
4. Copy the API key (starts with SG.)

### Step 3: Domain Verification (Recommended)
1. Go to Settings > Sender Authentication
2. Add your domain (e.g., aaroham.com)
3. Follow DNS verification steps
4. Update the sender email in the code from 'noreply@aaroham.com' to your verified domain

### Step 4: Add API Key to Replit
- Add `SENDGRID_API_KEY` to your Replit secrets

## Twilio SMS Service Setup

### Step 1: Create Twilio Account
1. Go to https://twilio.com
2. Sign up for a free account ($15 credit)
3. Verify your phone number

### Step 2: Get Credentials
1. Go to Console Dashboard
2. Copy these values:
   - **Account SID** (starts with AC)
   - **Auth Token** (click to reveal)

### Step 3: Get Phone Number
1. Go to Phone Numbers > Manage > Buy a number
2. Choose a number from your country
3. Copy the phone number (format: +1234567890)

### Step 4: Add Credentials to Replit
- Add `TWILIO_ACCOUNT_SID`
- Add `TWILIO_AUTH_TOKEN` 
- Add `TWILIO_PHONE_NUMBER`

## Cost Estimates

### SendGrid
- **Free Tier**: 100 emails/day
- **Essentials**: $14.95/month for 50,000 emails
- **Pro**: $89.95/month for 100,000 emails

### Twilio SMS
- **Free Trial**: $15 credit
- **Pay-as-you-go**: ~$0.0075 per SMS in India
- **Example**: 1000 SMS = ~$7.50

## Testing Checklist

### Email OTP Testing:
- [ ] SendGrid API key added to secrets
- [ ] Domain verified (optional but recommended)
- [ ] Test email sending with signup flow
- [ ] Check spam folder if emails not received

### SMS OTP Testing:
- [ ] Twilio credentials added to secrets
- [ ] Phone number purchased and added
- [ ] Test SMS sending with signup flow
- [ ] Verify SMS delivery to different carriers

### UPI Payment Testing:
- [ ] Update UPI ID to your actual business UPI
- [ ] Test payment flow from different devices
- [ ] Verify UPI apps can open payment URL
- [ ] Test manual payment with provided details

## Production Recommendations

1. **Email Setup**:
   - Use authenticated domain for better deliverability
   - Set up DKIM and SPF records
   - Monitor bounce and spam rates

2. **SMS Setup**:
   - Register sender ID for better delivery rates
   - Set up delivery reports
   - Consider SMS templates for compliance

3. **UPI Setup**:
   - Use business UPI ID
   - Set up payment confirmation webhooks
   - Implement payment verification system

4. **Security**:
   - Rotate API keys regularly
   - Monitor usage and costs
   - Set up alerts for high usage

## Support Contacts

- **SendGrid Support**: https://support.sendgrid.com
- **Twilio Support**: https://support.twilio.com
- **UPI Issues**: Contact your bank's business support

---

**Note**: The current system has fallbacks to console logging during development, so OTP codes will appear in server logs if API keys are not configured.