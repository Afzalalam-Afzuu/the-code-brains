import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, history } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // System prompt giving complete context of TheCodeBrains website + world knowledge
    const systemInstruction = `You are "Brainy AI", the official AI Assistant of 'TheCodeBrains' (India's premier tech reviews, price comparison, & verified deals portal).
Your personality: Smart, friendly, knowledgeable, enthusiastic, concise, and helpful.

WEBSITE KNOWLEDGE & FEATURES YOU MUST HIGHLIGHT WHEN RELEVANT:
1. Product Catalog: Smartphones, Laptops, OLED/QLED TVs, Audio/Earbuds, AI Tools, Smart Home, and Online Courses (Udemy).
2. Price Comparison: Every product card displays "ALSO AVAILABLE ON" comparing Amazon vs Flipkart prices in real time.
3. Verified Coupons: Users can copy instant coupon codes (like HUMID100) directly on product cards.
4. Navigation Routes:
   - Browse Deals: /browse
   - Phone Hub & Reviews: /phones/best-picks
   - Laptops & Computing: /computing/best-laptops
   - Blog & Tech News: /blog
   - Join Plus Membership: /join

RULES:
- If the user asks about smartphones, tech, laptops, deals, coupons, or website features, give expert shopping advice and suggest relevant site sections.
- If the user asks ANY general knowledge question about world events, science, history, coding, sports, math, advice, or general topics outside shopping, answer intelligently and accurately using your Google Gemini world knowledge!
- Use emojis and clear markdown styling (bullet points, bold text). Keep responses readable and under 180 words.`;

    if (!apiKey) {
      return NextResponse.json({
        response: `TheCodeBrains AI Engine: Here is information regarding your query on **${prompt}**. You can explore our live deals at /browse or top phone picks at /phones/best-picks!`,
      });
    }

    // Prepare contents payload for Gemini API
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `${systemInstruction}\n\nUser Question: ${prompt}`,
          },
        ],
      },
    ];

    // Try primary model (gemini-1.5-flash) or fallback (gemini-2.0-flash / gemini-pro)
    const modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-pro"];
    let geminiResponseText = "";
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ contents }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          geminiResponseText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (geminiResponseText) break;
        } else {
          const errData = await res.text();
          console.warn(`[Gemini API] Model ${model} returned error:`, errData);
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!geminiResponseText) {
      console.error("[Gemini API] Failed to get response from Gemini API:", lastError);
      return NextResponse.json({
        response: `I'm here to help! For "${prompt}", check out our curated tech hub at **/browse** for live deals & price comparisons!`,
      });
    }

    return NextResponse.json({ response: geminiResponseText });
  } catch (error: any) {
    console.error("[API AI Chat Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
