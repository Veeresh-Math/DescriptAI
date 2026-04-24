# 🚨 URGENT - Rotate Your Exposed Keys!

Your API keys were exposed in Git commits. You MUST rotate them immediately:

## 1. Google OAuth (Highest Priority)
1. Go to: https://console.cloud.google.com
2. APIs & Services → Credentials
3. Delete the OAuth Client ID shown in GitHub error
4. Create NEW credentials
5. Update Vercel with new keys

## 2. Groq API Key
1. Go to: https://console.groq.com
2. API Keys → Delete the exposed key
3. Create NEW key
4. Update Vercel env vars

## 3. HuggingFace Token
1. Go to: https://huggingface.co/settings/tokens
2. Delete old token
3. Generate NEW token

## 4. Razorpay Keys
1. Go to: https://dashboard.razorpay.com
2. Settings → API Keys
3. Regenerate keys

## 5. NEXTAUTH_SECRET
Generate new: 
```bash
openssl rand -base64 32
```

---

## After Rotating Keys:

### Option A: Fix Current Repo
1. Go to: https://github.com/Veeresh-Math/DescriptAI/security/secret-scanning
2. Click "Unblock" on each secret
3. Run: `git push -u des main`

### Option B: Create New Repo (Recommended)
1. Delete old repo or create new one
2. Push clean code:
```bash
git remote set-url des https://github.com/YOUR_NEW_REPO.git
git push -u des main
```

---

## ⚠️ Important
- The exposed keys are ALREADY blocked by GitHub
- They cannot be used by attackers
- But you should still rotate them for safety
- Never commit API keys to Git! Use .env files
