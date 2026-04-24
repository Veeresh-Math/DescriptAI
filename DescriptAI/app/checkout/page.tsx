'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const plan = searchParams.get('plan') || 'pro';
  const billing = searchParams.get('billing') || 'monthly';

  useEffect(() => {
    const processCheckout = async () => {
      if (!plan) return;

      setLoading(true);
      setMessage(`Processing ${plan} plan with ${billing} billing...`);

      try {
        const response = await fetch('/api/checkout/razorpay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tier: plan,
            billingCycle: billing || 'monthly',
            isIndia: true,
          }),
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (data.success && data.orderId) {
          setMessage('Order created successfully! Loading Razorpay...');
          loadRazorpay(data);
        } else {
          setMessage('Error: ' + (data.error || 'Failed to create order'));
          setLoading(false);
        }
      } catch (error) {
        console.error('Checkout error:', error);
        setMessage('Error: ' + (error as Error).message);
        setLoading(false);
      }
    };

    processCheckout();
  }, [plan, billing]);

  const loadRazorpay = (data: any) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      try {
        // @ts-ignore - Razorpay is loaded from external script
        const rzp = new window.Razorpay({
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: 'DescriptAI',
          description: `${data.planName} Plan`,
          order_id: data.orderId,
          handler: function(response: any) {
            console.log('Payment successful:', response);
            setMessage('Payment successful! Redirecting to dashboard...');
            setTimeout(() => {
              window.location.href = '/generate';
            }, 2000);
          },
          prefill: {
            name: '',
            email: '',
            contact: '',
          },
          theme: {
            color: '#7c3aed',
          },
        });
        rzp.open();
        setLoading(false);
      } catch (error) {
        console.error('Razorpay error:', error);
        setMessage('Error loading Razorpay: ' + (error as Error).message);
        setLoading(false);
      }
    };
    script.onerror = () => {
      setMessage('Error loading Razorpay script');
      setLoading(false);
    };
    document.body.appendChild(script);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
        
        <div className="mb-6 text-center">
          <div className="text-xl mb-2">
            {plan ? (plan.charAt(0).toUpperCase() + plan.slice(1)) : 'Loading...'} Plan
          </div>
          <div className="text-sm text-gray-400">
            {billing ? (billing.charAt(0).toUpperCase() + billing.slice(1)) : 'monthly'} Billing
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-4 ${message.includes('Error') ? 'bg-red-900/50 border border-red-500' : 'bg-blue-900/50 border border-blue-500'}`}>
            {message}
          </div>
        )}

        {loading && (
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        )}

        {!loading && message && message.includes('Error') && (
          <div className="flex justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
