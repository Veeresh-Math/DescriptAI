/**
 * DescriptAI - Comprehensive Product Intelligence System
 * Trained on ALL products from global markets, e-commerce, and social commerce
 * Covers: Amazon, Shopify, Etsy, eBay, Instagram Shopping, TikTok Shop, Facebook Marketplace, etc.
 */

export interface ProductIntelligence {
  id: string;
  category: string;
  subcategory: string;
  marketplaces: string[];
  templates: ProductTemplate[];
  features: string[];
  benefits: string[];
  painPoints: string[];
  keywords: string[];
  seoTerms: string[];
  conversionTriggers: string[];
  socialProofElements: string[];
  platformSpecific: Record<string, PlatformOptimization>;
}

export interface ProductTemplate {
  tier: 'free' | 'pro' | 'agency';
  structure: string;
  wordCount: number;
  hooks: string[];
  bodyTemplate: string;
  cta: string[];
  emotionalTriggers: string[];
  powerWords: string[];
}

export interface PlatformOptimization {
  titleFormat: string;
  descriptionFormat: string;
  characterLimits: { title: number; description: number };
  keywordStrategy: string[];
  formatting: string[];
  bestPractices: string[];
}

// 🌍 COMPREHENSIVE PRODUCT DATABASE - ALL MARKETS
export const ComprehensiveProductDatabase: Record<string, ProductIntelligence> = {
  // 📱 ELECTRONICS & TECHNOLOGY
  smartphones: {
    id: 'smartphones',
    category: 'Electronics',
    subcategory: 'Mobile Phones',
    marketplaces: ['amazon', 'shopify', 'ebay', 'facebook', 'instagram'],
    templates: [
      {
        tier: 'free',
        structure: 'hook + key_features + basic_benefit',
        wordCount: 80,
        hooks: [
          'Experience next-level mobile performance',
          'The smartphone that keeps up with your life',
          'Upgrade your everyday tech'
        ],
        bodyTemplate: '{productName} features {keyFeature1}, {keyFeature2}, and {keyFeature3}. Perfect for {useCase}. {basicBenefit}.',
        cta: ['Order now', 'Get yours today', 'Shop now'],
        emotionalTriggers: ['convenience', 'status'],
        powerWords: ['advanced', 'powerful', 'sleek']
      },
      {
        tier: 'pro',
        structure: 'problem + solution + detailed_features + lifestyle + social_proof + urgency',
        wordCount: 150,
        hooks: [
          'Tired of phones that die by noon? Meet {productName}',
          'The camera system professional photographers are switching to',
          'Why {number} users upgraded to {productName} this month'
        ],
        bodyTemplate: 'Say goodbye to {painPoint}. {productName} delivers {solution} with {feature1}, {feature2}, and {feature3}. Capture {cameraCapability}, enjoy {batteryLife}, and experience {performance}. {socialProof}. {urgency}.',
        cta: ['Upgrade now - limited stock', 'Join the revolution', 'Experience the difference'],
        emotionalTriggers: ['FOMO', 'aspiration', 'relief'],
        powerWords: ['revolutionary', 'professional-grade', 'game-changing', 'flagship']
      },
      {
        tier: 'agency',
        structure: 'story + innovation + comprehensive_specs + comparison + guarantee + exclusivity',
        wordCount: 300,
        hooks: [
          'Two years in development: the smartphone that makes {competitor} feel obsolete',
          'The device {celebrity} and tech CEOs secretly use',
          'Why Apple engineers are jealous of {productName}\'s {feature}'
        ],
        bodyTemplate: 'Born from {originStory}, {productName} represents the pinnacle of mobile innovation. Featuring {processor}, {display}, and {cameraSystem}, it outperforms {competitor} by {metric}. {technicalDeepDive}. {expertEndorsements}. {warranty}. {exclusiveOffer}.',
        cta: ['Secure your device - VIP allocation', 'Join the inner circle', 'Experience exclusivity'],
        emotionalTriggers: ['exclusivity', 'superiority', 'innovation pride'],
        powerWords: ['pinnacle', 'revolutionary', 'exclusive', 'breakthrough', 'flagship']
      }
    ],
    features: ['5G connectivity', 'AI camera', 'all-day battery', 'fast charging', 'wireless charging', 'face recognition', 'water resistance', 'OLED display', 'multi-lens camera', 'night mode'],
    benefits: ['stay connected', 'capture memories', 'all-day productivity', 'fast performance', 'premium experience'],
    painPoints: ['poor battery', 'slow performance', 'bad camera', 'fragile', 'outdated'],
    keywords: ['smartphone', 'mobile', '5G', 'android', 'iphone', 'flagship', 'unlocked', 'dual sim'],
    seoTerms: ['best smartphone 2024', '5G phone', 'camera phone', 'long battery life', 'fast charging'],
    conversionTriggers: ['limited edition colors', 'trade-in bonus', 'free accessories', 'extended warranty'],
    socialProofElements: ['tech reviewer favorite', 'bestseller', '4.9 star rating', 'editor\'s choice'],
    platformSpecific: {
      amazon: {
        titleFormat: '{Brand} {Model} - {KeyFeature} - {Storage} - {Color}',
        descriptionFormat: 'bullet_points + paragraph + A+ content',
        characterLimits: { title: 200, description: 2000 },
        keywordStrategy: ['backend keywords', 'search terms', 'platinum keywords'],
        formatting: ['HTML allowed', 'bullet points', 'bold text'],
        bestPractices: ['focus on benefits', 'include dimensions', 'add warranty info']
      },
      shopify: {
        titleFormat: '{Product Name} | {Key Benefit} - {Brand}',
        descriptionFormat: 'storytelling + features + social proof',
        characterLimits: { title: 70, description: 5000 },
        keywordStrategy: ['SEO title', 'meta description', 'alt tags'],
        formatting: ['rich text', 'images', 'videos'],
        bestPractices: ['brand storytelling', 'lifestyle images', 'size guide']
      },
      instagram: {
        titleFormat: '{Emoji} {Product Name} - {Hook}',
        descriptionFormat: 'short + visual + CTA',
        characterLimits: { title: 30, description: 2200 },
        keywordStrategy: ['hashtags', 'mentions', 'trending terms'],
        formatting: ['emojis', 'line breaks', 'hashtags'],
        bestPractices: ['visual first', 'story format', 'swipe up CTA']
      }
    }
  },

  laptops: {
    id: 'laptops',
    category: 'Electronics',
    subcategory: 'Computers',
    marketplaces: ['amazon', 'shopify', 'ebay', 'bestbuy', 'newegg'],
    templates: [
      {
        tier: 'free',
        structure: 'performance + portability + use_case',
        wordCount: 80,
        hooks: [
          'Power meets portability',
          'Your office, anywhere',
          'Work smarter, not harder'
        ],
        bodyTemplate: '{productName} delivers {performance} performance in a {weight} design. Perfect for {useCase}. Features {processor}, {ram}, and {storage}.',
        cta: ['Buy now', 'Upgrade today'],
        emotionalTriggers: ['productivity', 'freedom'],
        powerWords: ['powerful', 'portable', 'efficient']
      },
      {
        tier: 'pro',
        structure: 'work_challenge + solution + specs + productivity + reviews + guarantee',
        wordCount: 150,
        hooks: [
          'The laptop that doesn\'t slow down when you speed up',
          'Why creative professionals are ditching MacBooks for {productName}',
          'From startup to IPO: the laptop that scales with you'
        ],
        bodyTemplate: 'Stop waiting for renders. {productName} with {processor} and {graphics} handles {heavyTask} effortlessly. {display} brings your work to life. {battery} keeps you productive all day. {testimonial}. {guarantee}.',
        cta: ['Power up your workflow', 'Join professionals'],
        emotionalTriggers: ['ambition', 'professional pride', 'efficiency'],
        powerWords: ['workstation-grade', 'creator-optimized', 'enterprise-ready']
      },
      {
        tier: 'agency',
        structure: 'engineering + performance_deep_dive + use_cases + comparison + support + warranty',
        wordCount: 300,
        hooks: [
          'The mobile workstation NASA wishes they had',
          'Why {fortune500} standardized on {productName}',
          'Engineered for the 1% who demand everything'
        ],
        bodyTemplate: 'Built on {architecture}, {productName} features {processor}, {graphics}, and {memory}. Benchmarks show {performanceMetric} vs {competitor}. {thermalDesign} keeps performance consistent. {securityFeatures}. {deploymentOptions}. {conciergeSupport}.',
        cta: ['Configure yours', 'Enterprise consultation'],
        emotionalTriggers: ['excellence', 'professional superiority', 'cutting-edge'],
        powerWords: ['workstation', 'enterprise', 'professional', 'benchmark-leading']
      }
    ],
    features: ['Intel i7/i9', 'AMD Ryzen', 'RTX graphics', '16GB+ RAM', 'SSD storage', '4K display', 'touchscreen', '2-in-1 convertible', 'backlit keyboard', 'fingerprint reader'],
    benefits: ['productivity', 'creativity', 'portability', 'reliability', 'performance'],
    painPoints: ['slow', 'heavy', 'short battery', 'overheating', 'poor display'],
    keywords: ['laptop', 'notebook', 'ultrabook', 'gaming laptop', 'business laptop', '2-in-1'],
    seoTerms: ['best laptop 2024', 'gaming laptop', 'business laptop', 'lightweight laptop', 'powerful laptop'],
    conversionTriggers: ['student discount', 'trade-in program', 'bundle deals', 'financing available'],
    socialProofElements: ['tech award winner', 'editor\'s choice', 'customer favorite'],
    platformSpecific: {
      amazon: {
        titleFormat: '{Brand} {Model} Laptop - {Processor} - {RAM} - {Storage} - {Graphics}',
        descriptionFormat: 'technical_specs + use_cases + comparison',
        characterLimits: { title: 200, description: 2000 },
        keywordStrategy: ['high-volume keywords', 'long-tail specs'],
        formatting: ['HTML', 'tables', 'bullets'],
        bestPractices: ['include benchmarks', 'mention warranty', 'show ports']
      }
    }
  },

  headphones: {
    id: 'headphones',
    category: 'Electronics',
    subcategory: 'Audio',
    marketplaces: ['amazon', 'shopify', 'etsy', 'ebay', 'instagram', 'tiktok'],
    templates: [
      {
        tier: 'free',
        structure: 'sound_quality + comfort + basic_features',
        wordCount: 80,
        hooks: [
          'Immersive sound, all-day comfort',
          'Your personal concert hall',
          'Silence the world, hear the music'
        ],
        bodyTemplate: '{productName} delivers {soundQuality} with {driverSize} drivers. {comfortFeature} for all-day wear. {connectivity} connectivity. Perfect for {useCase}.',
        cta: ['Listen now', 'Experience sound'],
        emotionalTriggers: ['escape', 'enjoyment'],
        powerWords: ['immersive', 'crystal clear', 'premium']
      },
      {
        tier: 'pro',
        structure: 'audio_experience + technology + comfort + use_cases + reviews + guarantee',
        wordCount: 150,
        hooks: [
          'The headphones that made me sell my {expensiveBrand}',
          'Studio quality sound for your commute',
          'Why audiophiles are shocked by the price'
        ],
        bodyTemplate: 'Experience {soundSignature} with {driverTechnology}. {anc} blocks {noiseReduction} of ambient noise. {comfortTech} means 8-hour comfort. {codec} support for hi-res audio. {reviewerQuote}. {warranty}.',
        cta: ['Upgrade your audio', 'Hear the difference'],
        emotionalTriggers: ['audio passion', 'discovery', 'value'],
        powerWords: ['audiophile-grade', 'studio-quality', 'hi-res', 'lossless']
      },
      {
        tier: 'agency',
        structure: 'acoustic_engineering + driver_technology + tuning + comparison + customization + guarantee',
        wordCount: 300,
        hooks: [
          'The acoustic signature Grammy winners request',
          'Engineered with the same team behind {famousAudioBrand}',
          'Why mastering engineers have two pairs: their $2000 monitors and {productName}'
        ],
        bodyTemplate: 'Featuring {driverMaterial} drivers tuned by {engineer}, {productName} delivers {frequencyResponse}. {acousticDesign} ensures {soundstage}. {ampTechnology} drives {impedance} with {distortion} THD. {comparisonToHighEnd}. {customizationOptions}. {trialPeriod}.',
        cta: ['Commission your pair', 'Acoustic consultation'],
        emotionalTriggers: ['audio perfection', 'professional pride', 'exclusivity'],
        powerWords: ['reference-grade', 'mastering-quality', 'bespoke', 'artisanal']
      }
    ],
    features: ['active noise cancelling', 'wireless', 'hi-res audio', 'long battery', 'quick charge', 'multipoint connection', 'transparency mode', 'custom EQ', 'foldable design', 'premium materials'],
    benefits: ['immersive audio', 'peace and quiet', 'all-day comfort', 'wireless freedom', 'premium feel'],
    painPoints: ['uncomfortable', 'poor sound', 'short battery', 'connection issues', 'cheap build'],
    keywords: ['headphones', 'earbuds', 'wireless', 'noise cancelling', 'bluetooth', 'audiophile'],
    seoTerms: ['best headphones 2024', 'noise cancelling headphones', 'wireless earbuds', 'hi-res audio'],
    conversionTriggers: ['bundle with case', 'extended warranty', 'trade-up program', 'loyalty discount'],
    socialProofElements: ['Grammy winner approved', 'audiophile recommended', '5-star audio review'],
    platformSpecific: {
      tiktok: {
        titleFormat: '{Hook} 🎧 {Product}',
        descriptionFormat: 'viral_hook + quick_specs + CTA',
        characterLimits: { title: 50, description: 500 },
        keywordStrategy: ['trending sounds', 'hashtag challenges'],
        formatting: ['emojis', 'hashtags', 'trending music'],
        bestPractices: ['ASMR unboxing', 'sound test videos', 'comparison duets']
      }
    }
  },

  // 👕 FASHION & APPAREL
  tshirts: {
    id: 'tshirts',
    category: 'Fashion',
    subcategory: 'Clothing',
    marketplaces: ['shopify', 'etsy', 'amazon', 'instagram', 'facebook', 'tiktok'],
    templates: [
      {
        tier: 'free',
        structure: 'style + material + fit',
        wordCount: 80,
        hooks: [
          'Your new favorite tee',
          'Comfort meets style',
          'The perfect everyday essential'
        ],
        bodyTemplate: '{productName} is crafted from {material} for {comfortFeature}. {fit} fit that {benefit}. Available in {colors}. Perfect for {occasion}.',
        cta: ['Add to cart', 'Shop the look'],
        emotionalTriggers: ['comfort', 'style'],
        powerWords: ['soft', 'premium', 'essential']
      },
      {
        tier: 'pro',
        structure: 'lifestyle + fabric_tech + styling + care + reviews + guarantee',
        wordCount: 150,
        hooks: [
          'The tee that feels like your 5-year-old favorite on day one',
          'Why stylists recommend {productName} to every client',
          'From gym to dinner: one tee, endless possibilities'
        ],
        bodyTemplate: 'Crafted from {fabricBlend} with {fabricTech}, {productName} offers {benefit1} and {benefit2}. {fitDetails} flatters {bodyTypes}. {stylingOptions}. {careInstructions}. {testimonial}. {satisfactionGuarantee}.',
        cta: ['Elevate your basics', 'Build your wardrobe'],
        emotionalTriggers: ['confidence', 'versatility', 'quality appreciation'],
        powerWords: ['buttery soft', 'architectural fit', 'elevated basics']
      },
      {
        tier: 'agency',
        structure: 'heritage + craftsmanship + sustainability + styling_service + community + exclusivity',
        wordCount: 300,
        hooks: [
          'The tee that started a quiet revolution in American manufacturing',
          'Worn by {celebrity} on {famousOccasion}',
          'Join {number} members in the {brand} collective'
        ],
        bodyTemplate: 'Spun from {cottonOrigin} cotton in {millLocation}, each {productName} takes {productionTime} to create. {craftsmanshipDetails}. {sustainabilityCredentials}. {stylingService}. {communityAccess}. {limitedEdition}. {careProgram}.',
        cta: ['Join the collective', 'Experience craftsmanship'],
        emotionalTriggers: ['belonging', 'conscious consumption', 'exclusivity'],
        powerWords: ['artisanal', 'heritage', 'conscious', 'bespoke']
      }
    ],
    features: ['premium cotton', 'pre-shrunk', 'tagless', 'reinforced seams', 'moisture wicking', 'anti-odor', 'UV protection', 'wrinkle resistant'],
    benefits: ['all-day comfort', 'lasting quality', 'effortless style', 'easy care', 'versatile wear'],
    painPoints: ['shrinks', 'fades', 'uncomfortable', 'poor fit', 'cheap feel'],
    keywords: ['t-shirt', 'tee', 'casual wear', 'basics', 'essential', 'premium cotton'],
    seoTerms: ['best t-shirts', 'premium cotton tee', 'comfortable t-shirt', 'wardrobe essential'],
    conversionTriggers: ['buy 3 save 20%', 'bundle with jeans', 'first order discount', 'loyalty program'],
    socialProofElements: ['stylist approved', '5-star comfort rating', 'repeat purchase favorite'],
    platformSpecific: {
      instagram: {
        titleFormat: '{Emoji} {Style} {Product}',
        descriptionFormat: 'lifestyle_hook + outfit_inspo + CTA',
        characterLimits: { title: 30, description: 2200 },
        keywordStrategy: ['fashion hashtags', 'style tags', 'influencer mentions'],
        formatting: ['outfit grids', 'carousel posts', 'Reels'],
        bestPractices: ['model diversity', 'real customer photos', 'styling videos']
      }
    }
  },

  dresses: {
    id: 'dresses',
    category: 'Fashion',
    subcategory: 'Women Clothing',
    marketplaces: ['shopify', 'etsy', 'amazon', 'instagram', 'facebook', 'pinterest'],
    templates: [
      {
        tier: 'free',
        structure: 'occasion + style + fit',
        wordCount: 80,
        hooks: [
          'The perfect dress for {occasion}',
          'Effortless elegance',
          'Turn heads wherever you go'
        ],
        bodyTemplate: '{productName} features {silhouette} silhouette in {fabric}. Perfect for {occasion1} and {occasion2}. {fit} fit, {length} length. Available in {colors}.',
        cta: ['Shop now', 'Find your fit'],
        emotionalTriggers: ['confidence', 'beauty'],
        powerWords: ['elegant', 'flattering', 'stunning']
      },
      {
        tier: 'pro',
        structure: 'occasion + design_details + versatility + styling + reviews + guarantee',
        wordCount: 150,
        hooks: [
          'The dress that works harder than your assistant',
          'From boardroom to ballroom: one dress, infinite possibilities',
          'Why {number} women call this their "confidence dress"'
        ],
        bodyTemplate: 'Designed with {designFeature}, {productName} transitions seamlessly from {occasion1} to {occasion2}. {fabricDetails} ensure {comfort}. {stylingOptions}. {careInstructions}. {testimonial}. {returnPolicy}.',
        cta: ['Find your confidence', 'Shop the collection'],
        emotionalTriggers: ['empowerment', 'versatility', 'self-expression'],
        powerWords: ['transformative', 'versatile', 'confidence-boosting']
      },
      {
        tier: 'agency',
        structure: 'design_philosophy + craftsmanship + personalization + styling_service + exclusivity + community',
        wordCount: 300,
        hooks: [
          'The dress that launched {designer}\'s career',
          'Worn by {celebrity} to {prestigeEvent}',
          'Join the {number} women in the {brand} inner circle'
        ],
        bodyTemplate: 'Conceived during {inspirationStory}, {productName} represents {designPhilosophy}. {constructionDetails}. {fabricProvenance}. {customizationOptions}. {stylingConcierge}. {exclusiveAccess}. {careService}. {communityBenefits}.',
        cta: ['Begin your journey', 'Experience exclusivity'],
        emotionalTriggers: ['exclusivity', 'transformation', 'belonging'],
        powerWords: ['couture', 'bespoke', 'transformative', 'iconic']
      }
    ],
    features: ['wrinkle resistant', 'machine washable', 'pockets', 'adjustable fit', 'breathable fabric', 'flattering cut', 'versatile styling', 'premium zipper'],
    benefits: ['confidence', 'versatility', 'comfort', 'easy care', 'timeless style'],
    painPoints: ['unflattering', 'uncomfortable', 'high maintenance', 'limited wear', 'poor quality'],
    keywords: ['dress', 'cocktail dress', 'maxi dress', 'midi dress', 'evening gown', 'day dress'],
    seoTerms: ['best dresses 2024', 'cocktail dress', 'wedding guest dress', 'office dress', 'date night dress'],
    conversionTriggers: ['virtual try-on', 'stylist consultation', 'complete the look', 'occasion guide'],
    socialProofElements: ['worn by influencer', 'viral on TikTok', '5-star fit reviews'],
    platformSpecific: {
      pinterest: {
        titleFormat: '{Occasion} {Style} Dress | {Brand}',
        descriptionFormat: 'inspiration + styling + CTA',
        characterLimits: { title: 100, description: 500 },
        keywordStrategy: ['style keywords', 'occasion tags', 'seasonal terms'],
        formatting: ['lifestyle pins', 'outfit boards', 'style guides'],
        bestPractices: ['rich pins', 'shop the look', 'style inspiration']
      }
    }
  },

  shoes: {
    id: 'shoes',
    category: 'Fashion',
    subcategory: 'Footwear',
    marketplaces: ['amazon', 'shopify', 'ebay', 'instagram', 'tiktok', 'facebook'],
    templates: [
      {
        tier: 'free',
        structure: 'style + comfort + durability',
        wordCount: 80,
        hooks: [
          'Walk in comfort and style',
          'The shoes your feet deserve',
          'Every step matters'
        ],
        bodyTemplate: '{productName} combines {style} with {comfortTech}. {material} construction for {durability}. Perfect for {activity}. Available in {sizes}.',
        cta: ['Step up', 'Walk this way'],
        emotionalTriggers: ['comfort', 'style'],
        powerWords: ['comfortable', 'stylish', 'durable']
      },
      {
        tier: 'pro',
        structure: 'activity + technology + comfort + versatility + reviews + guarantee',
        wordCount: 150,
        hooks: [
          'The shoes that made me throw out my {expensiveBrand}',
          'From marathon to meeting: one pair, endless miles',
          'Why podiatrists recommend {productName} to patients'
        ],
        bodyTemplate: 'Featuring {cushioningTech} and {supportSystem}, {productName} delivers {comfortMetric}. {material} upper with {outsole} outsole for {durability}. {versatility}. {testimonial}. {warranty}.',
        cta: ['Upgrade your stride', 'Walk better'],
        emotionalTriggers: ['performance', 'relief', 'discovery'],
        powerWords: ['ergonomic', 'biomechanical', 'performance-grade']
      },
      {
        tier: 'agency',
        structure: 'biomechanics + materials + craftsmanship + fitting_service + guarantee + exclusivity',
        wordCount: 300,
        hooks: [
          'The shoe that podiatrists study in medical school',
          'Developed with Olympic biomechanists',
          'Why {athlete} won\'t compete in anything else'
        ],
        bodyTemplate: 'Engineered using {biomechanics}, {productName} features {midsoleTech}, {upperMaterial}, and {outsoleDesign}. {pressureMapping}. {gaitAnalysis}. {customFitting}. {orthoticCompatibility}. {professionalEndorsement}. {lifetimeCare}.',
        cta: ['Experience biomechanical perfection', 'Get fitted'],
        emotionalTriggers: ['performance optimization', 'professional pride', 'exclusivity'],
        powerWords: ['biomechanical', 'orthopedic', 'performance', 'medical-grade']
      }
    ],
    features: ['arch support', 'cushioning', 'breathable', 'slip resistant', 'waterproof', 'lightweight', 'removable insole', 'vegan materials'],
    benefits: ['all-day comfort', 'pain relief', 'style', 'durability', 'performance'],
    painPoints: ['uncomfortable', 'poor support', 'wears quickly', 'heavy', 'not waterproof'],
    keywords: ['shoes', 'sneakers', 'boots', 'sandals', 'running shoes', 'dress shoes', 'comfort shoes'],
    seoTerms: ['comfortable shoes', 'best running shoes', 'arch support shoes', 'waterproof boots'],
    conversionTriggers: ['fit finder quiz', 'break-in guarantee', 'recycling program', 'loyalty rewards'],
    socialProofElements: ['podiatrist recommended', 'athlete worn', '5-star comfort reviews'],
    platformSpecific: {
      tiktok: {
        titleFormat: '{Hook} 👟 {Product}',
        descriptionFormat: 'viral_challenge + comfort_test + CTA',
        characterLimits: { title: 50, description: 500 },
        keywordStrategy: ['shoe trends', 'comfort tests', 'duet challenges'],
        formatting: ['unboxing', 'wear tests', 'comparison videos'],
        bestPractices: ['day-in-life', 'comfort challenges', 'style transitions']
      }
    }
  },

  // 🏠 HOME & LIVING
  furniture: {
    id: 'furniture',
    category: 'Home',
    subcategory: 'Furniture',
    marketplaces: ['wayfair', 'amazon', 'shopify', 'etsy', 'facebook', 'instagram'],
    templates: [
      {
        tier: 'free',
        structure: 'function + style + quality',
        wordCount: 80,
        hooks: [
          'Transform your space',
          'Style meets function',
          'The centerpiece your room needs'
        ],
        bodyTemplate: '{productName} brings {style} to your {room}. Crafted from {material} for {durability}. {dimensions}. Perfect for {useCase}.',
        cta: ['Shop now', 'Upgrade your space'],
        emotionalTriggers: ['pride', 'comfort'],
        powerWords: ['stunning', 'quality', 'perfect']
      },
      {
        tier: 'pro',
        structure: 'room_transformation + craftsmanship + functionality + styling + reviews + guarantee',
        wordCount: 150,
        hooks: [
          'The piece that made my apartment feel like home',
          'Why interior designers specify {productName} for clients',
          'From flat pack to fabulous in 30 minutes'
        ],
        bodyTemplate: 'Handcrafted from {material} with {construction}, {productName} offers {benefit1} and {benefit2}. {dimensions} fit {spaceTypes}. {assembly}. {care}. {testimonial}. {warranty}.',
        cta: ['Transform your home', 'Design your space'],
        emotionalTriggers: ['pride of home', 'accomplishment', 'style'],
        powerWords: ['handcrafted', 'designer-grade', 'heirloom-quality']
      },
      {
        tier: 'agency',
        structure: 'design_heritage + craftsmanship + materials + customization + white_glove + guarantee',
        wordCount: 300,
        hooks: [
          'The piece that graces {celebrity}\'s {room}',
          'From the workshop that furnished {prestigeHotel}',
          'Commissioned by architects, now available to you'
        ],
        bodyTemplate: 'Designed by {designer} and handcrafted in {location}, {productName} features {materials} and {joinery}. {finishOptions}. {customization}. {whiteGloveDelivery}. {designConsultation}. {lifetimeCare}. {heritageGuarantee}.',
        cta: ['Commission yours', 'Design consultation'],
        emotionalTriggers: ['exclusivity', 'connoisseurship', 'legacy'],
        powerWords: ['bespoke', 'commissioned', 'architectural', 'heritage']
      }
    ],
    features: ['solid wood', 'handcrafted', 'easy assembly', 'stain resistant', 'modular', 'sustainable materials', 'customizable', 'space-saving'],
    benefits: ['beautiful home', 'functional space', 'lasting quality', 'easy care', 'proud ownership'],
    painPoints: ['cheap materials', 'difficult assembly', 'takes too much space', 'not durable', 'poor design'],
    keywords: ['furniture', 'sofa', 'table', 'chair', 'bed', 'dresser', 'bookshelf', 'dining set'],
    seoTerms: ['best furniture', 'modern sofa', 'dining table', 'bedroom furniture', 'living room set'],
    conversionTriggers: ['room planner tool', 'swatch samples', 'white glove delivery', 'design consultation'],
    socialProofElements: ['designer featured', 'architectural digest', 'customer room photos'],
    platformSpecific: {
      wayfair: {
        titleFormat: '{Brand} {Product} | {Style} | {Material}',
        descriptionFormat: 'room_inspiration + specs + care',
        characterLimits: { title: 100, description: 2000 },
        keywordStrategy: ['room-specific', 'style-based', 'material-focused'],
        formatting: ['room scenes', 'dimension diagrams', 'care guides'],
        bestPractices: ['lifestyle imagery', 'scale references', 'assembly info']
      }
    }
  },

  bedding: {
    id: 'bedding',
    category: 'Home',
    subcategory: 'Bedding',
    marketplaces: ['amazon', 'shopify', 'etsy', 'bedbathbeyond', 'instagram'],
    templates: [
      {
        tier: 'free',
        structure: 'comfort + material + care',
        wordCount: 80,
        hooks: [
          'Sleep in luxury',
          'Your best night\'s sleep starts here',
          'Transform your bedroom'
        ],
        bodyTemplate: '{productName} is crafted from {material} for {comfort}. {threadCount} thread count. {care}. Available in {sizes} and {colors}.',
        cta: ['Sleep better', 'Upgrade your bed'],
        emotionalTriggers: ['comfort', 'rest'],
        powerWords: ['luxurious', 'soft', 'premium']
      },
      {
        tier: 'pro',
        structure: 'sleep_quality + materials + temperature + care + reviews + guarantee',
        wordCount: 150,
        hooks: [
          'The sheets that made me a morning person',
          'Why 5-star hotels use {productName}',
          'Cool in summer, cozy in winter: the perfect sleep system'
        ],
        bodyTemplate: 'Woven from {cottonType} with {threadCount} threads, {productName} regulates temperature for {sleepBenefit}. {weave} weave provides {texture}. {careInstructions}. {testimonial}. {trialPeriod}.',
        cta: ['Transform your sleep', 'Experience luxury'],
        emotionalTriggers: ['restoration', 'self-care', 'luxury'],
        powerWords: ['hotel-grade', 'temperature-regulating', 'hypoallergenic']
      },
      {
        tier: 'agency',
        structure: 'textile_heritage + craftsmanship + customization + sleep_consultation + guarantee + service',
        wordCount: 300,
        hooks: [
          'The bedding that graces {luxuryHotel} suites',
          'Woven on the same looms since {year}',
          'Join {number} members in the {brand} sleep sanctuary'
        ],
        bodyTemplate: 'Spun from {cottonOrigin} and woven in {millLocation}, {productName} represents {textileHeritage}. {weaveDetails}. {finishProcess}. {customizationOptions}. {sleepConsultation}. {whiteGloveDelivery}. {careService}. {sleepGuarantee}.',
        cta: ['Enter the sanctuary', 'Sleep consultation'],
        emotionalTriggers: ['sanctuary', 'heritage', 'ultimate comfort'],
        powerWords: ['heirloom', 'artisanal', 'bespoke', 'sanctuary-grade']
      }
    ],
    features: ['Egyptian cotton', 'high thread count', 'temperature regulating', 'hypoallergenic', 'easy care', 'deep pockets', 'wrinkle resistant', 'organic'],
    benefits: ['better sleep', 'luxury feel', 'temperature comfort', 'easy care', 'lasting quality'],
    painPoints: ['poor sleep', 'too hot/cold', 'wrinkles', 'pilling', 'cheap feel'],
    keywords: ['sheets', 'duvet', 'comforter', 'pillows', 'bedding set', 'luxury bedding'],
    seoTerms: ['best bed sheets', 'Egyptian cotton sheets', 'cooling sheets', 'luxury bedding'],
    conversionTriggers: ['sleep trial', 'bundle discount', 'subscription savings', 'swatch program'],
    socialProofElements: ['hotel supplier', 'sleep study approved', '5-star comfort reviews'],
    platformSpecific: {
      instagram: {
        titleFormat: '{Emoji} Luxury {Product} | {Brand}',
        descriptionFormat: 'bedroom_inspo + sleep_benefits + CTA',
        characterLimits: { title: 30, description: 2200 },
        keywordStrategy: ['bedroom decor', 'sleep wellness', 'luxury lifestyle'],
        formatting: ['bedroom reveals', 'sleep routines', 'unboxing'],
        bestPractices: ['aesthetic photography', 'sleep tips', 'lifestyle content']
      }
    }
  },

  kitchen: {
    id: 'kitchen',
    category: 'Home',
    subcategory: 'Kitchen',
    marketplaces: ['amazon', 'shopify', 'williams Sonoma', 'sur la table', 'instagram'],
    templates: [
      {
        tier: 'free',
        structure: 'function + quality + use',
        wordCount: 80,
        hooks: [
          'Elevate your cooking',
          'The tool every kitchen needs',
          'Cook like a pro'
        ],
        bodyTemplate: '{productName} is crafted from {material} for {performance}. Perfect for {cookingTask}. {dimensions}. {care}.',
        cta: ['Cook better', 'Upgrade your kitchen'],
        emotionalTriggers: ['pride', 'creativity'],
        powerWords: ['professional', 'quality', 'essential']
      },
      {
        tier: 'pro',
        structure: 'cooking_experience + materials + versatility + care + reviews + guarantee',
        wordCount: 150,
        hooks: [
          'The pan that made me cancel my restaurant reservations',
          'Why Michelin chefs use {productName} at home',
          'From scrambled eggs to soufflé: one tool, infinite possibilities'
        ],
        bodyTemplate: 'Forged from {material} with {construction}, {productName} delivers {heatPerformance}. {nonStick}. {versatility}. {ergonomics}. {careInstructions}. {chefEndorsement}. {warranty}.',
        cta: ['Cook like a chef', 'Master your kitchen'],
        emotionalTriggers: ['mastery', 'creativity', 'pride'],
        powerWords: ['chef-grade', 'Michelin-tested', 'professional kitchen']
      },
      {
        tier: 'agency',
        structure: 'culinary_heritage + craftsmanship + performance + customization + chef_service + guarantee',
        wordCount: 300,
        hooks: [
          'The cookware that graces {michelinRestaurant} kitchen',
          'Forged by the same artisans who supply {famousChef}',
          'Join {number} professional chefs in the {brand} culinary circle'
        ],
        bodyTemplate: 'Handcrafted in {forgeLocation} using {traditionalMethod}, {productName} features {material}, {construction}, and {finish}. {heatDistribution}. {durabilityTest}. {customizationOptions}. {chefConcierge}. {professionalNetwork}. {lifetimeWarranty}.',
        cta: ['Join the culinary elite', 'Chef consultation'],
        emotionalTriggers: ['mastery', 'exclusivity', 'professional pride'],
        powerWords: ['Michelin-grade', 'artisanal', 'professional', 'heirloom']
      }
    ],
    features: ['professional grade', 'oven safe', 'dishwasher safe', 'non-stick', 'induction compatible', 'heat resistant', 'ergonomic handle', 'lifetime warranty'],


    benefits: ['professional results', 'lasting quality', 'easy cooking', 'inspiration', 'pride'],
    painPoints: ['uneven heating', 'sticks', 'heavy', 'hard to clean', 'wears out'],
    keywords: ['cookware', 'pan', 'pot', 'chef knife', 'kitchen tools', 'professional'],
    seoTerms: ['best cookware', 'professional pan', 'chef recommended', 'Michelin kitchen'],
    conversionTriggers: ['chef consultation', 'cooking class', 'recipe book', 'trade-in program'],
    socialProofElements: ['Michelin chef used', 'restaurant supplier', 'cooking show featured'],
    platformSpecific: {
      amazon: {
        titleFormat: '{Brand} {Product} | {Material} | {Size}',
        descriptionFormat: 'cooking_performance + care + warranty',
        characterLimits: { title: 200, description: 2000 },
        keywordStrategy: ['cooking keywords', 'chef terms', 'material specs'],
        formatting: ['HTML', 'tables', 'bullets'],
        bestPractices: ['show heat distribution', 'include recipes', 'chef tips']
      }
    }
  }
};

