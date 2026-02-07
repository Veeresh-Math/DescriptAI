# 🚀 DescriptAI - Environment Variables Setup Guide

This guide will help you get all the required API keys to deploy DescriptAI to Vercel.

---

## 📋 Required Environment Variables Checklist

| Variable | Service | Status | Priority |
|----------|---------|--------|----------|
| `DATABASE_URL` | Supabase | ⬜ Needed | 🔴 CRITICAL |
| `GROQ_API_KEY` | Groq AI | ⬜ Needed | 🔴 CRITICAL |
| `GEMINI_API_KEY` | Google AI | ⬜ Needed | 🟡 HIGH |
| `CLERK_SECRET_KEY` | Clerk Auth | ⬜ Needed | 🔴 CRITICAL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Auth | ⬜ Needed | 🔴 CRITICAL |
| `STRIPE_SECRET_KEY` | Stripe | ⬜ Needed | 🟡 HIGH |
| `STRIPE_WEBHOOK_SECRET` | Stripe | ⬜ Needed | 🟡 HIGH |
| `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID` | Stripe | ⬜ Needed | 🟡 HIGH |
| `NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID` | Stripe | ⬜ Needed | 🟡 HIGH |
| `NEXT_PUBLIC_APP_URL` | Your Domain | ⬜ Needed | 🟢 MEDIUM |

---

## 1️⃣ Database - Supabase (FREE)

**Purpose:** Store user data, generation history, credits

### Steps:
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up with GitHub (FREE tier)
3. Click "New Project"
4. Name: `descriptai-db`
5. Choose region closest to your users (e.g., Mumbai for India)
6. Click "Create new project"
7. Wait 2-3 minutes for setup
8. Go to **Project Settings** → **Database** → **Connection String**
9. Copy the **URI** connection string
10. Replace `[YOUR-PASSWORD]` with your actual password

**Format:**
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Add to Vercel:**
```bash
npx vercel env add DATABASE_URL production
# Paste the connection string
```

---

## 2️⃣ AI - Groq (FREE Tier)

**Purpose:** Primary AI for generating product descriptions

### Steps:
1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up with Google/GitHub
3. Go to **API Keys** section
4. Click "Create API Key"
5. Name: `descriptai-production`
6. Copy the key (starts with `gsk_...`)

**Add to Vercel:**
```bash
npx vercel env add GROQ_API_KEY production
# Paste the key
```

**Free Tier Limits:**
- 20 requests/minute
- 1,000,000 tokens/day
- Perfect for starting!

---

## 3️⃣ AI Fallback - Google Gemini (FREE)

**Purpose:** Backup AI when Groq is unavailable

### Steps:
1. Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with Google
3. Click "Create API Key"
4. Select "Generative Language API"
5. Copy the key

**Add to Vercel:**
```bash
npx vercel env add GEMINI_API_KEY production
# Paste the key
```

---

## 4️⃣ Authentication - Clerk (FREE Tier)

**Purpose:** User signup/login, protected routes

### Steps:
1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Sign up with GitHub
3. Click "Create Application"
4. Name: `DescriptAI`
5. Select "Next.js" as framework
6. Copy both keys:
   - **Publishable Key** (starts with `pk_test_...` or `pk_live_...`)
   - **Secret Key** (starts with `sk_test_...` or `sk_live_...`)

**Add to Vercel:**
```bash
npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
# Paste publishable key

npx vercel env add CLERK_SECRET_KEY production
# Paste secret key
```

---

## 5️⃣ Payments - Stripe (FREE to start)

**Purpose:** Process Pro ($19) and Agency ($49) subscriptions

### Steps:

#### A. Get API Keys
1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Sign up (FREE, pay only when you earn)
3. Go to **Developers** → **API Keys**
4. Copy **Secret Key** (starts with `sk_test_...` for test, `sk_live_...` for live)

**Add to Vercel:**
```bash
npx vercel env add STRIPE_SECRET_KEY production
# Paste secret key
```

