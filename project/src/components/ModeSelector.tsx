import React, { useState, useRef, useEffect } from 'react';
import { Settings, Sparkles, Code, Star } from 'lucide-react';

const modes = [
  { id: 'simple', label: 'Simple', icon: Settings, description: 'Basic SEO tools and guidance' },
  { id: 'default', label: 'Default', icon: Sparkles, description: 'Standard features and analytics' },
  { id: 'advanced', label: 'Advanced', icon: Code, description: 'Advanced tools and customization' },
  { id: 'pro', label: 'Pro', icon: Star, description: 'Enterprise-level features and API access' }
];

const ModeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleModeSelect = (mode: typeof modes[0]) => {
    setSelectedMode(mode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <selectedMode.icon size={20} />
        <span className="hidden md:inline">{selectedMode.label} Mode</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeSelect(mode)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selectedMode.id === mode.id
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <mode.icon size={18} />
              <div className="text-left">
                <div className="font-medium">{mode.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{mode.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModeSelector;