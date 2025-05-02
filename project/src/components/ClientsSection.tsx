import React from 'react';
import { ArrowRight, Plus, Mail, Phone, ExternalLink, ArrowUpRight } from 'lucide-react';

const ClientsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
        <button className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center transition-colors">
          <Plus size={18} className="mr-1" /> Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Client List</h2>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Search clients..." 
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Website</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Projects</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { 
                    name: 'NordicShop.com', 
                    logo: 'NS',
                    bgColor: 'bg-primary-100 dark:bg-primary-900/20',
                    textColor: 'text-primary-800 dark:text-primary-400',
                    website: 'nordicshop.com', 
                    status: 'Active',
                    statusColor: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
                    projects: 2
                  },
                  { 
                    name: 'Oslo Restaurant Group', 
                    logo: 'OR',
                    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
                    textColor: 'text-purple-800 dark:text-purple-400',
                    website: 'oslorestaurant.no', 
                    status: 'Active',
                    statusColor: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
                    projects: 1
                  },
                  { 
                    name: 'NorwayTravel.no', 
                    logo: 'NT',
                    bgColor: 'bg-green-100 dark:bg-green-900/20',
                    textColor: 'text-green-800 dark:text-green-400',
                    website: 'norwaytravel.no', 
                    status: 'Active',
                    statusColor: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
                    projects: 3
                  },
                  { 
                    name: 'TechStartup AS', 
                    logo: 'TS',
                    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
                    textColor: 'text-orange-800 dark:text-orange-400',
                    website: 'techstartup.no', 
                    status: 'Onboarding',
                    statusColor: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400',
                    projects: 1
                  },
                  { 
                    name: 'SportEquipment.no', 
                    logo: 'SE',
                    bgColor: 'bg-red-100 dark:bg-red-900/20',
                    textColor: 'text-red-800 dark:text-red-400',
                    website: 'sportequipment.no', 
                    status: 'Active',
                    statusColor: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400',
                    projects: 1
                  },
                  { 
                    name: 'NordicFashion.com', 
                    logo: 'NF',
                    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
                    textColor: 'text-pink-800 dark:text-pink-400',
                    website: 'nordicfashion.com', 
                    status: 'Draft',
                    statusColor: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
                    projects: 0
                  },
                ].map((client, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${client.bgColor} ${client.textColor} flex items-center justify-center font-medium`}>
                          {client.logo}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{client.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400">{client.website}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${client.statusColor}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{client.projects}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing 6 of 15 clients
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                Previous
              </button>
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50">
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Client Insights</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Clients</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mt-1">15</div>
                <div className="flex items-center mt-1 text-xs text-green-600 dark:text-green-400">
                  <ArrowUpRight size={14} className="mr-1" />
                  <span>+3 this month</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Client Status</div>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Active', count: 10, percentage: 67, color: 'bg-green-500 dark:bg-green-600' },
                    { label: 'Onboarding', count: 2, percentage: 13, color: 'bg-yellow-500 dark:bg-yellow-600' },
                    { label: 'Paused', count: 1, percentage: 7, color: 'bg-orange-500 dark:bg-orange-600' },
                    { label: 'Draft', count: 2, percentage: 13, color: 'bg-gray-500 dark:bg-gray-600' },
                  ].map((status, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-900 dark:text-white">{status.label}</span>
                        <span className="text-gray-500 dark:text-gray-400">{status.count} ({status.percentage}%)</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${status.color} rounded-full`}
                          style={{ width: `${status.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { client: 'TechStartup AS', action: 'Onboarding Started', time: '2 hours ago' },
                { client: 'NorwayTravel.no', action: 'Report Generated', time: '1 day ago' },
                { client: 'SportEquipment.no', action: 'Keyword Research Updated', time: '2 days ago' },
                { client: 'Oslo Restaurant Group', action: 'New Campaign Created', time: '3 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{activity.client}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{activity.action} • {activity.time}</div>
                  </div>
                  <button className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400">
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Client Details: NordicShop.com</h2>
          <div className="flex space-x-2">
            <button className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors border border-gray-200 dark:border-gray-600">
              Edit
            </button>
            <button className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              Create Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 flex items-center justify-center text-2xl font-bold mb-4">
                  NS
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">NordicShop.com</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">E-commerce</p>
                
                <div className="mt-6 w-full">
                  <div className="flex items-center text-sm mb-3">
                    <div className="w-8 text-gray-500 dark:text-gray-400 flex-shrink-0">
                      <Mail size={16} />
                    </div>
                    <span className="text-gray-900 dark:text-white">contact@nordicshop.com</span>
                  </div>
                  <div className="flex items-center text-sm mb-3">
                    <div className="w-8 text-gray-500 dark:text-gray-400 flex-shrink-0">
                      <Phone size={16} />
                    </div>
                    <span className="text-gray-900 dark:text-white">+47 98 76 54 32</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-8 text-gray-500 dark:text-gray-400 flex-shrink-0">
                      <ExternalLink size={16} />
                    </div>
                    <a href="#" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">nordicshop.com</a>
                  </div>
                </div>
                
                <div className="mt-6 w-full border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-medium mb-2 text-sm text-left text-gray-900 dark:text-white">Contacts</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Anders Johansen', role: 'Marketing Director' },
                      { name: 'Sofie Hansen', role: 'SEO Specialist' },
                    ].map((contact, index) => (
                      <div key={index} className="flex items-center space-x-3 text-left">
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-900 dark:text-white">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{contact.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Organic Traffic (Monthly)</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">156,432</div>
                <div className="flex items-center mt-1 text-xs text-green-600 dark:text-green-400">
                  <ArrowUpRight size={14} className="mr-1" />
                  <span>+23.5% from last month</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Keywords in Top 10</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">487</div>
                <div className="flex items-center mt-1 text-xs text-green-600 dark:text-green-400">
                  <ArrowUpRight size={14} className="mr-1" />
                  <span>+42 from last month</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Active Projects</h3>
              <div className="space-y-3">
                {[
                  { 
                    name: 'E-commerce SEO Overhaul', 
                    status: 'In Progress',
                    progress: 42,
                    statusColor: 'bg-primary-500 dark:bg-primary-600',
                  },
                  { 
                    name: 'International SEO Expansion', 
                    status: 'Draft',
                    progress: 0,
                    statusColor: 'bg-gray-500 dark:bg-gray-600',
                  },
                ].map((project, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400">
                        {project.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white">{project.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${project.statusColor} rounded-full`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Weekly SEO report generated', date: 'Today, 09:45 AM' },
                  { action: 'Completed technical SEO audit', date: 'Yesterday, 14:20 PM' },
                  { action: 'Added 25 new target keywords', date: '3 days ago' },
                  { action: 'Backlink analysis completed', date: '1 week ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                    <div className="text-sm text-gray-900 dark:text-white">{activity.action}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsSection;