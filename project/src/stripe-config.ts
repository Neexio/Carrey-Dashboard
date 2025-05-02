import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const products = {
  free_trial: {
    priceId: 'price_1RJ0xmE1VYupAh8WEipNClnO',
    name: 'Free Trial',
    description: 'Try all features free for 14 days',
    features: [
      'Basic SEO Analysis',
      'Website Health Check',
      'Task Manager',
      'Simple Mode Interface',
      '1 Project',
      '50 Keywords',
      '14-day Trial'
    ],
    mode: 'subscription'
  },
  basic: {
    priceId: 'price_1RJ0zCE1VYupAh8W6I5n86hJ',
    name: 'Basic',
    description: 'Perfect for small businesses and startups',
    features: [
      'Everything in Free Trial',
      'Advanced Mode Interface',
      '3 Projects',
      '250 Keywords',
      'Content Tools',
      'Keyword Tracking',
      'Basic Reports',
      'Standard Support'
    ],
    price: 29,
    mode: 'subscription'
  },
  business: {
    priceId: 'price_1RJ0zjE1VYupAh8WS1dSTlt3',
    name: 'Business',
    description: 'Ideal for growing businesses',
    features: [
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
    price: 99,
    mode: 'subscription'
  },
  enterprise: {
    priceId: 'price_1RJ108E1VYupAh8Wq6eRhboC',
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    features: [
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
    ],
    price: 499,
    mode: 'subscription'
  }
} as const;

export type ProductId = keyof typeof products;

export async function createCheckoutSession(priceId: string, mode: 'subscription') {
  try {
    const response = await fetch('/functions/v1/stripe-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('supabase.auth.token')}`
      },
      body: JSON.stringify({
        price_id: priceId,
        success_url: `${window.location.origin}/settings?tab=billing&success=true`,
        cancel_url: `${window.location.origin}/settings?tab=billing&canceled=true`,
        mode
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Failed to load Stripe');

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) throw error;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}