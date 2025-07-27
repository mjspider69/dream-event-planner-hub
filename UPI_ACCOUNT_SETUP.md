# UPI Account Setup for Aaroham Platform

## How UPI Payments Work

UPI (Unified Payments Interface) doesn't require API keys. Instead, it uses your **Business UPI ID** directly for receiving payments.

## Where Money Will Be Received

Money will be received in the **bank account linked to your business UPI ID**.

## Steps to Get Your Business UPI ID:

### Option 1: Business Bank Account UPI
1. **Contact your bank** (SBI, HDFC, ICICI, etc.)
2. **Request business UPI ID** for your company account
3. **Format**: Usually `businessname@bankname` (e.g., `aaroham@sbi`, `aarohamevents@hdfc`)
4. **Link it** to your business current account

### Option 2: Payment Service Providers
1. **Razorpay**: Get UPI ID through Razorpay business account
2. **PayU**: Business UPI through PayU
3. **Paytm Business**: Business UPI ID
4. **PhonePe Business**: Business UPI for merchants

### Option 3: Popular Business UPI Providers
- **Google Pay Business**: `businessname@gpay`
- **PhonePe Business**: `businessname@ybl`
- **Paytm Business**: `businessname@paytm`

## Current Configuration Location

The UPI ID is configured in: `client/src/components/PaymentIntegration.tsx`

**Line 36**: 
```javascript
const businessUpiId = 'your-business@upi'; // Replace this
```

## What to Replace:

1. **Replace** `'your-business@upi'` with your actual business UPI ID
2. **Example**: `'aarohamevents@sbi'` or `'aaroham@paytm'`

## Example Configuration:

```javascript
// Replace this line in PaymentIntegration.tsx
const businessUpiId = 'aarohamevents@sbi'; // Your actual UPI ID
```

## Testing Your UPI Setup:

1. **Get your business UPI ID** from bank/provider
2. **Update the code** with your real UPI ID
3. **Test small payment** (₹1) to verify
4. **Check your bank account** for payment receipt

## Important Notes:

- **No API keys needed** for basic UPI
- **Money goes directly** to your linked bank account
- **Instant settlements** (usually within minutes)
- **Lower transaction fees** compared to card payments
- **Works with all UPI apps** (GPay, PhonePe, Paytm, etc.)

## Security:

- UPI ID is **safe to share publicly**
- **No sensitive credentials** required in code
- **Bank handles** all security and fraud protection

## Next Steps:

1. Contact your bank for business UPI ID
2. Update the UPI ID in the code
3. Test with small amount
4. Go live with real payments

---

**Need Help?**
- Contact your bank's business support
- Most banks provide business UPI within 24-48 hours
- Some payment providers offer instant business UPI setup