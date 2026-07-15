// lib/services/affiliate/flipkart.ts
import { AffiliateProvider } from './base';
import { SearchParams, SearchResult } from './types';

export class FlipkartService implements AffiliateProvider {
  name = 'flipkart';

  async search(params: SearchParams): Promise<SearchResult> {
    console.log(`[FlipkartService] Search called with query: "${params.query || ''}" (Placeholder for future Flipkart API)`);
    
    // Return empty results for now until Flipkart API is integrated.
    return {
      products: [],
      totalCount: 0,
      page: params.page || 1,
      pageSize: params.pageSize || 12,
      totalPages: 0,
    };
  }
}
