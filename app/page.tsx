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
