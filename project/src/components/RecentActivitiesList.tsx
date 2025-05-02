import React from 'react';
import { Globe, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'crawl',
    title: 'Website Crawl Completed',
    description: 'Found 3 critical issues to fix',
    time: '2 hours ago',
    icon: <Globe size={18} />,
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 2,
    type: 'report',
    title: 'Monthly SEO Report',
    description: 'April 2025 report is ready to view',
    time: '5 hours ago',
    icon: <FileText size={18} />,
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Ranking Drop Alert',
    description: 'Top keyword dropped from position 2 to 7',
    time: '12 hours ago',
    icon: <AlertCircle size={18} />,
    iconBg: 'bg-orange-100 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400'
  },
  {
    id: 4,
    type: 'success',
    title: 'Backlink Acquired',
    description: 'New backlink from domain with DA 72',
    time: '1 day ago',
    icon: <CheckCircle size={18} />,
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    id: 5,
    type: 'scheduled',
    title: 'Content Update Scheduled',
    description: 'Blog update scheduled for May 15, 2025',
    time: '2 days ago',
    icon: <Clock size={18} />,
    iconBg: 'bg-gray-100 dark:bg-gray-700',
    iconColor: 'text-gray-600 dark:text-gray-400'
  },
];

const RecentActivitiesList: React.FC = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className={`h-10 w-10 rounded-full ${activity.iconBg} ${activity.iconColor} flex items-center justify-center flex-shrink-0 mr-4`}>
            {activity.icon}
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium">{activity.title}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivitiesList;