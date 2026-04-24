// 📤 One-Click Shopify Publish - FREE Feature!
// Uses Shopify Admin API - No extra cost

export interface ShopifyConfig {
  storeUrl: string;
  accessToken: string;
}

export interface ShopifyProduct {
  title: string;
  body_html: string;
  vendor?: string;
  product_type?: string;
  tags?: string;
  variants?: {
    price: string;
    sku?: string;
  }[];
}

export interface ShopifyPublishResult {
  success: boolean;
  productId?: number;
  productUrl?: string;
  error?: string;
}

// Save config to localStorage
export function saveShopifyConfig(config: ShopifyConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('shopify_config', JSON.stringify(config));
  }
}

// Get config from localStorage
export function getShopifyConfig(): ShopifyConfig | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('shopify_config');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
}

// Clear config
export function clearShopifyConfig(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('shopify_config');
  }
}

// Publish product to Shopify
export async function publishToShopify(
  config: ShopifyConfig,
  product: ShopifyProduct
): Promise<ShopifyPublishResult> {
  try {
    const storeUrl = config.storeUrl.replace(/\/$/, '').replace(/https?:\/\//, '');
    const url = `https://${storeUrl}/admin/api/2024-01/products.json`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': config.accessToken,
      },
      body: JSON.stringify({
        product: {
          title: product.title,
          body_html: product.body_html,
          vendor: product.vendor || 'DescriptAI',
          product_type: product.product_type || 'General',
          tags: product.tags || 'DescriptAI',
          variants: product.variants || [{ price: '0.00' }],
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.errors || `HTTP ${response.status}` };
    }

    const data = await response.json();
    return {
      success: true,
      productId: data.product?.id,
      productUrl: `https://${storeUrl}/products/${data.product?.handle}`
    };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Validate credentials
export async function validateShopifyConfig(config: ShopifyConfig): Promise<{valid: boolean; error?: string}> {
  try {
    const storeUrl = config.storeUrl.replace(/\/$/, '').replace(/https?:\/\//, '');
    const url = `https://${storeUrl}/admin/api/2024-01/shop.json`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'X-Shopify-Access-Token': config.accessToken }
    });

    return { valid: response.ok };
  } catch (error) {
    return { valid: false, error: 'Connection failed' };
  }
}
