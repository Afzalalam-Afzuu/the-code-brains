// lib/db-actions.ts
"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from './supabase';
import { blogPosts, BlogPost } from './blog-data';

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

    // Map DB fields to interface
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

    // Prevent duplicates if static blogs have the same slug
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
      // If db search fails, fallback to matching static blog
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

  // Generate clean slug from title if not specified
  const slug = (rawSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();

  // Validate slug is unique & safe
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

    // Revalidate blog layout caches
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/');
  } catch (err: any) {
    console.error('[db-actions] Unexpected error inserting blog:', err);
    return { error: `Server Error: ${err.message || err}` };
  }

  // Redirect on success
  redirect('/blog');
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
