import React from 'react';
import { ArrowRight, Download, Eye, Plus, FileText, Share2 } from 'lucide-react';

const ReportsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-colors">
          <Plus size={18} className="mr-1" /> Create Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Reports</h2>
            <div className="flex space-x-2">
              <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Reports</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Report</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Generated</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { 
                    name: 'April 2025 SEO Performance',
                    client: 'NordicShop.com',
                    date: 'May 1, 2025',
                    type: 'Monthly',
                    typeColor: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400',
                  },
                  { 
                    name: 'Q1 2025 Performance Report',
                    client: 'Oslo Restaurant Group',
                    date: 'Apr 15, 2025',
                    type: 'Quarterly',
                    typeColor: 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400',
                  },
                  { 
                    name: 'Technical SEO Audit',
                    client: 'NorwayTravel.no',
                    date: 'Apr 28, 2025',
                    type: 'Custom',
                    typeColor: 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400',
                  },
                  { 
                    name: 'Backlink Analysis Report',
                    client: 'SportEquipment.no',
                    date: 'Apr 22, 2025',
                    type: 'Custom',
                    typeColor: 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400',
                  },
                  { 
                    name: 'Week 17 SEO Progress',
                    client: 'NordicShop.com',
                    date: 'Apr 26, 2025',
                    type: 'Weekly',
                    typeColor: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
                  },
                ].map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          <FileText size={18} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium">{report.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{report.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{report.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${report.typeColor}`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                          <Eye size={18} />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                          <Download size={18} />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing 5 of 24 reports
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

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Scheduled Reports</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { 
                  client: 'NordicShop.com',
                  type: 'Weekly SEO Progress',
                  schedule: 'Every Friday, 9:00 AM',
                  nextDate: 'May 3, 2025',
                },
                { 
                  client: 'Oslo Restaurant Group',
                  type: 'Monthly Performance',
                  schedule: '1st of each month',
                  nextDate: 'Jun 1, 2025',
                },
                { 
                  client: 'NorwayTravel.no',
                  type: 'Monthly Performance',
                  schedule: '1st of each month',
                  nextDate: 'Jun 1, 2025',
                },
                { 
                  client: 'SportEquipment.no',
                  type: 'Bi-weekly Progress',
                  schedule: 'Every 2 weeks',
                  nextDate: 'May 10, 2025',
                },
              ].map((schedule, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{schedule.client}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{schedule.type}</div>
                    </div>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      <Eye size={16} />
                    </button>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Schedule</span>
                      <span>{schedule.schedule}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-500 dark:text-gray-400">Next report</span>
                      <span>{schedule.nextDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Report Templates</h2>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                Create <Plus size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Monthly SEO Performance', sections: 6 },
                { name: 'Technical Audit Report', sections: 8 },
                { name: 'Backlink Analysis', sections: 5 },
                { name: 'Keyword Ranking Report', sections: 4 },
                { name: 'Competitor Analysis', sections: 7 },
              ].map((template, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 mr-3">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{template.sections} sections</div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">April 2025 SEO Performance</h2>
          <div className="flex space-x-2">
            <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-colors">
              <Download size={16} className="mr-1" /> Download
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-colors">
              <Share2 size={16} className="mr-1" /> Share
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              Edit Report
            </button>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400">Report for</span>
              <h3 className="text-xl font-bold">NordicShop.com</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly SEO Performance - April 2025</p>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400">Generated</span>
              <div className="text-sm font-medium">May 1, 2025 at 09:12 AM</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">by Eirik Larsen</div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-medium mb-3">Executive Summary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                During April 2025, NordicShop.com saw significant improvements in organic search performance. Organic traffic increased by 23.5% compared to March 2025, with 156,432 organic visitors. The site gained 42 new top 10 rankings for target keywords, and conversion rate improved from 2.8% to 3.4%.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Traffic</div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">+23.5%</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Rankings</div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">+42</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Conversion</div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">3.4%</div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-medium mb-3">Key Achievements</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mr-2 flex-shrink-0">
                    <ArrowUpRight size={12} />
                  </span>
                  <span>Achieved #1 ranking for the target keyword "nordic winter clothing"</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mr-2 flex-shrink-0">
                    <ArrowUpRight size={12} />
                  </span>
                  <span>Increased average time on page from 1:45 to 2:10 minutes</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mr-2 flex-shrink-0">
                    <ArrowUpRight size={12} />
                  </span>
                  <span>Fixed 23 technical SEO issues found in last month's audit</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mr-2 flex-shrink-0">
                    <ArrowUpRight size={12} />
                  </span>
                  <span>Acquired 14 new high-quality backlinks from industry-related websites</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium mb-3">Report Sections</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: '1. Organic Traffic Analysis', pages: 3 },
                { name: '2. Keyword Performance', pages: 5 },
                { name: '3. Content Performance', pages: 4 },
                { name: '4. Technical SEO Health', pages: 3 },
                { name: '5. Backlink Profile', pages: 2 },
                { name: '6. Action Items & Recommendations', pages: 3 },
              ].map((section, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{section.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{section.pages} pages</div>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400">
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;