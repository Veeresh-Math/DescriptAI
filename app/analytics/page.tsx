"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

interface Overview {
  totalGenerations: number;
  totalCopies: number;
  totalDownloads: number;
  totalShares: number;
  totalViews: number;
  topCategories: { name: string; count: number }[];
  topPlatforms: { name: string; count: number }[];
  isDemo?: boolean;
}

interface TimelineData {
  date: string;
  generations: number;
  copies: number;
  downloads: number;
  shares: number;
  views: number;
}

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [timeline, setTimeline] = useState<TimelineData[]>([]);
  const [period, setPeriod] = useState('30');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline'>('overview');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const [overviewRes, timelineRes] = await Promise.all([
        fetch(`/api/analytics?type=overview`),
        fetch(`/api/analytics?type=timeline&period=${period}`),
      ]);

      const overviewData = await overviewRes.json();
      const timelineData = await timelineRes.json();

      if (overviewData.success) {
        setOverview(overviewData.overview);
      }
      if (timelineData.success) {
        setTimeline(timelineData.timeline);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const maxValue = Math.max(...timeline.map(d => d.generations), 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                DescriptAI
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/generate" className="text-white/70 hover:text-white transition">Generate</Link>
                <Link href="/history" className="text-white/70 hover:text-white transition">History</Link>
                <Link href="/pricing" className="text-white/70 hover:text-white transition">Pricing</Link>
                <Link href="/bulk" className="text-white/70 hover:text-white transition">Bulk</Link>
                <Link href="/analytics" className="text-cyan-400 font-medium">Analytics</Link>
              </div>
            </div>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="text-white/70 hover:text-white">Sign In</Link>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            📊 Analytics Dashboard
          </h1>
          <p className="text-xl text-white/70">
            Track your description performance and engagement
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 rounded-lg p-1 flex">
            {[7, 14, 30].map((days) => (
              <button
                key={days}
                onClick={() => setPeriod(String(days))}
                className={`px-6 py-2 rounded-md transition ${
                  period === String(days) ? 'bg-cyan-500 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                Last {days} Days
              </button>
            ))}
          </div>
        </div>

        {/* Demo Banner */}
        {overview?.isDemo && (
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-8 text-center">
            <span className="text-yellow-400">📈 Showing demo data</span>
            <span className="text-white/60 mx-2">|</span>
            <span className="text-white/70">Real analytics will appear after users start generating descriptions</span>
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-white">Loading analytics...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-2xl p-6 border border-cyan-500/30">
                <div className="text-3xl font-bold text-cyan-400">
                  {overview?.totalGenerations.toLocaleString()}
                </div>
                <div className="text-cyan-400/70 text-sm">Total Generations</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-6 border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400">
                  {overview?.totalCopies.toLocaleString()}
                </div>
                <div className="text-purple-400/70 text-sm">Copied</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl p-6 border border-green-500/30">
                <div className="text-3xl font-bold text-green-400">
                  {overview?.totalDownloads.toLocaleString()}
                </div>
                <div className="text-green-400/70 text-sm">Downloads</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-2xl p-6 border border-pink-500/30">
                <div className="text-3xl font-bold text-pink-400">
                  {overview?.totalShares.toLocaleString()}
                </div>
                <div className="text-pink-400/70 text-sm">Shares</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl p-6 border border-orange-500/30">
                <div className="text-3xl font-bold text-orange-400">
                  {overview?.totalViews.toLocaleString()}
                </div>
                <div className="text-orange-400/70 text-sm">Views</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 rounded-lg p-1 flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-2 rounded-md transition ${
                    activeTab === 'overview' ? 'bg-cyan-500 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  📊 Overview
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`px-6 py-2 rounded-md transition ${
                    activeTab === 'timeline' ? 'bg-cyan-500 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  📈 Timeline
                </button>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Top Categories */}
                <div className="bg-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6">🏆 Top Categories</h2>
                  <div className="space-y-4">
                    {overview?.topCategories.map((cat, index) => (
                      <div key={cat.name} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-white mb-1">
                            <span>{cat.name}</span>
                            <span className="text-cyan-400">{cat.count}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                              style={{ width: `${(cat.count / (overview?.topCategories[0]?.count || 1)) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Platforms */}
                <div className="bg-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6">🌐 Top Platforms</h2>
                  <div className="space-y-4">
                    {overview?.topPlatforms.map((plat, index) => (
                      <div key={plat.name} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between text-white mb-1">
                            <span>{plat.name}</span>
                            <span className="text-green-400">{plat.count}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                              style={{ width: `${(plat.count / (overview?.topPlatforms[0]?.count || 1)) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="bg-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-6">📈 Generation Activity</h2>
                <div className="h-64 flex items-end gap-2">
                  {timeline.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t"
                        style={{
                          height: `${(day.generations / maxValue) * 100}%`,
                          minHeight: day.generations > 0 ? '4px' : '0',
                        }}
                        title={`${day.date}: ${day.generations} generations`}
                      />
                      <span className="text-white/40 text-xs rotate-45 origin-left">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="flex justify-center gap-8 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded" />
                    <span className="text-white/70">Generations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    <span className="text-white/70">Copies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink-500 rounded" />
                    <span className="text-white/70">Downloads</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
