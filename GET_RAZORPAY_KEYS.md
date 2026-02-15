# 💳 Get Your Razorpay API Keys (For India Payments)

## Quick Steps (3 minutes):

1. **Go to**: https://dashboard.razorpay.com
2. **Sign up** with email/phone (FREE - no monthly fees)
3. **Go to Settings** → **API Keys**
4. **Click "Generate Keys"** for Test mode
5. **Copy** the Key ID (starts with `rzp_`)
6. **Copy** the Key Secret

## Add to Vercel:

Run these commands:
```bash
cd DescriptAI
npx vercel env add RAZORPAY_KEY_ID production
# Paste your Key ID

npx vercel env add RAZORPAY_KEY_SECRET production
# Paste your Key Secret
```

## Current Status:
- ⏳ RAZORPAY_KEY_ID - Need to add
- ⏳ RAZORPAY_KEY_SECRET - Need to add
- ✅ UPI route already created in app

## How Payments Work:
- **Test Mode**: Use test cards (details at razorpay.com/docs)
- **Go Live**: Switch from Test to Live mode in Razorpay dashboard

## Features Enabled:
- ✅ UPI Payments (PhonePe, Google Pay, Paytm)
- ✅ Card Payments
- ✅ Net Banking
- ✅ Wallets

---

**Ready?** Go to https://dashboard.razorpay.com 🚀
