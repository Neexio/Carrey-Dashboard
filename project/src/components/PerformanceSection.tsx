import React from 'react';
import { ArrowRight } from 'lucide-react';

const PerformanceSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SEO Performance</h1>
        <div className="flex items-center space-x-2">
          <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="3months">Last 3 months</option>
            <option value="year">Last year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Keyword Performance</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
              Export Data <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Keyword</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Position</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Search Volume</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Difficulty</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Traffic</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { keyword: 'seo services norway', position: 1, change: 0, volume: '2,100', difficulty: 'Medium', traffic: 518 },
                  { keyword: 'best seo company', position: 3, change: 2, volume: '5,400', difficulty: 'High', traffic: 830 },
                  { keyword: 'local seo oslo', position: 2, change: 1, volume: '1,300', difficulty: 'Medium', traffic: 412 },
                  { keyword: 'seo analysis tool', position: 5, change: -2, volume: '3,200', difficulty: 'High', traffic: 218 },
                  { keyword: 'website optimization service', position: 4, change: 6, volume: '1,800', difficulty: 'Medium', traffic: 305 },
                  { keyword: 'content marketing strategy', position: 6, change: -1, volume: '2,900', difficulty: 'High', traffic: 190 },
                  { keyword: 'google ranking factors', position: 8, change: 3, volume: '4,100', difficulty: 'Very High', traffic: 173 },
                  { keyword: 'seo consultant', position: 12, change: -3, volume: '3,600', difficulty: 'High', traffic: 95 },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{row.keyword}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{row.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center ${
                        row.change > 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : row.change < 0 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {row.change > 0 ? '+' : ''}{row.change}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{row.volume}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        row.difficulty === 'Low' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
                          : row.difficulty === 'Medium'
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                            : row.difficulty === 'High'
                              ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400'
                              : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                      }`}>
                        {row.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{row.traffic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing 8 of 126 keywords
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Organic Traffic Sources</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
              View details <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { source: 'Google', percentage: 72, visits: '9,234' },
              { source: 'Bing', percentage: 12, visits: '1,546' },
              { source: 'Yahoo', percentage: 8, visits: '1,025' },
              { source: 'DuckDuckGo', percentage: 5, visits: '640' },
              { source: 'Other', percentage: 3, visits: '384' },
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.source}</span>
                  <span className="text-gray-500 dark:text-gray-400">{item.percentage}% ({item.visits})</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 dark:bg-blue-600 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Technical Health</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
              Run new scan <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 36 36" className="h-40 w-40 -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    className="dark:stroke-gray-700"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                    className="dark:stroke-blue-500"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold">85%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Health Score</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Issues Fixed', value: '23/27', color: 'text-green-600 dark:text-green-400' },
                { label: 'Critical Issues', value: '0', color: 'text-green-600 dark:text-green-400' },
                { label: 'Warnings', value: '4', color: 'text-orange-600 dark:text-orange-400' },
                { label: 'Opportunities', value: '12', color: 'text-blue-600 dark:text-blue-400' },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                  <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSection;