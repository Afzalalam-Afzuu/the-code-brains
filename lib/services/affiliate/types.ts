// lib/services/affiliate/types.ts

export interface AffiliateProduct {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviewsCount?: number;
  provider: 'udemy' | 'amazon' | 'flipkart' | string;
  author?: string; // Specific to courses/books
  category?: string;
  metadata?: Record<string, any>; // Provider-specific data
}

export interface SearchParams {
  query?: string;
  category?: string;
  page?: number;
  pageSize?: number;
  [key: string]: any;
}

export interface SearchResult {
  products: AffiliateProduct[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
