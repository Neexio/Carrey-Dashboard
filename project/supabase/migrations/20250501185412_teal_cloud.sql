/*
  # Update interface modes and add tutorial system

  1. Changes
    - Update interface mode check constraint to include all modes
    - Add tutorial completion tracking
*/

-- Update interface mode check constraint
ALTER TABLE user_preferences 
DROP CONSTRAINT IF EXISTS user_preferences_interface_mode_check;

ALTER TABLE user_preferences 
ADD CONSTRAINT user_preferences_interface_mode_check 
CHECK (interface_mode IN ('simple', 'default', 'advanced', 'pro'));

-- Add tutorial completion tracking
ALTER TABLE user_preferences
ADD COLUMN IF NOT EXISTS tutorial_completed jsonb DEFAULT '{
  "simple": false,
  "default": false,
  "advanced": false,
  "pro": false
}'::jsonb;