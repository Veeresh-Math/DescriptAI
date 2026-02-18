/**
 * DescriptAI - AI Image Generation API
 * Generate product images using Stability AI or fallback to placeholder
 */

import { NextRequest, NextResponse } from 'next/server';

// Stability AI API endpoint
const STABILITY_API_URL = 'https://api.stability.ai/v1/generation/text-to-image';

interface ImageGenerationRequest {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  seed?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: ImageGenerationRequest = await request.json();
    const { prompt, negativePrompt, width = 512, height = 512, steps = 30, seed } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required for image generation' },
        { status: 400 }
      );
    }

    // Check for Stability AI API key
    const stabilityKey = process.env.STABILITY_API_KEY;

    if (stabilityKey) {
      try {
        const response = await fetch(STABILITY_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${stabilityKey}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            text_prompts: [
              {
                text: prompt,
                weight: 1,
              },
              ...(negativePrompt ? [{
                text: negativePrompt,
                weight: -1,
              }] : []),
            ],
            cfg_scale: 7,
            height,
            width,
            steps,
            samples: 1,
            seed,
          }),
        });

        if (!response.ok) {
          throw new Error(`Stability API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.artifacts && data.artifacts.length > 0) {
          const base64Image = data.artifacts[0].base64;
          
          return NextResponse.json({
            success: true,
            image: `data:image/png;base64,${base64Image}`,
            provider: 'stability-ai',
            seed: data.artifacts[0].seed,
          });
        }
        
        throw new Error('No image generated');
      } catch (apiError) {
        console.error('[STABILITY_API_ERROR]', apiError);
        // Fall through to placeholder generation
      }
    }

    // Fallback: Generate a placeholder SVG with product visualization
    const placeholderSvg = generatePlaceholderImage(prompt, width, height);
    
    return NextResponse.json({
      success: true,
      image: placeholderSvg,
      provider: 'placeholder',
      message: 'Using placeholder (configure STABILITY_API_KEY for AI generation)',
    });

  } catch (error) {
    console.error('[IMAGE_GENERATION_ERROR]', error);
    return NextResponse.json(
      { error: 'Image generation failed. Please try again.' },
      { status: 500 }
    );
  }
}

function generatePlaceholderImage(prompt: string, width: number, height: number): string {
  // Extract keywords from prompt for a more relevant placeholder
  const keywords = prompt.split(/[,.]/)
    .map(w => w.trim())
    .filter(w => w.length > 2)
    .slice(0, 3)
    .join(', ');

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4F46E5"/>
      <stop offset="100%" style="stop-color:#7C3AED"/>
    </linearGradient>
    <linearGradient id="product" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFFFFF" stop-opacity="0.9"/>
      <stop offset="100%" style="stop-color:#E0E7FF" stop-opacity="0.7"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  
  <!-- Product Box -->
  <rect x="${width * 0.2}" y="${height * 0.15}" width="${width * 0.6}" height="${height * 0.5}" rx="20" fill="url(#product)"/>
  
  <!-- Product Details -->
  <rect x="${width * 0.25}" y="${height * 0.2}" width="${width * 0.5}" height="${height * 0.08}" rx="4" fill="#4F46E5" opacity="0.3"/>
  <rect x="${width * 0.25}" y="${height * 0.32}" width="${width * 0.4}" height="${height * 0.05}" rx="2" fill="#4F46E5" opacity="0.2"/>
  <rect x="${width * 0.25}" y="${height * 0.4}" width="${width * 0.35}" height="${height * 0.05}" rx="2" fill="#4F46E5" opacity="0.2"/>
  
  <!-- Sparkles -->
  <circle cx="${width * 0.15}" cy="${height * 0.2}" r="4" fill="#FFD700" opacity="0.8"/>
  <circle cx="${width * 0.85}" cy="${height * 0.3}" r="3" fill="#FFD700" opacity="0.6"/>
  <circle cx="${width * 0.8}" cy="${height * 0.7}" r="5" fill="#FFD700" opacity="0.7"/>
  
  <!-- Text -->
  <text x="${width/2}" y="${height * 0.8}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${Math.min(16, width/20)}" font-weight="bold">
    ${keywords.substring(0, 30)}
  </text>
  
  <!-- AI Badge -->
  <rect x="${width * 0.05}" y="${height * 0.85}" width="50" height="20" rx="10" fill="rgba(255,255,255,0.2)"/>
  <text x="${width * 0.075}" y="${height * 0.92}" fill="white" font-family="Arial, sans-serif" font-size="10">AI</text>
</svg>`.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export async function GET() {
  return NextResponse.json({
    name: 'DescriptAI Image Generation',
    version: '1.0.0',
    features: {
      stability_ai: !!process.env.STABILITY_API_KEY,
      placeholder: true,
    },
    parameters: {
      prompt: 'required - Description of the image to generate',
      negativePrompt: 'optional - What to avoid in the image',
      width: 'optional - Image width (default: 512)',
      height: 'optional - Image height (default: 512)',
      steps: 'optional - Generation steps (default: 30)',
      seed: 'optional - Random seed for reproducibility',
    },
  });
}
