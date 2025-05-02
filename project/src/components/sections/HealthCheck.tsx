import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle, RefreshCw, ExternalLink } from 'lucide-react';

const HealthCheck: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Health Check</h1>
        <button
          onClick={startScan}
          disabled={isScanning}
          className="bg-primary-500 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Run New Scan
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Overall Health Score</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last scan: 2 hours ago</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">85%</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Critical Issues', value: '0', color: 'text-green-600 dark:text-green-400' },
                { label: 'Warnings', value: '3', color: 'text-orange-600 dark:text-orange-400' },
                { label: 'Passed Checks', value: '42', color: 'text-primary-600 dark:text-primary-400' },
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Health Check Results</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'SSL Certificate',
                  status: 'success',
                  message: 'Valid and up to date',
                  details: 'Expires in 240 days',
                },
                {
                  title: 'Mobile Responsiveness',
                  status: 'success',
                  message: 'Site is mobile-friendly',
                  details: 'Passed Google Mobile-Friendly Test',
                },
                {
                  title: 'Page Load Speed',
                  status: 'warning',
                  message: 'Could be improved',
                  details: 'Average load time: 3.2s',
                },
                {
                  title: 'Broken Links',
                  status: 'warning',
                  message: '2 broken links found',
                  details: 'On pages: /about, /contact',
                },
                {
                  title: 'Image Optimization',
                  status: 'warning',
                  message: '5 images need optimization',
                  details: 'Potential savings: 2.3MB',
                },
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {item.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                      )}
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.message}</p>
                      </div>
                    </div>
                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {item.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Fixes</h2>
            <div className="space-y-3">
              {[
                { label: 'Optimize Images', count: 5 },
                { label: 'Fix Broken Links', count: 2 },
                { label: 'Improve Meta Descriptions', count: 3 },
              ].map((fix, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span>{fix.label}</span>
                  <span className="bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-2 py-1 rounded text-sm">
                    {fix.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Monitoring</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Uptime</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Response Time</span>
                <span className="text-sm font-medium">245ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Last Downtime</span>
                <span className="text-sm font-medium">7 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;