// lib/services/db/database.ts

export interface DatabaseProvider {
  saveSearchLog(userId: string, query: string, provider: string): Promise<void>;
  getPopularSearches(limit?: number): Promise<string[]>;
  saveProductInteraction(productId: string, action: 'click' | 'view'): Promise<void>;
}

// Mock database provider. In the future, swap this with MongoDB/PostgreSQL client.
class MockDatabase implements DatabaseProvider {
  async saveSearchLog(userId: string, query: string, provider: string): Promise<void> {
    console.log(`[Database Log] User "${userId}" searched for "${query}" on provider "${provider}" at ${new Date().toISOString()}`);
  }

  async getPopularSearches(limit: number = 5): Promise<string[]> {
    return [
      "Next.js Development",
      "Full Stack React",
      "Python for Data Science",
      "UI/UX Design Masterclass",
      "TypeScript Deep Dive"
    ].slice(0, limit);
  }

  async saveProductInteraction(productId: string, action: 'click' | 'view'): Promise<void> {
    console.log(`[Database Log] Product "${productId}" interaction: "${action}"`);
  }
}

// Export singleton database service
export const dbService: DatabaseProvider = new MockDatabase();
