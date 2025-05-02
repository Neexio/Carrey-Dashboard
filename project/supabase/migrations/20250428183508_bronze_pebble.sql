/*
  # Add subscription management tables

  1. New Tables
    - subscription_plans
      - id (uuid, primary key)
      - name (text)
      - price (integer)
      - features (jsonb)
      - created_at (timestamp)
    - user_subscriptions
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - plan_id (uuid, foreign key)
      - status (text)
      - current_period_end (timestamp)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price integer NOT NULL,
  features jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  plan_id uuid REFERENCES subscription_plans NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'canceled', 'past_due')),
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view subscription plans"
  ON subscription_plans
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own subscriptions"
  ON user_subscriptions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Insert default subscription plans
INSERT INTO subscription_plans (name, price, features) VALUES
  ('Basic', 0, '{
    "maxProjects": 1,
    "maxKeywords": 100,
    "features": ["basic-seo", "task-manager", "website-analysis"]
  }'),
  ('Pro', 49, '{
    "maxProjects": 5,
    "maxKeywords": 1000,
    "features": [
      "basic-seo",
      "task-manager",
      "website-analysis",
      "advanced-analytics",
      "ai-content",
      "content-detector",
      "plagiarism-checker"
    ]
  }'),
  ('Enterprise', 199, '{
    "maxProjects": -1,
    "maxKeywords": -1,
    "features": [
      "basic-seo",
      "task-manager",
      "website-analysis",
      "advanced-analytics",
      "ai-content",
      "content-detector",
      "plagiarism-checker",
      "competitor-analysis",
      "bulk-analysis",
      "api-access",
      "white-label",
      "priority-support"
    ]
  }');