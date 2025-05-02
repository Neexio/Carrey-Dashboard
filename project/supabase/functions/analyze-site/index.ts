import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { parse } from 'npm:node-html-parser';
import { createClient } from 'npm:@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    // Fetch and analyze the webpage
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);

    // Perform analysis
    const title = root.querySelector('title')?.text || '';
    const metaDescription = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const h1s = root.querySelectorAll('h1').map(h1 => h1.text.trim());
    const images = root.querySelectorAll('img').map(img => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
    }));

    const analysis = {
      title,
      metaDescription,
      h1s,
      images,
      timestamp: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify(analysis),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});