import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const stripe = {
  async createCheckoutSession(priceId: string, mode: 'payment' | 'subscription' = 'subscription') {
    try {
      // Get real-time price data
      const { data: priceData } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('stripe_price_id', priceId)
        .single();

      if (!priceData) {
        throw new Error('Invalid price ID');
      }

      const { data: { session_id } } = await supabase.functions.invoke('stripe-checkout', {
        body: { 
          price_id: priceId,
          mode,
          success_url: `${window.location.origin}/settings?tab=billing&success=true`,
          cancel_url: `${window.location.origin}/settings?tab=billing&canceled=true`,
          metadata: {
            plan_name: priceData.name,
            features: JSON.stringify(priceData.features)
          }
        }
      });

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Failed to load Stripe');

      const { error } = await stripe.redirectToCheckout({ sessionId: session_id });
      if (error) throw error;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  async getPortalSession() {
    try {
      const { data: { url }, error } = await supabase.functions.invoke('create-portal-session');
      if (error) throw error;
      return url;
    } catch (error) {
      console.error('Error getting portal session:', error);
      throw error;
    }
  },

  async getSubscriptionStatus() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data: subscription } = await supabase
        .from('stripe_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      return subscription;
    } catch (error) {
      console.error('Error getting subscription status:', error);
      throw error;
    }
  }
};