import React from 'react';
import { SummaryCard } from './SummaryCard';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { 
  DollarSign, 
  CreditCard, 
  AlertCircle, 
  Users 
} from 'lucide-react';
import type { Page } from '../../App';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const summaryData = [
    {
      title: 'Total Outstanding',
      value: '$24,500',
      change: '+12%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'indigo'
    },
    {
      title: 'Paid This Month',
      value: '$18,750',
      change: '+8%',
      changeType: 'positive' as const,
      icon: CreditCard,
      color: 'green'
    },
    {
      title: 'Unpaid Invoices',
      value: '12',
      change: '-3%',
      changeType: 'negative' as const,
      icon: AlertCircle,
      color: 'red'
    },
    {
      title: 'Total Clients',
      value: '48',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'blue'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div>
          <QuickActions onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
};