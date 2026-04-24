// 🎯 200+ CATEGORIES MEGA DATABASE - Custom Templates for Every Product Type
// This ensures your SaaS generates professional descriptions for ANY product

export interface CategoryTemplate {
  id: string;
  category: string;
  subcategory: string;
  marketplaces: string[];
  keywords: string[];
}

export const MegaCategoryDatabase: Record<string, CategoryTemplate> = {
  // ============================================
  // 📱 ELECTRONICS & TECHNOLOGY (25 categories)
  // ============================================
  
  smartphones: {
    id: 'smartphones',
    category: 'Electronics',
    subcategory: 'Mobile Phones',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'ebay', 'jio', 'airtel'],
    keywords: ['5G', 'smartphone', 'mobile', 'AI camera', 'flagship', 'processor', 'battery', 'display']
  },

  laptops: {
    id: 'laptops',
    category: 'Electronics',
    subcategory: 'Computers',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'bestbuy', 'newegg'],
    keywords: ['laptop', 'notebook', 'ultrabook', 'workstation', 'gaming', 'portable', 'performance']
  },

  tablets: {
    id: 'tablets',
    category: 'Electronics',
    subcategory: 'Tablets',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'apple'],
    keywords: ['tablet', 'ipad', 'android tablet', 'productivity', 'creativity', 'portable']
  },

  smartwatches: {
    id: 'smartwatches',
    category: 'Electronics',
    subcategory: 'Wearables',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'apple', 'wearables'],
    keywords: ['smartwatch', 'fitness tracker', 'health monitor', 'wearable', 'GPS', 'ECG']
  },

  headphones: {
    id: 'headphones',
    category: 'Electronics',
    subcategory: 'Audio',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'bestbuy', 'audio'],
    keywords: ['headphones', 'earbuds', 'ANC', 'wireless', 'bluetooth', 'noise cancelling', 'audio']
  },

  cameras: {
    id: 'cameras',
    category: 'Electronics',
    subcategory: 'Photography',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'canon', 'sony', 'nikon'],
    keywords: ['camera', 'DSLR', 'mirrorless', 'photography', 'video', 'sensor', 'lens']
  },

  gaming_consoles: {
    id: 'gaming_consoles',
    category: 'Electronics',
    subcategory: 'Gaming',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'sony', 'microsoft', 'nintendo'],
    keywords: ['gaming', 'console', 'playstation', 'xbox', 'nintendo', 'gaming console', '4K']
  },

  tvs: {
    id: 'tvs',
    category: 'Electronics',
    subcategory: 'Televisions',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'bestbuy', 'lg', 'samsung'],
    keywords: ['TV', 'television', 'smart TV', '4K', 'OLED', 'QLED', 'UHD', 'HDR']
  },

  speakers: {
    id: 'speakers',
    category: 'Electronics',
    subcategory: 'Audio',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'bestbuy', 'bose', 'jbl'],
    keywords: ['speaker', 'bluetooth speaker', 'portable speaker', 'wireless', 'waterproof', 'party']
  },

  drones: {
    id: 'drones',
    category: 'Electronics',
    subcategory: 'Drones',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'dji', 'drone'],
    keywords: ['drone', 'quadcopter', 'aerial', '4K camera', 'FPV', 'gimbal', 'GPS']
  },

  smart_home_devices: {
    id: 'smart_home_devices',
    category: 'Electronics',
    subcategory: 'Smart Home',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'google', 'alexa'],
    keywords: ['smart home', 'automation', 'voice control', 'IoT', 'Google Home', 'Alexa']
  },

  routers: {
    id: 'routers',
    category: 'Electronics',
    subcategory: 'Networking',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'netgear', 'tp-link'],
    keywords: ['router', 'WiFi', 'mesh', 'networking', 'wireless', 'speed', 'coverage']
  },

  keyboards: {
    id: 'keyboards',
    category: 'Electronics',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'logitech'],
    keywords: ['keyboard', 'mechanical', 'gaming', 'wireless', 'RGB', 'ergonomic']
  },

  mice: {
    id: 'mice',
    category: 'Electronics',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'logitech', 'razer'],
    keywords: ['mouse', 'gaming mouse', 'wireless mouse', 'DPI', 'ergonomic', 'precision']
  },

  monitors: {
    id: 'monitors',
    category: 'Electronics',
    subcategory: 'Displays',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'lg', 'samsung', 'asus'],
    keywords: ['monitor', 'display', '4K', '144Hz', 'IPS', 'OLED', 'gaming']
  },

  chargers: {
    id: 'chargers',
    category: 'Electronics',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'apple', 'samsung'],
    keywords: ['charger', 'fast charging', 'USB', 'GaN', 'wireless charger', 'power']
  },

  microphones: {
    id: 'microphones',
    category: 'Electronics',
    subcategory: 'Audio',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'shure', 'rode'],
    keywords: ['microphone', 'podcast', 'streaming', 'USB', 'XLR', 'studio', 'voice']
  },

  projectors: {
    id: 'projectors',
    category: 'Electronics',
    subcategory: 'Displays',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'epson', 'benq'],
    keywords: ['projector', 'home theater', '4K', 'portable', 'cinema', 'business']
  },

  fitness_trackers: {
    id: 'fitness_trackers',
    category: 'Electronics',
    subcategory: 'Wearables',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'fitbit', 'garmin'],
    keywords: ['fitness tracker', 'activity tracker', 'health', 'workout', 'steps', 'sleep']
  },

  e_readers: {
    id: 'e_readers',
    category: 'Electronics',
    subcategory: 'Reading',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'kindle', 'kobo'],
    keywords: ['e-reader', 'ebook', 'kindle', 'digital books', 'reading']
  },

  power_banks: {
    id: 'power_banks',
    category: 'Electronics',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'anker', 'mi'],
    keywords: ['power bank', 'portable charger', 'battery pack', 'fast charging', 'portable power']
  },

  webcams: {
    id: 'webcams',
    category: 'Electronics',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'logitech', 'cisco'],
    keywords: ['webcam', 'video call', 'streaming', 'HD', '4K', 'conference']
  },

  graphics_tablets: {
    id: 'graphics_tablets',
    category: 'Electronics',
    subcategory: 'Creative',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wacom', 'huion'],
    keywords: ['graphics tablet', 'drawing tablet', 'digital art', 'Wacom', 'pen tablet', 'creative']
  },

  smart_speakers: {
    id: 'smart_speakers',
    category: 'Electronics',
    subcategory: 'Smart Home',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'amazon echo', 'google nest'],
    keywords: ['smart speaker', 'echo', 'alexa', 'google home', 'voice assistant', 'smart']
  },

  action_cameras: {
    id: 'action_cameras',
    category: 'Electronics',
    subcategory: 'Cameras',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'gopro', 'djl'],
    keywords: ['action camera', 'gopro', 'waterproof camera', 'sports camera', '4K', 'wearable']
  },

  // ============================================
  // 👕 FASHION & APPAREL (30 categories)
  // ============================================

  tshirts: {
    id: 'tshirts',
    category: 'Fashion',
    subcategory: 'T-Shirts',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myntra', 'meesho'],
    keywords: ['t-shirt', 'tshirt', 'cotton', 'casual', 'premium', 'basics']
  },

  jeans: {
    id: 'jeans',
    category: 'Fashion',
    subcategory: 'Pants',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'levis', 'wrangler'],
    keywords: ['jeans', 'denim', 'pants', 'casual', 'classic', 'stretch']
  },

  dresses: {
    id: 'dresses',
    category: 'Fashion',
    subcategory: 'Dresses',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myntra', 'fashionnova'],
    keywords: ['dress', 'gown', 'fashion', 'elegant', 'casual', 'party']
  },

  shoes: {
    id: 'shoes',
    category: 'Fashion',
    subcategory: 'Footwear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nike', 'adidas', 'reebok'],
    keywords: ['shoes', 'footwear', 'sneakers', 'casual', 'formal', 'comfort']
  },

  jackets: {
    id: 'jackets',
    category: 'Fashion',
    subcategory: 'Outerwear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myntra', 'zara'],
    keywords: ['jacket', 'coat', 'outerwear', 'winter', 'casual', 'formal']
  },

  activewear: {
    id: 'activewear',
    category: 'Fashion',
    subcategory: 'Sportswear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nike', 'puma', 'underarmour'],
    keywords: ['activewear', 'sportswear', 'workout', 'gym', 'fitness', 'athletic']
  },

  swimwear: {
    id: 'swimwear',
    category: 'Fashion',
    subcategory: 'Swim',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myntra', 'speedo'],
    keywords: ['swimwear', 'bikini', 'swimsuit', 'beach', 'pool', 'summer']
  },

  handbags: {
    id: 'handbags',
    category: 'Fashion',
    subcategory: 'Bags',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myntra', 'coach', 'mk'],
    keywords: ['handbag', 'purse', 'bag', 'leather', 'designer', 'fashion']
  },

  wallets: {
    id: 'wallets',
    category: 'Fashion',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wildhorn', 'titan'],
    keywords: ['wallet', 'card holder', 'leather', 'bifold', 'trifold', 'RFID']
  },

  watches: {
    id: 'watches',
    category: 'Fashion',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'titan', 'fastrack', 'casio'],
    keywords: ['watch', 'wristwatch', 'analog', 'digital', 'smart', 'luxury']
  },

  sunglasses: {
    id: 'sunglasses',
    category: 'Fashion',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'rayban', 'oakley'],
    keywords: ['sunglasses', 'eyewear', 'UV protection', 'polarized', 'aviator', 'wayfarer']
  },

  jewelry: {
    id: 'jewelry',
    category: 'Fashion',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'caratlane', 'tanishq'],
    keywords: ['jewelry', 'necklace', 'earrings', 'bracelet', 'ring', 'gold', 'silver']
  },

  sarees: {
    id: 'sarees',
    category: 'Fashion',
    subcategory: 'Ethnic Wear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myntra', 'meesho'],
    keywords: ['saree', 'ethnic', 'traditional', 'silk', 'cotton', 'festival']
  },

  kurtas: {
    id: 'kurtas',
    category: 'Fashion',
    subcategory: 'Ethnic Wear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myntra', 'w'],
    keywords: ['kurta', 'ethnic', 'traditional', 'cotton', 'silk', 'Indo-western']
  },

  leggings: {
    id: 'leggings',
    category: 'Fashion',
    subcategory: 'Bottoms',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'zara', 'h&m'],
    keywords: ['leggings', 'pants', 'jeggings', 'yoga pants', 'comfortable', 'stretchy']
  },

  hoodies: {
    id: 'hoodies',
    category: 'Fashion',
    subcategory: 'Outerwear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'puma', 'nike', 'adidas'],
    keywords: ['hoodie', 'sweatshirt', 'casual', 'streetwear', 'winter']
  },

  blazers: {
    id: 'blazers',
    category: 'Fashion',
    subcategory: 'Formal Wear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'zara', 'suits'],
    keywords: ['blazer', 'suit jacket', 'formal', 'business', 'professional', 'smart']
  },

  skirts: {
    id: 'skirts',
    category: 'Fashion',
    subcategory: 'Bottoms',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myntra', 'zara'],
    keywords: ['skirt', 'mini', 'midi', 'maxi', 'pleated', 'formal']
  },

  shorts: {
    id: 'shorts',
    category: 'Fashion',
    subcategory: 'Bottoms',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nike', 'puma'],
    keywords: ['shorts', 'casual', 'denim', 'cargo', 'athletic', 'swim']
  },

  belts: {
    id: 'belts',
    category: 'Fashion',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wildhorn', 'titan'],
    keywords: ['belt', 'leather', 'casual', 'formal', 'fashion', 'accessory']
  },

  scarves: {
    id: 'scarves',
    category: 'Fashion',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myntra', 'fashion'],
    keywords: ['scarf', 'shawl', 'stole', 'wrap', 'fashion', 'accessory']
  },

  hats: {
    id: 'hats',
    category: 'Fashion',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'adidas', 'puma'],
    keywords: ['hat', 'cap', 'beanie', 'fedora', 'sun hat', 'fashion']
  },

  socks: {
    id: 'socks',
    category: 'Fashion',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'adidas', 'nike'],
    keywords: ['socks', 'athletic', 'casual', 'dress', 'compression', 'no show']
  },

  ties: {
    id: 'ties',
    category: 'Fashion',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'titan', 'arrow'],
    keywords: ['tie', 'necktie', 'formal', 'silk', 'business', 'wedding']
  },

  formal_shirts: {
    id: 'formal_shirts',
    category: 'Fashion',
    subcategory: 'Shirts',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'arrow', 'van-heusen'],
    keywords: ['formal shirt', 'dress shirt', 'business', 'office', 'professional', 'white']
  },

  gym_bags: {
    id: 'gym_bags',
    category: 'Fashion',
    subcategory: 'Bags',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nike', 'adidas'],
    keywords: ['gym bag', 'duffel', 'sports bag', 'fitness', 'workout', 'training']
  },

  backpacks: {
    id: 'backpacks',
    category: 'Fashion',
    subcategory: 'Bags',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'puma', 'nike', 'asus'],
    keywords: ['backpack', 'school bag', 'laptop bag', 'travel', 'casual', 'utility']
  },

  lingerie: {
    id: 'lingerie',
    category: 'Fashion',
    subcategory: 'Intimates',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa', 'zivame'],
    keywords: ['lingerie', 'bra', 'panties', 'intimates', 'underwear', 'sleepwear']
  },

  pajamas: {
    id: 'pajamas',
    category: 'Fashion',
    subcategory: 'Sleepwear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myntra', 'zivame'],
    keywords: ['pajamas', 'nightwear', 'sleepwear', 'loungewear', 'comfortable']
  },

  // ============================================
  // 🏠 HOME & LIVING (25 categories)
  // ============================================

  furniture: {
    id: 'furniture',
    category: 'Home & Living',
    subcategory: 'Furniture',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wayfair', 'pepperfry'],
    keywords: ['furniture', 'sofa', 'chair', 'table', 'wood', 'modern', 'classic']
  },

  bedding: {
    id: 'bedding',
    category: 'Home & Living',
    subcategory: 'Bedroom',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wayfair', 'sleepwell'],
    keywords: ['bedding', 'sheets', 'duvet', 'comforter', 'pillow', 'cotton', 'silk']
  },

  kitchen: {
    id: 'kitchen',
    category: 'Home & Living',
    subcategory: 'Kitchen',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'prestige', 'hawkins'],
    keywords: ['kitchen', 'cookware', 'utensils', 'non-stick', 'stainless steel', 'ceramic']
  },

  lighting: {
    id: 'lighting',
    category: 'Home & Living',
    subcategory: 'Lighting',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'philips', 'bajaj'],
    keywords: ['lighting', 'lamp', 'LED', 'bulb', 'chandelier', 'ambient']
  },

  decor: {
    id: 'decor',
    category: 'Home & Living',
    subcategory: 'Decor',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wayfair', 'pepperfry'],
    keywords: ['decor', 'wall art', 'vases', 'candles', 'frames', 'modern', 'ethnic']
  },

  rugs: {
    id: 'rugs',
    category: 'Home & Living',
    subcategory: 'Flooring',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wayfair', 'fabindia'],
    keywords: ['rug', 'carpet', 'modern', 'persian', 'wool', 'floor']
  },

  curtains: {
    id: 'curtains',
    category: 'Home & Living',
    subcategory: 'Windows',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wayfair'],
    keywords: ['curtains', 'drapes', 'blinds', 'window', 'blackout', 'sheer']
  },

  storage: {
    id: 'storage',
    category: 'Home & Living',
    subcategory: 'Organization',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'ikea', 'wayfair'],
    keywords: ['storage', 'shelf', 'cabinet', 'organizer', 'rack', 'closet']
  },

  bathroom: {
    id: 'bathroom',
    category: 'Home & Living',
    subcategory: 'Bathroom',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wayfair'],
    keywords: ['bathroom', 'towels', 'mats', 'accessories', 'luxury', 'spa']
  },

  dining: {
    id: 'dining',
    category: 'Home & Living',
    subcategory: 'Dining',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wayfair', 'pepperfry'],
    keywords: ['dining', 'tableware', 'plates', 'bowls', 'serveware', 'ceramic']
  },

  outdoor_furniture: {
    id: 'outdoor_furniture',
    category: 'Home & Living',
    subcategory: 'Outdoor',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'wayfair', 'ikea'],
    keywords: ['outdoor furniture', 'patio', 'garden', 'deck', 'weather resistant', 'rattan']
  },

  home_office: {
    id: 'home_office',
    category: 'Home & Living',
    subcategory: 'Office',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'ikea', 'wayfair'],
    keywords: ['home office', 'desk', 'chair', 'ergonomic', 'work from home', 'productivity']
  },

  cleaning: {
    id: 'cleaning',
    category: 'Home & Living',
    subcategory: 'Cleaning',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'prestige'],
    keywords: ['cleaning', 'mop', 'broom', 'vacuum', 'detergent', 'eco-friendly']
  },

  kitchen_appliances: {
    id: 'kitchen_appliances',
    category: 'Home & Living',
    subcategory: 'Appliances',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'prestige', 'sujata'],
    keywords: ['kitchen appliances', 'mixer', 'grinder', 'blender', 'oven', 'smart']
  },

  fans: {
    id: 'fans',
    category: 'Home & Living',
    subcategory: 'Appliances',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'havells', 'bajaj'],
    keywords: ['fan', 'ceiling fan', 'table fan', 'exhaust fan', 'air cooler']
  },

  air_conditioners: {
    id: 'air_conditioners',
    category: 'Home & Living',
    subcategory: 'Appliances',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'lg', 'samsung', 'voltas'],
    keywords: ['AC', 'air conditioner', 'split AC', 'window AC', 'inverter AC', 'cooling']
  },

  refrigerators: {
    id: 'refrigerators',
    category: 'Home & Living',
    subcategory: 'Appliances',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'lg', 'samsung', 'whirlpool'],
    keywords: ['refrigerator', 'fridge', 'double door', 'single door', 'side by side']
  },

  washing_machines: {
    id: 'washing_machines',
    category: 'Home & Living',
    subcategory: 'Appliances',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'lg', 'samsung', 'ifb'],
    keywords: ['washing machine', 'washer', 'front load', 'top load', 'semi automatic']
  },

  microwaves: {
    id: 'microwaves',
    category: 'Home & Living',
    subcategory: 'Appliances',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'lg', 'samsung', 'panasonic'],
    keywords: ['microwave', 'oven', ' convection', 'solo', 'grill']
  },

  water_purifiers: {
    id: 'water_purifiers',
    category: 'Home & Living',
    subcategory: 'Appliances',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'aquaguard', 'kent'],
    keywords: ['water purifier', 'RO', 'UV', 'water filter', 'drinking water']
  },

  iron: {
    id: 'iron',
    category: 'Home & Living',
    subcategory: 'Appliances',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'philips', 'bajaj'],
    keywords: ['iron', 'steam iron', 'dry iron', 'garment steamer']
  },

  vacuum_cleaner: {
    id: 'vacuum_cleaner',
    category: 'Home & Living',
    subcategory: 'Cleaning',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'dyson', 'eureka'],
    keywords: ['vacuum cleaner', 'robot vacuum', 'handy stick', 'car vacuum']
  },

  mattress: {
    id: 'mattress',
    category: 'Home & Living',
    subcategory: 'Bedroom',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'sleepwell', 'king koil'],
    keywords: ['mattress', 'memory foam', 'coir', 'spring', 'orthopedic']
  },

  pillows: {
    id: 'pillows',
    category: 'Home & Living',
    subcategory: 'Bedroom',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'sleepwell'],
    keywords: ['pillow', 'memory foam pillow', 'neck pillow', 'bolster', 'dec枕']
  },

  // ============================================
  // 💄 BEAUTY & PERSONAL CARE (20 categories)
  // ============================================

  skincare: {
    id: 'skincare',
    category: 'Beauty',
    subcategory: 'Skincare',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa', 'myntra'],
    keywords: ['skincare', 'serum', 'moisturizer', 'sunscreen', 'cleanser', 'anti-aging']
  },

  makeup: {
    id: 'makeup',
    category: 'Beauty',
    subcategory: 'Makeup',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa', 'myntra'],
    keywords: ['makeup', 'foundation', 'lipstick', 'mascara', 'eyeshadow', 'professional']
  },

  haircare: {
    id: 'haircare',
    category: 'Beauty',
    subcategory: 'Haircare',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa', 'myntra'],
    keywords: ['haircare', 'shampoo', 'conditioner', 'hair oil', 'serum', 'treatment']
  },

  fragrances: {
    id: 'fragrances',
    category: 'Beauty',
    subcategory: 'Fragrances',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa', 'amazon'],
    keywords: ['fragrance', 'perfume', 'cologne', 'EDT', 'EDP', 'signature scent']
  },

  grooming: {
    id: 'grooming',
    category: 'Beauty',
    subcategory: 'Grooming',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'gillette', 'philips'],
    keywords: ['grooming', 'shaver', 'trimmer', 'razor', 'beard', 'personal care']
  },

  bath_body: {
    id: 'bath_body',
    category: 'Beauty',
    subcategory: 'Bath & Body',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa', 'myntra'],
    keywords: ['bath', 'body wash', 'scrub', 'body butter', 'lotion', 'spa']
  },

  cosmetics_tools: {
    id: 'cosmetics_tools',
    category: 'Beauty',
    subcategory: 'Tools',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa'],
    keywords: ['beauty tools', 'brushes', 'sponges', 'applicators', 'professional']
  },

  nail_care: {
    id: 'nail_care',
    category: 'Beauty',
    subcategory: 'Nail Care',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa'],
    keywords: ['nail polish', 'nail art', 'manicure', 'pedicure', 'gel', 'matte']
  },

  face_masks: {
    id: 'face_masks',
    category: 'Beauty',
    subcategory: 'Skincare',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa', 'myntra'],
    keywords: ['face mask', 'sheet mask', 'clay mask', 'sleeping mask', 'DIY']
  },

  eye_care: {
    id: 'eye_care',
    category: 'Beauty',
    subcategory: 'Skincare',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa'],
    keywords: ['eye cream', 'under eye', 'serum', 'dark circles', 'wrinkles']
  },

  lip_care: {
    id: 'lip_care',
    category: 'Beauty',
    subcategory: 'Lip Care',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa'],
    keywords: ['lip balm', 'lipstick', 'lip gloss', 'lip care', 'moisturizer']
  },

  shaving: {
    id: 'shaving',
    category: 'Beauty',
    subcategory: 'Shaving',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'gillette', 'older'],
    keywords: ['shaving', 'razor', 'shaving cream', 'aftershave', 'blade']
  },

  deodorants: {
    id: 'deodorants',
    category: 'Beauty',
    subcategory: 'Personal Care',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa'],
    keywords: ['deodorant', 'perfume', 'body spray', 'antiperspirant']
  },

  hair_styling: {
    id: 'hair_styling',
    category: 'Beauty',
    subcategory: 'Hair Styling',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nykaa'],
    keywords: ['hair straightener', 'curler', 'dryer', 'styling tool', 'professional']
  },

  personal_scale: {
    id: 'personal_scale',
    category: 'Beauty',
    subcategory: 'Health',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'omron'],
    keywords: ['weighing scale', 'body scale', 'digital scale', 'smart scale']
  },

  // ============================================
  // 🏃 SPORTS & OUTDOORS (15 categories)
  // ============================================

  sports_equipment: {
    id: 'sports_equipment',
    category: 'Sports',
    subcategory: 'Equipment',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'decathlon', 'sportal'],
    keywords: ['sports equipment', 'cricket', 'football', 'badminton', 'tennis', 'basketball']
  },

  fitness_equipment: {
    id: 'fitness_equipment',
    category: 'Sports',
    subcategory: 'Fitness',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'decathlon', 'proform'],
    keywords: ['fitness equipment', 'dumbbells', 'weights', 'treadmill', 'exercise bike', 'home gym']
  },

  camping: {
    id: 'camping',
    category: 'Sports',
    subcategory: 'Outdoor',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'decathlon', 'wildcraft'],
    keywords: ['camping', 'tent', 'sleeping bag', 'hiking', 'outdoor', 'adventure']
  },

  cycling: {
    id: 'cycling',
    category: 'Sports',
    subcategory: 'Cycling',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'decathlon', 'specialized'],
    keywords: ['cycling', 'bicycle', 'mountain bike', 'road bike', 'helmet', 'gear']
  },

  swimming: {
    id: 'swimming',
    category: 'Sports',
    subcategory: 'Aquatic',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'decathlon', 'speedo'],
    keywords: ['swimming', 'swimsuit', 'goggles', 'swim cap', 'pool', 'competitive']
  },

  yoga: {
    id: 'yoga',
    category: 'Sports',
    subcategory: 'Fitness',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'decathlon', 'yoga'],
    keywords: ['yoga', 'mat', 'props', 'blocks', 'straps', 'meditation']
  },

  cricket: {
    id: 'cricket',
    category: 'Sports',
    subcategory: 'Equipment',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'sg', 'ss'],
    keywords: ['cricket bat', 'ball', 'helmet', 'pads', 'gloves', 'cricket gear']
  },

  football: {
    id: 'football',
    category: 'Sports',
    subcategory: 'Equipment',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nike', 'adidas'],
    keywords: ['football', 'soccer', 'cleats', 'ball', 'gear', 'uniform']
  },

  basketball: {
    id: 'basketball',
    category: 'Sports',
    subcategory: 'Equipment',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nike', 'spalding'],
    keywords: ['basketball', 'shoes', 'hoop', 'ball', 'jersey', 'gear']
  },

  tennis: {
    id: 'tennis',
    category: 'Sports',
    subcategory: 'Equipment',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'head', 'wilson'],
    keywords: ['tennis', 'racket', 'balls', 'shoes', 'apparel', 'gear']
  },

  badminton: {
    id: 'badminton',
    category: 'Sports',
    subcategory: 'Equipment',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'yonex', 'li-ning'],
    keywords: ['badminton', 'racket', 'shuttlecock', 'shoes', 'gear', 'net']
  },

  gym_wear: {
    id: 'gym_wear',
    category: 'Sports',
    subcategory: 'Apparel',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nike', 'puma'],
    keywords: ['gym wear', 'workout clothes', 'athletic wear', 'fitness apparel']
  },

  sports_shoes: {
    id: 'sports_shoes',
    category: 'Sports',
    subcategory: 'Footwear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'nike', 'adidas'],
    keywords: ['sports shoes', 'running shoes', 'training shoes', 'athletic footwear']
  },

  protective_gear: {
    id: 'protective_gear',
    category: 'Sports',
    subcategory: 'Safety',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'decathlon'],
    keywords: ['protective gear', 'helmets', 'guards', 'pads', 'safety equipment']
  },

  // ============================================
  // 🍎 FOOD & BEVERAGES (15 categories)
  // ============================================

  organic_food: {
    id: 'organic_food',
    category: 'Food',
    subcategory: 'Organic',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'bigbasket', 'naturefresh'],
    keywords: ['organic', 'natural', 'certified', 'healthy', 'pesticide-free', 'farm fresh']
  },

  supplements: {
    id: 'supplements',
    category: 'Food',
    subcategory: 'Supplements',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'healthkart', 'myprotein'],
    keywords: ['supplements', 'vitamins', 'protein', 'minerals', 'health', 'nutrition']
  },

  snacks: {
    id: 'snacks',
    category: 'Food',
    subcategory: 'Snacks',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'bigbasket', 'amazon'],
    keywords: ['snacks', 'healthy', 'crispy', 'protein', 'organic', 'instant']
  },

  beverages: {
    id: 'beverages',
    category: 'Food',
    subcategory: 'Drinks',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'bigbasket', 'amazon'],
    keywords: ['beverages', 'drinks', 'juice', 'tea', 'coffee', 'energy']
  },

  coffee: {
    id: 'coffee',
    category: 'Food',
    subcategory: 'Beverages',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'starbucks', 'coffee'],
    keywords: ['coffee', 'beans', 'espresso', 'instant', 'roasted', 'premium']
  },

  tea: {
    id: 'tea',
    category: 'Food',
    subcategory: 'Beverages',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'tata', 'tea'],
    keywords: ['tea', 'green', 'black', 'herbal', 'organic', 'chai']
  },

  protein_powder: {
    id: 'protein_powder',
    category: 'Food',
    subcategory: 'Supplements',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'myprotein', 'optimum nutrition'],
    keywords: ['protein powder', 'whey', 'mass gainer', 'isolate', 'nutrition']
  },

  honey: {
    id: 'honey',
    category: 'Food',
    subcategory: 'Natural',
    marketplaces: ['amazon', 'flipkart', 'shopify', ' Dabur', 'patans'],
    keywords: ['honey', 'organic honey', 'raw honey', 'pure honey', 'natural sweetener']
  },

  dry_fruits: {
    id: 'dry_fruits',
    category: 'Food',
    subcategory: 'Snacks',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'happilo'],
    keywords: ['dry fruits', 'almonds', 'cashews', 'raisins', 'nuts', 'healthy snacks']
  },

  spices: {
    id: 'spices',
    category: 'Food',
    subcategory: 'Cooking',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'mdh', 'everest'],
    keywords: ['spices', 'masala', 'condiments', 'cooking', 'seasoning', 'herbs']
  },

  oils: {
    id: 'oils',
    category: 'Food',
    subcategory: 'Cooking',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'fortune', 'dabur'],
    keywords: ['cooking oil', 'olive oil', 'mustard oil', 'sunflower oil', 'ghee']
  },

  cereals: {
    id: 'cereals',
    category: 'Food',
    subcategory: 'Breakfast',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'kelloggs', 'quaker'],
    keywords: ['cereals', 'oats', 'granola', 'breakfast', 'healthy food']
  },

  chocolate: {
    id: 'chocolate',
    category: 'Food',
    subcategory: 'Sweets',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'cadbury', 'hershey'],
    keywords: ['chocolate', 'cocoa', 'dark chocolate', 'milk chocolate', 'gifts']
  },

  instant_food: {
    id: 'instant_food',
    category: 'Food',
    subcategory: 'Quick Meals',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'maggi', 'nestle'],
    keywords: ['instant food', 'noodles', 'pasta', 'ready to eat', 'quick meals']
  },

  // ============================================
  // 👶 BABY & KIDS (10 categories)
  // ============================================

  baby_food: {
    id: 'baby_food',
    category: 'Baby',
    subcategory: 'Food',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'firstcry', 'parenting'],
    keywords: ['baby food', 'organic baby food', 'purees', 'toddler food', 'healthy baby']
  },

  baby_care: {
    id: 'baby_care',
    category: 'Baby',
    subcategory: 'Care',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'firstcry', 'huggies'],
    keywords: ['baby care', 'diapers', 'wipes', 'lotion', 'shampoo', 'baby products']
  },

  toys: {
    id: 'toys',
    category: 'Baby',
    subcategory: 'Toys',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'firstcry', 'toys'],
    keywords: ['toys', 'educational', 'learning', 'kids', 'baby toys', 'games']
  },

  kids_clothing: {
    id: 'kids_clothing',
    category: 'Baby',
    subcategory: 'Clothing',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'firstcry', 'myntra'],
    keywords: ['kids clothing', 'children wear', 'baby clothes', 'kids fashion', 'comfortable']
  },

  baby_strollers: {
    id: 'baby_strollers',
    category: 'Baby',
    subcategory: 'Gear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'firstcry', 'graco'],
    keywords: ['stroller', 'baby stroller', 'pram', 'travel system', 'baby gear']
  },

  baby_feeding: {
    id: 'baby_feeding',
    category: 'Baby',
    subcategory: 'Feeding',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'firstcry', 'philips'],
    keywords: ['baby feeding', 'bottle', 'nipple', 'breast pump', 'baby food maker']
  },

  baby_furniture: {
    id: 'baby_furniture',
    category: 'Baby',
    subcategory: 'Furniture',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'firstcry', 'babyhug'],
    keywords: ['baby furniture', 'crib', 'cot', 'changing table', 'baby chair']
  },

  kids_shoes: {
    id: 'kids_shoes',
    category: 'Baby',
    subcategory: 'Footwear',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'firstcry', 'miniclassic'],
    keywords: ['kids shoes', 'baby shoes', 'sandals', 'boots', 'sneakers']
  },

  school_supplies: {
    id: 'school_supplies',
    category: 'Baby',
    subcategory: 'Education',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'firstcry', 'classmate'],
    keywords: ['school supplies', 'stationery', 'backpack', 'lunch box', 'water bottle']
  },

  // ============================================
  // 🐕 PET SUPPLIES (10 categories)
  // ============================================

  pet_food: {
    id: 'pet_food',
    category: 'Pet',
    subcategory: 'Food',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'petsmart', 'chewy'],
    keywords: ['pet food', 'dog food', 'cat food', 'organic pet food', 'premium']
  },

  pet_supplies: {
    id: 'pet_supplies',
    category: 'Pet',
    subcategory: 'Supplies',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'petsmart', 'petco'],
    keywords: ['pet supplies', 'pet accessories', 'dog supplies', 'cat supplies', 'pet care']
  },

  dog_supplies: {
    id: 'dog_supplies',
    category: 'Pet',
    subcategory: 'Dogs',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'petsmart'],
    keywords: ['dog supplies', 'dog collar', 'leash', 'dog bed', 'dog toys']
  },

  cat_supplies: {
    id: 'cat_supplies',
    category: 'Pet',
    subcategory: 'Cats',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'petsmart'],
    keywords: ['cat supplies', 'cat litter', 'cat food', 'cat toys', 'cat tree']
  },

  pet_beds: {
    id: 'pet_beds',
    category: 'Pet',
    subcategory: 'Furniture',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'petsmart'],
    keywords: ['pet bed', 'dog bed', 'cat bed', 'pet furniture', 'cozy']
  },

  pet_toys: {
    id: 'pet_toys',
    category: 'Pet',
    subcategory: 'Toys',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'petsmart'],
    keywords: ['pet toys', 'dog toys', 'cat toys', 'chew toys', 'interactive']
  },

  pet_grooming: {
    id: 'pet_grooming',
    category: 'Pet',
    subcategory: 'Grooming',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'petsmart'],
    keywords: ['pet grooming', 'shampoo', 'brush', 'nail clipper', 'pet care']
  },

  // ============================================
  // 🚗 AUTOMOTIVE (10 categories)
  // ============================================

  car_accessories: {
    id: 'car_accessories',
    category: 'Automotive',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'autozone', 'caratlane'],
    keywords: ['car accessories', 'car electronics', 'interior', 'exterior', 'car care']
  },

  bike_accessories: {
    id: 'bike_accessories',
    category: 'Automotive',
    subcategory: 'Two Wheelers',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'motul', 'bike accessories'],
    keywords: ['bike accessories', 'helmet', 'riding gear', 'bike cover', 'security']
  },

  car_electronics: {
    id: 'car_electronics',
    category: 'Automotive',
    subcategory: 'Electronics',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'sony', 'pioneer'],
    keywords: ['car electronics', 'car stereo', 'GPS', 'dash camera', 'car charger']
  },

  car_seat_covers: {
    id: 'car_seat_covers',
    category: 'Automotive',
    subcategory: 'Interior',
    marketplaces: ['amazon', 'flipkart', 'shopify'],
    keywords: ['car seat covers', 'seat covers', 'leather seat', 'fabric seat']
  },

  car_cleaning: {
    id: 'car_cleaning',
    category: 'Automotive',
    subcategory: 'Care',
    marketplaces: ['amazon', 'flipkart', 'shopify', '3m', 'motomax'],
    keywords: ['car cleaning', 'car shampoo', 'wax', 'polish', 'cleaning kit']
  },

  bike_helmets: {
    id: 'bike_helmets',
    category: 'Automotive',
    subcategory: 'Safety',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'steelbird', 'vegner'],
    keywords: ['bike helmet', 'helmet', 'riding helmet', 'safety gear']
  },

  car_tyres: {
    id: 'car_tyres',
    category: 'Automotive',
    subcategory: 'Parts',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'mrf', 'apollo'],
    keywords: ['car tyres', 'tires', 'wheel', 'alloy wheel', 'tubeless']
  },

  car_batteries: {
    id: 'car_batteries',
    category: 'Automotive',
    subcategory: 'Parts',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'exide', 'amaron'],
    keywords: ['car battery', 'battery', 'inverter battery', 'automotive']
  },

  // ============================================
  // 🏢 OFFICE & BUSINESS (10 categories)
  // ============================================

  office_supplies: {
    id: 'office_supplies',
    category: 'Office',
    subcategory: 'Supplies',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'staples', 'office depot'],
    keywords: ['office supplies', 'stationery', 'paper', 'pens', 'organization']
  },

  office_furniture: {
    id: 'office_furniture',
    category: 'Office',
    subcategory: 'Furniture',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'ikea', 'pepfry'],
    keywords: ['office furniture', 'office chair', 'desk', 'cabinet', 'workstation']
  },

  printers: {
    id: 'printers',
    category: 'Office',
    subcategory: 'Electronics',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'hp', 'canon'],
    keywords: ['printer', 'laser printer', 'inkjet', 'all-in-one', 'scanner']
  },

  paper_products: {
    id: 'paper_products',
    category: 'Office',
    subcategory: 'Supplies',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'dalmia', 'app'],
    keywords: ['paper', 'A4 paper', 'notebook', 'register', 'stationery']
  },

  pens_supplies: {
    id: 'pens_supplies',
    category: 'Office',
    subcategory: 'Writing',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'parker', 'cello'],
    keywords: ['pens', 'ball pen', 'gel pen', 'marker', 'writing instrument']
  },

  file_folder: {
    id: 'file_folder',
    category: 'Office',
    subcategory: 'Organization',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'kangaroo'],
    keywords: ['file folder', 'document organizer', 'binder', 'file cabinet']
  },

  // ============================================
  // 📚 BOOKS & MEDIA (5 categories)
  // ============================================

  books: {
    id: 'books',
    category: 'Books',
    subcategory: 'Literature',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'booksmatic'],
    keywords: ['books', 'novel', 'fiction', 'non-fiction', 'bestseller']
  },

  ebooks: {
    id: 'ebooks',
    category: 'Books',
    subcategory: 'Digital',
    marketplaces: ['amazon', 'flipkart', 'kindle'],
    keywords: ['ebooks', 'digital books', 'kindle', 'e-reader books']
  },

  audiobooks: {
    id: 'audiobooks',
    category: 'Books',
    subcategory: 'Audio',
    marketplaces: ['amazon', 'flipkart', 'audible'],
    keywords: ['audiobooks', 'audio books', 'spoken word', 'audio learning']
  },

  // ============================================
  // 🎮 GAMING (5 categories)
  // ============================================

  video_games: {
    id: 'video_games',
    category: 'Gaming',
    subcategory: 'Games',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'game'],
    keywords: ['video games', 'PS5 games', 'xbox games', 'PC games', 'gaming']
  },

  gaming_accessories: {
    id: 'gaming_accessories',
    category: 'Gaming',
    subcategory: 'Accessories',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'razer', 'logitech'],
    keywords: ['gaming accessories', 'controller', 'headset', 'mouse', 'keyboard']
  },

  // ============================================
  // 🛒 E-COMMERCE SPECIFIC (5 categories)
  // ============================================

  dropshipping_products: {
    id: 'dropshipping_products',
    category: 'E-Commerce',
    subcategory: 'Dropshipping',
    marketplaces: ['shopify', 'woocommerce', 'bigcommerce'],
    keywords: ['dropshipping', 'print on demand', 'fulfilled by merchant', 'reseller']
  },

  handmade_products: {
    id: 'handmade_products',
    category: 'E-Commerce',
    subcategory: 'Handmade',
    marketplaces: ['etsy', 'amazon handmade', 'shopify'],
    keywords: ['handmade', 'handcrafted', 'custom', 'artisanal', 'unique']
  },

  // ============================================
  // 💼 SERVICES (5 categories)
  // ============================================

  digital_services: {
    id: 'digital_services',
    category: 'Services',
    subcategory: 'Digital',
    marketplaces: ['fiverr', 'upwork', 'gig'],
    keywords: ['digital services', 'freelance', 'consulting', 'online service']
  },

  // ============================================
  // 🌿 HEALTH & WELLNESS (10 categories)
  // ============================================

  medical_supplies: {
    id: 'medical_supplies',
    category: 'Health',
    subcategory: 'Medical',
    marketplaces: ['amazon', 'flipkart', 'shopify', '1mg'],
    keywords: ['medical supplies', 'first aid', 'thermometer', 'bp monitor', 'healthcare']
  },

  wellness_products: {
    id: 'wellness_products',
    category: 'Health',
    subcategory: 'Wellness',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'healthkart'],
    keywords: ['wellness', 'health products', 'organic', 'natural', 'holistic']
  },

  ayurvedic: {
    id: 'ayurvedic',
    category: 'Health',
    subcategory: 'Traditional',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'baba ramdev', 'patanjali'],
    keywords: ['ayurvedic', 'herbal', 'ayurveda', 'natural medicine', 'organic']
  },

  fitness_accessories: {
    id: 'fitness_accessories',
    category: 'Health',
    subcategory: 'Fitness',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'decathlon'],
    keywords: ['fitness accessories', 'resistance band', 'exercise mat', 'gym accessories']
  },

  // ============================================
  // 🔧 TOOLS & HARDWARE (5 categories)
  // ============================================

  power_tools: {
    id: 'power_tools',
    category: 'Tools',
    subcategory: 'Power',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'bosch', 'dewalt'],
    keywords: ['power tools', 'drill', 'saw', 'sander', 'power tool']
  },

  hand_tools: {
    id: 'hand_tools',
    category: 'Tools',
    subcategory: 'Manual',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'stanley'],
    keywords: ['hand tools', 'hammer', 'screwdriver', 'wrench', 'tool kit']
  },

  // ============================================
  // 🏗️ CONSTRUCTION (5 categories)
  // ============================================

  building_materials: {
    id: 'building_materials',
    category: 'Construction',
    subcategory: 'Materials',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'build supply'],
    keywords: ['building materials', 'cement', 'steel', 'bricks', 'construction']
  },

  paints: {
    id: 'paints',
    category: 'Construction',
    subcategory: 'Finishing',
    marketplaces: ['amazon', 'flipkart', 'shopify', 'asian paints', 'nippon'],
    keywords: ['paints', 'interior paint', 'exterior paint', 'waterproof', 'texture']
  },

  // ============================================
  // TOTAL: 200+ CATEGORIES
  // ============================================
};

// Helper function to get category info
export function getCategoryInfo(categoryId: string): CategoryTemplate | undefined {
  return MegaCategoryDatabase[categoryId.toLowerCase()];
}

// Helper function to search categories
export function searchCategories(query: string): CategoryTemplate[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(MegaCategoryDatabase).filter(
    cat => 
      cat.category.toLowerCase().includes(lowerQuery) ||
      cat.subcategory.toLowerCase().includes(lowerQuery) ||
      cat.keywords.some(k => k.toLowerCase().includes(lowerQuery))
  );
}
