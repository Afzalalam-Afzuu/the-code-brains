// lib/services/affiliate/udemy.ts
import { AffiliateProvider } from './base';
import { SearchParams, SearchResult, AffiliateProduct } from './types';
import { cacheService } from '../cache/cache';
import { dbService } from '../db/database';

export class UdemyService implements AffiliateProvider {
  name = 'udemy';
  private baseUrl = 'https://www.udemy.com/api-2.0';

  private getAuthHeaders(): Record<string, string> | null {
    const clientId = process.env.UDEMY_CLIENT_ID;
    const clientSecret = process.env.UDEMY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.warn('[UdemyService] Warning: UDEMY_CLIENT_ID or UDEMY_CLIENT_SECRET is not configured in environment variables.');
      return null;
    }

    const token = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    return {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Wraps URL with Rakuten LinkShare affiliate deeplink or custom parameters
  private wrapAffiliateUrl(originalUrl: string): string {
    const absoluteUrl = originalUrl.startsWith('http') 
      ? originalUrl 
      : `https://www.udemy.com${originalUrl}`;

    // FUTURE WORK: User can set their Rakuten LinkShare affiliate ID here
    // Example: const rakutenId = process.env.RAKUTEN_AFFILIATE_ID;
    // if (rakutenId) return `https://click.linksynergy.com/deeplink?id=${rakutenId}&mid=39197&murl=${encodeURIComponent(absoluteUrl)}`;

    return absoluteUrl;
  }

  async search(params: SearchParams): Promise<SearchResult> {
    const query = params.query?.trim() || 'Development';
    const page = params.page || 1;
    const pageSize = params.pageSize || 12;

    // Log the search to our database (mocked for now, ready for future analytics)
    await dbService.saveSearchLog('anonymous_user', query, this.name);

    // Caching check
    const cacheKey = `affiliate:udemy:search:${query.toLowerCase()}:${page}:${pageSize}`;
    const cachedResult = await cacheService.get<SearchResult>(cacheKey);
    if (cachedResult) {
      console.log(`[UdemyService] Serving search results from cache for: "${query}" (page ${page})`);
      return cachedResult;
    }

    const headers = this.getAuthHeaders();
    
    // If no credentials, return mockup fallback data
    if (!headers) {
      console.log(`[UdemyService] Returning mockup fallback data for: "${query}"`);
      const fallback = this.getMockupFallback(query, page, pageSize);
      // Cache the mock fallback too so development is fast
      await cacheService.set(cacheKey, fallback, 600);
      return fallback;
    }

    try {
      // Build query string
      const searchParams = new URLSearchParams();
      searchParams.append('page', String(page));
      searchParams.append('page_size', String(pageSize));
      searchParams.append('search', query);
      searchParams.append('fields[course]', 'id,title,headline,url,image_480x270,price,price_detail,visible_instructors,rating,num_reviews');

      const url = `${this.baseUrl}/courses/?${searchParams.toString()}`;
      
      const response = await fetch(url, {
        headers,
        next: { revalidate: 300 } // Next.js Fetch cache fallback
      });

      if (!response.ok) {
        throw new Error(`Udemy API responded with status ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      
      const products: AffiliateProduct[] = (data.results || []).map((course: any) => {
        const instructor = course.visible_instructors && course.visible_instructors.length > 0
          ? course.visible_instructors[0].display_name
          : 'Expert Instructor';

        const priceString = course.price_detail?.price_string || course.price || 'Free';

        return {
          id: String(course.id),
          title: course.title,
          description: course.headline || '',
          url: this.wrapAffiliateUrl(course.url),
          imageUrl: course.image_480x270 || 'https://img-c.udemycdn.com/course/480x270/placeholder.jpg',
          price: priceString,
          rating: course.rating ? Math.round(course.rating * 10) / 10 : undefined,
          reviewsCount: course.num_reviews || 0,
          provider: this.name,
          author: instructor,
          category: 'Online Courses',
        };
      });

      const totalCount = data.count || products.length;
      const totalPages = Math.ceil(totalCount / pageSize);

      const result: SearchResult = {
        products,
        totalCount,
        page,
        pageSize,
        totalPages,
      };

      // Cache the API response for 5 minutes (300 seconds)
      await cacheService.set(cacheKey, result, 300);

      return result;
    } catch (error) {
      console.error('[UdemyService] API Error:', error);
      // Fallback in case of API failure (e.g. rate limited or server down)
      const fallback = this.getMockupFallback(query, page, pageSize);
      return fallback;
    }
  }

  // Returns mockup courses relevant to coding & technology
  private getMockupFallback(query: string, page: number, pageSize: number): SearchResult {
    const allFallbackProducts: AffiliateProduct[] = [
      {
        id: "mock-udemy-1",
        title: "Next.js 15 & React 19: The Complete Guide (with App Router)",
        description: "Learn NextJS 15 from scratch! Build full stack web applications with Server Components, Server Actions, and Postgres.",
        url: this.wrapAffiliateUrl("/course/nextjs-react-the-complete-guide/"),
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=480&h=270&fit=crop",
        price: "₹3,299",
        originalPrice: "₹12,999",
        rating: 4.8,
        reviewsCount: 15420,
        provider: this.name,
        author: "Maximilian Schwarzmüller",
        category: "Development",
      },
      {
        id: "mock-udemy-2",
        title: "Python for Data Science and Machine Learning Bootcamp",
        description: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Scikit-Learn, Machine Learning, Tensorflow, and more!",
        url: this.wrapAffiliateUrl("/course/python-for-data-science-and-machine-learning-bootcamp/"),
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=480&h=270&fit=crop",
        price: "₹3,499",
        originalPrice: "₹8,499",
        rating: 4.7,
        reviewsCount: 142380,
        provider: this.name,
        author: "Jose Portilla",
        category: "Data Science",
      },
      {
        id: "mock-udemy-3",
        title: "The Ultimate HTML & CSS Bootcamp: Build Responsive Websites",
        description: "Learn modern CSS Grid, Flexbox, animations, typography, and responsive design by building real-world projects.",
        url: this.wrapAffiliateUrl("/course/ultimate-html-css-bootcamp/"),
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=480&h=270&fit=crop",
        price: "₹499",
        originalPrice: "₹3,600",
        rating: 4.6,
        reviewsCount: 8940,
        provider: this.name,
        author: "Jonas Schmedtmann",
        category: "Design",
      },
      {
        id: "mock-udemy-4",
        title: "TypeScript Deep Dive: Master Advanced Typing & Architecture",
        description: "Master generics, utility types, decorator patterns, and modular codebase structure using modern TypeScript features.",
        url: this.wrapAffiliateUrl("/course/typescript-deep-dive/"),
        imageUrl: "https://images.unsplash.com/photo-1516116211223-5c359a36298a?q=80&w=480&h=270&fit=crop",
        price: "₹649",
        originalPrice: "₹4,999",
        rating: 4.9,
        reviewsCount: 3200,
        provider: this.name,
        author: "Stephen Grider",
        category: "Development",
      },
      {
        id: "mock-udemy-5",
        title: "ChatGPT & Claude: Prompt Engineering for Software Engineers",
        description: "Optimize your software development lifecycle. Generate production code, write unit tests, and design system architecture with AI.",
        url: this.wrapAffiliateUrl("/course/prompt-engineering-for-developers/"),
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=480&h=270&fit=crop",
        price: "₹499",
        originalPrice: "₹2,499",
        rating: 4.5,
        reviewsCount: 1105,
        provider: this.name,
        author: "Andrew Ng",
        category: "AI",
      },
      {
        id: "mock-udemy-6",
        title: "Mastering Node.js, Express & MongoDB: Build REST APIs",
        description: "Build robust, secure and fast REST APIs from scratch. Includes security, payment integration, deployment and testing.",
        url: this.wrapAffiliateUrl("/course/nodejs-express-mongodb-bootcamp/"),
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=480&h=270&fit=crop",
        price: "₹2,299",
        originalPrice: "₹9,999",
        rating: 4.7,
        reviewsCount: 22400,
        provider: this.name,
        author: "Jonas Schmedtmann",
        category: "Development",
      }
    ];

    // Filter by query if user searched something specific
    const queryLower = query.toLowerCase();
    let filtered = allFallbackProducts.filter(p => 
      p.title.toLowerCase().includes(queryLower) || 
      p.description.toLowerCase().includes(queryLower) ||
      p.author?.toLowerCase().includes(queryLower)
    );

    // If query returned no matches, return default list
    if (filtered.length === 0) {
      filtered = allFallbackProducts;
    }

    const startIndex = (page - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      products: paginated,
      totalCount,
      page,
      pageSize,
      totalPages
    };
  }
}
