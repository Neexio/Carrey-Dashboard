import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';

const CampaignsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">SEO Campaigns</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-colors">
          <Plus size={18} className="mr-1" /> New Campaign
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Active Campaigns</h2>
          <div className="flex space-x-2">
            <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Campaigns</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              title: 'E-commerce SEO Overhaul',
              client: 'NordicShop.com',
              startDate: 'Feb 15, 2025',
              endDate: 'Aug 15, 2025',
              status: 'In Progress',
              completion: 42,
              statusColor: 'bg-blue-500 dark:bg-blue-600',
            },
            {
              title: 'Local SEO Boost',
              client: 'Oslo Restaurant Group',
              startDate: 'Mar 01, 2025',
              endDate: 'Jun 30, 2025',
              status: 'In Progress',
              completion: 67,
              statusColor: 'bg-blue-500 dark:bg-blue-600',
            },
            {
              title: 'Content Marketing Strategy',
              client: 'NorwayTravel.no',
              startDate: 'Jan 10, 2025',
              endDate: 'Jul 10, 2025',
              status: 'In Progress',
              completion: 35,
              statusColor: 'bg-blue-500 dark:bg-blue-600',
            },
            {
              title: 'Technical SEO Audit',
              client: 'TechStartup AS',
              startDate: 'Apr 05, 2025',
              endDate: 'May 05, 2025',
              status: 'Starting Soon',
              completion: 0,
              statusColor: 'bg-yellow-500 dark:bg-yellow-600',
            },
            {
              title: 'Link Building Campaign',
              client: 'SportEquipment.no',
              startDate: 'Mar 15, 2025',
              endDate: 'Sep 15, 2025',
              status: 'In Progress',
              completion: 28,
              statusColor: 'bg-blue-500 dark:bg-blue-600',
            },
            {
              title: 'International SEO Expansion',
              client: 'NordicFashion.com',
              startDate: 'Apr 01, 2025',
              endDate: 'Oct 01, 2025',
              status: 'Draft',
              completion: 0,
              statusColor: 'bg-gray-500 dark:bg-gray-600',
            },
          ].map((campaign, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{campaign.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{campaign.client}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  campaign.status === 'In Progress' 
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400' 
                    : campaign.status === 'Draft'
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                      : campaign.status === 'Starting Soon'
                        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                        : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                }`}>
                  {campaign.status}
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Start Date</div>
                  <div className="text-sm font-medium">{campaign.startDate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">End Date</div>
                  <div className="text-sm font-medium">{campaign.endDate}</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{campaign.completion}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${campaign.statusColor} rounded-full`}
                    style={{ width: `${campaign.completion}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                  View Details <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recently Completed</h2>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
            View Archive <ArrowRight size={16} className="ml-1" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Campaign</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Result</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ROI</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { 
                  campaign: 'Website Redesign & SEO', 
                  client: 'FitnessCenter.no', 
                  duration: 'Nov 2024 - Mar 2025', 
                  result: '+156% Organic Traffic',
                  roi: '527%',
                  resultColor: 'text-green-600 dark:text-green-400'
                },
                { 
                  campaign: 'Keyword Gap Analysis', 
                  client: 'LegalAdvice AS', 
                  duration: 'Dec 2024 - Feb 2025', 
                  result: '+43 New Rankings',
                  roi: '215%',
                  resultColor: 'text-green-600 dark:text-green-400'
                },
                { 
                  campaign: 'Google Penalty Recovery', 
                  client: 'OnlineStore.no', 
                  duration: 'Oct 2024 - Jan 2025', 
                  result: 'Recovered Rankings',
                  roi: '318%',
                  resultColor: 'text-green-600 dark:text-green-400'
                },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{row.campaign}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{row.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{row.duration}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${row.resultColor}`}>{row.result}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">{row.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignsSection;