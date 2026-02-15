"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState, useEffect, useRef } from "react";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
}

// Typing Animation Component
function TypeWriter({ texts, speed = 100 }: { texts: string[]; speed?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
}

// 3D Tilt Card Component with Spotlight Effect
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setPosition({ x, y });
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
        background: isHovered
          ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(147, 51, 234, 0.2), transparent 40%)`
          : undefined,
      }}
    >
      {/* Glare effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`,
            transform: "translateZ(50px)",
          }}
        />
      )}
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </div>
  );
}

// Floating Particles Background
function ParticlesBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-slate-600/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

// Scroll Animation Hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// ROI Calculator Component
function ROICalculator() {
  const [products, setProducts] = useState(50);
  const [conversionRate, setConversionRate] = useState(2);
  const [avgOrderValue, setAvgOrderValue] = useState(50);

  const currentRevenue = products * conversionRate * avgOrderValue;
  const improvedRevenue = products * (conversionRate * 1.47) * avgOrderValue;
  const additionalRevenue = improvedRevenue - currentRevenue;

  return (
    <TiltCard className="rounded-2xl bg-white/5 border border-white/10 p-8">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">ROI Calculator</h3>
      <p className="text-gray-400 text-sm text-center mb-8">See how much more revenue you could earn with DescriptAI</p>
      
      <div className="space-y-6">
        {/* Products per Month */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Products per Month</span>
            <span className="text-white font-bold">{products}</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            value={products}
            onChange={(e) => setProducts(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>

        {/* Conversion Rate */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Current Conversion Rate</span>
            <span className="text-white font-bold">{conversionRate}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.1"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        {/* Average Order Value */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Average Order Value</span>
            <span className="text-white font-bold">${avgOrderValue}</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={avgOrderValue}
            onChange={(e) => setAvgOrderValue(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-red-600/10 to-amber-500/10 border border-amber-600/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-400 mb-1">Current Revenue</div>
            <div className="text-xl font-bold text-gray-300">${currentRevenue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">With DescriptAI</div>
            <div className="text-xl font-bold text-green-400">${improvedRevenue.toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <div className="text-sm text-gray-400 mb-1">Additional Monthly Revenue</div>
          <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-amber-400">
            +${additionalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">Based on 47% conversion lift</div>
        </div>
      </div>
    </TiltCard>
  );
}

// Interactive Demo Component
function InteractiveDemo() {
  const [productName, setProductName] = useState("");
  const [platform, setPlatform] = useState("amazon");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState("");

  const handleGenerate = () => {
    if (!productName.trim()) return;
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const descriptions: Record<string, string> = {
        amazon: `**Premium Quality ${productName}** - Experience excellence with our top-rated ${productName}. Featuring cutting-edge technology and superior craftsmanship, this product delivers unmatched performance. Perfect for everyday use. **Key Features:** Durable construction, Easy to use, Long-lasting quality. **Customer Favorite:** 4.8/5 stars from 1,000+ reviews. **Limited Time Offer:** Order now and save 20%!`,
        shopify: `Discover the ${productName} that's changing the game. Meticulously designed for those who demand the best, this premium product combines style, functionality, and value. Join thousands of satisfied customers who've made the switch. Free shipping on orders over $50. 30-day money-back guarantee.`,
        etsy: `Handcrafted with love, this ${productName} is a unique piece made just for you. Each item is carefully created in our small studio, ensuring attention to every detail. Perfect as a gift or a treat for yourself. Made with sustainable materials. Ships within 2-3 business days.`,
        ebay: `${productName} - GREAT DEAL! Brand new condition. Fast & FREE shipping. Trusted seller with 99.8% positive feedback. Buy it now before it's gone! 30-day returns accepted. International shipping available.`,
      };
      setGeneratedDescription(descriptions[platform] || descriptions.amazon);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <TiltCard className="rounded-2xl bg-white/5 border border-white/10 p-8">
      <h3 className="text-2xl font-bold text-white mb-2 text-center">Try It Now - Free Demo</h3>
      <p className="text-gray-400 text-sm text-center mb-6">No signup required. See the magic instantly.</p>
      
      <div className="space-y-4">
        {/* Product Name Input */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., Wireless Bluetooth Earbuds"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
          />
        </div>

        {/* Platform Select */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Platform</label>
          <div className="grid grid-cols-4 gap-2">
            {["amazon", "shopify", "etsy", "ebay"].map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                  platform === p
                    ? "bg-gradient-to-r from-red-700 to-red-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !productName.trim()}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-700 to-red-600 text-white font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating...
            </>
          ) : (
            "Generate Description"
          )}
        </button>

        {/* Generated Description */}
        {generatedDescription && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-amber-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-green-400 font-medium">Generated Successfully!</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{generatedDescription}</p>
          </div>
        )}
      </div>
    </TiltCard>
  );
}

export default function Home() {
  const [isIndia, setIsIndia] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect user's country on mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setIsIndia(data.country_code === "IN");
      } catch {
        setIsIndia(false);
      }
    };
    detectCountry();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes border-spin {
          to { --angle: 360deg; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .gradient-border {
          background: conic-gradient(from var(--angle), #1e3a8a, #06b6d4, #06b6d4, #1e3a8a);
          animation: border-spin 3s linear infinite;
        }
        .gradient-text-animate {
          background: linear-gradient(90deg, #1e3a8a, #06b6d4, #06b6d4, #1e3a8a);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 4s ease infinite;
        }
      `}</style>

      {/* Particles Background */}
      <ParticlesBackground />

      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-red-700/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-red-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-red-600/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/5">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold gradient-text-animate">
              DescriptAI
            </div>
            <span className="text-xs bg-gradient-to-r from-red-600 to-amber-500 text-white px-2 py-1 rounded-full font-semibold shadow-lg shadow-yellow-600/20">
              PREMIUM AI ENGINE
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-400 hover:text-white font-medium transition">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white font-medium transition">
              How It Works
            </a>
            <Link href="/pricing" className="text-white font-bold transition">
              Pricing
            </Link>

            <SignedOut>
              <Link href="/sign-in" className="text-gray-400 hover:text-white font-medium transition">
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="bg-gradient-to-r from-red-700 to-red-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition shadow-lg shadow-yellow-600/20 font-semibold"
              >
                Sign Up Free
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/generate"
                className="text-gray-400 hover:text-white font-medium transition mr-4"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }} />
            </SignedIn>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-400 hover:text-white font-medium transition">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white font-medium transition">
                How It Works
              </a>
              <Link href="/pricing" className="text-white font-bold transition">
                Pricing
              </Link>

              <SignedOut>
                <Link href="/sign-in" className="text-gray-400 hover:text-white font-medium transition">
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-gradient-to-r from-red-700 to-red-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition shadow-lg shadow-yellow-600/20 font-semibold text-center"
                >
                  Sign Up Free
                </Link>
              </SignedOut>

              <SignedIn>
                <Link href="/generate" className="text-gray-400 hover:text-white font-medium transition">
                  Dashboard
                </Link>
                <div className="mt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-400">Trusted by 1,000+ e-commerce professionals</span>
          </div>

          {/* Main Headline with Typing Animation */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight glass-text px-6 py-3 rounded-2xl inline-block">
            <span className="text-white">Generate </span>
            <span className="gradient-text-animate">
              <TypeWriter texts={["High-Converting", "SEO-Optimized", "Platform-Specific", "AI-Powered"]} />
            </span>
            <br />
            <span className="text-white">Product Descriptions</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            Transform your e-commerce listings with AI-generated descriptions that convert. 
            <strong className="text-white"> Professional copy that sells. Start for free.</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/generate"
              className="group relative px-10 py-5 rounded-xl text-lg font-bold text-white overflow-hidden"
            >
              <div className="absolute inset-0 gradient-border rounded-xl p-[2px]">
                <div className="absolute inset-[2px] bg-gradient-to-r from-red-700 to-red-600 rounded-xl group-hover:opacity-90 transition"></div>
              </div>
              <span className="relative z-10">Generate Now (Free)</span>
            </Link>
            <a
              href="#how-it-works"
              className="px-10 py-5 rounded-xl text-lg font-bold text-gray-400 border border-white/10 hover:border-white/30 hover:text-white transition"
            >
              See How It Works
            </a>
          </div>

          <p className="text-sm text-gray-500">3 free generations per month. No credit card required.</p>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-lg">+</span>
              <span>Platform-Specific (Amazon/Shopify/Etsy/eBay)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-lg">+</span>
              <span>3 Length Options (Short/Medium/Long)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-lg">+</span>
              <span>Conversion-Optimized Copy</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-lg">+</span>
              <span>99.9% Uptime Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: 2.4, suffix: "M+", label: "Descriptions Generated", color: "text-green-500" },
              { value: 3.2, suffix: "s", label: "Avg Generation Time", color: "text-amber-400" },
              { value: 47, suffix: "%", label: "Conversion Lift", color: "text-amber-400" },
              { value: 1000, suffix: "+", label: "Active Sellers", color: "text-green-500" },
            ].map((stat, index) => (
              <TiltCard key={index} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
                <div className={`text-4xl font-black mb-2 ${stat.color}`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
                <div className="text-xs text-green-400 mt-1 font-semibold">
                  {index === 0 && "+ 12% this week"}
                  {index === 1 && "99.9% uptime"}
                  {index === 2 && "Avg for Pro users"}
                  {index === 3 && "Across 12 platforms"}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              See the Difference
            </h2>
            <p className="text-xl text-gray-400">Real results from real sellers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <TiltCard className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold">BEFORE</span>
                <span className="text-gray-500 text-sm">Generic Description</span>
              </div>
              <h4 className="font-bold text-white mb-3">Premium Wireless Bluetooth Earbuds</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                High quality wireless earbuds with Bluetooth 5.0. Good sound quality. Long battery life. Comfortable fit.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>No SEO keywords</span>
                <span>No emotional hook</span>
                <span>Low conversion</span>
              </div>
            </TiltCard>

            {/* After */}
            <TiltCard className="rounded-2xl bg-gradient-to-b from-red-600/10 to-amber-500/10 border border-amber-600/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">AFTER</span>
                <span className="text-green-500 text-sm">DescriptAI Generated</span>
              </div>
              <h4 className="font-bold text-white mb-3">Premium Wireless Bluetooth Earbuds</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Experience crystal-clear sound with our Premium Wireless Earbuds. Featuring Bluetooth 5.0 technology, 40-hour battery life, and ergonomic design for all-day comfort. Perfect for music lovers and professionals alike.
              </p>
              <div className="flex items-center space-x-4 text-xs text-green-400">
                <span>12 SEO keywords</span>
                <span>Emotional hook</span>
                <span>High conversion</span>
              </div>
            </TiltCard>
          </div>

          {/* Results */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
            {[
              { value: 425, suffix: "%", label: "Conversion Increase" },
              { value: 12, suffix: "", label: "SEO Keywords Added" },
              { value: 3, suffix: "hrs", label: "Time Saved Per Product" },
            ].map((result, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  <AnimatedCounter end={result.value} suffix={result.suffix} />
                </div>
                <div className="text-sm text-gray-400">{result.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo & ROI Calculator Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Experience the Power
            </h2>
            <p className="text-xl text-gray-400">Try it now and calculate your potential earnings</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <InteractiveDemo />
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The fastest, easiest, and most powerful way to create product descriptions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: "1", title: "Platform-Specific Magic", desc: "Amazon SEO bullets, Shopify brand stories, Etsy handmade charm, eBay deal focus. Each platform gets optimized copy that converts.", bgClass: "bg-purple-500/20", textClass: "text-purple-400" },
              { icon: "2", title: "Sales Machine Copy", desc: "Not just descriptions - SALES MACHINES. Uses AIDA, PAS, FOMO, social proof. 3 variants: Emotional, Technical, Urgent.", bgClass: "bg-pink-500/20", textClass: "text-pink-400" },
              { icon: "3", title: "3 Perfect Lengths", desc: "Short (80 words) for mobile, Medium (150 words) for SEO balance, Long (300 words) for high-ticket storytelling.", bgClass: "bg-blue-500/20", textClass: "text-blue-400" },
              { icon: "4", title: "Lightning Fast", desc: "Generate descriptions in 3-5 seconds. 99.9% uptime guarantee. Never wait, never fail. Always ready when you are.", bgClass: "bg-green-500/20", textClass: "text-green-400" },
              { icon: "5", title: "Social Media Kit", desc: "One product = 3 social posts. Auto-generate Instagram captions, Twitter hooks, and Facebook ads. Pro feature.", bgClass: "bg-orange-500/20", textClass: "text-orange-400" },
              { icon: "6", title: "SEO Heatmap", desc: "Visual keyword optimization. See your SEO score in real-time. Highlight power words that trigger conversions.", bgClass: "bg-cyan-500/20", textClass: "text-cyan-400" },
              { icon: "7", title: "Referral Rewards", desc: "Invite friends and earn 5 premium credits for each signup. Accumulate credits to unlock Pro features for free.", bgClass: "bg-yellow-500/20", textClass: "text-yellow-400" },
              { icon: "8", title: "One-Click Exports", desc: "Export to Shopify, Amazon, or general CSV. Platform-optimized formatting. Upload and sell immediately.", bgClass: "bg-indigo-500/20", textClass: "text-indigo-400" },
              { icon: "9", title: "Personalized Intelligence", desc: "Our AI learns from your most successful descriptions, identifying patterns and keywords that lead to higher conversions.", bgClass: "bg-rose-500/20", textClass: "text-rose-400" },
            ].map((feature, index) => (
              <div 
                key={index}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-white/30 transition-all duration-300 cursor-pointer hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95 active:bg-white/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              >
                <TiltCard className="bg-transparent">
                  <div className={`w-10 h-10 rounded-lg ${feature.bgClass} flex items-center justify-center mb-4`}>
                    <span className={`font-bold ${feature.textClass}`}>{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">3 Simple Steps to Perfect Descriptions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Choose Your Platform & Length", desc: "Select Amazon, Shopify, Etsy, or eBay. Pick Short (80 words), Medium (150), or Long (300). Set your conversion goal.", iconColor: "from-green-600 to-green-500", shadowColor: "shadow-green-500" },
              { step: "2", title: "AI Writes 3 Sales Machines", desc: "Our Elite AI Engine creates Emotional, Technical, and Urgent variants using conversion psychology. 3-5 seconds.", iconColor: "from-blue-600 to-blue-500", shadowColor: "shadow-blue-500" },
              { step: "3", title: "Export & Sell Like Crazy", desc: "Copy, export to your platform, or generate social media kit. Watch conversions skyrocket!", iconColor: "from-yellow-500 to-amber-500", shadowColor: "shadow-yellow-500" },
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-red-600/50 to-transparent z-0" style={{ width: 'calc(100% - 3rem)' }}></div>
                )}
                <TiltCard className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center relative z-10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.iconColor} flex items-center justify-center mx-auto mb-6 text-2xl font-black text-white shadow-lg ${item.shadowColor}/30`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400">Start free, scale as you grow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Tier */}
            <TiltCard className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Free</h3>
              <p className="text-gray-400 text-sm mb-4">Perfect for testing</p>
              <div className="text-3xl font-black text-white mb-4">$0<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="space-y-2 text-sm text-gray-400 mb-6">
                <li className="flex items-center gap-2"><span className="text-green-400">+</span> 5 generations/month</li>
                <li className="flex items-center gap-2"><span className="text-green-400">+</span> Basic platforms</li>
                <li className="flex items-center gap-2"><span className="text-gray-500">-</span> No social media kit</li>
              </ul>
              <Link href="/sign-up" className="block w-full py-3 rounded-xl border border-white/20 text-white font-bold text-center hover:bg-white/5 transition">
                Start Free
              </Link>
            </TiltCard>

            {/* Pro Tier */}
            <div className="relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <span className="bg-gradient-to-r from-red-700 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-yellow-600/30">
                  MOST POPULAR
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700/20 via-pink-500/20 to-red-700/20 rounded-2xl blur-xl"></div>
              <TiltCard className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border-2 border-amber-600/50 p-6 shadow-2xl shadow-yellow-600/20">
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <p className="text-gray-400 text-sm mb-4">For serious sellers</p>
                <div className="text-3xl font-black text-white mb-4">
                  {isIndia ? "1,599" : "$19"}<span className="text-lg text-gray-500">/mo</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  <li className="flex items-center gap-2"><span className="text-green-400">+</span> 100 generations/month</li>
                  <li className="flex items-center gap-2"><span className="text-green-400">+</span> All platforms</li>
                  <li className="flex items-center gap-2"><span className="text-green-400">+</span> Social media kit</li>
                  <li className="flex items-center gap-2"><span className="text-green-400">+</span> SEO heatmap</li>
                </ul>
                <Link href="/pricing" className="block w-full py-3 rounded-xl bg-gradient-to-r from-red-700 to-red-600 text-white font-bold text-center hover:opacity-90 transition shadow-lg shadow-yellow-600/30">
                  Upgrade to Pro
                </Link>
              </TiltCard>
            </div>

            {/* Agency Tier */}
            <TiltCard className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Agency</h3>
              <p className="text-gray-400 text-sm mb-4">For teams & agencies</p>
              <div className="text-3xl font-black text-white mb-4">
                {isIndia ? "3,999" : "$49"}<span className="text-lg text-gray-500">/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-400 mb-6">
                <li className="flex items-center gap-2"><span className="text-green-400">+</span> Unlimited generations</li>
                <li className="flex items-center gap-2"><span className="text-green-400">+</span> Team collaboration</li>
                <li className="flex items-center gap-2"><span className="text-green-400">+</span> White-label</li>
              </ul>
              <Link href="/pricing" className="block w-full py-3 rounded-xl border border-white/20 text-white font-bold text-center hover:bg-white/5 transition">
                Go Agency
              </Link>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { value: "4.9/5", label: "Trustpilot" },
              { value: "#1", label: "Product Hunt" },
              { value: "50K+", label: "Chrome Users" },
              { value: "99.9%", label: "Uptime" },
            ].map((badge, index) => (
              <div key={index} className="p-4">
                <div className="text-2xl font-bold text-gray-300">{badge.value}</div>
                <div className="text-xs text-gray-500">{badge.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { value: "256-bit", label: "SSL Encryption" },
              { value: "30-Day", label: "Money Back" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "Support" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="text-sm font-bold text-white">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Ready to Transform Your Product Descriptions?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join 1,000+ e-commerce professionals using DescriptAI to boost their sales.
            </p>
            <Link
              href="/generate"
              className="inline-block px-10 py-5 rounded-xl bg-gradient-to-r from-red-700 via-pink-500 to-red-700 text-white text-lg font-bold hover:opacity-90 transition shadow-2xl shadow-yellow-600/30"
            >
              Start Generating Now - It's Free!
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/5 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="text-xl font-bold gradient-text-animate mb-4">
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

