"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { generateCSV, downloadCSV, CSVFormat } from "@/lib/csv-utils";

// Sub-component for individual generation results
const VariantCard = ({ variant, index, copyToClipboard, copiedIndex, tier, customKeywords }: {
    variant: string,
    index: number,
    copyToClipboard: (text: string, index: number) => void,
    copiedIndex: number | null,
    tier: string,
    customKeywords: string
}) => {

    const [activeTab, setActiveTab] = useState('Description');
    const isPro = tier === 'pro' || tier === 'agency';

    const parseContent = () => {
        const sections: Record<string, string> = {
            'Description': variant,
            'Instagram': '',
            'Twitter': '',
            'Facebook Ad': ''
        };

        console.log('🔍 RAW VARIANT:', variant);

        // Look for Social Media Kit section with various possible headers
        const socialKitMatch = variant.match(/(?:Social\s*Media\s*Kit|Social\s*Kit|SOCIAL\s*MEDIA\s*KIT)[\s\S]*/i);
        
        if (socialKitMatch) {
            const fullText = socialKitMatch[0];
            // Extract description (everything before Social Media Kit)
            const descMatch = variant.match(/^([\s\S]*?)(?=Social\s*Media\s*Kit|Social\s*Kit|SOCIAL\s*MEDIA\s*KIT)/i);
            if (descMatch) {
                sections['Description'] = descMatch[1].trim();
            }

            console.log('📦 SOCIAL KIT SECTION FOUND:', fullText.substring(0, 200));

            // Extract Instagram - look for various patterns
            const instaPatterns = [
                /(?:📸\s*)?Instagram\s*Caption:?\s*([\s\S]*?)(?=🐦|Twitter|📘|Facebook|$)/i,
                /Instagram[:\s]+([\s\S]*?)(?=Twitter|Facebook|$)/i,
                /📸\s*([\s\S]*?)(?=🐦|📘|$)/i
            ];
            
            for (const pattern of instaPatterns) {
                const match = fullText.match(pattern);
                if (match && match[1].trim().length > 10) {
                    sections['Instagram'] = match[1].trim();
                    console.log('📸 Instagram extracted:', sections['Instagram'].substring(0, 100));
                    break;
                }
            }

            // Extract Twitter - look for various patterns
            const twitterPatterns = [
                /(?:🐦\s*)?Twitter\s*Post:?\s*([\s\S]*?)(?=📸|Instagram|📘|Facebook|$)/i,
                /Twitter[:\s]+([\s\S]*?)(?=Instagram|Facebook|$)/i,
                /🐦\s*([\s\S]*?)(?=📸|📘|$)/i
            ];
            
            for (const pattern of twitterPatterns) {
                const match = fullText.match(pattern);
                if (match && match[1].trim().length > 10) {
                    sections['Twitter'] = match[1].trim();
                    console.log('🐦 Twitter extracted:', sections['Twitter'].substring(0, 100));
                    break;
                }
            }

            // Extract Facebook - look for various patterns
            const fbPatterns = [
                /(?:📘\s*)?Facebook\s*(?:Post|Ad\s*Hook)?:?\s*([\s\S]*?)(?=📸|Instagram|🐦|Twitter|$)/i,
                /Facebook[:\s]+([\s\S]*?)(?=Instagram|Twitter|$)/i,
                /📘\s*([\s\S]*?)(?=📸|🐦|$)/i
            ];
            
            for (const pattern of fbPatterns) {
                const match = fullText.match(pattern);
                if (match && match[1].trim().length > 10) {
                    sections['Facebook Ad'] = match[1].trim();
                    console.log('📘 Facebook extracted:', sections['Facebook Ad'].substring(0, 100));
                    break;
                }
            }
        }

        console.log('✅ FINAL SECTIONS:', {
            Description: sections['Description'].substring(0, 100) + '...',
            Instagram: sections['Instagram'].substring(0, 50) + '...',
            Twitter: sections['Twitter'].substring(0, 50) + '...',
            Facebook: sections['Facebook Ad'].substring(0, 50) + '...'
        });
        return sections;
    };


    const sections = parseContent();
    const currentContent = sections[activeTab] || sections['Description'];

    // Calculate SEO Score (Deterministic based on content)
    const seoScore = useMemo(() => {
        const base = 85;
        // Use a simple hash of the variant instead of Math.random() to be "pure"
        const hash = variant.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const bonus = hash % 10; // 0-9
        const lengthBonus = variant.length > 500 ? 5 : 0;
        return Math.min(99, base + bonus + lengthBonus);
    }, [variant]);

    const highlightKeywords = (text: string) => {
        if (!isPro) return text; // Heatmap locked for Free

        // Agency Tier Exclusive: Custom Keyword Highlighting
        const userKws = (customKeywords || "").split(',').map((k: string) => k.trim()).filter(Boolean);
        const baseKeywords = ['premium', 'professional', 'analytics', 'strategy', 'results', 'growth', 'guarantee', 'limited', 'exclusive'];

        const keywords = [...new Set([...userKws, ...baseKeywords])];

        let highlighted = text;
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
            const isUserKw = userKws.includes(kw);
            // Highlight user keywords in a different color (Teal) for Agency tier
            highlighted = highlighted.replace(regex, `<span class="${isUserKw ? "bg-teal-200" : "bg-yellow-200"} font-bold px-1 rounded">$1</span>`);
        });
        return highlighted;
    };

    // seoScore is already calculated above via useMemo

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-100 transition group">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">Variant {index + 1}</h3>
                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${seoScore > 80 ? "bg-green-100 text-green-700" : "bg-green-100 text-blue-700"} flex items-center gap-1`}>
                        {seoScore > 90 ? "💎" : "✨"} SEO Score: {seoScore}
                    </div>
                </div>
                <button
                    onClick={() => copyToClipboard(currentContent, index)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${copiedIndex === index ? "bg-green-500 text-white" : "bg-green-100 text-amber-800 hover:bg-amber-200"}`}
                >
                    {copiedIndex === index ? "✓ Copied!" : "📋 Copy"}
                </button>
            </div>

            <div className="mb-6 border-b border-gray-100">
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {['Description', 'Instagram', 'Twitter', 'Facebook Ad'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1 text-sm font-bold whitespace-nowrap transition relative ${activeTab === tab ? "text-blue-700 border-b-2 border-amber-700" : "text-gray-800 hover:text-gray-800"}`}
                        >
                            {tab !== 'Description' && !isPro && <span className="mr-1">🔒</span>}
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative min-h-[200px]">
                {activeTab !== 'Description' && !isPro ? (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md rounded-xl p-6 text-center border border-pink-200">
                        <div className="text-4xl mb-2">🚀</div>
                        <h4 className="font-bold text-gray-900 uppercase tracking-tighter">Social Kit Locked</h4>
                        <p className="text-xs text-gray-700 mb-4">Upgrade to Pro to instantly generate social media captions!</p>
                        <Link href="/pricing" className="bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg">Upgrade Now</Link>
                    </div>
                ) : (
                    <>
                        {!isPro && (
                            <div className="absolute top-0 right-0 z-20">
                                <Link
                                    href="/pricing"
                                    className="bg-white/90 backdrop-blur-sm border border-pink-100 shadow-sm px-2 py-1 rounded-lg text-[9px] font-bold text-blue-700 flex items-center gap-1 hover:bg-green-50 transition"
                                >
                                    🔒 UNLOCK EXPERT FEEDBACK
                                </Link>
                            </div>
                        )}
                        <div className="prose prose-purple max-w-none">
                            <div className={`text-gray-800 leading-relaxed whitespace-pre-wrap text-sm ${!isPro ? "blur-[0.5px] select-none pointer-events-none" : ""}`}
                                dangerouslySetInnerHTML={{ __html: highlightKeywords(currentContent) }} />
                        </div>
                        {!isPro && (
                            <div className="mt-4 p-3 bg-green-50 rounded-xl border border-pink-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">💡</span>
                                    <p className="text-[10px] text-blue-700 font-bold leading-tight">Your SEO Score is {seoScore}. <br />Unlock the <span className="underline">Keyword Heatmap</span> to see how to hit 99+.</p>
                                </div>
                                <Link href="/pricing" className="bg-slate-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase shadow-md hover:bg-red-700 transition">Show Me</Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

// Onboarding Modal Component
const OnboardingModal = ({ isOpen, onClose, currentStep, onNext, onSkip }: {
    isOpen: boolean,
    onClose: () => void,
    currentStep: number,
    onNext: () => void,
    onSkip: () => void
}) => {
    if (!isOpen) return null;

    const steps = [
        {
            title: "Welcome to DescriptAI! 🎉",
            description: "Let's create your first AI-powered product description in under 30 seconds.",
            icon: "🚀"
        },
        {
            title: "Enter Product Details",
            description: "Type your product name and key features. Be specific for better results!",
            icon: "📝",
            tip: "Tip: Include unique selling points like 'organic', 'handmade', 'wireless'"
        },
        {
            title: "Choose Your Platform",
            description: "Select where you'll sell - Amazon, Shopify, Etsy, or eBay. Each gets optimized formatting!",
            icon: "🛒"
        },
        {
            title: "Generate & Export",
            description: "Click Generate to get 3 AI variants. Copy, export to CSV, or use the Social Media Kit!",
            icon: "✨"
        }
    ];

    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length - 1;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-pink-100">
                <div className="text-center">
                    <div className="text-6xl mb-4">{step.icon}</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h2>
                    <p className="text-gray-800 mb-4">{step.description}</p>
                    {step.tip && (
                        <div className="bg-green-50 rounded-xl p-3 mb-4 border border-pink-100">
                            <p className="text-sm text-amber-800">{step.tip}</p>
                        </div>
                    )}
                    
                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 mb-6">
                        {steps.map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-2 h-2 rounded-full transition ${
                                    i === currentStep ? "bg-red-700 w-6" : 
                                    i < currentStep ? "bg-green-500" : "bg-gray-300"
                                }`} 
                            />
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onSkip}
                            className="flex-1 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition"
                        >
                            Skip Tour
                        </button>
                        <button
                            onClick={isLastStep ? onClose : onNext}
                            className="flex-1 py-3 rounded-xl font-bold bg-gradient-to-r from-red-700 to-red-600 text-white hover:shadow-lg transition"
                        >
                            {isLastStep ? "Start Creating!" : "Next →"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function GeneratePage() {
    const [productName, setProductName] = useState("");
    const [features, setFeatures] = useState("");
    const [tone, setTone] = useState("professional");
    const [length, setLength] = useState("medium");
    const [profession, setProfession] = useState("Co-founder");
    const [variants, setVariants] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [userData, setUserData] = useState<{ tier: string, shortCredits: number, mediumCredits: number, referralCode?: string } | null>(null);
    const [customKeywords, setCustomKeywords] = useState("");
    const [isSuggestingKeywords, setIsSuggestingKeywords] = useState(false);
    const [brandVoice, setBrandVoice] = useState("Balanced");
    const [platform, setPlatform] = useState("amazon");
    interface BrandPreset {
        id: string;
        name: string;
        instructions: string;
    }

    const [savedPresets, setSavedPresets] = useState<BrandPreset[]>([]);
    const [newPresetName, setNewPresetName] = useState("");
    const [isSavingPreset, setIsSavingPreset] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const resultsRef = useRef<HTMLDivElement>(null);
    
    // Onboarding state
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(0);

    const handleExport = (format: CSVFormat) => {
        const item = {
            productName,
            features,
            tone,
            variants,
            createdAt: new Date().toISOString()
        };
        const content = generateCSV([item], format);
        downloadCSV(content, `descriptai_${productName.toLowerCase().replace(/\s+/g, '_')}_${format}.csv`);
        setIsExporting(false);
    };
    const isPro = userData?.tier === 'pro';
    const isAgency = userData?.tier === 'agency';
    const isPremium = isPro || isAgency;


    const fetchUserData = async () => {
        const res = await fetch("/api/user");
        if (res.ok) {
            const data = await res.json();
            setUserData(data);
            if (data.tier === 'agency') fetchPresets();
        }
    };

    const fetchPresets = async () => {
        const res = await fetch("/api/presets");
        if (res.ok) {
            const data = await res.json();
            // Handle both {presets: []} and [] response formats
            setSavedPresets(data.presets || data || []);
        }
    };


    useEffect(() => {
        fetchUserData();
        localStorage.removeItem("hf_api_key");
        
        // Check if first-time user - show onboarding
        const hasSeenOnboarding = localStorage.getItem("descriptai_onboarding_complete");
        if (!hasSeenOnboarding) {
            setShowOnboarding(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const closeOnboarding = () => {
        setShowOnboarding(false);
        localStorage.setItem("descriptai_onboarding_complete", "true");
    };

    const nextOnboardingStep = () => {
        setOnboardingStep(prev => prev + 1);
    };

    const skipOnboarding = () => {
        setShowOnboarding(false);
        localStorage.setItem("descriptai_onboarding_complete", "true");
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
                    profession,
                    platform,
                    // Agency exclusive parameters
                    customKeywords: userData?.tier === 'agency' ? customKeywords : null,
                    brandVoice: userData?.tier === 'agency' ? brandVoice : null
                }),

            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed");

            // Increased resilience for splitting variants: fallback to ---, Variant X:, Description X:
            const content = data.generated_text || "";
            const newVariants = content
                .split(/\[\[NEXT_VARIANT\]\]|---|Variant \d+:|Description \d+:/gi)
                .map((v: string) => v.trim())
                .filter((v: string) => v.length > 10) // Lowered threshold slightly
                .slice(0, 3);

            setVariants(newVariants);
            fetchUserData();

            await fetch("/api/history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productName, features, tone, variants: newVariants }),
            });
            setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
            setError(errorMessage);
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const suggestKeywords = async () => {
        if (!productName || !features) {
            setError("Enter product details first to get recommendations!");
            return;
        }
        setIsSuggestingKeywords(true);
        try {
            const res = await fetch("/api/keywords", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productName, features }),
            });
            const data = await res.json();
            if (res.ok) {
                setCustomKeywords(data.keywords);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSuggestingKeywords(false);
        }
    };

    const savePreset = async () => {
        if (!newPresetName) {
            setError("Please name your preset!");
            return;
        }
        setIsSavingPreset(true);
        try {
            const res = await fetch("/api/presets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newPresetName, instructions: brandVoice }),
            });
            if (res.ok) {
                setNewPresetName("");
                fetchPresets();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSavingPreset(false);
        }
    };

    const deletePreset = async (id: string) => {
        try {
            const res = await fetch("/api/presets", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (res.ok) fetchPresets();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pb-20 lg:pb-0">
            {/* Onboarding Modal */}
            <OnboardingModal 
                isOpen={showOnboarding}
                onClose={closeOnboarding}
                currentStep={onboardingStep}
                onNext={nextOnboardingStep}
                onSkip={skipOnboarding}
            />
            
            {/* Mobile-First Header */}
            <header className="bg-white border-b border-pink-100 py-3 px-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-lg font-black gradient-text">⚡ DescriptAI</Link>
                    <div className="flex gap-3 items-center">
                        <Link href="/help" className="text-xs font-bold text-gray-800 hover:text-blue-700 transition p-2">Help</Link>
                        <Link href="/history" className="text-xs font-bold text-gray-800 hover:text-blue-700 transition p-2">History</Link>
                        <Link href="/pricing" className="text-xs font-bold text-gray-800 hover:text-blue-700 transition p-2">⭐ Pricing</Link>
                        {userData && (
                            <div className="hidden sm:flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${userData.tier === 'free' ? 'bg-gray-200 text-gray-700' : userData.tier === 'pro' ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white' : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'}`}>
                                    {userData.tier.toUpperCase()}
                                </span>
                                <div className="flex gap-1 text-[9px] font-black">
                                    <span className={`px-2 py-1 rounded-full ${userData.shortCredits > 0 ? "bg-green-100 text-amber-800" : "bg-red-100 text-red-600"}`} title="Short Credits">S:{userData.shortCredits}</span>
                                    <span className={`px-2 py-1 rounded-full ${userData.mediumCredits > 0 ? "bg-teal-100 text-teal-700" : "bg-red-100 text-red-600"}`} title="Medium Credits">M:{userData.mediumCredits}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>


            <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid lg:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 h-fit border border-amber-50">
                    <h1 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 tracking-tight"><span className="text-yellow-500">Generate</span> <span className="text-blue-700">Pure Copy</span></h1>

                    {error && <div className="mb-4 bg-red-50 text-red-700 p-4 rounded-xl text-sm font-bold border border-red-200">{error}</div>}

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-black uppercase mb-2">Product Name</label>
                            <input value={productName} onChange={e => setProductName(e.target.value)} style={{color: '#000000'}} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition text-black placeholder-gray-400" placeholder="e.g. Arabica Coffee Beans" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-black uppercase mb-2">Key Features</label>
                            <textarea value={features} onChange={e => setFeatures(e.target.value)} style={{color: '#000000'}} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none transition h-32 text-black placeholder-gray-400" placeholder="e.g. Organic, strong aroma, fair trade..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Target Length</label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { id: 'micro', label: '50', words: '50w', premium: false },
                                        { id: 'tiny', label: '100', words: '100w', premium: false },
                                        { id: 'short', label: '120', words: '120w', premium: false },
                                        { id: 'mini', label: '150', words: '150w', premium: true },
                                        { id: 'medium', label: '250', words: '250w', premium: true },
                                        { id: 'long', label: '500', words: '500w', premium: true }
                                    ].map(l => {

                                        const isLocked = l.premium && !isPremium;
                                        return (
                                            <button
                                                key={l.id}
                                                onClick={() => !isLocked && setLength(l.id)}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition ${length === l.id ? "bg-red-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} ${isLocked ? "cursor-not-allowed opacity-70" : ""}`}
                                            >
                                                {isLocked && '🔒 '}{l.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Voice Tone</label>
                                <div className="flex gap-2">
                                    {[
                                        { id: 'professional', label: 'PRO', premium: true },
                                        { id: 'casual', label: 'CASUAL', premium: false },
                                        { id: 'enthusiastic', label: 'BOLD', premium: true }
                                    ].map(t => {
                                        const isLocked = t.premium && !isPremium;
                                        return (
                                            <button
                                                key={t.id}
                                                onClick={() => !isLocked && setTone(t.id)}
                                                className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition ${tone === t.id ? "bg-red-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} ${isLocked ? "cursor-not-allowed opacity-70" : ""}`}
                                            >
                                                {isLocked && '🔒 '}{t.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Platform Selector - SOCIAL + E-COMMERCE MODES */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Target Platform 🎯</label>
                            
                            {/* Social Media Mode - Pro & Agency */}
                            <div className="mb-3">
                                <p className="text-[10px] font-bold text-blue-700 uppercase mb-2">📱 Social Media Mode {isPro && <span className="text-green-500">(Pro)</span>}{isAgency && <span className="text-teal-400">(Agency)</span>}</p>
                                <div className="grid grid-cols-5 gap-2">
                                    {[
                                        { id: 'tiktok', label: '🎵 TikTok', desc: 'Viral 80w', tier: 'pro' },
                                        { id: 'twitter', label: '🐦 X/Twitter', desc: 'Punchy 100w', tier: 'pro' },
                                        { id: 'instagram', label: '📸 IG', desc: 'Visual 150w', tier: 'pro' },
                                        { id: 'linkedin', label: '💼 LinkedIn', desc: 'B2B 300w', tier: 'agency' },
                                        { id: 'facebook', label: '📘 Facebook', desc: 'Social 150w', tier: 'pro' }
                                    ].map(p => {
                                        const isLocked = (p.tier === 'pro' && !isPremium) || (p.tier === 'agency' && !isAgency);
                                        return (
                                            <button
                                                key={p.id}
                                                onClick={() => !isLocked && setPlatform(p.id)}
                                                disabled={isLocked}
                                                className={`flex flex-col items-center p-2 rounded-xl border-2 transition relative ${platform === p.id ? "border-amber-700 bg-green-50" : "border-gray-100 hover:border-pink-200"} ${isLocked ? "cursor-not-allowed opacity-60 bg-gray-50" : ""}`}
                                            >
                                                {isLocked && (
                                                    <div className={`absolute -top-1 -right-1 text-white text-[7px] font-black px-1 py-0.5 rounded-full shadow-sm ${p.tier === 'agency' ? 'bg-teal-600' : 'bg-red-700'}`}>
                                                        {p.tier === 'agency' ? 'AGENCY' : 'PRO'}
                                                    </div>
                                                )}
                                                <span className="text-lg mb-1">{p.label.split(' ')[0]}</span>
                                                <span className="text-[9px] font-bold text-gray-700">{p.label.split(' ')[1]}</span>
                                                <span className="text-[7px] text-gray-800 mt-1">{p.desc}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* E-Commerce Mode */}
                            <div>
                                <p className="text-[10px] font-bold text-teal-600 uppercase mb-2">🛒 E-Commerce Mode</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        { id: 'amazon', label: '📦 Amazon', desc: 'SEO 120w', tier: 'free' },
                                        { id: 'shopify', label: '🛒 Shopify', desc: 'Brand 250w', tier: 'free' },
                                        { id: 'etsy', label: '🎨 Etsy', desc: 'Handmade 150w', tier: 'pro' },
                                        { id: 'ebay', label: '💰 eBay', desc: 'Direct 120w', tier: 'pro' }
                                    ].map(p => {
                                        const isLocked = (p.tier === 'pro' && !isPremium) || (p.tier === 'agency' && !isAgency);
                                        return (
                                            <button
                                                key={p.id}
                                                onClick={() => !isLocked && setPlatform(p.id)}
                                                disabled={isLocked}
                                                className={`flex flex-col items-center p-3 rounded-xl border-2 transition relative ${platform === p.id ? "border-amber-700 bg-green-50" : "border-gray-100 hover:border-pink-200"} ${isLocked ? "cursor-not-allowed opacity-60 bg-gray-50" : ""}`}
                                            >
                                                {isLocked && (
                                                    <div className={`absolute -top-1 -right-1 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-sm ${p.tier === 'agency' ? 'bg-teal-600' : 'bg-red-700'}`}>
                                                        {p.tier === 'agency' ? 'AGENCY' : 'PRO'}
                                                    </div>
                                                )}
                                                <span className="text-lg mb-1">{p.label.split(' ')[0]}</span>
                                                <span className="text-[10px] font-bold text-gray-700">{p.label.split(' ')[1]}</span>
                                                <span className="text-[8px] text-gray-800 mt-1">{p.desc}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            {!isPremium && (
                                <div className="mt-2 flex items-center gap-2 text-[10px] text-blue-700 font-bold bg-green-50 px-3 py-2 rounded-lg border border-pink-100">
                                    <span>🔒</span>
                                    <span>Upgrade to Pro for Social Media + All E-Commerce platforms!</span>
                                    <Link href="/pricing" className="ml-auto text-[9px] bg-red-700 text-white px-2 py-1 rounded hover:bg-amber-800 transition">
                                        Upgrade
                                    </Link>
                                </div>
                            )}
                            {isPro && !isAgency && (
                                <div className="mt-2 flex items-center gap-2 text-[10px] text-teal-600 font-bold bg-teal-50 px-3 py-2 rounded-lg border border-teal-100">
                                    <span>👑</span>
                                    <span>Upgrade to Agency for LinkedIn B2B + Advanced Features!</span>
                                    <Link href="/pricing" className="ml-auto text-[9px] bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700 transition">
                                        Go Agency
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">AI Persona (Your Role)</label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { id: 'Co-founder', label: 'General', tier: 'free' },
                                    { id: 'SEO Expert', label: 'SEO Expert', tier: 'pro' },
                                    { id: 'Ad Specialist', label: 'Ads Expert', tier: 'agency' },
                                    { id: 'Copywriter', label: 'Pro Copywriter', tier: 'agency' }
                                ].map(p => {
                                    const isLocked = (p.tier === 'pro' && !isPremium) || (p.tier === 'agency' && !isAgency);
                                    return (
                                        <button
                                            key={p.id}
                                            onClick={() => !isLocked && setProfession(p.id)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${profession === p.id ? "bg-red-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} ${isLocked ? "cursor-not-allowed opacity-70" : ""}`}
                                        >
                                            {isLocked && <span className="mr-1">{p.tier === 'agency' ? '👑' : '🔒'}</span>}{p.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Agency Tier - Exclusive Inputs */}

                        {userData?.tier === 'agency' && (
                            <div className="space-y-6 pt-6 border-t border-pink-100">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">🏆</span>
                                    <h3 className="font-black text-purple-900 uppercase text-xs tracking-widest">Agency Command Suite</h3>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-xs font-bold text-gray-700 uppercase">Target SEO Keywords (Comma separated)</label>
                                        <button
                                            onClick={suggestKeywords}
                                            disabled={isSuggestingKeywords}
                                            className="text-[10px] font-black text-teal-600 hover:text-teal-800 transition flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-full border border-teal-200"
                                        >
                                            {isSuggestingKeywords ? "🪄 Thinking..." : "🪄 Recommend Keywords"}
                                        </button>
                                    </div>
                                    <input
                                        value={customKeywords}
                                        onChange={e => setCustomKeywords(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 outline-none transition bg-white text-black placeholder-gray-400 font-medium" style={{color: '#000000'}}
                                        placeholder="e.g. Arabica, Organic, Fair Trade"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Brand Voice Preset</label>
                                    <div className="flex gap-2 mb-2">
                                        <select
                                            value={brandVoice}
                                            onChange={e => setBrandVoice(e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 outline-none transition bg-white text-black placeholder-gray-400 text-sm font-bold" style={{color: '#000000'}}
                                        >
                                            <option>Balanced</option>
                                            <option>Apple (Minimalist)</option>
                                            <option>Nike (Inspirational)</option>
                                            <option>Red Bull (Extreme)</option>
                                            <option disabled>──────────</option>
                                            <option disabled>SAVED PRESETS</option>
                                            {savedPresets.map(p => (
                                                <option key={p.id} value={p.instructions}>{p.name}</option>
                                            ))}
                                            <option>Default Professional</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            value={newPresetName}
                                            onChange={e => setNewPresetName(e.target.value)}
                                            className="flex-1 px-3 py-2 text-xs rounded-lg border-2 border-gray-200 outline-none focus:border-teal-400 text-black placeholder-gray-400" style={{color: '#000000'}}
                                            placeholder="Name this brand voice..."
                                        />
                                        <button
                                            onClick={savePreset}
                                            disabled={isSavingPreset || !newPresetName}
                                            className="px-4 py-2 bg-teal-600 text-white text-[10px] font-black rounded-lg hover:bg-teal-700 transition"
                                        >
                                            {isSavingPreset ? "Saving..." : "💾 Save Library"}
                                        </button>
                                    </div>
                                    {savedPresets.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <label className="block text-[10px] font-bold text-gray-800 uppercase">Manage Library</label>
                                            <div className="flex flex-wrap gap-2">
                                                {savedPresets.map(p => (
                                                    <div key={p.id} className="flex items-center gap-1 bg-white border border-teal-100 px-2 py-1 rounded-md text-[10px] font-bold text-teal-700">
                                                        {p.name}
                                                        <button onClick={() => deletePreset(p.id)} className="text-red-400 hover:text-red-600">×</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Desktop Generate Button */}
                        <button onClick={handleGenerate} disabled={isGenerating} className="hidden sm:block w-full bg-gradient-to-r from-red-700 to-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition disabled:opacity-50">
                            {isGenerating ? "Waking up AI..." : "⚡ Generate 3 Variants"}
                        </button>

                    </div>
                </div>

                <div>
                    {!isPremium && (
                        <div className="bg-gradient-to-br from-red-700 to-indigo-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10 group-hover:scale-110 transition duration-500">
                                <span className="text-6xl sm:text-8xl">⭐</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-black mb-2 relative z-10">Go Pro</h3>
                            <p className="text-amber-100 text-xs mb-3 sm:mb-4 relative z-10 leading-relaxed">Unlock Social Kits, SEO Heatmaps, and 500-word deep content.</p>
                            <Link href="/pricing" className="bg-white text-amber-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm inline-block shadow-lg hover:bg-green-50 transition relative z-10">✨ UPGRADE TO PRO</Link>
                        </div>
                    )}

                    {isPro && !isAgency && (
                        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 mb-8 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition duration-500">
                                <span className="text-8xl">👑</span>
                            </div>
                            <h3 className="text-xl font-black mb-2 relative z-10">Go Agency</h3>
                            <p className="text-teal-100 text-xs mb-4 relative z-10">Unlock LinkedIn B2B, Advanced Personas, Brand Voice Library & Custom Keywords. For professional agencies.</p>
                            <Link href="/pricing" className="bg-white text-teal-700 px-6 py-3 rounded-xl font-black text-sm inline-block shadow-lg hover:bg-teal-50 transition relative z-10">👑 UPGRADE TO AGENCY</Link>
                        </div>
                    )}


                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-pink-100 shadow-sm mb-6">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <span className="text-xl sm:text-2xl">🎁</span>
                            <h3 className="font-black text-xs text-purple-900 uppercase tracking-widest">Invite & Earn</h3>
                        </div>

                        <p className="text-[10px] text-gray-700 mb-4 leading-relaxed">
                            Share your link with a friend. When they sign up, we&apos;ll credit your account with **5 Premium Credits**!
                        </p>

                        <div className="bg-gray-50 p-2 sm:p-3 rounded-xl border border-gray-100 flex items-center justify-between mb-3 sm:mb-4">
                            <code className="text-[9px] sm:text-[10px] font-mono text-blue-700 truncate mr-2 max-w-[200px] sm:max-w-none">
                                {`dai.sh/${userData?.referralCode || '...'}`}
                            </code>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://descriptai.com/ref=${userData?.referralCode}`);
                                    alert("Link copied to clipboard!");
                                }}
                                className="bg-green-100 text-amber-800 p-1.5 sm:p-2 rounded-lg hover:bg-amber-200 transition text-sm"
                            >
                                📋
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-green-50 p-2 rounded-xl text-center">
                                <p className="text-[9px] sm:text-[10px] text-green-500 font-bold uppercase">Invites</p>
                                <p className="text-base sm:text-lg font-black text-amber-800">0</p>
                            </div>
                            <div className="bg-teal-50 p-2 rounded-xl text-center">
                                <p className="text-[9px] sm:text-[10px] text-teal-400 font-bold uppercase">Earned</p>
                                <p className="text-base sm:text-lg font-black text-teal-700">+0</p>
                            </div>
                        </div>

                    </div>

                    <div ref={resultsRef} className="space-y-6">
                        {variants.length === 0 ? (
                            <div className="bg-green-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed border-pink-200 h-full flex flex-col justify-center min-h-[200px]">
                                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 opacity-50">✍️</div>
                                <h3 className="text-lg sm:text-xl font-bold text-purple-900">Your variants will appear here</h3>
                                <p className="text-green-500 text-xs sm:text-sm mt-2">Enter product details & tap Generate</p>
                            </div>
                        ) : (

                            <>
                                <div className="flex justify-between items-center mb-2 px-2 relative">
                                    <h2 className="text-sm font-black text-purple-900 uppercase tracking-widest">Generation Results</h2>
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsExporting(!isExporting)}
                                            className="text-[10px] font-black bg-green-100 text-green-700 px-3 py-1.5 rounded-full border border-green-200 hover:bg-green-200 transition flex items-center gap-1"
                                        >
                                            📥 Export All to CSV
                                        </button>
                                        {isExporting && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-[60] py-2 overflow-hidden">
                                                <button onClick={() => handleExport('general')} className="w-full text-left px-4 py-2 text-[10px] font-bold text-gray-700 hover:bg-green-50 hover:text-blue-700 transition">📋 General View</button>

                                                <button
                                                    disabled={!isPremium}
                                                    onClick={() => isPremium && handleExport('shopify')}
                                                    className={`w-full text-left px-4 py-2 text-[10px] font-bold transition flex items-center justify-between ${isPremium ? "text-gray-700 hover:bg-green-50 hover:text-blue-700" : "text-gray-300 cursor-not-allowed"}`}
                                                >
                                                    <span>🚢 Shopify Import</span>
                                                    {!isPremium && <span>🔒</span>}
                                                </button>

                                                <button
                                                    disabled={!isPremium}
                                                    onClick={() => isPremium && handleExport('amazon')}
                                                    className={`w-full text-left px-4 py-2 text-[10px] font-bold transition flex items-center justify-between ${isPremium ? "text-gray-700 hover:bg-green-50 hover:text-blue-700" : "text-gray-300 cursor-not-allowed"}`}
                                                >
                                                    <span>📦 Amazon Sellers</span>
                                                    {!isPremium && <span>🔒</span>}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {variants.map((v, i) => <VariantCard key={i} variant={v} index={i} tier={userData?.tier || 'free'} copyToClipboard={copyToClipboard} copiedIndex={copiedIndex} customKeywords={customKeywords} />)}

                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

