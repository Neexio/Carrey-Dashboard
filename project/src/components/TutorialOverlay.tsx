import React, { useState } from 'react';
import { X, Play, Book, Settings, Rocket, Star } from 'lucide-react';
import { useUserExperience } from '../contexts/UserExperienceContext';

const TutorialOverlay: React.FC = () => {
  const { experienceLevel, setShowTutorial, updateUserPreferences } = useUserExperience();
  const [currentStep, setCurrentStep] = useState(0);

  const tutorials = {
    simple: {
      title: 'Welcome to Simple Mode',
      description: 'Let's get you started with the basics of SEO',
      steps: [
        {
          title: 'Easy Navigation',
          description: 'Everything you need is just one click away',
          video: 'https://example.com/tutorials/simple-navigation.mp4',
          action: 'Try clicking on different menu items'
        },
        {
          title: 'Quick Website Analysis',
          description: 'Enter your website URL to get instant SEO recommendations',
          video: 'https://example.com/tutorials/website-analysis.mp4',
          action: 'Enter your website URL in the top bar'
        },
        {
          title: 'Task Management',
          description: 'Keep track of your SEO improvements',
          video: 'https://example.com/tutorials/task-management.mp4',
          action: 'Create your first SEO task'
        }
      ]
    },
    default: {
      title: 'Welcome to Default Mode',
      description: 'Access more advanced SEO tools and features',
      steps: [
        {
          title: 'Advanced Analytics',
          description: 'Dive deeper into your website performance',
          video: 'https://example.com/tutorials/advanced-analytics.mp4',
          action: 'Explore your analytics dashboard'
        },
        {
          title: 'Content Tools',
          description: 'Create and optimize your content',
          video: 'https://example.com/tutorials/content-tools.mp4',
          action: 'Try the content optimization tools'
        },
        {
          title: 'Keyword Research',
          description: 'Find and track valuable keywords',
          video: 'https://example.com/tutorials/keyword-research.mp4',
          action: 'Start your keyword research'
        }
      ]
    },
    advanced: {
      title: 'Welcome to Advanced Mode',
      description: 'Access professional SEO tools and features',
      steps: [
        {
          title: 'Technical SEO',
          description: 'Deep dive into technical optimizations',
          video: 'https://example.com/tutorials/technical-seo.mp4',
          action: 'Run your first technical audit'
        },
        {
          title: 'Custom Reports',
          description: 'Create detailed performance reports',
          video: 'https://example.com/tutorials/custom-reports.mp4',
          action: 'Generate a custom report'
        },
        {
          title: 'API Integration',
          description: 'Connect with external tools and data',
          video: 'https://example.com/tutorials/api-integration.mp4',
          action: 'Set up your first API connection'
        }
      ]
    },
    pro: {
      title: 'Welcome to Pro Mode',
      description: 'Access enterprise-level SEO features',
      steps: [
        {
          title: 'Bulk Analysis',
          description: 'Analyze multiple pages simultaneously',
          video: 'https://example.com/tutorials/bulk-analysis.mp4',
          action: 'Start your first bulk analysis'
        },
        {
          title: 'Advanced Automation',
          description: 'Set up complex SEO workflows',
          video: 'https://example.com/tutorials/automation.mp4',
          action: 'Create your first automation'
        },
        {
          title: 'White Label Reports',
          description: 'Create branded reports',
          video: 'https://example.com/tutorials/white-label.mp4',
          action: 'Customize your report branding'
        }
      ]
    }
  };

  const currentTutorial = tutorials[experienceLevel];
  const currentTutorialStep = currentTutorial.steps[currentStep];

  const handleComplete = async () => {
    try {
      await updateUserPreferences({
        interface_mode: experienceLevel,
        tutorial_completed: {
          [experienceLevel]: true
        }
      });
      setShowTutorial(false);
    } catch (error) {
      console.error('Error updating tutorial status:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
              {experienceLevel === 'simple' && <Book className="h-6 w-6" />}
              {experienceLevel === 'default' && <Settings className="h-6 w-6" />}
              {experienceLevel === 'advanced' && <Rocket className="h-6 w-6" />}
              {experienceLevel === 'pro' && <Star className="h-6 w-6" />}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{currentTutorial.title}</h2>
              <p className="text-gray-500 dark:text-gray-400">{currentTutorial.description}</p>
            </div>
          </div>
          <button
            onClick={() => setShowTutorial(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative">
          <video
            src={currentTutorialStep.video}
            className="w-full h-full rounded-lg"
            controls
            autoPlay
            muted
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="w-16 h-16 text-white opacity-75" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-2">{currentTutorialStep.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{currentTutorialStep.description}</p>
          </div>

          <div className="flex items-center space-x-2">
            {currentTutorial.steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full flex-1 transition-all ${
                  index === currentStep
                    ? 'bg-primary-500'
                    : index < currentStep
                    ? 'bg-primary-200 dark:bg-primary-700'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(step => step - 1)}
              disabled={currentStep === 0}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {currentStep === currentTutorial.steps.length - 1 ? (
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Get Started
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(step => step + 1)}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;