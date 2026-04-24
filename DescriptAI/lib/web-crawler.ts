/**
 * DescriptAI INTELLIGENCE CRAWLER v4.0 - ENTERPRISE SCALE
 * Fetches real-time product descriptions from Google + mixes with AI content
 * 
 * ENTERPRISE SCALING FOR 10K+ USERS:
 * - Redis caching (shared across serverless instances)
 * - Predictive caching (pre-cache popular products)
 * - Google Custom Search PAID tier (10,000 queries/day)
 * - SerpAPI fallback (unlimited scale, pay-per-use)
 * - Intelligent rate limiting per user
 * - Batch processing for bulk operations
 */

const RESOURCE_SITES = [
    "https://marketingexamples.com/copywriting",
    "https://www.shopify.com/blog/product-description-examples",
    "https://copy.ai/blog/product-description-examples",
    "https://www.bigcommerce.com/blog/product-descriptions/",
    "https://www.oberlo.com/blog/product-descriptions",
    "https://www.wordstream.com/blog/ws/product-descriptions",
    "https://optinmonster.com/product-description-examples/"
];

// ENTERPRISE: Multiple data sources for 10K+ scale
const DATA_SOURCES = {
    // Primary: Google Custom Search (PAID tier - 10,000/day)
    google: {
        enabled: true,
        keys: [] as string[],
        cx: process.env.GOOGLE_CX || "",
        dailyLimit: 10000,
        costPer1000: 5 // $5 per 1000 queries
    },
    // Secondary: SerpAPI (unlimited, pay-per-use)
    serpapi: {
        enabled: !!process.env.SERPAPI_KEY,
        key: (process.env.SERPAPI_KEY || "") as string,
        costPer1000: 2.5 // $2.50 per 1000 queries
    },
    // Tertiary: RapidAPI Web Search
    rapidapi: {
        enabled: !!process.env.RAPIDAPI_KEY,
        key: (process.env.RAPIDAPI_KEY || "") as string,
        host: (process.env.RAPIDAPI_HOST || "") as string,
        costPer1000: 1 // $1 per 1000 queries
    }
};

// Load Google API keys (up to 10 keys for 10,000 queries/day)
function loadGoogleKeys(): string[] {
    const keys: string[] = [];
    for (let i = 1; i <= 10; i++) {
        const envKey = process.env[`GOOGLE_API_KEY_${i}`];
        const key: string | undefined = envKey && envKey.length > 0 ? envKey : (i === 1 ? process.env.GOOGLE_API_KEY : undefined);
        if (key && key.length > 0) keys.push(key);
    }
    return keys;
}



DATA_SOURCES.google.keys = loadGoogleKeys();

// ENTERPRISE CACHE: Redis-compatible with Upstash
interface CacheEntry {
    data: SearchResult[];
    timestamp: number;
    searchQuery: string;
    hitCount: number; // Track popularity for predictive caching
}

// In-memory cache (fallback if Redis unavailable)
const localCache = new Map<string, CacheEntry>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const MAX_LOCAL_CACHE = 5000; // 5K products locally

// Predictive cache: Pre-cache popular products
const POPULAR_PRODUCTS = [
    "wireless earbuds", "bluetooth speaker", "smart watch", "laptop stand",
    "phone case", "water bottle", "backpack", "sunglasses", "headphones",
    "fitness tracker", "portable charger", "desk lamp", "yoga mat",
    "coffee maker", "air fryer", "skincare", "makeup", "sneakers"
];

// Enterprise tier limits (10K users scale)
const TIER_LIMITS: Record<string, { 
    useCache: boolean; 
    liveSearch: boolean; 
    maxQueriesPerDay: number;
    maxQueriesPerHour: number;
    description: string;
    dataSources: string[];
}> = {
    free: { 
        useCache: true, 
        liveSearch: false, 
        maxQueriesPerDay: 0,
        maxQueriesPerHour: 0,
        description: "Curated sources only (unlimited)",
        dataSources: ["curated"]
    },
    pro: { 
        useCache: true, 
        liveSearch: true, 
        maxQueriesPerDay: 100,
        maxQueriesPerHour: 10,
        description: "100 live searches/day",
        dataSources: ["cache", "google", "curated"]
    },
    agency: { 
        useCache: true, 
        liveSearch: true, 
        maxQueriesPerDay: 500,
        maxQueriesPerHour: 50,
        description: "500 live searches/day",
        dataSources: ["cache", "google", "serpapi", "curated"]
    },
    enterprise: {
        useCache: true,
        liveSearch: true,
        maxQueriesPerDay: 2000,
        maxQueriesPerHour: 200,
        description: "2000 live searches/day (dedicated)",
        dataSources: ["cache", "google", "serpapi", "rapidapi", "curated"]
    }
};

