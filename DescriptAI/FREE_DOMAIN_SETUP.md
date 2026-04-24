# 🚀 Free Custom Domain Setup for DescriptAI

## Option 1: Get Free .tk Domain (dot.tk)

### Step 1: Get Free Domain
1. Go to: https://www.dot.tk
2. Search for your desired name (e.g., `descriptai.tk`)
3. Select `.tk` domain
4. Choose "Free" (12 months)
5. Complete signup with email

### Step 2: Connect to Vercel

**Option A - Using Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Click on your DescriptAI project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter your `.tk` domain (e.g., `descriptai.tk`)
6. Vercel will give you DNS records to add

**Option B - Add DNS records in dot.tk:**
1. In dot.tk, go to **Manage Domain** → **DNS**
2. Add these records:

```
Type: A
Name: @
Value76.76: .21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Wait for Propagation
- DNS changes can take 1-24 hours
- Once verified, your site will be live at your custom domain!

---

## Option 2: Cheap .com Domain (~$5/year)

If .tk domains don't work well, get a cheap .com:

1. Go to **Namecheap.com** or **GoDaddy**
2. Search for desired domain
3. Buy .com for ~$5-10/year
4. Connect to Vercel same way as above

---

## Current Status
- **Live URL:** https://descriptai-tawny.vercel.app
- **Custom Domain:** (Add your free .tk domain here)

Vercel custom domains are **FREE** - you only pay for the domain registrar!
