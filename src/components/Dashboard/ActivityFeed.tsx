import React from 'react';
import { Clock, DollarSign, UserPlus, FileText } from 'lucide-react';

const activities = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment received from Myzo AI',
    description: 'Invoice #INV-001 - $2,500',
    time: '2 hours ago',
    icon: DollarSign,
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    id: '2',
    type: 'client',
    title: 'New client added',
    description: 'Westclean Gutters joined your client list',
    time: '4 hours ago',
    icon: UserPlus,
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: '3',
    type: 'invoice',
    title: 'Invoice sent',
    description: 'Invoice #INV-005 sent to The Evie Edit',
    time: '6 hours ago',
    icon: FileText,
    iconColor: 'text-indigo-600 dark:text-indigo-400'
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment received from Creative Agency',
    description: 'Invoice #INV-003 - $1,750',
    time: '1 day ago',
    icon: DollarSign,
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    id: '5',
    type: 'invoice',
    title: 'Invoice overdue',
    description: 'Invoice #INV-002 is now 5 days overdue',
    time: '2 days ago',
    icon: Clock,
    iconColor: 'text-red-600 dark:text-red-400'
  }
];

export const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${activity.iconColor}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-6 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium">
        View all activity
      </button>
    </div>
  );
};