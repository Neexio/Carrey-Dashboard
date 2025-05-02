import React from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { subscriptions } from '../lib/subscriptions';

interface FeatureGuardProps {
  feature: string;
  children: React.ReactNode;
}

const FeatureGuard: React.FC<FeatureGuardProps> = ({ feature, children }) => {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      const access = await subscriptions.checkFeatureAccess(user.id, feature);
      setHasAccess(access.hasAccess);
      setLoading(false);

      if (!access.hasAccess) {
        subscriptions.showUpgradeModal(feature);
      }
    };

    checkAccess();
  }, [user, feature]);

  if (loading) {
    return <div className="animate-pulse h-8 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>;
  }

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
        <Lock className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
          Upgrade your plan to access this feature
        </p>
        <a
          href="/settings?tab=billing"
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          View Plans
        </a>
      </div>
    );
  }

  return <>{children}</>;
};

export default FeatureGuard;