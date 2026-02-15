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
  popular?: boolean;
}

// Pricing display configuration with annual discount (20% off)
const getPricingTiers = (isIndia: boolean, isAnnual: boolean): PricingTier[] => [
    {
        name: "Free",
        priceMonthly: isIndia ? "0" : "0",
        priceYearly: isIndia ? "0" : "0",
        description: "Perfect for testing the waters",
        features: [
            "5 Free AI Generations/Month",
            "Basic Languages (English, Spanish, French)",
            "Single Description Mode",
            "One Platform (Amazon OR Shopify)",
            "Basic Tools (Automotive only)",
            "Standard CSV Export",
            "Referral Rewards (+3 bonus generations)"
        ],
        buttonText: "Start Free",
        highlight: false,
        popular: false,
        buttonClass: "bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40"
    },
    {
        name: "Pro",
        priceMonthly: isIndia ? `${PRICING.pro.inr}` : `${PRICING.pro.usd}`,
        priceYearly: isIndia ? `${Math.round(PRICING.pro.inr * 12 * 0.8)}` : `${Math.round(PRICING.pro.usd * 12 * 0.8)}`,
        period: "/mo",
        description: "For serious e-commerce sellers",
        features: [
            "100 AI Generations/Month",
            "Bulk Generation (50 descriptions)",
            "All Languages (25+)",
            "All 4 Platforms (Amazon/Shopify/Etsy/eBay)",
            "All 3 Lengths (Short/Medium/Long)",
            "Full Social Media Kit",
            "Advanced SEO Heatmap",
            "Platform-Specific Exports",
            "Priority Support"
        ],
        buttonText: "Upgrade to Pro",
        highlight: true,
        popular: true,
        buttonClass: "bg-gradient-to-r from-red-700 via-pink-500 to-red-700 text-white hover:opacity-90 shadow-lg shadow-yellow-600/30",
        savings: isAnnual ? (isIndia ? "Save 3,838/yr" : "Save $46/yr") : undefined
    },
    {
        name: "Agency",
        priceMonthly: isIndia ? `${PRICING.agency.inr}` : `${PRICING.agency.usd}`,
        priceYearly: isIndia ? `${Math.round(PRICING.agency.inr * 12 * 0.8)}` : `${Math.round(PRICING.agency.usd * 12 * 0.8)}`,
        period: "/mo",
        description: "For agencies & high-volume teams",
        features: [
            "Unlimited AI Generations",
            "Bulk Generation (1000+ at once)",
            "Agency Command Suite",
            "Custom Brand Voice Presets",
            "Full White-label",
            "Team Collaboration (50 seats)",
            "Dedicated Account Manager",
            "Priority API Access",
            "SSO & Enterprise Security"
        ],
        buttonText: "Go Agency",
        highlight: true,
        popular: false,
        buttonClass: "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white hover:opacity-90 shadow-lg shadow-yellow-500/30",
        savings: isAnnual ? (isIndia ? "Save 9,598/yr" : "Save $118/yr") : undefined
    }
];


