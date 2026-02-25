/**
 * DescriptAI - Analytics API
 * Track and analyze description performance
 */

import { NextRequest, NextResponse } from 'next/server';

// In-memory analytics store (use database in production)
interface AnalyticsEvent {
  id: string;
  userId: string;
  eventType: 'generation' | 'copy' | 'download' | 'share' | 'view';
  productName: string;
  category: string;
  platform: string;
  tone: string;
  length: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface DailyStats {
  date: string;
  generations: number;
  copies: number;
  downloads: number;
  shares: number;
  views: number;
}

// Simulated analytics data
const analyticsEvents: AnalyticsEvent[] = [];
const dailyStats: Map<string, DailyStats> = new Map();

// Generate mock data for demo
function generateMockData() {
  const now = new Date();
  const categories = ['Electronics', 'Fashion', 'Beauty', 'Home', 'Sports'];
  const platforms = ['Amazon', 'Shopify', 'Etsy', 'eBay'];
  const tones = ['Professional', 'Casual', 'Luxury', 'Urgent'];
  const lengths = ['Short', 'Medium', 'Long'];

  // Generate last 30 days of data
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const stats: DailyStats = {
      date: dateStr,
      generations: Math.floor(Math.random() * 50) + 10,
      copies: Math.floor(Math.random() * 30) + 5,
      downloads: Math.floor(Math.random() * 20) + 3,
      shares: Math.floor(Math.random() * 10) + 1,
      views: Math.floor(Math.random() * 100) + 20,
    };

    dailyStats.set(dateStr, stats);
  }
}

// Initialize mock data
generateMockData();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const period = searchParams.get('period') || '30'; // days

    if (type === 'overview') {
      // Calculate totals
      let totalGenerations = 0;
      let totalCopies = 0;
      let totalDownloads = 0;
      let totalShares = 0;
      let totalViews = 0;

      dailyStats.forEach(stats => {
        totalGenerations += stats.generations;
        totalCopies += stats.copies;
        totalDownloads += stats.downloads;
        totalShares += stats.shares;
        totalViews += stats.views;
      });

      // Top categories
      const categoryStats: Record<string, number> = {};
      const platformStats: Record<string, number> = {};

      analyticsEvents.forEach(event => {
        if (event.eventType === 'generation') {
          categoryStats[event.category] = (categoryStats[event.category] || 0) + 1;
          platformStats[event.platform] = (platformStats[event.platform] || 0) + 1;
        }
      });

      // If no data, show demo data
      if (analyticsEvents.length === 0) {
        return NextResponse.json({
          success: true,
          overview: {
            totalGenerations: 1247,
            totalCopies: 892,
            totalDownloads: 456,
            totalShares: 234,
            totalViews: 3421,
            topCategories: [
              { name: 'Electronics', count: 423 },
              { name: 'Fashion', count: 312 },
              { name: 'Beauty', count: 267 },
              { name: 'Home', count: 156 },
              { name: 'Sports', count: 89 },
            ],
            topPlatforms: [
              { name: 'Amazon', count: 534 },
              { name: 'Shopify', count: 412 },
              { name: 'Etsy', count: 198 },
              { name: 'eBay', count: 103 },
            ],
          },
          isDemo: true,
        });
      }

      return NextResponse.json({
        success: true,
        overview: {
          totalGenerations,
          totalCopies,
          totalDownloads,
          totalShares,
          totalViews,
          topCategories: Object.entries(categoryStats)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5),
          topPlatforms: Object.entries(platformStats)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5),
        },
      });
    }

    if (type === 'timeline') {
      const days = parseInt(period);
      const timeline: DailyStats[] = [];
      
      const now = new Date();
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const stats = dailyStats.get(dateStr) || {
          date: dateStr,
          generations: Math.floor(Math.random() * 50) + 10,
          copies: Math.floor(Math.random() * 30) + 5,
          downloads: Math.floor(Math.random() * 20) + 3,
          shares: Math.floor(Math.random() * 10) + 1,
          views: Math.floor(Math.random() * 100) + 20,
        };
        
        timeline.push(stats);
      }

      return NextResponse.json({
        success: true,
        timeline,
        isDemo: true,
      });
    }

    if (type === 'performance') {
      // Performance metrics
      return NextResponse.json({
        success: true,
        performance: {
          avgGenerationTime: 2.3, // seconds
          successRate: 98.5, // percent
          popularTimes: [
            { hour: 9, day: 'Monday', count: 45 },
            { hour: 10, day: 'Tuesday', count: 52 },
            { hour: 14, day: 'Wednesday', count: 48 },
            { hour: 11, day: 'Thursday', count: 55 },
            { hour: 15, day: 'Friday', count: 42 },
          ],
          conversionFunnel: {
            generated: 1247,
            copied: 892,
            downloaded: 456,
            shared: 234,
          },
        },
        isDemo: true,
      });
    }

    // Default: return all stats
    return NextResponse.json({
      success: true,
      message: 'Use ?type=overview, timeline, or performance',
    });

  } catch (error) {
    console.error('[ANALYTICS_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, productName, category, platform, tone, length, metadata } = body;

    if (!eventType) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      );

    }

    // Create analytics event
    const event: AnalyticsEvent = {
      id: Math.random().toString(36).substring(7),
      userId: 'anonymous', // Would come from auth in production
      eventType,
      productName: productName || 'Unknown',
      category: category || 'General',
      platform: platform || 'Unknown',
      tone: tone || 'Unknown',
      length: length || 'Unknown',
      timestamp: new Date(),
      metadata,
    };

    analyticsEvents.push(event);

    // Update daily stats
    const today = new Date().toISOString().split('T')[0];
    const stats = dailyStats.get(today) || {
      date: today,
      generations: 0,
      copies: 0,
      downloads: 0,
      shares: 0,
      views: 0,
    };

    switch (eventType) {
      case 'generation':
        stats.generations++;
        break;
      case 'copy':
        stats.copies++;
        break;
      case 'download':
        stats.downloads++;
        break;
      case 'share':
        stats.shares++;
        break;
      case 'view':
        stats.views++;
        break;
    }

    dailyStats.set(today, stats);

    return NextResponse.json({
      success: true,
      eventId: event.id,
    });

  } catch (error) {
    console.error('[ANALYTICS_POST_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
