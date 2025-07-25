import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Menu,
  Moon,
  Sun,
  User,
  LogOut,
  Building2
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Dropdown } from '../UI/Dropdown';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const businesses = [
    { id: '1', name: 'Myzo AI', logo: '🤖' },
    { id: '2', name: 'Westclean Gutters', logo: '🏠' },
    { id: '3', name: 'The Evie Edit', logo: '✨' },
  ];

  const currentBusiness = businesses[0];

  const notifications = [
    { id: '1', title: 'Invoice #INV-001 paid', time: '2 hours ago', unread: true },
    { id: '2', title: 'New client registered', time: '4 hours ago', unread: true },
    { id: '3', title: 'Invoice #INV-003 overdue', time: '1 day ago', unread: false },
  ];

  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <Menu className="h-6 w-6" />
        </button>

        <Dropdown
          isOpen={businessDropdownOpen}
          onToggle={() => setBusinessDropdownOpen(!businessDropdownOpen)}
          trigger={
            <button className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <span className="text-2xl">{currentBusiness.logo}</span>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {currentBusiness.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Switch business
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          }
        >
          <div className="py-2">
            {businesses.map((business) => (
              <button
                key={business.id}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="mr-3 text-lg">{business.logo}</span>
                {business.name}
                {business.id === currentBusiness.id && (
                  <div className="ml-auto w-2 h-2 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2">
              <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Building2 className="mr-3 h-4 w-4" />
                Manage Businesses
              </button>
            </div>
          </div>
        </Dropdown>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <Dropdown
          isOpen={notificationsOpen}
          onToggle={() => setNotificationsOpen(!notificationsOpen)}
          trigger={
            <button className="relative p-2 rounded-xl text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Bell className="h-5 w-5" />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400" />
              )}
            </button>
          }
        >
          <div className="py-2 w-80">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Notifications
              </h3>
            </div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start">
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          isOpen={profileDropdownOpen}
          onToggle={() => setProfileDropdownOpen(!profileDropdownOpen)}
          trigger={
            <button className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          }
        >
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
            </div>
            <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <User className="mr-3 h-4 w-4" />
              Account Settings
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </button>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};