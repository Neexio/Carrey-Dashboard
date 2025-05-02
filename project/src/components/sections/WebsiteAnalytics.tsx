import React, { useState } from 'react';
import { Plus, Globe, ArrowUpRight, Trash2, RefreshCw, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { api } from '../../lib/api';

const WebsiteAnalytics: React.FC = () => {
  const [isAddingWebsite, setIsAddingWebsite] = useState(false);
  const [newWebsiteUrl, setNewWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAddWebsite = async () => {
    if (!newWebsiteUrl) return;
    
    setIsAnalyzing(true);
    try {
      const { data: project, error } = await supabase
        .from('projects')
        .insert([
          { name: new URL(newWebsiteUrl).hostname, url: newWebsiteUrl }
        ])
        .select()
        .single();

      if (error) throw error;

      // Analyze the website
      const analysis = await api.analyzeSite(newWebsiteUrl);
      
      // Store analytics data
      await supabase
        .from('project_analytics')
        .insert([
          { project_id: project.id, data: analysis }
        ]);

      setNewWebsiteUrl('');
      setIsAddingWebsite(false);
    } catch (error) {
      console.error('Error adding website:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Website Analytics</h1>
        <button
          onClick={() => setIsAddingWebsite(true)}
          className="bg-primary-500 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center hover:bg-primary-600 transition-colors"
        >
          <Plus size={18} className="mr-1" /> Add Website
        </button>
      </div>

      {isAddingWebsite && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Add New Website</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website URL
              </label>
              <input
                type="url"
                value={newWebsiteUrl}
                onChange={(e) => setNewWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingWebsite(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWebsite}
                disabled={isAnalyzing || !newWebsiteUrl}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 text-sm font-medium flex items-center"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Add Website'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: 'example.com',
            url: 'https://example.com',
            metrics: {
              health: 92,
              traffic: '45.2K',
              keywords: 856,
              backlinks: '2.3K'
            }
          }
        ].map((website, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium">{website.name}</h3>
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 dark:text-primary-400 flex items-center hover:underline"
                  >
                    {website.url} <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Health Score</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  {website.metrics.health}%
                  <ArrowUpRight size={18} className="ml-1 text-green-500" />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Traffic</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  {website.metrics.traffic}
                  <ArrowUpRight size={18} className="ml-1 text-green-500" />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Keywords</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {website.metrics.keywords}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Backlinks</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {website.metrics.backlinks}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full bg-primary-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-600 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebsiteAnalytics;