import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Admin from './Admin';
import OverviewDashboard from '../components/sections/OverviewDashboard';
import Analytics from '../components/sections/Analytics';
import TaskManagerPage from './TaskManagerPage';
import StepByStep from './StepByStep';
import ContentCreator from '../components/sections/ContentCreator';
import AIAssistant from '../components/sections/AIAssistant';
import WebsiteAnalytics from '../components/sections/WebsiteAnalytics';
import HealthCheck from '../components/sections/HealthCheck';
import Keywords from '../components/sections/Keywords';
import ContentDetector from '../components/sections/ContentDetector';
import PlagiarismChecker from '../components/sections/PlagiarismChecker';
import Backlinks from '../components/sections/Backlinks';
import Competitors from '../components/sections/Competitors';
import SiteAudit from '../components/sections/SiteAudit';
import Reports from '../components/sections/Reports';
import Projects from '../components/sections/Projects';
import Settings from '../components/sections/Settings';
import Help from './Help';
import LoadingScreen from '../components/LoadingScreen';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'dashboard';
    setCurrentSection(path);
  }, [location]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Check if user is admin
  const isAdmin = user?.user_metadata?.role === 'admin';

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar 
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        isAdmin={isAdmin}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 overflow-y-auto p-6">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<OverviewDashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/daily-tasks" element={<TaskManagerPage />} />
              <Route path="/step-by-step" element={<StepByStep />} />
              <Route path="/content-creator" element={<ContentCreator />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/website-analytics" element={<WebsiteAnalytics />} />
              <Route path="/health-check" element={<HealthCheck />} />
              <Route path="/keywords" element={<Keywords />} />
              <Route path="/content-detector" element={<ContentDetector />} />
              <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />
              <Route path="/backlinks" element={<Backlinks />} />
              <Route path="/competitors" element={<Competitors />} />
              <Route path="/site-audit" element={<SiteAudit />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              {isAdmin && <Route path="/admin" element={<Admin />} />}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;