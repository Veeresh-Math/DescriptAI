"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { PRICING, detectPaymentGateway } from "@/lib/payments";

interface PricingTier {
  name: string;
  priceMonthly: string;
  priceYearly: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  highlight: boolean;
  buttonClass: string;
  savings?: string;
}

// Pricing display configuration - INR + USD (Razorpay for all countries)
const getPricingTiers = (isIndia: boolean, isAnnual: boolean): PricingTier[] => [
    {
        name: "Free",
        priceMonthly: isIndia ? "₹0" : "$0",
        priceYearly: isIndia ? "₹0" : "$0",
        description: "Perfect for testing the waters",
        features: [
            "🚀 5 Free AI Generations/Month",
            "🌍 Basic Languages (English, Spanish, French)",
            "📋 Single Description Mode",
            "🛍️ One Platform (Amazon OR Shopify)",
            "🔧 Basic Tools (Automotive only)",
            "📄 Standard CSV Export",
            "🎁 Referral Rewards (+3 bonus generations)"
        ],
        buttonText: "Start Free",
        highlight: false,
        buttonClass: "bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 hover:shadow-md"
    },
    {
        name: "Pro",
        priceMonthly: isIndia ? `₹${PRICING.pro.inr}` : `${PRICING.pro.usd}`,
        priceYearly: isIndia ? `₹${Math.round(PRICING.pro.inr * 12 * 0.8)}` : `${Math.round(PRICING.pro.usd * 12 * 0.8)}`,
        period: "/mo",
        description: "For serious e-commerce sellers",
        features: [
            "🔥 100 AI Generations/Month",
            "📊 Bulk Generation (50 descriptions)",
            "🌍 All Languages (25+)",
            "🛍️ All 4 Platforms (Amazon/Shopify/Etsy/eBay)",
            "📏 All 3 Lengths (Short/Medium/Long)",
            "⚡ Full Social Media Kit",
            "🔥 Advanced SEO Heatmap",
            "📥 Platform-Specific Exports",
            "🚀 Priority Support"
        ],
        buttonText: "Upgrade to Pro",
        highlight: true,
        buttonClass: "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg",
        savings: isAnnual ? (isIndia ? "Save ₹3,838/yr" : "Save $46/yr") : undefined
    },
    {
        name: "Agency",
        priceMonthly: isIndia ? `₹${PRICING.agency.inr}` : `${PRICING.agency.usd}`,
        priceYearly: isIndia ? `₹${Math.round(PRICING.agency.inr * 12 * 0.8)}` : `${Math.round(PRICING.agency.usd * 12 * 0.8)}`,
        period: "/mo",
        description: "For agencies & high-volume teams",
        features: [
            "♾️ Unlimited AI Generations",
            "📊 Bulk Generation (1000+ at once)",
            "🏆 Agency Command Suite",
            "🎨 Custom Brand Voice Presets",
            "🏷️ Full White-label",
            "👥 Team Collaboration (50 seats)",
            "📞 Dedicated Account Manager",
            "⚡ Priority API Access",
            "🔐 SSO & Enterprise Security"
        ],
        buttonText: "Go Agency",
        highlight: true,
        buttonClass: "bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200",
        savings: isAnnual ? (isIndia ? "Save ₹9,598/yr" : "Save $118/yr") : undefined
    }
];


