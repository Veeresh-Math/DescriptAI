/**
 * 🕵️ COMPETITOR INTELLIGENCE ENGINE
 * Analyze competitor listings and find gap opportunities
 * AGENCY-ONLY FEATURE
 */

export interface CompetitorAnalysis {
  url: string;
  productName: string;
  descriptionLength: number;
  keywords: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  gaps: string[]; // What they're missing
  opportunities: string[]; // What you can do better
  estimatedConversion: 'high' | 'medium' | 'low';
}

export interface GapOpportunity {
  type: 'keyword' | 'feature' | 'benefit' | 'social_proof' | 'urgency';
  description: string;
  impact: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
}

export async function analyzeCompetitor(url: string): Promise<CompetitorAnalysis> {
  // This would integrate with web crawler in production
  // For now, returning mock structure
  
  return {
    url,
    productName: 'Competitor Product',
    descriptionLength: 0,
    keywords: [],
    sentiment: 'neutral',
    gaps: [],
    opportunities: [],
    estimatedConversion: 'medium'
  };
}

export function findGapOpportunities(
  competitorDesc: string,
  yourFeatures: string
): GapOpportunity[] {
  const opportunities: GapOpportunity[] = [];
  
  // Check for missing social proof
  if (!competitorDesc.includes('review') && !competitorDesc.includes('star')) {
    opportunities.push({
      type: 'social_proof',
      description: 'Competitor lacks social proof - add testimonials/ratings',
      impact: 'high',
      difficulty: 'easy'
    });
  }
  
  // Check for missing urgency
  if (!competitorDesc.includes('limited') && !competitorDesc.includes('sale')) {
    opportunities.push({
      type: 'urgency',
      description: 'No urgency triggers - add scarcity/FOMO',
      impact: 'high',
      difficulty: 'easy'
    });
  }
  
  // Check for feature gaps
  const commonFeatures = ['organic', 'premium', 'professional', 'guaranteed'];
  const competitorHas = commonFeatures.filter(f => 
    competitorDesc.toLowerCase().includes(f)
  );
  const youHave = commonFeatures.filter(f => 
    yourFeatures.toLowerCase().includes(f)
  );
  
  const uniqueFeatures = youHave.filter(f => !competitorHas.includes(f));
  if (uniqueFeatures.length > 0) {
    opportunities.push({
      type: 'feature',
      description: `You have ${uniqueFeatures.join(', ')} - competitor doesn't emphasize these`,
      impact: 'medium',
      difficulty: 'easy'
    });
  }
  
  return opportunities;
}

export function generateCompetitorBattlecard(
  competitor: CompetitorAnalysis,
  yourProduct: { name: string; features: string }
): string {
  const gaps = findGapOpportunities(competitor.productName, yourProduct.features);
  
  return `
🏆 COMPETITOR BATTLECARD
========================
THEM: ${competitor.productName}
YOU: ${yourProduct.name}

🎯 THEIR WEAKNESSES:
${gaps.map(g => `• ${g.description} (Impact: ${g.impact})`).join('\n')}

💪 YOUR ADVANTAGES:
${gaps.filter(g => g.type === 'feature').map(g => `• ${g.description}`).join('\n')}

🚀 RECOMMENDED STRATEGY:
1. Lead with ${gaps.find(g => g.impact === 'high')?.type || 'unique features'}
2. Add ${gaps.find(g => g.type === 'social_proof') ? 'customer testimonials' : 'urgency triggers'}
3. Emphasize: ${yourProduct.features.split(',')[0]}

Estimated win probability: ${gaps.filter(g => g.impact === 'high').length >= 2 ? '75%' : '60%'}
`;
}

// Pre-built competitor templates for common niches
export const nicheCompetitorTemplates: Record<string, string> = {
  coffee: "Premium arabica beans. Rich flavor. Fresh roasted. 5-star rated. Free shipping.",
  skincare: "Organic ingredients. Dermatologist tested. Cruelty-free. 30-day results guarantee.",
  software: "Easy setup. 24/7 support. Trusted by 10,000+ teams. 99.9% uptime. Free trial.",
  fitness: "Professional grade. Used by athletes. Quick results. Money-back guarantee. Free guide included.",
  fashion: "Limited edition. Premium materials. Ethically sourced. As seen on Instagram. Fast shipping."
};

export function getNicheTemplate(niche: string): string {
  return nicheCompetitorTemplates[niche.toLowerCase()] || nicheCompetitorTemplates.software;
}

