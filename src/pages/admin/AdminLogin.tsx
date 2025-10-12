import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, User, LogIn, TestTube, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from '../../components/Router';

export function AdminLogin() {
  const { navigateTo } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  // Check for account lockout on component mount
  useEffect(() => {
    const savedAttempts = localStorage.getItem('login_attempts');
    const lockoutEnd = localStorage.getItem('lockout_end');
    
    if (savedAttempts) {
      setAttempts(parseInt(savedAttempts));
    }
    
    if (lockoutEnd) {
      const now = Date.now();
      const lockEnd = parseInt(lockoutEnd);
      
      if (now < lockEnd) {
        setIsLocked(true);
        setLockoutTime(Math.ceil((lockEnd - now) / 1000));
        
        // Start countdown timer
        const timer = setInterval(() => {
          const remaining = Math.ceil((lockEnd - Date.now()) / 1000);
          if (remaining <= 0) {
            setIsLocked(false);
            setLockoutTime(0);
            setAttempts(0);
            localStorage.removeItem('login_attempts');
            localStorage.removeItem('lockout_end');
            clearInterval(timer);
          } else {
            setLockoutTime(remaining);
          }
        }, 1000);
        
        return () => clearInterval(timer);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');
    
    // Check if account is locked
    if (isLocked) {
      setError(`Account temporarily locked. Please wait ${Math.floor(lockoutTime / 60)}:${(lockoutTime % 60).toString().padStart(2, '0')} before trying again.`);
      return;
    }
    
    // Basic validation
    if (!formData.username.trim()) {
      setError('Please enter your username or email.');
      return;
    }
    
    if (!formData.password.trim()) {
      setError('Please enter your password.');
      return;
    }
    
    if (formData.password.length < 3) {
      setError('Password must be at least 3 characters long.');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password,
          rememberMe
        })
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        if (response.status === 404) {
          setError('Backend server is not running. Please contact your system administrator.');
          return;
        }
        if (response.status === 429) {
          setError('Too many login attempts. Please wait a few minutes before trying again.');
          return;
        }
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Check if response has content before parsing JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return JSON response');
      }

      const data = await response.json();

      if (data.success) {
        // Reset failed attempts
        setAttempts(0);
        localStorage.removeItem('login_attempts');
        localStorage.removeItem('lockout_end');
        
        // Show success message
        setSuccess('Login successful! Redirecting to dashboard...');
        
        // Store authentication data
        const tokenExpiry = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 days or 1 day
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        localStorage.setItem('token_expiry', (Date.now() + tokenExpiry).toString());
        
        // Redirect after a short delay to show success message
        setTimeout(() => {
          navigateTo('admin-dashboard');
        }, 1500);
      } else {
        // Handle failed login
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem('login_attempts', newAttempts.toString());
        
        // Lock account after 5 failed attempts
        if (newAttempts >= 5) {
          const lockoutEnd = Date.now() + (15 * 60 * 1000); // 15 minutes
          localStorage.setItem('lockout_end', lockoutEnd.toString());
          setIsLocked(true);
          setLockoutTime(15 * 60);
          setError('Too many failed attempts. Account locked for 15 minutes.');
        } else {
          setError(data.message || `Invalid credentials. ${5 - newAttempts} attempts remaining.`);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Cannot connect to server. Please check your internet connection or contact support.');
      } else if (error.message.includes('JSON')) {
        setError('Server error: Invalid response format. Please try again or contact support.');
      } else {
        setError('Login failed. Please check your internet connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear error when user starts typing
    if (error) setError('');
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-green-50/20 to-slate-100 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 text-gray-900 font-sans">
      {/* Login Card Container */}
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-8 md:p-10 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-gray-100">
        
        {/* Header / Logo Area */}
        <div className="text-center mb-8">
          {/* Icon/Logo - Pharma/Science Icon: Test Tube/Flask */}
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
            <TestTube className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Afework Pharma</h1>
          <p className="text-sm text-gray-600">Content Management System</p>
          <div className="w-12 h-0.5 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-800 font-medium">Login Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-800 font-medium">Success!</p>
              <p className="text-sm text-green-700 mt-1">{success}</p>
            </div>
          </div>
        )}
        
        {isLocked && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start space-x-3 animate-in slide-in-from-top-2 duration-300">
            <Lock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-orange-800 font-medium">Account Temporarily Locked</p>
              <p className="text-sm text-orange-700 mt-1">Please wait {formatTime(lockoutTime)} before trying again.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username/Email Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username or Email
            </label>
            <div className="relative flex items-center border border-gray-300 bg-white rounded-lg overflow-hidden focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 transition-all duration-200">
              <span className="p-3 border-r border-gray-200 text-gray-500">
                <User className="w-5 h-5" />
              </span>
              <input 
                type="text" 
                id="username" 
                name="username" 
                placeholder="Enter username or email"
                value={formData.username}
                onChange={handleChange}
                disabled={loading || isLocked}
                className="block w-full p-3 bg-transparent text-gray-800 placeholder-gray-400 border-none focus:ring-0 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                required
                autoComplete="username"
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative flex items-center border border-gray-300 bg-white rounded-lg overflow-hidden focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 transition-all duration-200">
              <span className="p-3 border-r border-gray-200 text-gray-500">
                <Lock className="w-5 h-5" />
              </span>
              <input 
                type={showPassword ? 'text' : 'password'}
                id="password" 
                name="password" 
                placeholder="Enter your secure password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading || isLocked}
                className="block w-full p-3 bg-transparent text-gray-800 placeholder-gray-400 border-none focus:ring-0 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                required
                autoComplete="current-password"
                aria-describedby={error ? "login-error" : undefined}
                minLength={3}
              />
              {/* Show/Hide Password Toggle Button */}
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading || isLocked}
                className="absolute right-0 top-0 h-full p-3 text-gray-500 hover:text-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {attempts > 0 && attempts < 5 && (
              <p className="text-xs text-orange-600 mt-1">
                {5 - attempts} attempts remaining before account lockout
              </p>
            )}
          </div>

          {/* Remember Me / Forgot Password Links */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading || isLocked}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 select-none cursor-pointer">
                Keep me signed in for 30 days
              </label>
            </div>

            <div className="text-sm">
              <button 
                type="button"
                onClick={() => setError('Please contact your system administrator to reset your password.')}
                className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200 underline-offset-2 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading || isLocked || !formData.username.trim() || !formData.password.trim()}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(34,197,94,0.4)] focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  <span>Signing in...</span>
                </>
              ) : isLocked ? (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  <span>Account Locked</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer / Dev Mode Info */}
        <div className="mt-8 text-center">
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-700 font-medium mb-1">Development Mode</p>
              <p className="text-xs text-blue-600">
                Default credentials: <span className="font-mono bg-blue-100 px-1.5 py-0.5 rounded">admin</span> / <span className="font-mono bg-blue-100 px-1.5 py-0.5 rounded">adm@123</span>
              </p>
            </div>
            <p className="text-xs text-gray-500">&copy; 2024 Afework Pharma. All rights reserved.</p>
            <p className="text-xs text-gray-400 mt-1">Secure Content Management System</p>
          </div>
        </div>
      </div>
    </div>
  );
}
