# Google OAuth Setup Guide

## Step 1: Go to Google Cloud Console
Navigate to: https://console.cloud.google.com/

## Step 2: Create/ Select Project
- If you have a project, select it
- If not, click "New Project" and create one named "DescriptAI"

## Step 3: Enable Google+ API (OAuth)
1. Go to: https://console.cloud.google.com/apis/library
2. Search for "Google+ API" or "People API"
3. Click on it and click "Enable"

## Step 4: Create OAuth Credentials
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: "Web application"
4. Name: "DescriptAI"
5. Authorized redirect URIs: 
   - `https://descriptai-tawny.vercel.app/api/auth/callback/google`
   - (for local dev) `http://localhost:3000/api/auth/callback/google`
6. Click "Create"

## Step 5: Get Credentials
- Copy the **Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)
- Copy the **Client Secret**

## Step 6: Add to Vercel
1. Go to: https://vercel.com/dashboard
2. Click on your DescriptAI project
3. Go to Settings → Environment Variables
4. Add these two variables:
   - `GOOGLE_CLIENT_ID` = [your client ID]
   - `GOOGLE_CLIENT_SECRET` = [your client secret]
5. Click "Save"

## Step 7: Redeploy
1. Go to Deployments in Vercel
2. Click on the latest deployment
3. Click "Redeploy"

## Important: Also Update .env.local
Add these to your local `.env.local` file:
```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

Then push to GitHub to trigger a new deployment.
