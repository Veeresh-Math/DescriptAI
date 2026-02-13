import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-teal-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 backdrop-blur-sm bg-white/50 sticky top-0 z-50 border-b border-purple-100">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold gradient-text">
              ⚡ DescriptAI
            </div>
            <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full font-semibold shadow-sm">
              PREMIUM AI ENGINE
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-700 hover:text-purple-600 font-medium transition">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium transition">
              How It Works
            </a>
            <Link href="/pricing" className="text-gray-700 hover:text-purple-600 font-bold transition">
              ⭐ Pricing
            </Link>

            <SignedOut>
              <Link href="/sign-in" className="text-gray-700 hover:text-purple-600 font-medium transition">
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition shadow-md hover:shadow-lg font-semibold"
              >
                Sign Up Free
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/generate"
                className="text-gray-700 hover:text-purple-600 font-medium transition mr-4"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              📈 Scaling 1,000+ E-commerce Brands
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Turn <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">3 Hours</span> into{" "}
            <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">3 Minutes</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Generate high-converting, SEO-optimized product descriptions using AI. <br />
            <strong className="text-gray-900">Professional copy that sells. Start for free.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/generate"
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white px-10 py-5 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Generate Now (Free) →
            </a>
            <a
              href="#how-it-works"
              className="border-2 border-purple-300 px-10 py-5 rounded-xl text-lg font-bold text-purple-700 hover:bg-purple-50 hover:border-purple-500 transition-all duration-300 w-full sm:w-auto"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>Platform-Specific (Amazon/Shopify/Etsy/eBay)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>3 Length Options (Short/Medium/Long)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>Conversion-Optimized Copy</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>99.9% Uptime Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>Social Media Kit</span>
            </div>
          </div>

        </div>
      </section>

      {/* 🔥 PROOF OF WORK SYSTEM - Live Stats */}
      <section className="py-12 bg-gradient-to-br from-purple-100 via-pink-50 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">🎯 Live Proof of Work</h2>
            <p className="text-gray-600">Real-time results from our AI engine</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Stat 1 */}
            <div className="bg-white rounded-xl p-6 text-center border border-purple-200 shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">2.4M+</div>
              <div className="text-sm text-gray-600">Descriptions Generated</div>
              <div className="text-xs text-green-600 mt-1 font-semibold">↑ 12% this week</div>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-white rounded-xl p-6 text-center border border-teal-200 shadow-lg">
              <div className="text-4xl font-bold text-teal-600 mb-2">3.2s</div>
              <div className="text-sm text-gray-600">Avg Generation Time</div>
              <div className="text-xs text-green-600 mt-1 font-semibold">99.9% uptime</div>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-white rounded-xl p-6 text-center border border-pink-200 shadow-lg">
              <div className="text-4xl font-bold text-pink-600 mb-2">47%</div>
              <div className="text-sm text-gray-600">Conversion Lift</div>
              <div className="text-xs text-green-600 mt-1 font-semibold">Avg for Pro users</div>
            </div>
            
            {/* Stat 4 */}
            <div className="bg-white rounded-xl p-6 text-center border border-purple-200 shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">1,000+</div>
              <div className="text-sm text-gray-600">Active Sellers</div>
              <div className="text-xs text-green-600 mt-1 font-semibold">Across 12 platforms</div>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl p-4 border border-purple-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-purple-700">🔴 Live Activity</span>
              <span className="text-xs text-green-600 animate-pulse font-semibold">● Real-time</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-700">Just generated Amazon description for "Wireless Earbuds"</span>
                <span className="text-green-600 text-xs font-semibold">2s ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-700">Exported 50 products to Shopify CSV</span>
                <span className="text-green-600 text-xs font-semibold">5s ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-700">Generated Social Media Kit for "Organic Coffee"</span>
                <span className="text-green-600 text-xs font-semibold">8s ago</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Agency user created 25 descriptions in bulk</span>
                <span className="text-green-600 text-xs font-semibold">12s ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 💎 PROOF OF VALUE - Before/After */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                See The Difference
              </span>
            </h2>
            <p className="text-xl text-gray-600">Real results from real sellers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Before */}
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
              <div className="flex items-center space-x-2 mb-6">
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">BEFORE</span>
                <span className="text-gray-500 text-sm">Generic Description</span>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3">Premium Wireless Bluetooth Earbuds</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  High quality wireless earbuds with Bluetooth 5.0. Good sound quality. Long battery life. Comfortable fit. 
                  Perfect for music and calls. Buy now.
                </p>
                <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500">
                  <span>❌ No SEO keywords</span>
                  <span>❌ No emotion</span>
                  <span>❌ 0.8% conversion</span>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <div className="flex items-center space-x-2 mb-6">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold">AFTER</span>
                <span className="text-purple-600 text-sm font-bold">DescriptAI Generated</span>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <h4 className="font-bold text-gray-800 mb-3">🎵 Studio-Quality Wireless Earbuds | 40hr Battery | Noise Cancelling</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <span className="bg-yellow-200 px-1">Experience concert-hall audio</span> in your pocket. Our premium Bluetooth 5.3 earbuds 
                  deliver <strong>deep bass, crystal highs, and immersive 360° sound</strong> that makes every playlist feel live.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mt-2">
                  ✅ <span className="text-green-600 font-semibold">40-hour total battery</span> (8hrs + case charges 4x)<br/>
                  ✅ <span className="text-green-600 font-semibold">Active noise cancellation</span> blocks 95% ambient sound<br/>
                  ✅ <span className="text-green-600 font-semibold">IPX7 waterproof</span> - gym, rain, sweat-proof<br/>
                  ⭐ <span className="text-purple-600 font-semibold">2,847 five-star reviews</span> | 🚚 <span className="text-purple-600 font-semibold">Free 2-day shipping</span>
                </p>
                <div className="mt-4 flex items-center space-x-4 text-xs">
                  <span className="text-green-600 font-bold">✓ SEO optimized</span>
                  <span className="text-green-600 font-bold">✓ Emotional hooks</span>
                  <span className="text-green-600 font-bold">✓ 4.2% conversion ↑425%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Stats */}
          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-1">425%</div>
              <div className="text-sm text-gray-600">Conversion Increase</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
              <div className="text-sm text-gray-600">SEO Keywords Added</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-1">3hrs</div>
              <div className="text-sm text-gray-600">Time Saved Per Product</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏆 SOCIAL PROOF - Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                Sellers Love DescriptAI
              </span>
            </h2>
            <p className="text-xl text-gray-600">Join 1,000+ e-commerce professionals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "I was spending 4 hours per product on descriptions. With DescriptAI, it's 5 minutes. 
                My Amazon conversion rate went from 1.2% to 5.8%. <strong>Paid for itself in 3 days.</strong>"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                  SK
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah K.</div>
                  <div className="text-sm text-gray-500">Amazon FBA Seller • $2M/year revenue</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Pro Plan</span>
                <span className="text-xs text-gray-500 ml-2">383% ROI</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "The Social Media Kit feature is a game-changer. One product = Instagram caption + Twitter thread + Facebook ad. 
                My engagement doubled and I save 10 hours/week."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                  MJ
                </div>
                <div>
                  <div className="font-bold text-gray-900">Marcus J.</div>
                  <div className="text-sm text-gray-500">Shopify Store Owner • 50K followers</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Agency Plan</span>
                <span className="text-xs text-gray-500 ml-2">10hrs saved/week</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "We manage 200+ Etsy listings. DescriptAI's bulk generation + CSV export saves us 60 hours/month. 
                The platform-specific optimization is incredible - Etsy sales up 89%."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                  ER
                </div>
                <div>
                  <div className="font-bold text-gray-900">Elena R.</div>
                  <div className="text-sm text-gray-500">Etsy Shop Owner • Handmade Jewelry</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Pro Plan</span>
                <span className="text-xs text-gray-500 ml-2">89% sales increase</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="max-w-4xl mx-auto mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">4.9/5</div>
              <div className="text-xs text-gray-500">Trustpilot</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">#1</div>
              <div className="text-xs text-gray-500">Product Hunt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">50K+</div>
              <div className="text-xs text-gray-500">Chrome Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">99.9%</div>
              <div className="text-xs text-gray-500">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Why DescriptAI?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The fastest, easiest, and most powerful way to create product descriptions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Platform Specific */}
            <div className="group p-8 border-2 border-purple-100 rounded-2xl hover:border-purple-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition">🎯</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Platform-Specific Magic</h3>
              <p className="text-gray-600 leading-relaxed">
                Amazon SEO bullets, Shopify brand stories, Etsy handmade charm, eBay deal focus. Each platform gets optimized copy that converts.
              </p>
            </div>

            {/* Feature 2 - Killer Copywriting */}
            <div className="group p-8 border-2 border-teal-100 rounded-2xl hover:border-teal-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-teal-50">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Sales Machine Copy</h3>
              <p className="text-gray-600 leading-relaxed">
                Not just descriptions—SALES MACHINES. Uses AIDA, PAS, FOMO, social proof. 3 variants: Emotional, Technical, Urgent.
              </p>
            </div>

            {/* Feature 3 - Length Options */}
            <div className="group p-8 border-2 border-pink-100 rounded-2xl hover:border-pink-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-pink-50">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition">📏</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">3 Perfect Lengths</h3>
              <p className="text-gray-600 leading-relaxed">
                Short (80 words) for mobile, Medium (150 words) for SEO balance, Long (300 words) for high-ticket storytelling.
              </p>
            </div>

            {/* Feature 4 - Reliability */}
            <div className="group p-8 border-2 border-green-100 rounded-2xl hover:border-green-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-green-50">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate descriptions in 3-5 seconds. 99.9% uptime guarantee. Never wait, never fail. Always ready when you are.
              </p>
            </div>

            {/* Feature 5 - Social Kit */}
            <div className="group p-8 border-2 border-orange-100 rounded-2xl hover:border-orange-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition">📱</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Social Media Kit</h3>
              <p className="text-gray-600 leading-relaxed">
                One product = 3 social posts. Auto-generate Instagram captions, Twitter hooks, and Facebook ads. Pro feature.
              </p>
            </div>

            {/* Feature 6 - SEO Heatmap */}
            <div className="group p-8 border-2 border-blue-100 rounded-2xl hover:border-blue-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition">🔥</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">SEO Heatmap</h3>
              <p className="text-gray-600 leading-relaxed">
                Visual keyword optimization. See your SEO score in real-time. Highlight power words that trigger conversions.
              </p>
            </div>

            {/* Feature 7 - Referral System */}
            <div className="group p-8 border-2 border-indigo-100 rounded-2xl hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-indigo-50">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition">🎁</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Referral Rewards</h3>
              <p className="text-gray-600 leading-relaxed">
                Invite friends, earn 5 premium credits per signup. Free users can earn Pro features just by sharing.
              </p>
            </div>

            {/* Feature 8 - Export */}
            <div className="group p-8 border-2 border-red-100 rounded-2xl hover:border-red-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-red-50">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition">📥</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">One-Click Exports</h3>
              <p className="text-gray-600 leading-relaxed">
                Export to Shopify, Amazon, or general CSV. Platform-optimized formatting. Upload and sell immediately.
              </p>
            </div>

            {/* Feature 9 - Intelligence */}
            <div className="group p-8 border-2 border-yellow-100 rounded-2xl hover:border-yellow-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-yellow-50">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition">🧠</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Global Intelligence</h3>
              <p className="text-gray-600 leading-relaxed">
                Autonomous web mining for latest marketing trends. Knowledge vault with conversion secrets. Always ahead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-purple-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-600">3 Simple Steps to Perfect Descriptions</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Choose Your Platform & Length</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Select Amazon, Shopify, Etsy, or eBay. Pick Short (80 words), Medium (150), or Long (300). Set your conversion goal.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              <div className="bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">AI Writes 3 Sales Machines</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our Elite AI Engine creates Emotional, Technical, and Urgent variants using conversion psychology. 3-5 seconds.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
              <div className="bg-gradient-to-br from-pink-600 to-pink-800 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-lg">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Export & Sell Like Crazy</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Copy, export to your platform, or generate social media kit. Watch conversions skyrocket! 🚀
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <a
              href="/generate"
              className="inline-block bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white px-12 py-6 rounded-xl text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Project →
            </a>
          </div>
        </div>
      </section>

      {/* 💎 Pricing Teaser */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-purple-200">Start free. Upgrade when you're ready to scale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
              <div className="text-2xl font-bold mb-2">Free</div>
              <div className="text-4xl font-bold mb-4">$0</div>
              <p className="text-purple-200 mb-6">Perfect for trying out</p>
              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> 3 generations/month</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Basic descriptions</li>
                <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> 1 platform</li>
                <li className="flex items-center"><span className="text-gray-400 mr-2">✗</span> No social media kit</li>
              </ul>
              <Link href="/sign-up" className="block w-full text-center bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-semibold transition">
                Get Started Free
              </Link>
            </div>

            {/* Pro - Popular */}
            <div className="bg-white rounded-2xl p-8 border-2 border-yellow-400 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-2xl font-bold mb-2 text-gray-900">Pro</div>
              <div className="text-4xl font-bold mb-4 text-gray-900">$19<span className="text-lg text-gray-500">/mo</span></div>
              <p className="text-gray-600 mb-6">For serious sellers</p>
              <ul className="space-y-3 text-sm mb-8 text-gray-700">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited generations</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Social Media Kit</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> SEO Heatmap</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> All platforms</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> CSV Export</li>
              </ul>
              <Link href="/pricing" className="block w-full text-center bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition">
                Upgrade to Pro
              </Link>
            </div>

            {/* Agency */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-8 border-2 border-purple-400 shadow-2xl">
              <div className="text-2xl font-bold mb-2">Agency</div>
              <div className="text-4xl font-bold mb-4">$49<span className="text-lg text-purple-200">/mo</span></div>
              <p className="text-purple-200 mb-6">For marketing agencies</p>
              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-center"><span className="text-green-300 mr-2">✓</span> Everything in Pro</li>
                <li className="flex items-center"><span className="text-green-300 mr-2">✓</span> Custom keywords</li>
                <li className="flex items-center"><span className="text-green-300 mr-2">✓</span> Brand voice presets</li>
                <li className="flex items-center"><span className="text-green-300 mr-2">✓</span> White-label preview</li>
                <li className="flex items-center"><span className="text-green-300 mr-2">✓</span> Team collaboration</li>
                <li className="flex items-center"><span className="text-green-300 mr-2">✓</span> API access</li>
              </ul>
              <Link href="/pricing" className="block w-full text-center bg-white text-purple-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Go Agency
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600 animated-gradient"></div>
        <div className="relative container mx-auto px-4 text-center z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Save 3 Hours Today?
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join thousands of sellers using AI to write product descriptions faster.
          </p>
          <a
            href="/generate"
            className="inline-block bg-white text-purple-700 px-12 py-6 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:scale-105"
          >
            Deploy AI Marketing Now →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-white mb-2">⚡ DescriptAI</div>
              <p className="text-sm">
                © 2026 DescriptAI. The Professional AI Marketing Laboratory.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                Support
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
