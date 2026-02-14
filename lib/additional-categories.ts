/**
 * DescriptAI - 20 Additional Product Categories
 * Expands from 9 → 29 categories
 * Electronics: +12 | Fashion: +5 | Home: +3
 */

import { ProductIntelligence } from './comprehensive-product-intelligence';

export const AdditionalCategories: Record<string, ProductIntelligence> = {
  // 📱 ELECTRONICS (12 new categories)
  tablets: {
    id: 'tablets',
    category: 'Electronics',
    subcategory: 'Tablets',
    marketplaces: ['amazon', 'shopify', 'ebay', 'bestbuy'],
    templates: [
      {
        tier: 'free',
        structure: 'portability + display + use_case',
        wordCount: 80,
        hooks: ['Your creative canvas', 'Power in your hands', 'Work and play anywhere'],
        bodyTemplate: '{productName} features {display} display and {processor}. Perfect for {useCase}. {battery} battery life.',
        cta: ['Get creative', 'Shop now'],
        emotionalTriggers: ['creativity', 'freedom'],
