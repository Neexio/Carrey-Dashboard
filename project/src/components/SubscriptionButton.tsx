import React, { useState } from 'react';
import { createCheckoutSession, type ProductId, products } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';

interface SubscriptionButtonProps {
  productId: ProductId;
  className?: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ productId, className = '' }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const product = products[productId];

  const handleSubscribe = async () => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/auth?redirect=/settings?tab=billing';
      return;
    }

    setLoading(true);
    try {
      await createCheckoutSession(product.priceId, product.mode);
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className={`px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center justify-center ${className}`}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
      ) : (
        product.mode === 'subscription' ? 'Subscribe' : 'Start Free Trial'
      )}
    </button>
  );
};

export default SubscriptionButton;