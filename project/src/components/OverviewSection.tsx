import React from 'react';
import { ArrowUpRight, ArrowDownRight, Eye, MousePointerClick, Users, ArrowRight } from 'lucide-react';
import MetricCard from './MetricCard';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import RecentActivitiesList from './RecentActivitiesList';

const OverviewSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center space-x-2">
          <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="3months">Last 3 months</option>
            <option value="year">Last year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Website Traffic" 
          value="12,653" 
          change="+12.3%" 
          isPositive={true}
          icon={<Eye size={18} />} 
        />
        <MetricCard 
          title="Conversion Rate" 
          value="3.2%" 
          change="+0.8%" 
          isPositive={true}
          icon={<MousePointerClick size={18} />} 
        />
        <MetricCard 
          title="Avg. Position" 
          value="4.5" 
          change="-1.2" 
          isPositive={true}
          icon={<ArrowUpRight size={18} />} 
        />
        <MetricCard 
          title="New Clients" 
          value="8" 
          change="-2" 
          isPositive={false}
          icon={<Users size={18} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Organic Traffic Trend</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
              View details <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <LineChart />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Ranking Distribution</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
              View details <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <BarChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activities</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <RecentActivitiesList />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Performing Keywords</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { keyword: 'seo services', position: 1, volume: '12.5K' },
              { keyword: 'digital marketing agency', position: 3, volume: '8.2K' },
              { keyword: 'local SEO', position: 2, volume: '6.7K' },
              { keyword: 'website optimization', position: 5, volume: '4.3K' },
              { keyword: 'content marketing', position: 4, volume: '3.8K' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div>
                  <div className="font-medium">{item.keyword}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Position: <span className="text-green-600 dark:text-green-400 font-medium">{item.position}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {item.volume}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;