"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSubmitted(true);
        setIsSubmitting(false);
    };

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
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Get in <span className="bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-800 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 text-center">
                            <div className="text-4xl mb-4">📧</div>
                            <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                            <p className="text-gray-800 text-sm mb-3">For general inquiries</p>
                            <a href="mailto:support@descriptai.com" className="text-blue-700 hover:underline font-medium">
                                support@descriptai.com
                            </a>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 text-center">
                            <div className="text-4xl mb-4">🐦</div>
                            <h3 className="font-bold text-gray-900 mb-2">Twitter</h3>
                            <p className="text-gray-800 text-sm mb-3">For quick updates</p>
                            <a href="https://twitter.com/descriptai" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">
                                @descriptai
                            </a>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 text-center">
                            <div className="text-4xl mb-4">💼</div>
                            <h3 className="font-bold text-gray-900 mb-2">LinkedIn</h3>
                            <p className="text-gray-800 text-sm mb-3">For business inquiries</p>
                            <a href="https://linkedin.com/company/descriptai" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">
                                DescriptAI
                            </a>
                        </div>
                    </div>

                    {submitted ? (
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 text-center">
                            <div className="text-6xl mb-4">✅</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
                            <p className="text-gray-800 mb-6">
                                Thank you for reaching out. We'll get back to you within 24 hours.
                            </p>
                            <Link 
                                href="/"
                                className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition"
                            >
                                Back to Home
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                    >
                                        <option value="">Select a topic...</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing Question</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* FAQ Teaser */}
                    <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Looking for quick answers?</h3>
                        <p className="text-gray-800 mb-4">Check out our Help Center for frequently asked questions.</p>
                        <Link 
                            href="/help"
                            className="inline-block bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-100 transition border border-blue-200"
                        >
                            Visit Help Center
                        </Link>
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

