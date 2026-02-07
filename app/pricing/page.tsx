"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";



const pricingTiers = [
    {
        name: "Free",
        price: "$0",
        description: "Perfect for testing the waters",
        features: [
            "3 Short (120 words) / 2 Medium (250 words) Credits",

            "Amazon & Shopify Platforms Only",
            "Casual Tone & General Persona",
            "📋 Standard CSV Export",
            "🎁 Referral Rewards (+5 credits)",
            "❌ No Etsy/eBay Platforms",
            "❌ No Long (300 words) Mode",
            "❌ No Social Kit / SEO Heatmap"
        ],
        buttonText: "Current Plan",
        highlight: false,
        buttonClass: "bg-gray-100 text-gray-400 cursor-default"
    },
    {
        name: "Pro",
        price: "$19",
        period: "/mo",
        description: "For serious e-commerce sellers",
        features: [
            "Unlimited Generations",
            "All 4 Platforms (Amazon/Shopify/Etsy/eBay)",
            "All 3 Lengths (Short/Medium/Long 500 words)",

            "All Tones & Expert Personas",
            "⚡ Full Social Media Kit (IG/Twitter/FB)",
            "🔥 Advanced SEO Heatmap",
            "📥 Platform-Specific Exports",
            "🚀 99.9% Uptime Guarantee"

        ],
        buttonText: "Upgrade to Pro",
        highlight: true,
        buttonClass: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:scale-105"
    },
    {
        name: "Agency",
        price: "$49",
        period: "/mo",
        description: "For high-volume marketing teams",
        features: [
            "Everything in Pro",
            "🛡️ Triple-Shield Resilience",
            "🏆 Agency Command Suite",
            "🎯 Target SEO Keywords",
            "🎨 Custom Brand Voice Presets",
            "📚 Unlimited Brand Library",
            "🏷️ Agency White-label (Preview)"
        ],
        buttonText: "Go Agency",
        highlight: false,
        buttonClass: "bg-gray-900 text-white hover:bg-black"
    }
];

const comparisonFeatures = [
    { feature: "Unlimited Generations", free: "3 Short + 2 Medium", pro: "✅ Unlimited", agency: "✅ Unlimited" },
    { feature: "Platforms", free: "Amazon + Shopify", pro: "✅ All 4 (Amazon/Shopify/Etsy/eBay)", agency: "✅ All 4" },
    { feature: "Description Lengths", free: "Short (120w) + Medium (250w)", pro: "✅ All 3 (Short/Medium/Long 500w)", agency: "✅ All 3" },

    { feature: "Tones & Personas", free: "Casual only", pro: "✅ All Tones + Expert Personas", agency: "✅ All Tones + Expert Personas" },
    { feature: "Social Media Kit", free: "❌", pro: "✅ Instagram + Twitter + Facebook", agency: "✅ Instagram + Twitter + Facebook" },
    { feature: "SEO Heatmap", free: "❌", pro: "✅ Advanced Heatmap", agency: "✅ Advanced Heatmap" },
    { feature: "Custom SEO Keywords", free: "❌", pro: "❌", agency: "✅ Target Keywords Input" },
    { feature: "Brand Voice Presets", free: "❌", pro: "❌", agency: "✅ Custom Brand Voices" },
    { feature: "Triple-Shield Resilience", free: "❌", pro: "❌", agency: "✅ Zero Downtime Guarantee" },
    { feature: "Agency Command Suite", free: "❌", pro: "❌", agency: "✅ Multi-Client Management" },
    { feature: "White-label Options", free: "❌", pro: "❌", agency: "✅ Client Delivery Ready" },
    { feature: "Export Formats", free: "Standard CSV", pro: "Platform-Specific (Shopify/Amazon)", agency: "Platform-Specific + Custom" },
    { feature: "Uptime Guarantee", free: "Standard", pro: "✅ 99.9% Uptime", agency: "✅ 99.9% Uptime + Triple-Shield" },
    { feature: "Referral Rewards", free: "✅ +5 credits/signup", pro: "✅ +5 credits/signup", agency: "✅ +5 credits/signup" }

];

