"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { generateCSV, downloadCSV, CSVFormat } from "@/lib/csv-utils";

interface HistoryItem {
    id: string;
    productName: string;
    features: string;
    tone: string;
    variants: string[];
    createdAt: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isExporting, setIsExporting] = useState(false);
    const [userTier, setUserTier] = useState<string>("free");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch("/api/history");
                if (res.ok) {
                    const data = await res.json();
                    setHistory(data);
                }
            } catch (error) {
                console.error("Failed to load history", error);
            }
        };

        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user");
                if (res.ok) {
                    const data = await res.json();
                    setUserTier(data.tier);
                }
            } catch (error) {
                console.error("Failed to fetch user tier", error);
            }
        };

        fetchHistory();
        fetchUser();
    }, []);

    const isPremium = userTier === 'pro' || userTier === 'agency';

    const clearHistory = () => {
        if (confirm("Are you sure you want to delete all history?")) {
            setHistory([]);
            // Note: Cloud history deletion logic would go here
        }
    };

    const handleExport = (format: CSVFormat) => {
        const content = generateCSV(history, format);
        downloadCSV(content, `descriptai_export_${format}_${new Date().toISOString().split('T')[0]}.csv`);
        setIsExporting(false);
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
                        <Link href="/pricing" className="text-gray-700 hover:text-purple-600 font-bold transition">
                            ⭐ Pricing
                        </Link>
                        <Link href="/generate" className="text-gray-700 hover:text-purple-600 font-medium transition">
                            Dashboard
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Your History</h1>
                            <p className="text-gray-600">All your generated descriptions & visual assets, secured in your database.</p>
                        </div>

                        {history.length > 0 && (
                            <div className="flex space-x-4 mt-4 md:mt-0 relative">
                                <div className="relative group">
                                    <button
                                        onClick={() => setIsExporting(!isExporting)}
                                        className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition shadow-md flex items-center"
                                    >
                                        📥 Export CSV
                                    </button>

                                    {isExporting && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-[60] py-2 overflow-hidden">
                                            <button onClick={() => handleExport('general')} className="w-full text-left px-4 py-2 text-sm font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition">📋 General View</button>

                                            <button
                                                disabled={!isPremium}
                                                onClick={() => isPremium && handleExport('shopify')}
                                                className={`w-full text-left px-4 py-2 text-sm font-bold transition flex items-center justify-between ${isPremium ? "text-gray-700 hover:bg-purple-50 hover:text-purple-600" : "text-gray-300 cursor-not-allowed"}`}
                                            >
                                                <span>🚢 Shopify Import</span>
                                                {!isPremium && <span>🔒</span>}
                                            </button>

                                            <button
                                                disabled={!isPremium}
                                                onClick={() => isPremium && handleExport('amazon')}
                                                className={`w-full text-left px-4 py-2 text-sm font-bold transition flex items-center justify-between ${isPremium ? "text-gray-700 hover:bg-purple-50 hover:text-purple-600" : "text-gray-300 cursor-not-allowed"}`}
                                            >
                                                <span>📦 Amazon Sellers</span>
                                                {!isPremium && <span>🔒</span>}
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={clearHistory}
                                    className="bg-red-100 text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-red-200 transition"
                                >
                                    🗑️ Clear All
                                </button>
                            </div>
                        )}
                    </div>

                    {history.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No history yet</h3>
                            <p className="text-gray-600 mb-6">Start generating amazing product descriptions to see them here.</p>
                            <Link
                                href="/generate"
                                className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition"
                            >
                                Start Generating →
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {history.map((item, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-purple-50 hover:shadow-lg transition">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">{item.productName}</h3>
                                            <p className="text-sm text-gray-500">
                                                {new Date(item.createdAt).toLocaleString()} • <span className="capitalize">{item.tone}</span> Tone
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {item.variants.map((variant, vIndex) => (
                                            <div key={vIndex} className="bg-gray-50 p-6 rounded-xl text-sm text-gray-700 h-64 overflow-y-auto border border-gray-100 leading-relaxed scrollbar-hide">
                                                <div className="text-[10px] font-bold text-purple-400 mb-2 uppercase tracking-widest">Variant {vIndex + 1}</div>
                                                {variant}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
