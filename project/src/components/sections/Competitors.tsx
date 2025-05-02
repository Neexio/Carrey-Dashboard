import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, ArrowUpRight, ArrowDownRight, Globe, Users, Clock, ArrowRight, BarChart2, ExternalLink, Trash2, RefreshCw } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface Competitor {
  id: string;
  name: string;
  url: string;
  metrics: {
    traffic: string;
    keywords: number;
    backlinks: string;
    da: number;
  };
  analysis: {
    commonKeywords: number;
    uniqueKeywords: number;
    contentGaps: number;
    backlinksGap: number;
  };
  lastUpdated: string;
}

const Competitors: React.FC = () => {
  const { user } = useAuth();
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState({ url: '', name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadCompetitors();
    }
  }, [user?.id]);

  const loadCompetitors = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (projectError) throw projectError;

      if (projectData) {
        const { data: competitors, error: competitorsError } = await supabase
          .from('competitors')
          .select('*')
          .eq('project_id', projectData.id)
          .order('created_at', { ascending: false });

        if (competitorsError) throw competitorsError;
        setCompetitors(competitors || []);
      }
    } catch (error) {
      console.error('Error loading competitors:', error);
      setError('Failed to load competitors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompetitor = async () => {
    if (!newCompetitor.url || !newCompetitor.name || !user?.id) return;

    try {
      setAnalyzing(true);
      setError(null);

      // Validate URL format
      try {
        new URL(newCompetitor.url);
      } catch (e) {
        throw new Error('Please enter a valid URL');
      }

      const { data: project } = await supabase
        .from('projects')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!project) throw new Error('Project not found');

      // Analyze competitor website
      const { data: analysis } = await supabase.functions.invoke('analyze-website', {
        body: { url: newCompetitor.url }
      });

      // Store competitor data
      const { error: insertError } = await supabase
        .from('competitors')
        .insert({
          project_id: project.id,
          name: newCompetitor.name,
          url: newCompetitor.url,
          metrics: analysis.metrics,
          analysis: analysis.analysis,
          last_updated: new Date().toISOString()
        });

      if (insertError) throw insertError;

      await loadCompetitors();
      setShowAddModal(false);
      setNewCompetitor({ url: '', name: '' });
    } catch (error) {
      console.error('Error adding competitor:', error);
      setError(error instanceof Error ? error.message : 'Failed to add competitor');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDeleteCompetitor = async (id: string) => {
    try {
      const { error } = await supabase
        .from('competitors')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadCompetitors();
    } catch (error) {
      console.error('Error deleting competitor:', error);
      setError('Failed to delete competitor');
    }
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Your Website',
        data: [1000, 1200, 1400, 1800, 2200, 2600],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Competitor Avg.',
        data: [1200, 1400, 1600, 1900, 2100, 2400],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  if (!user?.id) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-400">Please sign in to view competitors.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Competitors</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Competitor
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Share</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +5.2%
            </span>
          </div>
          <div className="text-2xl font-bold">24.8%</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Keyword Gap</h3>
            <span className="text-red-500 text-sm flex items-center">
              <ArrowDownRight size={16} className="mr-1" />
              -2.3%
            </span>
          </div>
          <div className="text-2xl font-bold">156</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Traffic Difference</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +12.5%
            </span>
          </div>
          <div className="text-2xl font-bold">+15.2K</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Domain Authority</h3>
            <span className="text-green-500 text-sm flex items-center">
              <ArrowUpRight size={16} className="mr-1" />
              +3
            </span>
          </div>
          <div className="text-2xl font-bold">52</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Competitor Analysis</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search competitors..."
                    className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <Filter className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 text-primary-500 animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Website</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Traffic</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Keywords</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">DA</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {competitors.map((competitor) => (
                      <tr key={competitor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-3">
                              <Globe className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium">{competitor.name}</div>
                              <a
                                href={competitor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                              >
                                {competitor.url}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{competitor.metrics?.traffic || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {competitor.metrics?.keywords || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {competitor.metrics?.da || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => window.open(competitor.url, '_blank')}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <ExternalLink size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteCompetitor(competitor.id)}
                              className="text-red-400 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Traffic Comparison</h3>
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Competitive Insights</h2>
            <div className="space-y-4">
              {[
                { label: 'Common Keywords', value: '856', change: '+12%' },
                { label: 'Unique Keywords', value: '324', change: '+8%' },
                { label: 'Missing Keywords', value: '156', change: '-15%' },
                { label: 'Keyword Difficulty', value: '42/100', change: '-3%' },
              ].map((insight, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">{insight.label}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{insight.value}</div>
                  </div>
                  <span className={`text-sm ${
                    insight.change.startsWith('+') 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {insight.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Top Opportunities</h2>
            <div className="space-y-3">
              {[
                { keyword: 'seo optimization', volume: '3.2K', difficulty: 'Medium' },
                { keyword: 'content strategy', volume: '2.8K', difficulty: 'Low' },
                { keyword: 'digital marketing', volume: '15.3K', difficulty: 'High' },
                { keyword: 'keyword research', volume: '6.7K', difficulty: 'Medium' },
              ].map((opportunity, index) => (
                <div key={index} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{opportunity.keyword}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Volume: {opportunity.volume}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      opportunity.difficulty === 'Low'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                        : opportunity.difficulty === 'Medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                    }`}>
                      {opportunity.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add Competitor</h3>
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Website URL</label>
                <input
                  type="url"
                  value={newCompetitor.url}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, url: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  value={newCompetitor.name}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                  placeholder="Competitor Name"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCompetitor}
                  disabled={analyzing || !newCompetitor.url || !newCompetitor.name}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center"
                >
                  {analyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Competitor
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Competitors;