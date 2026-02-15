/**
 * 🎨 CONVERSION FRAMEWORK TEMPLATES
 * Pre-built psychological frameworks for high-converting copy
 * AGENCY-ONLY FEATURE
 */

export interface ConversionFramework {
  id: string;
  name: string;
  description: string;
  icon: string;
  template: string;
  bestFor: string[];
  tier: 'pro' | 'agency';
}

export const conversionFrameworks: ConversionFramework[] = [
  {
    id: 'pain-agitate-solution',
    name: 'Pain-Agitate-Solution',
    description: 'Classic copywriting formula that identifies pain, amplifies it, then offers relief',
    icon: '💊',
    tier: 'pro',
    bestFor: ['health', 'software', 'services', 'problem-solving products'],
    template: `**PAIN**: Identify the #1 problem your customer faces
**AGITATE**: Describe the consequences of NOT solving this (emotional)
**SOLUTION**: Present your product as the perfect remedy
**PROOF**: Add credibility (testimonials, stats, guarantees)`
  },
  {
    id: 'aida',
    name: 'AIDA Formula',
    description: 'Attention → Interest → Desire → Action - The classic sales framework',
    icon: '🎯',
    tier: 'pro',
    bestFor: ['e-commerce', 'ads', 'landing pages', 'email marketing'],
    template: `**ATTENTION**: Hook with a bold statement or question
**INTEREST**: Share fascinating facts about the product
**DESIRE**: Paint the picture of life WITH this product
**ACTION**: Clear, urgent call-to-action with incentive`
  },
  {
    id: 'before-after-bridge',
    name: 'Before-After-Bridge',
    description: 'Show the transformation journey your customer will experience',
    icon: '🌉',
    tier: 'agency',
    bestFor: ['transformation products', 'courses', 'beauty', 'fitness', 'lifestyle'],
    template: `**BEFORE**: Describe their current frustrating reality
**AFTER**: Paint the vivid picture of their desired outcome
**BRIDGE**: Show how YOUR product is the path between them
**PROOF**: Social proof that this transformation is real`
  },
  {
    id: 'storytelling',
    name: 'Hero\'s Journey',
    description: 'Story-driven copy that positions customer as the hero, product as the guide',
    icon: '📖',
    tier: 'agency',
    bestFor: ['premium products', 'brand storytelling', 'emotional purchases', 'gifts'],
    template: `**HERO**: Customer is the protagonist (not you)
**CHALLENGE**: The obstacle they face
**GUIDE**: Your product as the wise mentor
**PLAN**: Simple steps to success
**CALL**: Invitation to begin their journey
**STAKES**: What happens if they don't act`
  },
  {
    id: 'feature-advantage-benefit',
    name: 'FAB Method',
    description: 'Feature → Advantage → Benefit - Connect specs to emotions',
    icon: '🔗',
    tier: 'pro',
    bestFor: ['tech products', 'complex products', 'B2B', 'spec-heavy items'],
    template: `**FEATURE**: What it is (the spec)
**ADVANTAGE**: What it does (the function)
**BENEFIT**: What it means for THEM (the emotion)
**PROOF**: Evidence this claim is true`
  },
  {
    id: 'urgency-scarcity',
    name: 'Urgency + Scarcity',
    description: 'FOMO-driven copy with legitimate urgency triggers',
    icon: '⏰',
    tier: 'agency',
    bestFor: ['limited editions', 'launches', 'seasonal', 'high-demand products'],
    template: `**SCARCITY**: Why quantity is limited (authentic reason)
**URGENCY**: Time-bound reason to act NOW
**SOCIAL PROOF**: Others are buying (herd mentality)
**RISK REVERSAL**: Guarantee removes fear
**BONUS**: Sweeten the deal for fast action`
  }
];

export function getFrameworkById(id: string): ConversionFramework | undefined {
  return conversionFrameworks.find(f => f.id === id);
}

export function getFrameworksByTier(tier: string): ConversionFramework[] {
  if (tier === 'agency') return conversionFrameworks;
  if (tier === 'pro') return conversionFrameworks.filter(f => f.tier === 'pro');
  return []; // Free users get no frameworks
}

export function applyFramework(frameworkId: string, productData: {
  productName: string;
  features: string;
  tone: string;
}): string {
  const framework = getFrameworkById(frameworkId);
  if (!framework) return '';
  
  // This would be expanded with AI integration to actually apply the framework
  return `Using ${framework.name} framework for ${productData.productName}...\n\n${framework.template}`;
}

