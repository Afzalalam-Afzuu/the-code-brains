// lib/services/affiliate/factory.ts
import { AffiliateProvider } from './base';
import { UdemyService } from './udemy';
import { AmazonService } from './amazon';
import { FlipkartService } from './flipkart';

class AffiliateServiceFactory {
  private providers = new Map<string, AffiliateProvider>();

  constructor() {
    // Register our current providers.
    this.registerProvider(new UdemyService());
    this.registerProvider(new AmazonService());
    this.registerProvider(new FlipkartService());
  }

  registerProvider(provider: AffiliateProvider): void {
    this.providers.set(provider.name, provider);
  }

  getProvider(name: string): AffiliateProvider {
    const provider = this.providers.get(name);
    if (!provider) {
      throw new Error(`Affiliate provider "${name}" is not registered in the system.`);
    }
    return provider;
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }
}

// Export singleton instance of the factory
export const affiliateFactory = new AffiliateServiceFactory();
