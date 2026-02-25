# 💳 Payment Setup Template for DescriptAI

Fill in your details below and add to Vercel environment variables.

---

## 🔐 REQUIRED ENVIRONMENT VARIABLES

### For India (Razorpay)
```bash
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
```

### For International (Stripe)
```bash
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### For AI Generation (Groq)
```bash
GROQ_API_KEY=gsk_your_groq_key_here
```

### For Database (Supabase)
```bash
DATABASE_URL=postgresql://your_supabase_url_here
DIRECT_URL=postgresql://your_direct_url_here
```

### For Authentication (Clerk)
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_here
```

---

## 📝 STEP-BY-STEP SETUP GUIDE

### Step 1: Razorpay Setup (For India)

**1. Create Account:**
- Go to: https://dashboard.razorpay.com/
- Sign up with your business email
- Complete KYC (PAN, Bank Account, Business Proof)

**2. Get API Keys:**
- Dashboard → Settings → API Keys
- Click "Generate Key"
- Copy:
  - **Key ID:** `rzp_test_xxxxxxxxxxxxx` (for testing)
  - **Key Secret:** `xxxxxxxxxxxxxxxxxxxxxx`

**3. Add to Vercel:**
```bash
vercel env add RAZORPAY_KEY_ID
vercel env add RAZORPAY_KEY_SECRET
```

---

### Step 2: Stripe Setup (For International)

**1. Create Account:**
- Go to: https://dashboard.stripe.com/
- Sign up and verify email

**2. Get API Keys:**
- Developers → API Keys
- Copy:
  - **Publishable Key:** `pk_test_...`
  - **Secret Key:** `sk_test_...`

**3. Setup Webhook:**
- Developers → Webhooks → Add endpoint
- URL: `https://your-domain.com/api/webhook/stripe`
- Select events: `checkout.session.completed`, `invoice.payment_succeeded`

**4. Add to Vercel:**
```bash
vercel env add STRIPE_SECRET_KEY
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_WEBHOOK_SECRET
```

---

### Step 3: Groq AI Setup

**1. Get API Key:**
- Go to: https://console.groq.com/
- Create account → API Keys
- Copy: `gsk_xxxxxxxxxxxxxxxx`

**2. Add to Vercel:**
```bash
vercel env add GROQ_API_KEY
```

---

### Step 4: Supabase Database

**1. Create Project:**
- Go to: https://supabase.com/
- New Project → Select region closest to you

**2. Get Connection String:**
- Settings → Database → Connection String
- Copy the URI (replace [YOUR-PASSWORD] with your actual password)

**3. Add to Vercel:**
```bash
vercel env add DATABASE_URL
vercel env add DIRECT_URL
```

---

### Step 5: Clerk Authentication

**1. Create Account:**
- Go to: https://dashboard.clerk.com/
- New Application

**2. Get Keys:**
- API Keys section
- Copy:
  - **Publishable Key:** `pk_test_...`
  - **Secret Key:** `sk_test_...`

**3. Add to Vercel:**
```bash
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
```

---

## 🧪 TESTING PAYMENTS

### Test Razorpay (India)
```
Test Card: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
Test UPI: success@razorpay
```

### Test Stripe (International)
```
Test Card: 4242 4242 4242 4242
Expiry: 12/25
CVV: 123
ZIP: 12345
```

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] All environment variables added to Vercel
- [ ] Razorpay account created and verified
- [ ] Stripe account created
- [ ] Groq API key added
- [ ] Supabase database connected
- [ ] Clerk authentication configured
- [ ] Test payment completed successfully
- [ ] Webhook endpoints configured
- [ ] Deploy to production

---

## 💰 PRICING CONFIGURATION

Current pricing in `lib/payments.ts`:

```typescript
export const PRICING = {
  free: { usd: 0, inr: 0 },
  pro: { usd: 19, inr: 1599 },    // ~$19 in INR
  agency: { usd: 49, inr: 3999 }  // ~$49 in INR
};
```

**To change prices:**
1. Edit `lib/payments.ts`
2. Update the amounts
3. Redeploy

---

## 🆘 TROUBLESHOOTING

### Payment not working?
1. Check environment variables in Vercel
2. Verify API keys are correct
3. Check browser console for errors
4. Test with provided test cards

### Webhook not receiving events?
1. Verify webhook URL is correct
2. Check webhook secret matches
3. Ensure endpoint is publicly accessible

### Need help?
- Razorpay Docs: https://razorpay.com/docs/
- Stripe Docs: https://stripe.com/docs
- Groq Docs: https://console.groq.com/docs

---

## ✅ READY TO LAUNCH!

Once you've filled in all the details above:
1. Add all env vars to Vercel
2. Run `vercel --prod` to deploy
3. Test a payment
4. Go live! 🚀

**Your payment setup is complete when:**
- ✅ Test payment succeeds
- ✅ Webhook receives events
- ✅ User gets upgraded after payment
