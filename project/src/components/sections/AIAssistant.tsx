import React, { useState } from 'react';
import { Bot, RefreshCw, Send, Save, Plus, FileText, PenTool, Settings, ArrowRight } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const promptTemplates = {
    seo: [
      {
        title: "Keyword Research",
        prompt: "Analyze the following keywords and provide SEO recommendations:\n[Enter keywords separated by commas]"
      },
      {
        title: "Content Optimization",
        prompt: "Optimize this content for SEO while maintaining readability:\n[Paste your content here]"
      },
      {
        title: "Meta Description Generator",
        prompt: "Generate an SEO-optimized meta description for:\n[Enter page title or topic]"
      }
    ],
    content: [
      {
        title: "Blog Post Outline",
        prompt: "Create a detailed blog post outline for:\n[Enter your topic]"
      },
      {
        title: "Product Description",
        prompt: "Write a compelling product description for:\n[Enter product details]"
      },
      {
        title: "Social Media Post",
        prompt: "Generate engaging social media content for:\n[Enter topic or promotion]"
      }
    ],
    technical: [
      {
        title: "Technical SEO Audit",
        prompt: "Perform a technical SEO analysis for:\n[Enter website URL]"
      },
      {
        title: "Schema Markup Generator",
        prompt: "Generate schema markup for:\n[Enter content type and details]"
      }
    ]
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Example response generation
      const generatedResponse = generateAIResponse(prompt);
      setResponse(generatedResponse);
      
      // Generate related suggestions
      const newSuggestions = generateSuggestions(prompt);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAIResponse = (prompt: string): string => {
    // This is a placeholder for actual AI processing
    const responses = [
      `Based on your request "${prompt}", here are my recommendations:\n\n1. Focus on long-tail keywords\n2. Create comprehensive content\n3. Optimize meta descriptions\n4. Improve internal linking`,
      `Here's an analysis for "${prompt}":\n\n- Current performance metrics\n- Competitor analysis\n- Content gaps identified\n- Action items prioritized`,
      `Regarding "${prompt}", consider these points:\n\n• Technical optimization needed\n• Content structure improvements\n• User experience enhancements\n• Mobile optimization opportunities`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateSuggestions = (prompt: string): string[] => {
    // This is a placeholder for actual suggestion generation
    return [
      "Analyze competitor keywords",
      "Create content calendar",
      "Optimize page speed",
      "Improve mobile experience",
      "Update meta descriptions"
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Assistant</h1>
        <p className="text-gray-500 dark:text-gray-400">Get AI-powered SEO recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">SEO Assistant</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get AI-powered SEO recommendations</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Template
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(promptTemplates).map(([category, templates]) => (
                    templates.map((template, index) => (
                      <button
                        key={`${category}-${index}`}
                        onClick={() => setPrompt(template.prompt)}
                        className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <div className="font-medium">{template.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{category}</div>
                      </button>
                    ))
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Request
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your SEO goals or challenges..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate Recommendations
                  </>
                )}
              </button>

              {response && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium mb-2">AI Response:</h3>
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                    {response}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                {
                  title: 'Optimize Meta Tags',
                  description: 'Get AI suggestions for title and meta description',
                  icon: <FileText className="w-5 h-5" />
                },
                {
                  title: 'Content Analysis',
                  description: 'Analyze content for SEO improvements',
                  icon: <PenTool className="w-5 h-5" />
                },
                {
                  title: 'Technical Audit',
                  description: 'Run a quick technical SEO check',
                  icon: <Settings className="w-5 h-5" />
                },
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(action.title)}
                  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
                      {action.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{action.description}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Suggested Actions</h2>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(suggestion)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between"
                  >
                    <span>{suggestion}</span>
                    <Plus className="w-4 h-4 text-primary-500" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;