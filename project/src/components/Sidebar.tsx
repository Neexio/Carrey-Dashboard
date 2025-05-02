import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Logo from './Logo';
import {
  LayoutDashboard,
  LineChart,
  PenTool,
  Bot,
  BarChart2,
  Shield,
  Key,
  Target,
  FileText,
  Link2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Globe,
  Users,
  MessageSquare,
  Bell,
  Zap,
  BookOpen,
  Briefcase,
  PieChart,
  TrendingUp,
  CheckSquare,
  HelpCircle,
  Footprints
} from 'lucide-react';

interface SidebarProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  collapsed: boolean;
  toggleSidebar: () => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentSection, 
  setCurrentSection, 
  collapsed,
  toggleSidebar,
  isAdmin 
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { id: 'analytics', label: 'Analytics', icon: <LineChart size={20} />, path: '/analytics' },
    { id: 'daily-tasks', label: 'Daily Tasks', icon: <CheckSquare size={20} />, path: '/daily-tasks' },
    { id: 'step-by-step', label: 'Step by Step', icon: <Footprints size={20} />, path: '/step-by-step', isNew: true },
    { id: 'ai-assistant', label: 'AI Assistant', icon: <Bot size={20} />, path: '/ai-assistant' },
  ];

  const featureItems = [
    { id: 'keywords', label: 'Keywords', icon: <Key size={20} />, path: '/keywords' },
    { id: 'health-check', label: 'Health Check', icon: <Shield size={20} />, path: '/health-check' },
    { id: 'website-analytics', label: 'Website Analytics', icon: <BarChart2 size={20} />, path: '/website-analytics' },
    { id: 'backlinks', label: 'Backlinks', icon: <Link2 size={20} />, path: '/backlinks' },
    { id: 'competitors', label: 'Competitors', icon: <TrendingUp size={20} />, path: '/competitors' },
    { id: 'site-audit', label: 'Site Audit', icon: <Globe size={20} />, path: '/site-audit' },
  ];

  const contentItems = [
    { id: 'content-creator', label: 'Content Creator', icon: <PenTool size={20} />, path: '/content-creator' },
    { id: 'content-detector', label: 'Content Detector', icon: <Target size={20} />, path: '/content-detector' },
    { id: 'plagiarism-checker', label: 'Plagiarism Checker', icon: <FileText size={20} />, path: '/plagiarism-checker' },
  ];

  const resourceItems = [
    { 
      id: 'academy', 
      label: 'SEO Academy', 
      icon: <BookOpen size={20} />, 
      path: '/academy', 
      isNew: true,
      comingSoon: true,
      tooltip: 'Comprehensive SEO learning platform launching soon'
    },
    { 
      id: 'community', 
      label: 'Community', 
      icon: <Users size={20} />, 
      path: '/community',
      comingSoon: true,
      tooltip: 'Connect with other SEO professionals'
    },
    { 
      id: 'integrations', 
      label: 'Integrations', 
      icon: <Zap size={20} />, 
      path: '/integrations',
      comingSoon: true,
      tooltip: 'Connect with your favorite tools'
    }
  ];

  const adminItems = isAdmin ? [
    { id: 'admin', label: 'Admin Panel', icon: <Shield size={20} />, path: '/admin' }
  ] : [];

  const handleNavigation = (path: string, id: string) => {
    setCurrentSection(id);
    navigate(path);
  };

  const renderNavItem = (item: { 
    id: string; 
    label: string; 
    icon: React.ReactNode; 
    path: string; 
    isNew?: boolean;
    comingSoon?: boolean;
    tooltip?: string;
  }) => (
    <button
      key={item.id}
      onClick={() => !item.comingSoon && handleNavigation(item.path, item.id)}
      className={`w-full flex items-center ${
        collapsed ? 'justify-center' : 'justify-start'
      } p-2 rounded-lg mb-1 transition-colors ${
        item.comingSoon 
          ? 'opacity-50 cursor-not-allowed'
          : location.pathname === item.path
            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      title={item.tooltip}
    >
      <div className="relative">
        {item.icon}
        {item.isNew && (
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary-500 rounded-full"></span>
        )}
      </div>
      {!collapsed && (
        <div className="ml-3 flex items-center justify-between flex-1">
          <span>{item.label}</span>
          {item.comingSoon && (
            <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
              Soon
            </span>
          )}
        </div>
      )}
    </button>
  );

  return (
    <aside 
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-full`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <Link to="/dashboard" className="flex-shrink-0">
          <Logo collapsed={collapsed} />
        </Link>
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <div className="px-3">
          <div className="mb-4">
            <div className={`px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ${
              collapsed ? 'text-center' : ''
            }`}>
              Optimize
            </div>
            {menuItems.map(renderNavItem)}
          </div>

          <div className="mb-4">
            <div className={`px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ${
              collapsed ? 'text-center' : ''
            }`}>
              Analytics
            </div>
            {featureItems.map(renderNavItem)}
          </div>

          <div className="mb-4">
            <div className={`px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ${
              collapsed ? 'text-center' : ''
            }`}>
              Content
            </div>
            {contentItems.map(renderNavItem)}
          </div>

          <div className="mb-4">
            <div className={`px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ${
              collapsed ? 'text-center' : ''
            }`}>
              Resources
            </div>
            {resourceItems.map(renderNavItem)}
          </div>

          {isAdmin && (
            <div className="mb-4">
              <div className={`px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase ${
                collapsed ? 'text-center' : ''
              }`}>
                Admin
              </div>
              {adminItems.map(renderNavItem)}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="px-3">
          {renderNavItem({ id: 'help', label: 'Help & Support', icon: <HelpCircle size={20} />, path: '/help' })}
          {renderNavItem({ id: 'settings', label: 'Settings', icon: <Settings size={20} />, path: '/settings' })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;