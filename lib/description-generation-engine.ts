/**
 * DescriptAI - Description Generation Engine
 * Uses pre-trained product intelligence to generate descriptions by tier and features
 */

import { ProductIntelligenceDB, ProductTemplate } from './product-intelligence-final';

export interface GenerationRequest {
  productName: string;
  category: string;
  tier: 'free' | 'pro' | 'agency';
  features: string[];
  tone?: 'professional' | 'casual' | 'luxury' | 'urgent';
  platform?: 'amazon' | 'shopify' | 'etsy' | 'general' | 'instagram' | 'tiktok';
  length?: 'short' | 'medium' | 'long';
  targetAudience?: string;
  customKeywords?: string[];
}

export interface GenerationResult {
  description: string;
  wordCount: number;
  tier: string;
  featuresUsed: string[];
  powerWords: string[];
  seoKeywords: string[];
  platform: string;
  generationTime: number;
}

// 🎯 MAIN GENERATION FUNCTION
export async function generateDescription(request: GenerationRequest): Promise<GenerationResult> {
  const startTime = Date.now();
  
  // Get category intelligence
  const categoryData = ProductIntelligenceDB[request.category];
  if (!categoryData) {
    throw new Error(`Category "${request.category}" not found in intelligence database`);
  }

  // Get template for tier
  const template = categoryData.templates.find(t => t.tier === request.tier);
  if (!template) {
    throw new Error(`Template for tier "${request.tier}" not found`);
  }

  // Generate description using template
  const description = fillTemplate(template, request, categoryData);
  
  // Calculate word count
  const wordCount = description.split(/\s+/).length;
  
  // Get SEO keywords
  const seoKeywords = generateSEOKeywords(request, categoryData);
  
  const generationTime = Date.now() - startTime;

  return {
    description,
    wordCount,
    tier: request.tier,
    featuresUsed: request.features,
    powerWords: template.powerWords,
    seoKeywords,
    platform: request.platform || 'general',
    generationTime
  };
}

// 📝 TEMPLATE FILLING ENGINE
function fillTemplate(
  template: ProductTemplate, 
  request: GenerationRequest, 
  categoryData: any
): string {
  let description = '';

  // Add hook
  description += template.hook.replace(/{productName}/g, request.productName) + '\n\n';

  // Fill body template with features
  let body = template.body;
  
  // Replace product name
  body = body.replace(/{productName}/g, request.productName);
  
  // Replace features (up to 3)
  request.features.slice(0, 3).forEach((feature, index) => {
    body = body.replace(new RegExp(`{feature${index + 1}}`, 'g'), feature);
    body = body.replace(new RegExp(`{keyFeature${index + 1}}`, 'g'), feature);
  });

  // Fill remaining placeholders with category defaults
  const defaults = getDefaultValues(request.category, request.features);
  Object.keys(defaults).forEach(key => {
    body = body.replace(new RegExp(`{${key}}`, 'g'), defaults[key]);
  });

  // Add custom keywords if provided
  if (request.customKeywords && request.customKeywords.length > 0) {
    body += `\n\nKey highlights: ${request.customKeywords.join(', ')}.`;
  }

  description += body + '\n\n';

  // Add CTA
  description += template.cta;

  return description;
}

