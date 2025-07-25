import React, { useState } from 'react';
import { InvoiceTable } from './InvoiceTable';
import { InvoiceFilters } from './InvoiceFilters';
import { Plus, Filter } from 'lucide-react';
import type { Page } from '../../App';

interface InvoicesProps {
  onNavigate: (page: Page) => void;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
}

export const Invoices: React.FC<InvoicesProps> = ({ onNavigate }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all');
  const [dateFilter, setDateFilter] = useState('all');

  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-001',
      client: 'Myzo AI',
      amount: 2500,
      status: 'paid',
      date: '2024-01-15',
      dueDate: '2024-02-15'
    },
    {
      id: '2',
      number: 'INV-002',
      client: 'Westclean Gutters',
      amount: 1750,
      status: 'overdue',
      date: '2024-01-10',
      dueDate: '2024-02-10'
    },
    {
      id: '3',
      number: 'INV-003',
      client: 'The Evie Edit',
      amount: 3200,
      status: 'sent',
      date: '2024-01-20',
      dueDate: '2024-02-20'
    },
    {
      id: '4',
      number: 'INV-004',
      client: 'Creative Agency',
      amount: 4500,
      status: 'paid',
      date: '2024-01-25',
      dueDate: '2024-02-25'
    },
    {
      id: '5',
      number: 'INV-005',
      client: 'StartupXYZ',
      amount: 1200,
      status: 'draft',
      date: '2024-01-28',
      dueDate: '2024-02-28'
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    if (statusFilter !== 'all' && invoice.status !== statusFilter) {
      return false;
    }
    // Add date filtering logic here if needed
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Invoices</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and track all your invoices
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          
          <button
            onClick={() => onNavigate('create-invoice')}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </button>
        </div>
      </div>

      {showFilters && (
        <InvoiceFilters
          statusFilter={statusFilter}
          dateFilter={dateFilter}
          onStatusChange={setStatusFilter}
          onDateChange={setDateFilter}
        />
      )}

      <InvoiceTable invoices={filteredInvoices} />
    </div>
  );
};