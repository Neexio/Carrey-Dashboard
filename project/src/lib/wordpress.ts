import { supabase } from './supabase';

interface WordPressPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  modified: string;
  status: string;
  categories: number[];
  tags: number[];
  meta: Record<string, any>;
}

export const wordpress = {
  baseUrl: import.meta.env.VITE_WORDPRESS_API_URL,
  
  async getPosts(): Promise<WordPressPost[]> {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/posts?_embed`);
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error('Error fetching WordPress posts:', error);
      throw error;
    }
  },

  async getPost(id: number): Promise<WordPressPost> {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/posts/${id}?_embed`);
      const post = await response.json();
      return post;
    } catch (error) {
      console.error('Error fetching WordPress post:', error);
      throw error;
    }
  },

  async updatePost(id: number, updates: Partial<WordPressPost>) {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/posts/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('wp_token')}`
        },
        body: JSON.stringify(updates)
      });

      const updatedPost = await response.json();
      return updatedPost;
    } catch (error) {
      console.error('Error updating WordPress post:', error);
      throw error;
    }
  },

  async analyzeContent(post: WordPressPost) {
    try {
      // Analyze post content using our AI service
      const analysis = await supabase.functions.invoke('analyze-content', {
        body: { content: post.content }
      });

      // Store analysis results
      await supabase
        .from('content_pieces')
        .insert({
          title: post.title,
          content: post.content,
          status: post.status,
          analysis: analysis.data
        });

      return analysis.data;
    } catch (error) {
      console.error('Error analyzing WordPress content:', error);
      throw error;
    }
  },

  async syncContent() {
    try {
      // Get all WordPress posts
      const posts = await this.getPosts();
      
      // Analyze and store each post
      const analyses = await Promise.all(
        posts.map(post => this.analyzeContent(post))
      );

      return analyses;
    } catch (error) {
      console.error('Error syncing WordPress content:', error);
      throw error;
    }
  }
};