import { NextResponse } from "next/server";

// Simple in-memory sliding-window rate limiter per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limitWindow = 60 * 1000; // 1 minute
  const maxRequests = 10; // Max 10 requests per minute per IP

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + limitWindow });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

// Local AI Knowledge Engine Fallback when API Quota is Exhausted
function generateLocalAiFallback(prompt: string): string {
  const query = prompt.toLowerCase();

  if (query.includes("next.js") || query.includes("nextjs") || query.includes("react")) {
    return `### ⚡ Next.js & React Expert Insights
- **Server Components vs Client Components**: Next.js 16 defaults to Server Components for fast initial HTML loads and zero bundle size overhead. Use \`"use client"\` for interactive UI elements.
- **SEO & Routing**: Utilize \`layout.tsx\` with \`metadata\` exports and \`sitemap.ts\` to maximize Google indexing efficiency.
- **Optimization Tip**: Always optimize images using Next.js \`<Image />\` or responsive SVG vectors!`;
  }

  if (query.includes("phone") || query.includes("mobile") || query.includes("smartphone") || query.includes("iphone") || query.includes("samsung")) {
    return `### 📱 Mobile Tech Recommendation
- **Flagship Picks**: For low-light camera quality and high battery life, check our tested guides.
- **Live Price Comparison**: We compare prices live across **Amazon India & Flipkart** so you never overpay!
- **Explore Mobile Hub**: Visit [/phones/best-picks](/phones/best-picks) for benchmark comparisons.`;
  }

  if (query.includes("laptop") || query.includes("macbook") || query.includes("code") || query.includes("program")) {
    return `### 💻 Developer & Computing Advice
- **For Coding & Development**: Look for at least 16GB RAM, an Apple Silicon M-series or Intel Core i7/Ryzen 7 processor, and a high-resolution display.
- **Explore Laptop Guides**: Check out [/computing/best-laptops](/computing/best-laptops) for detailed lab benchmarks.`;
  }

  if (query.includes("coupon") || query.includes("deal") || query.includes("discount") || query.includes("offer")) {
    return `### 🎟️ Active Discount Codes & Verified Offers
- We update promo codes multiple times daily across Amazon, Flipkart, Hostinger, and Udemy!
- **Browse All Coupons**: Visit [/coupons](/coupons) to copy 100% verified codes instantly.`;
  }

  return `### 🤖 Brainy AI Assistant
Regarding **"${prompt}"**:
- **Smart Tech Hub**: Explore our live price comparator at [/compare](/compare) to save money across stores.
- **Free Web Tools**: Try our 15+ client-side utility tools at [/tools](/tools) for PDF merging, QR code generation, and image compression.
- Feel free to ask more specific coding or technology questions!`;
}

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting Protection
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous_user";
    if (isRateLimited(clientIp)) {
      return NextResponse.json({
        response: `⚠️ **Rate Limit Reached**: To protect free server resources and prevent quota exhaustion, please wait 30 seconds before asking another question! In the meantime, explore our 15+ free web tools at [/tools](/tools).`,
      });
    }

    const body = await req.json();
    const prompt = body.prompt || body.message;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Valid text prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // System prompt giving complete context of TheCodeBrains website + world knowledge
    const systemInstruction = `You are "Brainy AI", official assistant of 'TheCodeBrains'. 
Personality: Expert, helpful, concise, enthusiastic.
If user asks coding or general questions, answer accurately using your world knowledge with bullet points and bold text. Keep response under 180 words.`;

    if (!apiKey) {
      return NextResponse.json({
        response: generateLocalAiFallback(prompt),
      });
    }

    // 2. Prepare payload for Gemini API
    const contents = [
      {
        role: "user",
        parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}` }],
      },
    ];

    // 3. Multi-Model Failover (Tries models sequentially if quota is limited)
    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash-8b",
      "gemini-1.5-pro",
    ];

    let geminiResponseText = "";
    let quotaExhausted = false;

    for (const model of modelsToTry) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
          }
        );

        if (res.status === 429 || res.status === 403) {
          quotaExhausted = true;
          console.warn(`[Gemini API Rate Limit/Quota] Model ${model} returned HTTP ${res.status}`);
          continue;
        }

        if (res.ok) {
          const data = await res.json();
          geminiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (geminiResponseText) break;
        }
      } catch (err) {
        console.warn(`[Gemini API Error] Model ${model}:`, err);
      }
    }

    // 4. If API fails or Quota is exhausted, fallback smoothly to Local AI Knowledge Engine
    if (!geminiResponseText) {
      console.log("[AI Chat] API Quota exhausted or unavailable. Serving Local AI Fallback Engine.");
      const fallbackReply = quotaExhausted
        ? `⚡ **High Demand Notice**: The free AI quota limit is currently high. Here is your answer powered by our Local Intelligence Engine:\n\n` + generateLocalAiFallback(prompt)
        : generateLocalAiFallback(prompt);

      return NextResponse.json({ response: fallbackReply });
    }

    return NextResponse.json({ response: geminiResponseText });
  } catch (error: any) {
    console.error("[API AI Chat Error]:", error);
    return NextResponse.json({
      response: `I'm here to help! Explore our free web tools hub at [/tools](/tools) and price comparisons at [/compare](/compare).`,
    });
  }
}
