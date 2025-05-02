/*
  # Add main site flag to projects

  1. Changes
    - Ensure is_main_site column exists
    - Add unique constraint for main site
*/

-- Safely add is_main_site column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'projects' 
    AND column_name = 'is_main_site'
  ) THEN
    ALTER TABLE projects ADD COLUMN is_main_site boolean DEFAULT false;
  END IF;
END $$;

-- Drop existing index if it exists
DROP INDEX IF EXISTS projects_main_site_idx;

-- Create unique index
CREATE UNIQUE INDEX projects_main_site_idx ON projects (is_main_site) 
WHERE is_main_site = true;