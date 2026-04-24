# 🚨 Cron Job PrismaClientInitializationError - Fix Guide

## Problem Diagnosis

The cron job at `/api/cron/keep-alive` is failing with:
```
PrismaClientInitializationError: P1001: Can't reach database server
```

**Root Cause**: The `DATABASE_URL` points to a non-existent or unreachable Supabase host:
- Current URL: `db.uxsvsznvjkuxlfdxxxco.supabase.co`
- DNS Resolution: **FAILED** - Host not found

This means either:
1. The Supabase project was deleted
2. The project reference is incorrect
3. The project exists but in a different region with a different hostname

---

## ✅ Solution: Update Your DATABASE_URL

### Step 1: Get Your Correct Supabase Connection String

1. **Go to [Supabase.com](https://supabase.com)** and sign in
2. **Select your project** (or create a new one if the old one was deleted)
3. **Go to Project Settings** → **Database** → **Connection String**
4. **Copy the URI** format connection string

It should look like:
```
postgresql://postgres:[YOUR_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
```

**Important**: Replace `[YOUR_PASSWORD]` with your actual database password.

### Step 2: Update Environment Variables

#### ⚠️ CRITICAL: Use the Connection Pooler URL (Not the Direct DB URL)

Your Supabase dashboard provides **two connection strings**:
1. **Direct DB URL**: `db.uxsvsznvjkuxlfdxxxco.supabase.co:5432` (may only resolve to IPv6)
2. **Connection Pooler URL**: `aws-1-ap-south-1.pooler.supabase.com:5432` (IPv4-compatible, **use this!**)

**Why Pooler?** The direct DB hostname may only resolve to IPv6, which many ISPs block. The pooler URL resolves to IPv4 and is optimized for serverless functions.

#### Option A: Update in Vercel Dashboard (Production)
```bash
# Set the DATABASE_URL in Vercel
npx vercel env add DATABASE_URL production
# Paste the POOLER connection string (not the direct db URL)
```

#### Option B: Update Local `.env` File (Development)
Edit `DescriptAI/.env`:
```bash
# POOLER URL format (IMPORTANT: use pooler.supabase.com, not db.supabase.co)
DATABASE_URL=postgresql://postgres.uxsvsznvjkuxlfdxxxco:YOUR_PASSWORD@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?connect_timeout=30&pool_timeout=15
```

**Parameters explained**:
- `connect_timeout=30`: Gives waking database up to 30 seconds to respond
- `pool_timeout=15`: Connection pool timeout (15 seconds is optimal for Supabase)

**Note**: The pooler URL already includes transaction pooling, so `pgbouncer=true` is not needed in the query parameters.

**Connection Pool Size**: 
- **Recommended: 15** (not 30) for Supabase free tier
- Pool size is controlled by Supabase's PgBouncer configuration
- Adjust in Supabase Dashboard → Database → Connection Pooling if needed

### Step 3: Redeploy to Vercel

```bash
cd DescriptAI
npx vercel --prod
```

---

## 🔧 What Was Fixed in the Code

### 1. Updated `lib/db.ts`
- Kept simple singleton pattern to prevent multiple Prisma instances
- Added graceful shutdown handling

### 2. Enhanced Cron Job (`app/api/cron/keep-alive/route.ts`)
- **Retry Logic**: 3 attempts with exponential backoff (5s, 10s, 15s)
- **Error Classification**: Distinguishes between DNS, timeout, auth, and unreachable errors
- **Diagnostic Hints**: Returns specific guidance in the JSON response
- **Duration Tracking**: Logs how long each attempt takes

### 3. Updated `vercel.json`
- Increased function timeout from 10s to **30 seconds**
- Allows time for paused database to wake up

### 4. Updated `vercel-env.txt` Template
- Added `?pgbouncer=true&connect_timeout=30` to DATABASE_URL
- **pgbouncer=true**: Required for serverless transaction pooling
- **connect_timeout=30**: Gives waking database up to 30 seconds

---

## 🧪 Testing the Fix

### Test 1: Check Database Connection Locally
```bash
cd DescriptAI
node test-connection.js
```

Expected output:
```
Testing database connection...
✓ Database connection successful!
  Users count: X
  Duration: XXXms
```

### Test 2: Test Cron Endpoint Locally
```bash
cd DescriptAI
npx next dev
# In another terminal:
curl http://localhost:3000/api/cron/keep-alive
```

Expected output:
```json
{
  "status": "ok",
  "message": "Database keep-alive ping successful",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "duration": "XXXms"
}
```

### Test 3: Check Vercel Cron Logs
```bash
npx vercel logs --all
```

Look for:
```
[Keep-Alive] Database ping successful in XXXms
```

---

## 📊 Understanding Error Types

The improved error handler now returns specific error types:

| Error Type | Meaning | Solution |
|------------|---------|----------|
| `DNS_FAILURE` | Host cannot be resolved | **Fix DATABASE_URL** - project reference is wrong |
| `CONNECTION_TIMEOUT` | Database took too long to respond | Database may be paused. Wait and retry |
| `AUTH_FAILURE` | Password/credentials wrong | Check database password in DATABASE_URL |
| `DATABASE_UNREACHABLE` | Network issue | Check Supabase project status, firewall rules |
| `UNKNOWN_ERROR` | Other error | Check logs for details |

---

## ⚠️ Common Pitfalls

### 1. Special Characters in Password
If your Supabase password contains special characters (`@`, `:`, `/`, etc.), you **must URL-encode them**:

- `@` → `%40`
- `:` → `%3A`
- `/` → `%2F`

Example:
```
# Bad (will fail):
postgresql://postgres:my@pass:word@db.xxx.supabase.co:5432/postgres

# Good:
postgresql://postgres:my%40pass%3Aword@db.xxx.supabase.co:5432/postgres
```

### 2. Using the Wrong Connection String
- **Use URI format**, NOT the "Host" format
- The URI starts with `postgresql://`
- Do NOT use the connection pooler URL from Supabase (we add `?pgbouncer=true` ourselves)

### 3. Database Paused (Supabase Free Tier)
- Free tier databases pause after 1-3 days of inactivity
- The keep-alive cron prevents this
- First connection after pause takes 10-30 seconds (our 30s timeout handles this)

### 4. Region Mismatch
If your Vercel app is in a different region than your Supabase database, latency can cause timeouts. Choose a Supabase region close to your Vercel deployment region.

---

## 📝 Summary of Changes

| File | Change | Purpose |
|------|--------|---------|
| `lib/db.ts` | Singleton pattern + graceful shutdown | Prevent multiple Prisma instances in serverless |
| `app/api/cron/keep-alive/route.ts` | Retry logic + error classification | Handle waking database and provide diagnostics |
| `vercel.json` | `maxDuration: 30` | Give cron job enough time to complete |
| `vercel-env.txt` | Added `?pgbouncer=true&connect_timeout=30` | Optimize for serverless + extended timeout |
| `.env` | Updated DATABASE_URL with correct parameters | Local development configuration |

---

## 🆘 Need More Help?

1. **Check your Supabase project is active**: https://supabase.com/dashboard
2. **Verify connection string**: Copy fresh from Supabase dashboard
3. **Test connection locally**: `node test-connection.js`
4. **Check Vercel logs**: `npx vercel logs --all`
5. **Open Supabase SQL Editor**: Run `SELECT 1;` to verify database is responsive

---

**Status**: Code fixes implemented. **Action required**: Update `DATABASE_URL` with correct Supabase connection string.
