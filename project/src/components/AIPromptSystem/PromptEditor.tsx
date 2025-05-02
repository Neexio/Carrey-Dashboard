import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Save, History, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Suggestion {
  id: string;
  text: string;
  type: 'seo' | 'content' | 'technical';
  confidence: number;
}

interface PromptTemplate {
  id: string;
  title: string;
  prompt: string;
  category: string;
}

const PromptEditor: React.FC = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [savedPrompts, setSavedPrompts] = useState<PromptTemplate[]>([]);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const templates: PromptTemplate[] = [
    {
      id: '1',
      title: 'SEO Meta Description',
      prompt: 'Generate an optimized meta description for:',
      category: 'seo'
    },
    {
      id: '2',
      title: 'Content Optimization',
      prompt: 'Analyze and suggest improvements for this content:',
      category: 'content'
    },
    {
      id: '3',
      title: 'Technical SEO Audit',
      prompt: 'Perform a technical SEO analysis for:',
      category: 'technical'
    }
  ];

  useEffect(() => {
    // Load saved prompts from user's history
    const loadSavedPrompts = async () => {
      try {
        const { data: prompts } = await supabase
          .from('saved_prompts')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false });
        
        if (prompts) {
          setSavedPrompts(prompts);
        }
      } catch (error) {
        console.error('Error loading saved prompts:', error);
      }
    };

    if (user) {
      loadSavedPrompts();
    }
  }, [user]);

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Example suggestions (replace with actual AI processing)
      const newSuggestions: Suggestion[] = [
        {
          id: '1',
          text: 'Consider adding more specific keywords related to your industry',
          type: 'seo',
          confidence: 0.92
        },
        {
          id: '2',
          text: 'Your content could benefit from more engaging calls-to-action',
          type: 'content',
          confidence: 0.85
        },
        {
          id: '3',
          text: 'Improve page load speed by optimizing image sizes',
          type: 'technical',
          confidence: 0.78
        }
      ];

      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setPrompt(template.prompt);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleSavePrompt = async () => {
    if (!prompt.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('saved_prompts')
        .insert([
          {
            user_id: user.id,
            title: `Saved Prompt ${savedPrompts.length + 1}`,
            prompt: prompt,
            category: selectedTemplate?.category || 'general'
          }
        ]);

      if (error) throw error;

      // Refresh saved prompts
      const { data: prompts } = await supabase
        .from('saved_prompts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (prompts) {
        setSavedPrompts(prompts);
      }
    } catch (error) {
      console.error('Error saving prompt:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">AI Prompt Assistant</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Use AI to generate optimized content and receive real-time suggestions
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Sparkles className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
              onChange={(e) => {
                const template = templates.find(t => t.id === e.target.value);
                if (template) handleTemplateSelect(template);
              }}
              value={selectedTemplate?.id || ''}
            >
              <option value="">Select a template</option>
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSavePrompt}
          className="px-4 py-2 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
        >
          <Save className="h-5 w-5 mr-2" />
          Save
        </button>
      </div>

      <div className="mb-6">
        <textarea
          ref={editorRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full h-32 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePromptSubmit}
          disabled={isGenerating || !prompt.trim()}
          className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Generate
            </>
          )}
        </button>

        <div className="flex items-center">
          <History className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {savedPrompts.length} saved prompts
          </span>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">AI Suggestions</h3>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div className="flex items-start">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${
                  suggestion.type === 'seo'
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : suggestion.type === 'content'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                }`}>
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{suggestion.type} Suggestion</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round(suggestion.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {suggestion.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromptEditor;