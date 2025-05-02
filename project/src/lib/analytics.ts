import { supabase } from './supabase';
import { createWebSocketConnection } from './websocket';

export const analyticsService = {
  async trackPageView(url: string, userId: string) {
    try {
      const { data: project } = await supabase
        .from('projects')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (!project) throw new Error('Project not found');

      // Use upsert for atomic updates
      const { data, error } = await supabase.rpc('increment_page_view', {
        p_project_id: project.id,
        p_url: url
      });

      if (error) throw error;

      // Track event with timestamp
      await supabase.from('analytics_events').insert({
        website_analytics_id: data.id,
        event_type: 'page_view',
        event_data: {
          url,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          referrer: document.referrer
        }
      });

      return data;
    } catch (error) {
      console.error('Error tracking page view:', error);
      throw error;
    }
  },

  subscribeToRealTimeUpdates(url: string, onUpdate: (data: any) => void) {
    // Create channel with retry logic
    const channel = supabase.channel(`analytics:${url}`, {
      config: {
        broadcast: { ack: true }
      }
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        console.debug('Presence state synchronized');
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.debug('Users joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.debug('Users left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const presence = await channel.track({
            online_at: new Date().toISOString(),
          });
          
          if (presence.error) {
            console.error('Error tracking presence:', presence.error);
          }
        }
      });

    // Add automatic reconnection
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;

    channel.unsubscribe().subscribe((status) => {
      if (status === 'CLOSED' && reconnectAttempts < maxReconnectAttempts) {
        reconnectAttempts++;
        const backoffDelay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
        
        setTimeout(() => {
          channel.subscribe();
        }, backoffDelay);
      }
    });

    return channel;
  }
};