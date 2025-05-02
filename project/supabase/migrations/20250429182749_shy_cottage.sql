/*
  # Add competitors table and related analytics

  1. New Tables
    - competitors
      - Store competitor website information
      - Track analysis data and metrics
    - competitor_keywords
      - Track competitor keyword rankings
    - competitor_backlinks
      - Store competitor backlink data

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create competitors table
CREATE TABLE IF NOT EXISTS competitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  name text NOT NULL,
  analysis_data jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create competitor_keywords table
CREATE TABLE IF NOT EXISTS competitor_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id uuid REFERENCES competitors ON DELETE CASCADE NOT NULL,
  keyword text NOT NULL,
  position integer,
  volume integer,
  difficulty text,
  created_at timestamptz DEFAULT now()
);

-- Create competitor_backlinks table
CREATE TABLE IF NOT EXISTS competitor_backlinks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_id uuid REFERENCES competitors ON DELETE CASCADE NOT NULL,
  source_url text NOT NULL,
  target_url text NOT NULL,
  anchor_text text,
  domain_authority integer,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_backlinks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage competitors for their projects"
  ON competitors
  FOR ALL
  TO authenticated
  USING (project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
  ))
  WITH CHECK (project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can manage competitor keywords"
  ON competitor_keywords
  FOR ALL
  TO authenticated
  USING (competitor_id IN (
    SELECT c.id FROM competitors c
    JOIN projects p ON c.project_id = p.id
    WHERE p.user_id = auth.uid()
  ))
  WITH CHECK (competitor_id IN (
    SELECT c.id FROM competitors c
    JOIN projects p ON c.project_id = p.id
    WHERE p.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage competitor backlinks"
  ON competitor_backlinks
  FOR ALL
  TO authenticated
  USING (competitor_id IN (
    SELECT c.id FROM competitors c
    JOIN projects p ON c.project_id = p.id
    WHERE p.user_id = auth.uid()
  ))
  WITH CHECK (competitor_id IN (
    SELECT c.id FROM competitors c
    JOIN projects p ON c.project_id = p.id
    WHERE p.user_id = auth.uid()
  ));

-- Create indexes
CREATE INDEX competitors_project_id_idx ON competitors(project_id);
CREATE INDEX competitor_keywords_competitor_id_idx ON competitor_keywords(competitor_id);
CREATE INDEX competitor_backlinks_competitor_id_idx ON competitor_backlinks(competitor_id);