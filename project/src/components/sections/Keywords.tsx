import React, { useState } from 'react';
import { Search, TrendingUp, ArrowUpRight, ArrowDownRight, Plus, Filter, Download, RefreshCw } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const Keywords: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Position',
        data: [8, 6, 5, 4, 3, 2],
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
        reverse: true,
        beginAtZero: false,
        min: 1,
        max: 10
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Keywords</h1>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Keywords</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Keywords</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +12.5%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">487</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Top 10 Rankings</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +8.3%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Position</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +2.1
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">14.3</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Search Volume</h3>
            <span className="text-red-500 text-sm flex items-center">
              <ArrowDownRight size={16} className="mr-1" />
              -3.2%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">245.8K</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Keyword Rankings</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search keywords..."
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Keyword</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Position</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Volume</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { keyword: 'seo optimization', position: 1, change: 2, volume: '12.5K', difficulty: 'High' },
                    { keyword: 'keyword research tool', position: 3, change: -1, volume: '8.2K', difficulty: 'Medium' },
                    { keyword: 'seo analytics', position: 2, change: 1, volume: '6.7K', difficulty: 'High' },
                    { keyword: 'rank tracker', position: 4, change: 3, volume: '5.1K', difficulty: 'Medium' },
                    { keyword: 'website optimization', position: 5, change: -2, volume: '4.3K', difficulty: 'Low' },
                  ].map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.keyword}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`flex items-center ${
                          item.change > 0 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {item.change > 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                          {Math.abs(item.change)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{item.volume}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.difficulty === 'High'
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                            : item.difficulty === 'Medium'
                            ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                            : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        }`}>
                          {item.difficulty}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ranking Progress</h3>
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Keyword Suggestions</h2>
            <div className="space-y-4">
              {[
                { keyword: 'seo tools comparison', volume: '3.2K', difficulty: 'Medium' },
                { keyword: 'best seo software', volume: '2.8K', difficulty: 'High' },
                { keyword: 'keyword tracking tool', volume: '2.1K', difficulty: 'Medium' },
                { keyword: 'seo rank checker', volume: '1.9K', difficulty: 'Low' },
              ].map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                  <div>
                    <div className="font-medium">{suggestion.keyword}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Volume: {suggestion.volume}
                    </div>
                  </div>
                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    <Plus size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Ranking Distribution</h2>
            <div className="space-y-4">
              {[
                { range: '1-3', count: 42, percentage: 25 },
                { range: '4-10', count: 114, percentage: 35 },
                { range: '11-20', count: 156, percentage: 20 },
                { range: '21-50', count: 98, percentage: 15 },
                { range: '51+', count: 77, percentage: 5 },
              ].map((distribution, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Position {distribution.range}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {distribution.count} keywords ({distribution.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500 dark:bg-primary-600 rounded-full"
                      style={{ width: `${distribution.percentage}%` }}
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

export default Keywords;