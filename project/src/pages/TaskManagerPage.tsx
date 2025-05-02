import React, { useState } from 'react';
import TaskManager from '../components/TaskManager';
import NotePad from '../components/NotePad';
import { Book, CheckCircle, ArrowRight, Star } from 'lucide-react';

const TaskManagerPage: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const seoGuides = [
    {
      id: 'technical-seo',
      title: 'Technical SEO Optimization',
      steps: [
        { title: 'Site Speed Optimization', description: 'Improve page load times and Core Web Vitals' },
        { title: 'Mobile Responsiveness', description: 'Ensure perfect mobile experience' },
        { title: 'XML Sitemap', description: 'Create and submit XML sitemap' },
        { title: 'Robots.txt', description: 'Configure robots.txt file' },
        { title: 'SSL Certificate', description: 'Ensure HTTPS is properly configured' }
      ]
    },
    {
      id: 'on-page-seo',
      title: 'On-Page SEO Checklist',
      steps: [
        { title: 'Title Tags', description: 'Optimize title tags for all important pages' },
        { title: 'Meta Descriptions', description: 'Write compelling meta descriptions' },
        { title: 'Header Tags', description: 'Implement proper H1-H6 hierarchy' },
        { title: 'Image Optimization', description: 'Add alt text and optimize images' },
        { title: 'Internal Linking', description: 'Improve internal link structure' }
      ]
    },
    {
      id: 'content-optimization',
      title: 'Content Strategy Guide',
      steps: [
        { title: 'Keyword Research', description: 'Identify target keywords and search intent' },
        { title: 'Content Audit', description: 'Review and optimize existing content' },
        { title: 'Content Calendar', description: 'Plan content creation schedule' },
        { title: 'Content Creation', description: 'Write SEO-optimized content' },
        { title: 'Content Promotion', description: 'Share and promote content' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage tasks and track SEO improvements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TaskManager />
          <NotePad />
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">SEO Improvement Guides</h2>
            <div className="space-y-4">
              {seoGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedGuide(guide.id === selectedGuide ? null : guide.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <Book size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">{guide.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {guide.steps.length} steps
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      size={20}
                      className={`transform transition-transform ${
                        selectedGuide === guide.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>

                  {selectedGuide === guide.id && (
                    <div className="mt-4 space-y-3">
                      {guide.steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <CheckCircle size={16} className="text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{step.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Automation Tips</h2>
            <div className="space-y-3">
              {[
                {
                  title: 'Automated Rank Tracking',
                  description: 'Set up daily rank tracking for your target keywords'
                },
                {
                  title: 'Content Performance Monitoring',
                  description: 'Monitor content engagement and rankings automatically'
                },
                {
                  title: 'Technical SEO Monitoring',
                  description: 'Get alerts for technical SEO issues'
                },
                {
                  title: 'Competitor Tracking',
                  description: 'Monitor competitor rankings and content'
                }
              ].map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex-shrink-0">
                    <Star size={16} className="text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{tip.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tip.description}
                    </p>
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

export default TaskManagerPage;