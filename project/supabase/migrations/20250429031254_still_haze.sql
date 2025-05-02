/*
  # Add notifications table and indexes

  1. New Table
    - notifications
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - title (text)
      - message (text)
      - type (text, enum check)
      - read (boolean)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Add policy for authenticated users

  3. Performance
    - Add indexes for user_id, read status, and created_at
*/

-- Drop existing policy if it exists
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can manage their own notifications" ON notifications;
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- Create notifications table if it doesn't exist
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error')),
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own notifications"
  ON notifications
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create indexes for better query performance
DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
  CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(read);
  CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at);
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;