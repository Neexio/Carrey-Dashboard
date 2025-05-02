import React from 'react';
import OverviewDashboard from './OverviewDashboard';
import TaskManager from '../TaskManager';
import NotePad from '../NotePad';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <OverviewDashboard />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskManager />
        <NotePad />
      </div>
    </div>
  );
};

export default Dashboard;