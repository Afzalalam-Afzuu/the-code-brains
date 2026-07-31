// lib/affiliate-links.ts

export interface AffiliateStoreOption {
  merchant: 'Amazon' | 'Flipkart' | 'Udemy' | 'Best Buy' | string;
  price: number;
  link: string;
  badge?: string;
}

export interface AffiliateItem {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  currency?: string;
  link: string;
  image: string;
  merchant?: 'Amazon' | 'Flipkart' | 'Udemy' | 'Best Buy' | string;
  category?: string;
  featured?: boolean;
  addedAt?: string;
  rating?: number;
  couponCode?: string;
  stores?: AffiliateStoreOption[];
  clickCount?: number;
}

// Default Affiliate Tags
export const DEFAULT_AMAZON_TAG = 'thecodebrains-21';
export const DEFAULT_FLIPKART_TAG = 'thecodebrains';
export const DEFAULT_UDEMY_CODE = 'thecodebrains';

/**
 * Format any Amazon link with affiliate tag
 */
export function formatAmazonAffiliateLink(rawUrl: string, tag: string = DEFAULT_AMAZON_TAG): string {
  if (!rawUrl) return '';
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
 * Format any Flipkart link with affiliate tag
 */
export function formatFlipkartAffiliateLink(rawUrl: string, tag: string = DEFAULT_FLIPKART_TAG): string {
  if (!rawUrl) return '';
  try {
    const urlObj = new URL(rawUrl);
    urlObj.searchParams.set('affid', tag);
    return urlObj.toString();
  } catch {
    if (rawUrl.includes('affid=')) return rawUrl;
    const separator = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${separator}affid=${tag}`;
  }
}

/**
 * Format any Udemy link with referral code
 */
export function formatUdemyAffiliateLink(rawUrl: string, code: string = DEFAULT_UDEMY_CODE): string {
  if (!rawUrl) return '';
  try {
    const urlObj = new URL(rawUrl);
    urlObj.searchParams.set('referralCode', code);
    return urlObj.toString();
  } catch {
    if (rawUrl.includes('referralCode=')) return rawUrl;
    const separator = rawUrl.includes('?') ? '&' : '?';
    return `${rawUrl}${separator}referralCode=${code}`;
  }
}

/**
 * Auto detects provider and formats raw link automatically
 */
export function autoFormatAffiliateLink(rawUrl: string, merchant?: string): string {
  if (!rawUrl) return '';
  const lowerUrl = rawUrl.toLowerCase();
  const lowerMerchant = (merchant || '').toLowerCase();

  if (lowerUrl.includes('amazon') || lowerMerchant.includes('amazon')) {
    return formatAmazonAffiliateLink(rawUrl);
  }
  if (lowerUrl.includes('flipkart') || lowerMerchant.includes('flipkart')) {
    return formatFlipkartAffiliateLink(rawUrl);
  }
  if (lowerUrl.includes('udemy') || lowerMerchant.includes('udemy')) {
    return formatUdemyAffiliateLink(rawUrl);
  }

  return rawUrl;
}

/**
 * Format content links (Markdown/HTML) to enforce rel="noopener noreferrer nofollow sponsored" and attach affiliate tags
 */
export function formatContentAffiliateLinks(content: string): string {
  if (!content) return '';

  // Regex to catch raw Amazon/Flipkart/Udemy links in Markdown format [label](url)
  return content.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/gi,
    (match, label, rawUrl) => {
      const formattedUrl = autoFormatAffiliateLink(rawUrl);
      return `<a href="${formattedUrl}" target="_blank" rel="noopener noreferrer nofollow sponsored" class="text-[#2874f0] underline hover:text-blue-700 font-semibold">${label}</a>`;
    }
  );
}

/**
 * Master static product list with multi-store & coupon support
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
    rating: 4.8,
    addedAt: '2026-07-30',
    couponCode: 'HUMID100',
    stores: [
      { merchant: 'Amazon', price: 2198, link: 'https://www.amazon.in/dp/B0F31ZQD1H?tag=thecodebrains-21', badge: 'Best Deal' },
      { merchant: 'Flipkart', price: 2399, link: 'https://www.flipkart.com/search?q=rosekm+humidifier&affid=thecodebrains' }
    ]
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
    rating: 4.9,
    addedAt: '2026-07-30',
    stores: [
      { merchant: 'Amazon', price: 124999, link: 'https://www.amazon.in/s?k=Samsung+Galaxy+S24+Ultra&tag=thecodebrains-21', badge: 'Top Seller' },
      { merchant: 'Flipkart', price: 126999, link: 'https://www.flipkart.com/search?q=Samsung+S24+Ultra&affid=thecodebrains' }
    ]
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
    rating: 4.7,
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
    rating: 4.8,
    addedAt: '2026-07-30',
    couponCode: 'SONY2000'
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