// Rate limiting per user (hourly windows)
const userRateLimits = new Map<string, { count: number; resetTime: number }>();
const HOURLY_WINDOW = 60 * 60 * 1000; // 1 hour

// Global quota tracking (resets daily)
let dailyStats = {
    googleQueries: 0,
    serpapiQueries: 0,
    rapidapiQueries: 0,
    cacheHits: 0,
    totalRequests: 0,
    date: new Date().toDateString()
};

interface SearchResult {
    title: string;
    snippet: string;
    link: string;
}

/**
 * ENTERPRISE: Redis cache client (Upstash compatible)
 */
async function getRedisCache(): Promise<any | null> {
    try {
        if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
            return null;
        }
        
        // Dynamic import to avoid bundling issues
        const { Redis } = await import('@upstash/redis');
        return new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
    } catch {
        return null;
    }
}

/**
 * Get cache key for a search query
 */
function getCacheKey(query: string): string {
    return `descriptai:search:${query.toLowerCase().trim().replace(/\s+/g, '_')}`;
}

/**
 * Check and reset daily stats if needed
 */
function checkAndResetStats(): void {
    const today = new Date().toDateString();
    if (today !== dailyStats.date) {
        console.log(`[STATS] New day! Yesterday: ${dailyStats.totalRequests} requests, ${dailyStats.cacheHits} cache hits`);
        dailyStats = {
            googleQueries: 0,
            serpapiQueries: 0,
            rapidapiQueries: 0,
            cacheHits: 0,
            totalRequests: 0,
            date: today
        };
    }
}

/**
 * Check user rate limit (hourly)
 */
function checkUserRateLimit(userId: string, tier: string): boolean {
    const tierConfig = TIER_LIMITS[tier] || TIER_LIMITS.free;
    const now = Date.now();
    
    const userLimit = userRateLimits.get(userId);
    if (!userLimit || now > userLimit.resetTime) {
        // Reset window
        userRateLimits.set(userId, { count: 1, resetTime: now + HOURLY_WINDOW });
        return true;
    }
    
    if (userLimit.count >= tierConfig.maxQueriesPerHour) {
        console.log(`[RATE_LIMIT] User ${userId} hit hourly limit (${tierConfig.maxQueriesPerHour})`);
        return false;
    }
    
    userLimit.count++;
    return true;
}

/**
 * Get cached results (Redis first, then local)
 */
async function getCachedResults(query: string): Promise<SearchResult[] | null> {
    const cacheKey = getCacheKey(query);
    
    // Try Redis first (shared across instances)
    const redis = await getRedisCache();
    if (redis) {
        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                const entry = cached as CacheEntry;
                const age = Date.now() - entry.timestamp;
                if (age < CACHE_TTL) {
                    console.log(`[REDIS_CACHE] Hit for "${query}"`);
                    dailyStats.cacheHits++;
                    // Update hit count for predictive caching
                    entry.hitCount = (entry.hitCount || 0) + 1;
                    await redis.set(cacheKey, entry, { ex: 86400 });
                    return entry.data;
                }
            }
        } catch (e) {
            console.warn("[REDIS_ERROR]", e);
        }
    }
    
    // Fallback to local cache
    const localCached = localCache.get(cacheKey);
    if (localCached) {
        const age = Date.now() - localCached.timestamp;
        if (age < CACHE_TTL) {
            console.log(`[LOCAL_CACHE] Hit for "${query}"`);
            dailyStats.cacheHits++;
            localCached.hitCount = (localCached.hitCount || 0) + 1;
            return localCached.data;
        }
        localCache.delete(cacheKey);
    }
    
    return null;
}

/**
 * Save results to cache (Redis + local)
 */
