import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { affiliateProducts, autoFormatAffiliateLink } from "@/lib/affiliate-links";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let targetUrl = "";
  let merchant = "Amazon";

  try {
    // 1. Check Supabase DB for product
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const { data } = await supabase
        .from("affiliate_products")
        .select("affiliate_link, merchant, id")
        .eq("id", id)
        .single();

      if (data && data.affiliate_link) {
        targetUrl = data.affiliate_link;
        merchant = data.merchant || "Amazon";
      }
    }
  } catch (err) {
    console.error("[go-route] Supabase lookup error:", err);
  }

  // 2. Fallback to static list if not found in DB
  if (!targetUrl) {
    const staticItem = affiliateProducts.find((p) => p.id === id);
    if (staticItem) {
      targetUrl = staticItem.link;
      merchant = staticItem.merchant || "Amazon";
    }
  }

  // If still not found, redirect to home page
  if (!targetUrl) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Ensure affiliate tags are attached
  const finalAffiliateUrl = autoFormatAffiliateLink(targetUrl, merchant);

  // 4. Log click tracking in background (non-blocking)
  try {
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    supabase
      .from("affiliate_clicks")
      .insert({
        product_id: id,
        user_agent: userAgent.substring(0, 255),
        referrer: referrer.substring(0, 255),
      })
      .then((res: any) => {
        if (res.error) console.log("[go-route] Click log note:", res.error.message);
      });
  } catch (e) {
    // Ignore logging errors so user redirect is never blocked
  }

  // 5. Perform 302 Redirect to merchant store
  return NextResponse.redirect(finalAffiliateUrl, { status: 302 });
}
