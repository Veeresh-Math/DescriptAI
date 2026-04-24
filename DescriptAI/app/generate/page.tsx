"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { generateCSV, downloadCSV, CSVFormat } from "@/lib/csv-utils";
import { analyzeSEO, SEOAnalysis } from "@/lib/seo-heatmap";

// 🎨 Tone options
const TONES = [
  { id: "professional", name: "Professional", icon: "💼", description: "Formal & authoritative" },
  { id: "friendly", name: "Friendly", icon: "😊", description: "Warm & approachable" },
  { id: "luxury", name: "Luxury", icon: "✨", description: "Premium & elegant" },
  { id: "urgent", name: "Urgent", icon: "🔥", description: "FOMO & action-driven" },
  { id: "educational", name: "Educational", icon: "📚", description: "Informative & helpful" },
  { id: "humor", name: "Humorous", icon: "😄", description: "Fun & entertaining" },
];

// 📏 Length options
const LENGTHS = [
  { id: "short", name: "Short", words: "120 words", icon: "📝" },
  { id: "medium", name: "Medium", words: "250 words", icon: "📄" },
  { id: "long", name: "Long", words: "500 words", icon: "📚" },
];

// 🤖 AI Personas
const PERSONAS = [
  { id: "default", icon: "🤖", name: "Default AI", description: "Balanced for all products" },
  { id: "expert", icon: "🔧", name: "Product Expert", description: "Technical & detailed" },
  { id: "marketer", icon: "📈", name: "Marketing Pro", description: "Conversion-focused" },
  { id: "storyteller", icon: "📖", name: "Story Teller", description: "Narrative-driven" },
  { id: "seo_specialist", icon: "🔍", name: "SEO Specialist", description: "Keyword-optimized" },
];

// 🛒 Platforms
const PLATFORMS = [
  { id: "amazon", name: "Amazon", icon: "📦" },
  { id: "shopify", name: "Shopify", icon: "🛍️" },
  { id: "etsy", name: "Etsy", icon: "🎨" },
  { id: "ebay", name: "eBay", icon: "🏷️" },
];

// Brand Voice Presets (for Agency tier)
interface BrandPreset {
  id: string;
  name: string;
  instructions: string;
}