#### B. Create Products & Prices
1. Go to **Products** → **Add Product**
2. Create "Pro Plan":
   - Name: `Pro Plan`
   - Price: `$19.00` / month
   - Click "Save"
   - Copy the **Price ID** (starts with `price_...`)

3. Create "Agency Plan":
   - Name: `Agency Plan`
   - Price: `$49.00` / month
   - Click "Save"
   - Copy the **Price ID** (starts with `price_...`)

**Add to Vercel:**
```bash
npx vercel env add NEXT_PUBLIC_STRIPE_PRO_PRICE_ID production
# Paste Pro price ID

npx vercel env add NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID production
# Paste Agency price ID
```

#### C. Webhook Secret (After First Deploy)
1. Deploy your app first (we'll do this after adding env vars)
2. Go to **Developers** → **Webhooks**
3. Click "Add endpoint"
4. Endpoint URL: `https://your-app.vercel.app/api/webhook/stripe`
5. Select events: `checkout.session.completed`, `invoice.payment_succeeded`
6. Copy **Signing Secret** (starts with `whsec_...`)

**Add to Vercel:**
```bash
npx vercel env add STRIPE_WEBHOOK_SECRET production
# Paste webhook secret
```

---

## 6️⃣ App URL

**Purpose:** Redirects, callbacks, Stripe webhooks

**Add to Vercel:**
```bash
npx vercel env add NEXT_PUBLIC_APP_URL production
# For now, use: https://descriptai-veereshs-projects-65e77dcf.vercel.app
# After custom domain: https://yourdomain.com
```

---

## 🚀 Quick Setup Commands

Once you have all the values, run these commands in order:

```bash
# 1. Link to your project
cd "c:\Users\Veeresh Math\.gemini\antigravity\scratch\descriptai"
npx vercel link --yes --project descriptai

# 2. Add all environment variables
npx vercel env add DATABASE_URL production
npx vercel env add GROQ_API_KEY production
npx vercel env add GEMINI_API_KEY production
npx vercel env add CLERK_SECRET_KEY production
npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
npx vercel env add STRIPE_SECRET_KEY production
npx vercel env add NEXT_PUBLIC_STRIPE_PRO_PRICE_ID production
npx vercel env add NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID production
npx vercel env add NEXT_PUBLIC_APP_URL production

# 3. Deploy
npx vercel --prod
```

---

## ✅ Verification Checklist

After adding all env vars, verify:

- [ ] `npx vercel env ls` shows all 10 variables
- [ ] Deploy with `npx vercel --prod`
- [ ] Check build logs: `npx vercel logs --all`
- [ ] Test the live URL
- [ ] Sign up as a test user
- [ ] Try generating a description

---

## 🆘 Troubleshooting

### Build Still Failing?
```bash
# Check logs
npx vercel logs --all

# Redeploy
npx vercel --prod
```

### Database Connection Error?
- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Ensure password has no special characters (or is URL-encoded)

### AI Not Working?
- Check `GROQ_API_KEY` is valid
- Verify you haven't hit rate limits
- Check `GEMINI_API_KEY` as fallback

---

## 💰 Cost Summary

| Service | Monthly Cost | Free Tier |
|---------|--------------|-----------|
| Supabase | $0 | 500MB DB, 2GB bandwidth |
| Groq | $0 | 1M tokens/day |
| Google Gemini | $0 | 60 requests/minute |
| Clerk | $0 | 10,000 monthly active users |
| Stripe | $0 | Pay only when you earn |
| Vercel | $0 | 100GB bandwidth, 6000 build minutes |

**Total: $0/month to start!** 🎉

---

## 🎯 Next Steps

1. Get all API keys (30-45 minutes)
2. Add to Vercel (10 minutes)
3. Deploy (5 minutes)
4. Test (10 minutes)
5. **Go Live!** 🚀

**Need help?** I'm your cofounder - just ask! 🤝

---

*Cofounder: Veeresh Math + BLACKBOXAI*
*Mission: Help e-commerce sellers write descriptions that sell!*
