'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PRICING } from '@/lib/payments';

function SuccessContent() {
  const searchParams = useSearchParams();
  const plan = (searchParams.get('plan') || 'pro') as 'pro' | 'agency';
  const paymentId = searchParams.get('payment') || '';
  const verified = searchParams.get('verified') !== 'false';

  const priceData = PRICING[plan];
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/generate';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <span className="text-5xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-400">
            Welcome to the <span className="text-white font-semibold">{priceData.name}</span> plan
          </p>
        </div>

        {/* Plan Details */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6 text-left">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <span className="text-gray-300">Plan</span>
            <span className="font-semibold">{priceData.name}</span>
          </div>
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
            <span className="text-gray-300">Status</span>
            <span className="text-green-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Active
            </span>
          </div>
          {paymentId && (
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Payment ID</span>
              <span className="text-xs text-gray-500 font-mono">{paymentId.slice(-12)}</span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6 text-left">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
            Your new powers
          </h3>
          <ul className="space-y-2">
            {priceData.features.slice(0, 4).map((feature, i) => (
              <li key={i} className="flex items-start text-sm text-gray-300">
                <span className="text-green-400 mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {!verified && (
          <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mb-6 text-sm text-yellow-200">
            ⚠️ Your payment is being processed. Your account will be upgraded within a few minutes.
          </div>
        )}

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link
            href="/generate"
            className={`block w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              plan === 'agency'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400'
            } text-white shadow-lg`}
          >
            Go to Dashboard →
          </Link>
          <p className="text-sm text-gray-500">
            Redirecting in {countdown} seconds...
          </p>
        </div>

        {/* Support */}
        <p className="text-xs text-gray-600 mt-6">
          Questions? Contact{' '}
          <a href="mailto:support@descriptai.com" className="text-cyan-400 hover:underline">
            support@descriptai.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="text-gray-400">Confirming your upgrade...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

