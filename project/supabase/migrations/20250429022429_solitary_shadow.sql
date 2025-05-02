/*
  # Create Prompt System Tables

  1. New Tables
    - saved_prompts
      - Store user's saved prompts and templates
      - Track usage and categories
    - prompt_suggestions
      - Store AI-generated suggestions
      - Link to specific prompts
    - prompt_analytics
      - Track prompt performance and usage metrics

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create saved_prompts table
CREATE TABLE IF NOT EXISTS saved_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  prompt text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prompt_suggestions table
CREATE TABLE IF NOT EXISTS prompt_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid REFERENCES saved_prompts ON DELETE CASCADE,
  suggestion_text text NOT NULL,
  category text NOT NULL,
  confidence float NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create prompt_analytics table
CREATE TABLE IF NOT EXISTS prompt_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid REFERENCES saved_prompts ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users NOT NULL,
  success_rate float,
  usage_count integer DEFAULT 0,
  avg_response_time float,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE saved_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their saved prompts"
  ON saved_prompts
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view suggestions for their prompts"
  ON prompt_suggestions
  FOR SELECT
  TO authenticated
  USING (prompt_id IN (
    SELECT id FROM saved_prompts WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can view analytics for their prompts"
  ON prompt_analytics
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());