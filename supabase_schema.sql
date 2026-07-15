-- SQL Script to set up the Blogs table in Supabase
-- Go to your Supabase Dashboard -> SQL Editor -> Click "New Query" -> Paste this code -> Click "Run"

-- 1. Create the blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL, -- Supports markdown content
    excerpt TEXT NOT NULL,
    tag TEXT DEFAULT 'AI & Automation',
    author TEXT DEFAULT 'Dev Kapoor',
    read_time TEXT DEFAULT '5 Min Read',
    image TEXT DEFAULT 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=480&h=270&fit=crop',
    date TEXT NOT NULL, -- e.g. "Jul 15, 2026"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create indexes for optimization
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- 4. Create policies (Allow everyone to read blogs, allow authenticated/anon inserts for this simple demo)
-- Read Policy: Public Read Access
CREATE POLICY "Allow public read access" 
ON public.blogs 
FOR SELECT 
USING (true);

-- Insert Policy: Allow inserts (we verify the Admin PIN in the Next.js Server Action for security)
CREATE POLICY "Allow inserts from application" 
ON public.blogs 
FOR INSERT 
WITH CHECK (true);

-- 5. Seed some initial data (Optional - you can insert this to test the dynamic route)
INSERT INTO public.blogs (slug, title, content, excerpt, tag, author, read_time, image, date)
VALUES (
    'rise-of-ai-agents',
    'The Rise of AI Agents in Modern Software Engineering',
    '# The Rise of AI Agents

AI agents are shifting from simple conversational interfaces to autonomous decision-makers. They can read documents, write files, call external APIs, and execute workflows.

## Why AI Agents?
Traditional automation relies on hardcoded rules. AI agents use Large Language Models (LLMs) to reason through complex tasks.

## How to Get Started
1. Define the goals and boundaries.
2. Select an agent builder tool like Jotform or LangChain.
3. Integrate real-time data sources.',
    'Explore how autonomous AI agents are moving beyond simple chatbots to handle complex engineering workflows and business processes.',
    'AI & AUTOMATION',
    'Dev Kapoor',
    '4 Min Read',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=480&h=270&fit=crop',
    'Jul 15, 2026'
) ON CONFLICT (slug) DO NOTHING;
