# 🔐 Complete Environment Variables Setup - DescriptAI

**Goal:** Enable ALL features (AI generation, Database, Payments, Auth)  
**Time Required:** 15-20 minutes  
**Status:** REQUIRED for full functionality

---

## 📋 Required Environment Variables

Create file: `../../.gemini/antigravity/scratch/descriptai/.env.local`

```env
# ==========================================
# 1. DATABASE (Supabase) - REQUIRED
# ==========================================
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# ==========================================
# 2. AI APIs - REQUIRED for generation
# ==========================================
GROQ_API_KEY="gsk_[YOUR_GROQ_KEY]"
HF_API_KEY="hf_[YOUR_HF_KEY]"

# ==========================================
# 3. AUTHENTICATION (Clerk) - REQUIRED
# ==========================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_[YOUR_CLERK_KEY]"
CLERK_SECRET_KEY="sk_test_[YOUR_CLERK_KEY]"

# ==========================================
# 4. APP CONFIGURATION
# ==========================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# ==========================================
# 5. PAYMENTS - Stripe (Worldwide)
# ==========================================
STRIPE_SECRET_KEY="sk_test_[YOUR_STRIPE_KEY]"
STRIPE_PUBLISHABLE_KEY="pk_test_[YOUR_STRIPE_KEY]"
STRIPE_WEBHOOK_SECRET="whsec_[YOUR_WEBHOOK_SECRET]"

# ==========================================
# 6. PAYMENTS - Razorpay (India)
# ==========================================
RAZORPAY_KEY_ID="rzp_test_[YOUR_RAZORPAY_KEY]"
RAZORPAY_KEY_SECRET="[YOUR_RAZORPAY_SECRET]"
```

---

## 🔧 Step-by-Step Setup Guide

### STEP 1: Supabase Database (5 minutes)

**Why:** Store user data, generations, presets, history

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Enter:
   - **Organization:** Your name/company
   - **Project Name:** `descriptai-production`
   - **Database Password:** Create strong password (SAVE THIS!)
   - **Region:** Choose closest to your users (e.g., Mumbai for India, US East for USA)
4. Click "Create New Project" (takes 2-3 minutes)

**Get Database URL:**
1. In your Supabase dashboard, go to **Settings** → **Database**
2. Find "Connection string" section
3. Select **URI** format
4. Copy the string: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
5. Replace `[PASSWORD]` with your actual database password

**Add to .env.local:**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
```

**Test Database:**
```bash
cd ../../.gemini/antigravity/scratch/descriptai
npx prisma db push
```

---

### STEP 2: Groq AI API (3 minutes)

**Why:** AI content generation (primary engine)

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up with Google/GitHub/email
3. Click **"API Keys"** in left sidebar
4. Click **"Create API Key"**
5. Name it: `descriptai-production`
6. Copy the key (starts with `gsk_`)

**Add to .env.local:**
```env
GROQ_API_KEY="gsk_YOUR_KEY_HERE"
```

**Free Tier:** 1,000,000 tokens/day (generous!)

---

### STEP 3: Hugging Face API (2 minutes)

**Why:** Backup AI engine + image processing

1. Go to [https://huggingface.co](https://huggingface.co)
2. Sign up for free account
3. Click your profile → **Settings**
4. Go to **Access Tokens**
5. Click **"New Token"**
6. Name: `descriptai`
7. Role: `read`
8. Copy token (starts with `hf_`)

**Add to .env.local:**
```env
HF_API_KEY="hf_YOUR_TOKEN_HERE"
```

---

### STEP 4: Clerk Authentication (5 minutes)

**Why:** User signup/login, protected routes

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Click **"Create Application"**
3. Name: `DescriptAI`
4. Select sign-in methods:
   - ✅ Email
   - ✅ Google (recommended)
   - ✅ GitHub (optional)
5. Click **"Create"**

**Get Keys:**
1. In Clerk dashboard, go to **API Keys**
2. Copy **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Copy **Secret Key** (starts with `sk_test_` or `sk_live_`)

**Add to .env.local:**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_YOUR_KEY"
CLERK_SECRET_KEY="sk_test_YOUR_KEY"
```

**Configure Redirect URLs:**
1. In Clerk dashboard, go to **URLs & Endpoints**
2. Add these URLs:
   - `http://localhost:3000/sign-up`
   - `http://localhost:3000/sign-in`
   - `https://your-domain.com/sign-up` (for production)
   - `https://your-domain.com/sign-in` (for production)

---

### STEP 5: Stripe Payments (5 minutes)

**Why:** Process payments worldwide

1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Sign up for account
3. Complete verification (takes 1-2 days for full activation)

**Get API Keys:**
1. In Stripe dashboard, go to **Developers** → **API Keys**
2. Copy **Publishable Key** (starts with `pk_test_`)
3. Click **"Reveal"** next to **Secret Key** (starts with `sk_test_`)

**Add to .env.local:**
```env
STRIPE_SECRET_KEY="sk_test_YOUR_SECRET_KEY"
STRIPE_PUBLISHABLE_KEY="pk_test_YOUR_PUBLISHABLE_KEY"
```

**Create Products:**
1. Go to **Products** → **Add Product**
2. Create "Pro Plan":
   - Name: `Pro`
   - Price: `$19.00`
   - Recurring: Monthly
3. Create "Agency Plan":
   - Name: `Agency`
   - Price: `$49.00`
   - Recurring: Monthly
4. Copy the **Price IDs** (starts with `price_`)

