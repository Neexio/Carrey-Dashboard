import React, { useState } from 'react';
import { ArrowRight, Download, Eye, Plus, FileText, Share2, Calendar, Clock, Filter, Search, RefreshCw, BarChart2, PieChart, TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const Reports: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Organic Traffic',
        data: [1200, 1900, 2400, 2800, 3200, 3800],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Generate and manage your SEO reports</p>
        </div>
        <button
          onClick={generateReport}
          disabled={isGenerating}
          className="bg-primary-500 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Reports</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search reports..."
                      className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Filter className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Monthly SEO Performance Report',
                    date: 'May 1, 2025',
                    type: 'Monthly',
                    status: 'Generated',
                    metrics: {
                      traffic: '+23.5%',
                      keywords: '+42',
                      backlinks: '+156'
                    }
                  },
                  {
                    title: 'Technical SEO Audit Report',
                    date: 'Apr 28, 2025',
                    type: 'Custom',
                    status: 'Generated',
                    metrics: {
                      issues: '23 fixed',
                      score: '92/100',
                      performance: '+15%'
                    }
                  },
                  {
                    title: 'Content Performance Analysis',
                    date: 'Apr 25, 2025',
                    type: 'Weekly',
                    status: 'Generated',
                    metrics: {
                      engagement: '+8.3%',
                      conversions: '+2.1%',
                      time: '+45s'
                    }
                  },
                  {
                    title: 'Competitor Analysis Report',
                    date: 'Apr 22, 2025',
                    type: 'Custom',
                    status: 'Scheduled',
                    metrics: {
                      gaps: '156 found',
                      opportunities: '34',
                      overlap: '45%'
                    }
                  }
                ].map((report, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{report.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {report.date}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              report.type === 'Monthly'
                                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400'
                                : report.type === 'Weekly'
                                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                                  : 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400'
                            }`}>
                              {report.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {Object.entries(report.metrics).map(([key, value], i) => (
                        <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</div>
                          <div className="text-sm font-medium mt-1">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
              <div className="h-[300px]">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Report Templates</h2>
            <div className="space-y-3">
              {[
                { name: 'SEO Performance', icon: <BarChart2 className="w-5 h-5" />, sections: 6 },
                { name: 'Technical Audit', icon: <PieChart className="w-5 h-5" />, sections: 8 },
                { name: 'Content Analysis', icon: <FileText className="w-5 h-5" />, sections: 5 },
                { name: 'Competitor Research', icon: <TrendingUp className="w-5 h-5" />, sections: 7 },
              ].map((template, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
                      {template.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{template.sections} sections</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Scheduled Reports</h2>
            <div className="space-y-3">
              {[
                { name: 'Weekly Performance', schedule: 'Every Monday', next: '2 days' },
                { name: 'Monthly Overview', schedule: '1st of month', next: '15 days' },
                { name: 'Technical Audit', schedule: 'Bi-weekly', next: '8 days' },
              ].map((schedule, index) => (
                <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{schedule.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{schedule.schedule}</div>
                    </div>
                    <div className="text-xs flex items-center text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      Next: {schedule.next}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;