"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "@/lib/auth-compat";
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
        buttonClass: "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
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
        buttonClass: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)]",
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
        buttonClass: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]",
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

        // Check if user is signed in - if not, still allow demo checkout
        if (!isSignedIn) {
            alert("Please sign in to upgrade. Redirecting to sign-in...");
            window.location.href = `/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`;
            return;
        }

        setLoadingTier(tierName);
        try {
            // Always use Razorpay for all payments
            const endpoint = "/api/checkout/razorpay";
            
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    tier: tierName.toLowerCase(),
                    billingCycle: isAnnual ? "annual" : "monthly"
                }),
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                alert(data.error || "Payment error - please try again");
                setLoadingTier(null);
                return;
            }
            
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
        <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                    25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                    50% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
                    75% { transform: translateY(-30px) translateX(5px); opacity: 0.7; }
                }
                @keyframes glow-pro {
                    0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1); }
                    50% { box-shadow: 0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.2); }
                }
                @keyframes glow-agency {
                    0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(168, 85, 247, 0.1); }
                    50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.2); }
                }
            `}</style>

            {/* Customer Reviews Slider */}
            <div className="relative z-10 py-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        What Our Customers Say
                    </span>
                </h2>
                <div className="relative overflow-hidden py-4">
                    <div className="flex animate-scroll gap-6 hover:pause">
                        {/* First set of reviews */}
                        {[
                            { name: "James M.", role: "Amazon Seller", text: "Doubled my sales in 2 weeks! The descriptions are incredible.", rating: "⭐⭐⭐⭐⭐" },
                            { name: "Sarah K.", role: "Shopify Store Owner", text: "Best AI tool for e-commerce. Saves me 5+ hours daily.", rating: "⭐⭐⭐⭐⭐" },
                            { name: "Mike R.", role: "Etsy Shop", text: "My listings finally rank on page 1! Worth every penny.", rating: "⭐⭐⭐⭐⭐" },
                            { name: "Lisa T.", role: "FBA Seller", text: "Generated 500+ descriptions in one day. Game changer!", rating: "⭐⭐⭐⭐⭐" },
                            { name: "David W.", role: "Digital Agency", text: "Our clients love the quality. We've upgraded to Agency plan.", rating: "⭐⭐⭐⭐⭐" },
                            { name: "Anna P.", role: "E-commerce Founder", text: "Finally, AI that actually converts! My ROI increased 3x.", rating: "⭐⭐⭐⭐⭐" },
                        ].map((review, i) => (
                            <div key={i} className="flex-shrink-0 w-80 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                <div className="flex items-center gap-1 mb-2">{review.rating}</div>
                                <p className="text-gray-200 text-sm mb-3">"{review.text}"</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-xs">{review.name}</p>
                                        <p className="text-gray-400 text-[10px]">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {[
                            { name: "James M.", role: "Amazon Seller", text: "Doubled my sales in 2 weeks! The descriptions are incredible.", rating: "⭐⭐⭐⭐⭐" },
                            { name: "Sarah K.", role: "Shopify Store Owner", text: "Best AI tool for e-commerce. Saves me 5+ hours daily.", rating: "⭐⭐⭐⭐⭐" },
                            { name: "Mike R.", role: "Etsy Shop", text: "My listings finally rank on page 1! Worth every penny.", rating: "⭐⭐⭐⭐⭐" },
                            { name: "Lisa T.", role: "FBA Seller", text: "Generated 500+ descriptions in one day. Game changer!", rating: "⭐⭐⭐⭐⭐" },
                            { name: "David W.", role: "Digital Agency", text: "Our clients love the quality. We've upgraded to Agency plan.", rating: "⭐⭐⭐⭐⭐" },
                            { name: "Anna P.", role: "E-commerce Founder", text: "Finally, AI that actually converts! My ROI increased 3x.", rating: "⭐⭐⭐⭐⭐" },
                        ].map((review, i) => (
                            <div key={`dup-${i}`} className="flex-shrink-0 w-80 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                <div className="flex items-center gap-1 mb-2">{review.rating}</div>
                                <p className="text-gray-200 text-sm mb-3">"{review.text}"</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-xs">{review.name}</p>
                                        <p className="text-gray-400 text-[10px]">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>

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
                            🌏 Razorpay (Worldwide)
                            <span className="ml-2 text-xs text-gray-300">UPI • Cards • NetBanking • International</span>
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
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 relative z-10">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 transition-all duration-500 flex flex-col group ${
                                tier.highlight 
                                    ? tier.name === "Pro"
                                        ? "bg-white/10 backdrop-blur-lg border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:border-cyan-400 hover:-translate-y-2"
                                        : "bg-white/10 backdrop-blur-lg border-2 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(168,85,247,0.5)] hover:border-purple-400 hover:-translate-y-2"
                                    : "bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:border-white/40 hover:-translate-y-2"
                            }`}
                            style={{
                                animation: tier.highlight ? `glow-${tier.name.toLowerCase()} 2s ease-in-out infinite` : undefined
                            }}
                        >
                            {/* Animated border gradient */}
                            {tier.highlight && (
                                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                                    tier.name === "Pro" 
                                        ? "bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20"
                                        : "bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20"
                                }`} />
                            )}
                            {tier.name === "Pro" && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse">
                                    Most Popular
                                </div>
                            )}

                            {tier.name === "Agency" && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse">
                                    Best Value
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                <p className="text-gray-300 text-sm">{tier.description}</p>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">
                                        {isAnnual ? tier.priceYearly : tier.priceMonthly}
                                    </span>
                                    {tier.period && (
                                        <span className="text-gray-400">
                                            {isAnnual ? "/yr" : tier.period}
                                        </span>
                                    )}
                                </div>
                                {tier.savings && (
                                    <div className="mt-2 text-cyan-400 font-medium text-sm">
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
                                    <li key={fIndex} className="flex items-start text-gray-200 text-sm">
                                        <span className="text-cyan-400 mr-2 font-bold">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log("Link clicked for:", tier.name);
                                    alert("Testing: " + tier.name + " button works!");
                                    handleUpgrade(tier.name);
                                }}
                                className={`block w-full py-3 rounded-lg font-medium transition-all duration-200 text-center ${tier.buttonClass}`}
                            >
                                {tier.buttonText}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Money Back Guarantee Banner */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <div className="text-4xl mb-3">💯</div>
                        <h3 className="text-xl font-bold text-white mb-2">30-Day Money-Back Guarantee</h3>
                        <p className="text-gray-300 mb-4">
                            Not satisfied? Get a full refund within 30 days. No questions asked.
                        </p>
                        <Link href="/refund" className="text-cyan-400 hover:text-cyan-300 font-medium">
                            View Refund Policy →
                        </Link>
                    </div>
                </div>

                {/* Pro vs Agency Comparison Table */}
                <div className="max-w-5xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">
                        Compare All Features
                    </h2>

                    <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/10">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-white/20 to-white/10 text-white backdrop-blur">
                                        <th className="px-6 py-4 text-left font-semibold text-sm">Feature</th>
                                        <th className="px-6 py-4 text-center font-semibold text-sm">Free</th>
                                        <th className="px-6 py-4 text-center font-semibold text-sm bg-cyan-500/20">Pro</th>
                                        <th className="px-6 py-4 text-center font-semibold text-sm bg-purple-500/20">Agency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonFeatures.map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-white/5" : "bg-white/10"}>
                                            <td className="px-6 py-4 font-medium text-white text-sm">{row.feature}</td>
                                            <td className="px-6 py-4 text-center text-sm text-gray-300">{row.free}</td>
                                            <td className="px-6 py-4 text-center text-sm font-medium text-cyan-400 bg-cyan-500/10">{row.pro}</td>
                                            <td className="px-6 py-4 text-center text-sm font-medium text-purple-400 bg-purple-500/10">{row.agency}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Summary */}
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-cyan-500/20">
                            <h3 className="text-lg font-bold text-white mb-3">Pro - Best for Sellers</h3>
                            <p className="text-gray-300 text-sm mb-4">Perfect for Amazon FBA, Shopify stores, Etsy shops</p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>✓ 100 generations/month</li>
                                <li>✓ All platforms + all lengths</li>
                                <li>✓ Social media kit + SEO heatmap</li>
                                <li>✓ Priority support</li>
                            </ul>
                            <div className="mt-4 text-cyan-400 font-semibold">
                                {isIndia ? "₹1,599" : "$19"}/mo • Just {isIndia ? "₹53" : "$0.63"}/day
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-purple-500/20">
                            <h3 className="text-lg font-bold text-white mb-3">Agency - Best for Teams</h3>
                            <p className="text-gray-300 text-sm mb-4">For marketing agencies, large teams, power users</p>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li>✓ Unlimited generations</li>
                                <li>✓ White-label + team seats</li>
                                <li>✓ API access + custom branding</li>
                                <li>✓ Dedicated account manager</li>
                            </ul>
                            <div className="mt-4 text-purple-400 font-semibold">
                                {isIndia ? "₹3,999" : "$49"}/mo • Just {isIndia ? "₹133" : "$1.63"}/day
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/10">
                            <h4 className="font-semibold text-white mb-2">Can I cancel anytime?</h4>
                            <p className="text-gray-300 text-sm">Yes, you can cancel your subscription at any time from your settings page. No questions asked.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/10">
                            <h4 className="font-semibold text-white mb-2">How do credits work?</h4>
                            <p className="text-gray-300 text-sm">Free tier: 5 generations/month. Pro: 100/month. Agency: Unlimited. Credits reset monthly.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/10">
                            <h4 className="font-semibold text-white mb-2">What happens to my history if I cancel?</h4>
                            <p className="text-gray-300 text-sm">Your generation history is yours to keep. We will never delete your past work even if you downgrade.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/10">
                            <h4 className="font-semibold text-white mb-2">Do you offer refunds?</h4>
                            <p className="text-gray-300 text-sm">Yes! We offer a 30-day money-back guarantee on all paid plans. <Link href="/refund" className="text-cyan-400 hover:underline">Learn more</Link></p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/10">
                            <h4 className="font-semibold text-white mb-2">Can I upgrade/downgrade?</h4>
                            <p className="text-gray-300 text-sm">Yes! Upgrade anytime with prorated billing. Downgrades take effect at the end of your billing period.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/10">
                            <h4 className="font-semibold text-white mb-2">What payment methods?</h4>
                            <p className="text-gray-300 text-sm">Secure payments via Razorpay - Supports UPI, Cards, NetBanking & International Payments!</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/10">
                            <h4 className="font-semibold text-white mb-2">Do you offer discounts for non-profits?</h4>
                            <p className="text-gray-300 text-sm">We love supporting good causes. Contact <a href="mailto:support@descriptai.com" className="text-cyan-400 hover:underline">support@descriptai.com</a> for special pricing.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/10">
                            <h4 className="font-semibold text-white mb-2">Is there a free trial?</h4>
                            <p className="text-gray-300 text-sm">Our Free tier gives you 5 generations/month forever. No credit card required to start.</p>
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
