/**
 * DescriptAI - 10 More Product Categories
 * Fashion: +5 | Home: +5
 * Total: 30+ categories
 */

import { ProductIntelligence } from './comprehensive-product-intelligence';

export const MoreCategories: Record<string, ProductIntelligence> = {
  // 👕 FASHION (5 new categories)
  jeans: {
    id: 'jeans',
    category: 'Fashion',
    subcategory: 'Bottoms',
    marketplaces: ['shopify', 'amazon', 'etsy', 'instagram', 'facebook'],
    templates: [
      {
        tier: 'free',
        structure: 'fit + comfort + style',
        wordCount: 80,
        hooks: ['Your perfect fit awaits', 'Denim that moves with you', 'Classic style, modern comfort'],
        bodyTemplate: '{productName} features {fit} fit in {material} denim. {stretch} stretch for comfort. Perfect for {occasion}. Available in {washes}.',
        cta: ['Find your fit', 'Shop denim'],
        emotionalTriggers: ['confidence', 'comfort'],
        powerWords: ['flattering', 'comfortable', 'versatile']
      },
      {
        tier: 'pro',
        structure: 'fit_technology + sustainability + styling + reviews',
        wordCount: 150,
        hooks: ['The jeans that fit like they were made for you', 'Why {number} customers call these their "forever jeans"', 'From desk to dinner: one pair, endless possibilities'],
        bodyTemplate: 'Crafted with {denimTech} and {sustainableMaterial}, {productName} offers {fitBenefit}. {washProcess}. {stylingOptions}. {careInstructions}. {testimonial}.',
        cta: ['Upgrade your denim', 'Find your perfect fit'],
        emotionalTriggers: ['confidence', 'sustainability', 'versatility'],
        powerWords: ['sculpting', 'sustainable', 'premium', 'flawless']
      },
      {
        tier: 'agency',
        structure: 'heritage + craftsmanship + customization + service',
        wordCount: 300,
        hooks: ['The denim that launched {celebrity}\'s style revolution', 'From the mill that invented modern denim', 'Join {number} members in the {brand} denim collective'],
        bodyTemplate: 'Woven at {millLocation} using {heritageMethod}, {productName} features {selvedge} construction. {customizationOptions}. {repairService}. {stylingConsultation}. {exclusiveAccess}.',
        cta: ['Join the collective', 'Denim consultation'],
        emotionalTriggers: ['heritage', 'exclusivity', 'craftsmanship'],
        powerWords: ['selvedge', 'artisanal', 'bespoke', 'heritage']
      }
    ],
    features: ['stretch denim', 'high waist', 'sustainable', 'multiple washes', 'reinforced seams', 'premium hardware'],
    benefits: ['perfect fit', 'all-day comfort', 'lasting quality', 'versatile style', 'confidence'],
    painPoints: ['uncomfortable', 'poor fit', 'fades quickly', 'stretches out', 'cheap feel'],
    keywords: ['jeans', 'denim', 'skinny jeans', 'straight leg', 'high waist', 'sustainable denim'],
    seoTerms: ['best jeans 2024', 'comfortable jeans', 'sustainable denim', 'high waisted jeans'],
    conversionTriggers: ['fit finder quiz', 'free hemming', 'trade-in program', 'bundle with top'],
    socialProofElements: ['fit model approved', '5-star comfort reviews', 'bestseller'],
    platformSpecific: {
      instagram: {
        titleFormat: '{Emoji} {Fit} Jeans | {Brand}',
        descriptionFormat: 'outfit_inspo + fit_details + CTA',
        characterLimits: { title: 30, description: 2200 },
        keywordStrategy: ['denim hashtags', 'style tags', 'fit keywords'],
        formatting: ['outfit grids', 'fit videos', 'styling Reels'],
        bestPractices: ['show fit', 'real customer photos', 'size diversity']
      }
    }
  },

  jackets: {
    id: 'jackets',
    category: 'Fashion',
    subcategory: 'Outerwear',
    marketplaces: ['shopify', 'amazon', 'etsy', 'instagram', 'facebook'],
    templates: [
      {
        tier: 'free',
        structure: 'warmth + style + weather',
        wordCount: 80,
        hooks: ['Weather the storm in style', 'Your new favorite layer', 'Protection meets fashion'],
        bodyTemplate: '{productName} provides {warmth} in {weather} conditions. {material} construction. {feature}. Perfect for {season}.',
        cta: ['Layer up', 'Shop outerwear'],
        emotionalTriggers: ['protection', 'style'],
        powerWords: ['warm', 'stylish', 'durable']
      },
      {
        tier: 'pro',
        structure: 'weather_protection + materials + versatility + reviews',
        wordCount: 150,
        hooks: ['The jacket that makes winter your favorite season', 'Why outdoor enthusiasts choose {productName}', 'From city streets to mountain peaks'],
        bodyTemplate: 'Built with {material} and {insulation}, {productName} withstands {temperature}. {waterResistance}. {pockets}. {adjustability}. {testimonial}.',
        cta: ['Conquer the cold', 'Upgrade your outerwear'],
        emotionalTriggers: ['adventure', 'protection', 'style'],
        powerWords: ['weatherproof', 'technical', 'versatile', 'premium']
      },
      {
        tier: 'agency',
        structure: 'expedition_grade + materials + customization + service',
        wordCount: 300,
        hooks: ['The jacket that summited {famousPeak}', 'Trusted by {expeditionTeam} for extreme conditions', 'Join the expedition elite'],
        bodyTemplate: 'Engineered with {technicalFabric} and {insulationTech}. {testing}. {customization}. Includes {repairService}, {weatherConsultation}, and {expeditionSupport}.',
        cta: ['Expedition ready', 'Technical consultation'],
        emotionalTriggers: ['adventure', 'professional pride', 'exclusivity'],
        powerWords: ['expedition-grade', 'technical', 'alpine', 'professional']
      }
    ],
    features: ['waterproof', 'breathable', 'insulated', 'multiple pockets', 'adjustable hood', 'reflective details'],
    benefits: ['weather protection', 'style', 'comfort', 'durability', 'versatility'],
    painPoints: ['not warm enough', 'bulky', 'not waterproof', 'poor fit', 'cheap zippers'],
    keywords: ['jacket', 'coat', 'winter jacket', 'rain jacket', 'puffer', 'technical outerwear'],
    seoTerms: ['best winter jacket', 'waterproof jacket', 'insulated coat', 'technical jacket'],
    conversionTriggers: ['weather guarantee', 'free alterations', 'layering guide', 'expedition bundle'],
    socialProofElements: ['mountain guide approved', 'expedition tested', '5-star warmth reviews'],
    platformSpecific: {
      amazon: {
        titleFormat: '{Brand} {Type} Jacket - {Material} - {Weather}',
        descriptionFormat: 'weather_rating + features + care',
        characterLimits: { title: 200, description: 2000 },
        keywordStrategy: ['weather terms', 'activity keywords'],
        formatting: ['HTML', 'bullets', 'tables'],
        bestPractices: ['show temperature rating', 'mention waterproofing']
      }
    }
  },

  activewear: {
    id: 'activewear',
    category: 'Fashion',
    subcategory: 'Athletic',
    marketplaces: ['shopify', 'amazon', 'instagram', 'tiktok', 'facebook'],
    templates: [
      {
        tier: 'free',
        structure: 'performance + comfort + style',
        wordCount: 80,
        hooks: ['Move in comfort', 'Performance meets style', 'Your workout upgrade'],
        bodyTemplate: '{productName} features {fabric} for {performance}. {moistureWicking}. {stretch}. Perfect for {activity}.',
        cta: ['Train better', 'Shop activewear'],
        emotionalTriggers: ['performance', 'confidence'],
        powerWords: ['performance', 'comfortable', 'stylish']
      },
      {
        tier: 'pro',
        structure: 'technology + performance + versatility + reviews',
        wordCount: 150,
        hooks: ['The gear that keeps up with your hardest workout', 'Why athletes are switching to {productName}', 'From gym to street: seamless transition'],
        bodyTemplate: 'Engineered with {fabricTech} for {performanceBenefit}. {compression}. {breathability}. {pockets}. {testimonial}.',
        cta: ['Elevate your training', 'Performance upgrade'],
        emotionalTriggers: ['performance', 'achievement', 'style'],
        powerWords: ['performance-grade', 'technical', 'compression', 'breathable']
      },
      {
        tier: 'agency',
        structure: 'biomechanics + materials + team + service',
        wordCount: 300,
        hooks: ['The same gear training {olympicTeam}', 'Developed with sports scientists', 'Join the athlete performance network'],
        bodyTemplate: 'Designed using {biomechanics} and {fabricScience}. {testing}. {customization}. Includes {teamAccess}, {coaching}, and {performanceTracking}.',
        cta: ['Train like a pro', 'Athlete consultation'],
        emotionalTriggers: ['professional pride', 'performance optimization', 'exclusivity'],
        powerWords: ['Olympic-grade', 'biomechanical', 'professional', 'technical']
      }
    ],
    features: ['moisture wicking', '4-way stretch', 'compression', 'breathable', 'anti-odor', 'UPF protection', 'hidden pockets'],
    benefits: ['performance', 'comfort', 'confidence', 'style', 'durability'],
    painPoints: ['not breathable', 'see-through', 'uncomfortable', 'poor fit', 'retains odor'],
    keywords: ['activewear', 'leggings', 'sports bra', 'gym wear', 'yoga pants', 'compression'],
    seoTerms: ['best workout clothes', 'moisture wicking', 'compression leggings', 'gym wear'],
    conversionTriggers: ['fit guarantee', 'athlete discount', 'training plan included', 'team bundle'],
    socialProofElements: ['athlete worn', 'trainer recommended', '5-star performance reviews'],
    platformSpecific: {
      tiktok: {
        titleFormat: '{Hook} 💪 {Product}',
        descriptionFormat: 'workout_demo + performance_test + CTA',
        characterLimits: { title: 50, description: 500 },
        keywordStrategy: ['fitness trends', 'workout hashtags'],
        formatting: ['workout videos', 'transformation content', 'challenges'],
        bestPractices: ['show movement', 'sweat test', 'squat proof']
      }
    }
  },

  accessories: {
    id: 'accessories',
    category: 'Fashion',
    subcategory: 'Accessories',
    marketplaces: ['shopify', 'etsy', 'amazon', 'instagram', 'facebook'],
    templates: [
      {
        tier: 'free',
        structure: 'style + function + versatility',
        wordCount: 80,
        hooks: ['Complete your look', 'The perfect finishing touch', 'Style in the details'],
        bodyTemplate: '{productName} adds {style} to any outfit. {material} construction. {feature}. Perfect for {occasion}.',
        cta: ['Accessorize', 'Shop now'],
        emotionalTriggers: ['style', 'completion'],
        powerWords: ['stylish', 'versatile', 'elegant']
      },
      {
        tier: 'pro',
        structure: 'craftsmanship + versatility + gifting + reviews',
        wordCount: 150,
        hooks: ['The accessory that elevates every outfit', 'Why stylists recommend {productName} to every client', 'From casual to formal: one piece, infinite styles'],
        bodyTemplate: 'Crafted from {material} with {craftsmanship}, {productName} transitions from {occasion1} to {occasion2}. {versatility}. {giftReady}. {testimonial}.',
        cta: ['Elevate your style', 'Complete your look'],
        emotionalTriggers: ['style', 'versatility', 'gift giving'],
        powerWords: ['artisanal', 'versatile', 'elevated', 'timeless']
      },
      {
        tier: 'agency',
        structure: 'heritage + craftsmanship + personalization + service',
        wordCount: 300,
        hooks: ['The accessory worn by {celebrity} at {event}', 'From the atelier that dresses {fashionHouse}', 'Join the style insider circle'],
        bodyTemplate: 'Created by {artisan} using {rareMaterial}. {technique}. {customization}. Includes {stylingService}, {personalization}, and {concierge}.',
        cta: ['Style consultation', 'Bespoke service'],
        emotionalTriggers: ['exclusivity', 'craftsmanship', 'style mastery'],
        powerWords: ['haute', 'bespoke', 'artisanal', 'exclusive']
      }
    ],
    features: ['premium materials', 'handcrafted', 'adjustable', 'versatile', 'gift ready', 'timeless design'],
    benefits: ['style completion', 'versatility', 'gift worthiness', 'quality', 'confidence'],
    painPoints: ['cheap materials', 'poor quality', 'not versatile', 'breaks easily', 'tarnishes'],
    keywords: ['accessories', 'belt', 'scarf', 'hat', 'sunglasses', 'jewelry'],
    seoTerms: ['best accessories', 'designer belt', 'silk scarf', 'statement jewelry'],
    conversionTriggers: ['complete the look', 'gift wrapping', 'stylist consultation', 'loyalty rewards'],
    socialProofElements: ['stylist approved', 'celebrity worn', 'editor favorite'],
    platformSpecific: {
      instagram: {
        titleFormat: '{Emoji} {Accessory} | {Brand}',
        descriptionFormat: 'styling_inspo + outfit_details + CTA',
        characterLimits: { title: 30, description: 2200 },
        keywordStrategy: ['accessory hashtags', 'style tags'],
        formatting: ['flat lays', 'detail shots', 'styling videos'],
        bestPractices: ['show versatility', 'outfit combinations', 'close-ups']
      }
    }
  },

  handbags: {
    id: 'handbags',
    category: 'Fashion',
    subcategory: 'Bags',
    marketplaces: ['shopify', 'amazon', 'etsy', 'instagram', 'facebook'],
    templates: [
      {
        tier: 'free',
        structure: 'style + function + organization',
        wordCount: 80,
        hooks: ['Carry in style', 'Your everyday essential', 'Organization meets fashion'],
        bodyTemplate: '{productName} features {material} with {compartments} compartments. {strap}. Perfect for {useCase}.',
        cta: ['Carry style', 'Shop bags'],
        emotionalTriggers: ['organization', 'style'],
        powerWords: ['stylish', 'functional', 'organized']
      },
      {
        tier: 'pro',
        structure: 'craftsmanship + organization + versatility + reviews',
        wordCount: 150,
        hooks: ['The bag that holds everything (including compliments)', 'Why professionals are switching to {productName}', 'From office to evening: seamless transition'],
        bodyTemplate: 'Crafted from {material} with {construction}, {productName} offers {organization}. {laptopFit}. {versatility}. {testimonial}.',
        cta: ['Upgrade your carry', 'Professional style'],
        emotionalTriggers: ['professionalism', 'organization', 'style'],
        powerWords: ['professional', 'organized', 'versatile', 'premium']
      },
      {
        tier: 'agency',
        structure: 'heritage + craftsmanship + personalization + service',
        wordCount: 300,
        hooks: ['The bag carried by {celebrity} at {event}', 'From the workshop that supplies {luxuryBrand}', 'Join the collector circle'],
        bodyTemplate: 'Handcrafted by {artisan} using {rareMaterial}. {construction}. {hardware}. {customization}. Includes {monogramming}, {careService}, and {concierge}.',
        cta: ['Commission yours', 'Private consultation'],
        emotionalTriggers: ['exclusivity', 'craftsmanship', 'luxury'],
        powerWords: ['haute', 'bespoke', 'artisanal', 'luxury']
      }
    ],
    features: ['genuine leather', 'multiple compartments', 'laptop sleeve', 'adjustable strap', 'water resistant', 'premium hardware'],
    benefits: ['organization', 'style', 'professionalism', 'durability', 'versatility'],
    painPoints: ['poor organization', 'cheap materials', 'uncomfortable strap', 'not durable', 'heavy'],
    keywords: ['handbag', 'tote', 'crossbody', 'backpack', 'designer bag', 'leather bag'],
    seoTerms: ['best handbag', 'leather tote', 'work bag', 'designer handbag'],
    conversionTriggers: ['monogramming', 'care kit included', 'stylist consultation', 'trade-up program'],
    socialProofElements: ['professional favorite', 'editor choice', '5-star reviews'],
    platformSpecific: {
      instagram: {
        titleFormat: '{Emoji} {Style} Bag | {Brand}',
        descriptionFormat: 'what fits_inside + styling + CTA',
        characterLimits: { title: 30, description: 2200 },
        keywordStrategy: ['bag hashtags', 'style tags', 'organization keywords'],
        formatting: ['unboxing', 'what fits', 'outfit pairing'],
        bestPractices: ['show capacity', 'organization details', 'lifestyle shots']
      }
    }
  },

  // 🏠 HOME (5 new categories)
  lighting: {
    id: 'lighting',
    category: 'Home',
    subcategory: 'Lighting',
    marketplaces: ['wayfair', 'amazon', 'shopify', 'etsy', 'instagram'],
    templates: [
      {
        tier: 'free',
        structure: 'ambiance + function + style',
        wordCount: 80,
        hooks: ['Set the mood', 'Light up your life', 'Illuminate your space'],
        bodyTemplate: '{productName} provides {lightType} in {style} design. {brightness}. Perfect for {room}.',
        cta: ['Light up', 'Shop lighting'],
        emotionalTriggers: ['ambiance', 'comfort'],
        powerWords: ['warm', 'stylish', 'functional']
      },
      {
        tier: 'pro',
        structure: 'design + technology + ambiance + reviews',
        wordCount: 150,
        hooks: ['The lighting that transforms your entire room', 'Why interior designers specify {productName}', 'From bright task lighting to cozy ambiance'],
        bodyTemplate: 'Featuring {bulbType} with {technology}, {productName} offers {brightnessOptions}. {dimming}. {smartFeatures}. {designDetails}. {testimonial}.',
        cta: ['Transform your space', 'Designer lighting'],
        emotionalTriggers: ['ambiance', 'design', 'comfort'],
        powerWords: ['designer', 'smart', 'ambient', 'versatile']
      },
      {
        tier: 'agency',
        structure: 'design_philosophy + technology + customization + service',
        wordCount: 300,
        hooks: ['The lighting featured in {designMagazine}', 'Created by {famousDesigner} for {luxuryHotel}', 'Join the design insider circle'],
        bodyTemplate: 'Conceived by {designer} with {lightingPhilosophy}. {materials}. {technology}. {customization}. Includes {designConsultation}, {installation}, and {smartIntegration}.',
        cta: ['Design consultation', 'Bespoke lighting'],
        emotionalTriggers: ['design mastery', 'exclusivity', 'ambiance'],
        powerWords: ['architectural', 'bespoke', 'designer', 'smart']
      }
    ],
    features: ['LED', 'dimmable', 'smart control', 'adjustable color temperature', 'designer styling', 'energy efficient'],
    benefits: ['ambiance', 'function', 'style', 'energy savings', 'comfort'],
    painPoints: ['harsh light', 'not dimmable', 'poor quality', 'difficult installation', 'not bright enough'],
    keywords: ['lighting', 'lamp', 'chandelier', 'pendant', 'smart light', 'LED'],
    seoTerms: ['best lighting', 'smart lamp', 'designer lighting', 'ambient lighting'],
    conversionTriggers: ['room planner', 'bulb bundle', 'installation service', 'design consultation'],
    socialProofElements: ['designer featured', 'magazine approved', 'customer photos'],
    platformSpecific: {
      wayfair: {
        titleFormat: '{Brand} {Type} Light - {Style} - {Material}',
        descriptionFormat: 'design + specs + room_inspiration',
        characterLimits: { title: 100, description: 2000 },
        keywordStrategy: ['room-specific', 'style-based', 'function keywords'],
        formatting: ['room scenes', 'dimension diagrams'],
        bestPractices: ['show scale', 'room inspiration', 'installation info']
      }
    }
  },

  decor: {
    id: 'decor',
    category: 'Home',
    subcategory: 'Decor',
    marketplaces: ['wayfair', 'amazon', 'shopify', 'etsy', 'instagram'],
    templates: [
      {
        tier: 'free',
        structure: 'style + personality + space',
        wordCount: 80,
        hooks: ['Express your style', 'Make it yours', 'Personality for your space'],
        bodyTemplate: '{productName} adds {style} to your {room}. {material} construction. {feature}. Perfect for {aesthetic}.',
        cta: ['Decorate', 'Shop decor'],
        emotionalTriggers: ['self expression', 'pride'],
        powerWords: ['stylish', 'unique', 'personal']
      },
      {
        tier: 'pro',
        structure: 'design + versatility + styling + reviews',
        wordCount: 150,
        hooks: ['The piece that pulls your whole room together', 'Why home stylists recommend {productName}', 'From minimalist to maximalist: versatile style'],
        bodyTemplate: 'Crafted from {material} with {design}, {productName} complements {styleTypes}. {versatility}. {arrangement}. {testimonial}.',
        cta: ['Complete your room', 'Stylist approved'],
        emotionalTriggers: ['pride', 'style', 'completion'],
        powerWords: ['curated', 'versatile', 'designer', 'statement']
      },
      {
        tier: 'agency',
        structure: 'curated + artisan + styling_service + exclusivity',
        wordCount: 300,
        hooks: ['The piece from {celebrity}\'s {room} reveal', 'Curated by {interiorDesigner} for {luxuryBrand}', 'Join the design collector circle'],
        bodyTemplate: 'Sourced from {artisan} with {craftsmanship}. {provenance}. {curationStory}. Includes {stylingService}, {roomDesign}, and {exclusiveAccess}.',
        cta: ['Curated consultation', 'Design service'],
        emotionalTriggers: ['exclusivity', 'curation', 'design mastery'],
        powerWords: ['curated', 'artisanal', 'bespoke', 'collector']
      }
    ],
    features: ['handcrafted', 'unique design', 'premium materials', 'versatile', 'statement piece', 'sustainable'],
    benefits: ['self expression', 'style', 'personality', 'conversation starter', 'pride'],
    painPoints: ['cheap look', 'poor quality', 'not unique', 'clashes with decor', 'overpriced'],
    keywords: ['decor', 'wall art', 'vase', 'sculpture', 'home accessories', 'accent piece'],
    seoTerms: ['best home decor', 'unique wall art', 'designer decor', 'statement piece'],
    conversionTriggers: ['room styling service', 'curated sets', 'design consultation', 'trade program'],
    socialProofElements: ['designer featured', 'magazine spread', 'customer room photos'],
    platformSpecific: {
      instagram: {
        titleFormat: '{Emoji} {Style} Decor | {Brand}',
        descriptionFormat: 'room_reveal + styling_tips + CTA',
        characterLimits: { title: 30, description: 2200 },
        keywordStrategy: ['decor hashtags', 'style tags', 'room keywords'],
        formatting: ['room reveals', 'before/after', 'styling videos'],
        bestPractices: ['show scale', 'room context', 'styling ideas']
      }
    }
  },

  storage: {
    id: 'storage',
    category: 'Home',
    subcategory: 'Storage',
    marketplaces: ['wayfair', 'amazon', 'shopify', 'etsy', 'instagram'],
    templates: [
      {
        tier: 'free',
        structure: 'organization + space + function',
        wordCount: 80,
        hooks: ['Tame the clutter', 'Space for everything', 'Organize in style'],
        bodyTemplate: '{productName} provides {capacity} storage in {style} design. {material}. Perfect for {room}.',
        cta: ['Get organized', 'Shop storage'],
        emotionalTriggers: ['organization', 'peace'],
        powerWords: ['organized', 'functional', 'stylish']
      },
      {
        tier: 'pro',
        structure: 'organization + design + versatility + reviews',
        wordCount: 150,
        hooks: ['The storage that makes organization beautiful', 'Why professional organizers recommend {productName}', 'From chaos to calm: organized living'],
        bodyTemplate: 'Designed with {organizationSystem} and {material}, {productName} holds {capacity}. {versatility}. {accessibility}. {testimonial}.',
        cta: ['Organize beautifully', 'Professional grade'],
        emotionalTriggers: ['organization', 'peace', 'pride'],
        powerWords: ['professional', 'organized', 'versatile', 'efficient']
      },
      {
        tier: 'agency',
        structure: 'system + customization + installation + service',
        wordCount: 300,
        hooks: ['The system used by {professionalOrganizer} for {celebrityClient}', 'From the studio that organizes {fortune500} offices', 'Join the organization elite'],
        bodyTemplate: 'Engineered with {systemDesign} and {materials}. {customization}. {installation}. Includes {organizationConsultation}, {maintenance}, and {exclusiveAccess}.',
        cta: ['System consultation', 'Professional install'],
        emotionalTriggers: ['professional organization', 'mastery', 'exclusivity'],
        powerWords: ['professional', 'bespoke', 'system', 'enterprise']
      }
    ],
    features: ['modular', 'expandable', 'premium materials', 'easy assembly', 'label friendly', 'space efficient'],
    benefits: ['organization', 'space saving', 'peace of mind', 'efficiency', 'aesthetics'],
    painPoints: ['flimsy', 'difficult assembly', 'not enough space', 'ugly', 'poor quality'],
    keywords: ['storage', 'organizer', 'shelf', 'cabinet', 'closet system', 'bins'],
    seoTerms: ['best storage solutions', 'closet organizer', 'space saving', 'home organization'],
    conversionTriggers: ['organization guide', 'installation service', 'bundle deal', 'professional consultation'],
    socialProofElements: ['organizer approved', 'before/after photos', '5-star reviews'],
    platformSpecific: {
      amazon: {
        titleFormat: '{Brand} {Type} Organizer - {Capacity} - {Material}',
        descriptionFormat: 'capacity + features + assembly',
        characterLimits: { title: 200, description: 2000 },
        keywordStrategy: ['organization terms', 'room keywords', 'capacity specs'],
        formatting: ['HTML', 'bullets', 'dimension tables'],
        bestPractices: ['show capacity', 'assembly info', 'room suggestions']
      }
    }
  },

  appliances: {
    id: 'appliances',
    category: 'Home',
    subcategory: 'Appliances',
    marketplaces: ['amazon', 'bestbuy', 'wayfair', 'shopify', 'home depot'],
    templates: [
      {
        tier: 'free',
        structure: 'function + efficiency + design',
        wordCount: 80,
        hooks: ['Work smarter', 'Efficiency meets style', 'Upgrade your home'],
        bodyTemplate: '{productName} delivers {function} with {efficiency}. {feature}. {dimensions}. Perfect for {kitchenSize}.',
        cta: ['Upgrade now', 'Shop appliances'],
        emotionalTriggers: ['efficiency', 'pride'],
        powerWords: ['efficient', 'powerful', 'modern']
      },
      {
        tier: 'pro',
        structure: 'performance + technology + design + reviews',
        wordCount: 150,
        hooks: ['The appliance that makes cooking a joy', 'Why home chefs love {productName}', 'Professional results at home'],
        bodyTemplate: 'Featuring {technology} with {performance}, {productName} offers {features}. {energyRating}. {design}. {testimonial}.',
        cta: ['Cook like a pro', 'Professional grade'],
        emotionalTriggers: ['mastery', 'efficiency', 'pride'],
        powerWords: ['professional', 'efficient', 'smart', 'powerful']
      },
      {
        tier: 'agency',
        structure: 'engineering + smart + service + warranty',
        wordCount: 300,
        hooks: ['The appliance gracing {celebrityChef}\'s kitchen', 'Engineered for {michelinRestaurant} standards', 'Join the culinary elite'],
        bodyTemplate: 'Built with {commercialGrade} components and {smartTechnology}. {performance}. {customization}. Includes {chefConsultation}, {installation}, and {whiteGloveService}.',
        cta: ['Commercial grade', 'Chef consultation'],
        emotionalTriggers: ['professional pride', 'mastery', 'exclusivity'],
        powerWords: ['commercial-grade', 'professional', 'smart', 'premium']
      }
    ],
    features: ['energy efficient', 'smart controls', 'quiet operation', 'stainless steel', 'multiple functions', 'easy clean'],
    benefits: ['efficiency', 'performance', 'style', 'convenience', 'reliability'],
    painPoints: ['noisy', 'inefficient', 'breaks down', 'poor performance', 'difficult to clean'],
    keywords: ['appliance', 'refrigerator', 'dishwasher', 'oven', 'microwave', 'smart appliance'],
    seoTerms: ['best appliances', 'energy efficient', 'smart kitchen', 'quiet dishwasher'],
    conversionTriggers: ['installation included', 'extended warranty', 'trade-in', 'chef consultation'],
    socialProofElements: ['chef approved', 'energy star', 'customer favorite'],
    platformSpecific: {
      amazon: {
        titleFormat: '{Brand} {Appliance} - {Type} - {Size}',
        descriptionFormat: 'specs + features + energy_rating',
        characterLimits: { title: 200, description: 2000 },
        keywordStrategy: ['appliance terms', 'feature keywords', 'size specs'],
        formatting: ['HTML', 'tables', 'bullets'],
        bestPractices: ['show dimensions', 'mention energy rating', 'compare models']
      }
    }
  },

  bathroom: {
    id: 'bathroom',
    category: 'Home',
    subcategory: 'Bathroom',
    marketplaces: ['wayfair', 'amazon', 'shopify', 'home depot', 'lowes'],
    templates: [
      {
        tier: 'free',
        structure: 'comfort + function + style',
        wordCount: 80,
        hooks: ['Spa at home', 'Elevate your routine', 'Bathroom bliss'],
        bodyTemplate: '{productName} brings {comfort} to your bathroom. {material}. {feature}. Perfect for {bathroomSize}.',
        cta: ['Spa upgrade', 'Shop bathroom'],
        emotionalTriggers: ['comfort', 'self care'],
        powerWords: ['luxurious', 'comfortable', 'spa-like']
      },
      {
        tier: 'pro',
        structure: 'luxury + materials + function + reviews',
        wordCount: 150,
        hooks: ['The upgrade that makes every day feel like a spa day', 'Why luxury hotels choose {productName}', 'Transform your bathroom retreat'],
        bodyTemplate: 'Crafted from {material} with {finish}, {productName} offers {comfort}. {function}. {easyCare}. {testimonial}.',
        cta: ['Spa experience', 'Luxury upgrade'],
        emotionalTriggers: ['luxury', 'self care', 'comfort'],
        powerWords: ['spa-grade', 'luxurious', 'premium', 'hotel-quality']
      },
      {
        tier: 'agency',
        structure: 'wellness + materials + customization + service',
        wordCount: 300,
        hooks: ['The fixtures from {luxuryHotel} suites', 'Designed by {spaDesigner} for ultimate relaxation', 'Join the wellness sanctuary circle'],
        bodyTemplate: 'Created with {wellnessMaterials} and {aromatherapy}. {hydrotherapy}. {customization}. Includes {spaConsultation}, {installation}, and {maintenance}.',
        cta: ['Wellness consultation', 'Sanctuary design'],
        emotionalTriggers: ['wellness', 'luxury', 'sanctuary'],
        powerWords: ['spa-grade', 'wellness', 'bespoke', 'sanctuary']
      }
    ],
    features: ['premium materials', 'water efficient', 'easy clean', 'spa features', 'modern design', 'durable finish'],
    benefits: ['comfort', 'relaxation', 'style', 'hygiene', 'durability'],
    painPoints: ['poor quality', 'difficult to clean', 'not durable', 'cheap look', 'plumbing issues'],
    keywords: ['bathroom', 'towels', 'shower', 'faucet', 'vanity', 'spa'],
    seoTerms: ['best bathroom', 'luxury towels', 'spa shower', 'modern bathroom'],
    conversionTriggers: ['spa package', 'installation service', 'design consultation', 'trade program'],
    socialProofElements: ['hotel supplier', 'spa approved', '5-star reviews'],
    platformSpecific: {
      wayfair: {
        titleFormat: '{Brand} {Product} - {Material} - {Style}',
        descriptionFormat: 'luxury_features + care + installation',
        characterLimits: { title: 100, description: 2000 },
        keywordStrategy: ['bathroom terms', 'luxury keywords', 'material specs'],
        formatting: ['lifestyle images', 'dimension diagrams'],
        bestPractices: ['show scale', 'spa context', 'care instructions']
      }
    }
  }
};

