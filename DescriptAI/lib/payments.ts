// Payment Gateway Configuration
// Razorpay for India, Stripe for International

export type PaymentGateway = 'razorpay' | 'stripe';

export interface PaymentConfig {
  gateway: PaymentGateway;
}

const INDIAN_COUNTRY_CODES = ['IN', 'IND', 'India', 'INDIA'];

// Detect payment gateway based on country
// Defaults to Stripe for safety; pass country='IN' for Razorpay
export function detectPaymentGateway(country?: string): PaymentConfig {
  if (country && INDIAN_COUNTRY_CODES.includes(country)) {
    return { gateway: 'razorpay' };
  }
  return { gateway: 'stripe' };
}

// Pricing in INR + USD - Updated to match Pricing Page UI
export const PRICING = {
  free: {
    usd: 0,
    inr: 0,
    name: 'Free',
    features: ['5 generations/month', 'Basic descriptions', 'Amazon/Shopify only']
  },
  pro: {
    usd: 19, // $19/month
    inr: 1599, // ₹1,599/month (updated to match UI)
    name: 'Pro',
    features: [
      '100 generations/month',
      'Bulk Generation (50 descriptions)',
      'All Languages (25+)',
      'All 4 Platforms (Amazon/Shopify/Etsy/eBay)',
      'All 3 Lengths (Short/Medium/Long)',
      'Full Social Media Kit',
      'Advanced SEO Heatmap',
      'Platform-Specific Exports',
      'Priority Support'
    ]
  },
  agency: {
    usd: 49, // $49/month
    inr: 3999, // ₹3,999/month (updated to match UI)
    name: 'Agency',
    features: [
      'Unlimited AI Generations',
      'Bulk Generation (1000+ at once)',
      'Agency Command Suite',
      'Custom Brand Voice Presets',
      'FULL WHITE-LABEL - Remove All Branding',
      'Custom Subdomain (yourbrand.descriptai.com)',
      'Multi-Client Portal (unlimited clients)',
      'Reseller Pricing & Invoicing',
      'Team Collaboration (50 seats)',
      'Role-Based Permissions',
      'Full REST API Access',
      'Zapier & Make.com Integrations',
      'Dedicated Account Manager',
      'Priority Support + Slack Channel',
      'Custom Feature Requests'
    ]
  }
};