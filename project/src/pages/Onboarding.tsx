import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Settings, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  fields: {
    name: string;
    label: string;
    type: string;
    options?: { value: string; label: string }[];
  }[];
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to Carrey.ai',
    description: 'Let\'s get started by setting up your profile',
    icon: <Settings className="w-8 h-8" />,
    fields: [
      { name: 'name', label: 'Your Name', type: 'text' },
      { name: 'company', label: 'Company Name', type: 'text' },
      {
        name: 'experience',
        label: 'SEO Experience Level',
        type: 'select',
        options: [
          { value: 'beginner', label: 'Beginner' },
          { value: 'intermediate', label: 'Intermediate' },
          { value: 'advanced', label: 'Advanced' },
        ],
      },
    ],
  },
  {
    title: 'Website Details',
    description: 'Add your first website to monitor',
    icon: <Globe className="w-8 h-8" />,
    fields: [
      { name: 'website', label: 'Website URL', type: 'url' },
      {
        name: 'industry',
        label: 'Industry',
        type: 'select',
        options: [
          { value: 'ecommerce', label: 'E-commerce' },
          { value: 'tech', label: 'Technology' },
          { value: 'finance', label: 'Finance' },
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'other', label: 'Other' },
        ],
      },
    ],
  },
  {
    title: 'Team Setup',
    description: 'Invite team members to collaborate',
    icon: <Users className="w-8 h-8" />,
    fields: [
      { name: 'teamName', label: 'Team Name', type: 'text' },
      { name: 'teamEmail', label: 'Invite Team Member (Optional)', type: 'email' },
    ],
  },
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { updatePreferences } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    experience: 'beginner',
    website: '',
    industry: '',
    teamName: '',
    teamEmail: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Save preferences and complete onboarding
      await updatePreferences({
        interface_mode: formData.experience === 'beginner' ? 'simple' : 'advanced',
        notifications: {
          email: true,
          push: true,
          in_app: true,
        },
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <div className="flex items-center mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className={`flex items-center ${
                  index <= currentStep
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-400 dark:text-gray-600'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-primary-100 dark:bg-primary-900/20'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-1 mx-2 ${
                      index < currentStep
                        ? 'bg-primary-500 dark:bg-primary-400'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400`}>
                {steps[currentStep].icon}
              </div>
            </div>
            <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="space-y-6">
            {steps[currentStep].fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-2">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;