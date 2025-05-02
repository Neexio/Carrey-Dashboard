import React from 'react';

// This is a placeholder for a real chart component
// In a real application, you would use a library like Chart.js or Recharts
const LineChart: React.FC = () => {
  return (
    <div className="h-64 flex items-center justify-center flex-col">
      <div className="w-full h-full flex items-end space-x-1 p-4">
        {Array.from({ length: 30 }).map((_, index) => {
          // Generate a pseudo-random height that follows a pattern
          const dayOfMonth = index + 1;
          const multiplier = Math.sin(dayOfMonth / 5) * 0.3 + 0.7;
          const height = Math.floor(multiplier * 100);
          
          return (
            <div key={index} className="group flex-1 flex flex-col items-center">
              <div 
                className="relative w-full bg-blue-100 dark:bg-blue-900/20 rounded-sm transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30"
                style={{ height: `${height}%` }}
              >
                <div className="absolute inset-x-0 bottom-0 h-full transition-all duration-300 rounded-sm" 
                  style={{ 
                    background: 'linear-gradient(to top, rgba(59, 130, 246, 0.7), rgba(59, 130, 246, 0.1))',
                    height: `${height}%`
                  }}
                ></div>
              </div>
              {/* Day label only shown for every 5th day */}
              {dayOfMonth % 5 === 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {dayOfMonth}
                </div>
              )}
              
              {/* Hover effect to show value */}
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-800 text-white text-xs py-1 px-2 rounded transition-opacity duration-200">
                {Math.floor(height * 12)} visits
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        April 2025
      </div>
    </div>
  );
};

export default LineChart;