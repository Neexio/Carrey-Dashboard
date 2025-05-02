import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'warning' | 'success' | 'info';
  message: string;
  category: 'seo' | 'content' | 'technical';
  priority: 'high' | 'medium' | 'low';
}

const RealTimeSuggestions: React.FC<{ content: string }> = ({ content }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const analyzeContent = async () => {
      if (!content.trim()) {
        setSuggestions([]);
        return;
      }

      setIsAnalyzing(true);
      try {
        // Debounce the analysis to prevent too many requests
        await new Promise(resolve => setTimeout(resolve, 500));

        // Example real-time suggestions (replace with actual AI analysis)
        const newSuggestions: Suggestion[] = [
          {
            id: '1',
            type: 'warning',
            message: 'Consider adding more relevant keywords to improve SEO',
            category: 'seo',
            priority: 'high'
          },
          {
            id: '2',
            type: 'success',
            message: 'Good use of headers and structure',
            category: 'content',
            priority: 'medium'
          },
          {
            id: '3',
            type: 'info',
            message: 'Optimize images to improve page load speed',
            category: 'technical',
            priority: 'low'
          }
        ];

        setSuggestions(newSuggestions);
      } catch (error) {
        console.error('Error analyzing content:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    const debounceTimeout = setTimeout(analyzeContent, 1000);
    return () => clearTimeout(debounceTimeout);
  }, [content]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Real-Time Analysis</h3>
        {isAnalyzing && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            Analyzing...
          </div>
        )}
      </div>

      <div className="space-y-3">
        {suggestions.map(suggestion => (
          <div
            key={suggestion.id}
            className={`p-4 rounded-lg flex items-start ${
              suggestion.type === 'warning'
                ? 'bg-yellow-50 dark:bg-yellow-900/10'
                : suggestion.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/10'
                : 'bg-blue-50 dark:bg-blue-900/10'
            }`}
          >
            <div className="flex-shrink-0 mr-3">
              {suggestion.type === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              ) : suggestion.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-blue-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  suggestion.type === 'warning'
                    ? 'text-yellow-800 dark:text-yellow-400'
                    : suggestion.type === 'success'
                    ? 'text-green-800 dark:text-green-400'
                    : 'text-blue-800 dark:text-blue-400'
                }`}>
                  {suggestion.category.toUpperCase()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  suggestion.priority === 'high'
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                    : suggestion.priority === 'medium'
                    ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                    : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                }`}>
                  {suggestion.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {suggestion.message}
              </p>
            </div>
          </div>
        ))}

        {!isAnalyzing && suggestions.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No suggestions yet. Start typing to get real-time feedback.
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeSuggestions;