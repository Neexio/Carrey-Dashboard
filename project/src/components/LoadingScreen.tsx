import React from 'react';
import Logo from './Logo';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
      <div className="animate-bounce mb-8">
        <Logo />
      </div>
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;