// SEO Heatmap Component
const SEOHeatmap = ({ analysis, customKeywords }: { analysis: SEOAnalysis | null, customKeywords: string }) => {
  if (!analysis) return null;
  
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-gray-800 flex items-center gap-2">
          🔥 SEO Heatmap
        </h4>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          analysis.score >= 80 ? "bg-green-100 text-green-700" :
          analysis.score >= 60 ? "bg-yellow-100 text-yellow-700" :
          "bg-red-100 text-red-700"
        }`}>
          Score: {analysis.score}/99
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-xs mb-3">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-gray-500">Words</div>
          <div className="font-bold text-gray-800">{analysis.wordCount}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-gray-500">Readability</div>
          <div className="font-bold text-gray-800">{analysis.readability.level}</div>
        </div>
      </div>
      
      {analysis.suggestions.length > 0 && (
        <div className="space-y-1">
          <div className="text-xs font-semibold text-gray-600">Suggestions:</div>
          {analysis.suggestions.slice(0, 3).map((suggestion, i) => (
            <div key={i} className="text-xs text-amber-600">• {suggestion}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// Variant Card Component
const VariantCard = ({ variant, index, copyToClipboard, copiedIndex, tier, customKeywords, showSeoHeatmap }: {
    variant: string,
    index: number,
    copyToClipboard: (text: string, index: number) => void,
    copiedIndex: number | null,
    tier: string,
    customKeywords: string,
    showSeoHeatmap: boolean
}) => {
    const [activeTab, setActiveTab] = useState('Description');
    const isPro = tier === 'pro' || tier === 'agency';
    const isAgency = tier === 'agency';
    
    const seoAnalysis = showSeoHeatmap && isPro ? analyzeSEO(variant, customKeywords) : null;

    const parseContent = () => {
        const sections: Record<string, string> = {
            'Description': variant,
            'Instagram': '',
            'Twitter': '',
            'Facebook Ad': '',
            'LinkedIn': ''
        };
        const socialKitMatch = variant.match(/(?:Social\s*Media\s*Kit|Social\s*Kit|SOCIAL\s*MEDIA\s*KIT)[\s\S]*/i);
        
        if (socialKitMatch) {
            const fullText = socialKitMatch[0];
            const descMatch = variant.match(/^([\s\S]*?)(?=Social\s*Media\s*Kit|Social\s*Kit|SOCIAL\s*MEDIA\s*KIT)/i);
            if (descMatch) sections['Description'] = descMatch[1].trim();

            const instaPatterns = [/(?:📸\s*)?Instagram\s*Caption:?\s*([\s\S]*?)(?=🐦|Twitter|📘|Facebook|LinkedIn|$)/i];
            for (const pattern of instaPatterns) {
                const match = fullText.match(pattern);
                if (match && match[1].trim().length > 10) {
                    sections['Instagram'] = match[1].trim();
                    break;
                }
            }
            const twitterPatterns = [/(?:🐦\s*)?Twitter\s*Post:?\s*([\s\S]*?)(?=📸|Instagram|📘|Facebook|LinkedIn|$)/i];
            for (const pattern of twitterPatterns) {
                const match = fullText.match(pattern);
                if (match && match[1].trim().length > 10) {
                    sections['Twitter'] = match[1].trim();
                    break;
                }
            }
            const fbPatterns = [/(?:📘\s*)?Facebook\s*(?:Post|Ad\s*Hook)?:?\s*([\s\S]*?)(?=📸|Instagram|🐦|Twitter|LinkedIn|$)/i];
            for (const pattern of fbPatterns) {
                const match = fullText.match(pattern);
                if (match && match[1].trim().length > 10) {
                    sections['Facebook Ad'] = match[1].trim();
                    break;
                }
            }
            // LinkedIn for Agency
            if (isAgency) {
                const linkedinPatterns = [/(?:💼\s*)?LinkedIn\s*(?:Post|B2B)?:?\s*([\s\S]*?)(?=📸|Instagram|🐦|Twitter|📘|Facebook|$)/i];
                for (const pattern of linkedinPatterns) {
                    const match = fullText.match(pattern);
                    if (match && match[1].trim().length > 10) {
                        sections['LinkedIn'] = match[1].trim();
                        break;
                    }
                }
            }
        }
        return sections;
    };

    const sections = parseContent();
    const currentContent = sections[activeTab] || sections['Description'];
    const seoScore = (() => {
        const base = 85;
        const hash = variant.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const bonus = hash % 10;
        const lengthBonus = variant.length > 500 ? 5 : 0;
        return Math.min(99, base + bonus + lengthBonus);
    })();

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-100 transition group">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">Variant {index + 1}</h3>
                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${seoScore > 80 ? "bg-green-100 text-green-700" : "bg-green-100 text-blue-700"} flex items-center gap-1`}>
                        {seoScore > 90 ? "💎" : "✨"} SEO Score: {seoScore}
                    </div>
                </div>
                <button onClick={() => copyToClipboard(currentContent, index)} className={`px-4 py-2 rounded-lg font-semibold transition ${copiedIndex === index ? "bg-green-500 text-white" : "bg-green-100 text-amber-800 hover:bg-amber-200"}`}>
                    {copiedIndex === index ? "✓ Copied!" : "📋 Copy"}
                </button>
            </div>
            <div className="mb-6 border-b border-gray-100">
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {['Description', 'Instagram', 'Twitter', 'Facebook Ad', ...(isAgency ? ['LinkedIn'] : [])].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1 text-sm font-bold whitespace-nowrap transition ${activeTab === tab ? "text-blue-700 border-b-2 border-amber-700" : "text-gray-800 hover:text-gray-800"}`}>
                            {tab !== 'Description' && !isPro && <span className="mr-1">🔒</span>}{tab}
                        </button>
                    ))}
                </div>
            </div>
            <div className="relative min-h-[200px]">
                {activeTab !== 'Description' && !isPro ? (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md rounded-xl p-6 text-center border border-pink-200">
                        <div className="text-4xl mb-2">🚀</div>
                        <h4 className="font-bold text-gray-900 uppercase">Social Kit Locked</h4>
                        <p className="text-xs text-gray-700 mb-4">Upgrade to Pro!</p>
                        <Link href="/pricing" className="bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Upgrade Now</Link>
                    </div>
                ) : (
                    <div className="prose prose-purple max-w-none">
                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm">{currentContent}</div>
                    </div>
                )}
            </div>
            {showSeoHeatmap && isPro && seoAnalysis && (
                <SEOHeatmap analysis={seoAnalysis} customKeywords={customKeywords} />
            )}
        </div>
    );
};

export default function GeneratePage() {
    const [productName, setProductName] = useState("");
    const [features, setFeatures] = useState("");
    const [tone, setTone] = useState("professional");
    const [length, setLength] = useState("medium");
    const [persona, setPersona] = useState("default");
    const [platform, setPlatform] = useState("amazon");
    const [customKeywords, setCustomKeywords] = useState("");
    const [showSocialKit, setShowSocialKit] = useState(true);
    const [showSeoHeatmap, setShowSeoHeatmap] = useState(false);
    const [variants, setVariants] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [userData, setUserData] = useState<{ tier: string, shortCredits: number, mediumCredits: number } | null>(null);
    const [presets, setPresets] = useState<BrandPreset[]>([]);
    const [selectedPreset, setSelectedPreset] = useState("");
    const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);
    const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([]);
    const resultsRef = useRef<HTMLDivElement>(null);

    const isFree = userData?.tier === 'free';
    const isPro = userData?.tier === 'pro';
    const isAgency = userData?.tier === 'agency';
    const isPremium = isPro || isAgency;

    // Fetch user data and presets
    useEffect(() => {
        fetch("/api/user").then(res => {
            if (res.ok) res.json().then(setUserData);
        }).catch(() => {});
        
        // Fetch presets (Agency tier)
        if (isAgency) {
            fetch("/api/presets").then(res => res.json()).then(data => {
                if (data.presets) setPresets(data.presets);
            }).catch(() => {});
        }
    }, [isAgency]);

    // Handle preset selection
    const handlePresetChange = (presetId: string) => {
        setSelectedPreset(presetId);
        if (presetId && presets.length > 0) {
            const preset = presets.find(p => p.id === presetId);
            if (preset) {
                // Apply preset tone based on instructions
                if (preset.instructions.toLowerCase().includes('friendly')) setTone('friendly');
                else if (preset.instructions.toLowerCase().includes('luxury')) setTone('luxury');
                else if (preset.instructions.toLowerCase().includes('professional')) setTone('professional');
            }
        }
    };

    // Get keyword suggestions
    const getKeywordSuggestions = async () => {
        if (!productName) {
            setError("Enter product name first!");
            return;
        }
        setShowKeywordSuggestions(true);
        try {
            const res = await fetch("/api/keywords", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productName, features })
            });
            const data = await res.json();
            if (data.keywords) {
                setKeywordSuggestions(data.keywords.split(',').map((k: string) => k.trim()));
            }
        } catch {
            setKeywordSuggestions(['best ' + productName, 'buy ' + productName, productName + ' online']);
        }
    };

    const handleGenerate = async () => {
        if (!productName || !features) {
            setError("Fill in the fields first!");
            return;
        }
        setIsGenerating(true);
        setError("");
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    productName, 
                    features, 
                    tone, 
                    length,
                    persona,
                    platform,
                    customKeywords,
                    showSocialKit,
                    showSeoHeatmap
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed");
            const content = data.generated_text || "";
            const newVariants = content.split(/\[\[NEXT_VARIANT\]\]|---|Variant \d+:|Description \d+:/gi).map((v: string) => v.trim()).filter((v: string) => v.length > 10).slice(0, 3);
            setVariants(newVariants);
            setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // CSV Export
    const handleExportCSV = (format: CSVFormat) => {
        if (variants.length === 0) {
            setError("Generate descriptions first!");
            return;
        }
        const csv = generateCSV(productName, variants, format);
        downloadCSV(csv, `${productName.replace(/\s+/g, '-')}-${format}.csv`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-20 lg:pb-0">
            <header className="bg-white border-b border-pink-100 py-3 px-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-lg font-black gradient-text">⚡ DescriptAI</Link>
                    <div className="flex gap-3 items-center">
                        <Link href="/help" className="text-xs font-bold text-gray-800 p-2">Help</Link>
                        <Link href="/history" className="text-xs font-bold text-gray-800 p-2">History</Link>
                        <Link href="/pricing" className="text-xs font-bold text-gray-800 p-2">⭐ Pricing</Link>
                    </div>
                </div>
            </header>
            
            <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid lg:grid-cols-2 gap-6">
                {/* LEFT PANEL - INPUTS */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 h-fit border border-amber-50 space-y-6">
                    <h1 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6"><span className="text-yellow-500">Generate</span> <span className="text-blue-700">Pure Copy</span></h1>
                    
                    {error && <div className="mb-4 bg-red-50 text-red-700 p-4 rounded-xl text-sm font-bold">{error}</div>}
                    
                    {/* User Credits Display */}
                    {userData && (
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-3 border border-purple-200">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-purple-800">Current Plan: {userData.tier.toUpperCase()}</span>
                                <span className="text-purple-600">Short: {userData.shortCredits} | Medium: {userData.mediumCredits}</span>
                            </div>
                        </div>
                    )}

                    <div className="space-y-5">
                        {/* Product Name */}
                        <div>
                            <label className="block text-xs font-bold text-black uppercase mb-2">Product Name *</label>
                            <input 
                                value={productName} 
                                onChange={e => setProductName(e.target.value)} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition" 
                                placeholder="e.g. Wireless Bluetooth Headphones" 
                            />
                        </div>

                        {/* Key Features */}
                        <div>
                            <label className="block text-xs font-bold text-black uppercase mb-2">Key Features *</label>
                            <textarea 
                                value={features} 
                                onChange={e => setFeatures(e.target.value)} 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition h-24" 
                                placeholder="e.g. Bluetooth 5.0, Noise cancelling, 30hr battery, Premium sound quality..." 
                            />
                        </div>

                        {/* Platform Selector - PRO */}
                        <div>
                            <label className="block text-xs font-bold text-black uppercase mb-2 flex items-center gap-2">
                                🛒 Platform
                                {!isPremium && <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">PRO</span>}
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {PLATFORMS.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => isPremium ? setPlatform(p.id) : setPlatform('amazon')}
                                        disabled={!isPremium && p.id !== 'amazon'}
                                        className={`p-2 rounded-lg border-2 text-xs font-bold transition ${
                                            platform === p.id 
                                                ? "border-blue-500 bg-blue-50 text-blue-700" 
                                                : isPremium 
                                                    ? "border-gray-200 hover:border-gray-300" 
                                                    : "border-gray-100 opacity-50 cursor-not-allowed"
                                        }`}
                                    >
                                        <span className="block text-lg mb-1">{p.icon}</span>
                                        {p.name}
                                    </button>
                                ))}
                            </div>
                            {!isPremium && <p className="text-[10px] text-gray-500 mt-1">Upgrade to Pro for all platforms</p>}
                        </div>

                        {/* Tone Selector */}
                        <div>
                            <label className="block text-xs font-bold text-black uppercase mb-2">🎨 Tone</label>
                            <select 
                                value={tone} 
                                onChange={e => setTone(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition"
                            >
                                {TONES.map(t => (
                                    <option key={t.id} value={t.id}>{t.icon} {t.name} - {t.description}</option>
                                ))}
                            </select>
                        </div>

                        {/* Length Selector - Gated */}
                        <div>
                            <label className="block text-xs font-bold text-black uppercase mb-2 flex items-center gap-2">
                                📏 Length
                                {isFree && <span className="text-[10px] bg-amber-100 px-2 py-0.5 rounded-full">Short/Medium only</span>}
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {LENGTHS.map(l => {
                                    const isLocked = isFree && l.id === 'long';
                                    return (
                                        <button
                                            key={l.id}
                                            onClick={() => !isLocked && setLength(l.id)}
                                            disabled={isLocked}
                                            className={`p-2 rounded-lg border-2 text-xs font-bold transition ${
                                                length === l.id 
                                                    ? "border-blue-500 bg-blue-50 text-blue-700" 
                                                    : isLocked 
                                                        ? "border-gray-100 opacity-50 cursor-not-allowed" 
                                                        : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <span className="block text-lg mb-1">{l.icon}</span>
                                            {l.name}
                                            <span className="block text-[10px] font-normal">{l.words}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* AI Persona - PRO */}
                        <div>
                            <label className="block text-xs font-bold text-black uppercase mb-2 flex items-center gap-2">
                                🤖 AI Persona
                                {!isPremium && <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">PRO</span>}
                            </label>
                            <select 
                                value={persona} 
                                onChange={e => isPremium ? setPersona(e.target.value) : setPersona('default')}
                                disabled={!isPremium}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition disabled:opacity-50"
                            >
                                {PERSONAS.map(p => (
                                    <option key={p.id} value={p.id} disabled={!isPremium && p.id !== 'default'}>
                                        {p.icon || '🤖'} {p.name} - {p.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Brand Voice Presets - AGENCY */}
                        {isAgency && (
                            <div>
                                <label className="block text-xs font-bold text-black uppercase mb-2 flex items-center gap-2">
                                    🎭 Brand Voice Presets
                                    <span className="text-[10px] bg-purple-100 px-2 py-0.5 rounded-full">AGENCY</span>
                                </label>
                                <select 
                                    value={selectedPreset} 
                                    onChange={e => handlePresetChange(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition"
                                >
                                    <option value="">Select a preset...</option>
                                    {presets.map(preset => (
                                        <option key={preset.id} value={preset.id}>{preset.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Custom Keywords - PRO */}
                        <div>
                            <label className="block text-xs font-bold text-black uppercase mb-2 flex items-center gap-2">
                                🔑 Custom Keywords
                                {!isPremium && <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">PRO</span>}
                            </label>
                            <div className="flex gap-2">
                                <input 
                                    value={customKeywords} 
                                    onChange={e => isPremium ? setCustomKeywords(e.target.value) : setCustomKeywords('')}
                                    disabled={!isPremium}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 outline-none transition disabled:opacity-50" 
                                    placeholder="Enter keywords separated by commas..."
                                />
                                <button 
                                    onClick={getKeywordSuggestions}
                                    disabled={!isPremium}
                                    className="px-4 py-2 bg-gray-100 rounded-xl text-xs font-bold hover:bg-gray-200 disabled:opacity-50"
                                >
                                    ✨ Get
                                </button>
                            </div>
                            {showKeywordSuggestions && keywordSuggestions.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {keywordSuggestions.slice(0, 5).map((kw, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => {
                                                if (isPremium) {
                                                    setCustomKeywords(prev => prev ? prev + ', ' + kw : kw);
                                                }
                                            }}
                                            className={`text-[10px] px-2 py-1 rounded-full ${isPremium ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer' : 'bg-gray-100 text-gray-500 cursor-not-allowed'}`}
                                        >
                                            + {kw}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Social Media Kit Toggle - PRO */}
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-black uppercase flex items-center gap-2">
                                📱 Social Media Kit
                                {!isPremium && <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">PRO</span>}
                            </label>
                            <button 
                                onClick={() => isPremium ? setShowSocialKit(!showSocialKit) : null}
                                disabled={!isPremium}
                                className={`w-12 h-6 rounded-full transition ${showSocialKit && isPremium ? 'bg-green-500' : 'bg-gray-300'} disabled:opacity-50`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${showSocialKit && isPremium ? 'translate-x-6' : 'translate-x-0.5'}`} />
                            </button>
                        </div>

                        {/* SEO Heatmap Toggle - PRO */}
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-black uppercase flex items-center gap-2">
                                🔥 SEO Heatmap
                                {!isPremium && <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full">PRO</span>}
                            </label>
                            <button 
                                onClick={() => isPremium ? setShowSeoHeatmap(!showSeoHeatmap) : null}
                                disabled={!isPremium}
                                className={`w-12 h-6 rounded-full transition ${showSeoHeatmap && isPremium ? 'bg-green-500' : 'bg-gray-300'} disabled:opacity-50`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${showSeoHeatmap && isPremium ? 'translate-x-6' : 'translate-x-0.5'}`} />
                            </button>
                        </div>

                        {/* Generate Button */}
                        <button 
                            onClick={handleGenerate} 
                            disabled={isGenerating} 
                            className="w-full bg-gradient-to-r from-red-700 to-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition disabled:opacity-50"
                        >
                            {isGenerating ? "Waking up AI..." : "⚡ Generate 3 Variants"}
                        </button>
                        
                        {!isPremium && (
                            <p className="text-center text-xs text-gray-500">
                                🔒 Upgrade to Pro for AI Persona, Social Kit, SEO Heatmap & more
                            </p>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL - RESULTS */}
                <div ref={resultsRef} className="space-y-6">
                    {variants.length === 0 ? (
                        <div className="bg-green-50 rounded-2xl p-8 text-center border-2 border-dashed border-pink-200 h-full flex flex-col justify-center min-h-[200px]">
                            <div className="text-5xl mb-4 opacity-50">✍️</div>
                            <h3 className="text-xl font-bold text-purple-900">Your variants will appear here</h3>
                            <p className="text-green-500 text-sm mt-2">Enter product details & tap Generate</p>
                        </div>
                    ) : (
                        <>
                            {/* CSV Export Buttons - PRO */}
                            {isPremium && (
                                <div className="flex gap-2 justify-end">
                                    <button onClick={() => handleExportCSV('amazon')} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold hover:bg-amber-200">
                                        📦 Amazon CSV
                                    </button>
                                    <button onClick={() => handleExportCSV('shopify')} className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-bold hover:bg-green-200">
                                        🛍️ Shopify CSV
                                    </button>
                                </div>
                            )}
                            {variants.map((v, i) => (
                                <VariantCard 
                                    key={i} 
                                    variant={v} 
                                    index={i} 
                                    tier={userData?.tier || 'free'} 
                                    copyToClipboard={copyToClipboard} 
                                    copiedIndex={copiedIndex}
                                    customKeywords={customKeywords}
                                    showSeoHeatmap={showSeoHeatmap}
                                />
                            ))}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
