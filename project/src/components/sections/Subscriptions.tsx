import React, { useState, useEffect } from 'react';
import { CreditCard, Check, Star, Shield, Users, Zap, Lock } from 'lucide-react';
import { useUserExperience } from '../../contexts/UserExperienceContext';
import { subscriptions } from '../../lib/subscriptions';

const Subscriptions: React.FC = () => {
  const { subscription, availablePlans, loadingSubscription } = useUserExperience();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    if (subscription) {
      setSelectedPlan(subscription.plan_id);
    }
  }, [subscription]);

  if (loadingSubscription) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const planFeatures = {
    'Free Trial': [
      'Basic SEO Analysis',
      'Website Health Check',
      'Task Manager',
      'Simple Mode Interface',
      '1 Project',
      '50 Keywords',
      '14-day Trial'
    ],
    'Basic': [
      'Everything in Free Trial',
      'Advanced Mode Interface',
      '3 Projects',
      '250 Keywords',
      'Content Tools',
      'Keyword Tracking',
      'Basic Reports',
      'Standard Support'
    ],
    'Business': [
      'Everything in Basic',
      'AI Content Generator',
      'Content Detector',
      'Competitor Analysis',
      'Backlink Analysis',
      'Site Audit',
      'Team Collaboration (5 members)',
      'Priority Support',
      '10 Projects',
      '1,000 Keywords'
    ],
    'Enterprise': [
      'Everything in Business',
      'Unlimited Projects',
      'Unlimited Keywords',
      'API Access',
      'White Label Reports',
      'Custom Integrations',
      'Dedicated Support',
      'Bulk Analysis',
      'Custom Reporting',
      'Unlimited Team Members'
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Choose the plan that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {availablePlans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 ${
              selectedPlan === plan.id
                ? 'border-primary-500 dark:border-primary-400'
                : 'border-gray-200 dark:border-gray-700'
            } p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              {plan.name === 'Business' && (
                <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full">
                  Popular
                </span>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">/mo</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {planFeatures[plan.name as keyof typeof planFeatures].map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full py-2 px-4 rounded-lg font-medium ${
                selectedPlan === plan.id
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-8">
        <h2 className="text-lg font-semibold mb-6">Plan Features Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Feature
                </th>
                {availablePlans.map((plan) => (
                  <th key={plan.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { name: 'Projects', icon: <Shield className="w-4 h-4" /> },
                { name: 'Keywords', icon: <Star className="w-4 h-4" /> },
                { name: 'Team Members', icon: <Users className="w-4 h-4" /> },
                { name: 'API Access', icon: <Zap className="w-4 h-4" /> },
                { name: 'White Label', icon: <Lock className="w-4 h-4" /> },
              ].map((feature) => (
                <tr key={feature.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {feature.icon}
                      <span className="ml-2">{feature.name}</span>
                    </div>
                  </td>
                  {availablePlans.map((plan) => (
                    <td key={plan.id} className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {feature.name === 'Projects' && (
                          plan.features.maxProjects === -1 ? 'Unlimited' : plan.features.maxProjects
                        )}
                        {feature.name === 'Keywords' && (
                          plan.features.maxKeywords === -1 ? 'Unlimited' : plan.features.maxKeywords
                        )}
                        {feature.name === 'Team Members' && (
                          plan.features.teamMembers === -1 ? 'Unlimited' : (plan.features.teamMembers || '-')
                        )}
                        {feature.name === 'API Access' && (
                          plan.features.features.includes('api-access') ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <span className="text-gray-400">-</span>
                          )
                        )}
                        {feature.name === 'White Label' && (
                          plan.features.features.includes('white-label') ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <span className="text-gray-400">-</span>
                          )
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;