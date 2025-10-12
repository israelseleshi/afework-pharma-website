import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { 
  LayoutDashboard, 
  Edit3, 
  Image, 
  Users, 
  Settings, 
  LogOut, 
  FileText, 
  Briefcase,
  Phone,
  Info,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

// Import dashboard components
import { HeroEditor } from './dashboard/HeroEditor';
import { SolutionsEditor } from './dashboard/SolutionsEditor';
import { ProjectsEditor } from './dashboard/ProjectsEditor';
import { AboutEditor } from './dashboard/AboutEditor';
import { ContactEditor } from './dashboard/ContactEditor';
import { MediaEditor } from './dashboard/MediaEditor';
import { SettingsEditor } from './dashboard/SettingsEditor';

interface AdminUser {
  id: number;
  username: string;
}

export function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [contentExpanded, setContentExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');

    if (!token || !userData) {
      window.location.href = '/admin/login';
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      window.location.href = '/admin/login';
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Start with sidebar open on desktop, closed on mobile
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []); // Remove sidebarOpen dependency to prevent infinite loop

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'w-64' : 'w-16'
      } bg-white shadow-lg transition-all duration-500 ease-in-out flex flex-col fixed left-0 top-0 h-screen z-30`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className={`transition-all duration-500 ease-in-out ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'} overflow-hidden`}>
              <h1 className="text-lg font-bold text-gray-900 whitespace-nowrap">Afework CMS</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => setCurrentSection('dashboard')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              currentSection === 'dashboard' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
            <span className={`transition-all duration-500 ease-in-out ${sidebarOpen ? 'opacity-100 w-auto ml-3' : 'opacity-0 w-0 ml-0'} overflow-hidden whitespace-nowrap`}>
              Dashboard
            </span>
          </button>
          
          {/* Content Management Section */}
          <div>
            <button
              onClick={() => setContentExpanded(!contentExpanded)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              <div className={`transition-all duration-500 ease-in-out ${sidebarOpen ? 'opacity-100 w-auto ml-3' : 'opacity-0 w-0 ml-0'} overflow-hidden flex items-center justify-between flex-1`}>
                <span className="whitespace-nowrap">Content</span>
                {contentExpanded ? <ChevronDown className="w-4 h-4 ml-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
              </div>
            </button>
            
            {contentExpanded && sidebarOpen && (
              <div className="ml-4 space-y-1">
                <button
                  onClick={() => setCurrentSection('hero')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    currentSection === 'hero' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Hero Section</span>
                </button>
                
                <button
                  onClick={() => setCurrentSection('solutions')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    currentSection === 'solutions' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Solutions</span>
                </button>
                
                <button
                  onClick={() => setCurrentSection('projects')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    currentSection === 'projects' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Projects</span>
                </button>
                
                <button
                  onClick={() => setCurrentSection('about')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    currentSection === 'about' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </button>
                
                <button
                  onClick={() => setCurrentSection('contact')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    currentSection === 'contact' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setCurrentSection('media')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              currentSection === 'media' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
            }`}
          >
            <Image className="w-5 h-5 flex-shrink-0" />
            <span className={`transition-all duration-500 ease-in-out ${sidebarOpen ? 'opacity-100 w-auto ml-3' : 'opacity-0 w-0 ml-0'} overflow-hidden whitespace-nowrap`}>
              Media
            </span>
          </button>
          
          <button
            onClick={() => setCurrentSection('settings')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              currentSection === 'settings' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className={`transition-all duration-500 ease-in-out ${sidebarOpen ? 'opacity-100 w-auto ml-3' : 'opacity-0 w-0 ml-0'} overflow-hidden whitespace-nowrap`}>
              Settings
            </span>
          </button>
        </nav>
        
        {/* User Section */}
        <div className="p-4 border-t flex-shrink-0">
          {sidebarOpen ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-500 ease-in-out flex-1 flex flex-col h-full`}>
        {/* Fixed Top Header */}
        <header className="bg-white shadow-sm border-b p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              )}
              <h1 className="text-xl font-semibold text-gray-900">
                {currentSection === 'dashboard' && 'Dashboard Overview'}
                {currentSection === 'hero' && 'Hero Section'}
                {currentSection === 'solutions' && 'Solutions Management'}
                {currentSection === 'projects' && 'Projects Management'}
                {currentSection === 'about' && 'About Page'}
                {currentSection === 'contact' && 'Contact Information'}
                {currentSection === 'media' && 'Media Library'}
                {currentSection === 'settings' && 'Settings'}
              </h1>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user?.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>
        
        {/* Scrollable Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
          {currentSection === 'dashboard' && (
            <div>
              <p className="text-gray-600 mb-6">Manage your website content and media from this central location.</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Content Sections</p>
                        <p className="text-2xl font-bold text-gray-900">28</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="text-sm font-medium text-green-600">Online</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Updated</p>
                        <p className="text-sm font-medium text-gray-900">Just now</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Media Files</p>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {currentSection === 'hero' && <HeroEditor />}
          {currentSection === 'solutions' && <SolutionsEditor />}
          {currentSection === 'projects' && <ProjectsEditor />}
          {currentSection === 'about' && <AboutEditor />}
          {currentSection === 'contact' && <ContactEditor />}
          {currentSection === 'media' && <MediaEditor />}
          {currentSection === 'settings' && <SettingsEditor />}
          
          {currentSection !== 'dashboard' && 
           currentSection !== 'hero' && 
           currentSection !== 'solutions' && 
           currentSection !== 'projects' && 
           currentSection !== 'about' && 
           currentSection !== 'contact' && 
           currentSection !== 'media' && 
           currentSection !== 'settings' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Editor
              </h3>
              <p className="text-gray-600">This section is coming soon!</p>
            </div>
          )}
          </div>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
