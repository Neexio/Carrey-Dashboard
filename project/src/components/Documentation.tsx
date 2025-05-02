import React from 'react';
import { Search, Book, Code, Settings, Rocket } from 'lucide-react';

const Documentation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('getting-started');

  const sections = {
    'getting-started': {
      title: 'Getting Started',
      icon: <Rocket className="w-5 h-5" />,
      content: [
        {
          title: 'Quick Start Guide',
          description: 'Learn how to set up your first project and start optimizing your website.'
        },
        {
          title: 'Dashboard Overview',
          description: 'Understanding the main features and navigation of your dashboard.'
        },
        {
          title: 'First Website Analysis',
          description: 'How to run your first website analysis and interpret the results.'
        }
      ]
    },
    'features': {
      title: 'Features',
      icon: <Settings className="w-5 h-5" />,
      content: [
        {
          title: 'Website Analysis',
          description: 'Detailed guide on website analysis tools and metrics.'
        },
        {
          title: 'Task Manager',
          description: 'How to use the task manager to track SEO improvements.'
        },
        {
          title: 'Content Tools',
          description: 'Guide to content optimization and creation tools.'
        }
      ]
    },
    'api': {
      title: 'API Documentation',
      icon: <Code className="w-5 h-5" />,
      content: [
        {
          title: 'Authentication',
          description: 'How to authenticate with the API and manage API keys.'
        },
        {
          title: 'Endpoints',
          description: 'Complete list of API endpoints and their usage.'
        },
        {
          title: 'Rate Limits',
          description: 'Understanding API rate limits and best practices.'
        }
      ]
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Documentation</h1>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documentation..."
            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <nav className="space-y-1">
              {Object.entries(sections).map(([id, section]) => (
                <button
                  key={id}
                  onClick={() => setSelectedSection(id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    selectedSection === id
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {section.icon}
                  <span className="ml-3">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">{sections[selectedSection].title}</h2>
            <div className="space-y-6">
              {sections[selectedSection].content.map((item, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  <button className="mt-2 text-primary-600 dark:text-primary-400 text-sm hover:underline">
                    Learn more
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;