async function saveToCache(query: string, results: SearchResult[]): Promise<void> {
    const cacheKey = getCacheKey(query);
    const entry: CacheEntry = {
        data: results,
        timestamp: Date.now(),
        searchQuery: query,
        hitCount: 1
    };
    
    // Save to Redis (shared)
    const redis = await getRedisCache();
    if (redis) {
        try {
            await redis.set(cacheKey, entry, { ex: 86400 }); // 24h TTL
        } catch (e) {
            console.warn("[REDIS_SAVE_ERROR]", e);
        }
    }
    
    // Save to local cache (LRU eviction)
    if (localCache.size >= MAX_LOCAL_CACHE) {
        const oldestKey = localCache.keys().next().value;
        if (oldestKey) {
            localCache.delete(oldestKey);
        }
    }

    localCache.set(cacheKey, entry);
}

/**
 * Pre-cache popular products (predictive caching)
 */
export async function preCachePopularProducts(): Promise<void> {
    console.log("[PREDICTIVE] Pre-caching popular products...");
    
    for (const product of POPULAR_PRODUCTS.slice(0, 5)) {
        try {
            const cached = await getCachedResults(product);
            if (!cached) {
                // Trigger background cache
                await searchGoogleForProducts(product, "enterprise", true);
                console.log(`[PREDICTIVE] Pre-cached: ${product}`);
            }
        } catch (e) {
            console.warn(`[PREDICTIVE] Failed to pre-cache ${product}`, e);
        }
        // Small delay to avoid rate limits
        await new Promise(r => setTimeout(r, 100));
    }
}

/**
 * ENTERPRISE: Search with multiple data sources
 */
async function searchGoogleForProducts(query: string, userTier: string = "free", background: boolean = false): Promise<SearchResult[]> {
    checkAndResetStats();
    dailyStats.totalRequests++;
    
    // Step 1: Check cache first
    const cached = await getCachedResults(query);
    if (cached && cached.length > 0) {
        return cached;
    }
    
    const tier = TIER_LIMITS[userTier] || TIER_LIMITS.free;
    
    // Step 2: Check tier permissions
    if (!tier.liveSearch) {
        console.log(`[SEARCH] Tier "${userTier}" - using curated sources only`);
        return [];
    }
    
    // Step 3: Try Google Custom Search (primary)
    if (tier.dataSources.includes("google") && DATA_SOURCES.google.keys.length > 0) {
        try {
            const results = await searchWithGoogle(query);
            if (results.length > 0) {
                await saveToCache(query, results);
                return results;
            }
        } catch (e) {
            console.warn("[GOOGLE_FAILED]", e);
        }
    }
    
    // Step 4: Try SerpAPI (secondary)
    if (tier.dataSources.includes("serpapi") && DATA_SOURCES.serpapi.enabled) {
        try {
            const results = await searchWithSerpAPI(query);
            if (results.length > 0) {
                await saveToCache(query, results);
                return results;
            }
        } catch (e) {
            console.warn("[SERPAPI_FAILED]", e);
        }
    }
    
    // Step 5: Try RapidAPI (tertiary)
    if (tier.dataSources.includes("rapidapi") && DATA_SOURCES.rapidapi.enabled) {
        try {
            const results = await searchWithRapidAPI(query);
            if (results.length > 0) {
                await saveToCache(query, results);
                return results;
            }
        } catch (e) {
            console.warn("[RAPIDAPI_FAILED]", e);
        }
    }
    
    return [];
}

/**
 * Google Custom Search implementation
 */
async function searchWithGoogle(query: string): Promise<SearchResult[]> {
    if (dailyStats.googleQueries >= DATA_SOURCES.google.dailyLimit) {
        console.log("[GOOGLE] Daily limit reached, skipping...");
        return [];
    }
    
    // Rotate through keys
    const keyIndex = dailyStats.googleQueries % DATA_SOURCES.google.keys.length;
    const apiKey = DATA_SOURCES.google.keys[keyIndex];
    
    if (!apiKey) {
        console.log("[GOOGLE] No API key available");
        return [];
    }
    
    const searchQuery = encodeURIComponent(`${query} product description features benefits`);
    const cx = DATA_SOURCES.google.cx || "";
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}&num=5`;
    
    console.log(`[GOOGLE] Key #${keyIndex + 1} | Query: "${query}" | Daily: ${dailyStats.googleQueries + 1}`);
    
    const response = await fetch(url, { 
        headers: { "Accept": "application/json" },
        signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) {
        if (response.status === 429) {
            console.warn("[GOOGLE] Quota exceeded for this key");
        }
        return [];
    }
    
    const data = await response.json();
    if (!data.items || data.items.length === 0) return [];
    
    dailyStats.googleQueries++;
    
    return data.items.map((item: { title: string; snippet: string; link: string }) => ({
        title: item.title,
        snippet: item.snippet,
        link: item.link
    }));
}

/**
 * SerpAPI implementation (unlimited scale)
 */
async function searchWithSerpAPI(query: string): Promise<SearchResult[]> {
    const apiKey = DATA_SOURCES.serpapi.key;
    if (!apiKey) return [];
    const url = `https://serpapi.com/search?q=${encodeURIComponent(query + " product description")}&engine=google&api_key=${apiKey}&num=5`;
    
    console.log(`[SERPAPI] Query: "${query}"`);
    
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) return [];
    
    const data = await response.json();
    if (!data.organic_results) return [];
    
    dailyStats.serpapiQueries++;
    
    return data.organic_results.slice(0, 5).map((item: { title: string; snippet: string; link: string }) => ({
        title: item.title,
        snippet: item.snippet,
        link: item.link
    }));
}

/**
 * RapidAPI Web Search implementation
 */
async function searchWithRapidAPI(query: string): Promise<SearchResult[]> {
    const host = DATA_SOURCES.rapidapi.host;
    const apiKey = DATA_SOURCES.rapidapi.key;
    if (!host || !apiKey) return [];
    const url = `https://${host}/search?q=${encodeURIComponent(query)}`;
    
    console.log(`[RAPIDAPI] Query: "${query}"`);
    
    const response = await fetch(url, {
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": host
        },
        signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) return [];
    
    const data = await response.json();
    dailyStats.rapidapiQueries++;
    
    return (data.results || []).slice(0, 5).map((item: { title: string; description: string; url: string }) => ({
        title: item.title,
        snippet: item.description,
        link: item.url
    }));
}

/**
 * Extract key phrases and patterns from real descriptions
 */
function extractPatterns(results: SearchResult[]): string[] {
    const patterns: string[] = [];
    
    results.forEach(result => {
        // Extract benefit-focused phrases
        const benefitMatches = result.snippet.match(/(?:with|featuring|includes|provides|offers)\s+([^\.]{10,100})/gi);
        if (benefitMatches) {
            patterns.push(...benefitMatches.slice(0, 2));
        }
        
        // Extract power words and emotional triggers
        const emotionalMatches = result.snippet.match(/(?:premium|exclusive|revolutionary|transform|discover|master|effortless|guaranteed)([^\.]{5,80})/gi);
        if (emotionalMatches) {
            patterns.push(...emotionalMatches.slice(0, 2));
        }
        
        // Extract feature highlights
        const featureMatches = result.snippet.match(/(?:perfect for|ideal for|designed for|great for)([^\.]{10,60})/gi);
        if (featureMatches) {
            patterns.push(...featureMatches.slice(0, 1));
        }
    });

    // Remove duplicates and clean up
    return [...new Set(patterns)]
        .map(p => p.trim())
        .filter(p => p.length > 15 && p.length < 120)
        .slice(0, 6);
}

/**
 * Mix real Google data with AI content
 */
function mixWithRealData(aiContent: string, realPatterns: string[]): string {
    if (realPatterns.length === 0) return aiContent;

    // Insert real patterns naturally into the content
    const sentences = aiContent.split(/(?<=[.!?])\s+/);
    const mixedSentences: string[] = [];
    
    let patternIndex = 0;
    
    sentences.forEach((sentence, idx) => {
        mixedSentences.push(sentence);
        
        // Insert a real pattern every 2-3 sentences
        if ((idx + 1) % 2 === 0 && patternIndex < realPatterns.length) {
            const pattern = realPatterns[patternIndex++];
            // Clean and format the pattern
            const cleanPattern = pattern.replace(/^(with|featuring|includes|provides|offers)\s+/i, '');
            mixedSentences.push(` Real users love that it ${cleanPattern}.`);
        }
    });

    return mixedSentences.join(' ');
}

/**
 * Get marketing inspiration from curated sites (no API limits!)
 */
