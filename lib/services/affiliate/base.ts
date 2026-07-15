// lib/services/affiliate/base.ts
import { SearchParams, SearchResult } from './types';

export interface AffiliateProvider {
  name: string;
  search(params: SearchParams): Promise<SearchResult>;
}
