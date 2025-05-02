import React, { useState } from 'react';
import { Bot, RefreshCw, AlertCircle, CheckCircle, FileText, Download, UploadCloud, Sparkles } from 'lucide-react';

const ContentDetector: React.FC = () => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const templateTexts = {
    seo: [
      {
        title: "Product Description Template",
        content: `Discover the [Product Name] - [Key Benefit]. Featuring [Key Feature 1], [Key Feature 2], and [Key Feature 3], this [Product Category] is designed to [Main Value Proposition]. Perfect for [Target Audience], it offers [Unique Selling Point]. Experience [Key Benefit] today with our [Guarantee/Warranty] guarantee.`
      },
      {
        title: "Blog Post Template",
        content: `[Attention-Grabbing Headline]\n\nAre you struggling with [Common Pain Point]? In this comprehensive guide, we'll explore [Topic] and show you how to [Desired Outcome]. Learn proven strategies for [Key Benefit] and discover why [Unique Insight] matters more than ever.\n\nKey takeaways:\n- [Point 1]\n- [Point 2]\n- [Point 3]`
      },
      {
        title: "Service Page Template",
        content: `Transform your [Industry/Niche] with our professional [Service Name] services. Our expert team specializes in [Key Specialization] and delivers [Value Proposition]. With [X] years of experience and [Proof Point], we ensure [Guarantee]. Contact us today for [Call to Action].`
      }
    ],
    marketing: [
      {
        title: "Email Newsletter Template",
        content: `Subject: [Compelling Offer] - Limited Time Only!\n\nDear [Name],\n\nWe're excited to share [Announcement/Offer]. As a valued customer, you get exclusive access to [Special Benefit]. Don't miss out on [Value Proposition].\n\n[Call to Action Button]\n\nBest regards,\n[Company Name]`
      },
      {
        title: "Social Media Post Template",
        content: `🚀 [Attention-Grabbing Hook]\n\n💡 Did you know? [Interesting Fact/Statistic]\n\n✨ Here's how [Solution/Product] can help:\n• [Benefit 1]\n• [Benefit 2]\n• [Benefit 3]\n\n🔥 [Call to Action]\n\n#[Hashtag1] #[Hashtag2] #[Hashtag3]`
      }
    ],
    technical: [
      {
        title: "API Documentation Template",
        content: `# [API Endpoint Name]\n\nEndpoint: \`[HTTP Method] /api/v1/[resource]\`\n\n## Description\n[Brief description of what this endpoint does]\n\n## Parameters\n- \`[parameter1]\`: [description]\n- \`[parameter2]\`: [description]\n\n## Response\n\`\`\`json\n{\n  "status": "success",\n  "data": {}\n}\n\`\`\``
      },
      {
        title: "Technical Guide Template",
        content: `# [Technical Topic]\n\n## Overview\n[Brief introduction to the technical concept]\n\n## Prerequisites\n- [Requirement 1]\n- [Requirement 2]\n\n## Step-by-Step Guide\n1. [First step]\n2. [Second step]\n3. [Third step]\n\n## Best Practices\n- [Best practice 1]\n- [Best practice 2]`
      }
    ]
  };

  const analyzeContent = async () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // Simulated analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
      const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
      const avgWordsPerSentence = Math.round(wordCount / sentences);
      const readabilityScore = calculateReadabilityScore(content);
      const keywords = extractKeywords(content);
      const sentiment = analyzeSentiment(content);

      setAnalysisResult({
        metrics: {
          wordCount,
          sentences,
          avgWordsPerSentence,
          readabilityScore,
          keywords,
          sentiment
        },
        suggestions: generateSuggestions(content, {
          wordCount,
          readabilityScore,
          avgWordsPerSentence
        }),
        improvements: generateImprovements(content)
      });
    } catch (error) {
      console.error('Error analyzing content:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const calculateReadabilityScore = (text: string): number => {
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const syllables = countSyllables(text);
    return Math.max(0, Math.min(100,
      206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
    ));
  };

  const countSyllables = (text: string): number => {
    return text.split(/\s+/)
      .map(word => {
        word = word.toLowerCase();
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        word = word.replace(/^y/, '');
        return word.match(/[aeiouy]{1,2}/g)?.length || 0;
      })
      .reduce((a, b) => a + b, 0);
  };

  const extractKeywords = (text: string): string[] => {
    const words = text.toLowerCase()
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
  };

  const analyzeSentiment = (text: string): {
    score: number;
    label: 'positive' | 'neutral' | 'negative';
  } => {
    const positiveWords = new Set(['good', 'great', 'excellent', 'amazing', 'wonderful']);
    const negativeWords = new Set(['bad', 'poor', 'terrible', 'awful', 'horrible']);
    
    const words = text.toLowerCase().split(/\s+/);
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
  };

  const generateSuggestions = (text: string, metrics: any): string[] => {
    const suggestions = [];
    
    if (metrics.wordCount < 300) {
      suggestions.push('Consider adding more content to improve comprehensiveness (aim for 300+ words)');
    }
    
    if (metrics.readabilityScore < 60) {
      suggestions.push('Try simplifying your language to improve readability');
    }
    
    if (metrics.avgWordsPerSentence > 20) {
      suggestions.push('Consider breaking down longer sentences for better readability');
    }
    
    return suggestions;
  };

  const generateImprovements = (text: string): string[] => {
    const improvements = [];
    
    // Check for passive voice
    if (/\b(am|is|are|was|were|be|been|being)\s+\w+ed\b/i.test(text)) {
      improvements.push('Consider using active voice instead of passive voice');
    }
    
    // Check for weak words
    const weakWords = ['very', 'really', 'quite', 'basically', 'actually'];
    if (weakWords.some(word => text.toLowerCase().includes(word))) {
      improvements.push('Replace weak or unnecessary words with stronger alternatives');
    }
    
    // Check for repetitive words
    const words = text.toLowerCase().split(/\s+/);
    const wordFreq: { [key: string]: number } = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    const repetitiveWords = Object.entries(wordFreq)
      .filter(([word, count]) => count > 3 && word.length > 3)
      .map(([word]) => word);
    
    if (repetitiveWords.length > 0) {
      improvements.push(`Consider using synonyms for frequently used words: ${repetitiveWords.join(', ')}`);
    }
    
    return improvements;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Detector</h1>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={analyzeContent}
            disabled={isAnalyzing || !content.trim()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center text-sm font-medium"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Bot className="w-4 h-4 mr-2" />
                Analyze Content
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Content Analysis</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Paste your content below</p>
                </div>
              </div>
              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center text-sm">
                <UploadCloud className="w-4 h-4 mr-1" />
                Upload File
              </button>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your content here..."
              className="w-full h-64 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />

            <div className="mt-4 space-y-2">
              <h3 className="font-medium text-sm mb-2">Quick Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(templateTexts).map(([category, templates]) => (
                  templates.map((template, index) => (
                    <button
                      key={`${category}-${index}`}
                      onClick={() => setContent(template.content)}
                      className="p-2 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <div className="font-medium text-sm">{template.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{category}</div>
                    </button>
                  ))
                ))}
              </div>
            </div>

            {analysisResult && (
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Word Count</div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {analysisResult.metrics.wordCount}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Readability</div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {Math.round(analysisResult.metrics.readabilityScore)}%
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Sentiment</div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {analysisResult.metrics.sentiment.label}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Sentences</div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {analysisResult.metrics.sentences}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Suggestions</h3>
                  <div className="space-y-2">
                    {analysisResult.suggestions.map((suggestion: string, index: number) => (
                      <div key={index} className="flex items-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-green-800 dark:text-green-400">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Improvements Needed</h3>
                  <div className="space-y-2">
                    {analysisResult.improvements.map((improvement: string, index: number) => (
                      <div key={index} className="flex items-center p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                        <span className="text-red-800 dark:text-red-400">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Top Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.metrics.keywords.map((keyword: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Analysis Features</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Content Quality',
                  description: 'Analyzes readability, structure, and engagement',
                  icon: <FileText className="w-5 h-5" />,
                },
                {
                  title: 'SEO Analysis',
                  description: 'Checks keyword usage and optimization',
                  icon: <Bot className="w-5 h-5" />,
                },
                {
                  title: 'Smart Suggestions',
                  description: 'Get AI-powered improvement recommendations',
                  icon: <Sparkles className="w-5 h-5" />,
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="h-8 w-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Analyses</h2>
            <div className="space-y-3">
              {[
                { title: 'Blog Post Draft', score: 92, time: '2 hours ago' },
                { title: 'Product Description', score: 88, time: '5 hours ago' },
                { title: 'Landing Page Copy', score: 95, time: '1 day ago' },
              ].map((analysis, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">{analysis.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{analysis.time}</div>
                  </div>
                  <div className="flex items-center">
                    {analysis.score >= 90 ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    )}
                    <span className="ml-2 text-sm font-medium">{analysis.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetector;