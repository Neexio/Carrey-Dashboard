import React from 'react';

// This is a placeholder for a real chart component
// In a real application, you would use a library like Chart.js or Recharts
const BarChart: React.FC = () => {
  const data = [
    { label: 'Position 1-3', value: 25, color: 'bg-green-500 dark:bg-green-600' },
    { label: 'Position 4-10', value: 42, color: 'bg-blue-500 dark:bg-blue-600' },
    { label: 'Position 11-20', value: 18, color: 'bg-yellow-500 dark:bg-yellow-600' },
    { label: 'Position 21-50', value: 10, color: 'bg-orange-500 dark:bg-orange-600' },
    { label: 'Position 50+', value: 5, color: 'bg-red-500 dark:bg-red-600' },
  ];

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="h-64 flex flex-col justify-between">
      <div className="flex h-52">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex-1 flex flex-col justify-end items-center group relative"
          >
            <div className="w-12 relative flex justify-center">
              {/* Hover tooltip */}
              <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-gray-800 text-white text-xs py-1 px-2 rounded transition-opacity duration-200 whitespace-nowrap">
                {item.value} keywords
              </div>
              
              {/* Bar */}
              <div 
                className={`w-10 ${item.color} rounded-t-sm transition-all duration-300 hover:w-12`}
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
        Keyword Rankings Distribution
      </div>
    </div>
  );
};

export default BarChart;