async function getCuratedInspiration(productName: string, features: string): Promise<string[] | null> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
        console.log("[CRAWLER] Fetching from curated marketing sources...");
        
        // Try multiple sources in parallel for better results
        const sourcePromises = RESOURCE_SITES.slice(0, 3).map(async (sourceUrl) => {
            try {
                const response = await fetch(sourceUrl, { 
                    signal: controller.signal,
                    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DescriptAI/1.0)' }
                });
                
                if (!response.ok) return null;
                
                const html = await response.text();
                const samples = html.match(/<h[23][^>]*>(.*?)<\/h[23]>|<p[^>]*>(.*?)<\/p>/gi) || [];
                
                return samples
                    .map(s => s.replace(/<[^>]*>/g, '').trim())
                    .filter(text => text.length > 50 && text.length < 300);
            } catch {
                return null;
            }
        });

        const allSamples = (await Promise.all(sourcePromises))
            .flat()
            .filter((s): s is string => s !== null);

        if (allSamples.length < 3) {
            throw new Error("Not enough snippets from curated sources");
        }

        // Shuffle and pick best 3
        const shuffled = allSamples.sort(() => 0.5 - Math.random());
        const picked = shuffled.slice(0, 3);

        const variants = picked.map((template, idx) => {
            const themes = [
                `The ${productName} Evolution: ${template}`,
                `Why Leaders Choose ${productName}: ${template}`,
                `Mastering ${productName}: ${template}`
            ];
            return `[INSPIRED BY TOP MARKETING SOURCES]\n\n${themes[idx]}\n\nLeverage ${features} to transform your business today.`;
        });

        clearTimeout(timeoutId);
        return variants;

    } catch (error) {
        console.warn("[CURATED_FAILED]", error);
        clearTimeout(timeoutId);
        return null;
    }
}

/**
 * Main crawler function - smart tier-based strategy
 */
export async function crawlMarketingInspiration(
    productName: string, 
    features: string,
    userTier: string = "free"
) {
    // Strategy based on tier:
    // - Free: Curated sources only (unlimited, no API quota used)
    // - Pro: Cache first, then live Google (50/day)
    // - Agency: Cache first, then live Google (100/day)
    
    console.log(`[CRAWLER] Tier: ${userTier} | Product: ${productName}`);

    // For Free users: Skip Google entirely, use curated sources
    if (userTier === "free") {
        console.log("[CRAWLER] Free tier: Using curated marketing sources (unlimited)");
        return await getCuratedInspiration(productName, features);
    }

    // For Pro/Agency: Try Google with caching
    const googleResults = await searchGoogleForProducts(productName, userTier);
    
    if (googleResults.length > 0) {
        console.log(`[CRAWLER] Enhanced with ${googleResults.length} real market sources`);
        const realPatterns = extractPatterns(googleResults);
        
        const aiVariants = await generateAIBase(productName, features);
        
        if (aiVariants) {
            const mixedVariants = aiVariants.map((variant, idx) => {
                const mixed = mixWithRealData(variant, realPatterns.slice(idx * 2, idx * 2 + 2));
                const sources = googleResults.slice(0, 2).map(r => {
                    try {
                        return new URL(r.link).hostname;
                    } catch {
                        return 'market-source';
                    }
                }).join(', ');
                return `[ENHANCED WITH REAL MARKET DATA]\n\n${mixed}\n\n[Sources: ${sources}]`;
            });
            
            return mixedVariants;
        }
    }

    // Fallback to curated sources for all tiers
    console.log("[CRAWLER] Falling back to curated marketing sources...");
    return await getCuratedInspiration(productName, features);
}


/**
 * Generate base AI content (placeholder - actual AI call happens in route.ts)
 */
async function generateAIBase(productName: string, features: string): Promise<string[] | null> {
    // This is a fallback - the actual AI generation happens in the API route
    // We return null here so the route.ts knows to use its own AI
    return null;
}

/**
 * NEW: Real-time content mixer for API route - TIER AWARE
 * Call this from route.ts to mix AI output with real data
 */
