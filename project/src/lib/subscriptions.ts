import { stripe } from './stripe';
import { supabase } from './supabase';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: {
    maxProjects: number;
    maxKeywords: number;
    maxCompetitors: number;
    features: string[];
  };
  stripePriceId: string;
}

export const subscriptions = {
  async getCurrentSubscription(): Promise<SubscriptionPlan | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: subscription } = await supabase
        .from('stripe_subscriptions')
        .select('*')
        .eq('customer_id', user.id)
        .maybeSingle();

      if (!subscription) return null;

      // Map subscription data to SubscriptionPlan interface
      return {
        id: subscription.subscription_id,
        name: subscription.price_id, // You might want to map this to a friendly name
        price: 0, // This should be fetched from your pricing table
        features: {
          maxProjects: 10, // These should be based on the subscription tier
          maxKeywords: 100,
          maxCompetitors: 5,
          features: []
        },
        stripePriceId: subscription.price_id
      };
    } catch (error) {
      console.error('Error getting current subscription:', error);
      return null;
    }
  },

  async getCurrentUsage(userId: string) {
    const { data: projects } = await supabase
      .from('projects')
      .select('id')
      .eq('user_id', userId);

    const { data: keywords } = await supabase
      .from('keywords')
      .select('id')
      .eq('user_id', userId);

    const { data: competitors } = await supabase
      .from('competitors')
      .select('id')
      .eq('user_id', userId);

    return {
      projects: projects?.length || 0,
      keywords: keywords?.length || 0,
      competitors: competitors?.length || 0
    };
  },

  async getAvailablePlans(): Promise<SubscriptionPlan[]> {
    try {
      const { data: plans } = await supabase
        .from('subscription_plans')
        .select('*');

      return plans?.map(plan => ({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        features: plan.features,
        stripePriceId: plan.stripe_price_id
      })) || [];
    } catch (error) {
      console.error('Error getting available plans:', error);
      return [];
    }
  },

  async checkFeatureAccess(userId: string, feature: string): Promise<{
    hasAccess: boolean;
    reason?: string;
    upgradeUrl?: string;
  }> {
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (!subscription) {
      return {
        hasAccess: false,
        reason: 'This feature requires a paid subscription',
        upgradeUrl: '/settings?tab=billing'
      };
    }

    const usage = await this.getCurrentUsage(userId);
    const plan = subscription.plan;

    // Check limits based on feature
    if (feature === 'add_project' && usage.projects >= plan.features.maxProjects) {
      return {
        hasAccess: false,
        reason: `You've reached your project limit (${plan.features.maxProjects})`,
        upgradeUrl: '/settings?tab=billing'
      };
    }

    if (feature === 'add_keyword' && usage.keywords >= plan.features.maxKeywords) {
      return {
        hasAccess: false,
        reason: `You've reached your keyword tracking limit (${plan.features.maxKeywords})`,
        upgradeUrl: '/settings?tab=billing'
      };
    }

    if (feature === 'add_competitor' && usage.competitors >= plan.features.maxCompetitors) {
      return {
        hasAccess: false,
        reason: `You've reached your competitor tracking limit (${plan.features.maxCompetitors})`,
        upgradeUrl: '/settings?tab=billing'
      };
    }

    return { hasAccess: true };
  },

  async isFeatureAvailable(featureId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const access = await this.checkFeatureAccess(user.id, featureId);
      return access.hasAccess;
    } catch (error) {
      console.error('Error checking feature availability:', error);
      return false;
    }
  },

  async showUpgradeModal(feature: string) {
    // Show modal with upgrade options
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
          <h3 class="text-lg font-semibold mb-4">Upgrade Required</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            To access ${feature}, you need to upgrade your plan.
          </p>
          <div class="flex justify-end space-x-2">
            <button class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              Cancel
            </button>
            <button class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
              View Plans
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
};