import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import type { Page } from '../../App';

interface ClientsProps {
  onNavigate: (page: Page) => void;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  totalInvoices: number;
  totalPaid: number;
  outstanding: number;
  lastInvoice: string;
}

export const Clients: React.FC<ClientsProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);

  const clients: Client[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@myzoai.com',
      phone: '+1 (555) 123-4567',
      company: 'Myzo AI',
      totalInvoices: 5,
      totalPaid: 12500,
      outstanding: 2500,
      lastInvoice: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@westcleangutters.com',
      phone: '+1 (555) 987-6543',
      company: 'Westclean Gutters',
      totalInvoices: 3,
      totalPaid: 8750,
      outstanding: 1750,
      lastInvoice: '2024-01-10'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@theevieedit.com',
      phone: '+1 (555) 456-7890',
      company: 'The Evie Edit',
      totalInvoices: 7,
      totalPaid: 15200,
      outstanding: 3200,
      lastInvoice: '2024-01-20'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@creative.com',
      phone: '+1 (555) 321-0987',
      company: 'Creative Agency',
      totalInvoices: 4,
      totalPaid: 9500,
      outstanding: 0,
      lastInvoice: '2024-01-25'
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleClientAction = (action: string, client: Client) => {
    console.log(`${action} action for client:`, client);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Clients</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your client relationships and view their invoice history
          </p>
        </div>
        
        <button
          onClick={() => setShowAddClient(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {client.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {client.company}
                  </p>
                </div>
                <div className="relative">
                  <button className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>{client.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Paid</p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(client.totalPaid)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Outstanding</p>
                  <p className={`text-sm font-semibold ${
                    client.outstanding > 0 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {formatCurrency(client.outstanding)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {client.totalInvoices} invoices
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleClientAction('view', client)}
                    className="p-1 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleClientAction('edit', client)}
                    className="p-1 text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                    title="Edit Client"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleClientAction('delete', client)}
                    className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    title="Delete Client"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No clients found matching your search.' : 'No clients yet.'}
            </p>
            <button
              onClick={() => setShowAddClient(true)}
              className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium"
            >
              Add your first client
            </button>
          </div>
        )}
      </div>

      {/* Add Client Modal Placeholder */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Client
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddClient(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddClient(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};