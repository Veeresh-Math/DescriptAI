/**
 * DescriptAI - Bulk Generation API
 * Process CSV files and generate multiple product descriptions at once
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateDescription, GenerationRequest, GenerationResult } from '@/lib/description-generation-engine';

interface BulkProduct {
  name: string;
  features: string;
  category?: string;
  tone?: 'professional' | 'casual' | 'luxury' | 'urgent';
  length?: 'short' | 'medium' | 'long';
  platform?: 'amazon' | 'shopify' | 'etsy' | 'general' | 'instagram' | 'tiktok';
}

interface BulkResult {
  name: string;
  success: boolean;
  description?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { products, options } = body as {
      products: BulkProduct[];
      options?: {
        tone?: 'professional' | 'casual' | 'luxury' | 'urgent';
        length?: 'short' | 'medium' | 'long';
        platform?: 'amazon' | 'shopify' | 'etsy' | 'general' | 'instagram' | 'tiktok';
        category?: string;
        tier?: 'free' | 'pro' | 'agency';
      };
    };

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: 'No products provided. Please provide an array of products.' },
        { status: 400 }
      );
    }

    // Limit to prevent abuse
    const maxProducts = 100;
    if (products.length > maxProducts) {
      return NextResponse.json(
        { error: `Maximum ${maxProducts} products allowed per request.` },
        { status: 400 }
      );
    }

    const results: BulkResult[] = [];
    let successCount = 0;
    let errorCount = 0;

    // Default category for products without category specified
    const defaultCategory = options?.category || 'general';
    const defaultTier = options?.tier || 'pro';

    // Process products in batches to avoid timeout
    const batchSize = 5;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      
      const batchResults = await Promise.all(
        batch.map(async (product) => {
          try {
            // Convert features string to array
            const featuresArray = product.features.split(/[,.\n]/).map(f => f.trim()).filter(f => f);
            
            const genRequest: GenerationRequest = {
              productName: product.name,
              category: product.category || defaultCategory,
              tier: defaultTier,
              features: featuresArray,
              tone: product.tone || options?.tone || 'professional',
              length: product.length || options?.length || 'medium',
              platform: product.platform || options?.platform || 'amazon',
            };

            const result: GenerationResult = await generateDescription(genRequest);

            successCount++;
            return {
              name: product.name,
              success: true,
              description: result.description,
            } as BulkResult;
          } catch (error) {
            errorCount++;
            return {
              name: product.name,
              success: false,
              error: error instanceof Error ? error.message : 'Generation failed',
            } as BulkResult;
          }
        })
      );

      results.push(...batchResults);
    }

    return NextResponse.json({
      success: true,
      summary: {
        total: products.length,
        successful: successCount,
        failed: errorCount,
      },
      results,
    });
  } catch (error) {
    console.error('[BULK_GENERATION_ERROR]', error);
    return NextResponse.json(
      { error: 'Bulk generation failed. Please try again.' },
      { status: 500 }
    );
  }
}

// Parse CSV text to products array (internal helper)
async function parseCSV(csvText: string): Promise<BulkProduct[]> {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('CSV must have header row and at least one product');
  }

  const header = lines[0].toLowerCase().split(',').map(h => h.trim());
  const nameIndex = header.findIndex(h => h.includes('name') || h.includes('product'));
  const featuresIndex = header.findIndex(h => h.includes('feature') || h.includes('description'));
  const categoryIndex = header.findIndex(h => h.includes('category'));
  const toneIndex = header.findIndex(h => h.includes('tone'));
  const lengthIndex = header.findIndex(h => h.includes('length'));
  const platformIndex = header.findIndex(h => h.includes('platform'));

  if (nameIndex === -1 || featuresIndex === -1) {
    throw new Error('CSV must have "name" and "features" columns');
  }

  const products: BulkProduct[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    
    if (values[nameIndex] && values[featuresIndex]) {
      products.push({
        name: values[nameIndex],
        features: values[featuresIndex],
        category: categoryIndex !== -1 ? values[categoryIndex] : undefined,
        tone: toneIndex !== -1 ? values[toneIndex] as BulkProduct['tone'] : undefined,
        length: lengthIndex !== -1 ? values[lengthIndex] as BulkProduct['length'] : undefined,
        platform: platformIndex !== -1 ? values[platformIndex] as BulkProduct['platform'] : undefined,
      });
    }
  }

  return products;
}
