"use client";

import Link from "next/link";
import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqItems: FAQItem[] = [
    // Getting Started
    {
        category: "Getting Started",
        question: "How do I create my first description?",
        answer: "Sign up for a free account, go to the Dashboard, enter your product name and key features, select your target platform (Amazon, Shopify, etc.), choose the tone and length, and click 'Generate'. You'll get 3 AI-generated variants in seconds!"
    },
    {
        category: "Getting Started",
        question: "What's included in the Free plan?",
        answer: "The Free plan includes 5 AI generations per month, access to Amazon or Shopify platform, basic languages (English, Spanish, French), standard CSV export, and referral rewards (+3 bonus generations per referral)."
    },
    {
        category: "Getting Started",
        question: "Do I need a credit card to start?",
        answer: "No! You can start with our Free plan without any credit card. Just sign up with your email and start generating descriptions immediately."
    },
    // Billing & Pricing
    {
        category: "Billing & Pricing",
        question: "Can I switch between plans?",
        answer: "Yes! You can upgrade anytime with prorated billing. Downgrades take effect at the end of your current billing period. No penalties or fees for changing plans."
    },
    {
        category: "Billing & Pricing",
        question: "What payment methods do you accept?",
        answer: "For India: UPI, Credit/Debit Cards, NetBanking via Razorpay. For International: Credit/Debit Cards via Stripe. All payments are secured with 256-bit SSL encryption."
    },
    {
        category: "Billing & Pricing",
        question: "How does the 30-day money-back guarantee work?",
        answer: "If you're not satisfied within 30 days of your first payment, email us at refund@descriptai.com for a full refund. No questions asked. This applies to first-time subscribers only."
    },
    {
        category: "Billing & Pricing",
        question: "What's the difference between monthly and annual billing?",
        answer: "Annual billing saves you 20% compared to monthly. You pay for 10 months and get 12 months of access. You can switch between billing cycles at any time."
    },
    // Features
    {
        category: "Features",
        question: "What platforms are supported?",
        answer: "Free: Amazon OR Shopify. Pro & Agency: All 4 platforms - Amazon, Shopify, Etsy, and eBay. Each platform gets optimized formatting for maximum conversions."
    },
    {
        category: "Features",
        question: "What is the Social Media Kit?",
        answer: "The Social Media Kit (Pro & Agency) automatically generates Instagram captions, Twitter posts, and Facebook ad hooks from your product description. One product = multiple social posts!"
    },
    {
        category: "Features",
        question: "What is the SEO Heatmap?",
        answer: "The SEO Heatmap highlights power words and keywords in your description that drive conversions. It shows your SEO score and suggests improvements. Available on Pro and Agency plans."
    },
    {
        category: "Features",
        question: "How does bulk generation work?",
        answer: "Pro users can generate up to 50 descriptions at once. Agency users can generate 1000+ descriptions in a single batch. Perfect for stores with many products!"
    },
    // Account
    {
        category: "Account",
        question: "How do I reset my password?",
        answer: "Click 'Sign In' on the homepage, then click 'Forgot Password'. Enter your email and we'll send a reset link. You can also manage your account from the Dashboard."
    },
    {
        category: "Account",
        question: "Can I delete my account?",
        answer: "Yes, go to your account settings and click 'Delete Account'. Your data will be permanently removed within 30 days. You can also email us at privacy@descriptai.com."
    },
    {
        category: "Account",
        question: "How do I export my history?",
        answer: "Go to the History page, click 'Export CSV', and choose your format: General View, Shopify Import, or Amazon Sellers. Pro and Agency users get platform-specific exports."
    },
    // Technical
    {
        category: "Technical",
        question: "Why is my generation taking long?",
        answer: "Most generations complete in 3-5 seconds. If it's taking longer, check your internet connection. If issues persist, try refreshing the page or contact support."
    },
    {
        category: "Technical",
        question: "What AI model do you use?",
        answer: "We use advanced LLM models via Groq for fast, high-quality generation. Our models are specifically fine-tuned for e-commerce product descriptions."
    },
    {
        category: "Technical",
        question: "Is my data secure?",
        answer: "Yes! We use 256-bit SSL encryption, secure cloud storage, and never share your data with third parties. Your generated descriptions are private and only accessible to you."
    },
    // Agency
    {
        category: "Agency",
        question: "What is the Agency Command Suite?",
        answer: "The Agency Command Suite lets you manage 50+ clients, create custom brand voice presets, access white-label options, and collaborate with up to 50 team members."
    },
    {
        category: "Agency",
        question: "Can I white-label DescriptAI for my clients?",
        answer: "Yes! Agency plan includes full white-label options - your logo, your domain, your branding. Perfect for marketing agencies serving multiple clients."
    },
    {
        category: "Agency",
        question: "How does team collaboration work?",
        answer: "Agency plan includes 50 team seats. Invite team members, assign roles, and collaborate on projects. Each member gets their own login with controlled access."
    }
];

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    const categories = [...new Set(faqItems.map(item => item.category))];

    const filteredFAQs = faqItems.filter(item => {
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
            {/* Header */}
            <header className="container mx-auto px-4 py-6 backdrop-blur-sm bg-white/50 sticky top-0 z-50 border-b border-pink-100">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold gradient-text">
                            ⚡ DescriptAI
                        </div>
                        <span className="text-xs bg-gradient-to-r from-red-600 to-amber-500 text-white px-2 py-1 rounded-full font-semibold shadow-sm">
                            PREMIUM AI ENGINE
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-blue-700 font-medium transition">
                            Home
                        </Link>
                        <Link href="/pricing" className="text-gray-700 hover:text-blue-700 font-bold transition">
                            ⭐ Pricing
                        </Link>
                        <Link href="/help" className="text-gray-700 hover:text-blue-700 font-medium transition">
                            Help
                        </Link>
                        <Link href="/generate" className="text-gray-700 hover:text-blue-700 font-medium transition">
                            Dashboard
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    How can we <span className="bg-gradient-to-r from-red-700 to-red-600 bg-clip-text text-transparent">help you?</span>
                </h1>
                <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
                    Find answers to common questions or reach out to our support team.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl border-2 border-pink-100 focus:border-red-600 focus:ring-4 focus:ring-red-100 outline-none transition text-lg shadow-lg"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <Link href="/pricing" className="bg-white rounded-xl p-6 shadow-md border border-pink-100 hover:shadow-lg hover:border-amber-300 transition">
                        <div className="text-3xl mb-2">💰</div>
                        <div className="font-bold text-gray-900">Pricing</div>
                        <div className="text-sm text-gray-700">View plans</div>
                    </Link>
                    <Link href="/refund" className="bg-white rounded-xl p-6 shadow-md border border-pink-100 hover:shadow-lg hover:border-amber-300 transition">
                        <div className="text-3xl mb-2">🔄</div>
                        <div className="font-bold text-gray-900">Refunds</div>
                        <div className="text-sm text-gray-700">30-day policy</div>
                    </Link>
                    <a href="mailto:support@descriptai.com" className="bg-white rounded-xl p-6 shadow-md border border-pink-100 hover:shadow-lg hover:border-amber-300 transition">
                        <div className="text-3xl mb-2">📧</div>
                        <div className="font-bold text-gray-900">Email Us</div>
                        <div className="text-sm text-gray-700">Get support</div>
                    </a>
                    <Link href="/generate" className="bg-white rounded-xl p-6 shadow-md border border-pink-100 hover:shadow-lg hover:border-amber-300 transition">
                        <div className="text-3xl mb-2">🚀</div>
                        <div className="font-bold text-gray-900">Dashboard</div>
                        <div className="text-sm text-gray-700">Start generating</div>
                    </Link>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full font-medium transition ${
                                !selectedCategory 
                                    ? "bg-red-700 text-white" 
                                    : "bg-white text-gray-800 hover:bg-green-50 border border-gray-200"
                            }`}
                        >
                            All
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full font-medium transition ${
                                    selectedCategory === category 
                                        ? "bg-red-700 text-white" 
                                        : "bg-white text-gray-800 hover:bg-green-50 border border-gray-200"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        {filteredFAQs.map((item, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-green-50 transition"
                                >
                                    <span className="font-bold text-gray-900">{item.question}</span>
                                    <span className={`transform transition ${expandedFAQ === index ? "rotate-180" : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </button>
                                {expandedFAQ === index && (
                                    <div className="px-6 py-4 bg-green-50 border-t border-pink-100">
                                        <p className="text-gray-800">{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredFAQs.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-800">Try a different search term or browse all categories.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-red-700 to-red-600 rounded-3xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
                        <p className="text-amber-100 mb-8 max-w-xl mx-auto">
                            Our support team is here to help. We typically respond within 24 hours.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="text-3xl mb-3">📧</div>
                                <h3 className="font-bold mb-2">Email Support</h3>
                                <a href="mailto:support@descriptai.com" className="text-amber-200 hover:text-white transition">
                                    support@descriptai.com
                                </a>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="text-3xl mb-3">🐦</div>
                                <h3 className="font-bold mb-2">Twitter</h3>
                                <a href="https://twitter.com/descriptai" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-white transition">
                                    @descriptai
                                </a>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="text-3xl mb-3">💼</div>
                                <h3 className="font-bold mb-2">LinkedIn</h3>
                                <a href="https://linkedin.com/company/descriptai" target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-white transition">
                                    DescriptAI
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Tutorials */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Quick Tutorials</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-md border border-pink-100">
                            <div className="text-3xl mb-4">📝</div>
                            <h3 className="font-bold text-gray-900 mb-2">Creating Your First Description</h3>
                            <ol className="text-sm text-gray-800 space-y-2">
                                <li>1. Sign up for a free account</li>
                                <li>2. Go to the Dashboard</li>
                                <li>3. Enter product name & features</li>
                                <li>4. Select platform & tone</li>
                                <li>5. Click Generate!</li>
                            </ol>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md border border-pink-100">
                            <div className="text-3xl mb-4">📤</div>
                            <h3 className="font-bold text-gray-900 mb-2">Exporting to Shopify</h3>
                            <ol className="text-sm text-gray-800 space-y-2">
                                <li>1. Generate your description</li>
                                <li>2. Go to History page</li>
                                <li>3. Click Export CSV</li>
                                <li>4. Select "Shopify Import"</li>
                                <li>5. Upload to Shopify!</li>
                            </ol>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md border border-pink-100">
                            <div className="text-3xl mb-4">📱</div>
                            <h3 className="font-bold text-gray-900 mb-2">Using Social Media Kit</h3>
                            <ol className="text-sm text-gray-800 space-y-2">
                                <li>1. Upgrade to Pro or Agency</li>
                                <li>2. Generate a description</li>
                                <li>3. Click on Instagram/Twitter/FB tabs</li>
                                <li>4. Copy each social post</li>
                                <li>5. Post to your channels!</li>
                            </ol>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md border border-pink-100">
                            <div className="text-3xl mb-4">👥</div>
                            <h3 className="font-bold text-gray-900 mb-2">Team Collaboration (Agency)</h3>
                            <ol className="text-sm text-gray-800 space-y-2">
                                <li>1. Upgrade to Agency plan</li>
                                <li>2. Go to Team Settings</li>
                                <li>3. Invite team members</li>
                                <li>4. Assign roles & permissions</li>
                                <li>5. Collaborate on projects!</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-bold text-white mb-4">⚡ DescriptAI</div>
                            <p className="text-sm">Scale your business with AI-powered copy. Built for the modern merchant.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/pricing" className="hover:text-green-500 transition">Pricing</Link></li>
                                <li><Link href="/generate" className="hover:text-green-500 transition">Dashboard</Link></li>
                                <li><Link href="/history" className="hover:text-green-500 transition">History</Link></li>
                                <li><Link href="/help" className="hover:text-green-500 transition">Help Center</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/privacy" className="hover:text-green-500 transition">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-green-500 transition">Terms of Service</Link></li>
                                <li><Link href="/refund" className="hover:text-green-500 transition">Refund Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="mailto:support@descriptai.com" className="hover:text-green-500 transition">support@descriptai.com</a></li>
                                <li><a href="https://twitter.com/descriptai" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">Twitter</a></li>
                                <li><a href="https://linkedin.com/company/descriptai" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition">LinkedIn</a></li>
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

