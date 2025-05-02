import React from 'react';
import { useUserExperience } from '../contexts/UserExperience';

const SubscriptionStatus: React.FC = () => {
  const { subscription, loadingSubscription } = useUserExperience();

  if (loadingSubscription) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-24 rounded"></div>
    );
  }

  if (!subscription) {
    return (
      <span className="text-gray-500 dark:text-gray-400">
        Free Trial
      </span>
    );
  }

  const statusColors = {
    active: 'text-green-600 dark:text-green-400',
    trialing: 'text-blue-600 dark:text-blue-400',
    past_due: 'text-red-600 dark:text-red-400',
    canceled: 'text-gray-500 dark:text-gray-400'
  };

  return (
    <span className={statusColors[subscription.status] || 'text-gray-500 dark:text-gray-400'}>
      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
    </span>
  );
};

export default SubscriptionStatus;