import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle, RefreshCw, ExternalLink, Search, Filter, ArrowUpRight, ArrowDownRight, FileText, Link2 } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const SiteAudit: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Health Score',
        data: [75, 78, 82, 85, 88, 92],
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
        beginAtZero: false,
        min: 50,
        max: 100
      }
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Audit</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Comprehensive analysis of your website's SEO health</p>
        </div>
        <button
          onClick={startScan}
          disabled={isScanning}
          className="bg-primary-500 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Run New Scan
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Health</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +8.5%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">92/100</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Issues Found</h3>
            <span className="text-red-500 text-sm flex items-center">
              <ArrowDownRight size={16} className="mr-1" />
              -12
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">23</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pages Crawled</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +45
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">256</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Load Time</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              -0.8s
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">2.3s</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Issues Overview</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last scan: 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search issues..."
                    className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <Filter className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Missing Meta Descriptions',
                  type: 'SEO',
                  priority: 'High',
                  status: 'Open',
                  affected: '5 pages',
                  impact: 'Critical'
                },
                {
                  title: 'Slow Loading Images',
                  type: 'Performance',
                  priority: 'Medium',
                  status: 'In Progress',
                  affected: '12 images',
                  impact: 'High'
                },
                {
                  title: 'Broken Internal Links',
                  type: 'Content',
                  priority: 'High',
                  status: 'Open',
                  affected: '3 links',
                  impact: 'Critical'
                },
                {
                  title: 'Missing Alt Text',
                  type: 'Accessibility',
                  priority: 'Medium',
                  status: 'Open',
                  affected: '8 images',
                  impact: 'Medium'
                },
                {
                  title: 'Duplicate Title Tags',
                  type: 'SEO',
                  priority: 'High',
                  status: 'Fixed',
                  affected: '2 pages',
                  impact: 'High'
                }
              ].map((issue, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        issue.status === 'Fixed'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          : issue.priority === 'High'
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            : 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                      }`}>
                        {issue.status === 'Fixed' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{issue.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {issue.type}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {issue.affected}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-sm ${
                        issue.status === 'Fixed'
                          ? 'text-green-600 dark:text-green-400'
                          : issue.status === 'In Progress'
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-orange-600 dark:text-orange-400'
                      }`}>
                        {issue.status}
                      </span>
                      <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Health Score Trend</h2>
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Issue Categories</h2>
            <div className="space-y-4">
              {[
                { category: 'SEO Issues', count: 12, percentage: 45 },
                { category: 'Performance', count: 8, percentage: 25 },
                { category: 'Content', count: 5, percentage: 15 },
                { category: 'Accessibility', count: 4, percentage: 10 },
                { category: 'Security', count: 2, percentage: 5 },
              ].map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{category.category}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {category.count} ({category.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-500 dark:bg-primary-600 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Fixes</h2>
            <div className="space-y-3">
              {[
                { label: 'Add Meta Descriptions', count: 5 },
                { label: 'Optimize Images', count: 12 },
                { label: 'Fix Broken Links', count: 3 },
                { label: 'Add Alt Text', count: 8 },
              ].map((fix, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span>{fix.label}</span>
                  <span className="bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-2 py-1 rounded text-sm">
                    {fix.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Core Web Vitals</h2>
            <div className="space-y-4">
              {[
                { metric: 'LCP', value: '2.1s', target: '< 2.5s', status: 'good' },
                { metric: 'FID', value: '12ms', target: '< 100ms', status: 'good' },
                { metric: 'CLS', value: '0.12', target: '< 0.1', status: 'needs improvement' },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{metric.metric}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Target: {metric.target}</div>
                  </div>
                  <div className={`text-sm font-medium ${
                    metric.status === 'good'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-orange-600 dark:text-orange-400'
                  }`}>
                    {metric.value}
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

export default SiteAudit;