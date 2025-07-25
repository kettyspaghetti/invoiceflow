import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { TopBar } from './components/Layout/TopBar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Invoices } from './components/Invoices/Invoices';
import { CreateInvoice } from './components/Invoices/CreateInvoice';
import { Clients } from './components/Clients/Clients';
import { BusinessSettings } from './components/Settings/BusinessSettings';
import { ThemeProvider } from './contexts/ThemeContext';

export type Page = 'dashboard' | 'invoices' | 'create-invoice' | 'clients' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'invoices':
        return <Invoices onNavigate={setCurrentPage} />;
      case 'create-invoice':
        return <CreateInvoice onNavigate={setCurrentPage} />;
      case 'clients':
        return <Clients onNavigate={setCurrentPage} />;
      case 'settings':
        return <BusinessSettings />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="container mx-auto px-6 py-8">
              {renderPage()}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;