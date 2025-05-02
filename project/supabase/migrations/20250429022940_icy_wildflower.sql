/*
  # Add Website Analytics Tables
  
  1. New Tables
    - website_analytics
      - Stores website traffic and performance metrics
      - Links to projects table
    - analytics_events
      - Stores detailed analytics events
      - Links to website_analytics table
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    
  3. Performance
    - Add indexes for common query patterns
*/

-- Create website_analytics table
CREATE TABLE IF NOT EXISTS website_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  visitors integer NOT NULL DEFAULT 0,
  page_views integer NOT NULL DEFAULT 0,
  avg_session_time float NOT NULL DEFAULT 0,
  bounce_rate float NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_analytics_id uuid REFERENCES website_analytics ON DELETE CASCADE NOT NULL,
  event_type text NOT NULL,
  event_data jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE website_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view analytics for their projects"
  ON website_analytics
  FOR ALL
  TO authenticated
  USING (project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
  ))
  WITH CHECK (project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can view events for their analytics"
  ON analytics_events
  FOR ALL
  TO authenticated
  USING (website_analytics_id IN (
    SELECT wa.id 
    FROM website_analytics wa
    JOIN projects p ON wa.project_id = p.id
    WHERE p.user_id = auth.uid()
  ))
  WITH CHECK (website_analytics_id IN (
    SELECT wa.id 
    FROM website_analytics wa
    JOIN projects p ON wa.project_id = p.id
    WHERE p.user_id = auth.uid()
  ));

-- Create indexes for better query performance
CREATE INDEX website_analytics_project_id_idx ON website_analytics(project_id);
CREATE INDEX website_analytics_url_idx ON website_analytics(url);
CREATE INDEX analytics_events_website_analytics_id_idx ON analytics_events(website_analytics_id);
CREATE INDEX analytics_events_type_idx ON analytics_events(event_type);