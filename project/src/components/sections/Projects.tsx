import React, { useState } from 'react';
import { Plus, Search, Filter, ArrowUpRight, Globe, Users, Clock, ArrowRight, BarChart2, ExternalLink } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Project Progress',
        data: [30, 45, 60, 75, 85, 92],
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
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your SEO projects</p>
        </div>
        <button className="bg-primary-500 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center hover:bg-primary-600 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Projects</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +3
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Members</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +2
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +5
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">45</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +2.4%
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">94%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Active Projects</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search projects..."
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
                  name: 'E-commerce SEO Overhaul',
                  client: 'NordicShop.com',
                  progress: 75,
                  team: 4,
                  deadline: '2 weeks',
                  status: 'On Track'
                },
                {
                  name: 'Local SEO Campaign',
                  client: 'Oslo Restaurant Group',
                  progress: 45,
                  team: 3,
                  deadline: '1 month',
                  status: 'In Progress'
                },
                {
                  name: 'Content Strategy Implementation',
                  client: 'TechStartup AS',
                  progress: 90,
                  team: 5,
                  deadline: '3 days',
                  status: 'Final Review'
                },
                {
                  name: 'Technical SEO Audit',
                  client: 'SportEquipment.no',
                  progress: 30,
                  team: 2,
                  deadline: '3 weeks',
                  status: 'Just Started'
                }
              ].map((project, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                        <Globe className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{project.client}</div>
                      </div>
                    </div>
                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                      <ExternalLink size={18} />
                    </button>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 dark:bg-primary-600 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      {project.team} members
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {project.deadline}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.status === 'On Track'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        : project.status === 'Final Review'
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                          : 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Project Overview</h2>
            <div className="space-y-4">
              {[
                { label: 'On Track', count: 8, percentage: 67 },
                { label: 'At Risk', count: 3, percentage: 25 },
                { label: 'Delayed', count: 1, percentage: 8 },
              ].map((status, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{status.label}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {status.count} ({status.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        status.label === 'On Track'
                          ? 'bg-green-500 dark:bg-green-600'
                          : status.label === 'At Risk'
                            ? 'bg-orange-500 dark:bg-orange-600'
                            : 'bg-red-500 dark:bg-red-600'
                      }`}
                      style={{ width: `${status.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Project milestone completed', time: '2 hours ago' },
                { action: 'New team member added', time: '5 hours ago' },
                { action: 'Strategy meeting scheduled', time: '1 day ago' },
                { action: 'Progress report generated', time: '2 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div className="text-sm">{activity.action}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { name: 'Create Task', icon: <Plus className="w-5 h-5" /> },
                { name: 'Schedule Meeting', icon: <Clock className="w-5 h-5" /> },
                { name: 'Generate Report', icon: <BarChart2 className="w-5 h-5" /> },
              ].map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
                      {action.icon}
                    </div>
                    <span className="font-medium">{action.name}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;