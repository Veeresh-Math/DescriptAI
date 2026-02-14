"use client";

import Link from "next/link";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
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

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-purple-100">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
                        <p className="text-gray-500 mb-8">Last updated: February 2026</p>

                        <div className="prose prose-purple max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    By accessing or using DescriptAI ("Service"), you agree to be bound by these Terms of Service 
                                    ("Terms"). If you disagree with any part of these terms, you may not access the Service.
                                </p>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    These Terms constitute a legally binding agreement between you and DescriptAI governing your 
                                    use of our AI-powered product description generation platform.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    DescriptAI provides an AI-powered platform for generating product descriptions for e-commerce 
                                    platforms including but not limited to Amazon, Shopify, Etsy, and eBay. Our service includes:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li>AI-generated product descriptions in multiple formats</li>
                                    <li>Social media content generation</li>
                                    <li>SEO optimization tools</li>
                                    <li>CSV export functionality</li>
                                    <li>Platform-specific formatting</li>
                                    <li>Team collaboration features (Agency tier)</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    To use certain features of the Service, you must register for an account. When you register:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li>You must provide accurate and complete information</li>
                                    <li>You are responsible for maintaining the security of your account</li>
                                    <li>You must notify us immediately of any unauthorized use</li>
                                    <li>You may not share your account credentials with others</li>
                                    <li>You must be at least 18 years old to create an account</li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    We reserve the right to suspend or terminate accounts that violate these terms.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription and Payments</h2>
                                
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Pricing</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our pricing is displayed on our <Link href="/pricing" className="text-purple-600 hover:underline">pricing page</Link>. 
                                    Prices are subject to change with 30 days notice for existing subscribers.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.2 Billing</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Subscriptions are billed monthly or annually in advance</li>
                                    <li>Payment is processed via Stripe (international) or Razorpay (India)</li>
                                    <li>All fees are non-refundable except as stated in our Refund Policy</li>
                                    <li>You may cancel anytime; cancellation takes effect at the end of the billing period</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.3 Plan Changes</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>You may upgrade at any time; prorated charges apply</li>
                                    <li>Downgrades take effect at the end of your current billing period</li>
                                    <li>Annual plans can be upgraded with prorated credit for remaining time</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
                                <p className="text-gray-600 leading-relaxed">You agree NOT to use the Service to:</p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li>Generate content that is illegal, harmful, or infringes on intellectual property</li>
                                    <li>Create misleading, deceptive, or fraudulent product descriptions</li>
                                    <li>Generate content for products that are illegal or restricted</li>
                                    <li>Attempt to reverse engineer or extract our AI models</li>
                                    <li>Use automated systems to abuse or overload our servers</li>
                                    <li>Share, sell, or redistribute generated content as your own AI service</li>
                                    <li>Violate any applicable laws or regulations</li>
                                    <li>Generate content that is defamatory, obscene, or offensive</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                                
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Our Property</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    DescriptAI, our logo, and all related trademarks, service marks, and logos are our property. 
                                    Our AI models, algorithms, and technology are protected by intellectual property laws.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">6.2 Your Content</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    You retain ownership of the product information you input. The generated descriptions 
                                    are licensed to you for commercial use in your e-commerce activities. You may:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li>Use generated descriptions on your own stores and listings</li>
                                    <li>Modify and adapt descriptions for your needs</li>
                                    <li>Use descriptions for client work (Agency tier)</li>
                                    <li>Claim authorship of the final edited content</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Level</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We strive for 99.9% uptime. However, we do not guarantee uninterrupted service. 
                                    Scheduled maintenance will be announced in advance when possible.
                                </p>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    Pro and Agency tiers include our Triple-Shield Resilience system for enhanced reliability.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT WARRANT THAT:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li>The Service will be uninterrupted or error-free</li>
                                    <li>Generated descriptions will be accurate or appropriate for your products</li>
                                    <li>Results will meet your specific requirements</li>
                                    <li>The Service will meet your expectations</li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    You are responsible for reviewing and editing all generated content before publishing.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, DESCRIPTAI SHALL NOT BE LIABLE FOR:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li>Any indirect, incidental, or consequential damages</li>
                                    <li>Loss of profits, data, or business opportunities</li>
                                    <li>Any damages exceeding the amount you paid in the past 12 months</li>
                                    <li>Any content generated by the AI that you publish without review</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    You agree to indemnify and hold harmless DescriptAI from any claims, damages, or expenses 
                                    arising from:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li>Your use of the Service</li>
                                    <li>Content you generate using the Service</li>
                                    <li>Your violation of these Terms</li>
                                    <li>Your violation of any third-party rights</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Either party may terminate this agreement:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li><strong>By you:</strong> Cancel your subscription anytime through your account settings</li>
                                    <li><strong>By us:</strong> With 30 days notice for any reason, or immediately for Terms violation</li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    Upon termination, your access to the Service will end. You may export your data before termination.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    These Terms shall be governed by and construed in accordance with the laws of India. 
                                    Any disputes shall be resolved in the courts of Bangalore, Karnataka, India.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We reserve the right to modify these Terms at any time. We will notify you of material changes 
                                    via email or through the Service. Continued use after changes constitutes acceptance.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    For questions about these Terms, contact us:
                                </p>
                                <div className="bg-purple-50 rounded-xl p-6 mt-4 border border-purple-100">
                                    <p className="text-gray-700"><strong>DescriptAI Legal Team</strong></p>
                                    <p className="text-gray-600">Email: <a href="mailto:legal@descriptai.com" className="text-purple-600 hover:underline">legal@descriptai.com</a></p>
                                    <p className="text-gray-600">Support: <a href="mailto:support@descriptai.com" className="text-purple-600 hover:underline">support@descriptai.com</a></p>
                                </div>
                            </section>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
                            <Link href="/privacy" className="text-purple-600 hover:underline font-medium">
                                Privacy Policy
                            </Link>
                            <Link href="/refund" className="text-purple-600 hover:underline font-medium">
                                Refund Policy
                            </Link>
                            <Link href="/" className="text-gray-600 hover:underline font-medium">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 mt-12">
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