export async function enhanceWithRealData(
    aiContent: string, 
    productName: string, 
    features: string,
    userTier: string = "free"
): Promise<{ content: string; enhanced: boolean; source: string }> {
    try {
        // Free tier: Skip enhancement to save quota
        if (userTier === "free") {
            console.log("[ENHANCER] Free tier: Skipping Google enhancement");
            return { 
                content: aiContent, 
                enhanced: false, 
                source: "AI only (Free tier - upgrade for market data)" 
            };
        }

        const googleResults = await searchGoogleForProducts(productName, userTier);
        
        if (googleResults.length === 0) {
            // Try curated sources as fallback
            const curated = await getCuratedInspiration(productName, features);
            if (curated && curated.length > 0) {
                const realPatterns = extractPatterns([{ 
                    title: productName, 
                    snippet: curated[0], 
                    link: "curated-source" 
                }]);
                const enhanced = mixWithRealData(aiContent, realPatterns.slice(0, 2));
                return { 
                    content: enhanced, 
                    enhanced: true, 
                    source: "AI + Curated Marketing Sources" 
                };
            }
            
            return { 
                content: aiContent, 
                enhanced: false, 
                source: "AI only (no market data available)" 
            };
        }

        const realPatterns = extractPatterns(googleResults);
        const enhanced = mixWithRealData(aiContent, realPatterns);
        
        console.log(`[ENHANCER] Mixed ${realPatterns.length} real patterns into content`);
        return { 
            content: enhanced, 
            enhanced: true, 
            source: `AI + Google Search (${googleResults.length} sources)` 
        };

    } catch (error) {
        console.warn("[ENHANCER] Failed, returning original:", error);
        return { 
            content: aiContent, 
            enhanced: false, 
            source: "AI only (enhancement failed)" 
        };
    }
}

/**
 * ENTERPRISE: Get comprehensive stats for admin dashboard
 */
export function getQuotaStatus(): { 
    google: { used: number; limit: number; cost: number };
    serpapi: { used: number; cost: number };
    rapidapi: { used: number; cost: number };
    cache: { hits: number; localSize: number };
    totalRequests: number;
    date: string;
} {
    checkAndResetStats();
    
    const googleCost = (dailyStats.googleQueries / 1000) * DATA_SOURCES.google.costPer1000;
    const serpapiCost = (dailyStats.serpapiQueries / 1000) * DATA_SOURCES.serpapi.costPer1000;
    const rapidapiCost = (dailyStats.rapidapiQueries / 1000) * DATA_SOURCES.rapidapi.costPer1000;
    
    return {
        google: {
            used: dailyStats.googleQueries,
            limit: DATA_SOURCES.google.dailyLimit,
            cost: Math.round(googleCost * 100) / 100
        },
        serpapi: {
            used: dailyStats.serpapiQueries,
            cost: Math.round(serpapiCost * 100) / 100
        },
        rapidapi: {
            used: dailyStats.rapidapiQueries,
            cost: Math.round(rapidapiCost * 100) / 100
        },
        cache: {
            hits: dailyStats.cacheHits,
            localSize: localCache.size
        },
        totalRequests: dailyStats.totalRequests,
        date: dailyStats.date
    };
}

/**
 * Clear all caches
 */
export async function clearSearchCache(): Promise<void> {
    localCache.clear();
    
    const redis = await getRedisCache();
    if (redis) {
        try {
            // Clear all descriptai keys
            const keys = await redis.keys('descriptai:search:*');
            for (const key of keys) {
                await redis.del(key);
            }
        } catch (e) {
            console.warn("[REDIS_CLEAR_ERROR]", e);
        }
    }
    
    console.log("[CACHE] Cleared all caches");
}

/**
 * Batch process multiple products (for bulk operations)
 */
export async function batchEnhance(
    products: Array<{ name: string; features: string; tier: string }>,
    concurrency: number = 5
): Promise<Array<{ name: string; result: SearchResult[] | null }>> {
    const results: Array<{ name: string; result: SearchResult[] | null }> = [];
    
    // Process in batches
    for (let i = 0; i < products.length; i += concurrency) {
        const batch = products.slice(i, i + concurrency);
        const batchPromises = batch.map(async (product) => {
            try {
                const result = await searchGoogleForProducts(product.name, product.tier);
                return { name: product.name, result };
            } catch (e) {
                return { name: product.name, result: null };
            }
        });
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Small delay between batches
        if (i + concurrency < products.length) {
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    
    return results;
}

