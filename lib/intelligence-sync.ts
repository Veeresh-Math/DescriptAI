import { db } from "./db";

const SYNC_SOURCES = [
    { url: "https://marketingexamples.com/copywriting", category: "Copywriting" },
    { url: "https://www.shopify.com/blog/product-description-examples", category: "Ecommerce" },
    { url: "https://copy.ai/blog/product-description-examples", category: "Marketing" },
    { url: "https://www.hubspot.com/marketing/product-marketing", category: "B2B" }
];

/**
 * Global Intelligence Sync Engine
 * Proactively mines the web for elite marketing secrets and stores them in the KnowledgeSync table.
 */
export async function runGlobalIntelligenceSync() {
    console.log("[INTEL_SYNC] Starting Autonomous Knowledge Ingestion...");
    let syncCount = 0;

    for (const source of SYNC_SOURCES) {
        try {
            console.log(`[INTEL_SYNC] Probing ${source.url}...`);
            const response = await fetch(source.url);
            if (!response.ok) continue;

            const html = await response.text();

            // Extract meaningful snippets
            const snippets = html.match(/<h3[^>]*>(.*?)<\/h3>|<p[^>]*>(.*?)<\/p>/gi) || [];

            const processedSnippets = snippets
                .map(s => s.replace(/<[^>]*>/g, '').trim())
                .filter(text => text.length > 80 && text.length < 400)
                .slice(0, 10);

            for (const snippet of processedSnippets) {
                // Determine tags based on content
                const tags = [];
                if (snippet.toLowerCase().includes("seo")) tags.push("SEO");
                if (snippet.toLowerCase().includes("sale") || snippet.toLowerCase().includes("buy")) tags.push("Conversion");
                if (snippet.toLowerCase().includes("story")) tags.push("Storytelling");
                if (tags.length === 0) tags.push("General");

                await db.knowledgeSync.create({
                    data: {
                        sourceUrl: source.url,
                        category: source.category,
                        title: `Insight from ${new URL(source.url).hostname}`,
                        content: snippet,
                        tags: tags.join(", ")
                    }
                });
                syncCount++;
            }
        } catch (error) {
            console.error(`[INTEL_SYNC_ERROR] Failed to ingestion from ${source.url}`, error);
        }
    }

    console.log(`[INTEL_SYNC_COMPLETE] Successfully ingested ${syncCount} elite marketing insights.`);
    return syncCount;
}

/**
 * Proactive Insight Finder
 * Searches the ingested knowledge base for insights matching the user's product or features.
 */
export async function findSyncInsights(query: string) {
    try {
        const insights = await db.knowledgeSync.findMany({
            where: {
                OR: [
                    { content: { contains: query, mode: 'insensitive' } },
                    { tags: { contains: query, mode: 'insensitive' } }
                ]
            },
            take: 3,
            orderBy: { createdAt: 'desc' }
        });
        return insights;
    } catch {
        return [];
    }

}
