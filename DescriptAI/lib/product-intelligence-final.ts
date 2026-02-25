/**
 * DescriptAI - Complete Product Intelligence System
 * Pre-trained templates for ALL product categories across ALL tiers
 */

export interface ProductTemplate {
  tier: 'free' | 'pro' | 'agency';
  wordCount: number;
  hook: string;
  body: string;
  cta: string;
  powerWords: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  templates: ProductTemplate[];
  features: string[];
  benefits: string[];
  keywords: string[];
}

// 🎯 COMPLETE PRODUCT DATABASE - ALL CATEGORIES, ALL TIERS
export const ProductIntelligenceDB: Record<string, ProductCategory> = {
  // 📱 ELECTRONICS
  electronics: {
    id: 'electronics',
    name: 'Electronics & Gadgets',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Experience next-level performance with {productName}',
        body: '{productName} features {feature1}, {feature2}, and {feature3}. Perfect for {useCase}. Enjoy {benefit} with {spec}.',
        cta: 'Order now and upgrade your tech',
        powerWords: ['advanced', 'powerful', 'innovative']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'Tired of {painPoint}? Meet {productName} - the game-changer you\'ve been waiting for',
        body: 'Say goodbye to {painPoint}. {productName} delivers {solution} with {feature1}, {feature2}, and {feature3}. Experience {benefit1}, enjoy {benefit2}, and discover {benefit3}. Join {number} satisfied customers who made the switch. {socialProof}. Limited stock available.',
        cta: 'Upgrade now - do not miss out',
        powerWords: ['revolutionary', 'professional-grade', 'game-changing', 'flagship']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'Two years in development: the {productName} that makes {competitor} feel obsolete',
        body: 'Born from {originStory}, {productName} represents the pinnacle of {category} innovation. Featuring {premiumFeature1}, {premiumFeature2}, and {premiumFeature3}, it outperforms {competitor} by {metric}. {technicalDeepDive}. Trusted by {celebrity} and {fortune500}. {expertEndorsements}. Includes {warranty} and {exclusiveService}.',
        cta: 'Secure your exclusive allocation today',
        powerWords: ['pinnacle', 'breakthrough', 'exclusive', 'bespoke', 'enterprise-grade']
      }
    ],
    features: ['wireless', 'bluetooth', 'long battery', 'fast charging', 'AI-powered', 'waterproof', 'lightweight'],
    benefits: ['convenience', 'productivity', 'premium experience', 'time savings', 'peace of mind'],
    keywords: ['smart', 'digital', 'portable', 'wireless', 'high-tech', 'innovation']
  },

  // 👕 FASHION
  fashion: {
    id: 'fashion',
    name: 'Fashion & Apparel',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Elevate your style with {productName}',
        body: '{productName} is crafted from {material} for {benefit}. {fit} fit perfect for {occasion}. Available in {colors}.',
        cta: 'Add to cart and upgrade your wardrobe',
        powerWords: ['stylish', 'comfortable', 'trendy']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The {category} that gets you compliments everywhere you go',
        body: 'Crafted from {premiumMaterial} with {fabricTech}, {productName} offers {benefit1} and {benefit2}. {fitDetails} flatters {bodyType}. Perfect for {occasion1} and {occasion2}. {stylingTip}. {careInstructions}. Loved by {number} customers. {satisfactionGuarantee}.',
        cta: 'Discover your new favorite',
        powerWords: ['premium', 'buttery-soft', 'flattering', 'versatile']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The {productName} worn by {celebrity} at {prestigeEvent}',
        body: 'Spun from {rareMaterial} in {artisanLocation}, each {productName} takes {productionTime} to create. {craftsmanshipDetails}. {sustainabilityStory}. Includes {stylingService}, {careProgram}, and {communityAccess}. {limitedEdition}. Join {number} members in the {brand} collective. {exclusiveBenefits}.',
        cta: 'Join the collective - limited availability',
        powerWords: ['artisanal', 'bespoke', 'heritage', 'conscious', 'iconic']
      }
    ],
    features: ['premium fabric', 'wrinkle resistant', 'breathable', 'sustainable', 'handcrafted'],
    benefits: ['confidence', 'comfort', 'style', 'versatility', 'lasting quality'],
    keywords: ['fashion', 'apparel', 'clothing', 'style', 'trendy', 'classic']
  },

  // 🏠 HOME
  home: {
    id: 'home',
    name: 'Home & Living',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Transform your {room} with {productName}',
        body: '{productName} brings {style} to your home. Crafted from {material} for {durability}. {dimensions}. Perfect for {useCase}.',
        cta: 'Shop now and elevate your space',
        powerWords: ['beautiful', 'functional', 'quality']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The piece that made my house feel like a home',
        body: 'Handcrafted from {material} with {construction}, {productName} offers {benefit1} and {benefit2}. {dimensions} fit {spaceTypes}. {assembly}. {care}. {testimonial}. {warranty}.',
        cta: 'Create your dream space today',
        powerWords: ['handcrafted', 'designer-grade', 'heirloom-quality', 'stunning']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The {productName} that graces {celebrity}\'s {prestigeLocation}',
        body: 'Designed by {designer} and handcrafted in {location}, {productName} features {materials} and {joinery}. {finishOptions}. {customization}. Includes {whiteGloveDelivery}, {designConsultation}, and {lifetimeCare}. {heritageStory}. {exclusiveGuarantee}.',
        cta: 'Commission yours - bespoke consultation',
        powerWords: ['bespoke', 'architectural', 'heritage', 'commissioned', 'masterpiece']
      }
    ],
    features: ['solid materials', 'handcrafted', 'easy care', 'sustainable', 'customizable'],
    benefits: ['beautiful home', 'functionality', 'comfort', 'pride of ownership', 'lasting quality'],
    keywords: ['furniture', 'decor', 'home', 'living', 'interior', 'design']
  },

  // 💄 BEAUTY
  beauty: {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Get {benefit} with {productName}',
        body: '{productName} features {keyIngredient} for {result}. Perfect for {skinType}. {usage}.',
        cta: 'Try it today',
        powerWords: ['effective', 'gentle', 'natural']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'Goodbye {skinConcern}, hello {benefit} in just {timeframe}',
        body: 'Formulated with {scienceIngredient} and {naturalIngredient}, {productName} targets {skinConcern}. {clinicalResults}. {texture}. {scent}. {routine}. {testimonial}. {guarantee}.',
        cta: 'Transform your skin today',
        powerWords: ['clinically-proven', 'dermatologist-approved', 'transformative', 'radiant']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The {benefit} secret from {prestigeLocation} now available to you',
        body: 'Developed by {scientist} using {rareIngredient} from {source}. {formulationScience}. {extractionProcess}. {clinicalStudy}. Includes {personalization}, {consultation}, and {exclusiveAccess}. {celebrityEndorsement}. {luxuryPackaging}. {satisfactionGuarantee}.',
        cta: 'Experience luxury skincare - exclusive consultation',
        powerWords: ['medical-grade', 'bespoke', 'rare', 'prestige', 'transformative']
      }
    ],
    features: ['natural ingredients', 'clinically tested', 'cruelty-free', 'sustainable', 'effective'],
    benefits: ['radiant skin', 'confidence', 'youthful appearance', 'self-care', 'results'],
    keywords: ['skincare', 'beauty', 'natural', 'organic', 'anti-aging', 'glowing']
  },

  // 🏋️ FITNESS
  fitness: {
    id: 'fitness',
    name: 'Fitness & Sports',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Achieve your {goal} with {productName}',
        body: '{productName} delivers {performance} for {activity}. Features {feature1} and {feature2}. Perfect for {userType}.',
        cta: 'Start your fitness journey',
        powerWords: ['performance', 'durable', 'professional']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'Break through your plateau with {productName}',
        body: 'Featuring {technology} and {material}, {productName} delivers {performanceMetric}. {comfort}. {versatility}. Used by {athleteType}. {testimonial}. {warranty}.',
        cta: 'Elevate your performance',
        powerWords: ['performance-enhancing', 'professional-grade', 'breakthrough', 'champion']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The same gear that powers {proTeam} - now available to you',
        body: 'Engineered with {biomechanics} and tested by {athletes}. Features {proFeature1}, {proFeature2}, and {proFeature3}. {customization}. Includes {coaching}, {nutritionPlan}, and {communityAccess}. {professionalEndorsement}. {performanceGuarantee}.',
        cta: 'Train like a pro - exclusive access',
        powerWords: ['Olympic-grade', 'biomechanical', 'elite', 'championship', 'professional']
      }
    ],
    features: ['performance', 'durable', 'comfortable', 'adjustable', 'professional'],
    benefits: ['peak performance', 'faster recovery', 'motivation', 'results', 'confidence'],
    keywords: ['fitness', 'workout', 'training', 'performance', 'athletic', 'gym']
  },

  // 🧸 BABY
  baby: {
    id: 'baby',
    name: 'Baby & Kids',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Give your little one the best with {productName}',
        body: '{productName} is made from {safeMaterial} for {benefit}. Perfect for {ageGroup}. {safetyFeature}.',
        cta: 'Shop for your baby',
        powerWords: ['safe', 'gentle', 'soft']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The {productName} pediatricians recommend to new parents',
        body: 'Crafted from {organicMaterial} with {safetyCertification}, {productName} supports {development}. {comfortFeature}. {easyCare}. {parentTestimonial}. {satisfactionGuarantee}.',
        cta: 'Give your baby the best',
        powerWords: ['pediatrician-approved', 'organic', 'developmental', 'peace-of-mind']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The {productName} trusted by {celebrityParent} and {number} discerning parents',
        body: 'Developed with {childPsychologist} and made from {premiumMaterial}. {safetyTesting}. {developmentalBenefits}. Includes {consultation}, {tracking}, and {community}. {exclusiveAccess}. {lifetimeCare}. {parentingSupport}.',
        cta: 'Join the {brand} family - exclusive membership',
        powerWords: ['heritage', 'developmental', 'premium', 'trusted', 'nurturing']
      }
    ],
    features: ['organic', 'safe', 'non-toxic', 'developmental', 'easy clean'],
    benefits: ['peace of mind', 'healthy development', 'comfort', 'safety', 'happy baby'],
    keywords: ['baby', 'toddler', 'kids', 'parenting', 'nursery', 'safe']
  },

  // 🐾 PETS
  pets: {
    id: 'pets',
    name: 'Pet Supplies',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Spoil your {petType} with {productName}',
        body: '{productName} is made from {material} for {benefit}. Perfect for {petType}. {feature}.',
        cta: 'Treat your pet today',
        powerWords: ['comfortable', 'safe', 'durable']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'Because your {petType} deserves the very best',
        body: 'Made from {premiumMaterial} with {safetyFeature}, {productName} delivers {benefit}. {vetApproved}. {durability}. {testimonial}. {guarantee}.',
        cta: 'Give your pet premium quality',
        powerWords: ['vet-approved', 'premium', 'luxury', 'tail-wagging']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The {productName} trusted by {famousVet} and {number} pet professionals',
        body: 'Formulated with {veterinaryScience} and made from {humanGradeMaterial}. {safetyTesting}. {healthBenefits}. Includes {consultation}, {nutritionPlan}, and {community}. {exclusiveAccess}. {wellnessProgram}.',
        cta: 'Join the {brand} pet family - VIP membership',
        powerWords: ['veterinary-grade', 'holistic', 'integrative', 'wellness', 'premium']
      }
    ],
    features: ['safe', 'durable', 'comfortable', 'non-toxic', 'vet approved'],
    benefits: ['happy pet', 'peace of mind', 'health', 'comfort', 'bonding'],
    keywords: ['pet', 'dog', 'cat', 'supplies', 'premium', 'natural']
  },

  // 📚 BOOKS
  books: {
    id: 'books',
    name: 'Books & Media',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Discover {genre} like never before with {productName}',
        body: '{productName} by {author} is a {genre} that {hook}. Perfect for fans of {similarBook}. {pages} pages.',
        cta: 'Start reading today',
        powerWords: ['captivating', 'bestselling', 'acclaimed']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The {genre} that stays with you long after the last page',
        body: '{productName} takes you on {journey}. {premise}. {emotionalImpact}. {criticalPraise}. {perfectFor}. {testimonial}.',
        cta: 'Experience the journey',
        powerWords: ['masterpiece', 'unforgettable', 'literary', 'page-turner']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The {genre} masterpiece that defined {decade} - first edition available',
        body: 'By {author}, the voice of {generation}. {literarySignificance}. {culturalImpact}. {awards}. {collectorEdition}. {authorEvents}. {literarySociety}. {rareBookClub}.',
        cta: 'Own a piece of literary history - limited edition',
        powerWords: ['masterpiece', 'classic', 'collectible', 'literary', 'iconic']
      }
    ],
    features: ['bestseller', 'award winning', 'critically acclaimed', 'page turner'],
    benefits: ['escape', 'knowledge', 'entertainment', 'inspiration', 'transformation'],
    keywords: ['book', 'novel', 'fiction', 'non-fiction', 'bestseller', 'reading']
  },

  // 🎨 ART
  art: {
    id: 'art',
    name: 'Art & Craft Supplies',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Unleash your creativity with {productName}',
        body: '{productName} features {quality} for {result}. Perfect for {medium}. {quantity}.',
        cta: 'Create something beautiful',
        powerWords: ['vibrant', 'quality', 'professional']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The supplies that bring your artistic vision to life',
        body: 'Made with {premiumMaterial} for {performance}. {colorQuality}. {durability}. {versatility}. Used by {artistType}. {testimonial}.',
        cta: 'Elevate your art',
        powerWords: ['artist-grade', 'archival-quality', 'vibrant', 'professional']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The same materials used in {famousMuseum} restoration - now available to artists',
        body: 'Sourced from {origin} and processed using {traditionalMethod}. {pigmentQuality}. {lightfastness}. {customization}. Includes {artistResidency}, {techniqueWorkshops}, and {collectorNetwork}. {masterEndorsement}.',
        cta: 'Join the master artists - exclusive access',
        powerWords: ['museum-grade', 'archival', 'master', 'heritage', 'bespoke']
      }
    ],
    features: ['high quality', 'vibrant', 'archival', 'professional', 'non-toxic'],
    benefits: ['creative expression', 'professional results', 'lasting art', 'inspiration'],
    keywords: ['art', 'paint', 'canvas', 'supplies', 'creative', 'artist']
  },

  // 🚗 AUTOMOTIVE
  automotive: {
    id: 'automotive',
    name: 'Automotive & Accessories',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Upgrade your ride with {productName}',
        body: '{productName} fits {vehicleType} for {benefit}. Made from {material}. {installation}.',
        cta: 'Upgrade your vehicle',
        powerWords: ['durable', 'premium', 'essential']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The upgrade {number} {vehicleType} owners swear by',
        body: 'Engineered for {vehicleType} with {material}. {performance}. {fitment}. {durability}. {mechanicApproved}. {warranty}.',
        cta: 'Transform your vehicle',
        powerWords: ['performance', 'OEM-quality', 'professional', 'precision']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The {productName} trusted by {racingTeam} and performance shops',
        body: 'Developed with {motorsportEngineers} for {extremeConditions}. {materialScience}. {testing}. {customization}. Includes {installationService}, {tuning}, and {trackSupport}. {professionalEndorsement}.',
        cta: 'Experience motorsport excellence - concierge service',
        powerWords: ['motorsport-grade', 'track-tested', 'bespoke', 'performance', 'racing']
      }
    ],
    features: ['durable', 'OEM quality', 'easy install', 'performance', 'precision fit'],
    benefits: ['enhanced performance', 'protection', 'style', 'value', 'pride'],
    keywords: ['automotive', 'car', 'truck', 'accessories', 'performance', 'upgrade']
  },

  // 💎 JEWELRY
  jewelry: {
    id: 'jewelry',
    name: 'Jewelry & Accessories',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Add sparkle to your {occasion} with {productName}',
        body: '{productName} features {material} for {benefit}. Perfect for {occasion}. {giftReady}.',
        cta: 'Treat yourself or someone special',
        powerWords: ['elegant', 'sparkling', 'beautiful']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The piece that becomes your signature style',
        body: 'Handcrafted from {material} with {craftsmanship}. {designDetails}. {comfort}. {versatility}. {meaning}. {testimonial}. {guarantee}.',
        cta: 'Find your signature piece',
        powerWords: ['handcrafted', 'artisanal', 'timeless', 'heirloom-quality']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The {productName} worn by {celebrity} at {prestigeEvent}',
        body: 'Created by {masterJeweler} using {rareMaterial}. {craftsmanship}. {certification}. {customization}. Includes {appraisal}, {insurance}, and {concierge}. {exclusiveAccess}. {legacyService}.',
        cta: 'Commission your heirloom - private consultation',
        powerWords: ['haute', 'bespoke', 'masterpiece', 'heirloom', 'investment']
      }
    ],
    features: ['handcrafted', 'precious materials', 'hypoallergenic', 'adjustable', 'gift ready'],
    benefits: ['elegance', 'confidence', 'meaning', 'investment', 'beauty'],
    keywords: ['jewelry', 'gold', 'silver', 'diamond', 'elegant', 'luxury']
  },

  // 🏢 OFFICE
  office: {
    id: 'office',
    name: 'Office & Productivity',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Boost your productivity with {productName}',
        body: '{productName} delivers {benefit} for {useCase}. Features {feature}. {dimensions}.',
        cta: 'Work smarter',
        powerWords: ['efficient', 'professional', 'organized']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'End {workProblem} and supercharge your workflow',
        body: 'Designed for {professionalType} with {ergonomics}. {productivityGain}. {quality}. {setup}. {testimonial}. {warranty}.',
        cta: 'Transform your workspace',
        powerWords: ['ergonomic', 'productivity-enhancing', 'professional-grade', 'optimized']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The workspace setup used by {famousCEO} and {fortune500} teams',
        body: 'Engineered with {ergonomics} and {designPsychology}. {biophilicElements}. {smartFeatures}. {customization}. Includes {workspaceConsultation}, {ergonomicAssessment}, and {whiteGloveSetup}. {enterpriseSupport}.',
        cta: 'Design your executive workspace - consultation included',
        powerWords: ['executive-grade', 'biophilic', 'neuroergonomic', 'enterprise', 'premium']
      }
    ],
    features: ['ergonomic', 'professional', 'organized', 'durable', 'efficient'],
    benefits: ['productivity', 'comfort', 'professional image', 'health', 'organization'],
    keywords: ['office', 'desk', 'productivity', 'ergonomic', 'professional', 'workspace']
  },

  // 🏕️ OUTDOOR
  outdoor: {
    id: 'outdoor',
    name: 'Outdoor & Camping',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Gear up for adventure with {productName}',
        body: '{productName} is built for {activity} with {feature}. {durability}. Perfect for {terrain}.',
        cta: 'Start your adventure',
        powerWords: ['rugged', 'durable', 'adventure-ready']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'Conquer {extremeCondition} with confidence',
        body: 'Tested in {extremeEnvironment} with {material}. {weatherResistance}. {packability}. {guideRecommended}. {testimonial}. {warranty}.',
        cta: 'Explore without limits',
        powerWords: ['expedition-grade', 'weatherproof', 'field-tested', 'adventure']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The gear that summited {famousPeak} and returned',
        body: 'Developed with {mountainGuides} for {extremeExpeditions}. {technicalSpecs}. {testing}. {customization}. Includes {guideMentorship}, {expeditionPlanning}, and {rescueInsurance}. {professionalEndorsement}.',
        cta: 'Join the expedition team - exclusive access',
        powerWords: ['alpine-grade', 'expedition-proven', 'technical', 'professional', 'extreme']
      }
    ],
    features: ['weatherproof', 'durable', 'lightweight', 'portable', 'rugged'],
    benefits: ['adventure', 'peace of mind', 'reliability', 'exploration', 'memories'],
    keywords: ['outdoor', 'camping', 'hiking', 'adventure', 'gear', 'exploration']
  },

  // 🍔 FOOD
  food: {
    id: 'food',
    name: 'Food & Beverages',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Experience {taste} with {productName}',
        body: '{productName} is made with {ingredient} for {benefit}. Perfect for {occasion}. {quantity}.',
        cta: 'Taste the difference',
        powerWords: ['delicious', 'natural', 'authentic']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'From {origin} to your table - taste the authentic difference',
        body: 'Crafted in {location} using {traditionalMethod}. {tasteProfile}. {pairing}. {awards}. {chefEndorsement}. {subscription}.',
        cta: 'Elevate your dining',
        powerWords: ['artisanal', 'gourmet', 'authentic', 'small-batch']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'A {timeframe} tradition from {familyName} - now available to connoisseurs',
        body: 'Produced in {limitedRegion} using {heritageMethod}. {terroir}. {rareIngredients}. {production}. Includes {tastingNotes}, {pairingGuide}, and {chefCollaboration}. {exclusiveReleases}. {collectorSociety}.',
        cta: 'Join the culinary society - exclusive membership',
        powerWords: ['heritage', 'terroir', 'connoisseur', 'collectible', 'prestige']
      }
    ],
    features: ['natural', 'organic', 'artisanal', 'delicious', 'authentic'],
    benefits: ['taste', 'health', 'experience', 'satisfaction', 'discovery'],
    keywords: ['food', 'gourmet', 'organic', 'artisan', 'delicious', 'natural']
  },

  // 🎮 GAMING
  gaming: {
    id: 'gaming',
    name: 'Gaming & Entertainment',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Level up your gaming with {productName}',
        body: '{productName} delivers {performance} for {gameType}. Features {feature1} and {feature2}.',
        cta: 'Game on',
        powerWords: ['responsive', 'immersive', 'competitive']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The gear that separates winners from the rest',
        body: 'Built for {esports} with {technology}. {responsiveness}. {comfort}. {customization}. Used by {proPlayer}. {testimonial}. {warranty}.',
        cta: 'Dominate the competition',
        powerWords: ['esports-grade', 'tournament-ready', 'pro-level', 'competitive']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The same setup used by {championTeam} to win {tournament}',
        body: 'Engineered with {proTechnology} and tested by {esportsPros}. {specs}. {customization}. Includes {coaching}, {teamAccess}, and {exclusiveSkins}. {proEndorsement}. {championshipGuarantee}.',
        cta: 'Join the pro team - exclusive access',
        powerWords: ['championship-grade', 'esports-proven', 'victory', 'elite', 'professional']
      }
    ],
    features: ['responsive', 'comfortable', 'customizable', 'high performance', 'durable'],
    benefits: ['competitive edge', 'immersion', 'comfort', 'victory', 'experience'],
    keywords: ['gaming', 'esports', 'competitive', 'performance', 'pro', 'tournament']
  },

  // 🎁 GIFTS
  gifts: {
    id: 'gifts',
    name: 'Gifts & Special Occasions',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'The perfect gift for {occasion}',
        body: '{productName} is ideal for {recipient}. {feature}. {giftWrapping}. {personalization}.',
        cta: 'Make someone smile',
        powerWords: ['thoughtful', 'perfect', 'memorable']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The gift they will remember long after {occasion} is over',
        body: 'Curated for {recipientType} with {meaning}. {quality}. {presentation}. {personalization}. {testimonial}. {satisfactionGuarantee}.',
        cta: 'Give unforgettable',
        powerWords: ['thoughtful', 'meaningful', 'luxurious', 'curated']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The gifting service trusted by {celebrity} and luxury concierge services',
        body: 'Selected by {giftCurators} for {prestigeClients}. {rareFind}. {bespokePackaging}. {handwrittenNote}. Includes {concierge}, {delivery}, and {followUp}. {exclusiveCollection}. {membershipBenefits}.',
        cta: 'Experience white-glove gifting - concierge service',
        powerWords: ['bespoke', 'curated', 'luxury', 'concierge', 'exclusive']
      }
    ],
    features: ['gift ready', 'personalizable', 'meaningful', 'high quality', 'beautiful packaging'],
    benefits: ['joy', 'connection', 'appreciation', 'memorable', 'thoughtfulness'],
    keywords: ['gift', 'present', 'special', 'thoughtful', 'unique', 'memorable']
  },

  // 🏥 HEALTH
  health: {
    id: 'health',
    name: 'Health & Wellness',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Support your {healthGoal} with {productName}',
        body: '{productName} helps with {benefit}. Made with {ingredient}. {usage}.',
        cta: 'Start your wellness journey',
        powerWords: ['natural', 'effective', 'healthy']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The wellness solution {healthPros} recommend',
        body: 'Formulated with {scienceBacked} ingredients for {specificBenefit}. {clinicalEvidence}. {quality}. {testimonial}. {guarantee}.',
        cta: 'Invest in your health',
        powerWords: ['clinically-proven', 'doctor-recommended', 'therapeutic', 'wellness']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The integrative health protocol used by {wellnessRetreat} and {celebrity}',
        body: 'Developed with {functionalMedicine} practitioners. {holisticApproach}. {premiumIngredients}. {testing}. Includes {consultation}, {protocol}, and {tracking}. {professionalOversight}. {resultsGuarantee}.',
        cta: 'Begin your transformation - medical consultation included',
        powerWords: ['medical-grade', 'integrative', 'functional', 'therapeutic', 'transformation']
      }
    ],
    features: ['natural', 'effective', 'clinically tested', 'safe', 'quality'],
    benefits: ['health', 'wellness', 'vitality', 'prevention', 'quality of life'],
    keywords: ['health', 'wellness', 'natural', 'supplement', 'vitamin', 'organic']
  },

  // 🎵 MUSIC
  music: {
    id: 'music',
    name: 'Musical Instruments',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Start your musical journey with {productName}',
        body: '{productName} is perfect for {skillLevel}. Features {feature}. {soundQuality}.',
        cta: 'Make music today',
        powerWords: ['quality', 'responsive', 'inspiring']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The instrument that grows with you from beginner to pro',
        body: 'Crafted with {materials} for {tone}. {playability}. {durability}. Used by {artistType}. {testimonial}. {warranty}.',
        cta: 'Elevate your music',
        powerWords: ['professional', 'concert-grade', 'resonant', 'expressive']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The same {instrument} played by {famousMusician} on {famousAlbum}',
        body: 'Handcrafted by {masterLuthier} using {rareWood}. {construction}. {toneWood}. {setup}. Includes {lessons}, {masterclass}, and {collectorCertificate}. {artistEndorsement}. {investmentValue}.',
        cta: 'Own a masterpiece - master luthier consultation',
        powerWords: ['masterpiece', 'concert-hall', 'virtuoso', 'collectible', 'heritage']
      }
    ],
    features: ['quality tone', 'durable', 'responsive', 'beautiful', 'professional'],
    benefits: ['musical expression', 'skill development', 'joy', 'creativity', 'artistry'],
    keywords: ['music', 'instrument', 'guitar', 'piano', 'professional', 'acoustic']
  },

  // 📸 PHOTOGRAPHY
  photography: {
    id: 'photography',
    name: 'Photography & Video',
    templates: [
      {
        tier: 'free',
        wordCount: 80,
        hook: 'Capture perfect moments with {productName}',
        body: '{productName} delivers {quality} for {useCase}. Features {feature}. {compatibility}.',
        cta: 'Start creating',
        powerWords: ['sharp', 'versatile', 'creative']
      },
      {
        tier: 'pro',
        wordCount: 150,
        hook: 'The gear that turns snapshots into art',
        body: 'Built with {optics} and {sensor}. {imageQuality}. {lowLight}. {videoCapability}. {stabilization}. Used by {photographerType}. {testimonial}. {warranty}.',
        cta: 'Create professional content',
        powerWords: ['professional-grade', 'cinematic', 'stunning', 'creator-essential']
      },
      {
        tier: 'agency',
        wordCount: 300,
        hook: 'The same equipment used by {famousPhotographer} for {iconicShoot}',
        body: 'Engineered with {opticalEngineering} and {sensorTechnology}. {professionalSpecs}. {colorScience}. {customization}. Includes {workshopAccess}, {mentorship}, and {professionalNetwork}. {masterEndorsement}. {equipmentInsurance}.',
        cta: 'Join the master photographers - exclusive access',
        powerWords: ['cinema-grade', 'broadcast-quality', 'master', 'professional', 'exclusive']
      }
    ],
    features: ['high resolution', 'fast autofocus', 'stabilization', '4K video', 'professional'],
    benefits: ['creative freedom', 'professional results', 'content quality', 'artistic expression', 'monetization'],
    keywords: ['camera', 'lens', 'photography', 'video', 'content creator', 'professional']
  }
};

