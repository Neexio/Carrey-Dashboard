import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { parse } from "npm:node-html-parser@6.1.12";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";
import puppeteer from "npm:puppeteer-core@21.10.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface AnalysisResult {
  title: string;
  description: string;
  h1s: string[];
  images: { src: string; alt: string | null }[];
  links: { href: string; text: string }[];
  performance: {
    loadTime: number;
    resourceCount: number;
  };
  seo: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  content: {
    readabilityScore: number;
    wordCount: number;
    keywords: string[];
  };
  technical: {
    mobile: boolean;
    ssl: boolean;
    speed: {
      fcp: number;
      lcp: number;
      cls: number;
    };
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    // Launch headless browser
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const startTime = Date.now();
    
    // Enable performance metrics
    await page.setCacheEnabled(false);
    const client = await page.target().createCDPSession();
    await client.send('Performance.enable');

    // Navigate and wait for network idle
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Get performance metrics
    const performanceMetrics = await client.send('Performance.getMetrics');
    const metrics = performanceMetrics.metrics.reduce((acc, metric) => {
      acc[metric.name] = metric.value;
      return acc;
    }, {});

    // Get page content and analyze
    const content = await page.content();
    const root = parse(content);

    // Extract metadata
    const title = root.querySelector('title')?.text || '';
    const description = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const h1s = root.querySelectorAll('h1').map(h1 => h1.text.trim());
    const images = root.querySelectorAll('img').map(img => ({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt'),
    }));
    const links = root.querySelectorAll('a').map(a => ({
      href: a.getAttribute('href') || '',
      text: a.text.trim(),
    }));

    // Check mobile responsiveness
    const mobile = await page.emulate(puppeteer.devices['iPhone X']);

    // Close browser
    await browser.close();

    const analysis: AnalysisResult = {
      title,
      description,
      h1s,
      images,
      links,
      performance: {
        loadTime: Date.now() - startTime,
        resourceCount: images.length + links.length,
      },
      seo: {
        score: calculateSEOScore({ title, description, h1s, images }),
        issues: findSEOIssues({ title, description, h1s, images }),
        suggestions: generateSEOSuggestions({ title, description, h1s, images }),
      },
      content: {
        readabilityScore: calculateReadabilityScore(content),
        wordCount: countWords(content),
        keywords: extractKeywords(content),
      },
      technical: {
        mobile: mobile !== null,
        ssl: url.startsWith('https'),
        speed: {
          fcp: metrics['FirstContentfulPaint'] || 0,
          lcp: metrics['LargestContentfulPaint'] || 0,
          cls: metrics['CumulativeLayoutShift'] || 0,
        },
      },
    };

    return new Response(
      JSON.stringify(analysis),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: `Analysis failed: ${error.message}` }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});

function calculateSEOScore(data: any): number {
  let score = 100;
  
  if (!data.title) score -= 10;
  if (!data.description) score -= 10;
  if (data.h1s.length === 0) score -= 10;
  if (data.h1s.length > 1) score -= 5;
  
  const imagesWithoutAlt = data.images.filter((img: any) => !img.alt).length;
  score -= Math.min(imagesWithoutAlt * 2, 10);
  
  return Math.max(0, score);
}

function findSEOIssues(data: any): string[] {
  const issues = [];
  
  if (!data.title) issues.push('Missing page title');
  if (!data.description) issues.push('Missing meta description');
  if (data.h1s.length === 0) issues.push('Missing H1 tag');
  if (data.h1s.length > 1) issues.push('Multiple H1 tags found');
  
  const imagesWithoutAlt = data.images.filter((img: any) => !img.alt).length;
  if (imagesWithoutAlt > 0) {
    issues.push(`${imagesWithoutAlt} images missing alt text`);
  }
  
  return issues;
}

function generateSEOSuggestions(data: any): string[] {
  const suggestions = [];
  
  if (data.title && (data.title.length < 30 || data.title.length > 60)) {
    suggestions.push('Optimize title length (30-60 characters recommended)');
  }
  
  if (data.description && (data.description.length < 120 || data.description.length > 160)) {
    suggestions.push('Optimize meta description length (120-160 characters recommended)');
  }
  
  return suggestions;
}

function calculateReadabilityScore(content: string): number {
  // Implement Flesch-Kincaid readability score
  const words = content.split(/\s+/).length;
  const sentences = content.split(/[.!?]+/).length;
  const syllables = countSyllables(content);
  
  return Math.max(0, Math.min(100,
    206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  ));
}

function countWords(content: string): number {
  return content.split(/\s+/).filter(word => word.length > 0).length;
}

function countSyllables(content: string): number {
  return content.split(/\s+/)
    .map(word => {
      word = word.toLowerCase();
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      return word.match(/[aeiouy]{1,2}/g)?.length || 0;
    })
    .reduce((a, b) => a + b, 0);
}

function extractKeywords(content: string): string[] {
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const frequencies: { [key: string]: number } = {};
  words.forEach(word => {
    frequencies[word] = (frequencies[word] || 0) + 1;
  });
  
  return Object.entries(frequencies)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
}