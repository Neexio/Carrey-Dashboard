import { supabase } from './supabase';

interface WooCommerceConfig {
  consumerKey: string;
  consumerSecret: string;
  url: string;
}

class WooCommerceAPI {
  private config: WooCommerceConfig;

  constructor(config: WooCommerceConfig) {
    this.config = config;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.config.url}/wp-json/wc/v3/${endpoint}`;
    
    // Create authentication string
    const auth = btoa(`${this.config.consumerKey}:${this.config.consumerSecret}`);
    
    const headers = {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`WooCommerce API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('WooCommerce API request failed:', error);
      throw error;
    }
  }

  async getOrders() {
    return this.request('orders');
  }

  async getProducts() {
    return this.request('products');
  }

  async getCustomers() {
    return this.request('customers');
  }

  async syncCustomerWithDashboard(customerId: string) {
    try {
      const customer = await this.request(`customers/${customerId}`);
      
      // Create or update user in Supabase
      const { data, error } = await supabase
        .from('users')
        .upsert({
          email: customer.email,
          woocommerce_id: customer.id,
          metadata: {
            first_name: customer.first_name,
            last_name: customer.last_name,
            billing_address: customer.billing,
            shipping_address: customer.shipping
          }
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error syncing customer:', error);
      throw error;
    }
  }

  async syncSubscriptions() {
    try {
      const subscriptions = await this.request('subscriptions');
      
      // Sync each subscription with Supabase
      for (const subscription of subscriptions) {
        await supabase
          .from('user_subscriptions')
          .upsert({
            woocommerce_id: subscription.id,
            user_id: subscription.customer_id,
            status: subscription.status,
            plan_id: subscription.product_id,
            current_period_end: subscription.next_payment_date
          });
      }

      return subscriptions;
    } catch (error) {
      console.error('Error syncing subscriptions:', error);
      throw error;
    }
  }
}

// Initialize WooCommerce API client
export const woocommerce = new WooCommerceAPI({
  consumerKey: 'ck_a34893d3b0a21f69be77fa99bf875c91b335b68f',
  consumerSecret: 'cs_dcfe137d5bf9012d1e1f990a7cdcab5abc86d78f',
  url: 'https://carrey.ai'
});