import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Clock, MousePointerClick, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';

interface RealTimeStats {
  visitors: number;
  pageViews: number;
  avgSessionTime: number;
  bounceRate: number;
  trend: {
    visitors: number;
    pageViews: number;
    avgSessionTime: number;
    bounceRate: number;
  };
}

const StatsMonitor: React.FC<{ url?: string }> = ({ url }) => {
  const [stats, setStats] = useState<RealTimeStats>({
    visitors: 0,
    pageViews: 0,
    avgSessionTime: 0,
    bounceRate: 0,
    trend: {
      visitors: 0,
      pageViews: 0,
      avgSessionTime: 0,
      bounceRate: 0
    }
  });

  const [error, setError] = useState<string | null>(null);

  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Active Visitors',
        data: [] as number[],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  });

  useEffect(() => {
    const fetchRealTimeStats = async () => {
      try {
        // Reset error state on each fetch attempt
        setError(null);

        // Validate URL
        if (!url) {
          setError('Please enter a URL to analyze');
          return;
        }

        // Ensure URL has protocol
        let validUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          validUrl = `https://${url}`;
        }

        // Validate URL format
        try {
          new URL(validUrl);
        } catch (e) {
          setError('Invalid URL format. Please enter a valid website URL.');
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/realtime-analytics?url=${encodeURIComponent(validUrl)}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        setStats(prevStats => ({
          ...data,
          trend: {
            visitors: prevStats.visitors === 0 ? 0 : ((data.visitors - prevStats.visitors) / prevStats.visitors) * 100,
            pageViews: prevStats.pageViews === 0 ? 0 : ((data.pageViews - prevStats.pageViews) / prevStats.pageViews) * 100,
            avgSessionTime: prevStats.avgSessionTime === 0 ? 0 : ((data.avgSessionTime - prevStats.avgSessionTime) / prevStats.avgSessionTime) * 100,
            bounceRate: prevStats.bounceRate === 0 ? 0 : ((data.bounceRate - prevStats.bounceRate) / prevStats.bounceRate) * 100
          }
        }));

        // Update chart data
        const now = new Date();
        setChartData(prevData => ({
          labels: [...prevData.labels.slice(-11), now.toLocaleTimeString()].slice(-12),
          datasets: [{
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data.slice(-11), data.visitors].slice(-12)
          }]
        }));
      } catch (error) {
        console.error('Error fetching real-time stats:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch analytics data. Please try again.');
      }
    };

    // Only start fetching if we have a URL
    if (url) {
      // Initial fetch
      fetchRealTimeStats();

      // Set up polling interval
      const interval = setInterval(fetchRealTimeStats, 5000);
      return () => clearInterval(interval);
    }
  }, [url]);

  const formatTrend = (value: number) => {
    return value > 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`;
  };

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className={`text-sm flex items-center ${
              stats.trend.visitors >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {stats.trend.visitors >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {formatTrend(stats.trend.visitors)}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Visitors</h3>
          <p className="text-2xl font-bold mt-1">{stats.visitors}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className={`text-sm flex items-center ${
              stats.trend.pageViews >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {stats.trend.pageViews >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {formatTrend(stats.trend.pageViews)}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Page Views</h3>
          <p className="text-2xl font-bold mt-1">{stats.pageViews}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className={`text-sm flex items-center ${
              stats.trend.avgSessionTime >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {stats.trend.avgSessionTime >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {formatTrend(stats.trend.avgSessionTime)}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Session Time</h3>
          <p className="text-2xl font-bold mt-1">{Math.round(stats.avgSessionTime)}s</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <MousePointerClick className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className={`text-sm flex items-center ${
              stats.trend.bounceRate <= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {stats.trend.bounceRate <= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {formatTrend(Math.abs(stats.trend.bounceRate))}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bounce Rate</h3>
          <p className="text-2xl font-bold mt-1">{stats.bounceRate}%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Visitor Trend</h3>
        <div className="h-[300px]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsMonitor;