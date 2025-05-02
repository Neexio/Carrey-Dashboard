import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const settingsMenuItem = {
    id: 'logout',
    label: 'Log Out',
    icon: <LogOut size={20} />,
    onClick: handleSignOut
  };

  return settingsMenuItem;
};

export default Settings;