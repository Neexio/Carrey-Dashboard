import { supabase } from './supabase';
import { pipeline } from '@xenova/transformers';

interface AIResponse {
  suggestions: Array<{
    type: 'seo' | 'content' | 'technical';
    message: string;
    priority: 'high' | 'medium' | 'low';
    impact: string;
    action: string;
  }>;
}

const aiService = {
  models: {
    classifier: null as any,
    generator: null as any,
    summarizer: null as any
  },

  async initializeModels() {
    try {
      // Initialize models in parallel
      const [classifier, generator, summarizer] = await Promise.all([
        pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english'),
        pipeline('text-generation', 'Xenova/gpt2'),
        pipeline('summarization', 'Xenova/bart-large-cnn')
      ]);

      this.models = { classifier, generator, summarizer };

      // Cache model status
      await supabase.from('ai_models').upsert([
        { model_id: 'classifier', status: 'ready', last_updated: new Date().toISOString() },
        { model_id: 'generator', status: 'ready', last_updated: new Date().toISOString() },
        { model_id: 'summarizer', status: 'ready', last_updated: new Date().toISOString() }
      ]);
    } catch (error) {
      console.error('Error initializing AI models:', error);
      throw error;
    }
  },

  async analyzeSite(url: string): Promise<AIResponse> {
    try {
      // Check cache first
      const { data: cachedAnalysis } = await supabase
        .from('ai_analysis_cache')
        .select('*')
        .eq('url', url)
        .single();

      if (cachedAnalysis && Date.now() - new Date(cachedAnalysis.created_at).getTime() < 3600000) {
        return cachedAnalysis.analysis;
      }

      // Get website analysis
      const analysis = await this.crawlAndAnalyze(url);
      
      // Generate prioritized suggestions
      const suggestions = await this.generateSuggestions(analysis);

      // Store analysis in cache
      await supabase.from('ai_analysis_cache').upsert({
        url,
        analysis: { suggestions },
        created_at: new Date().toISOString()
      });

      return { suggestions };
    } catch (error) {
      console.error('Error in AI analysis:', error);
      throw error;
    }
  },

  async generateContent(topic: string, keywords: string[]): Promise<string> {
    if (!this.models.generator) await this.initializeModels();

    try {
      // Generate optimized content structure
      const structure = await this.generateContentStructure(topic, keywords);

      // Generate content with real-time optimization
      const content = await this.generateOptimizedContent(structure, keywords);

      // Store content template with analytics
      const { data: template } = await supabase
        .from('content_templates')
        .insert({
          topic,
          keywords,
          structure,
          content,
          performance_metrics: {
            readability_score: await this.analyzeReadability(content),
            keyword_density: this.calculateKeywordDensity(content, keywords),
            sentiment_score: (await this.models.classifier(content))[0].score
          }
        })
        .select()
        .single();

      return template.content;
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  },

  async checkPlagiarism(content: string) {
    try {
      // Generate content fingerprint
      const fingerprint = await this.generateFingerprint(content);
      
      // Check for similar content
      const matches = await this.findSimilarContent(fingerprint);
      
      // Calculate originality score
      const originalityScore = this.calculateOriginalityScore(matches);

      return {
        originalityScore,
        matches
      };
    } catch (error) {
      console.error('Error checking plagiarism:', error);
      throw error;
    }
  },

  async crawlAndAnalyze(url: string) {
    const response = await fetch(url);
    const html = await response.text();
    
    // Extract key elements
    const title = this.extractTitle(html);
    const meta = this.extractMetaTags(html);
    const content = this.extractContent(html);
    
    // Analyze content in parallel
    const [readabilityScore, keywordDensity, technicalIssues] = await Promise.all([
      this.analyzeReadability(content),
      this.calculateKeywordDensity(content),
      this.checkTechnicalIssues(html)
    ]);
    
    return {
      title,
      meta,
      content,
      readabilityScore,
      keywordDensity,
      technicalIssues
    };
  },

  async generateSuggestions(analysis: any) {
    const suggestions = [];
    
    // SEO suggestions
    if (analysis.readabilityScore < 60) {
      suggestions.push({
        type: 'content',
        message: 'Content readability needs improvement',
        priority: 'high',
        impact: 'Better user engagement',
        action: 'Simplify content and use shorter sentences'
      });
    }

    // Technical suggestions
    for (const issue of analysis.technicalIssues) {
      suggestions.push({
        type: 'technical',
        message: issue.description,
        priority: issue.severity,
        impact: issue.impact,
        action: issue.solution
      });
    }

    return suggestions;
  },

  async generateContentStructure(topic: string, keywords: string[]) {
    const prompt = `Create an SEO-optimized content structure for ${topic} using these keywords: ${keywords.join(', ')}`;
    const result = await this.generator(prompt, { max_length: 100 });
    return result[0].generated_text;
  },

  async generateOptimizedContent(structure: any, keywords: string[]) {
    const prompt = `Generate SEO-optimized content following this structure: ${JSON.stringify(structure)}. Use these keywords naturally: ${keywords.join(', ')}`;
    const result = await this.generator(prompt, { max_length: 500 });
    return result[0].generated_text;
  },

  async storeSuggestions(url: string, suggestions: any[]) {
    try {
      await supabase
        .from('prompt_suggestions')
        .insert(suggestions.map(s => ({
          suggestion_text: s.message,
          category: s.type,
          confidence: s.priority === 'high' ? 0.9 : s.priority === 'medium' ? 0.7 : 0.5
        })));
    } catch (error) {
      console.error('Error storing suggestions:', error);
    }
  },

  async storeContentTemplate(content: any) {
    try {
      await supabase
        .from('content_pieces')
        .insert([{
          title: content.title,
          content: JSON.stringify(content),
          status: 'draft'
        }]);
    } catch (error) {
      console.error('Error storing content template:', error);
    }
  },

  extractTitle(html: string): string {
    const match = html.match(/<title>(.*?)<\/title>/i);
    return match ? match[1] : '';
  },

  extractMetaTags(html: string): Record<string, string> {
    const meta: Record<string, string> = {};
    const matches = html.matchAll(/<meta.*?name="(.*?)".*?content="(.*?)".*?>/gi);
    for (const match of matches) {
      meta[match[1]] = match[2];
    }
    return meta;
  },

  extractContent(html: string): string {
    // Remove scripts, styles, and HTML tags
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  },

  async analyzeReadability(text: string): Promise<number> {
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const syllables = this.countSyllables(text);
    
    // Flesch-Kincaid readability score
    return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  },

  countSyllables(text: string): number {
    return text.split(/\s+/)
      .map(word => {
        word = word.toLowerCase();
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        return word.match(/[aeiouy]{1,2}/g)?.length || 0;
      })
      .reduce((a, b) => a + b, 0);
  },

  calculateKeywordDensity(text: string): Record<string, number> {
    const words = text.toLowerCase().split(/\s+/);
    const total = words.length;
    const density: Record<string, number> = {};
    
    words.forEach(word => {
      density[word] = (density[word] || 0) + 1;
    });
    
    Object.keys(density).forEach(word => {
      density[word] = (density[word] / total) * 100;
    });
    
    return density;
  },

  async checkTechnicalIssues(html: string) {
    const issues = [];
    
    // Check meta tags
    if (!html.includes('<meta name="description"')) {
      issues.push({
        description: 'Missing meta description',
        severity: 'high',
        impact: 'Reduced SEO performance',
        solution: 'Add a descriptive meta description'
      });
    }
    
    // Check image alt tags
    const images = html.match(/<img[^>]+>/g) || [];
    const imagesWithoutAlt = images.filter(img => !img.includes('alt='));
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        description: `${imagesWithoutAlt.length} images missing alt text`,
        severity: 'medium',
        impact: 'Reduced accessibility and SEO',
        solution: 'Add descriptive alt text to all images'
      });
    }
    
    return issues;
  },

  async generateFingerprint(content: string): Promise<string> {
    // Implement Rabin-Karp rolling hash
    const windowSize = 5;
    const base = 256;
    const prime = 101;
    let hash = 0;
    
    for (let i = 0; i < windowSize; i++) {
      hash = (hash * base + content.charCodeAt(i)) % prime;
    }
    
    return hash.toString(16);
  },

  async findSimilarContent(fingerprint: string) {
    // Implement similarity checking
    return [];
  },

  calculateOriginalityScore(matches: any[]): number {
    return matches.length === 0 ? 100 : Math.max(0, 100 - matches.length * 10);
  }
};

export default aiService;

export { aiService }