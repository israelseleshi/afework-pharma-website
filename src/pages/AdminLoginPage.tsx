import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, User, Shield, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function AdminLoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes - you can implement actual authentication later
      if (formData.username === 'admin' && formData.password === 'admin123') {
        console.log('Login successful!');
        // Store auth data
        localStorage.setItem('admin_token', 'demo_token_' + Date.now());
        localStorage.setItem('admin_user', JSON.stringify({ username: 'admin' }));
        // Navigate to dashboard
        window.location.href = '/admin-dashboard';
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      username: 'admin',
      password: 'admin123'
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Elegant Medical Gradient Background with Wave */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, #e6fffa 0%, #ffffff 100%),
            radial-gradient(ellipse at top left, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(14, 165, 233, 0.05) 0%, transparent 50%)
          `
        }}
      >
        {/* Organic Wave Shape */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-full opacity-30" 
          viewBox="0 0 1200 800" 
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 0.1 }} />
              <stop offset="50%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.08 }} />
              <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>
          <path 
            d="M0,600 C300,500 600,650 900,550 C1050,500 1150,580 1200,550 L1200,800 L0,800 Z" 
            fill="url(#waveGradient)"
          />
        </svg>
      </div>

      {/* Subtle Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-teal-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-teal-200/25 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-blue-200/20 rounded-full animate-pulse delay-500"></div>
      </div>
      
      {/* Main Login Content */}
      <div className="relative flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-7xl flex justify-center"
        >
          {/* Glassmorphism Login Card with Border */}
          <div 
            className="relative backdrop-blur-xl bg-white/85 rounded-3xl border-2 border-green-200/30 p-12 sm:p-16"
            style={{ 
              width: '55%', 
              minWidth: '480px',
              maxWidth: '600px',
              boxShadow: `
                0 32px 64px -12px rgba(0, 0, 0, 0.08),
                0 0 0 1px rgba(34, 197, 94, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `
            }}
          >
            {/* Sophisticated Medical Header */}
            <div className="text-center mb-12">
              {/* Premium Company Branding */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-10"
              >
                <h1 className="text-4xl font-normal text-slate-800 mb-3 tracking-tight">
                  Afework Pharma
                </h1>
                <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-green-500 mx-auto mb-4"></div>
                <p className="text-base text-slate-600 font-light tracking-wide">
                  Medical Solutions Platform
                </p>
              </motion.div>
              
            </div>

            {/* Integrated Demo Access - Green Theme with Border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-green-50/60 backdrop-blur-sm border-2 border-green-200/60 rounded-2xl p-6 mb-10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-100/80 rounded-lg flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-1">Demo Environment</h4>
                    <p className="text-xs text-slate-500 font-light">
                      <span className="font-medium">admin</span> / <span className="font-medium">admin123</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={fillDemoCredentials}
                  className="text-xs text-green-600 hover:text-green-700 font-medium px-3 py-1.5 rounded-lg bg-green-50/50 hover:bg-green-100/50 transition-all duration-200 border border-green-200/30"
                >
                  Auto-fill
                </button>
              </div>
            </motion.div>

            {/* Sophisticated Login Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Username Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-4 tracking-wide">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors duration-300" />
                  </div>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-14 h-16 border-2 border-slate-200/80 focus:border-green-400 focus:ring-4 focus:ring-green-100/50 rounded-2xl bg-white/70 backdrop-blur-sm text-slate-700 font-normal placeholder:text-slate-400 placeholder:font-light transition-all duration-300 shadow-sm focus:shadow-lg"
                    placeholder="Enter your username"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-4 tracking-wide">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors duration-300" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-14 pr-12 h-16 border-2 border-slate-200/80 focus:border-green-400 focus:ring-4 focus:ring-green-100/50 rounded-2xl bg-white/70 backdrop-blur-sm text-slate-700 font-normal placeholder:text-slate-400 placeholder:font-light transition-all duration-300 shadow-sm focus:shadow-lg"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-green-500 transition-colors duration-300 p-1"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              {/* Green Medical Login Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 bg-green-600 hover:bg-green-700 text-white font-medium rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 mt-10 text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: isLoading 
                      ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' 
                      : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    boxShadow: '0 10px 25px -5px rgba(5, 150, 105, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-white font-medium">Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-white font-medium">Sign In</span>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
            
          </div>
        </motion.div>
      </div>

      {/* Sophisticated Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="relative px-6 py-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <p className="text-sm text-slate-400 font-light tracking-wide">
            © {new Date().getFullYear()} Afework Pharma
          </p>
          <p className="text-xs text-slate-300 font-light mt-2">
            Trusted Healthcare Technology Solutions
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
