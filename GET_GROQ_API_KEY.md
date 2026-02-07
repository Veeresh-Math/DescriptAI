# 🔑 Get Your Groq API Key (FREE - 1M tokens/day)

## Quick Steps (2 minutes):

1. **Go to**: https://console.groq.com
2. **Sign up** with Google/GitHub (FREE)
3. **Click "API Keys"** in left sidebar
4. **Click "Create API Key"**
5. **Name it**: "DescriptAI Production"
6. **Copy the key** (starts with `gsk_`)

## Add to Vercel:

Once you have the key, run:
```bash
cd "C:\Users\Veeresh Math\.gemini\antigravity\scratch\descriptai"
npx vercel env add GROQ_API_KEY production
# Paste your key when prompted
```

## Current Status:
✅ DATABASE_URL - Added to Vercel
⏳ GROQ_API_KEY - Need to add (for AI generation)
⏳ Other env vars - Can add later

## Can We Deploy Now?
**YES!** With just DATABASE_URL, the app will:
- ✅ Load pages correctly
- ✅ Connect to database
- ✅ Show UI properly
- ❌ AI generation will fail (needs GROQ_API_KEY)

**Recommendation**: Get the Groq key (2 mins) then deploy. The AI is the main feature!

---

**Ready to get your key?** Go to https://console.groq.com 🚀