// 🎯 DEFAULT VALUE GENERATOR
function getDefaultValues(category: string, features: string[]): Record<string, string> {
  const defaults: Record<string, string> = {
    // Common defaults
    benefit: 'exceptional quality and performance',
    benefit1: 'superior comfort',
    benefit2: 'lasting durability',
    benefit3: 'outstanding value',
    useCase: 'everyday use',
    number: '10,000+',
    socialProof: 'Loved by thousands of satisfied customers',
    urgency: 'Limited time offer - order now',
    material: 'premium materials',
    premiumMaterial: 'ethically-sourced premium materials',
    occasion: 'any occasion',
    durability: 'long-lasting durability',
    dimensions: 'Perfectly sized for your needs',
    warranty: 'Backed by our satisfaction guarantee',
    testimonial: 'Customers love it!',
    guarantee: '30-day money-back guarantee',
    // Category-specific
    painPoint: 'subpar products that don\'t last',
    solution: 'a premium solution designed for discerning users',
    originStory: 'years of research and development',
    competitor: 'leading competitors',
    metric: '40%',
    technicalDeepDive: 'Engineered with cutting-edge technology',
    expertEndorsements: 'Recommended by industry experts',
    exclusiveService: 'VIP customer support',
    celebrity: 'top influencers',
    fortune500: 'Fortune 500 companies',
    // Fashion
    fit: 'comfortable',
    bodyType: 'all body types',
    colors: 'multiple colors',
    stylingTip: 'Pairs perfectly with your favorite accessories',
    careInstructions: 'Easy care - machine washable',
    satisfactionGuarantee: 'Love it or your money back',
    // Home
    room: 'living space',
    style: 'modern elegance',
    spaceTypes: 'any room',
    assembly: 'Easy assembly in minutes',
    care: 'Simple maintenance',
    // Beauty
    skinType: 'all skin types',
    usage: 'Easy to use daily',
    result: 'visible results',
    keyIngredient: 'premium natural ingredients',
    skinConcern: 'common skin concerns',
    timeframe: 'just 2 weeks',
    scienceIngredient: 'clinically-proven actives',
    naturalIngredient: 'botanical extracts',
    clinicalResults: 'Clinically proven results',
    texture: 'Luxurious texture',
    scent: 'Subtle, pleasant scent',
    routine: 'Fits seamlessly into your routine',
    // Electronics
    spec: 'cutting-edge specifications',
    performance: 'outstanding',
    batteryLife: 'all-day battery life',
    cameraCapability: 'stunning photos',
    anc: 'Advanced noise cancellation',
    noiseReduction: '95%',
    comfortTech: 'Ergonomic design',
    codec: 'Hi-Res Audio',
    reviewerQuote: '"Best in class" - Tech Review',
    // Fitness
    goal: 'fitness goals',
    activity: 'any workout',
    userType: 'all fitness levels',
    performanceMetric: '20% better performance',
    technology: 'advanced technology',
    athleteType: 'professional athletes',
    fitnessProFeature1: 'pro-grade materials',
    fitnessProFeature2: 'advanced ergonomics',
    fitnessProFeature3: 'precision engineering',
    coaching: 'personal coaching access',
    nutritionPlan: 'custom nutrition guidance',
    fitnessCommunityAccess: 'exclusive athlete community',

    // Baby
    safeMaterial: '100% safe, non-toxic materials',
    ageGroup: 'babies and toddlers',
    safetyFeature: 'Meets all safety standards',
    organicMaterial: 'certified organic materials',
    safetyCertification: 'rigorous safety certifications',
    development: 'healthy development',
    comfortFeature: 'Ultimate comfort for little ones',
    easyCare: 'Easy to clean and maintain',
    parentTestimonial: 'Parents swear by it',
    childPsychologist: 'leading child development experts',
    babyPremiumMaterial: 'premium organic materials',
    safetyTesting: 'Extensive safety testing',
    developmentalBenefits: 'Supports key developmental milestones',
    parentingSupport: '24/7 parenting support',

    // Pets
    petType: 'your beloved pet',
    vetApproved: 'Veterinarian approved',
    veterinaryScience: 'advanced veterinary science',
    humanGradeMaterial: 'human-grade ingredients',
    petHealthBenefits: 'Optimal health benefits',
    wellnessProgram: 'comprehensive wellness program',
    // Books
    author: 'acclaimed author',

    genre: 'captivating story',
    hook: 'will keep you hooked from page one',
    similarBook: 'bestselling titles',
    pages: '300+',
    journey: 'an unforgettable journey',
    premise: 'Gripping storyline',
    emotionalImpact: 'Deeply moving narrative',
    criticalPraise: 'Critically acclaimed',
    perfectFor: 'Perfect for book lovers',
    generation: 'a generation',
    literarySignificance: 'Literary masterpiece',
    culturalImpact: 'Major cultural impact',
    awards: 'Multiple award winner',
    // Art
    artQuality: 'professional quality',
    medium: 'various mediums',
    quantity: 'Generous supply',
    artPremiumMaterial: 'artist-grade materials',
    artPerformance: 'superior performance',
    colorQuality: 'Vibrant, lasting colors',
    artistType: 'professional artists',

    traditionalMethod: 'time-honored techniques',
    pigmentQuality: 'Highest grade pigments',
    lightfastness: 'Excellent lightfastness',
    // Automotive
    vehicleType: 'your vehicle',
    installation: 'Easy installation',
    fitment: 'Perfect fit guaranteed',
    mechanicApproved: 'Mechanic approved',
    motorsportEngineers: 'top motorsport engineers',
    extremeConditions: 'extreme driving conditions',
    materialScience: 'Advanced material science',
    installationService: 'professional installation',
    tuning: 'performance tuning',
    trackSupport: 'track day support',
    // Jewelry
    giftReady: 'Beautifully gift packaged',
    craftsmanship: 'expert craftsmanship',
    designDetails: 'Intricate design details',
    jewelryComfort: 'All-day comfort',
    versatility: 'Versatile styling options',
    meaning: 'Deep personal meaning',
    jewelryTestimonial: 'Customers treasure it',
    masterJeweler: 'master artisan',

    rareMaterial: 'rare, ethically-sourced materials',
    certification: 'Authenticated and certified',
    appraisal: 'professional appraisal',
    insurance: 'jewelry insurance',
    concierge: 'white-glove concierge service',
    // Office
    workProblem: 'workspace inefficiency',
    professionalType: 'professionals',
    ergonomics: 'ergonomic design',
    productivityGain: '30% productivity boost',
    setup: 'Quick, easy setup',
    officeTestimonial: 'Professionals love it',
    famousCEO: 'industry-leading CEOs',

    designPsychology: 'evidence-based design psychology',
    biophilicElements: 'natural biophilic elements',
    smartFeatures: 'intelligent smart features',
    workspaceConsultation: 'personal workspace consultation',
    ergonomicAssessment: 'professional ergonomic assessment',
    whiteGloveSetup: 'white-glove setup service',
    enterpriseSupport: 'dedicated enterprise support',
    // Outdoor
    outdoorActivity: 'outdoor adventures',
    outdoorFeature: 'essential features',
    terrain: 'any terrain',
    extremeCondition: 'extreme weather',

    extremeEnvironment: 'harsh environments',
    weatherResistance: 'Superior weather resistance',
    packability: 'Compact, lightweight packability',
    guideRecommended: 'Recommended by expert guides',
    mountainGuides: 'elite mountain guides',
    extremeExpeditions: 'extreme expeditions',
    technicalSpecs: 'Professional-grade specifications',
    guideMentorship: 'expert guide mentorship',
    expeditionPlanning: 'comprehensive expedition planning',
    rescueInsurance: 'emergency rescue insurance',
    // Food
    taste: 'amazing taste',
    ingredient: 'premium ingredients',
    location: 'artisan producers',
    traditionalMethod: 'time-honored methods',
    tasteProfile: 'Complex, rich taste profile',
    pairing: 'Perfect pairing suggestions',
    awards: 'Multiple taste awards',
    chefEndorsement: 'Chef recommended',
    subscription: 'Convenient subscription available',
    timeframe: 'generations-old',
    familyName: 'esteemed family',
    limitedRegion: 'exclusive, limited region',
    heritageMethod: 'heritage production methods',
    terroir: 'Unique terroir characteristics',
    rareIngredients: 'Rare, hard-to-find ingredients',
    production: 'Small-batch production',
    tastingNotes: 'Detailed tasting notes',
    pairingGuide: 'Expert pairing guide',
    chefCollaboration: 'Exclusive chef collaborations',
    collectorSociety: 'Private collector society',
    // Gaming
    gameType: 'competitive gaming',
    gamingFeature1: 'precision controls',
    gamingFeature2: 'lightning-fast response',
    esports: 'professional esports',
    gamingTechnology: 'cutting-edge technology',
    responsiveness: 'Instant responsiveness',
    gamingComfort: 'All-day comfort',
    customization: 'Extensive customization options',
    proPlayer: 'champion pro players',
    proTechnology: 'tournament-grade technology',
    esportsPros: 'top esports professionals',
    specs: 'Professional specifications',
    teamAccess: 'Exclusive team access',
    exclusiveSkins: 'Limited edition skins',
    championshipGuarantee: 'Championship performance guarantee',


    // Gifts
    recipient: 'someone special',
    giftWrapping: 'Premium gift wrapping',
    personalization: 'Personalization available',
    recipientType: 'discerning recipients',
    meaning: 'Deep sentimental meaning',
    presentation: 'Stunning presentation',
    giftCurators: 'expert gift curators',
    prestigeClients: 'prestigious clients',
    rareFind: 'Rare, hard-to-find items',
    bespokePackaging: 'Custom bespoke packaging',
    handwrittenNote: 'Handwritten personal note',
    delivery: 'White-glove delivery',
    followUp: 'Thoughtful follow-up service',
    membershipBenefits: 'Exclusive membership benefits',
    // Health
    healthGoal: 'wellness goals',
    ingredient: 'natural ingredients',
    healthPros: 'health professionals',
    scienceBacked: 'scientifically-backed',
    specificBenefit: 'targeted health benefits',
    clinicalEvidence: 'Strong clinical evidence',
    wellnessRetreat: 'luxury wellness retreats',
    functionalMedicine: 'functional medicine',
    holisticApproach: 'Comprehensive holistic approach',
    premiumIngredients: 'Pharmaceutical-grade ingredients',
    protocol: 'Personalized health protocol',
    tracking: 'Progress tracking tools',
    professionalOversight: 'Expert professional oversight',
    resultsGuarantee: 'Results-based guarantee',
    // Music
    skillLevel: 'all skill levels',
    soundQuality: 'rich, full sound',
    tone: 'beautiful tone',
    playability: 'Effortless playability',
    artistType: 'professional musicians',
    famousMusician: 'legendary artists',
    famousAlbum: 'iconic albums',
    masterLuthier: 'master craftsman',
    rareWood: 'rare, aged tonewoods',
    toneWood: 'Premium tonewood selection',
    collectorCertificate: 'Authenticity certificate',
    artistEndorsement: 'Artist endorsement',
    investmentValue: 'Excellent investment value',
    // Photography
    useCase: 'content creation',
    compatibility: 'Universal compatibility',
    optics: 'professional optics',
    sensor: 'advanced sensor',
    imageQuality: 'Stunning image quality',
    lowLight: 'Exceptional low-light performance',
    videoCapability: 'Cinematic video capability',
    stabilization: 'Advanced stabilization',
    photographerType: 'professional photographers',
    famousPhotographer: 'renowned photographers',
    iconicShoot: 'legendary photo shoots',
    opticalEngineering: 'precision optical engineering',
    sensorTechnology: 'cutting-edge sensor technology',
    professionalSpecs: 'Broadcast-quality specifications',
    colorScience: 'Professional color science',
    workshopAccess: 'Master workshop access',
    mentorship: 'Professional mentorship',
    professionalNetwork: 'Exclusive professional network',
    masterEndorsement: 'Master photographer endorsement',
    equipmentInsurance: 'Comprehensive equipment insurance'
  };

  return defaults;
}

