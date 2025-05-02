import React, { useState } from 'react';
import { Globe, CheckCircle, AlertCircle, ArrowRight, Sparkles, FileText, Settings } from 'lucide-react';
import { websiteAnalyzer } from '../../lib/websiteAnalyzer';

const SimplifiedDashboard: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const isValidUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleAnalyzeWebsite = async () => {
    if (!websiteUrl) {
      setError('Please enter a website URL');
      return;
    }

    if (!isValidUrl(websiteUrl)) {
      setError('Please enter a valid website URL (starting with http:// or https://)');
      return;
    }

    setError(null);
    setAnalyzing(true);
    
    try {
      const result = await websiteAnalyzer.analyze(websiteUrl);
      if ('error' in result) {
        throw new Error(result.error);
      }
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing website:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze website. Please try again.');
      setAnalysis(null);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Let's improve your website</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center mb-2">
              <Globe className="w-5 h-5 text-primary-500 mr-2" />
              <h3 className="font-medium">Analyze Website</h3>
            </div>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => {
                setWebsiteUrl(e.target.value);
                setError(null);
              }}
              placeholder="Enter your website URL"
              className={`w-full px-3 py-2 border rounded-lg mb-2 ${
                error 
                  ? 'border-red-500 dark:border-red-500' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            />
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 mb-2">
                {error}
              </p>
            )}
            <button
              onClick={handleAnalyzeWebsite}
              disabled={analyzing || !websiteUrl}
              className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
            >
              {analyzing ? 'Analyzing...' : 'Start Analysis'}
            </button>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center mb-2">
              <Sparkles className="w-5 h-5 text-primary-500 mr-2" />
              <h3 className="font-medium">Content Helper</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Get AI-powered content suggestions
            </p>
            <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
              Create Content
            </button>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center mb-2">
              <FileText className="w-5 h-5 text-primary-500 mr-2" />
              <h3 className="font-medium">Quick Report</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Generate a simple SEO report
            </p>
            <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Website Health Check</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              analysis.seo.score >= 80
                ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                : analysis.seo.score >= 60
                ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
            }`}>
              Score: {analysis.seo.score}%
            </span>
          </div>

          <div className="space-y-6">
            {/* Quick Wins */}
            <div>
              <h4 className="font-medium mb-3">Quick Wins</h4>
              <div className="space-y-2">
                {analysis.seo.suggestions.slice(0, 3).map((suggestion: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-green-800 dark:text-green-400">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues to Fix */}
            <div>
              <h4 className="font-medium mb-3">Issues to Fix</h4>
              <div className="space-y-2">
                {analysis.seo.issues.map((issue: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-red-800 dark:text-red-400">{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button className="flex items-center text-primary-600 dark:text-primary-400 hover:underline">
                View Detailed Report <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Need Help?</h3>
          <Settings className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left">
            <h4 className="font-medium mb-1">SEO Guide</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn SEO basics and best practices
            </p>
          </button>
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left">
            <h4 className="font-medium mb-1">Video Tutorials</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Watch step-by-step tutorials
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedDashboard;