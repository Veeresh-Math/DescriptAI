import { NextResponse } from "next/server";
import { analyzeSEO, generateHeatmapHtml } from "@/lib/seo-heatmap";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { text, keywords, includeHeatmap } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required for SEO analysis" },
        { status: 400 }
      );
    }

    // Run SEO analysis
    const analysis = analyzeSEO(text, keywords);

    // Generate heatmap if requested
    let heatmapHtml = null;
    if (includeHeatmap) {
      heatmapHtml = generateHeatmapHtml(text, analysis.keywords);
    }

    return NextResponse.json({
      success: true,
      analysis,
      heatmapHtml,
      tier: "pro" // This should be based on user tier
    });
  } catch (error) {
    console.error("[SEO_ANALYSIS_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to analyze SEO" },
      { status: 500 }
    );
  }
}
