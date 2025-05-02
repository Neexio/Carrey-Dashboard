import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Users,
  Globe,
  MousePointerClick,
  Link2,
  FileText,
  BarChart2,
  Plus,
  Search,
  ExternalLink
} from 'lucide-react';

const OverviewDashboard: React.FC = () => {
  const trafficData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Organic Traffic',
        data: [1000, 2000, 1500, 3000, 2500, 4000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const options = {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your websites.</p>
        </div>
        <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +23.5%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Organic Traffic</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">156,432</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <BarChart2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +42
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Keywords in Top 10</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">487</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Link2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +14
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">New Backlinks</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">2,847</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <MousePointerClick className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +0.6%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">3.4%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Task Manager</h2>
              <button className="text-sm text-primary-600 dark:text-primary-400 flex items-center">
                <Plus size={16} className="mr-1" />
                Add Task
              </button>
            </div>
            <div className="space-y-4">
              {[
                { 
                  title: 'Optimize meta descriptions for top 10 pages',
                  priority: 'High',
                  status: 'In Progress',
                  due: '2 days',
                  type: 'Technical SEO'
                },
                { 
                  title: 'Create content for target keywords',
                  priority: 'Medium',
                  status: 'Pending',
                  due: '5 days',
                  type: 'Content'
                },
                { 
                  title: 'Fix mobile responsiveness issues',
                  priority: 'High',
                  status: 'In Progress',
                  due: '1 day',
                  type: 'Technical SEO'
                },
                { 
                  title: 'Analyze competitor backlinks',
                  priority: 'Medium',
                  status: 'Completed',
                  due: 'Today',
                  type: 'Research'
                },
                { 
                  title: 'Update internal linking structure',
                  priority: 'Low',
                  status: 'Pending',
                  due: '1 week',
                  type: 'Technical SEO'
                }
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {task.status === 'Completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : task.status === 'In Progress' ? (
                        <Clock className="w-5 h-5 text-blue-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'High'
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                            : task.priority === 'Medium'
                              ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400'
                              : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{task.type}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Due: {task.due}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm ${
                    task.status === 'Completed'
                      ? 'text-green-600 dark:text-green-400'
                      : task.status === 'In Progress'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-orange-600 dark:text-orange-400'
                  }`}>
                    {task.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Traffic Overview</h2>
            <div className="h-[300px]">
              <Line data={trafficData} options={options} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { title: 'Run Site Audit', icon: <Globe className="w-5 h-5" /> },
                { title: 'Generate Report', icon: <FileText className="w-5 h-5" /> },
                { title: 'Add Competitor', icon: <Users className="w-5 h-5" /> },
                { title: 'Check Rankings', icon: <TrendingUp className="w-5 h-5" /> },
              ].map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
                      {action.icon}
                    </div>
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Performance Summary</h2>
            <div className="space-y-4">
              {[
                { label: 'Mobile Score', value: 92, change: '+5' },
                { label: 'Desktop Score', value: 96, change: '+2' },
                { label: 'Core Web Vitals', value: '3/3 Passed', change: '+1' },
                { label: 'SEO Score', value: 88, change: '+3' },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{metric.label}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{metric.value}</div>
                  </div>
                  <span className="text-green-500 text-sm flex items-center">
                    <ArrowUpRight size={16} className="mr-1" />
                    {metric.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">AI-Powered Optimization Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Quick Wins</h3>
            {[
              {
                title: 'Meta Description Optimization',
                description: 'Update meta description to include primary keyword and clear call-to-action',
                impact: 'Could improve CTR by 25%',
                priority: 'high'
              },
              {
                title: 'Image Alt Text',
                description: 'Add descriptive alt text to 12 images missing alternative text',
                impact: 'Better accessibility and image SEO',
                priority: 'medium'
              },
              {
                title: 'Internal Linking',
                description: 'Add relevant internal links to recent blog posts',
                impact: 'Improved site structure and user engagement',
                priority: 'medium'
              }
            ].map((suggestion, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  suggestion.priority === 'high'
                    ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10'
                    : 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{suggestion.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Expected Impact: {suggestion.impact}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    suggestion.priority === 'high'
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                      : 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400'
                  }`}>
                    {suggestion.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900 dark:text-white">Growth Opportunities</h3>
            {[
              {
                title: 'Content Gap Analysis',
                description: 'Create content for "enterprise seo tools" keyword cluster',
                potential: 'Estimated 5K monthly searches',
                difficulty: 'medium'
              },
              {
                title: 'Featured Snippet Opportunity',
                description: 'Optimize "SEO checklist" page for featured snippet',
                potential: 'Position 0 opportunity',
                difficulty: 'low'
              },
              {
                title: 'Competitor Backlink Gap',
                description: 'Outreach opportunity: 15 high-authority sites linking to competitors',
                potential: 'Domain Authority boost',
                difficulty: 'high'
              }
            ].map((opportunity, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{opportunity.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{opportunity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Potential: {opportunity.potential}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    opportunity.difficulty === 'low'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                      : opportunity.difficulty === 'medium'
                        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                  }`}>
                    {opportunity.difficulty.charAt(0).toUpperCase() + opportunity.difficulty.slice(1)} Difficulty
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;