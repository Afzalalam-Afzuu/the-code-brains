import { NextResponse } from "next/server";

// Simple in-memory sliding-window rate limiter per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limitWindow = 60 * 1000; // 1 minute
  const maxRequests = 12; // Max 12 requests per minute per IP

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

// Clean Local AI Knowledge Engine (Serves instant expert responses without ugly warnings)
function generateCleanAiResponse(prompt: string): string {
  const query = prompt.toLowerCase();

  if (query.includes("next.js") || query.includes("nextjs") || query.includes("react")) {
    return `### ⚡ Next.js & React Developer Guide

- **Server vs Client Components**: Next.js 16 defaults to Server Components for instant HTML rendering and small JavaScript bundle size. Add \`"use client"\` at the top of files that require \`useState\` or event listeners.
- **SEO Optimization**: Configure \`metadata\` exports and \`sitemap.ts\` in the App Router to maximize Google Search visibility.
- **Performance Tip**: Always use SVG vector graphics or Next.js \`<Image />\` for high DPI screen clarity!`;
  }

  if (query.includes("phone") || query.includes("mobile") || query.includes("smartphone") || query.includes("iphone") || query.includes("samsung")) {
    return `### 📱 Smartphone Buying Guide

- **Camera & Battery Benchmarks**: Flagship models excel in low-light photography, 4K video stabilization, and all-day battery efficiency.
- **Live Price Comparison**: We compare prices live across **Amazon India & Flipkart** so you never overpay!
- **Explore Smartphone Picks**: Visit [/phones/best-picks](/phones/best-picks) for our editor-recommended choices.`;
  }

  if (query.includes("laptop") || query.includes("macbook") || query.includes("code") || query.includes("program")) {
    return `### 💻 Developer & Laptop Advice

- **Key Hardware Specs**: For software engineering and heavy multitasking, choose at least 16GB RAM and an Apple Silicon M-series or Intel Core i7/Ryzen 7 processor.
- **Explore Laptop Recommendations**: Visit [/computing/best-laptops](/computing/best-laptops) for detailed lab benchmark scores.`;
  }

  if (query.includes("coupon") || query.includes("deal") || query.includes("discount") || query.includes("offer")) {
    return `### 🎟️ Verified Discount Codes & Promos

- Our automated system updates promo codes daily across Amazon, Flipkart, Hostinger, and Udemy.
- **Browse All Active Coupons**: Visit [/coupons](/coupons) to copy verified discount codes instantly.`;
  }

  return `### 🤖 Brainy AI Assistant

Regarding **"${prompt}"**:

- **Price Engine**: Compare live prices on Amazon vs Flipkart at [/compare](/compare).
- **Developer Tools**: Access 15+ client-side utility tools (PDF tools, QR generator, Image Compressor) at [/tools](/tools).
- Feel free to ask more specific questions about coding, gadgets, or web development!`;
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Protection
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous_user";
    if (isRateLimited(clientIp)) {
      return NextResponse.json({
        response: `To protect free server resources, please wait 30 seconds before asking another question! In the meantime, feel free to try our 15+ client-side tools at [/tools](/tools).`,
      });
    }

    const body = await req.json();
    const prompt = body.prompt || body.message;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Valid prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ response: generateCleanAiResponse(prompt) });
    }

    // 2. Prepare payload for Gemini API
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `You are "Brainy AI", official assistant of 'TheCodeBrains'. Personality: Helpful, concise, intelligent. Answer user question accurately with bullet points and bold text: ${prompt}`,
          },
        ],
      },
    ];

    // 3. Updated Gemini Models list for v1beta endpoint
    const modelsToTry = [
      "gemini-2.0-flash",
      "gemini-2.5-flash",
      "gemini-flash-latest",
      "gemini-2.0-flash-lite",
    ];

    let geminiResponseText = "";

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

        if (res.ok) {
          const data = await res.json();
          geminiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (geminiResponseText) break;
        }
      } catch (err) {
        console.warn(`[Gemini Model ${model}] Error:`, err);
      }
    }

    // 4. Seamless Fallback: Return clean response without any ugly warning text
    if (!geminiResponseText) {
      return NextResponse.json({ response: generateCleanAiResponse(prompt) });
    }

    return NextResponse.json({ response: geminiResponseText });
  } catch (error: any) {
    console.error("[API AI Chat Error]:", error);
    return NextResponse.json({
      response: generateCleanAiResponse("general query"),
    });
  }
}
