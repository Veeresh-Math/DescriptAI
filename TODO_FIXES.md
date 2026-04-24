# DescriptAI Critical Fixes TODO

## Issues Found & Fix Plan

### 1. Presets API - Testing Bypass Left in Production
- **File:** `app/api/presets/route.ts`
- **Fix:** Remove `// TEMPORARILY ALLOW FOR ALL TIERS FOR TESTING` blocks. Enforce Agency-only (403 for non-Agency).

### 2. Keywords API - Testing Bypass Left in Production
- **File:** `app/api/keywords/route.ts`
- **Fix:** Remove `// TEMPORARILY ALLOW FOR ALL TIERS FOR TESTING` blocks. Enforce Pro+ access (403 for Free).

### 3. Generate API - Credit System Disabled
- **File:** `app/api/generate/route.ts`
- **Fix:**
  - Add credit deduction logic (shortCredits/mediumCredits) before generation
  - Block Free users when credits exhausted
  - Keep monthly generation limit as secondary guard

### 4. Generate API - Agency Instructions Unused
- **File:** `app/api/generate/route.ts`
- **Fix:** Inject `agencyInstructions` and `tierComplexityInstructions` into `systemPrompt`.

### 5. Payment Gateway - Stripe Removed
- **File:** `lib/payments.ts`
- **Fix:** Add `stripe` gateway option. Detect based on country param (India=Razorpay, else=Stripe).

### 6. History API - No DB Fallback
- **File:** `app/api/history/route.ts`
- **Fix:** Add try-catch with empty array fallback for GET. Add JSON error response for POST.

### 7. Authentication - Only Google OAuth
- **Files:** `app/api/auth/[...nextauth]/route.ts`, `lib/auth-server.ts`, `app/sign-in/page.tsx`, `app/sign-up/page.tsx`
- **Fix:** Add GitHub OAuth and Email/Password (Credentials) providers. Update Prisma schema with `password`, `name`, `image` fields. Create `/api/auth/signup` endpoint.

---

## Fixes Applied (COMPLETED)

- [x] **Presets API** (`app/api/presets/route.ts`): Removed testing bypass. Enforces Agency-only access (403 with `UPGRADE_REQUIRED` for non-Agency).
- [x] **Keywords API** (`app/api/keywords/route.ts`): Removed testing bypass. Enforces Pro/Agency access (403 with `UPGRADE_REQUIRED` for Free tier).
- [x] **Generate API Credits** (`app/api/generate/route.ts`): Added credit deduction for Free tier (shortCredits/mediumCredits). Blocks generation with `CREDITS_EXHAUSTED` when depleted.
- [x] **Generate API Agency Instructions** (`app/api/generate/route.ts`): `agencyInstructions` and `tierComplexityInstructions` are now injected into the `systemPrompt`.
- [x] **Payment Gateway** (`lib/payments.ts`): Restored `stripe` type. `detectPaymentGateway(country)` defaults to Stripe, uses Razorpay only when `country` is IN/IND/India/INDIA.
- [x] **History API Fallback** (`app/api/history/route.ts`): GET returns `[]` when DB is down. POST returns `{fallback: true, warning: ...}` when DB save fails.
- [x] **Authentication Multi-Provider**:
  - Prisma schema: Added `password`, `name`, `image` fields to User model
  - `app/api/auth/[...nextauth]/route.ts`: Added GitHubProvider + CredentialsProvider (email/password)
  - `lib/auth-server.ts`: Synced with same multi-provider config
  - `app/api/auth/signup/route.ts`: New endpoint for email/password registration with bcrypt hashing
  - `app/sign-in/[[...rest]]/page.tsx`: Updated UI with Google, GitHub, and Email/Password forms
  - `app/sign-up/[[...rest]]/page.tsx`: Updated UI with Google, GitHub, and Email/Password registration
  - Installed `bcryptjs` for password hashing

---

## Environment Variables Needed (Add to Vercel)

### New Auth Variables
```
GITHUB_CLIENT_ID=your_github_app_client_id
GITHUB_CLIENT_SECRET=your_github_app_client_secret
```

### Existing Auth Variables (Already Required)
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret
```

---

## Validation Steps (After Fixes)
- [x] Read each fixed file to verify changes
- [ ] Check for TypeScript compilation errors (run `npm run build`)
- [ ] Verify no remaining `TESTING_MODE` comments
- [ ] Test email/password sign-up and sign-in flow
- [ ] Test GitHub OAuth flow (requires GitHub App setup)

