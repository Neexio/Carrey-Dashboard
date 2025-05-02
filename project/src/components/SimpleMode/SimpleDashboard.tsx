import React from 'react';
import { Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { websiteAnalyzer } from '../../lib/websiteAnalyzer';

const SimpleDashboard: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyzeWebsite = async (url: string) => {
    setAnalyzing(true);
    try {
      const result = await websiteAnalyzer.analyze(url);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing website:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Quick Website Analysis</h2>
        <div className="flex gap-4">
          <input
            type="url"
            placeholder="Enter your website URL"
            className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg"
          />
          <button
            onClick={() => handleAnalyzeWebsite(url)}
            disabled={analyzing}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
          >
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {analysis && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-primary-500 mr-2" />
                <span>Overall Health Score</span>
              </div>
              <span className="text-xl font-bold">{analysis.seo.score}%</span>
            </div>

            <div className="space-y-2">
              {analysis.seo.issues.map((issue: string, index: number) => (
                <div key={index} className="flex items-center text-red-500">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span>{issue}</span>
                </div>
              ))}
              {analysis.seo.suggestions.map((suggestion: string, index: number) => (
                <div key={index} className="flex items-center text-primary-500">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleDashboard;