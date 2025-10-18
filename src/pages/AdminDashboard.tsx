import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, Briefcase, FolderOpen, Info, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { HomePageManagement } from '../components/admin/HomePageManagement';
import { SolutionsPageManagement } from '../components/admin/SolutionsPageManagement';
import { ProjectsPageManagement } from '../components/admin/ProjectsPageManagement';
import { AboutPageManagement } from '../components/admin/AboutPageManagement';
import { ContactPageManagement } from '../components/admin/ContactPageManagement';

type TabType = 'home' | 'solutions' | 'projects' | 'about' | 'contact';

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin-login';
  };

  const sidebarItems = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'solutions' as TabType, label: 'Solutions', icon: Briefcase },
    { id: 'projects' as TabType, label: 'Projects', icon: FolderOpen },
    { id: 'about' as TabType, label: 'About', icon: Info },
    { id: 'contact' as TabType, label: 'Contact', icon: Phone },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePageManagement />;
      case 'solutions':
        return <SolutionsPageManagement />;
      case 'projects':
        return <ProjectsPageManagement />;
      case 'about':
        return <AboutPageManagement />;
      case 'contact':
        return <ContactPageManagement />;
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 text-center"
          >
            <h2 className="text-3xl font-light text-gray-800 mb-4">
              Page Management
            </h2>
            <p className="text-gray-600 text-lg">Coming Soon...</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-200/30 px-6 py-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-600 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AP</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-gray-900">Afework Pharma</h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-green-200 text-green-600 hover:bg-green-50 px-6 py-3 text-base font-medium"
            >
              Logout
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="flex flex-1 overflow-hidden">
        <motion.aside
          animate={{ width: sidebarOpen ? 256 : 80 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="sticky top-[85px] bg-white/90 backdrop-blur-md border-r border-green-200/30 flex flex-col z-40 h-[calc(100vh-85px)] overflow-y-auto"
        >
          <div className="p-6 border-b border-green-200/30">
            <div className="flex items-center justify-between">
              {sidebarOpen ? (
                <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
              ) : (
                <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xs">AP</span>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-4' : 'justify-center px-2'} py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-green-100 text-green-700 border-2 border-green-200/60'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-600 border-2 border-transparent'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-green-200/30">
            <div className="text-xs text-gray-500 text-center">
              {sidebarOpen ? 'Admin Panel v1.0' : 'v1.0'}
            </div>
          </div>
        </motion.aside>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-green-50/30 via-white/50 to-emerald-50/30">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
