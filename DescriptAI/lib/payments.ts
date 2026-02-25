// Payment Gateway Configuration
// Razorpay works for India AND International payments

export type PaymentGateway = 'razorpay';

export interface PaymentConfig {
  gateway: PaymentGateway;
  country: string;
  currency: string;
  amount: number;
}

// Use Razorpay for ALL countries (India + International)
export function detectPaymentGateway(countryCode?: string): PaymentConfig {
  return {
    gateway: 'razorpay',
    country: countryCode || 'IN', // Default to India
    currency: 'INR', // Use INR for all
    amount: 0
  };
}

// Pricing in INR + USD (Razorpay for India + International)
export const PRICING = {
  free: {
    usd: 0,
    inr: 0,
    name: 'Free',
    features: ['5 generations/month', 'Basic descriptions', 'Amazon/Shopify only']
  },
  pro: {
    usd: 19, // $19/month
    inr: 499, // ₹499/month
    name: 'Pro',
    features: ['100 generations/month', 'Social Media Kit', 'SEO Heatmap', 'All platforms']
  },
  agency: {
    usd: 49, // $49/month
    inr: 1499, // ₹1,499/month
    name: 'Agency',
    features: ['Unlimited generations', 'Everything in Pro', 'LinkedIn B2B', 'Brand Voice Library', 'White-label', 'Team (50 seats)']
  }
};

