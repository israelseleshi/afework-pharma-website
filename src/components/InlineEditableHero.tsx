import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useContent } from '../hooks/useContent';
import { getApiEndpoint, API_CONFIG } from '../config/api';
import { 
  Edit3, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Settings,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

// Typewriter Animation Component
const TypewriterText = ({ text, speed = 100, delay = 0 }: { text: string; speed?: number; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (isStarted && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, isStarted]);

  return (
    <span className="relative">
      {displayText}
    </span>
  );
};

// Counter Animation Component
const AnimatedCounter = ({ end, duration = 1200, delay = 0 }: { end: number; duration?: number; delay?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible && count === 0) {
      const timer = setTimeout(() => {
        let startTime: number;
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const currentCount = Math.floor(progress * end);
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, end, duration, delay, count]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return <span>{count}</span>;
};

interface InlineEditableHeroProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export function InlineEditableHero({ isEditMode, onToggleEditMode }: InlineEditableHeroProps) {
  const { getTextContent, getJsonContent, refreshContent } = useContent();
  
  // Get dynamic content
  const headline = getTextContent('hero_headline', 'Advanced Medical Solutions for a Healthier Ethiopia');
  const subheadline = getTextContent('hero_subheadline', 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement.');
  const stats = getJsonContent('hero_stats', [
    { number: 45, suffix: '+', label: 'IVD Units Deployed' },
    { number: 36, suffix: '+', label: 'Healthcare Facilities' },
    { number: 5, suffix: '+', label: 'Years Experience' }
  ]);

  // Edit state
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for admin token
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    setToken(savedToken);
  }, []);

  // Show message temporarily
  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // Start editing a field
  const startEditing = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValues({ [field]: currentValue });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingField(null);
    setEditValues({});
  };

  // Save changes
  const saveChanges = async (field: string) => {
    if (!token) {
      showMessage('error', 'Please login first');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(getApiEndpoint('CMS'), {
        method: 'PUT',
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content_key: field,
          content_value: editValues[field],
          change_reason: 'Updated via inline editor'
        })
      });

      const result = await response.json();
      if (result.success) {
        showMessage('success', 'Content updated successfully!');
        setEditingField(null);
        setEditValues({});
        await refreshContent(); // Refresh content from API
      } else {
        showMessage('error', result.error || 'Failed to update content');
      }
    } catch (error) {
      showMessage('error', 'Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  // Edit button component
  const EditButton = ({ field, currentValue, className = "" }: { field: string; currentValue: string; className?: string }) => {
    if (!isEditMode) return null;

    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => startEditing(field, currentValue)}
        className={`absolute bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 z-10 ${className}`}
      >
        <Edit3 className="w-4 h-4" />
      </motion.button>
    );
  };

  // Inline editor component
  const InlineEditor = ({ field, isTextarea = false }: { field: string; isTextarea?: boolean }) => {
    if (editingField !== field) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-lg p-4 z-20 border-2 border-blue-500"
      >
        <div className="space-y-3">
          {isTextarea ? (
            <Textarea
              value={editValues[field] || ''}
              onChange={(e) => setEditValues({ ...editValues, [field]: e.target.value })}
              className="w-full min-h-[100px] resize-none"
              placeholder="Enter content..."
              autoFocus
            />
          ) : (
            <Input
              value={editValues[field] || ''}
              onChange={(e) => setEditValues({ ...editValues, [field]: e.target.value })}
              className="w-full"
              placeholder="Enter content..."
              autoFocus
            />
          )}
          
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={cancelEditing}
              disabled={saving}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => saveChanges(field)}
              disabled={saving || !editValues[field]?.trim()}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-1" />
              )}
              Save
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      {/* Edit Mode Toggle */}
      {token && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-4 right-4 z-50"
        >
          <Button
            onClick={onToggleEditMode}
            variant={isEditMode ? "default" : "outline"}
            size="sm"
            className="shadow-lg"
          >
            {isEditMode ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Exit Edit
              </>
            ) : (
              <>
                <Settings className="w-4 h-4 mr-2" />
                Edit Mode
              </>
            )}
          </Button>
        </motion.div>
      )}

      {/* Success/Error Messages */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-16 right-4 z-50 p-4 rounded-lg shadow-lg ${
              message.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center">
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              {message.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20"
        >
          {/* Left Column - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Headline */}
            <div className="relative">
              <EditButton 
                field="hero_headline" 
                currentValue={headline}
                className="top-2 right-2"
              />
              <InlineEditor field="hero_headline" />
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                variants={itemVariants}
              >
                <TypewriterText text={headline} speed={50} />
              </motion.h1>
            </div>

            {/* Subheadline */}
            <div className="relative">
              <EditButton 
                field="hero_subheadline" 
                currentValue={subheadline}
                className="top-2 right-2"
              />
              <InlineEditor field="hero_subheadline" isTextarea />
              
              <motion.p 
                className="text-xl text-gray-600 leading-relaxed max-w-2xl"
                variants={itemVariants}
              >
                {subheadline}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Our Solutions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Contact Us Today
              </motion.button>
            </motion.div>

            {/* Statistics */}
            <div className="relative">
              <EditButton 
                field="hero_stats" 
                currentValue={JSON.stringify(stats, null, 2)}
                className="top-2 right-2"
              />
              <InlineEditor field="hero_stats" isTextarea />
              
              <motion.div 
                className="grid grid-cols-3 gap-8 pt-8"
                variants={itemVariants}
              >
                {stats.map((stat: any, index: number) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                      <AnimatedCounter end={stat.number} delay={index * 200} />
                      {stat.suffix}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10, x: 100 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwaG9zcGl0YWx8ZW58MXx8fHwxNzU5ODI5MDM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Advanced Medical Equipment"
                className="relative z-10 rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg"
              >
                <div className="text-2xl">🏥</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg"
              >
                <div className="text-2xl">⚕️</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
