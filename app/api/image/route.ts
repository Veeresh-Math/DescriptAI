/**
 * DescriptAI - AI Image Generation API
 * Using Hugging Face Inference API (FREE) as primary
 * Fallback to placeholder images
 */

import { NextRequest, NextResponse } from 'next/server';

// Hugging Face Free Inference Endpoint
const HF_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-medium';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, width = 512, height = 512 } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required for image generation' },
        { status: 400 }
      );
    }

    // Try Hugging Face first (FREE)
    const hfToken = process.env.HF_API_KEY;
    
    if (hfToken) {
      try {
        const response = await fetch(HF_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${hfToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              width,
              height,
              num_inference_steps: 20,
            },
          }),
        });

        if (response.ok) {
          const buffer = await response.arrayBuffer();
          const base64 = Buffer.from(buffer).toString('base64');
          
          return NextResponse.json({
            success: true,
            image: `data:image/png;base64,${base64}`,
            provider: 'huggingface',
          });
        }
      } catch (apiError) {
        console.error('[HF_API_ERROR]', apiError);
      }
    }

    // Fallback: Generate a creative placeholder SVG
    const placeholderSvg = generateCreativePlaceholder(prompt, width, height);
    
    return NextResponse.json({
      success: true,
      image: placeholderSvg,
      provider: 'placeholder',
      message: 'Add HF_API_KEY to .env for free AI images',
    });

  } catch (error) {
    console.error('[IMAGE_GENERATION_ERROR]', error);
    return NextResponse.json(
      { error: 'Image generation failed. Please try again.' },
      { status: 500 }
    );
  }
}

function generateCreativePlaceholder(prompt: string, width: number, height: number): string {
  // Extract keywords from prompt
  const keywords = prompt
    .split(/[,.\-()]/)
    .map(w => w.trim())
    .filter(w => w.length > 2 && w.length < 20)
    .slice(0, 4);

  const productName = keywords[0] || 'Product';
  const secondary = keywords.slice(1).join(', ') || 'High Quality';

  const colors = [
    ['#6366F1', '#8B5CF6', '#A855F7'],
    ['#EC4899', '#F43F5E', '#E11D48'],
    ['#14B8A6', '#0D9488', '#0F766E'],
    ['#F59E0B', '#D97706', '#B45309'],
    ['#3B82F6', '#2563EB', '#1D4ED8'],
  ];
  
  const colorSet = colors[Math.floor(Math.random() * colors.length)];

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colorSet[0]}"/>
      <stop offset="50%" style="stop-color:${colorSet[1]}"/>
      <stop offset="100%" style="stop-color:${colorSet[2]}"/>
    </linearGradient>
    <linearGradient id="product" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.95"/>
      <stop offset="100%" style="stop-color:#f0f0f0;stop-opacity:0.85"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- Animated Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  
  <!-- Decorative circles -->
  <circle cx="${width * 0.1}" cy="${height * 0.15}" r="40" fill="white" opacity="0.1"/>
  <circle cx="${width * 0.9}" cy="${height * 0.8}" r="60" fill="white" opacity="0.08"/>
  <circle cx="${width * 0.85}" cy="${height * 0.2}" r="25" fill="white" opacity="0.1"/>
  
  <!-- Main Product Box -->
  <rect x="${width * 0.15}" y="${height * 0.1}" width="${width * 0.7}" height="${height * 0.55}" rx="24" fill="url(#product)" filter="url(#shadow)"/>
  
  <!-- Product Details -->
  <!-- Title line -->
  <rect x="${width * 0.2}" y="${height * 0.18}" width="${width * 0.6}" height="${height * 0.08}" rx="6" fill="${colorSet[0]}" opacity="0.15"/>
  <!-- Description lines -->
  <rect x="${width * 0.2}" y="${height * 0.3}" width="${width * 0.5}" height="${height * 0.04}" rx="3" fill="${colorSet[0]}" opacity="0.1"/>
  <rect x="${width * 0.2}" y="${height * 0.37}" width="${width * 0.45}" height="${height * 0.04}" rx="3" fill="${colorSet[0]}" opacity="0.1"/>
  <rect x="${width * 0.2}" y="${height * 0.44}" width="${width * 0.4}" height="${height * 0.04}" rx="3" fill="${colorSet[0]}" opacity="0.1"/>
  
  <!-- Feature badges -->
  <rect x="${width * 0.2}" y="${height * 0.55}" width="70" height="22" rx="11" fill="${colorSet[0]}" opacity="0.2"/>
  <rect x="${width * 0.35}" y="${height * 0.55}" width="90" height="22" rx="11" fill="${colorSet[1]}" opacity="0.2"/>
  <rect x="${width * 0.5}" y="${height * 0.55}" width="60" height="22" rx="11" fill="${colorSet[2]}" opacity="0.2"/>
  
  <!-- Sparkle effects -->
  <text x="${width * 0.12}" y="${height * 0.25}" font-size="20" fill="white" opacity="0.8">✨</text>
  <text x="${width * 0.88}" y="${height * 0.35}" font-size="16" fill="white" opacity="0.6">✨</text>
  <text x="${width * 0.82}" y="${height * 0.72}" font-size="24" fill="white" opacity="0.7">✨</text>
  
  <!-- Product Name -->
  <text x="${width * 0.5}" y="${height * 0.78}" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="${Math.min(24, width/18)}" font-weight="700">
    ${productName.substring(0, 25)}
  </text>
  
  <!-- Tagline -->
  <text x="${width * 0.5}" y="${height * 0.86}" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="${Math.min(14, width/30)}" opacity="0.8">
    ${secondary.substring(0, 35)}
  </text>
  
  <!-- AI Badge -->
  <g>
    <rect x="${width * 0.04}" y="${height * 0.9}" width="45" height="20" rx="10" fill="rgba(255,255,255,0.2)"/>
    <text x="${width * 0.065}" y="${height * 0.96}" fill="white" font-family="system-ui, sans-serif" font-size="10" font-weight="600">AI</text>
  </g>
</svg>`.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export async function GET() {
  return NextResponse.json({
    name: 'DescriptAI Image Generation',
    version: '2.0.0',
    providers: {
      huggingface: !!process.env.HF_API_KEY,
      placeholder: true,
    },
    usage: 'POST with { prompt, width, height }',
    note: 'Add HF_API_KEY to .env for free AI-generated images',
  });
}
