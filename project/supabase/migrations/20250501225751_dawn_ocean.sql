/*
  # Add subdomain authentication support

  1. New Tables
    - auth_sessions
      - Track user sessions across subdomains
      - Store session metadata and expiry
    - auth_domains
      - Manage allowed authentication domains
      - Configure domain-specific settings

  2. Security
    - Enable RLS
    - Add policies for session management
*/

-- Create auth_sessions table
CREATE TABLE IF NOT EXISTS auth_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  session_token text NOT NULL UNIQUE,
  refresh_token text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Create auth_domains table
CREATE TABLE IF NOT EXISTS auth_domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text NOT NULL UNIQUE,
  is_active boolean DEFAULT true,
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE auth_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_domains ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own sessions"
  ON auth_sessions
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow reading active domains"
  ON auth_domains
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create indexes
CREATE INDEX auth_sessions_user_id_idx ON auth_sessions(user_id);
CREATE INDEX auth_sessions_expires_at_idx ON auth_sessions(expires_at);
CREATE INDEX auth_domains_domain_idx ON auth_domains(domain);

-- Insert default domains
INSERT INTO auth_domains (domain, settings) VALUES
  ('carrey.ai', '{"type": "main", "features": ["marketing", "auth"]}'::jsonb),
  ('dashboard.carrey.ai', '{"type": "app", "features": ["dashboard", "analytics"]}'::jsonb);