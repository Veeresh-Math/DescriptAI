# Google OAuth Setup Guide - COMPLETE

## Step 1: Get Your Client Secret
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click on your OAuth 2.0 Client ID (you created this earlier)
3. Copy the **Client secret** (it starts with "GOCSPX-")

## Step 2: Add to Vercel (CRITICAL!)
Go to: https://vercel.com/dashboard → DescriptAI project → Settings → Environment Variables

Add these 3 variables:
| Variable | Value |
|----------|-------|
| GOOGLE_CLIENT_ID | 924239282728-atm5gm46haqrg9k9uq9bscefcheph9ci.apps.googleusercontent.com |
| GOOGLE_CLIENT_SECRET | [PASTE YOUR CLIENT SECRET HERE] |
| NEXTAUTH_SECRET | IONrbU2lancyGjHd9wugk7JhW8EBXpFf |

**Important:** Click "Save" after adding each variable.

## Step 3: Redeploy
1. Go to Deployments in Vercel
2. Click the latest deployment
3. Click "Redeploy" (this ensures new env vars are used)

## Step 4: Test
After 2-3 minutes, go to https://descriptai-tawny.vercel.app/sign-in and try clicking "Continue with Google"

---

The code is ready - you just need to paste your Google Client Secret into Vercel!

# TRIGGER DEPLOY