**Update Pricing Page:**
Edit `app/pricing/page.tsx` and replace:
```typescript
const PRO_PRICE_ID = "price_YOUR_PRO_PRICE_ID"
const AGENCY_PRICE_ID = "price_YOUR_AGENCY_PRICE_ID"
```

**Setup Webhook:**
1. In Stripe dashboard, go to **Developers** → **Webhooks**
2. Click **"Add Endpoint"**
3. Endpoint URL: `https://your-domain.com/api/webhook/stripe`
4. Select events:
   - ✅ `checkout.session.completed`
   - ✅ `invoice.payment_succeeded`
   - ✅ `customer.subscription.deleted`
5. Click **"Add Endpoint"**
6. Copy **Signing Secret** (starts with `whsec_`)

**Add to .env.local:**
```env
STRIPE_WEBHOOK_SECRET="whsec_YOUR_SECRET"
```

---

### STEP 6: Razorpay Payments (India) (3 minutes)

**Why:** Accept UPI, NetBanking, Cards in India

1. Go to [https://dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Sign up for account
3. Complete KYC verification

**Get API Keys:**
1. In Razorpay dashboard, go to **Settings** → **API Keys**
2. Click **"Generate Key"**
3. Copy **Key ID** (starts with `rzp_test_`)
4. Copy **Key Secret**

**Add to .env.local:**
```env
RAZORPAY_KEY_ID="rzp_test_YOUR_KEY_ID"
RAZORPAY_KEY_SECRET="YOUR_KEY_SECRET"
```

**Setup Webhook:**
1. Go to **Settings** → **Webhooks**
2. Click **"Add New Webhook"**
3. URL: `https://your-domain.com/api/webhook/razorpay`
4. Select events:
   - ✅ `payment.captured`
   - ✅ `subscription.charged`
5. Copy **Secret** for verification

---

## ✅ Verification Checklist

After adding all environment variables:

### 1. Restart Server
```bash
cd ../../.gemini/antigravity/scratch/descriptai
# Stop current server (Ctrl+C)
npm run dev
```

### 2. Test Database Connection
- [ ] Visit `http://localhost:3000/history`
- [ ] Should show empty state (not error)

### 3. Test AI Generation
- [ ] Visit `http://localhost:3000/generate`
- [ ] Enter product name and features
- [ ] Click "Generate"
- [ ] Should get AI-generated descriptions

### 4. Test Keywords
- [ ] On generate page, click "Get Suggestions"
- [ ] Should show SEO keywords

### 5. Test Presets
- [ ] Create a brand voice preset
- [ ] Should save successfully
- [ ] Should appear in dropdown

### 6. Test Auth
- [ ] Click "Sign In"
- [ ] Should redirect to Clerk
- [ ] Should be able to login

---

## 🚨 Common Issues & Fixes

### Issue: "DATABASE_URL not found"
**Fix:** 
1. Check `.env.local` file exists in project root
2. Verify URL format: `postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres`
3. Restart server after adding env vars

### Issue: "GROQ_API_KEY missing"
**Fix:**
1. Get key from https://console.groq.com
2. Add to `.env.local`: `GROQ_API_KEY="gsk_..."`
3. Restart server

### Issue: "Clerk authentication failed"
**Fix:**
1. Check both keys are added:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
2. Verify redirect URLs in Clerk dashboard
3. Make sure you're using `pk_test_` for development

### Issue: "Stripe checkout not working"
**Fix:**
1. Use test keys (start with `pk_test_`, `sk_test_`)
2. Verify webhook endpoint is configured
3. Check browser console for errors

---

## 📊 Feature Status After Setup

| Feature | Without Env Vars | With Env Vars |
|---------|------------------|---------------|
| AI Generation | ⚠️ Fallback templates | ✅ Full Groq AI |
| Database | ❌ Not working | ✅ Full functionality |
| History | ❌ Empty | ✅ Saves generations |
| Presets | ⚠️ Empty list | ✅ Save/load presets |
| Keywords | ⚠️ Generic | ✅ AI-generated |
| Auth | ⚠️ Dev mode | ✅ Real users |
| Payments | ❌ Not working | ✅ Stripe/Razorpay |
| Social Media Kit | ⚠️ Basic | ✅ Full features |
| SEO Heatmap | ⚠️ Static | ✅ Dynamic |

---

## 🎯 Next Steps After Setup

1. ✅ **Test all features** - Go through each page
2. ✅ **Create test user** - Sign up and test flow
3. ✅ **Test payments** - Use Stripe test cards
4. ✅ **Verify emails** - Check Clerk email templates
5. ✅ **Ready to deploy** - Push to Vercel

---

## 💡 Pro Tips

1. **Use different keys for dev/prod:**
   - Development: `pk_test_`, `sk_test_`
   - Production: `pk_live_`, `sk_live_`

2. **Never commit .env.local:**
   ```bash
   echo ".env.local" >> .gitignore
   ```

3. **Backup your keys:**
   - Save in password manager (1Password, Bitwarden)
   - Don't lose them!

4. **Test payments with Stripe:**
   - Card: `4242 4242 4242 4242`
   - Date: Any future date
   - CVC: Any 3 digits

---

## 🚀 You're Ready!

Once all environment variables are added:
- **All features will work** ✅
- **Database will connect** ✅
- **AI will generate** ✅
- **Payments will process** ✅
- **Users can signup** ✅

**Add the env vars and let me know! I'll verify everything works!** 🎉
