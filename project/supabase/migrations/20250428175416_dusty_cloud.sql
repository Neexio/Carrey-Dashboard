/*
  # Add team management and user preferences tables

  1. New Tables
    - team_members
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - team_id (uuid, foreign key)
      - role (text)
      - status (text)
      - created_at (timestamp)
    - teams
      - id (uuid, primary key)
      - name (text)
      - owner_id (uuid, foreign key)
      - created_at (timestamp)
    - user_preferences
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - interface_mode (text)
      - notifications (jsonb)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  team_id uuid REFERENCES teams ON DELETE CASCADE NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'editor', 'analyst')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, team_id)
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  interface_mode text NOT NULL DEFAULT 'simple' CHECK (interface_mode IN ('simple', 'advanced')),
  notifications jsonb NOT NULL DEFAULT '{
    "email": true,
    "push": true,
    "in_app": true
  }',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Team owners can manage their teams"
  ON teams
  FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Team members can view their teams"
  ON teams
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT team_id 
      FROM team_members 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Team members can manage their membership"
  ON team_members
  FOR ALL
  TO authenticated
  USING (
    team_id IN (
      SELECT id FROM teams WHERE owner_id = auth.uid()
    ) OR user_id = auth.uid()
  )
  WITH CHECK (
    team_id IN (
      SELECT id FROM teams WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());