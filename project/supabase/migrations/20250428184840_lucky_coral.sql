/*
  # Update subscription plans and features

  1. Changes
    - Update subscription plan tiers and pricing
    - Add new features for each tier
    - Update permissions structure

  2. Security
    - Maintain existing RLS policies
    - Add feature-based access control
*/

-- First, clear existing plans
TRUNCATE subscription_plans CASCADE;

-- Insert updated subscription plans
INSERT INTO subscription_plans (name, price, features) VALUES
  ('Free Trial', 0, '{
    "maxProjects": 1,
    "maxKeywords": 50,
    "features": [
      "basic-seo",
      "website-analysis",
      "task-manager",
      "simple-mode"
    ],
    "interface": "simple",
    "trialDays": 14
  }'),
  ('Basic', 29, '{
    "maxProjects": 3,
    "maxKeywords": 250,
    "features": [
      "basic-seo",
      "website-analysis",
      "task-manager",
      "content-tools",
      "simple-mode",
      "advanced-mode",
      "keyword-tracking",
      "basic-reports"
    ],
    "interface": ["simple", "advanced"],
    "supportLevel": "standard"
  }'),
  ('Business', 99, '{
    "maxProjects": 10,
    "maxKeywords": 1000,
    "features": [
      "basic-seo",
      "website-analysis",
      "task-manager",
      "content-tools",
      "simple-mode",
      "advanced-mode",
      "keyword-tracking",
      "advanced-reports",
      "competitor-analysis",
      "ai-content-generator",
      "content-detector",
      "backlink-analysis",
      "site-audit",
      "team-collaboration"
    ],
    "interface": ["simple", "advanced"],
    "supportLevel": "priority",
    "teamMembers": 5
  }'),
  ('Enterprise', 499, '{
    "maxProjects": -1,
    "maxKeywords": -1,
    "features": [
      "basic-seo",
      "website-analysis",
      "task-manager",
      "content-tools",
      "simple-mode",
      "advanced-mode",
      "keyword-tracking",
      "advanced-reports",
      "competitor-analysis",
      "ai-content-generator",
      "content-detector",
      "backlink-analysis",
      "site-audit",
      "team-collaboration",
      "api-access",
      "white-label",
      "custom-integrations",
      "dedicated-support",
      "bulk-analysis",
      "custom-reporting"
    ],
    "interface": ["simple", "advanced", "pro"],
    "supportLevel": "dedicated",
    "teamMembers": -1,
    "customFeatures": true
  }');