const comparisonFeatures = [
    { feature: "AI Generations", free: "5/month + 3 referral bonus", pro: "100/month", agency: "♾️ Unlimited" },
    { feature: "Bulk Generation", free: "❌ Single only", pro: "✅ 50 descriptions", agency: "✅ 500+ descriptions" },
    { feature: "Multi-Language Support", free: "3 basic languages", pro: "✅ 25+ languages", agency: "✅ All languages" },
    { feature: "Platforms", free: "Amazon OR Shopify", pro: "✅ All 4 (Amazon/Shopify/Etsy/eBay)", agency: "✅ All 4 + API access" },
    { feature: "Shopify Integration", free: "❌", pro: "✅ Direct sync & updates", agency: "✅ Advanced Shopify API" },
    { feature: "Tools Ecosystem", free: "✅ Automotive only", pro: "✅ All categories", agency: "✅ Custom tool categories" },
    { feature: "Description Lengths", free: "Short (120w) + Medium (250w)", pro: "✅ All 3 (Short/Medium/Long 500w)", agency: "✅ All 3 + custom lengths" },
    { feature: "Tones & Personas", free: "Basic tones", pro: "✅ All Tones + Expert Personas", agency: "✅ Custom brand voices" },
    { feature: "Social Media Kit", free: "❌", pro: "✅ Instagram + Twitter + Facebook + LinkedIn", agency: "✅ All platforms + custom" },
    { feature: "SEO Heatmap", free: "❌", pro: "✅ Advanced Heatmap + keywords", agency: "✅ Custom SEO strategies" },
    { feature: "Custom SEO Keywords", free: "❌", pro: "✅ Basic keyword input", agency: "✅ Advanced keyword targeting" },
    { feature: "Brand Voice Presets", free: "❌", pro: "✅ Standard presets", agency: "✅ Unlimited custom voices" },
    { feature: "Triple-Shield Resilience", free: "❌", pro: "✅ 99.9% Uptime", agency: "✅ Zero downtime guarantee" },
    { feature: "Agency Command Suite", free: "❌", pro: "❌", agency: "✅ Multi-client management" },
    { feature: "White-label Options", free: "❌", pro: "❌", agency: "✅ Full white-label delivery" },
    { feature: "Export Formats", free: "Standard CSV", pro: "Platform-specific exports", agency: "Custom export formats" },
    { feature: "Team Collaboration", free: "❌", pro: "❌", agency: "✅ Multi-user access" },
    { feature: "Priority Support", free: "Standard", pro: "✅ Priority support", agency: "✅ Dedicated account manager" },
    { feature: "API Access", free: "❌", pro: "❌", agency: "✅ Full API access" },
    { feature: "Referral Program", free: "✅ +3 bonus generations", pro: "✅ +5 credits/signup", agency: "✅ Custom referral rewards" }
];

