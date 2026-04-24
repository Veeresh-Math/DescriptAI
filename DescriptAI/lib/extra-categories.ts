/**
 * DescriptAI - Extra Categories
 * Additional niche categories for specialized markets
 * Categories: Baby, Sports, Food & Beverage, Health, Education, Digital Products
 */

import { ProductIntelligence } from './comprehensive-product-intelligence';

export const ExtraCategories: Record<string, ProductIntelligence> = {
  // 👶 BABY & NURSERY
  baby_supplies: {
    id: 'baby_supplies',
    category: 'Baby & Nursery',
    subcategory: 'General',
    marketplaces: ['amazon', 'shopify', 'ebay', 'buybuyBABY'],
    templates: [],
    features: ['BPA-free', 'phthalate-free', 'soft', 'durable', 'easy to clean'],
    benefits: ['baby safety', 'parent peace of mind', 'convenience'],
    painPoints: ['safety concerns', 'hard to clean', 'expensive'],
    keywords: ['baby supplies', 'nursery', 'baby toys', 'baby feeding', 'diapers'],
    seoTerms: ['baby products', 'newborn essentials', 'baby care', 'nursery items'],
    conversionTriggers: ['parent recommended', ' pediatrician approved', 'safe for newborns'],
    socialProofElements: ['parent reviews', 'safety certifications', 'hospital grade'],
    platformSpecific: {},
  },
  // ⚽ SPORTS & FITNESS
  sports_fitness: {
    id: 'sports_fitness',
    category: 'Sports & Fitness',
    subcategory: 'General',
    marketplaces: ['amazon', 'shopify', 'ebay', 'dick_sporting'],
    templates: [],
    features: ['durable', 'professional grade', 'lightweight', 'ergonomic'],
    benefits: ['improved performance', 'fitness goals', 'endurance'],
    painPoints: ['poor quality', 'uncomfortable', 'breaks easily'],
    keywords: ['sports equipment', 'fitness gear', 'workout', 'training', 'athletic'],
    seoTerms: ['sports supplies', 'fitness equipment', 'athletic gear', 'workout accessories'],
    conversionTriggers: ['professional grade', 'money-back guarantee', 'free shipping'],
    socialProofElements: ['athlete endorsements', 'customer transformations', 'professional reviews'],
    platformSpecific: {},
  },
  // 🍔 FOOD & BEVERAGE
  food_beverage: {
    id: 'food_beverage',
    category: 'Food & Beverage',
    subcategory: 'General',
    marketplaces: ['amazon', 'shopify', 'ebay', 'gourmet'],
    templates: [],
    features: ['organic', 'natural', 'fresh', 'preservative-free', 'non-GMO'],
    benefits: ['good health', 'great taste', 'energy', 'nutrition'],
    painPoints: ['poor quality', 'expired products', 'artificial ingredients'],
    keywords: ['food', 'beverage', 'organic', 'natural', 'gourmet'],
    seoTerms: ['organic food', 'natural beverages', 'gourmet food', 'healthy eating'],
    conversionTriggers: ['organic certified', 'fresh guarantee', 'satisfaction guaranteed'],
    socialProofElements: ['food blogger reviews', 'chef recommendations', 'quality certifications'],
    platformSpecific: {},
  },
  // 💊 HEALTH & WELLNESS
  health_wellness: {
    id: 'health_wellness',
    category: 'Health & Wellness',
    subcategory: 'General',
    marketplaces: ['amazon', 'shopify', 'ebay', 'iHerb'],
    templates: [],
    features: ['all-natural', 'clinically tested', 'FDA registered', 'GMP certified'],
    benefits: ['better health', 'energy', 'immunity', 'wellness'],
    painPoints: ['side effects', 'ineffective products', 'unknown ingredients'],
    keywords: ['health', 'wellness', 'supplements', 'vitamins', 'natural'],
    seoTerms: ['health supplements', 'wellness products', 'natural vitamins', 'immune support'],
    conversionTriggers: ['doctor recommended', 'clinically proven', 'lifetime guarantee'],
    socialProofElements: ['customer testimonials', 'doctor endorsements', 'clinical studies'],
    platformSpecific: {},
  },
  // 📚 EDUCATION & LEARNING
  education_learning: {
    id: 'education_learning',
    category: 'Education & Learning',
    subcategory: 'General',
    marketplaces: ['amazon', 'shopify', 'teachers_pay_teachers'],
    templates: [],
    features: ['engaging', 'interactive', 'age-appropriate', 'curriculum aligned'],
    benefits: ['learning improvement', 'skill development', 'engagement'],
    painPoints: ['boring content', 'too difficult', 'not engaging'],
    keywords: ['educational', 'learning', 'teaching', 'school', 'courses'],
    seoTerms: ['educational materials', 'learning resources', 'teaching supplies', 'online courses'],
    conversionTriggers: ['proven results', 'teacher approved', 'engagement guaranteed'],
    socialProofElements: ['teacher reviews', 'student success stories', 'award winning'],
    platformSpecific: {},
  },
  // 💻 DIGITAL PRODUCTS
  digital_products: {
    id: 'digital_products',
    category: 'Digital Products',
    subcategory: 'General',
    marketplaces: ['gumroad', 'shopify', 'creative_market'],
    templates: [],
    features: ['instant download', 'printable', 'editable', 'commercial license'],
    benefits: ['instant access', 'unlimited use', 'time saving'],
    painPoints: ['poor quality', 'no refunds', 'complicated'],
    keywords: ['digital', 'download', 'printable', 'template', 'ebook'],
    seoTerms: ['digital products', 'printable templates', 'digital downloads', 'online courses'],
    conversionTriggers: ['instant access', 'lifetime access', 'free updates'],
    socialProofElements: ['customer reviews', 'usage examples', 'creator credentials'],
    platformSpecific: {},
  },
  // 🏠 HOME IMPROVEMENT
  home_improvement: {
    id: 'home_improvement',
    category: 'Home Improvement',
    subcategory: 'General',
    marketplaces: ['amazon', 'shopify', 'homedepot', 'lowes'],
    templates: [],
    features: ['easy installation', 'durable', 'professional grade', 'weather resistant'],
    benefits: ['increased home value', 'aesthetics', 'functionality'],
    painPoints: ['difficult installation', 'poor quality', 'does not fit'],
    keywords: ['home improvement', 'tools', 'hardware', 'renovation', 'DIY'],
    seoTerms: ['home improvement supplies', 'DIY tools', 'renovation materials', 'hardware store'],
    conversionTriggers: ['easy DIY', 'professional results', 'warranty included'],
    socialProofElements: ['contractor reviews', 'before/after', 'DIY community'],
    platformSpecific: {},
  },
  // 🎮 GAMING & ENTERTAINMENT
  gaming: {
    id: 'gaming',
    category: 'Gaming & Entertainment',
    subcategory: 'General',
    marketplaces: ['amazon', 'shopify', 'steam', 'gamestop'],
    templates: [],
    features: ['high performance', 'immersive', 'durable', 'compatible'],
    benefits: ['entertainment', 'stress relief', 'social connection'],
    painPoints: ['compatibility issues', 'poor quality', 'lag'],
    keywords: ['gaming', 'video games', 'gaming accessories', 'esports', 'console'],
    seoTerms: ['gaming products', 'video game accessories', 'gaming equipment', 'esports gear'],
    conversionTriggers: ['pro player approved', 'best seller', 'limited edition'],
    socialProofElements: ['pro gamer endorsements', 'streamer reviews', 'gaming community'],
    platformSpecific: {},
  },
};

// Export for easy importing
export default ExtraCategories;
