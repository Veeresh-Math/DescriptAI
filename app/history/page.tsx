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
    platform?: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
    const [isExporting, setIsExporting] = useState(false);
    const [userTier, setUserTier] = useState<string>("free");
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState<string>("all");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch("/api/history");
                if (res.ok) {
                    const data = await res.json();
                    setHistory(data);
                    setFilteredHistory(data);
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

    // Filter history based on search and date
    useEffect(() => {
        let filtered = [...history];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.features.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Date filter
        const now = new Date();
        if (dateFilter === "today") {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.createdAt);
                return itemDate.toDateString() === now.toDateString();
            });
        } else if (dateFilter === "week") {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(item => new Date(item.createdAt) >= weekAgo);
        } else if (dateFilter === "month") {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(item => new Date(item.createdAt) >= monthAgo);
        }

        setFilteredHistory(filtered);
    }, [searchQuery, dateFilter, history]);

    const isPremium = userTier === 'pro' || userTier === 'agency';

    const clearHistory = () => {
        if (confirm("Are you sure you want to delete all history?")) {
            setHistory([]);
            setFilteredHistory([]);
            // Note: Cloud history deletion logic would go here
        }
    };

    const handleExport = (format: CSVFormat) => {
        const itemsToExport = selectedItems.length > 0 
            ? filteredHistory.filter(item => selectedItems.includes(item.id))
            : filteredHistory;
        const content = generateCSV(itemsToExport, format);
        downloadCSV(content, `descriptai_export_${format}_${new Date().toISOString().split('T')[0]}.csv`);
        setIsExporting(false);
    };

    const toggleSelect = (id: string) => {
        setSelectedItems(prev => 
            prev.includes(id) 
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selectedItems.length === filteredHistory.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredHistory.map(item => item.id));
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const deleteItem = (id: string) => {
        if (confirm("Delete this item?")) {
            setHistory(prev => prev.filter(item => item.id !== id));
            setFilteredHistory(prev => prev.filter(item => item.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 via-white to-emerald-100">
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

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Your History</h1>
                            <p className="text-gray-800">All your generated descriptions, secured in your database.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                            <span className="text-sm text-gray-700">{filteredHistory.length} items</span>
                            {selectedItems.length > 0 && (
                                <span className="bg-green-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {selectedItems.length} selected
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 border border-pink-100">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search by product name or features..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Date Filter */}
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">Last 7 Days</option>
                                <option value="month">Last 30 Days</option>
                            </select>

                            {/* Export Button */}
                            <div className="relative group">
                                <button
                                    onClick={() => setIsExporting(!isExporting)}
                                    className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition shadow-md flex items-center gap-2"
                                >
                                    <span>📥</span> Export
                                </button>

                                {isExporting && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-[60] py-2 overflow-hidden">
                                        <button 
                                            onClick={() => handleExport('general')} 
                                            className="w-full text-left px-4 py-2 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-blue-700 transition"
                                        >
                                            General View
                                        </button>
                                        <button
                                            disabled={!isPremium}
                                            onClick={() => isPremium && handleExport('shopify')}
                                            className={`w-full text-left px-4 py-2 text-sm font-bold transition flex items-center justify-between ${isPremium ? "text-gray-700 hover:bg-green-50 hover:text-blue-700" : "text-gray-300 cursor-not-allowed"}`}
                                        >
                                            <span>Shopify Import</span>
                                            {!isPremium && <span>🔒</span>}
                                        </button>
                                        <button
                                            disabled={!isPremium}
                                            onClick={() => isPremium && handleExport('amazon')}
                                            className={`w-full text-left px-4 py-2 text-sm font-bold transition flex items-center justify-between ${isPremium ? "text-gray-700 hover:bg-green-50 hover:text-blue-700" : "text-gray-300 cursor-not-allowed"}`}
                                        >
                                            <span>Amazon Sellers</span>
                                            {!isPremium && <span>🔒</span>}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Clear All */}
                            {history.length > 0 && (
                                <button
                                    onClick={clearHistory}
                                    className="bg-red-100 text-red-600 px-4 py-3 rounded-xl font-bold hover:bg-red-200 transition"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>

                    {history.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No history yet</h3>
                            <p className="text-gray-800 mb-6">Start generating amazing product descriptions to see them here.</p>
                            <Link
                                href="/generate"
                                className="bg-red-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-800 transition"
                            >
                                Start Generating 
                            </Link>
                        </div>
                    ) : filteredHistory.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-800 mb-6">Try adjusting your search or filter criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setDateFilter("all"); }}
                                className="bg-red-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-800 transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Select All */}
                            <div className="flex items-center gap-3 mb-4 px-2">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === filteredHistory.length && filteredHistory.length > 0}
                                    onChange={selectAll}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-700 focus:ring-red-600"
                                />
                                <span className="text-sm text-gray-800">Select all</span>
                            </div>

                            {/* History List */}
                            <div className="space-y-6">
                                {filteredHistory.map((item, index) => (
                                    <div key={item.id || index} className="bg-white rounded-xl shadow-md border border-amber-50 hover:shadow-lg transition overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(item.id)}
                                                        onChange={() => toggleSelect(item.id)}
                                                        className="w-5 h-5 mt-1 rounded border-gray-300 text-blue-700 focus:ring-red-600"
                                                    />
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900">{item.productName}</h3>
                                                        <p className="text-sm text-gray-700">
                                                            {new Date(item.createdAt).toLocaleString()} • <span className="capitalize">{item.tone}</span> Tone
                                                            {item.platform && ` • ${item.platform}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => copyToClipboard(item.variants.join('\n\n---\n\n'))}
                                                        className="text-gray-800 hover:text-blue-700 transition p-2"
                                                        title="Copy all variants"
                                                    >
                                                        📋
                                                    </button>
                                                    <button
                                                        onClick={() => deleteItem(item.id)}
                                                        className="text-gray-800 hover:text-red-600 transition p-2"
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="text-sm text-gray-800 mb-4 bg-gray-50 p-3 rounded-lg">
                                                <strong>Features:</strong> {item.features}
                                            </div>

                                            <div className="grid md:grid-cols-3 gap-4">
                                                {item.variants.map((variant, vIndex) => (
                                                    <div key={vIndex} className="bg-gray-50 p-4 rounded-xl text-sm text-gray-700 h-48 overflow-y-auto border border-gray-100 leading-relaxed">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Variant {vIndex + 1}</span>
                                                            <button
                                                                onClick={() => copyToClipboard(variant)}
                                                                className="text-gray-800 hover:text-blue-700 text-xs"
                                                            >
                                                                Copy
                                                            </button>
                                                        </div>
                                                        <div className="whitespace-pre-wrap">{variant}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

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

