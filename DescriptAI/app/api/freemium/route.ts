/**
 * DescriptAI - Freemium API
 * Handles free tier user management and credit tracking
 */

import { NextResponse } from 'next/server';

// In-memory store for freemium users (in production, use database)
const FREE_TIER_CREDITS = {
  short: 3,
  medium: 2,
  long: 0, // Long descriptions are not available in the free tier
};

// In-memory store for freemium users (in production, use database)
const freemiumUsers: Map<string, {
  id: string;
  email: string;
  usedShortCredits: number;
  usedMediumCredits: number;
  usedLongCredits: number;
  tier: 'free';
  createdAt: Date;
  lastReset: Date;
}> = new Map();

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
        used: {
          short: 0,
          medium: 0,
          long: 0,
        },
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
      credits: FREE_TIER_CREDITS, // Always return the base free tier credits
      used: {
        short: user.usedShortCredits,
        medium: user.usedMediumCredits,
        long: user.usedLongCredits,
      },
      remaining: {
        short: Math.max(0, FREE_TIER_CREDITS.short - user.usedShortCredits),
        medium: Math.max(0, FREE_TIER_CREDITS.medium - user.usedMediumCredits),
        long: Math.max(0, FREE_TIER_CREDITS.long - user.usedLongCredits),
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
          usedShortCredits: 0,
          usedMediumCredits: 0,
          usedLongCredits: 0,
          tier: 'free',
          createdAt: new Date(),
          lastReset: new Date(),
        };
        freemiumUsers.set(userId, user);
      }

      // Check credit availability
      const creditKey = length as keyof typeof FREE_TIER_CREDITS;
      const availableCredits = FREE_TIER_CREDITS[creditKey] || 0;
      let usedOfType: number;

      switch (creditKey) {
        case 'short':
          usedOfType = user.usedShortCredits;
          break;
        case 'medium':
          usedOfType = user.usedMediumCredits;
          break;
        case 'long':
          usedOfType = user.usedLongCredits;
          break;
        default:
          return NextResponse.json(
            { error: 'Invalid description length type' },
            { status: 400 }
          );
      }

      if (availableCredits <= usedOfType) {
        return NextResponse.json(
          { 
            error: 'No credits remaining for this description length',
            upgradeUrl: '/pricing',
            message: 'Upgrade to Pro for more generations'
          },
          { status: 403 }
        );
      }

      // Use the credit
      switch (creditKey) {
        case 'short':
          user.usedShortCredits += 1;
          break;
        case 'medium':
          user.usedMediumCredits += 1;
          break;
        case 'long':
          user.usedLongCredits += 1;
          break;
      }
      freemiumUsers.set(userId, user);

      return NextResponse.json({
        success: true,
        used: {
          short: user.usedShortCredits,
          medium: user.usedMediumCredits,
          long: user.usedLongCredits,
        },
        remaining: {
          short: Math.max(0, FREE_TIER_CREDITS.short - user.usedShortCredits),
          medium: Math.max(0, FREE_TIER_CREDITS.medium - user.usedMediumCredits),
          long: Math.max(0, FREE_TIER_CREDITS.long - user.usedLongCredits),
        },
      });
    }

    if (action === 'reset') {
      // Reset credits monthly (simulated)
      const user = freemiumUsers.get(userId);
      
      if (user) {
        user.usedShortCredits = 0;
        user.usedMediumCredits = 0;
        user.usedLongCredits = 0;
        user.lastReset = new Date();
        freemiumUsers.set(userId, user);
      }

      return NextResponse.json({
        success: true,
        message: 'Credits reset successfully',
        credits: FREE_TIER_CREDITS,
        used: {
          short: 0,
          medium: 0,
          long: 0,
        },
        remaining: FREE_TIER_CREDITS,
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