export default function PricingPage() {
    const [loadingTier, setLoadingTier] = useState<string | null>(null);
    const { isSignedIn } = useUser();

    const handleUpgrade = async (tierName: string) => {
        if (tierName === "Free") return;

        // Check if user is signed in
        if (!isSignedIn) {
            // Redirect to sign-in page with return URL
            window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`;
            return;
        }

        setLoadingTier(tierName);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tier: tierName.toLowerCase() }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || "Failed to initiate checkout");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoadingTier(null);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-teal-100">
            {/* Header */}
            <header className="container mx-auto px-4 py-6 backdrop-blur-sm bg-white/50 sticky top-0 z-50 border-b border-purple-100">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold gradient-text">
                            ⚡ DescriptAI
                        </div>
                    </Link>
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium transition">
                            Home
                        </Link>
                        <Link href="/history" className="text-gray-700 hover:text-purple-600 font-medium transition">
                            History
                        </Link>
                        <Link href="/generate" className="text-gray-700 hover:text-purple-600 font-medium transition">
                            Dashboard
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                        Simple, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Transparent</span> Pricing
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose the plan that fits your growth. Scale your product descriptions with the power of Elite AI Engines.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 flex flex-col ${tier.highlight ? "border-purple-600 scale-105 z-10" : "border-gray-50 hover:border-purple-200"
                                }`}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                <p className="text-gray-500 text-sm">{tier.description}</p>
                            </div>

                            <div className="mb-8 flex items-baseline">
                                <span className="text-5xl font-extrabold text-gray-900">{tier.price}</span>
                                {tier.period && <span className="text-gray-500 ml-1">{tier.period}</span>}
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center text-gray-600">
                                        <span className="text-green-500 mr-2 font-bold text-xl">✓</span>
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleUpgrade(tier.name)}
                                disabled={loadingTier === tier.name || tier.name === "Free"}
                                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${tier.buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loadingTier === tier.name ? "Processing..." : tier.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pro vs Agency Comparison Table */}
                <div className="max-w-5xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Pro vs Agency: What&apos;s the Difference?

                        </span>
                    </h2>
                    <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                        Both plans give you unlimited power. Agency adds advanced tools for managing multiple clients and brands.
                    </p>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                        <th className="px-6 py-4 text-left font-bold">Feature</th>
                                        <th className="px-6 py-4 text-center font-bold">Free</th>
                                        <th className="px-6 py-4 text-center font-bold bg-purple-700">Pro ($19)</th>
                                        <th className="px-6 py-4 text-center font-bold bg-gray-900">Agency ($49)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonFeatures.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                                            <td className="px-6 py-4 text-center text-sm text-gray-600">{row.free}</td>
                                            <td className="px-6 py-4 text-center text-sm font-semibold text-purple-700 bg-purple-50/50">{row.pro}</td>
                                            <td className="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-gray-100/50">{row.agency}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Summary */}
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border-2 border-purple-200">
                            <h3 className="text-2xl font-bold text-purple-800 mb-4">🔥 Pro ($19/mo)</h3>
                            <p className="text-gray-700 mb-4">Best for individual sellers, small stores, dropshippers</p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>✅ Everything to sell products effectively</li>
                                <li>✅ All platforms + all lengths</li>
                                <li>✅ Social media kit + SEO heatmap</li>
                                <li>✅ Unlimited generations</li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">🏆 Agency ($49/mo)</h3>
                            <p className="text-gray-700 mb-4">Best for marketing agencies, large teams, power users</p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>✅ Everything in Pro, plus:</li>
                                <li>✅ Custom SEO keywords input</li>
                                <li>✅ Brand voice presets & library</li>
                                <li>✅ Triple-shield resilience (zero downtime)</li>
                                <li>✅ Agency command suite + white-label</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h4>
                            <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time from your settings page. No questions asked.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">How do credits work?</h4>
                            <p className="text-gray-600 text-sm">On the free tier, you get 3 short and 2 medium generation credits per month. Pro and Agency users get unlimited access.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">What happens to my history if I cancel?</h4>
                            <p className="text-gray-600 text-sm">Your generation history is yours to keep. We will never delete your past work even if you downgrade.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Do you offer discounts for non-profits?</h4>
                            <p className="text-gray-600 text-sm">We love supporting good causes. Contact our support team for specialized pricing for charities and non-profits.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-2xl font-bold text-white mb-2">⚡ DescriptAI</div>
                    <p className="text-sm">Scale your business with AI-powered copy. Built for the modern merchant.</p>
                </div>
            </footer>
        </div>
    );
}
