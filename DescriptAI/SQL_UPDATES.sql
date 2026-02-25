-- Run this in Supabase SQL Editor to add the DescriptionCache table
-- This adds product caching for faster repeated generations

CREATE TABLE IF NOT EXISTS "DescriptionCache" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    "cacheKey" TEXT NOT NULL UNIQUE,
    "productName" TEXT NOT NULL,
    "features" TEXT,
    "platform" TEXT NOT NULL,
    "tone" TEXT,
    "length" TEXT,
    "description" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 1,
    "lastUsedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS "DescriptionCache_cacheKey_idx" ON "DescriptionCache"("cacheKey");
CREATE INDEX IF NOT EXISTS "DescriptionCache_lastUsedAt_idx" ON "DescriptionCache"("lastUsedAt");

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
