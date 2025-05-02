import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      throw new Error("URL parameter is required");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Get real-time analytics with caching
    const cacheKey = `analytics:${targetUrl}`;
    const cachedData = await supabaseClient.from('cache').select('data').eq('key', cacheKey).single();

    let analyticsData;
    if (cachedData.data) {
      analyticsData = cachedData.data;
    } else {
      const { data, error } = await supabaseClient
        .from("website_analytics")
        .select("visitors, page_views, avg_session_time, bounce_rate")
        .eq("url", targetUrl)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      analyticsData = data;

      // Cache the result
      await supabaseClient.from('cache').upsert({
        key: cacheKey,
        data: analyticsData,
        expires_at: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes cache
      });
    }

    return new Response(
      JSON.stringify(analyticsData || {
        visitors: 0,
        pageViews: 0,
        avgSessionTime: 0,
        bounceRate: 0,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  }
});