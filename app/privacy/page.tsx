"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
            {/* Header */}
            <header className="container mx-auto px-4 py-6 backdrop-blur-sm bg-white/50 sticky top-0 z-50 border-b border-blue-100">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="text-2xl font-bold gradient-text">
                            ⚡ DescriptAI
                        </div>
                        <span className="text-xs bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-2 py-1 rounded-full font-semibold shadow-sm">
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

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                        <p className="text-gray-700 mb-8">Last updated: February 2026</p>

                        <div className="prose prose-purple max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                                <p className="text-gray-800 leading-relaxed">
                                    DescriptAI ("we," "our," or "us") is committed to protecting your privacy. 
                                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                                    when you visit our website descriptai.app and use our AI-powered product description generation services.
                                </p>
                                <p className="text-gray-800 leading-relaxed mt-4">
                                    By using our service, you agree to the collection and use of information in accordance with this policy.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                                
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                                <ul className="list-disc list-inside text-gray-800 space-y-2 mb-4">
                                    <li><strong>Account Information:</strong> Name, email address, password (encrypted)</li>
                                    <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely via Stripe/Razorpay)</li>
                                    <li><strong>Usage Data:</strong> Product names, features, generated descriptions</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Data</h3>
                                <ul className="list-disc list-inside text-gray-800 space-y-2">
                                    <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
                                    <li><strong>Usage Statistics:</strong> Pages visited, time spent, features used</li>
                                    <li><strong>IP Address:</strong> For location detection and security purposes</li>
                                    <li><strong>Cookies:</strong> Session management and preferences</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                                <ul className="list-disc list-inside text-gray-800 space-y-2">
                                    <li>Provide and maintain our AI description generation service</li>
                                    <li>Process payments and manage subscriptions</li>
                                    <li>Send transactional emails (receipts, password resets)</li>
                                    <li>Send marketing communications (with your consent)</li>
                                    <li>Improve our AI models and service quality</li>
                                    <li>Detect and prevent fraud or abuse</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>
                                <p className="text-gray-800 leading-relaxed">
                                    We implement industry-standard security measures to protect your data:
                                </p>
                                <ul className="list-disc list-inside text-gray-800 space-y-2 mt-4">
                                    <li>256-bit SSL/TLS encryption for all data transfers</li>
                                    <li>Encrypted data storage in secure cloud databases</li>
                                    <li>Regular security audits and vulnerability assessments</li>
                                    <li>Access controls and authentication for all systems</li>
                                </ul>
                                <p className="text-gray-800 leading-relaxed mt-4">
                                    Your generated descriptions are stored securely and are only accessible to you through your account.
                                    We do not sell or share your generated content with third parties.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
                                <p className="text-gray-800 leading-relaxed">We use the following third-party services:</p>
                                <ul className="list-disc list-inside text-gray-800 space-y-2 mt-4">
                                    <li><strong>Clerk:</strong> Authentication and user management</li>
                                    <li><strong>Stripe/Razorpay:</strong> Payment processing (they handle your card details, we don't store them)</li>
                                    <li><strong>Groq/Llama:</strong> AI model inference for description generation</li>
                                    <li><strong>Vercel:</strong> Hosting and deployment</li>
                                    <li><strong>Google Analytics:</strong> Anonymous usage statistics</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                                <p className="text-gray-800 leading-relaxed">You have the right to:</p>
                                <ul className="list-disc list-inside text-gray-800 space-y-2 mt-4">
                                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                                    <li><strong>Correction:</strong> Update or correct your information</li>
                                    <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                                    <li><strong>Export:</strong> Download your generated descriptions</li>
                                    <li><strong>Opt-out:</strong> Unsubscribe from marketing emails</li>
                                    <li><strong>Portability:</strong> Receive your data in a portable format</li>
                                </ul>
                                <p className="text-gray-800 leading-relaxed mt-4">
                                    To exercise these rights, contact us at <a href="mailto:privacy@descriptai.com" className="text-blue-700 hover:underline">privacy@descriptai.com</a>
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
                                <p className="text-gray-800 leading-relaxed">
                                    We retain your information for as long as your account is active. After account deletion:
                                </p>
                                <ul className="list-disc list-inside text-gray-800 space-y-2 mt-4">
                                    <li>Account data is deleted within 30 days</li>
                                    <li>Generated descriptions are deleted within 30 days</li>
                                    <li>Payment records are retained for 7 years (legal requirement)</li>
                                    <li>Anonymized usage data may be retained for analytics</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies</h2>
                                <p className="text-gray-800 leading-relaxed">
                                    We use cookies for:
                                </p>
                                <ul className="list-disc list-inside text-gray-800 space-y-2 mt-4">
                                    <li><strong>Essential:</strong> Authentication, session management</li>
                                    <li><strong>Functional:</strong> Remember preferences, settings</li>
                                    <li><strong>Analytics:</strong> Understand usage patterns</li>
                                </ul>
                                <p className="text-gray-800 leading-relaxed mt-4">
                                    You can disable cookies in your browser settings, but some features may not work properly.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
                                <p className="text-gray-800 leading-relaxed">
                                    Our service is not intended for users under 18 years of age. We do not knowingly collect 
                                    information from children. If you believe a child has provided us with personal information, 
                                    please contact us immediately.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Users</h2>
                                <p className="text-gray-800 leading-relaxed">
                                    If you are accessing our service from outside India, please note that your information 
                                    may be transferred to and processed in India or other countries where our servers are located.
                                    By using our service, you consent to this transfer.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
                                <p className="text-gray-800 leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by:
                                </p>
                                <ul className="list-disc list-inside text-gray-800 space-y-2 mt-4">
                                    <li>Posting the new policy on this page</li>
                                    <li>Updating the "Last updated" date</li>
                                    <li>Sending an email notification for significant changes</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                                <p className="text-gray-800 leading-relaxed">
                                    For any questions about this Privacy Policy or our data practices, contact us:
                                </p>
                                <div className="bg-blue-50 rounded-xl p-6 mt-4 border border-blue-100">
                                    <p className="text-gray-700"><strong>DescriptAI Privacy Team</strong></p>
                                    <p className="text-gray-800">Email: <a href="mailto:privacy@descriptai.com" className="text-blue-700 hover:underline">privacy@descriptai.com</a></p>
                                    <p className="text-gray-800">Support: <a href="mailto:support@descriptai.com" className="text-blue-700 hover:underline">support@descriptai.com</a></p>
                                    <p className="text-gray-800">Response time: Within 48 hours</p>
                                </div>
                            </section>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
                            <Link href="/terms" className="text-blue-700 hover:underline font-medium">
                                Terms of Service
                            </Link>
                            <Link href="/refund" className="text-blue-700 hover:underline font-medium">
                                Refund Policy
                            </Link>
                            <Link href="/" className="text-gray-800 hover:underline font-medium">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

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
                                <li><Link href="/pricing" className="hover:text-blue-500 transition">Pricing</Link></li>
                                <li><Link href="/generate" className="hover:text-blue-500 transition">Dashboard</Link></li>
                                <li><Link href="/history" className="hover:text-blue-500 transition">History</Link></li>
                                <li><Link href="/help" className="hover:text-blue-500 transition">Help Center</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/privacy" className="hover:text-blue-500 transition">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-blue-500 transition">Terms of Service</Link></li>
                                <li><Link href="/refund" className="hover:text-blue-500 transition">Refund Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="mailto:support@descriptai.com" className="hover:text-blue-500 transition">support@descriptai.com</a></li>
                                <li><a href="https://twitter.com/descriptai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">Twitter</a></li>
                                <li><a href="https://linkedin.com/company/descriptai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">LinkedIn</a></li>
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

