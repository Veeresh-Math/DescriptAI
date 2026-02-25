// 🎯 Product Description Cache System
// Stores generated descriptions for instant reuse

import { db } from "./db";

// Generate cache key from product details
export function generateCacheKey(
  productName: string,
  features: string,
  tone: string,
  length: string,
  platform: string
): string {
  // Normalize inputs
  const normalize = (str: string) => 
    str.toLowerCase().trim().replace(/\s+/g, ' ').substring(0, 50);
  
  return `${normalize(productName)}_${normalize(features)}_${tone}_${length}_${platform}`;
}

// Check if similar product exists in cache
export async function getCachedDescription(
  productName: string,
  features: string,
  tone: string,
  length: string,
  platform: string
): Promise<{ found: boolean; description?: string; provider?: string }> {
  try {
    const cacheKey = generateCacheKey(productName, features, tone, length, platform);
    
    const cached = await db.descriptionCache.findUnique({
      where: { cacheKey }
    });
    
    if (cached && cached.description) {
      // Update usage stats
      await db.descriptionCache.update({
        where: { id: cached.id },
        data: { 
          usageCount: { increment: 1 },
          lastUsedAt: new Date()
        }
      });
      
      return {
        found: true,
        description: cached.description,
        provider: cached.provider
      };
    }
    
    return { found: false };
  } catch (error) {
    console.warn("[CACHE_GET_ERROR]", error);
    return { found: false };
  }
}

// Save new description to cache
export async function saveToCache(
  productName: string,
  features: string,
  tone: string,
  length: string,
  platform: string,
  description: string,
  provider: string
): Promise<void> {
  try {
    const cacheKey = generateCacheKey(productName, features, tone, length, platform);
    
    // Check if already exists
    const existing = await db.descriptionCache.findUnique({
      where: { cacheKey }
    });
    
    if (existing) {
      // Update existing
      await db.descriptionCache.update({
        where: { id: existing.id },
        data: {
          description,
          provider,
          usageCount: { increment: 1 },
          lastUsedAt: new Date(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        }
      });
    } else {
      // Create new
      await db.descriptionCache.create({
        data: {
          cacheKey,
          productName,
          features: features || "",
          tone: tone || "",
          length: length || "",
          platform,
          description,
          provider,
          usageCount: 1,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        }
      });
    }
    
    console.log(`[CACHE] Saved: ${productName.substring(0, 20)}...`);
  } catch (error) {
    console.warn("[CACHE_SAVE_ERROR]", error);
  }
}

// Get popular cached descriptions (for trending products)
export async function getPopularCachedDescriptions(limit: number = 10) {
  try {
    return await db.descriptionCache.findMany({
      orderBy: { usageCount: 'desc' },
      take: limit,
      where: {
        expiresAt: { gt: new Date() }
      }
    });
  } catch (error) {
    console.warn("[CACHE_POPULAR_ERROR]", error);
    return [];
  }
}

// Search cached descriptions
export async function searchCachedDescriptions(query: string) {
  try {
    return await db.descriptionCache.findMany({
      where: {
        OR: [
          { productName: { contains: query, mode: 'insensitive' } },
          { features: { contains: query, mode: 'insensitive' } }
        ],
        expiresAt: { gt: new Date() }
      },
      orderBy: { usageCount: 'desc' },
      take: 20
    });
  } catch (error) {
    console.warn("[CACHE_SEARCH_ERROR]", error);
    return [];
  }
}

// Clean up expired cache
export async function cleanupExpiredCache(): Promise<number> {
  try {
    const result = await db.descriptionCache.deleteMany({
      where: {
        expiresAt: { lt: new Date() }
      }
    });
    return result.count;
  } catch (error) {
    console.warn("[CACHE_CLEANUP_ERROR]", error);
    return 0;
  }
}
