import { supabase } from './supabase';

export const api = {
  async analyzeSite(url: string) {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error analyzing site:', error);
      throw error;
    }
  },

  async generateContent(prompt: string) {
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  },

  async checkPlagiarism(content: string) {
    try {
      const response = await fetch('/api/check-plagiarism', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error checking plagiarism:', error);
      throw error;
    }
  },

  async getKeywordSuggestions(seed: string) {
    try {
      const response = await fetch('/api/keyword-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seed }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error getting keyword suggestions:', error);
      throw error;
    }
  },

  async getBacklinks(domain: string) {
    try {
      const response = await fetch('/api/backlinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error getting backlinks:', error);
      throw error;
    }
  },
};