const comparisonFeatures = [
    { feature: "AI Generations", free: "5/month + 3 referral bonus", pro: "100/month", agency: "Unlimited" },
    { feature: "Bulk Generation", free: "Single only", pro: "50 descriptions", agency: "500+ descriptions" },
    { feature: "Multi-Language Support", free: "3 basic languages", pro: "25+ languages", agency: "All languages" },
    { feature: "Platforms", free: "Amazon OR Shopify", pro: "All 4 (Amazon/Shopify/Etsy/eBay)", agency: "All 4 + API access" },
    { feature: "Shopify Integration", free: "-", pro: "Direct sync & updates", agency: "Advanced Shopify API" },
    { feature: "Tools Ecosystem", free: "Automotive only", pro: "All categories", agency: "Custom tool categories" },
    { feature: "Description Lengths", free: "Short + Medium", pro: "All 3 (Short/Medium/Long)", agency: "All 3 + custom lengths" },
    { feature: "Tones & Personas", free: "Basic tones", pro: "All Tones + Expert Personas", agency: "Custom brand voices" },
    { feature: "Social Media Kit", free: "-", pro: "Instagram + Twitter + Facebook + LinkedIn", agency: "All platforms + custom" },
    { feature: "SEO Heatmap", free: "-", pro: "Advanced Heatmap + keywords", agency: "Custom SEO strategies" },
    { feature: "Custom SEO Keywords", free: "-", pro: "Basic keyword input", agency: "Advanced keyword targeting" },
    { feature: "Brand Voice Presets", free: "-", pro: "Standard presets", agency: "Unlimited custom voices" },
    { feature: "Triple-Shield Resilience", free: "-", pro: "99.9% Uptime", agency: "Zero downtime guarantee" },
    { feature: "Agency Command Suite", free: "-", pro: "-", agency: "Multi-client management" },
    { feature: "White-label Options", free: "-", pro: "-", agency: "Full white-label delivery" },
    { feature: "Export Formats", free: "Standard CSV", pro: "Platform-specific exports", agency: "Custom export formats" },
    { feature: "Team Collaboration", free: "-", pro: "-", agency: "Multi-user access" },
    { feature: "Priority Support", free: "Standard", pro: "Priority support", agency: "Dedicated account manager" },
    { feature: "API Access", free: "-", pro: "-", agency: "Full API access" },
    { feature: "Referral Program", free: "+3 bonus generations", pro: "+5 credits/signup", agency: "Custom referral rewards" }
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
                        color: "#1e3a8a"
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
        <div className={`min-h-screen bg-[#0a0a0f] text-white overflow-hidden transition-colors duration-500 ${isAnnual ? 'bg-[#1a1500]' : ''}`}>
            {/* Aurora Background Effect */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br rounded-full blur-3xl animate-pulse transition-all duration-500 ${isAnnual ? 'from-yellow-600/30' : 'from-red-700/20'}`}></div>
                <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl rounded-full blur-3xl animate-pulse delay-1000 transition-all duration-500 ${isAnnual ? 'from-amber-500/30' : 'from-red-600/20'}`}></div>
                <div className={`absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-bl rounded-full blur-3xl transition-all duration-500 ${isAnnual ? 'from-yellow-500/20' : 'from-red-600/10'}`}></div>
            </div>

            {/* Header */}
            <header className="container mx-auto px-4 py-6 sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/5">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-500 via-amber-400 to-green-500 bg-clip-text text-transparent">
                            DescriptAI
                        </div>
                        <span className="text-xs bg-gradient-to-r from-red-600 to-amber-500 text-white px-2 py-1 rounded-full font-semibold shadow-lg shadow-yellow-600/20">
                            PREMIUM AI ENGINE
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-gray-400 hover:text-white font-medium transition">
                            Home
                        </Link>
                        <Link href="/pricing" className="text-white font-bold transition">
                            Pricing
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

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                        Simple Pricing
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                        Choose the plan that fits your growth. Scale your product descriptions with the power of Elite AI Engines.
                    </p>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium text-gray-300">256-bit SSL</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium text-gray-300">30-Day Guarantee</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-300">No Hidden Fees</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium text-gray-300">99.9% Uptime</span>
                        </div>
                    </div>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <span className={`text-sm font-medium transition ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative w-16 h-8 rounded-full transition-all duration-500 ${isAnnual ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 'bg-white/10'}`}
                        >
                            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-500 ${isAnnual ? 'left-9' : 'left-1'}`}></div>
                        </button>
                        <span className={`text-sm font-medium transition ${isAnnual ? 'text-yellow-400' : 'text-gray-500'}`}>Annual</span>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full transition-all duration-500 ${isAnnual ? 'bg-yellow-500 text-black animate-pulse' : 'text-green-400 bg-green-400/10'}`}>{isAnnual ? '🎉 SAVE 20%!' : 'Save 20%'}</span>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative group ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                    <span className={`bg-gradient-to-r text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg transition-all duration-500 ${isAnnual ? 'from-yellow-500 to-amber-500 shadow-yellow-500/50' : 'from-red-700 to-red-600 shadow-yellow-600/30'}`}>
                                        {isAnnual ? '⭐ BEST VALUE' : 'MOST POPULAR'}
                                    </span>
                                </div>
                            )}

                            {/* Glow Effect for Popular */}
                            {tier.popular && (
                                <div className={`absolute inset-0 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 ${isAnnual ? 'bg-gradient-to-r from-yellow-500/30 via-amber-400/20 to-yellow-500/30' : 'bg-gradient-to-r from-red-700/20 via-pink-500/20 to-red-700/20'}`}></div>
                            )}

                            {/* Card */}
                            <div className={`relative h-full rounded-3xl p-8 backdrop-blur-xl transition-all duration-500 ${
                                tier.popular 
                                    ? 'bg-gradient-to-b from-white/10 to-white/5 border-2 border-amber-600/50 shadow-2xl shadow-yellow-600/20' 
                                    : 'bg-white/5 border border-white/10 hover:border-white/20'
                            }`}>
                                {/* Tier Name */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                    <p className="text-gray-400 text-sm">{tier.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-sm text-gray-400">{isIndia ? '' : '$'}</span>
                                        <span className="text-5xl font-black text-white">
                                            {isAnnual ? tier.priceYearly : tier.priceMonthly}
                                        </span>
                                        {tier.period && (
                                            <span className="text-gray-400">{tier.period}</span>
                                        )}
                                    </div>
                                    {tier.savings && (
                                        <span className="text-sm text-green-400 font-medium">{tier.savings}</span>
                                    )}
                                    {tier.name !== "Free" && (
                                        <div className="text-gray-500 text-xs mt-1">
                                            Just {isIndia ? '' : '$'}{getDailyPrice(isAnnual ? 
                                                (isIndia ? Math.round(PRICING.pro.inr * 12 * 0.8) : Math.round(PRICING.pro.usd * 12 * 0.8)) : 
                                                (isIndia ? PRICING.pro.inr : PRICING.pro.usd)
                                            )}/day
                                        </div>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3 text-sm">
                                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    onClick={() => handleUpgrade(tier.name)}
                                    disabled={loadingTier === tier.name}
                                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 ${tier.buttonClass} disabled:opacity-50`}
                                >
                                    {loadingTier === tier.name ? 'Processing...' : tier.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison Table */}
                <div className="max-w-6xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                        Compare All Features
                    </h2>
                    <div className="rounded-3xl border border-white/10 overflow-hidden backdrop-blur-xl bg-white/5">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-400">Feature</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-400">Free</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold bg-gradient-to-r from-red-600/20 to-amber-500/20 text-white">Pro</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-400">Agency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonFeatures.map((row, index) => (
                                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition">
                                        <td className="px-6 py-4 text-sm text-gray-300">{row.feature}</td>
                                        <td className="px-6 py-4 text-center text-sm text-gray-400">{row.free}</td>
                                        <td className="px-6 py-4 text-center text-sm text-white bg-gradient-to-r from-red-600/10 to-amber-500/10 font-medium">{row.pro}</td>
                                        <td className="px-6 py-4 text-center text-sm text-gray-400">{row.agency}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time from your settings page. No questions asked." },
                            { q: "How do credits work?", a: "Free tier: 5 generations/month. Pro: 100/month. Agency: Unlimited. Credits reset monthly." },
                            { q: "What happens to my history if I cancel?", a: "Your generation history is yours to keep. We will never delete your past work even if you downgrade." },
                            { q: "Do you offer refunds?", a: "Yes! We offer a 30-day money-back guarantee on all paid plans." },
                            { q: "Can I upgrade/downgrade?", a: "Yes! Upgrade anytime with prorated billing. Downgrades take effect at the end of your billing period." },
                            { q: "What payment methods?", a: "India: UPI, Cards, NetBanking via Razorpay. International: Cards via Stripe." },
                            { q: "Do you offer discounts for non-profits?", a: "We love supporting good causes. Contact support@descriptai.com for special pricing." },
                            { q: "Is there a free trial?", a: "Our Free tier gives you 5 generations/month forever. No credit card required to start." }
                        ].map((faq, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition">
                                <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                                <p className="text-gray-400 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-red-700/20 via-pink-500/20 to-red-700/20 border border-amber-600/30 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Product Descriptions?</h3>
                        <p className="text-gray-400 mb-6">Join 1,000+ e-commerce professionals using DescriptAI</p>
                        <Link
                            href="/generate"
                            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-red-700 via-pink-500 to-red-700 text-white font-bold hover:opacity-90 transition shadow-lg shadow-yellow-600/30"
                        >
                            Start Generating Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black/50 border-t border-white/5 py-12 mt-20 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div>
                            <div className="text-xl font-bold bg-gradient-to-r from-green-500 via-amber-400 to-green-500 bg-clip-text text-transparent mb-4">
                                DescriptAI
                            </div>
                            <p className="text-gray-500 text-sm">
                                AI-powered product descriptions that convert. Trusted by 1,000+ e-commerce professionals.
                            </p>
                        </div>

                        {/* Product */}
                        <div>
                            <h4 className="font-bold text-white mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/generate" className="text-gray-400 hover:text-green-500 transition">Generate</Link></li>
                                <li><Link href="/pricing" className="text-gray-400 hover:text-green-500 transition">Pricing</Link></li>
                                <li><Link href="/help" className="text-gray-400 hover:text-green-500 transition">Help Center</Link></li>
                                <li><Link href="/history" className="text-gray-400 hover:text-green-500 transition">History</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-bold text-white mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/privacy" className="text-gray-400 hover:text-green-500 transition">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="text-gray-400 hover:text-green-500 transition">Terms of Service</Link></li>
                                <li><Link href="/refund" className="text-gray-400 hover:text-green-500 transition">Refund Policy</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-bold text-white mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="mailto:support@descriptai.com" className="text-gray-400 hover:text-green-500 transition">support@descriptai.com</a></li>
                                <li><a href="https://twitter.com/descriptai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition">Twitter</a></li>
                                <li><Link href="/contact" className="text-gray-400 hover:text-green-500 transition">Contact Form</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 mt-8 pt-8 text-center text-gray-500 text-sm">
                        <p>&copy; 2026 DescriptAI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

