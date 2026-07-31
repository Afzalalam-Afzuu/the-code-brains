-- SQL Script to set up Blogs, Affiliate Products, Click Analytics, Inquiries, and Dynamic Navigation in Supabase
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

-- 2. Create the affiliate_products table
CREATE TABLE IF NOT EXISTS public.affiliate_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    price NUMERIC NOT NULL,
    old_price NUMERIC DEFAULT 0,
    currency TEXT DEFAULT '₹',
    affiliate_link TEXT NOT NULL,
    image_url TEXT NOT NULL,
    merchant TEXT DEFAULT 'Amazon',
    category TEXT DEFAULT 'General',
    rating NUMERIC DEFAULT 4.8,
    is_deal_of_the_day BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create the affiliate_clicks tracking table
CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create join_plus_inquiries table
CREATE TABLE IF NOT EXISTS public.join_plus_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT NOT NULL,
    company TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create dynamic navigation_menu table
CREATE TABLE IF NOT EXISTS public.navigation_menu (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_slug TEXT NOT NULL,
    category_label TEXT NOT NULL,
    category_href TEXT,
    heading TEXT,
    link_label TEXT NOT NULL,
    link_href TEXT NOT NULL,
    is_disabled BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Indexes for optimization
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_affiliate_products_created_at ON public.affiliate_products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_created_at ON public.affiliate_clicks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_navigation_menu_slug ON public.navigation_menu(category_slug);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.join_plus_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_menu ENABLE ROW LEVEL SECURITY;

-- 8. Policies (Safely drop if exists and recreate)
DROP POLICY IF EXISTS "Allow public read blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow app insert blogs" ON public.blogs;
CREATE POLICY "Allow public read blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow app insert blogs" ON public.blogs FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read affiliate_products" ON public.affiliate_products;
DROP POLICY IF EXISTS "Allow app insert affiliate_products" ON public.affiliate_products;
DROP POLICY IF EXISTS "Allow app delete affiliate_products" ON public.affiliate_products;
CREATE POLICY "Allow public read affiliate_products" ON public.affiliate_products FOR SELECT USING (true);
CREATE POLICY "Allow app insert affiliate_products" ON public.affiliate_products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow app delete affiliate_products" ON public.affiliate_products FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow app insert affiliate_clicks" ON public.affiliate_clicks;
DROP POLICY IF EXISTS "Allow public read affiliate_clicks" ON public.affiliate_clicks;
CREATE POLICY "Allow app insert affiliate_clicks" ON public.affiliate_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read affiliate_clicks" ON public.affiliate_clicks FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow app insert join_plus_inquiries" ON public.join_plus_inquiries;
DROP POLICY IF EXISTS "Allow public read join_plus_inquiries" ON public.join_plus_inquiries;
CREATE POLICY "Allow app insert join_plus_inquiries" ON public.join_plus_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read join_plus_inquiries" ON public.join_plus_inquiries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read navigation_menu" ON public.navigation_menu;
DROP POLICY IF EXISTS "Allow app insert navigation_menu" ON public.navigation_menu;
DROP POLICY IF EXISTS "Allow app delete navigation_menu" ON public.navigation_menu;
CREATE POLICY "Allow public read navigation_menu" ON public.navigation_menu FOR SELECT USING (true);
CREATE POLICY "Allow app insert navigation_menu" ON public.navigation_menu FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow app delete navigation_menu" ON public.navigation_menu FOR DELETE USING (true);

-- 9. Seed ALL Navigation Items into DB
INSERT INTO public.navigation_menu (category_slug, category_label, category_href, heading, link_label, link_href, is_disabled, sort_order) VALUES
-- PHONES
('phones', 'Phones', NULL, 'Best Picks', 'Best Phones', '/phones/best-picks', false, 1),
('phones', 'Phones', NULL, 'Best Picks', 'Best Camera Phones', '/phones/best-camera-phones', false, 2),
('phones', 'Phones', NULL, 'Best Picks', 'Best Budget Phones', '/phones/best-budget-phones', false, 3),
('phones', 'Phones', NULL, 'Best Picks', 'Best Foldable Phones', '/phones/best-foldable-phones', false, 4),
('phones', 'Phones', NULL, 'Reviews & News', 'Phone Reviews', '/phones/reviews', false, 5),
('phones', 'Phones', NULL, 'Reviews & News', 'Phone News', '/phones/news', false, 6),
('phones', 'Phones', NULL, 'Reviews & News', 'Phone Deals', '/phones/deals', false, 7),
('phones', 'Phones', NULL, 'Reviews & News', 'Phone How-Tos', '/phones/how-tos', false, 8),
('phones', 'Phones', NULL, 'Brands', 'iPhone', '/phones/iphone', false, 9),
('phones', 'Phones', NULL, 'Brands', 'Samsung Galaxy', '/phones/samsung-galaxy', false, 10),
('phones', 'Phones', NULL, 'Brands', 'Google Pixel', '/phones/google-pixel', false, 11),
('phones', 'Phones', NULL, 'Brands', 'OnePlus', '/phones/oneplus', false, 12),

-- TV & AUDIO
('tv-audio', 'TV & Audio', NULL, 'TVs', 'TV Best Picks', '/tv-audio/tv-best-picks', false, 13),
('tv-audio', 'TV & Audio', NULL, 'TVs', 'TV Deals', '/tv-audio/tv-deals', false, 14),
('tv-audio', 'TV & Audio', NULL, 'TVs', 'OLED TVs', '/tv-audio/oled-tvs', false, 15),
('tv-audio', 'TV & Audio', NULL, 'TVs', 'QLED TVs', '/tv-audio/qled-tvs', false, 16),
('tv-audio', 'TV & Audio', NULL, 'Audio', 'Audio Best Picks', '/tv-audio/audio-best-picks', false, 17),
('tv-audio', 'TV & Audio', NULL, 'Audio', 'Audio Deals', '/tv-audio/audio-deals', false, 18),
('tv-audio', 'TV & Audio', NULL, 'Audio', 'Audio Reviews', '/tv-audio/audio-reviews', false, 19),
('tv-audio', 'TV & Audio', NULL, 'Headphones', 'Earbuds', '/tv-audio/earbuds', false, 20),
('tv-audio', 'TV & Audio', NULL, 'Headphones', 'Over-Ear Headphones', '/tv-audio/over-ear-headphones', false, 21),
('tv-audio', 'TV & Audio', NULL, 'Speakers', 'Bluetooth Speakers', '/tv-audio/bluetooth-speakers', false, 22),
('tv-audio', 'TV & Audio', NULL, 'Speakers', 'Soundbars', '/tv-audio/soundbars', false, 23),

-- COMPUTING
('computing', 'Computing', NULL, 'Laptops', 'Best Laptops', '/computing/best-laptops', false, 24),
('computing', 'Computing', NULL, 'Laptops', 'Best Gaming Laptops', '/computing/best-gaming-laptops', false, 25),
('computing', 'Computing', NULL, 'Laptops', 'Laptop Deals', '/computing/laptop-deals', false, 26),
('computing', 'Computing', NULL, 'Accessories', 'Best Monitors', '/computing/best-monitors', false, 27),
('computing', 'Computing', NULL, 'Accessories', 'Best Keyboards', '/computing/best-keyboards', false, 28),
('computing', 'Computing', NULL, 'Accessories', 'Best Mice', '/computing/best-mice', false, 29),

-- AI
('ai', 'AI', NULL, 'AI Tools', 'Best AI Chatbots', '/ai/best-ai-chatbots', false, 30),
('ai', 'AI', NULL, 'AI Tools', 'AI News', '/ai/news', false, 31),
('ai', 'AI', NULL, 'AI Tools', 'AI How-Tos', '/ai/how-tos', false, 32),

-- LEARNING
('learning', 'Learning', NULL, 'Online Courses', 'Udemy', '/learning/udemy', false, 33),
('learning', 'Learning', NULL, 'Online Courses', 'Coursera', '/learning/coursera', true, 34),

-- BLOG
('blog', 'Blog', '/blog', NULL, 'Blog', '/blog', false, 35),

-- HOME
('home', 'Home', NULL, 'Smart Home', 'Best Smart Speakers', '/home/best-smart-speakers', false, 36),
('home', 'Home', NULL, 'Smart Home', 'Best Robot Vacuums', '/home/best-robot-vacuums', false, 37),
('home', 'Home', NULL, 'Smart Home', 'Best Video Doorbells', '/home/best-video-doorbells', false, 38),

-- WORDLE & GAMES
('wordle-games', 'Wordle & Games', '/wordle-games', NULL, 'Wordle & Games', '/wordle-games', false, 39),

-- BROWSE
('browse', 'Browse', '/browse', NULL, 'Browse', '/browse', false, 40)
ON CONFLICT DO NOTHING;
