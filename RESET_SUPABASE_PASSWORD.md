# 🔑 How to Reset/Get Your Supabase Database Password

## Option 1: Check Your Supabase Dashboard (Easiest)

1. Go to https://app.supabase.com
2. Sign in with your GitHub/Google account
3. Click on your project: `descriptai-db` (or whatever you named it)
4. Go to **Project Settings** (gear icon on left sidebar)
5. Click **Database** tab
6. Under **Connection Info**, you'll see:
   - Host: `db.uxsvsznvjkuxlfdxxxco.supabase.co`
   - Database: `postgres`
   - Port: `5432`
   - User: `postgres`
   - **Password**: Click "Reveal" or "Reset"

## Option 2: Reset Password (If You Can't Find It)

1. In Supabase Dashboard → Project Settings → Database
2. Click **"Reset Database Password"**
3. Enter a new password (save it somewhere safe!)
4. Click **Save**
5. Copy the new password

## Option 3: Check Your Local .env File

If you have the project running locally, check:
- `.env` file in your project root
- `.env.local` file
- Any notes you saved

## 📝 Once You Have the Password

Your complete DATABASE_URL will be:
```
postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.uxsvsznvjkuxlfdxxxco.supabase.co:5432/postgres
```

**Example:**
```
postgresql://postgres:MySecurePass123!@db.uxsvsznvjkuxlfdxxxco.supabase.co:5432/postgres
```

## ⚠️ Important

After resetting the password:
1. **Save it immediately** in a password manager or secure note
2. **Update Vercel** with the new DATABASE_URL
3. **Local development** will also need the new password

---

**Need help?** I can walk you through it step-by-step! 🤝
