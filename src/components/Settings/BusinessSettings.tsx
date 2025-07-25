import React, { useState } from 'react';
import { Plus, Edit, Trash2, Upload, Save, Building2, CreditCard } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  abn: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  taxRate: number;
  stripeKey: string;
  isActive: boolean;
}

export const BusinessSettings: React.FC = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<string>('1');
  const [showAddBusiness, setShowAddBusiness] = useState(false);

  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: '1',
      name: 'Myzo AI',
      abn: '12 345 678 901',
      address: '123 Business St, Sydney NSW 2000',
      phone: '+61 2 9876 5432',
      email: 'hello@myzoai.com',
      website: 'www.myzoai.com',
      logo: '🤖',
      taxRate: 10,
      stripeKey: 'sk_test_...',
      isActive: true
    },
    {
      id: '2',
      name: 'Westclean Gutters',
      abn: '98 765 432 109',
      address: '456 Tech Ave, Melbourne VIC 3000',
      phone: '+61 3 1234 5678',
      email: 'info@westcleangutters.com',
      website: 'www.westcleangutters.com',
      logo: '🏠',
      taxRate: 10,
      stripeKey: '',
      isActive: false
    },
    {
      id: '3',
      name: 'The Evie Edit',
      abn: '11 222 333 444',
      address: '789 Creative Lane, Brisbane QLD 4000',
      phone: '+61 7 3456 7890',
      email: 'hello@theevieedit.com',
      website: 'www.theevieedit.com',
      logo: '✨',
      taxRate: 10,
      stripeKey: '',
      isActive: false
    }
  ]);

  const selectedBusinessData = businesses.find(b => b.id === selectedBusiness);
  const [formData, setFormData] = useState<Business>(
    selectedBusinessData || businesses[0]
  );

  React.useEffect(() => {
    const business = businesses.find(b => b.id === selectedBusiness);
    if (business) {
      setFormData(business);
    }
  }, [selectedBusiness, businesses]);

  const handleSave = () => {
    setBusinesses(businesses.map(b => 
      b.id === selectedBusiness ? formData : b
    ));
    console.log('Business settings saved:', formData);
  };

  const handleAddBusiness = () => {
    const newBusiness: Business = {
      id: Date.now().toString(),
      name: '',
      abn: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      logo: '🏢',
      taxRate: 10,
      stripeKey: '',
      isActive: false
    };
    setBusinesses([...businesses, newBusiness]);
    setSelectedBusiness(newBusiness.id);
    setShowAddBusiness(false);
  };

  const handleDeleteBusiness = (id: string) => {
    if (businesses.length > 1) {
      setBusinesses(businesses.filter(b => b.id !== id));
      if (selectedBusiness === id) {
        setSelectedBusiness(businesses.find(b => b.id !== id)?.id || '');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Business Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your business information and payment settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Business List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Businesses
              </h3>
              <button
                onClick={() => setShowAddBusiness(true)}
                className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              {businesses.map((business) => (
                <div
                  key={business.id}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors duration-200 ${
                    selectedBusiness === business.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/30'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedBusiness(business.id)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{business.logo}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {business.name || 'Unnamed Business'}
                      </div>
                      {business.isActive && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Active
                        </div>
                      )}
                    </div>
                  </div>
                  {businesses.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBusiness(business.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Basic Information
              </h3>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ABN
                </label>
                <input
                  type="text"
                  value={formData.abn}
                  onChange={(e) => setFormData({ ...formData, abn: e.target.value })}
                  placeholder="12 345 678 901"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Logo & Branding */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Logo & Branding
            </h3>

            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                  {formData.logo}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Business logo (recommended: 200x200px)
                </p>
                <button className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </button>
              </div>
            </div>
          </div>

          {/* Tax & Financial Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Tax & Financial Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Default Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.taxRate}
                  onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Set as active business
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Payment Integration */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Stripe Integration
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stripe Secret Key
                </label>
                <input
                  type="password"
                  value={formData.stripeKey}
                  onChange={(e) => setFormData({ ...formData, stripeKey: e.target.value })}
                  placeholder="sk_test_..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Payment Processing
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                      Add your Stripe secret key to enable online payments for invoices. 
                      Your customers will be able to pay directly through secure payment links.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Business Modal */}
      {showAddBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add New Business
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Create a new business profile to manage multiple companies or brands.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddBusiness(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBusiness}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Create Business
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};