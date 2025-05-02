import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

interface AuthSession {
  id: string;
  user_id: string;
  session_token: string;
  expires_at: string;
  metadata: Record<string, any>;
}

export const auth = {
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          origin_domain: window.location.hostname
        }
      }
    });
    
    if (error) throw error;
    
    if (data.user) {
      // Create cross-domain session
      await this.createSession(data.user.id);
    }
    
    return { data, error };
  },

  async signIn(email: string, password: string, rememberMe: boolean = false) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        expiresIn: rememberMe ? '30d' : '1d'
      }
    });

    if (error) throw error;

    if (data.user) {
      // Create or update cross-domain session
      await this.createSession(data.user.id, {
        remember_me: rememberMe,
        origin_domain: window.location.hostname
      });
    }

    return { data, error };
  },

  async signOut() {
    // Remove cross-domain session
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase
        .from('auth_sessions')
        .delete()
        .eq('session_token', session.access_token);
    }

    return await supabase.auth.signOut();
  },

  async createSession(userId: string, metadata: Record<string, any> = {}) {
    const { data: existingSession } = await supabase
      .from('auth_sessions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingSession) {
      // Update existing session
      await supabase
        .from('auth_sessions')
        .update({
          updated_at: new Date().toISOString(),
          metadata: { ...existingSession.metadata, ...metadata }
        })
        .eq('id', existingSession.id);

      return existingSession;
    }

    // Create new session
    const { data: session, error } = await supabase
      .from('auth_sessions')
      .insert({
        user_id: userId,
        session_token: crypto.randomUUID(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        metadata
      })
      .select()
      .single();

    if (error) throw error;
    return session;
  },

  async validateSession(sessionToken: string): Promise<AuthSession | null> {
    const { data: session } = await supabase
      .from('auth_sessions')
      .select('*')
      .eq('session_token', sessionToken)
      .gt('expires_at', new Date().toISOString())
      .single();

    return session;
  },

  async refreshSession(sessionToken: string) {
    const { data: session } = await supabase
      .from('auth_sessions')
      .select('*')
      .eq('session_token', sessionToken)
      .single();

    if (!session) return null;

    // Update session expiry
    const { data: updatedSession } = await supabase
      .from('auth_sessions')
      .update({
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', session.id)
      .select()
      .single();

    return updatedSession;
  }
};