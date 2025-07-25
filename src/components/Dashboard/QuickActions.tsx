import React from 'react';
import { Plus, UserPlus, FileText, Eye } from 'lucide-react';
import type { Page } from '../../App';

interface QuickActionsProps {
  onNavigate: (page: Page) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  const actions = [
    {
      title: 'New Invoice',
      description: 'Create and send a new invoice',
      icon: Plus,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      onClick: () => onNavigate('create-invoice')
    },
    {
      title: 'Add Client',
      description: 'Add a new client to your database',
      icon: UserPlus,
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => onNavigate('clients')
    },
    {
      title: 'View Invoices',
      description: 'Manage all your invoices',
      icon: FileText,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => onNavigate('invoices')
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Quick Actions
      </h3>
      
      <div className="space-y-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`w-full flex items-center p-4 rounded-xl text-white transition-colors duration-200 ${action.color}`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm opacity-90">{action.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};