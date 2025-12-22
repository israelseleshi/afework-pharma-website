import React, { useState, useEffect } from "react";
import { InlineEditableHero } from "../components/InlineEditableHero";
import { ValueProposition } from "../components/ValueProposition";
import { SolutionsOverview } from "../components/SolutionsOverview";
import { FeaturedProjects } from "../components/FeaturedProjects";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogIn, 
  LogOut, 
  Eye, 
  EyeOff,
  Settings,
  User,
  Shield
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface AdminUser {
  username: string;
  email: string;
}

export function EditableHomePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Check for existing session
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    const savedUser = localStorage.getItem('admin_user');
    
    if (savedToken && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/cms-api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          username: loginForm.username,
          password: loginForm.password
        })
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('admin_token', result.token);
        localStorage.setItem('admin_user', JSON.stringify(result.user));
        
        setIsAuthenticated(true);
        setUser(result.user);
        setShowLogin(false);
        setLoginForm({ username: '', password: '' });
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
    setUser(null);
    setIsEditMode(false);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Admin Controls */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        {!isAuthenticated ? (
          <Button
            onClick={() => setShowLogin(true)}
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          >
            <Shield className="w-4 h-4 mr-2" />
            Admin
          </Button>
        ) : (
          <div className="flex gap-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">
                {user?.username}
              </span>
            </div>
            
            <Button
              onClick={() => setIsEditMode(!isEditMode)}
              variant={isEditMode ? "default" : "outline"}
              size="sm"
              className="bg-white/90 backdrop-blur-sm shadow-lg"
            >
              {isEditMode ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  View Mode
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Mode
                </>
              )}
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm shadow-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-emerald-700 flex items-center justify-center gap-2">
                    <Shield className="w-6 h-6" />
                    Admin Login
                  </CardTitle>
                  <p className="text-gray-600">Access content editing</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Username"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                    </div>
                    
                    {loginError && (
                      <div className="text-red-600 text-sm text-center">
                        {loginError}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowLogin(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1"
                      >
                        {loading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2" />
                            Login
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="text-blue-700 font-medium">Demo Credentials:</p>
                    <p className="text-blue-600">Username: admin</p>
                    <p className="text-blue-600">Password: AfeworkAdmin2024!</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Mode Indicator */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-4 right-4 z-40 pointer-events-none"
          >
            <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg text-center font-medium">
              🎨 Edit Mode Active - Click edit buttons to modify content
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main>
        <InlineEditableHero 
          isEditMode={isEditMode && isAuthenticated} 
          onToggleEditMode={() => setIsEditMode(!isEditMode)}
        />
        <ValueProposition />
        <SolutionsOverview />
        <FeaturedProjects />
      </main>
    </div>
  );
}
