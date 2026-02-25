/**
 * DescriptAI - Freemium API
 * Handles free tier user management and credit tracking
 */

import { NextResponse } from 'next/server';

// In-memory store for freemium users (in production, use database)
const freemiumUsers: Map<string, {
  id: string;
  email: string;
  credits: number;
  usedCredits: number;
  tier: 'free';
  createdAt: Date;
  lastReset: Date;
}> = new Map();

// Default credits for free tier
const FREE_TIER_CREDITS = {
  short: 3,
  medium: 2,
  long: 0,
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = freemiumUsers.get(userId);

    if (!user) {
      // Return default free tier limits for new users
      return NextResponse.json({
        tier: 'free',
        credits: FREE_TIER_CREDITS,
        used: 0,
        remaining: {
          short: FREE_TIER_CREDITS.short,
          medium: FREE_TIER_CREDITS.medium,
          long: FREE_TIER_CREDITS.long,
        },
        isFreemium: true,
      });
    }

    return NextResponse.json({
      tier: user.tier,
      credits: user.credits,
      used: user.usedCredits,
      remaining: {
        short: Math.max(0, FREE_TIER_CREDITS.short - (user.usedCredits % 5)),
        medium: Math.max(0, FREE_TIER_CREDITS.medium - Math.floor(user.usedCredits / 5)),
        long: 0,
      },
      isFreemium: true,
      lastReset: user.lastReset,
    });
  } catch (error) {
    console.error('[FREEMIUM_GET_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch freemium status' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, email, action } = body;

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 }
      );
    }

    if (action === 'use_credit') {
      const { length } = body;
      
      // Check if user exists
      let user = freemiumUsers.get(userId);
      
      if (!user) {
        // Create new freemium user
        user = {
          id: userId,
          email,
          credits: FREE_TIER_CREDITS.short + FREE_TIER_CREDITS.medium,
          usedCredits: 0,
          tier: 'free',
          createdAt: new Date(),
          lastReset: new Date(),
        };
        freemiumUsers.set(userId, user);
      }

      // Check credit availability
      const creditKey = length as keyof typeof FREE_TIER_CREDITS;
      const availableCredits = FREE_TIER_CREDITS[creditKey] || 0;
      const usedOfType = user.usedCredits;

      if (availableCredits <= usedOfType && length !== 'long') {
        return NextResponse.json(
          { 
            error: 'No credits remaining',
            upgradeUrl: '/pricing',
            message: 'Upgrade to Pro for unlimited generations'
          },
          { status: 403 }
        );
      }

      // Use the credit
      user.usedCredits += 1;
      freemiumUsers.set(userId, user);

      return NextResponse.json({
        success: true,
        creditsRemaining: user.credits - user.usedCredits,
        usedCredits: user.usedCredits,
      });
    }

    if (action === 'reset') {
      // Reset credits monthly (simulated)
      const user = freemiumUsers.get(userId);
      
      if (user) {
        user.usedCredits = 0;
        user.lastReset = new Date();
        freemiumUsers.set(userId, user);
      }

      return NextResponse.json({
        success: true,
        message: 'Credits reset successfully',
        credits: FREE_TIER_CREDITS,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[FREEMIUM_POST_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to process freemium action' },
      { status: 500 }
    );
  }
}
