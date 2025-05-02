import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
    multiTab: true
  },
  db: {
    schema: 'public'
  }
});

// Add heartbeat to keep connection alive
setInterval(() => {
  const channel = supabase.channel('alive');
  channel.subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.debug('Realtime connection alive');
    }
  });
}, 30000);

// Get the realtime client instance
const realtime = supabase.channel('system');

// Handle connection state changes
realtime.on('system', { event: 'disconnected' }, () => {
  console.error('Realtime disconnected');
  // Attempt to reconnect
  realtime.subscribe();
});

realtime.on('system', { event: 'connected' }, () => {
  console.debug('Realtime connected');
});

// Subscribe to the system channel
realtime.subscribe();

export const getRealtimeClient = () => supabase.realtime;