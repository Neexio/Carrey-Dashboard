import React, { useState } from 'react';
import { FileText, Search, AlertCircle, CheckCircle, RefreshCw, Download, UploadCloud, Link, ExternalLink } from 'lucide-react';
import { aiService } from '../../lib/ai';

const PlagiarismChecker: React.FC = () => {
  const [content, setContent] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<{
    originalityScore: number;
    matches: Array<{ text: string; source: string; similarity: number }>;
  } | null>(null);

  const handleCheck = async () => {
    if (!content.trim()) return;
    
    setIsChecking(true);
    try {
      const checkResults = await aiService.checkPlagiarism(content);
      setResults(checkResults);
    } catch (error) {
      console.error('Error checking plagiarism:', error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Plagiarism Checker</h1>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={handleCheck}
            disabled={isChecking || !content.trim()}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center text-sm font-medium"
          >
            {isChecking ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Check Plagiarism
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
                  <h2 className="text-lg font-semibold">Content Check</h2>
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
              placeholder="Enter your content here to check for plagiarism..."
              className="w-full h-64 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />

            {results && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="text-lg font-semibold">Originality Score</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Based on comprehensive analysis</div>
                  </div>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {results.originalityScore}%
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Content Matches</h3>
                  <div className="space-y-4">
                    {results.matches.map((match, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{match.text}</p>
                            <a 
                              href={match.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 dark:text-primary-400 hover:underline flex items-center text-sm"
                            >
                              <Link className="w-4 h-4 mr-1" />
                              {match.source}
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </div>
                          <div className="ml-4">
                            <span className={`text-sm font-medium ${
                              match.similarity > 80 
                                ? 'text-red-600 dark:text-red-400'
                                : match.similarity > 60
                                  ? 'text-orange-600 dark:text-orange-400'
                                  : 'text-green-600 dark:text-green-400'
                            }`}>
                              {match.similarity}% match
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Checker Features</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Deep Web Search',
                  description: 'Scans billions of web pages and documents',
                  icon: <Search className="w-5 h-5" />,
                },
                {
                  title: 'Real-time Analysis',
                  description: 'Get instant results for your content',
                  icon: <RefreshCw className="w-5 h-5" />,
                },
                {
                  title: 'Source Attribution',
                  description: 'Identifies original content sources',
                  icon: <Link className="w-5 h-5" />,
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
            <h2 className="text-lg font-semibold mb-4">Recent Checks</h2>
            <div className="space-y-3">
              {[
                { title: 'SEO Article', score: 95, time: '2 hours ago' },
                { title: 'Product Review', score: 82, time: '5 hours ago' },
                { title: 'Blog Post', score: 98, time: '1 day ago' },
              ].map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">{check.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{check.time}</div>
                  </div>
                  <div className="flex items-center">
                    {check.score >= 90 ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    )}
                    <span className="ml-2 text-sm font-medium">{check.score}%</span>
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

export default PlagiarismChecker;