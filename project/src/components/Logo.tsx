import React from 'react';
import { Rocket } from 'lucide-react';

const Logo: React.FC<{ collapsed?: boolean }> = ({ collapsed = false }) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center transform -rotate-12">
          <Rocket className="h-5 w-5 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary-300 rounded-full animate-pulse"></div>
      </div>
      {!collapsed && (
        <div className="ml-2 flex items-center">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">Carrey</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">.ai</span>
        </div>
      )}
    </div>
  );
};

export default Logo;