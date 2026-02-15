// Payment Gateway Configuration
// Razorpay works worldwide (India + International), Stripe for US/EU

export type PaymentGateway = 'razorpay' | 'stripe';

export interface PaymentConfig {
  gateway: PaymentGateway;
  country: string;
  currency: string;
  amount: number;
}

// Detect user's country and return appropriate gateway
// Razorpay supports international payments too!
export function detectPaymentGateway(countryCode?: string): PaymentConfig {
  const india = ['IN', 'IND', 'India'];
  const isIndia = countryCode && india.includes(countryCode);

  if (isIndia) {
    return {
      gateway: 'razorpay',
      country: 'India',
      currency: 'INR',
      amount: 0 // Will be set dynamically
    };
  }

  // For international, we can use Razorpay too (they support worldwide)
  // But Stripe is more established in US/EU
  return {
    gateway: 'stripe',
    country: countryCode || 'US',
    currency: 'USD',
    amount: 0
  };
}

// Pricing in different currencies
export const PRICING = {
  free: {
    usd: 0,
    inr: 0,
    name: 'Free',
    features: ['3 generations/month', 'Basic descriptions', 'Amazon/Shopify only']
  },
  pro: {
    usd: 19,
    inr: 1599, // ~$19 in INR
    name: 'Pro',
    features: ['Unlimited generations', 'Social Media Kit', 'SEO Heatmap', 'All platforms']
  },
  agency: {
    usd: 49,
    inr: 3999, // ~$49 in INR
    name: 'Agency',
    features: ['Everything in Pro', 'LinkedIn B2B', 'Brand Voice Library', 'Custom Keywords', 'White-label']
  }
};

