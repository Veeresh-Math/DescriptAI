# 💰 Payment Gateway API Keys Setup Guide
## Complete Guide to Get Razorpay (India) + Stripe (Worldwide) Keys

---

## 🇮🇳 RAZORPAY (For India Payments)

### Step 1: Create Razorpay Account
1. Go to: https://razorpay.com
2. Click **"Sign Up"** (top right)
3. Enter your email and create password
4. Verify email via OTP
5. Complete KYC (Know Your Customer):
   - Business name: "DescriptAI"
   - Business type: "Sole Proprietorship" (if individual) or "Private Limited" (if company)
   - PAN card number
   - Bank account details for settlements

### Step 2: Get API Keys
1. Login to Razorpay Dashboard: https://dashboard.razorpay.com
2. Go to **Settings** → **API Keys** (left sidebar)
3. Click **"Generate Key"**
4. You'll get:
   - **Key ID**: `rzp_test_xxxxxxxxxxxxxx` (for test) or `rzp_live_xxxxxxxxxxxxxx` (for live)
   - **Key Secret**: `xxxxxxxxxxxxxxxxxxxxxxxx`

⚠️ **IMPORTANT**: Copy the Key Secret immediately - it shows only once!

### Step 3: Setup Webhook
1. In Razorpay Dashboard → **Settings** → **Webhooks**
2. Click **"Add New Webhook"**
3. Enter URL: `https://descriptai-tawny.vercel.app/api/webhook/razorpay`
4. Select Events:
   - ✅ `payment.captured`
   - ✅ `order.paid`
5. Click **"Create Webhook"**
6. Copy the **Webhook Secret** from the webhook details

### Step 4: Add to Vercel Environment Variables
```bash
# Add these in Vercel Dashboard → Project → Settings → Environment Variables
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxx
```

---

## 🌍 STRIPE (For Worldwide Payments)

### Step 1: Create Stripe Account
1. Go to: https://stripe.com
2. Click **"Start now"** or **"Sign in"**
3. Enter email and create password
4. Verify email
5. Complete business profile:
   - Business name: "DescriptAI"
   - Business website: `https://descriptai-tawny.vercel.app`
   - Industry: "Software"
   - Country: Your country

### Step 2: Get API Keys
1. Login to Stripe Dashboard: https://dashboard.stripe.com
2. Go to **Developers** → **API keys** (top right)
3. You'll see:
   - **Publishable key**: `pk_test_xxxxxxxxxxxxxxxx` (test) or `pk_live_xxxxxxxxxxxxxxxx` (live)
   - **Secret key**: `sk_test_xxxxxxxxxxxxxxxx` (test) or `sk_live_xxxxxxxxxxxxxxxx` (live)

4. Click **"Reveal test key"** or **"Create secret key"** for live
5. Copy the **Secret key**

### Step 3: Setup Webhook
1. In Stripe Dashboard → **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. Enter endpoint URL: `https://descriptai-tawny.vercel.app/api/webhook/stripe`
4. Select events to listen to:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
5. Click **"Add endpoint"**
6. Click on the created endpoint
7. Click **"Reveal"** next to **Signing secret**
8. Copy the webhook secret: `whsec_xxxxxxxxxxxxxxxx`

### Step 4: Add to Vercel Environment Variables
```bash
# Add these in Vercel Dashboard → Project → Settings → Environment Variables
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
```

---

## 🚀 QUICK SETUP COMMANDS

### Add all environment variables at once:
```bash
cd ../../.gemini/antigravity/scratch/descriptai

# Add Razorpay keys
vercel env add RAZORPAY_KEY_ID
# Enter: rzp_live_xxxxxxxxxxxxxx

vercel env add RAZORPAY_KEY_SECRET
# Enter: xxxxxxxxxxxxxxxxxxxxxxxx

vercel env add RAZORPAY_WEBHOOK_SECRET
# Enter: xxxxxxxxxxxxxxxx

# Add Stripe keys
vercel env add STRIPE_SECRET_KEY
# Enter: sk_live_xxxxxxxxxxxxxxxx

vercel env add STRIPE_WEBHOOK_SECRET
# Enter: whsec_xxxxxxxxxxxxxxxx
```

---

## 📋 CHECKLIST

### Razorpay Setup:
- [ ] Created Razorpay account
- [ ] Completed KYC verification
- [ ] Generated API keys (Key ID + Key Secret)
- [ ] Created webhook endpoint
- [ ] Copied webhook secret
- [ ] Added all 3 keys to Vercel

### Stripe Setup:
- [ ] Created Stripe account
- [ ] Completed business profile
- [ ] Generated Secret key
- [ ] Created webhook endpoint
- [ ] Copied webhook signing secret
- [ ] Added both keys to Vercel

---

## 🧪 TESTING PAYMENTS

### Test Razorpay (India):
1. Use test mode keys: `rzp_test_xxxxxxxxxxxxxx`
2. Test card: `5267 3181 8797 5449`
3. Any future expiry date
4. Any CVV
5. Any 3D Secure OTP: `1234`

### Test Stripe (Worldwide):
1. Use test mode keys: `sk_test_xxxxxxxxxxxxxxxx`
2. Test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any CVV
5. Any ZIP code

---

## 🚨 IMPORTANT NOTES

1. **Test Mode vs Live Mode**:
   - Always test with test keys first
   - Switch to live keys only after testing
   - Live keys start with `rzp_live_` (Razorpay) and `sk_live_` (Stripe)

2. **Webhook URL**:
   - Must be HTTPS (Vercel provides this)
   - Must match exactly: `https://your-domain.com/api/webhook/xxx`

3. **KYC Requirements**:
   - Razorpay requires PAN + Bank account for India
   - Stripe requires business verification for some countries

4. **Settlement**:
   - Razorpay: T+2 days (2 days after payment)
   - Stripe: T+7 days (7 days after payment for new accounts)

---

## 💡 PRO TIPS

1. **Start with Test Mode**: Test everything before going live
2. **Use Vercel Preview URLs**: Test webhooks on preview deployments
3. **Monitor Dashboards**: Check Razorpay/Stripe dashboards for failed payments
4. **Set up Alerts**: Enable email notifications for failed webhooks

---

## 📞 SUPPORT

- **Razorpay Support**: https://razorpay.com/support
- **Stripe Support**: https://support.stripe.com
- **Vercel Support**: https://vercel.com/support

---

**Once you have all keys, add them to Vercel and redeploy!** 🚀

Your payment gateways will be LIVE and ready to accept money from India + Worldwide!
