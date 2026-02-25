// Shopify Integration API

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const shop = searchParams.get('shop');
    const accessToken = searchParams.get('accessToken');

    if (!shop || !accessToken) {
      return NextResponse.json(
        { error: 'Missing shop or access token' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://${shop}.myshopify.com/admin/api/2023-10/products.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({
      products: data.products,
      count: data.products?.length || 0,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

