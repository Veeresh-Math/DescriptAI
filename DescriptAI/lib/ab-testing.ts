/**
 * 🧪 A/B TESTING ENGINE
 * Built-in conversion optimization through variant testing
 * AGENCY-ONLY FEATURE
 */

export interface ABTestVariant {
  id: string;
  name: string;
  content: string;
  impressions: number;
  clicks: number;
  conversions: number;
  createdAt: Date;
}

export interface ABTest {
  id: string;
  userId: string;
  productName: string;
  status: 'running' | 'paused' | 'completed';
  variants: ABTestVariant[];
  winner?: string; // variant ID
  confidence: number; // 0-100
  startDate: Date;
  endDate?: Date;
}

export interface TestResult {
  variantId: string;
  conversionRate: number;
  lift: number; // % improvement over control
  confidence: number;
  recommendation: 'winner' | 'loser' | 'inconclusive';
}

export function createABTest(
  userId: string,
  productName: string,
  variants: string[]
): ABTest {
  return {
    id: `test_${Date.now()}`,
    userId,
    productName,
    status: 'running',
    confidence: 0,
    startDate: new Date(),
    variants: variants.map((content, index) => ({
      id: `variant_${index}`,
      name: index === 0 ? 'Control (A)' : `Variant ${String.fromCharCode(66 + index - 1)}`,
      content,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      createdAt: new Date()
    }))
  };
}

export function recordImpression(test: ABTest, variantId: string): ABTest {
  const variant = test.variants.find(v => v.id === variantId);
  if (variant) {
    variant.impressions++;
  }
  return test;
}

export function recordConversion(test: ABTest, variantId: string): ABTest {
  const variant = test.variants.find(v => v.id === variantId);
  if (variant) {
    variant.conversions++;
  }
  return calculateWinner(test);
}

export function calculateWinner(test: ABTest): ABTest {
  if (test.variants.length < 2) return test;
  
  const control = test.variants[0];
  const controlRate = control.conversions / Math.max(control.impressions, 1);
  
  let bestVariant = control;
  let bestLift = 0;
  
  for (let i = 1; i < test.variants.length; i++) {
    const variant = test.variants[i];
    const variantRate = variant.conversions / Math.max(variant.impressions, 1);
    const lift = ((variantRate - controlRate) / controlRate) * 100;
    
    if (lift > bestLift && variant.impressions > 10) {
      bestLift = lift;
      bestVariant = variant;
    }
  }
  
  // Calculate confidence (simplified)
  const totalImpressions = test.variants.reduce((sum, v) => sum + v.impressions, 0);
  const confidence = Math.min(95, (totalImpressions / 100) * 10);
  
  return {
    ...test,
    confidence,
    winner: bestVariant.id !== control.id ? bestVariant.id : undefined
  };
}

export function getTestResults(test: ABTest): TestResult[] {
  const control = test.variants[0];
  const controlRate = control.conversions / Math.max(control.impressions, 1);
  
  return test.variants.map(variant => {
    const rate = variant.conversions / Math.max(variant.impressions, 1);
    const lift = ((rate - controlRate) / controlRate) * 100;
    
    let recommendation: 'winner' | 'loser' | 'inconclusive' = 'inconclusive';
    if (variant.id === test.winner) recommendation = 'winner';
    else if (lift < -10) recommendation = 'loser';
    
    return {
      variantId: variant.id,
      conversionRate: rate * 100,
      lift,
      confidence: test.confidence,
      recommendation
    };
  });
}

export function generateTestReport(test: ABTest): string {
  const results = getTestResults(test);
  const winner = results.find(r => r.recommendation === 'winner');
  
  return `
📊 A/B TEST RESULTS: ${test.productName}
=====================================
Status: ${test.status.toUpperCase()}
Duration: ${Math.floor((Date.now() - test.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
Confidence: ${test.confidence}%

${test.variants.map((v, i) => `
${results[i].recommendation === 'winner' ? '🏆' : '📝'} ${v.name}
   Impressions: ${v.impressions}
   Conversions: ${v.conversions}
   Rate: ${results[i].conversionRate.toFixed(2)}%
   ${i > 0 ? `Lift: ${results[i].lift > 0 ? '+' : ''}${results[i].lift.toFixed(1)}%` : '(Control)'}
`).join('\n')}

${winner ? `
✅ RECOMMENDATION:
Use "${test.variants.find(v => v.id === winner.variantId)?.name}" 
Expected improvement: ${winner.lift.toFixed(1)}% more conversions
` : '⏳ Still collecting data... Need more impressions for statistical significance'}
`;
}

// Pre-built test templates for common scenarios
export const abTestTemplates = {
  headline: [
    "The Ultimate [Product] for [Benefit]",
    "Finally: A [Product] That Actually Works",
    "Why 10,000+ People Choose Our [Product]",
    "Stop [Pain Point]. Start [Benefit]."
  ],
  
  cta: [
    "Buy Now - Free Shipping",
    "Get Yours Today",
    "Join 10,000+ Happy Customers",
    "Claim Your Discount"
  ],
  
  socialProof: [
    "⭐⭐⭐⭐⭐ Rated 4.9/5 by 2,000+ customers",
    "As seen on Forbes, TechCrunch, and Product Hunt",
    "Trusted by 50,000+ professionals worldwide",
    "#1 Best Seller in [Category] for 2024"
  ]
};

export function generateTestVariants(
  baseDescription: string,
  testType: 'headline' | 'cta' | 'socialProof'
): string[] {
  const templates = abTestTemplates[testType];
  
  return templates.map(template => {
    // Simple template replacement
    return template + '\n\n' + baseDescription;
  });
}

// Statistical significance calculator
export function calculateStatisticalSignificance(
  controlConversions: number,
  controlImpressions: number,
  variantConversions: number,
  variantImpressions: number
): { significant: boolean; confidence: number } {
  // Simplified z-test calculation
  const p1 = controlConversions / controlImpressions;
  const p2 = variantConversions / variantImpressions;
  const p = (controlConversions + variantConversions) / (controlImpressions + variantImpressions);
  
  const se = Math.sqrt(p * (1 - p) * (1/controlImpressions + 1/variantImpressions));
  const z = (p2 - p1) / se;
  
  // Convert z-score to confidence
  const confidence = Math.min(99, Math.abs(z) * 25);
  const significant = confidence > 95;
  
  return { significant, confidence };
}

