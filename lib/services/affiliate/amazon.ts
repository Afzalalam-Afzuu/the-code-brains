// lib/services/affiliate/amazon.ts
import { AffiliateProvider } from './base';
import { SearchParams, SearchResult } from './types';

export class AmazonService implements AffiliateProvider {
  name = 'amazon';

  async search(params: SearchParams): Promise<SearchResult> {
    console.log(`[AmazonService] Search called with query: "${params.query || ''}" (Placeholder for future PA-API)`);
    
    // Return empty results for now until Amazon PA-API keys are added.
    return {
      products: [],
      totalCount: 0,
      page: params.page || 1,
      pageSize: params.pageSize || 12,
      totalPages: 0,
    };
  }
}