export default function PricingPage() {
    const [loadingTier, setLoadingTier] = useState<string | null>(null);
    const [isIndia, setIsIndia] = useState(false);
    const [paymentGateway, setPaymentGateway] = useState<string>("");
    const [isAnnual, setIsAnnual] = useState(false);
    const { isSignedIn, user } = useUser();

    // Detect user's country on mount
    useEffect(() => {
        const detectCountry = async () => {
            try {
                const res = await fetch("https://ipapi.co/json/");
                const data = await res.json();
                const india = data.country_code === "IN";
                setIsIndia(india);
                setPaymentGateway(india ? "Razorpay" : "Stripe");
            } catch {
                // Default to Stripe if detection fails
                setIsIndia(false);
                setPaymentGateway("Stripe");
            }
        };
        detectCountry();
    }, []);

    const handleUpgrade = async (tierName: string) => {
        if (tierName === "Free") {
            // Redirect to sign-up for free tier
            window.location.href = "/sign-up";
            return;
        }

        // Check if user is signed in
        if (!isSignedIn) {
            window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`;
            return;
        }

        setLoadingTier(tierName);
        try {
            // Use appropriate gateway based on country
            const endpoint = isIndia ? "/api/checkout/razorpay" : "/api/checkout/stripe";
            
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    tier: tierName.toLowerCase(),
                    billingCycle: isAnnual ? "annual" : "monthly"
                }),
            });
            
            const data = await res.json();
            
            if (data.url) {
                // Stripe redirect
                window.location.href = data.url;
            } else if (data.orderId) {
                // Razorpay checkout
                const options = {
                    key: data.keyId,
                    amount: data.amount,
                    currency: data.currency,
                    name: "DescriptAI",
                    description: `${data.planName} Plan`,
                    order_id: data.orderId,
                    handler: function (response: unknown) {
                        alert("Payment successful! Your account has been upgraded.");
                        window.location.href = "/generate";
                    },
                    prefill: {
                        name: user?.firstName || "",
                        email: user?.emailAddresses?.[0]?.emailAddress || "",
                        contact: ""
                    },
                    theme: {
                        color: "#7c3aed"
                    }
                };
                
                // Load Razorpay script dynamically
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => {
                    // @ts-expect-error Razorpay is loaded from external script
                    const rzp = new window.Razorpay(options);
                    rzp.open();
                };
                document.body.appendChild(script);
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

    const pricingTiers = getPricingTiers(isIndia, isAnnual);

    // Calculate daily price
    const getDailyPrice = (monthlyPrice: number) => {
        return (monthlyPrice / 30).toFixed(2);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            {/* Header */}
            <header className="container mx-auto px-4 py-6 bg-black/50 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold text-white">
                            ⚡ DescriptAI
                        </div>
                        <span className="text-xs bg-gradient-to-r from-red-600 to-amber-500 text-white px-2 py-1 rounded-full font-semibold">
                            PREMIUM AI
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-gray-400 hover:text-white font-medium transition">
                            Home
                        </Link>
                        <Link href="/pricing" className="text-white font-bold transition">
                            ⭐ Pricing
                        </Link>
                        <Link href="/help" className="text-gray-400 hover:text-white font-medium transition">
                            Help
                        </Link>
                        <Link href="/generate" className="text-gray-400 hover:text-white font-medium transition">
                            Dashboard
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Choose the plan that fits your growth. Scale your product descriptions with the power of Elite AI Engines.
                    </p>
                </div>

                {/* Trust Signals */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white/5 rounded-xl shadow-sm p-6 border border-white/10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="flex flex-col items-center">
                                <div className="text-2xl mb-2">🔒</div>
                                <div className="text-sm font-semibold text-white">256-bit SSL</div>
                                <div className="text-xs text-gray-400">Secure Payment</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-2xl mb-2">💰</div>
                                <div className="text-sm font-semibold text-white">30-Day Guarantee</div>
                                <div className="text-xs text-gray-400">Money Back</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-2xl mb-2">🚫</div>
                                <div className="text-sm font-semibold text-white">No Hidden Fees</div>
                                <div className="text-xs text-gray-400">Cancel Anytime</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-2xl mb-2">⚡</div>
                                <div className="text-sm font-semibold text-white">99.9% Uptime</div>
                                <div className="text-xs text-gray-400">Reliable Service</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Gateway Badge */}
                {paymentGateway && (
                    <div className="text-center mb-8">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 text-sm font-medium">
                            {isIndia ? "🇮🇳 Razorpay (India)" : "🌍 Stripe (Worldwide)"}
                            {isIndia && <span className="ml-2 text-xs text-gray-300">UPI • Cards • NetBanking</span>}
                        </span>
                    </div>
                )}

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white/10 rounded-lg p-1 shadow-sm border border-white/10 inline-flex items-center">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all ${
                                !isAnnual 
                                    ? "bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm" 
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all flex items-center gap-2 ${
                                isAnnual 
                                    ? "bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm" 
                                    : "text-gray-400 hover:text-white"
                            }`}
                        >
                            Annual
                            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">Save 20%</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-xl p-8 shadow-sm border transition-all duration-200 flex flex-col ${
                                tier.highlight 
                                    ? "border-indigo-600 border-2 scale-100" 
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            {tier.name === "Pro" && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
                                    Most Popular
                                </div>
                            )}

                            {tier.name === "Agency" && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
                                    Best Value
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                <p className="text-gray-500 text-sm">{tier.description}</p>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-gray-900">
                                        {isAnnual ? tier.priceYearly : tier.priceMonthly}
                                    </span>
                                    {tier.period && (
                                        <span className="text-gray-500">
                                            {isAnnual ? "/yr" : tier.period}
                                        </span>
                                    )}
                                </div>
                                {tier.savings && (
                                    <div className="mt-2 text-green-600 font-medium text-sm">
                                        {tier.savings}
                                    </div>
                                )}
                                {tier.name !== "Free" && (
                                    <div className="text-gray-400 text-xs mt-1">
                                        Just {isIndia ? "₹" : "$"}{getDailyPrice(isAnnual ? 
                                            (tier.name === "Pro" ? PRICING.pro.usd * 12 * 0.8 / 12 : PRICING.agency.usd * 12 * 0.8 / 12) :
                                            (tier.name === "Pro" ? PRICING.pro.usd : PRICING.agency.usd)
                                        )}/day
                                    </div>
                                )}
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start text-gray-600 text-sm">
                                        <span className="text-indigo-600 mr-2 font-bold">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleUpgrade(tier.name)}
                                disabled={loadingTier === tier.name}
                                className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${tier.buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loadingTier === tier.name ? "Processing..." : tier.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Money Back Guarantee Banner */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="bg-white/5 rounded-xl p-8 border border-white/10 text-center">
                        <div className="text-3xl mb-3">💯</div>
                        <h3 className="text-xl font-bold text-white mb-2">30-Day Money-Back Guarantee</h3>
                        <p className="text-gray-400 mb-4">
                            Not satisfied? Get a full refund within 30 days. No questions asked.
                        </p>
                        <Link href="/refund" className="text-amber-400 hover:underline font-medium">
                            View Refund Policy →
                        </Link>
                    </div>
                </div>

                {/* Pro vs Agency Comparison Table */}
                <div className="max-w-5xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">
                        Compare All Features
                    </h2>

                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-900 text-white">
                                        <th className="px-6 py-4 text-left font-semibold text-sm">Feature</th>
                                        <th className="px-6 py-4 text-center font-semibold text-sm">Free</th>
                                        <th className="px-6 py-4 text-center font-semibold text-sm bg-indigo-700">Pro</th>
                                        <th className="px-6 py-4 text-center font-semibold text-sm bg-gray-800">Agency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonFeatures.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="px-6 py-4 font-medium text-gray-900 text-sm">{row.feature}</td>
                                            <td className="px-6 py-4 text-center text-sm text-gray-600">{row.free}</td>
                                            <td className="px-6 py-4 text-center text-sm font-medium text-indigo-700 bg-indigo-50/30">{row.pro}</td>
                                            <td className="px-6 py-4 text-center text-sm font-medium text-gray-900 bg-gray-50/50">{row.agency}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Summary */}
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Pro - Best for Sellers</h3>
                            <p className="text-gray-600 text-sm mb-4">Perfect for Amazon FBA, Shopify stores, Etsy shops</p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>✓ 100 generations/month</li>
                                <li>✓ All platforms + all lengths</li>
                                <li>✓ Social media kit + SEO heatmap</li>
                                <li>✓ Priority support</li>
                            </ul>
                            <div className="mt-4 text-indigo-600 font-semibold">
                                {isIndia ? "₹1,599" : "$19"}/mo • Just {isIndia ? "₹53" : "$0.63"}/day
                            </div>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-xl">
                            <h3 className="text-lg font-bold text-white mb-3">Agency - Best for Teams</h3>
                            <p className="text-gray-400 text-sm mb-4">For marketing agencies, large teams, power users</p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>✓ Unlimited generations</li>
                                <li>✓ White-label + team seats</li>
                                <li>✓ API access + custom branding</li>
                                <li>✓ Dedicated account manager</li>
                            </ul>
                            <div className="mt-4 text-white font-semibold">
                                {isIndia ? "₹3,999" : "$49"}/mo • Just {isIndia ? "₹133" : "$1.63"}/day
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
                            <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time from your settings page. No questions asked.</p>
                        </div>
                        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">How do credits work?</h4>
                            <p className="text-gray-600 text-sm">Free tier: 5 generations/month. Pro: 100/month. Agency: Unlimited. Credits reset monthly.</p>
                        </div>
                        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">What happens to my history if I cancel?</h4>
                            <p className="text-gray-600 text-sm">Your generation history is yours to keep. We will never delete your past work even if you downgrade.</p>
                        </div>
                        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h4>
                            <p className="text-gray-600 text-sm">Yes! We offer a 30-day money-back guarantee on all paid plans. <Link href="/refund" className="text-indigo-600 hover:underline">Learn more</Link></p>
                        </div>
                        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">Can I upgrade/downgrade?</h4>
                            <p className="text-gray-600 text-sm">Yes! Upgrade anytime with prorated billing. Downgrades take effect at the end of your billing period.</p>
                        </div>
                        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">What payment methods?</h4>
                            <p className="text-gray-600 text-sm">India: UPI, Cards, NetBanking via Razorpay. International: Cards via Stripe.</p>
                        </div>
                        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">Do you offer discounts for non-profits?</h4>
                            <p className="text-gray-600 text-sm">We love supporting good causes. Contact <a href="mailto:support@descriptai.com" className="text-indigo-600 hover:underline">support@descriptai.com</a> for special pricing.</p>
                        </div>
                        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
                            <p className="text-gray-600 text-sm">Our Free tier gives you 5 generations/month forever. No credit card required to start.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-xl font-bold text-white mb-4">⚡ DescriptAI</div>
                            <p className="text-sm">Scale your business with AI-powered copy. Built for the modern merchant.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                                <li><Link href="/generate" className="hover:text-white transition">Dashboard</Link></li>
                                <li><Link href="/history" className="hover:text-white transition">History</Link></li>
                                <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                                <li><Link href="/refund" className="hover:text-white transition">Refund Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="mailto:support@descriptai.com" className="hover:text-white transition">support@descriptai.com</a></li>
                                <li><a href="https://twitter.com/descriptai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Twitter</a></li>
                                <li><a href="https://linkedin.com/company/descriptai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>© {new Date().getFullYear()} DescriptAI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}