// 🔍 SEO KEYWORD GENERATOR
function generateSEOKeywords(request: GenerationRequest, categoryData: any): string[] {
  const keywords: string[] = [...categoryData.keywords];
  
  // Add feature-based keywords
  request.features.forEach(feature => {
    keywords.push(feature.toLowerCase());
  });
  
  // Add tier-specific keywords
  if (request.tier === 'pro') {
    keywords.push('premium', 'professional', 'best');
  } else if (request.tier === 'agency') {
    keywords.push('luxury', 'exclusive', 'bespoke', 'enterprise');
  }
  
  // Add platform-specific keywords
  if (request.platform) {
    keywords.push(request.platform);
  }
  
  // Remove duplicates and return top 10
  return [...new Set(keywords)].slice(0, 10);
}

// 🚀 BATCH GENERATION FOR MULTIPLE PRODUCTS
export async function generateBatchDescriptions(
  requests: GenerationRequest[]
): Promise<GenerationResult[]> {
  const results: GenerationResult[] = [];
  
  for (const request of requests) {
    try {
      const result = await generateDescription(request);
      results.push(result);
    } catch (error) {
      console.error(`Failed to generate for ${request.productName}:`, error);
      // Continue with next product
    }
  }
  
  return results;
}

// 🎯 FEATURE-BASED DESCRIPTION MIXER
export function mixDescriptionsByFeatures(
  baseDescription: string,
  features: string[],
  tier: 'free' | 'pro' | 'agency'
): string {
  let mixedDescription = baseDescription;
  
  // Add feature highlights section for Pro and Agency
  if (tier !== 'free' && features.length > 0) {
    const featureSection = '\n\n✨ Key Features:\n' + 
      features.map(f => `• ${f}`).join('\n');
    mixedDescription += featureSection;
  }
  
  // Add premium benefits section for Agency
  if (tier === 'agency') {
    const benefitsSection = '\n\n💎 Why Choose Premium:\n' +
      '• Exclusive access to limited editions\n' +
      '• White-glove customer service\n' +
      '• Extended warranty and care program\n' +
      '• VIP community membership';
    mixedDescription += benefitsSection;
  }
  
  return mixedDescription;
}

// 📊 GENERATION ANALYTICS
export interface GenerationAnalytics {
  totalGenerations: number;
  averageGenerationTime: number;
  tierDistribution: Record<string, number>;
  categoryDistribution: Record<string, number>;
  popularFeatures: string[];
}

export function analyzeGenerationHistory(
  results: GenerationResult[]
): GenerationAnalytics {
  const tierDistribution: Record<string, number> = {};
  const categoryDistribution: Record<string, number> = {};
  const featureCount: Record<string, number> = {};
  let totalTime = 0;
  
  results.forEach(result => {
    // Tier distribution
    tierDistribution[result.tier] = (tierDistribution[result.tier] || 0) + 1;
    
    // Category distribution
    categoryDistribution[result.platform] = (categoryDistribution[result.platform] || 0) + 1;
    
    // Feature popularity
    result.featuresUsed.forEach(feature => {
      featureCount[feature] = (featureCount[feature] || 0) + 1;
    });
    
    totalTime += result.generationTime;
  });
  
  // Get top features
  const popularFeatures = Object.entries(featureCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([feature]) => feature);
  
  return {
    totalGenerations: results.length,
    averageGenerationTime: totalTime / results.length,
    tierDistribution,
    categoryDistribution,
    popularFeatures
  };
}
