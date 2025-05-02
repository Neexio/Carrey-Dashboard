import React, { useState } from 'react';
import { Link2, ExternalLink, TrendingUp, ArrowUpRight, ArrowDownRight, Filter, Download, RefreshCw, Search } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const Backlinks: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Backlinks',
        data: [120, 150, 180, 250, 300, 380],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const analyzeBacklinks = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Backlinks</h1>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={analyzeBacklinks}
            disabled={isAnalyzing}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center text-sm font-medium"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4 mr-2" />
                Analyze Backlinks
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Backlinks</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +12.5%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">2,847</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Domain Authority</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +3.2
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">56</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Referring Domains</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +8.7%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">432</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Lost Backlinks</h3>
            <span className="text-red-500 text-sm flex items-center">
              <ArrowDownRight size={16} className="mr-1" />
              -2.3%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Backlinks</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search backlinks..."
                    className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <Filter className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">DA</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Added</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { source: 'example.com/blog', da: 65, type: 'Dofollow', added: '2 hours ago' },
                    { source: 'news.site.com', da: 78, type: 'Dofollow', added: '5 hours ago' },
                    { source: 'tech-blog.net', da: 45, type: 'Nofollow', added: '1 day ago' },
                    { source: 'industry-news.com', da: 72, type: 'Dofollow', added: '2 days ago' },
                    { source: 'review-site.org', da: 58, type: 'Nofollow', added: '3 days ago' },
                  ].map((backlink, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{backlink.source}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">{backlink.da}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          backlink.type === 'Dofollow'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        }`}>
                          {backlink.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {backlink.added}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
                          <ExternalLink size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Backlinks Growth</h3>
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Top Referring Domains</h2>
            <div className="space-y-4">
              {[
                { domain: 'example.com', backlinks: 156, da: 78 },
                { domain: 'news-site.com', backlinks: 89, da: 72 },
                { domain: 'blog-network.org', backlinks: 67, da: 65 },
                { domain: 'industry-portal.com', backlinks: 45, da: 58 },
              ].map((domain, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">{domain.domain}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {domain.backlinks} backlinks
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    DA: {domain.da}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Anchor Text Distribution</h2>
            <div className="space-y-4">
              {[
                { text: 'Brand Name', percentage: 45 },
                { text: 'Main Keyword', percentage: 25 },
                { text: 'URL', percentage: 15 },
                { text: 'Generic', percentage: 10 },
                { text: 'Other', percentage: 5 },
              ].map((anchor, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{anchor.text}</span>
                    <span className="text-gray-500 dark:text-gray-400">{anchor.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500 dark:bg-primary-600 rounded-full"
                      style={{ width: `${anchor.percentage}%` }}
                    ></div>
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

export default Backlinks;