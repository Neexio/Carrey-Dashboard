import { supabase } from './supabase';

export const websiteAnalyzer = {
  async analyzeWebsite(url: string, projectId: string) {
    try {
      const { data: response } = await supabase.functions.invoke('analyze-website', {
        body: { url, projectId }
      });
      return response;
    } catch (error) {
      console.error('Error analyzing website:', error);
      throw error;
    }
  },

  async getAnalytics(projectId: string) {
    try {
      const { data, error } = await supabase
        .from('website_analytics')
        .select('*')
        .eq('project_id', projectId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  },

  async updateAnalytics(projectId: string, metrics: any) {
    try {
      const { data, error } = await supabase
        .from('website_analytics')
        .upsert({
          project_id: projectId,
          ...metrics
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating analytics:', error);
      throw error;
    }
  }
};