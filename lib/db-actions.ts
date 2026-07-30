// lib/db-actions.ts
"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from './supabase';
import { blogPosts, BlogPost } from './blog-data';
import { affiliateProducts, AffiliateItem, formatAmazonAffiliateLink } from './affiliate-links';

export interface BlogDetail extends BlogPost {
  content: string;
}

// Fetch all blogs (Supabase + fallback static blogs)
export async function getBlogs(): Promise<BlogPost[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.log('[db-actions] Supabase credentials missing. Serving static fallback data.');
    return blogPosts;
  }

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[db-actions] Error fetching blogs from Supabase:', error);
      return blogPosts;
    }

    if (!data || data.length === 0) {
      return blogPosts;
    }

    const dbPosts: BlogPost[] = data.map((item: any) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      tag: item.tag || 'AI & Automation',
      author: item.author || 'Dev Kapoor',
      date: item.date,
      image: item.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=480&h=270&fit=crop',
      readTime: item.read_time || '5 Min Read',
      href: `/blog/${item.slug}`
    }));

    const dbSlugs = new Set(dbPosts.map(p => p.slug));
    const merged = [
      ...dbPosts,
      ...blogPosts.filter(p => !dbSlugs.has(p.slug))
    ];

    return merged;
  } catch (err) {
    console.error('[db-actions] Unexpected error fetching blogs:', err);
    return blogPosts;
  }
}

// Fetch a single blog by slug
export async function getBlogBySlug(slug: string): Promise<BlogDetail | null> {
  const staticPost = blogPosts.find(p => p.slug === slug);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (staticPost) {
      return {
        ...staticPost,
        content: `This is static fallback content for **${staticPost.title}**.`
      };
    }
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      if (staticPost) {
        return {
          ...staticPost,
          content: `This is static fallback content for **${staticPost.title}**.`
        };
      }
      return null;
    }

    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      tag: data.tag || 'AI & Automation',
      author: data.author || 'Dev Kapoor',
      date: data.date,
      image: data.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=480&h=270&fit=crop',
      readTime: data.read_time || '5 Min Read',
      href: `/blog/${data.slug}`,
      content: data.content
    };
  } catch (err) {
    console.error(`[db-actions] Error fetching blog slug: ${slug}`, err);
    if (staticPost) {
      return {
        ...staticPost,
        content: `This is static fallback content for **${staticPost.title}**.`
      };
    }
    return null;
  }
}

// Server Action to Create a new Blog post
export async function createBlogAction(prevState: any, formData: FormData) {
  const pin = formData.get('pin') as string;
  const expectedPin = process.env.ADMIN_PIN || '1234';

  if (pin !== expectedPin) {
    return { error: 'Invalid Admin PIN. Access denied.' };
  }

  const title = (formData.get('title') as string || '').trim();
  const rawSlug = (formData.get('slug') as string || '').trim();
  const excerpt = (formData.get('excerpt') as string || '').trim();
  const tag = (formData.get('tag') as string || 'AI & Automation').trim();
  const author = (formData.get('author') as string || 'Dev Kapoor').trim();
  const readTime = (formData.get('readTime') as string || '5 Min Read').trim();
  const image = (formData.get('image') as string || '').trim();
  const content = (formData.get('content') as string || '').trim();

  if (!title || !excerpt || !content) {
    return { error: 'Title, Excerpt, and Content are required fields.' };
  }

  const slug = (rawSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: 'Slug can only contain lowercase letters, numbers, and dashes.' };
  }

  const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date().toLocaleDateString('en-US', dateOptions);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: 'Supabase credentials are not configured in your .env.local file.' };
  }

  try {
    const { error } = await supabase
      .from('blogs')
      .insert({
        title,
        slug,
        excerpt,
        tag,
        author,
        read_time: readTime,
        image: image || undefined,
        content,
        date: formattedDate
      });

    if (error) {
      console.error('[db-actions] Supabase Insert Error:', error);
      return { error: `Database Error: ${error.message} (Ensure your slug is unique)` };
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/');
  } catch (err: any) {
    console.error('[db-actions] Unexpected error inserting blog:', err);
    return { error: `Server Error: ${err.message || err}` };
  }

  redirect('/blog');
}

/* =========================================================================
   AFFILIATE PRODUCTS DATABASE ACTIONS (Supabase Integration)
   ========================================================================= */

// Fetch all affiliate products (DB + Fallback)
export async function getAffiliateProductsFromDB(): Promise<AffiliateItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return affiliateProducts;
  }

  try {
    const { data, error } = await supabase
      .from('affiliate_products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.error('[db-actions] Error fetching affiliate products:', error);
      return affiliateProducts;
    }

    const dbProducts: AffiliateItem[] = data.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: Number(item.price),
      oldPrice: Number(item.old_price || 0),
      currency: item.currency || '₹',
      link: item.affiliate_link.includes('tag=') ? item.affiliate_link : formatAmazonAffiliateLink(item.affiliate_link),
      image: item.image_url || '/images/rosekm_humidifier.png',
      merchant: item.merchant || 'Amazon',
      category: item.category || 'General',
      featured: Boolean(item.is_featured || item.is_deal_of_the_day),
      addedAt: item.created_at
    }));

    // Merge static products with DB products
    const dbIds = new Set(dbProducts.map(p => p.id));
    const merged = [
      ...dbProducts,
      ...affiliateProducts.filter(p => !dbIds.has(p.id))
    ];

    return merged;
  } catch (err) {
    console.error('[db-actions] Unexpected error fetching affiliate products:', err);
    return affiliateProducts;
  }
}

// Fetch "Deal of the Day" products for homepage
export async function getDealOfTheDayProductsFromDB(): Promise<AffiliateItem[]> {
  const allProducts = await getAffiliateProductsFromDB();
  const deals = allProducts.filter(p => p.featured);
  return deals.length > 0 ? deals : allProducts.slice(0, 4);
}

// Server Action to Create a new Affiliate Product
export async function createAffiliateProductAction(prevState: any, formData: FormData) {
  const pin = formData.get('pin') as string;
  const expectedPin = process.env.ADMIN_PIN || '1234';

  if (pin !== expectedPin) {
    return { error: 'Invalid Admin PIN. Access denied.' };
  }

  const title = (formData.get('title') as string || '').trim();
  const price = parseFloat(formData.get('price') as string || '0');
  const oldPrice = parseFloat(formData.get('old_price') as string || '0');
  const currency = (formData.get('currency') as string || '₹').trim();
  const rawLink = (formData.get('affiliate_link') as string || '').trim();
  const image_url = (formData.get('image_url') as string || '').trim();
  const merchant = (formData.get('merchant') as string || 'Amazon').trim();
  const category = (formData.get('category') as string || 'General').trim();
  const rating = parseFloat(formData.get('rating') as string || '4.8');
  const is_deal_of_the_day = formData.get('is_deal_of_the_day') === 'on';
  const is_featured = formData.get('is_featured') === 'on';

  if (!title || !price || !rawLink || !image_url) {
    return { error: 'Product Title, Price, Image URL, and Affiliate Link are required.' };
  }

  // Ensure link has affiliate tag if it's Amazon
  const affiliate_link = rawLink.includes('amazon') ? formatAmazonAffiliateLink(rawLink) : rawLink;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: 'Supabase credentials are not configured in your .env.local file.' };
  }

  try {
    const { error } = await supabase
      .from('affiliate_products')
      .insert({
        title,
        price,
        old_price: oldPrice,
        currency,
        affiliate_link,
        image_url,
        merchant,
        category,
        rating,
        is_deal_of_the_day,
        is_featured
      });

    if (error) {
      console.error('[db-actions] Error inserting affiliate product:', error);
      return { error: `Database Error: ${error.message}` };
    }

    revalidatePath('/browse');
    revalidatePath('/');
    revalidatePath('/admin');
  } catch (err: any) {
    console.error('[db-actions] Server error inserting affiliate product:', err);
    return { error: `Server Error: ${err.message || err}` };
  }

  redirect('/browse');
}

// Server Action to Delete an Affiliate Product
export async function deleteAffiliateProductAction(id: string, pin: string) {
  const expectedPin = process.env.ADMIN_PIN || '1234';
  if (pin !== expectedPin) {
    return { error: 'Invalid Admin PIN.' };
  }

  try {
    const { error } = await supabase
      .from('affiliate_products')
      .delete()
      .eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/browse');
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete product.' };
  }
}

// Gemini AI search action
export async function askGeminiAction(prompt: string, model: string = 'gemini-1.5-flash'): Promise<string> {
  const { askGemini } = await import('./gemini');
  try {
    return await askGemini(prompt, model);
  } catch (err: any) {
    return `Error calling Gemini: ${err.message || err}`;
  }
}

export async function generateBlogDraftAction(topic: string, model: string = 'gemini-1.5-flash'): Promise<{ title: string; excerpt: string; content: string; error?: string }> {
  const { generateBlogDraft } = await import('./gemini');
  try {
    return await generateBlogDraft(topic, model);
  } catch (err: any) {
    return {
      title: '',
      excerpt: '',
      content: '',
      error: String(err.message || err)
    };
  }
}

export interface JoinPlusInquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  company?: string;
  message?: string;
  created_at: string;
}

// Server Action to submit Join Plus Inquiry
export async function submitJoinPlusInquiryAction(prevState: any, formData: FormData) {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const mobile = formData.get('mobile')?.toString().trim();
  const company = formData.get('company')?.toString().trim() || null;
  const message = formData.get('message')?.toString().trim() || null;

  if (!name || !email || !mobile) {
    return { error: 'Please fill in all required fields (Name, Email, Mobile).' };
  }

  try {
    const { error } = await supabase
      .from('join_plus_inquiries')
      .insert([
        {
          name,
          email,
          mobile,
          company,
          message,
        }
      ]);

    if (error) {
      console.error('[db-actions] Error inserting Join Plus inquiry:', error);
      return { error: `Database Error: ${error.message}` };
    }

    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (err: any) {
    console.error('[db-actions] Server error inserting Join Plus inquiry:', err);
    return { error: `Server Error: ${err.message || err}` };
  }
}

// Fetch all Join Plus inquiries for Admin
export async function getJoinPlusInquiriesFromDB(): Promise<JoinPlusInquiry[]> {
  try {
    const { data, error } = await supabase
      .from('join_plus_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.error('[db-actions] Error fetching join_plus_inquiries:', error);
      return [];
    }

    return data as JoinPlusInquiry[];
  } catch (err) {
    console.error('[db-actions] Exception fetching join_plus_inquiries:', err);
    return [];
  }
}

