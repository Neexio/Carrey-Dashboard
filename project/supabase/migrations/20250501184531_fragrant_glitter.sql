/*
  # Fix interface mode validation

  1. Changes
    - Update interface_mode check constraint to include 'default' mode
    - Ensure existing data remains valid
*/

-- Drop existing check constraint
ALTER TABLE user_preferences 
DROP CONSTRAINT IF EXISTS user_preferences_interface_mode_check;

-- Add updated check constraint
ALTER TABLE user_preferences 
ADD CONSTRAINT user_preferences_interface_mode_check 
CHECK (interface_mode IN ('simple', 'default', 'advanced'));