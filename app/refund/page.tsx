"use client";

import Link from "next/link";

export default function RefundPolicyPage() {
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
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl">30-Day</span>
                            <span className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                                MONEY-BACK GUARANTEE
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Refund Policy</h1>
                        <p className="text-gray-500 mb-8">Last updated: February 2026</p>

                        <div className="prose prose-purple max-w-none">
                            {/* Guarantee Banner */}
                            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 mb-8 border-2 border-green-200">
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl">100%</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-green-800 mb-2">Satisfaction Guarantee</h3>
                                        <p className="text-green-700">
                                            If you're not completely satisfied with DescriptAI within 30 days of your first payment, 
                                            we'll refund your money. No questions asked.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 30-Day Money-Back Guarantee</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We want you to be completely satisfied with DescriptAI. That's why we offer a 
                                    <strong> 30-day money-back guarantee</strong> on all paid plans:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li>Valid for <strong>first-time subscribers only</strong></li>
                                    <li>Applies to Pro ($19) and Agency ($49) plans</li>
                                    <li>Valid for both monthly and annual subscriptions</li>
                                    <li>No questions asked - just email us and we'll process your refund</li>
                                </ul>
                                <div className="bg-purple-50 rounded-xl p-4 mt-4 border border-purple-100">
                                    <p className="text-purple-700 font-medium">
                                        To request a refund: Email <a href="mailto:refund@descriptai.com" className="underline">refund@descriptai.com</a> with your account email and reason (optional)
                                    </p>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Refund Eligibility</h2>
                                
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Eligible for Refund:</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                                    <li>First-time subscribers within 30 days of initial payment</li>
                                    <li>Annual subscriptions within 30 days of purchase</li>
                                    <li>Technical issues that prevent you from using the service</li>
                                    <li>Service outage exceeding 24 hours in a billing cycle</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Not Eligible for Refund:</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Renewal payments (after first billing cycle)</li>
                                    <li>Downgrade requests (you can cancel instead)</li>
                                    <li>Partial month refunds for cancellation</li>
                                    <li>Accounts terminated for Terms of Service violations</li>
                                    <li>Add-on purchases or one-time fees</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How to Request a Refund</h2>
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <ol className="list-decimal list-inside text-gray-600 space-y-3">
                                        <li><strong>Email us:</strong> Send an email to <a href="mailto:refund@descriptai.com" className="text-purple-600 hover:underline">refund@descriptai.com</a></li>
                                        <li><strong>Include:</strong> Your account email address and plan name</li>
                                        <li><strong>Reason:</strong> Optional - helps us improve our service</li>
                                        <li><strong>Processing time:</strong> Refunds are processed within 5-7 business days</li>
                                        <li><strong>Confirmation:</strong> You'll receive an email confirmation once processed</li>
                                    </ol>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Refund Methods</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Refunds are processed back to the original payment method:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li><strong>Credit/Debit Card:</strong> Refunded to the same card (5-10 business days)</li>
                                    <li><strong>UPI (India):</strong> Refunded to the original UPI ID (3-5 business days)</li>
                                    <li><strong>Net Banking:</strong> Refunded to the bank account (5-7 business days)</li>
                                    <li><strong>Stripe (International):</strong> Refunded via Stripe (5-10 business days)</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cancellation vs Refund</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                        <h3 className="text-lg font-bold text-blue-800 mb-3">Cancellation</h3>
                                        <ul className="text-blue-700 space-y-2 text-sm">
                                            <li>Stops future billing</li>
                                            <li>Access continues until end of billing period</li>
                                            <li>No refund for remaining time</li>
                                            <li>Can be done anytime from account settings</li>
                                        </ul>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                                        <h3 className="text-lg font-bold text-green-800 mb-3">Refund</h3>
                                        <ul className="text-green-700 space-y-2 text-sm">
                                            <li>Returns your payment</li>
                                            <li>Access ends immediately</li>
                                            <li>Only within 30-day guarantee period</li>
                                            <li>Requires email request</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Annual Subscription Refunds</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    For annual subscriptions:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li><strong>Within 30 days:</strong> Full refund of annual payment</li>
                                    <li><strong>After 30 days:</strong> No refund, but you can cancel to prevent renewal</li>
                                    <li><strong>Prorated refund:</strong> Not available for annual plans after 30 days</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Free Trial & Free Tier</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Our free tier (5 generations/month) does not require payment and therefore has no refund policy. 
                                    You can use the free tier indefinitely without any payment obligation.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Credits</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    In some cases, we may offer service credits instead of refunds:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li>Extended service outages (24+ hours)</li>
                                    <li>Billing errors on our end</li>
                                    <li>Feature unavailability during subscription period</li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    Service credits extend your subscription by the credited amount.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Chargebacks</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    If you initiate a chargeback with your bank or payment provider:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                                    <li>Your account will be suspended immediately</li>
                                    <li>We will contest fraudulent chargebacks</li>
                                    <li>Please contact us first - we're happy to process refunds directly</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Refund Processing Time</h2>
                                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">Processing Times</span>
                                    </div>
                                    <ul className="text-yellow-800 space-y-2">
                                        <li><strong>Request received:</strong> Within 24 hours</li>
                                        <li><strong>Refund initiated:</strong> Within 2 business days</li>
                                        <li><strong>Credit to your account:</strong> 5-10 business days (depends on bank)</li>
                                        <li><strong>Email confirmation:</strong> Sent when refund is processed</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    For refund requests or questions about this policy:
                                </p>
                                <div className="bg-purple-50 rounded-xl p-6 mt-4 border border-purple-100">
                                    <p className="text-gray-700"><strong>DescriptAI Refund Team</strong></p>
                                    <p className="text-gray-600">Email: <a href="mailto:refund@descriptai.com" className="text-purple-600 hover:underline">refund@descriptai.com</a></p>
                                    <p className="text-gray-600">Support: <a href="mailto:support@descriptai.com" className="text-purple-600 hover:underline">support@descriptai.com</a></p>
                                    <p className="text-gray-600">Response time: Within 24 hours</p>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Policy Changes</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We may update this Refund Policy from time to time. Changes will be posted on this page 
                                    with an updated date. For existing subscribers, the policy in effect at the time of 
                                    purchase will apply.
                                </p>
                            </section>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <a 
                                    href="mailto:refund@descriptai.com"
                                    className="bg-green-500 text-white text-center py-3 rounded-xl font-bold hover:bg-green-600 transition"
                                >
                                    Request Refund
                                </a>
                                <Link 
                                    href="/pricing"
                                    className="bg-purple-500 text-white text-center py-3 rounded-xl font-bold hover:bg-purple-600 transition"
                                >
                                    View Pricing
                                </Link>
                                <Link 
                                    href="/"
                                    className="bg-gray-200 text-gray-700 text-center py-3 rounded-xl font-bold hover:bg-gray-300 transition"
                                >
                                    Back to Home
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/privacy" className="text-purple-600 hover:underline font-medium">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="text-purple-600 hover:underline font-medium">
                                    Terms of Service
                                </Link>
                            </div>
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