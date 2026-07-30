// lib/affiliate-links.ts

export interface AffiliateItem {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  currency?: string;
  link: string;
  image: string;
  merchant?: 'Amazon' | 'Flipkart' | 'Best Buy' | string;
  category?: string;
  featured?: boolean;
  addedAt?: string;
}

// Default Amazon Associate / Tag for your site
export const DEFAULT_AMAZON_TAG = 'thecodebrains-21';

/**
 * Helper utility to ensure any Amazon URL has your affiliate tag attached.
 * Example: formatAmazonAffiliateLink("https://www.amazon.in/dp/B0F31ZQD1H")
 * Result: "https://www.amazon.in/dp/B0F31ZQD1H?tag=thecodebrains-21"
 */
export function formatAmazonAffiliateLink(rawUrl: string, tag: string = DEFAULT_AMAZON_TAG): string {
  try {
    const urlObj = new URL(rawUrl);
    urlObj.searchParams.set('tag', tag);
    return urlObj.toString();
  } catch {
    if (rawUrl.includes('tag=')) return rawUrl;
    const separator = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${separator}tag=${tag}`;
  }
}

/**
 * =========================================================================
 * AFFILIATE LINKS MASTER LIST (Yaha aap apne sare links add kar sakte hai)
 * =========================================================================
 */
export const affiliateProducts: AffiliateItem[] = [
  {
    id: 'rosekm-humidifier-b0f31zqd1h',
    title: 'ROSEKM Cool Mist Ultrasonic Humidifier (2.0L Quiet Operation)',
    price: 2198,
    oldPrice: 3499,
    currency: '₹',
    link: 'https://www.amazon.in/dp/B0F31ZQD1H/ref=cm_sw_r_as_gl_api_gl_i_PV83W6R7X1A0W56Q630G?linkCode=ml1&tag=thecodebrains-21&linkId=e3db5318f868825dfcfc4bdc81fcc5a8',
    image: '/images/rosekm_humidifier.png',
    merchant: 'Amazon',
    category: 'Smart Home',
    featured: true,
    addedAt: '2026-07-30'
  },
  {
    id: 'galaxy-s26-ultra',
    title: 'Samsung Galaxy S26 Ultra 5G (512GB)',
    price: 124999,
    oldPrice: 139999,
    currency: '₹',
    link: 'https://www.amazon.in/s?k=Samsung+Galaxy+S24+Ultra&tag=thecodebrains-21',
    image: '/images/modern_smartphone.png',
    merchant: 'Amazon',
    category: 'Phones',
    featured: true,
    addedAt: '2026-07-30'
  },
  {
    id: 'dell-xps-13',
    title: 'Dell XPS 13 OLED Ultra-Thin Laptop (32GB RAM)',
    price: 144990,
    oldPrice: 169990,
    currency: '₹',
    link: 'https://www.amazon.in/s?k=Dell+XPS+13+OLED&tag=thecodebrains-21',
    image: '/images/modern_laptop.png',
    merchant: 'Amazon',
    category: 'Laptops',
    featured: true,
    addedAt: '2026-07-30'
  },
  {
    id: 'sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    price: 26990,
    oldPrice: 34990,
    currency: '₹',
    link: 'https://www.amazon.in/s?k=Sony+WH-1000XM5&tag=thecodebrains-21',
    image: '/images/premium_headphones.png',
    merchant: 'Amazon',
    category: 'Audio',
    featured: true,
    addedAt: '2026-07-30'
  }
];

export function getFeaturedAffiliateProducts(): AffiliateItem[] {
  return affiliateProducts.filter((p) => p.featured !== false);
}

export function getAffiliateProductsByCategory(category: string): AffiliateItem[] {
  return affiliateProducts.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );
}
