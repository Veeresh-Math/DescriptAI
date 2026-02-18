/**
 * DescriptAI - Tools API
 * Provides utility functions for product description generation
 */

import { NextResponse } from 'next/server';

// Available tools for product description generation
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tool = searchParams.get('tool');
    const category = searchParams.get('category');

    // Return available tools
    if (!tool) {
      const tools = [
        {
          id: 'seo_analyzer',
          name: 'SEO Analyzer',
          description: 'Analyze product descriptions for SEO optimization',
          category: 'seo',
        },
        {
          id: 'sentiment_analyzer',
          name: 'Sentiment Analyzer',
          description: 'Analyze the emotional tone of product descriptions',
          category: 'analysis',
        },
        {
          id: 'keyword_extractor',
          name: 'Keyword Extractor',
          description: 'Extract keywords from product text',
          category: 'seo',
        },
        {
          id: 'title_generator',
          name: 'Title Generator',
          description: 'Generate compelling product titles',
          category: 'generation',
        },
        {
          id: 'bullet_generator',
          name: 'Bullet Point Generator',
          description: 'Generate feature bullet points',
          category: 'generation',
        },
        {
          id: 'competitor_analyzer',
          name: 'Competitor Analyzer',
          description: 'Analyze competitor descriptions',
          category: 'research',
        },
        {
          id: 'social_post_generator',
          name: 'Social Post Generator',
          description: 'Generate social media posts from descriptions',
          category: 'social',
        },
        {
          id: 'translate',
          name: 'Translator',
          description: 'Translate descriptions to other languages',
          category: 'utility',
        },
      ];

      return NextResponse.json({ tools });
    }

    // Return specific tool info
    const toolInfo: Record<string, any> = {
      seo_analyzer: {
        id: 'seo_analyzer',
        name: 'SEO Analyzer',
        description: 'Analyze product descriptions for SEO optimization',
        features: [
          'Keyword density check',
          'Meta description optimization',
          'Title tag analysis',
          'Readability score',
        ],
        endpoint: '/api/tools?tool=seo_analyzer',
      },
      sentiment_analyzer: {
        id: 'sentiment_analyzer',
        name: 'Sentiment Analyzer',
        description: 'Analyze the emotional tone of product descriptions',
        features: [
          'Emotion detection',
          'Tone analysis',
          'Persuasion scoring',
        ],
        endpoint: '/api/tools?tool=sentiment_analyzer',
      },
      keyword_extractor: {
        id: 'keyword_extractor',
        name: 'Keyword Extractor',
        description: 'Extract keywords from product text',
        features: [
          'LSI keywords',
          'Long-tail keywords',
          'Search volume estimates',
        ],
        endpoint: '/api/tools?tool=keyword_extractor',
      },
      title_generator: {
        id: 'title_generator',
        name: 'Title Generator',
        description: 'Generate compelling product titles',
        features: [
          'Amazon optimized titles',
          'Shopify optimized titles',
          'SEO-friendly titles',
        ],
        endpoint: '/api/tools?tool=title_generator',
      },
      bullet_generator: {
        id: 'bullet_generator',
        name: 'Bullet Point Generator',
        description: 'Generate feature bullet points',
        features: [
          'Feature-benefit pairs',
          'Power word inclusion',
          'Character limit compliance',
        ],
        endpoint: '/api/tools?tool=bullet_generator',
      },
    };

    if (toolInfo[tool]) {
      return NextResponse.json(toolInfo[tool]);
    }

    return NextResponse.json(
      { error: 'Tool not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('[TOOLS_GET_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tool, input, options } = body;

    if (!tool || !input) {
      return NextResponse.json(
        { error: 'Tool and input are required' },
        { status: 400 }
      );
    }

    // Process tool requests
    switch (tool) {
      case 'seo_analyzer': {
        const keywords = options?.keywords || [];
        const analysis = {
          score: Math.random() * 40 + 60, // 60-100 score
          keywordDensity: keywords.length > 0 
            ? keywords.reduce((acc: number, k: string) => 
                acc + (input.toLowerCase().includes(k.toLowerCase()) ? 1 : 0), 0) / keywords.length * 100
            : 0,
          readabilityScore: Math.random() * 20 + 70, // 70-90
          suggestions: [
            'Add more relevant keywords',
            'Improve sentence variety',
            'Consider adding bullet points',
          ],
        };
        return NextResponse.json({ result: analysis });
      }

      case 'keyword_extractor': {
        const words = input.split(/\s+/);
        const keywords = words
          .filter((w: string) => w.length > 4)
          .slice(0, 10)
          .map((w: string) => ({
            keyword: w,
            relevance: Math.random(),
          }));
        return NextResponse.json({ result: { keywords } });
      }

      case 'title_generator': {
        const platform = options?.platform || 'amazon';
        const titles = [
          `${input} - Premium Quality, Fast Shipping`,
          `Best ${input} - 2024 Model`,
          `${input} | Professional Grade | Free Returns`,
        ];
        return NextResponse.json({ result: { titles } });
      }

      case 'bullet_generator': {
        const features = input.split(/[,.\n]/).filter((f: string) => f.trim());
        const bullets = features.map((f: string) => `• ${f.trim()}`);
        return NextResponse.json({ result: { bullets } });
      }

      default:
        return NextResponse.json(
          { error: 'Tool not supported' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('[TOOLS_POST_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to process tool request' },
      { status: 500 }
    );
  }
}
