import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Analyze content
    const analysis = {
      readability: calculateReadability(content),
      keywords: extractKeywords(content),
      sentiment: analyzeSentiment(content),
      suggestions: generateSuggestions(content)
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
    console.error("Error analyzing content:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
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

function calculateReadability(content: string): number {
  // Implement Flesch-Kincaid readability score
  const words = content.split(/\s+/).length;
  const sentences = content.split(/[.!?]+/).length;
  const syllables = countSyllables(content);
  
  return Math.max(0, Math.min(100,
    206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  ));
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

function analyzeSentiment(content: string): {
  score: number;
  label: 'positive' | 'neutral' | 'negative';
} {
  // Simple sentiment analysis
  const positiveWords = new Set(['good', 'great', 'excellent', 'amazing', 'wonderful']);
  const negativeWords = new Set(['bad', 'poor', 'terrible', 'awful', 'horrible']);
  
  const words = content.toLowerCase().split(/\s+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.has(word)) score++;
    if (negativeWords.has(word)) score--;
  });
  
  const normalizedScore = (score / words.length) * 100;
  
  return {
    score: normalizedScore,
    label: normalizedScore > 20 ? 'positive' : normalizedScore < -20 ? 'negative' : 'neutral'
  };
}

function generateSuggestions(content: string): string[] {
  const suggestions = [];
  
  // Length check
  if (content.length < 300) {
    suggestions.push('Content is too short. Aim for at least 300 words.');
  }
  
  // Paragraph length
  const paragraphs = content.split('\n\n');
  if (paragraphs.some(p => p.length > 300)) {
    suggestions.push('Some paragraphs are too long. Consider breaking them up.');
  }
  
  // Keyword density
  const keywords = extractKeywords(content);
  if (keywords.length < 3) {
    suggestions.push('Add more relevant keywords to improve SEO.');
  }
  
  return suggestions;
}