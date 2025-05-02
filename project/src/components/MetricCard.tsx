import React, { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-transform hover:scale-105 duration-300">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</span>
        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className={`flex items-center text-sm ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isPositive ? (
              <ArrowUpRight size={16} className="mr-1" />
            ) : (
              <ArrowDownRight size={16} className="mr-1" />
            )}
            {change}
          </div>
        </div>
        <div className="h-10 w-20 -mb-1">
          {/* Placeholder for mini-chart */}
          <div className="h-full w-full flex items-end space-x-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-${Math.floor(Math.random() * 10) + 1} w-2 rounded-sm ${isPositive ? 'bg-green-500/20 dark:bg-green-500/40' : 'bg-red-500/20 dark:bg-red-500/40'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;