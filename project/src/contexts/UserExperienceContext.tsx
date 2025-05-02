import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscriptions, type SubscriptionPlan } from '../lib/subscriptions';
import { auth } from '../lib/auth';
import { useAuth } from './AuthContext';

interface UserExperienceContextType {
  experienceLevel: 'simple' | 'default' | 'advanced' | 'pro';
  setExperienceLevel: (level: 'simple' | 'default' | 'advanced' | 'pro') => void;
  showTutorial: boolean;
  setShowTutorial: (show: boolean) => void;
  subscription: SubscriptionPlan | null;
  availablePlans: SubscriptionPlan[];
  loadingSubscription: boolean;
  subscriptionError: string | null;
  isFeatureAvailable: (featureId: string) => Promise<boolean>;
  updateUserPreferences: (preferences: { 
    interface_mode: 'simple' | 'default' | 'advanced' | 'pro';
    tutorial_completed?: Record<string, boolean>;
  }) => Promise<void>;
}

const UserExperienceContext = createContext<UserExperienceContextType | undefined>(undefined);

export const UserExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const [experienceLevel, setExperienceLevel] = useState<'simple' | 'default' | 'advanced' | 'pro'>('simple');
  const [showTutorial, setShowTutorial] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionPlan | null>(null);
  const [availablePlans, setAvailablePlans] = useState<SubscriptionPlan[]>([]);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      const loadUserData = async () => {
        try {
          setLoadingSubscription(true);
          setSubscriptionError(null);

          // Load preferences first
          const preferences = await auth.getUserPreferences();
          setExperienceLevel(preferences.interface_mode);

          // Show tutorial if not completed for current mode
          if (!preferences.tutorial_completed?.[preferences.interface_mode]) {
            setShowTutorial(true);
          }

          // Load subscription data
          const currentSub = await subscriptions.getCurrentSubscription();
          setSubscription(currentSub);

          // Load available plans
          const plans = await subscriptions.getAvailablePlans();
          setAvailablePlans(plans);

        } catch (error) {
          console.error('Error loading user data:', error);
          setSubscriptionError(error instanceof Error ? error.message : 'Failed to load user data');
        } finally {
          setLoadingSubscription(false);
        }
      };

      loadUserData();
    }
  }, [loading, user]);

  const updateUserPreferences = async (preferences: {
    interface_mode: 'simple' | 'default' | 'advanced' | 'pro';
    tutorial_completed?: Record<string, boolean>;
  }) => {
    if (!user) {
      throw new Error('You must be logged in to update preferences');
    }

    try {
      await auth.updateUserPreferences(preferences);
      setExperienceLevel(preferences.interface_mode);
    } catch (error) {
      console.error('Error updating user preferences:', error);
      throw error;
    }
  };

  const isFeatureAvailable = async (featureId: string) => {
    if (!user) return false;
    return await subscriptions.isFeatureAvailable(featureId);
  };

  return (
    <UserExperienceContext.Provider value={{
      experienceLevel,
      setExperienceLevel,
      showTutorial,
      setShowTutorial,
      subscription,
      availablePlans,
      loadingSubscription,
      subscriptionError,
      isFeatureAvailable,
      updateUserPreferences
    }}>
      {children}
    </UserExperienceContext.Provider>
  );
};

export const useUserExperience = () => {
  const context = useContext(UserExperienceContext);
  if (context === undefined) {
    throw new Error('useUserExperience must be used within a UserExperienceProvider');
  }
  return context;
};