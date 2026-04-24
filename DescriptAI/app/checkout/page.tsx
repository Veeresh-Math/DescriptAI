'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PRICING } from '@/lib/payments';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const plan = (searchParams.get('plan') || 'pro') as 'pro' | 'agency';
  const billing = (searchParams.get('billing') || 'monthly') as 'monthly' | 'annual';

  const priceData = PRICING[plan];
  const isAnnual = billing === 'annual';
  const amount = isAnnual
    ? Math.round(priceData.inr * 12 * 0.8)
    : priceData.inr;
  const originalAmount = isAnnual ? priceData.inr * 12 : priceData.inr;
  const savings = isAnnual ? originalAmount - amount : 0;

  // Load Razorpay script on mount
  useEffect(() => {
    if (document.getElementById('razorpay-script')) {
      setRazorpayLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => setError('Failed to load payment gateway');
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Create order on the server
      const response = await fetch('/api/checkout/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: plan,
          billingCycle: billing,
          isIndia: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || 'Failed to create order');
        setLoading(false);
        return;
      }

      if (!data.success || !data.orderId) {
        setError('Invalid response from server');
        setLoading(false);
        return;
      }

      // Initialize Razorpay checkout
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'DescriptAI',
        description: `${data.planName} Plan - ${isAnnual ? 'Annual' : 'Monthly'}`,
        order_id: data.orderId,
        handler: async function (response: any) {
          // Payment successful - verify on server
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                tier: plan,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // Redirect to success page
              window.location.href = `/payment/success?plan=${plan}&payment=${response.razorpay_payment_id}`;
            } else {
              setError(verifyData.message || 'Payment verification failed. Contact support if you were charged.');
              setLoading(false);
            }
          } catch (err) {
            console.error('Verification error:', err);
            // Even if verification fails, webhook will catch it
            window.location.href = `/payment/success?plan=${plan}&payment=${response.razorpay_payment_id}&verified=false`;
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#7c3aed',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // @ts-ignore - Razorpay loaded from external script
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Logo & Back */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-2xl font-bold">
            ⚡ DescriptAI
          </Link>
          <Link href="/pricing" className="text-gray-400 hover:text-white text-sm">
            ← Back to Pricing
          </Link>
        </div>

        {/* Checkout Card */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-2">Complete Your Upgrade</h1>
          <p className="text-gray-400 mb-6">
            You are upgrading to the <span className="text-white font-semibold">{priceData.name}</span> plan
          </p>

          {/* Plan Summary */}
          <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300">Plan</span>
              <span className="font-semibold">{priceData.name}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300">Billing</span>
              <span className="font-semibold">{isAnnual ? 'Annual (Save 20%)' : 'Monthly'}</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex items-center justify-between">
              <span className="text-gray-300">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold">₹{amount.toLocaleString('en-IN')}</span>
                {isAnnual && (
                  <div className="text-sm text-green-400">Save ₹{savings.toLocaleString('en-IN')}/yr</div>
                )}
              </div>
            </div>
            {isAnnual && (
              <div className="text-xs text-gray-500 mt-1 text-right">
                ₹{Math.round(amount / 12).toLocaleString('en-IN')}/mo billed annually
              </div>
            )}
          </div>

          {/* Features Included */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">What you get</h3>
            <ul className="space-y-2">
              {priceData.features.slice(0, 5).map((feature, i) => (
                <li key={i} className="flex items-start text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span>
                  {feature}
                </li>
              ))}
              {priceData.features.length > 5 && (
                <li className="text-sm text-gray-500 pl-5">
                  + {priceData.features.length - 5} more features
                </li>
              )}
            </ul>
          </div>

          {/* Security Badges */}
          <div className="flex items-center justify-center gap-4 mb-6 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span>🔒</span> SSL Secure
            </span>
            <span className="flex items-center gap-1">
              <span>✓</span> Verified by Razorpay
            </span>
            <span className="flex items-center gap-1">
              <span>↩️</span> 30-Day Refund
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-4 text-sm text-red-200">
              {error}
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading || !razorpayLoaded}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              plan === 'agency'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400'
            } text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                Processing...
              </span>
            ) : !razorpayLoaded ? (
              'Loading Payment Gateway...'
            ) : (
              `Pay ₹${amount.toLocaleString('en-IN')} Securely`
            )}
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            By completing this payment, you agree to our{' '}
            <Link href="/terms" className="text-cyan-400 hover:underline">Terms</Link> and{' '}
            <Link href="/refund" className="text-cyan-400 hover:underline">Refund Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-gray-400">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

