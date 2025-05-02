-- Add is_main_site column to projects table
ALTER TABLE projects 
ADD COLUMN is_main_site boolean DEFAULT false;

-- Add unique constraint to ensure only one main site
CREATE UNIQUE INDEX projects_main_site_idx ON projects (is_main_site) 
WHERE is_main_site = true;