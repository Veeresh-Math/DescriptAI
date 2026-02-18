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

// Pricing display configuration with annual discount (20% off)
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
        buttonClass: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:shadow-lg transform hover:scale-105"
    },
    {
        name: "Pro",
        priceMonthly: isIndia ? `₹${PRICING.pro.inr}` : `$${PRICING.pro.usd}`,
        priceYearly: isIndia ? `₹${Math.round(PRICING.pro.inr * 12 * 0.8)}` : `$${Math.round(PRICING.pro.usd * 12 * 0.8)}`,
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
        buttonClass: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:scale-105",
        savings: isAnnual ? (isIndia ? "Save ₹3,838/yr" : "Save $46/yr") : undefined
    },
    {
        name: "Agency",
        priceMonthly: isIndia ? `₹${PRICING.agency.inr}` : `$${PRICING.agency.usd}`,
        priceYearly: isIndia ? `₹${Math.round(PRICING.agency.inr * 12 * 0.8)}` : `$${Math.round(PRICING.agency.usd * 12 * 0.8)}`,
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
        buttonClass: "bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:shadow-2xl transform hover:scale-105 border-2 border-yellow-400",
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
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
            {/* Header */}
            <header className="container mx-auto px-4 py-6 backdrop-blur-sm bg-white/50 sticky top-0 z-50 border-b border-purple-100">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold gradient-text">
                            ⚡ DescriptAI
                        </div>
                        <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full font-semibold shadow-sm">
                            PREMIUM AI ENGINE
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium transition">
                            Home
                        </Link>
                        <Link href="/pricing" className="text-gray-700 hover:text-purple-600 font-bold transition">
                            ⭐ Pricing
                        </Link>
                        <Link href="/help" className="text-gray-700 hover:text-purple-600 font-medium transition">
                            Help
                        </Link>
                        <Link href="/generate" className="text-gray-700 hover:text-purple-600 font-medium transition">
                            Dashboard
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                        Simple, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Transparent</span> Pricing
                    </h1>
                    <p className="text-xl text-gray-800 max-w-2xl mx-auto">
                        Choose the plan that fits your growth. Scale your product descriptions with the power of Elite AI Engines.
                    </p>
                </div>

                {/* Trust Signals */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="flex flex-col items-center">
                                <div className="text-3xl mb-2">🔒</div>
                                <div className="text-sm font-bold text-gray-700">256-bit SSL</div>
                                <div className="text-xs text-gray-700">Secure Payment</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-3xl mb-2">💰</div>
                                <div className="text-sm font-bold text-gray-700">30-Day Guarantee</div>
                                <div className="text-xs text-gray-700">Money Back</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-3xl mb-2">🚫</div>
                                <div className="text-sm font-bold text-gray-700">No Hidden Fees</div>
                                <div className="text-xs text-gray-700">Cancel Anytime</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-3xl mb-2">⚡</div>
                                <div className="text-sm font-bold text-gray-700">99.9% Uptime</div>
                                <div className="text-xs text-gray-700">Reliable Service</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Gateway Badge */}
                {paymentGateway && (
                    <div className="text-center mb-8">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                            {isIndia ? "🇮🇳 Razorpay (India)" : "🌍 Stripe (Worldwide)"}
                            {isIndia && <span className="ml-2 text-xs">UPI • Cards • NetBanking</span>}
                        </span>
                    </div>
                )}

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white rounded-full p-1 shadow-lg border border-purple-100 inline-flex items-center">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-3 rounded-full font-bold transition-all ${
                                !isAnnual 
                                    ? "bg-purple-600 text-white shadow-md" 
                                    : "text-gray-800 hover:text-purple-600"
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                                isAnnual 
                                    ? "bg-purple-600 text-white shadow-md" 
                                    : "text-gray-800 hover:text-purple-600"
                            }`}
                        >
                            Annual
                            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Save 20%</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 flex flex-col ${
                                tier.highlight 
                                    ? "border-purple-600 scale-105 z-10" 
                                    : "border-gray-50 hover:border-purple-200"
                            }`}
                        >
                            {tier.name === "Pro" && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                                    Most Popular
                                </div>
                            )}

                            {tier.name === "Agency" && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                                    Best Value
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                <p className="text-gray-700 text-sm">{tier.description}</p>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-extrabold text-gray-900">
                                        {isAnnual ? tier.priceYearly : tier.priceMonthly}
                                    </span>
                                    {tier.period && (
                                        <span className="text-gray-700">
                                            {isAnnual ? "/yr" : tier.period}
                                        </span>
                                    )}
                                </div>
                                {tier.savings && (
                                    <div className="mt-2 text-green-600 font-bold text-sm">
                                        {tier.savings}
                                    </div>
                                )}
                                {tier.name !== "Free" && (
                                    <div className="text-gray-800 text-xs mt-1">
                                        Just {isIndia ? "₹" : "$"}{getDailyPrice(isAnnual ? 
                                            (tier.name === "Pro" ? PRICING.pro.usd * 12 * 0.8 / 12 : PRICING.agency.usd * 12 * 0.8 / 12) :
                                            (tier.name === "Pro" ? PRICING.pro.usd : PRICING.agency.usd)
                                        )}/day
                                    </div>
                                )}
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start text-gray-800 text-sm">
                                        <span className="text-green-500 mr-2 font-bold">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleUpgrade(tier.name)}
                                disabled={loadingTier === tier.name}
                                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${tier.buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loadingTier === tier.name ? "Processing..." : tier.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Money Back Guarantee Banner */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 border-2 border-green-200 text-center">
                        <div className="text-4xl mb-4">💯</div>
                        <h3 className="text-2xl font-bold text-green-800 mb-2">30-Day Money-Back Guarantee</h3>
                        <p className="text-green-700 mb-4">
                            Not satisfied? Get a full refund within 30 days. No questions asked.
                        </p>
                        <Link href="/refund" className="text-green-600 hover:underline font-bold">
                            View Refund Policy →
                        </Link>
                    </div>
                </div>

                {/* Pro vs Agency Comparison Table */}
                <div className="max-w-5xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Compare All Features
                        </span>
                    </h2>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                        <th className="px-6 py-4 text-left font-bold">Feature</th>
                                        <th className="px-6 py-4 text-center font-bold">Free</th>
                                        <th className="px-6 py-4 text-center font-bold bg-purple-700">Pro</th>
                                        <th className="px-6 py-4 text-center font-bold bg-gray-900">Agency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonFeatures.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                                            <td className="px-6 py-4 text-center text-sm text-gray-800">{row.free}</td>
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
                            <h3 className="text-2xl font-bold text-purple-800 mb-4">Pro - Best for Sellers</h3>
                            <p className="text-gray-700 mb-4">Perfect for Amazon FBA, Shopify stores, Etsy shops</p>
                            <ul className="space-y-2 text-sm text-gray-800">
                                <li>✅ 100 generations/month</li>
                                <li>✅ All platforms + all lengths</li>
                                <li>✅ Social media kit + SEO heatmap</li>
                                <li>✅ Priority support</li>
                            </ul>
                            <div className="mt-4 text-purple-600 font-bold">
                                {isIndia ? "₹1,599" : "$19"}/mo • Just {isIndia ? "₹53" : "$0.63"}/day
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border-2 border-gray-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Agency - Best for Teams</h3>
                            <p className="text-gray-700 mb-4">For marketing agencies, large teams, power users</p>
                            <ul className="space-y-2 text-sm text-gray-800">
                                <li>✅ Unlimited generations</li>
                                <li>✅ White-label + team seats</li>
                                <li>✅ API access + custom branding</li>
                                <li>✅ Dedicated account manager</li>
                            </ul>
                            <div className="mt-4 text-gray-800 font-bold">
                                {isIndia ? "₹3,999" : "$49"}/mo • Just {isIndia ? "₹133" : "$1.63"}/day
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h4>
                            <p className="text-gray-800 text-sm">Yes, you can cancel your subscription at any time from your settings page. No questions asked.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">How do credits work?</h4>
                            <p className="text-gray-800 text-sm">Free tier: 5 generations/month. Pro: 100/month. Agency: Unlimited. Credits reset monthly.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">What happens to my history if I cancel?</h4>
                            <p className="text-gray-800 text-sm">Your generation history is yours to keep. We will never delete your past work even if you downgrade.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Do you offer refunds?</h4>
                            <p className="text-gray-800 text-sm">Yes! We offer a 30-day money-back guarantee on all paid plans. <Link href="/refund" className="text-purple-600 hover:underline">Learn more</Link></p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Can I upgrade/downgrade?</h4>
                            <p className="text-gray-800 text-sm">Yes! Upgrade anytime with prorated billing. Downgrades take effect at the end of your billing period.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">What payment methods?</h4>
                            <p className="text-gray-800 text-sm">India: UPI, Cards, NetBanking via Razorpay. International: Cards via Stripe.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Do you offer discounts for non-profits?</h4>
                            <p className="text-gray-800 text-sm">We love supporting good causes. Contact <a href="mailto:support@descriptai.com" className="text-purple-600 hover:underline">support@descriptai.com</a> for special pricing.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Is there a free trial?</h4>
                            <p className="text-gray-800 text-sm">Our Free tier gives you 5 generations/month forever. No credit card required to start.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-bold text-white mb-4">⚡ DescriptAI</div>
                            <p className="text-sm">Scale your business with AI-powered copy. Built for the modern merchant.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/pricing" className="hover:text-purple-400 transition">Pricing</Link></li>
                                <li><Link href="/generate" className="hover:text-purple-400 transition">Dashboard</Link></li>
                                <li><Link href="/history" className="hover:text-purple-400 transition">History</Link></li>
                                <li><Link href="/help" className="hover:text-purple-400 transition">Help Center</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/privacy" className="hover:text-purple-400 transition">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-purple-400 transition">Terms of Service</Link></li>
                                <li><Link href="/refund" className="hover:text-purple-400 transition">Refund Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="mailto:support@descriptai.com" className="hover:text-purple-400 transition">support@descriptai.com</a></li>
                                <li><a href="https://twitter.com/descriptai" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">Twitter</a></li>
                                <li><a href="https://linkedin.com/company/descriptai" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">LinkedIn</a></li>
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