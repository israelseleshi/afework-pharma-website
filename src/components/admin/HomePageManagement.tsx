import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { useCMSContent } from '../../hooks/useCMSContent';

export function HomePageManagement() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  
  const { content, loading, error, updateSection, getFormattedContent } = useCMSContent();
  const [formData, setFormData] = useState({
    // Hero Section
    heroTitle: 'Advanced Medical Solutions for a Healthier Ethiopia',
    heroSubtitle: 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement.',
    heroStats: [
      { number: '45', suffix: '+', label: 'IVD Units Deployed' },
      { number: '36', suffix: '+', label: 'Healthcare Facilities' },
      { number: '5', suffix: '+', label: 'Years Experience' }
    ],
    
    // Value Proposition Section
    valuePropositionTitle: 'Why Choose Afework Pharma?',
    valuePropositionSubtitle: 'We are more than a supplier; we are your strategic partner in advancing healthcare in Ethiopia. Experience the difference of working with true experts.',
    valuePropositions: [
      {
        icon: 'Microscope',
        title: 'Cutting-Edge Products',
        description: 'Sourcing certified, state-of-the-art technology from global leaders in medical equipment manufacturing.'
      },
      {
        icon: 'Users',
        title: 'End-to-End Support',
        description: 'From installation and training to 24/7 technical support, we ensure your success at every step.'
      },
      {
        icon: 'MapPin',
        title: 'Nationwide Reach',
        description: 'Proven capability in executing complex, multi-site projects across Ethiopia with local expertise.'
      },
      {
        icon: 'Shield',
        title: 'Regulatory Compliance',
        description: 'Full regulatory and logistics management ensuring compliance with international and local standards.'
      }
    ],
    
    // Solutions Overview Section
    solutionsTitle: 'Comprehensive Medical Solutions',
    solutionsSubtitle: 'From diagnostic equipment to complete hospital setups, we provide end-to-end medical technology solutions tailored to Ethiopian healthcare needs.',
    solutions: [
      {
        icon: 'Beaker',
        title: 'Diagnostic & Laboratory Solutions',
        description: 'Complete IVD systems including chemistry analyzers, hematology equipment, and laboratory infrastructure.',
        image: '/diagnostic-&-laboratory-solutions.jpg',
        products: ['Chemistry Analyzers', 'Hematology Systems', 'Microscopes', 'Lab Furniture']
      },
      {
        icon: 'Scan',
        title: 'Diagnostic Imaging & Radiology',
        description: 'Advanced imaging solutions from digital X-ray to MRI systems with full installation support.',
        image: '/diagnostic-imaging-&-radiology.jpg',
        products: ['Digital X-Ray', 'Ultrasound', 'CT Scanners', 'MRI Systems']
      },
      {
        icon: 'Heart',
        title: 'Critical Care & Operation Theatre',
        description: 'Life-saving equipment for ICUs and operating rooms including ventilators and surgical instruments.',
        image: '/critical-care-&-operation-theatre.jpg',
        products: ['Ventilators', 'Patient Monitors', 'Surgical Tables', 'Anesthesia Machines']
      },
      {
        icon: 'Bed',
        title: 'Hospital Furniture & Patient Care',
        description: 'Ergonomic hospital furniture and patient care equipment designed for comfort and functionality.',
        image: '/hospital-furniture-&-patient-care.jpg',
        products: ['Hospital Beds', 'Patient Chairs', 'Medical Trolleys', 'Storage Solutions']
      },
      {
        icon: 'Pill',
        title: 'Medical Consumables & Reagents',
        description: 'Quality reagents and medical consumables ensuring reliable test results and patient safety.',
        image: 'https://images.unsplash.com/photo-1758101512269-660feabf64fd',
        products: ['Lab Reagents', 'Test Kits', 'Disposables', 'Quality Controls']
      }
    ],
    
    // Featured Projects Section
    featuredProjectsTitle: 'Proven Success in Critical Projects',
    featuredProjectsSubtitle: 'Our track record speaks for itself. From emergency deployments to comprehensive hospital modernizations, we deliver excellence when it matters most.',
    featuredProjects: [
      {
        title: 'CDC-Tigray Regional Health System Strengthening Project',
        client: 'Tigray Regional Health Bureau',
        sponsor: 'CDC Ethiopia',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc',
        description: 'Complete turnkey project providing diagnostic equipment to restore critical healthcare services across post-conflict regions.',
        stats: [
          { icon: 'MapPin', label: '36 Health Facilities', value: 'Across Tigray' },
          { icon: 'Users', label: '45 IVD Units', value: 'Deployed' },
          { icon: 'Calendar', label: '40 Days', value: 'Timeline' },
          { icon: 'Award', label: '100+', value: 'Staff Trained' }
        ],
        achievements: [
          '45 IVD Units Successfully Deployed',
          'Comprehensive Staff Training Program',
          'Letter of Appreciation Received',
          '24/7 Technical Support Established'
        ]
      },
      {
        title: 'FDRE Defense Referral Hospital Modernization',
        client: 'Federal Defense Hospital',
        sponsor: 'Ministry of Defense',
        year: '2023',
        image: '/fdre-defense-referral-hospital.jpg',
        description: 'Comprehensive medical equipment upgrade including laboratory, imaging, and critical care solutions for Ethiopia\'s premier defense hospital.',
        stats: [
          { icon: 'MapPin', label: 'Major Hospital', value: 'Addis Ababa' },
          { icon: 'Users', label: 'Multiple Depts', value: 'Upgraded' },
          { icon: 'Calendar', label: '6 Months', value: 'Project Duration' },
          { icon: 'Award', label: 'Advanced', value: 'Technology' }
        ],
        achievements: [
          'Complete Laboratory Modernization',
          'Advanced Imaging Solutions',
          'Ongoing Maintenance Contract'
        ]
      }
    ]
  });

  // Load data from database when content changes
  useEffect(() => {
    if (content.length > 0) {
      const dbContent = getFormattedContent();
      setFormData(dbContent);
    }
  }, [content, getFormattedContent]);

  const handleEdit = (field: string) => setEditingField(field);
  
  const handleSave = async (field: string) => {
    setSaving(true);
    setSaveStatus({ type: null, message: '' });
    
    try {
      let result;
      
      // Determine which section to update based on the field
      if (field.startsWith('hero')) {
        result = await updateSection(
          'hero',
          formData.heroTitle,
          formData.heroSubtitle,
          'Hero section with statistics and main messaging',
          { heroStats: formData.heroStats }
        );
      } else if (field.startsWith('valueProposition')) {
        result = await updateSection(
          'value_proposition',
          formData.valuePropositionTitle,
          formData.valuePropositionSubtitle,
          'Value proposition cards highlighting key differentiators',
          { valuePropositions: formData.valuePropositions }
        );
      } else if (field.startsWith('solutions')) {
        result = await updateSection(
          'solutions_overview',
          formData.solutionsTitle,
          formData.solutionsSubtitle,
          'Overview of all solution categories with detailed information',
          { solutions: formData.solutions }
        );
      } else if (field.startsWith('featuredProjects')) {
        result = await updateSection(
          'featured_projects',
          formData.featuredProjectsTitle,
          formData.featuredProjectsSubtitle,
          'Showcase of major successful projects with detailed information',
          { featuredProjects: formData.featuredProjects }
        );
      }
      
      if (result?.success) {
        setSaveStatus({ type: 'success', message: 'Content saved successfully!' });
        setEditingField(null);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSaveStatus({ type: null, message: '' });
        }, 3000);
      } else {
        setSaveStatus({ type: 'error', message: result?.error || 'Failed to save content' });
      }
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Network error occurred' });
    } finally {
      setSaving(false);
    }
  };
  
  const handleCancel = () => {
    setEditingField(null);
    setSaveStatus({ type: null, message: '' });
    // Reload data from database to reset any unsaved changes
    if (content.length > 0) {
      const dbContent = getFormattedContent();
      setFormData(dbContent);
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      heroStats: prev.heroStats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const handleValuePropositionChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      valuePropositions: prev.valuePropositions.map((vp, i) => 
        i === index ? { ...vp, [field]: value } : vp
      )
    }));
  };

  const handleSolutionChange = (index: number, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.map((solution, i) => 
        i === index ? { ...solution, [field]: value } : solution
      )
    }));
  };

  const handleProjectChange = (index: number, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      featuredProjects: prev.featuredProjects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  // Show loading state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading content from database...</p>
        </div>
      </motion.div>
    );
  }

  // Show error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">CMS Backend Not Available</h3>
          <p className="text-gray-600 mb-4">
            The content management system is currently using fallback data. 
            {error?.includes('Backend server not running') ? 
              ' Start the Node.js backend server to enable live editing.' : 
              ' Please check your database connection.'}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <p className="text-sm text-blue-800 font-medium mb-2">To enable CMS functionality:</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-blue-700 font-medium">Option 1 - Start PHP server only:</p>
                <ol className="text-sm text-blue-700 space-y-1 ml-4">
                  <li>1. Open new terminal in project directory</li>
                  <li>2. Run: <code className="bg-blue-100 px-2 py-1 rounded font-mono">npm run php-server</code></li>
                  <li>3. Refresh this page</li>
                </ol>
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Option 2 - Restart with both servers:</p>
                <ol className="text-sm text-blue-700 space-y-1 ml-4">
                  <li>1. Stop current dev server (Ctrl+C)</li>
                  <li>2. Run: <code className="bg-blue-100 px-2 py-1 rounded font-mono">npm run dev:php</code></li>
                </ol>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-xs text-yellow-800">
                  <strong>Note:</strong> Make sure PHP is installed on your system. 
                  If you don't have PHP, you can install it from <a href="https://www.php.net/downloads" target="_blank" className="underline">php.net</a>
                  or use XAMPP/WAMP.
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Current error: {error}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-4">Home Page Management</h1>
          <p className="text-lg text-gray-600 font-light">Edit and manage your homepage content sections</p>
          
          {/* Save Status */}
          {saveStatus.type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3 rounded-lg flex items-center justify-center space-x-2 ${
                saveStatus.type === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}
            >
              {saveStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{saveStatus.message}</span>
            </motion.div>
          )}
        </div>

        {/* Hero Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Hero Section</h2>
          </div>

          <div className="space-y-6">
            {/* Hero Title */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                {editingField !== 'heroTitle' ? (
                  <button onClick={() => handleEdit('heroTitle')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleSave('heroTitle')} 
                      disabled={saving}
                      className="p-3 text-green-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? <Loader2 className="w-8 h-8 animate-spin" /> : <Save className="w-8 h-8" />}
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'heroTitle' ? (
                <Input
                  value={formData.heroTitle}
                  onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800 font-medium"
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 font-medium min-h-[56px] flex items-center">
                  {formData.heroTitle}
                </div>
              )}
            </div>

            {/* Hero Subtitle */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                {editingField !== 'heroSubtitle' ? (
                  <button onClick={() => handleEdit('heroSubtitle')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('heroSubtitle')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'heroSubtitle' ? (
                <textarea
                  value={formData.heroSubtitle}
                  onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                  className="w-full h-28 p-4 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl resize-none bg-white text-gray-800"
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 min-h-[112px] flex items-center">
                  {formData.heroSubtitle}
                </div>
              )}
            </div>

            {/* Hero Stats */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Hero Statistics</label>
                {editingField !== 'heroStats' ? (
                  <button onClick={() => handleEdit('heroStats')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('heroStats')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 min-h-[120px]">
                {editingField === 'heroStats' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {formData.heroStats.map((stat, index) => (
                      <div key={index} className="space-y-2">
                        <Input
                          placeholder="Number"
                          value={stat.number}
                          onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                          className="h-8 text-sm border-green-200/60 focus:border-green-400"
                        />
                        <Input
                          placeholder="Suffix"
                          value={stat.suffix}
                          onChange={(e) => handleStatChange(index, 'suffix', e.target.value)}
                          className="h-8 text-sm border-green-200/60 focus:border-green-400"
                        />
                        <Input
                          placeholder="Label"
                          value={stat.label}
                          onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                          className="h-8 text-sm border-green-200/60 focus:border-green-400"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {formData.heroStats.map((stat, index) => (
                      <div key={index}>
                        <div className="text-2xl font-bold text-green-600">{stat.number}{stat.suffix}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Value Proposition Section</h2>
          </div>

          <div className="space-y-6">
            {/* Value Proposition Title */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Section Title</label>
                {editingField !== 'valuePropositionTitle' ? (
                  <button onClick={() => handleEdit('valuePropositionTitle')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('valuePropositionTitle')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'valuePropositionTitle' ? (
                <Input
                  value={formData.valuePropositionTitle}
                  onChange={(e) => handleInputChange('valuePropositionTitle', e.target.value)}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800 font-medium"
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 font-medium min-h-[56px] flex items-center">
                  {formData.valuePropositionTitle}
                </div>
              )}
            </div>

            {/* Value Propositions Cards */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Value Proposition Cards</label>
                {editingField !== 'valuePropositions' ? (
                  <button onClick={() => handleEdit('valuePropositions')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('valuePropositions')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 min-h-[200px]">
                {editingField === 'valuePropositions' ? (
                  <div className="grid grid-cols-2 gap-4">
                    {formData.valuePropositions.map((vp, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
                        <Input
                          placeholder="Title"
                          value={vp.title}
                          onChange={(e) => handleValuePropositionChange(index, 'title', e.target.value)}
                          className="h-10 border-green-200/60 focus:border-green-400 font-medium"
                        />
                        <textarea
                          placeholder="Description"
                          value={vp.description}
                          onChange={(e) => handleValuePropositionChange(index, 'description', e.target.value)}
                          className="w-full h-20 p-3 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-sm"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {formData.valuePropositions.map((vp, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-2">{vp.title}</h3>
                        <p className="text-gray-600 text-sm">{vp.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Solutions Overview Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Solutions Overview Section</h2>
          </div>

          <div className="space-y-6">
            {/* Solutions Title */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Section Title</label>
                {editingField !== 'solutionsTitle' ? (
                  <button onClick={() => handleEdit('solutionsTitle')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('solutionsTitle')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'solutionsTitle' ? (
                <Input
                  value={formData.solutionsTitle}
                  onChange={(e) => handleInputChange('solutionsTitle', e.target.value)}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800 font-medium"
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 font-medium min-h-[56px] flex items-center">
                  {formData.solutionsTitle}
                </div>
              )}
            </div>

            {/* Solutions Cards */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Solution Cards (5 Cards)</label>
                {editingField !== 'solutions' ? (
                  <button onClick={() => handleEdit('solutions')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('solutions')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 min-h-[300px]">
                {editingField === 'solutions' ? (
                  <div className="space-y-4">
                    {formData.solutions.map((solution, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
                        <Input
                          placeholder="Solution Title"
                          value={solution.title}
                          onChange={(e) => handleSolutionChange(index, 'title', e.target.value)}
                          className="h-10 border-green-200/60 focus:border-green-400 font-medium"
                        />
                        <textarea
                          placeholder="Description"
                          value={solution.description}
                          onChange={(e) => handleSolutionChange(index, 'description', e.target.value)}
                          className="w-full h-16 p-3 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-sm"
                        />
                        <Input
                          placeholder="Image URL"
                          value={solution.image}
                          onChange={(e) => handleSolutionChange(index, 'image', e.target.value)}
                          className="h-8 border-green-200/60 focus:border-green-400 text-sm"
                        />
                        <Input
                          placeholder="Products (comma-separated)"
                          value={solution.products.join(', ')}
                          onChange={(e) => handleSolutionChange(index, 'products', e.target.value.split(', '))}
                          className="h-8 border-green-200/60 focus:border-green-400 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.solutions.map((solution, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-2 text-sm">{solution.title}</h3>
                        <p className="text-gray-600 text-xs mb-2">{solution.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {solution.products.map((product, pIndex) => (
                            <span key={pIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Featured Projects Section</h2>
          </div>

          <div className="space-y-6">
            {/* Projects Title */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Section Title</label>
                {editingField !== 'featuredProjectsTitle' ? (
                  <button onClick={() => handleEdit('featuredProjectsTitle')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('featuredProjectsTitle')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'featuredProjectsTitle' ? (
                <Input
                  value={formData.featuredProjectsTitle}
                  onChange={(e) => handleInputChange('featuredProjectsTitle', e.target.value)}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800 font-medium"
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 font-medium min-h-[56px] flex items-center">
                  {formData.featuredProjectsTitle}
                </div>
              )}
            </div>

            {/* Featured Projects */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Featured Projects (2 Projects)</label>
                {editingField !== 'featuredProjects' ? (
                  <button onClick={() => handleEdit('featuredProjects')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('featuredProjects')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 min-h-[400px]">
                {editingField === 'featuredProjects' ? (
                  <div className="space-y-6">
                    {formData.featuredProjects.map((project, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
                        <Input
                          placeholder="Project Title"
                          value={project.title}
                          onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                          className="h-10 border-green-200/60 focus:border-green-400 font-medium"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            placeholder="Client"
                            value={project.client}
                            onChange={(e) => handleProjectChange(index, 'client', e.target.value)}
                            className="h-8 border-green-200/60 focus:border-green-400 text-sm"
                          />
                          <Input
                            placeholder="Sponsor"
                            value={project.sponsor}
                            onChange={(e) => handleProjectChange(index, 'sponsor', e.target.value)}
                            className="h-8 border-green-200/60 focus:border-green-400 text-sm"
                          />
                          <Input
                            placeholder="Year"
                            value={project.year}
                            onChange={(e) => handleProjectChange(index, 'year', e.target.value)}
                            className="h-8 border-green-200/60 focus:border-green-400 text-sm"
                          />
                        </div>
                        <textarea
                          placeholder="Project Description"
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                          className="w-full h-16 p-3 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-sm"
                        />
                        <Input
                          placeholder="Image URL"
                          value={project.image}
                          onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                          className="h-8 border-green-200/60 focus:border-green-400 text-sm"
                        />
                        <textarea
                          placeholder="Achievements (one per line)"
                          value={project.achievements.join('\n')}
                          onChange={(e) => handleProjectChange(index, 'achievements', e.target.value.split('\n'))}
                          className="w-full h-16 p-3 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-sm"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {formData.featuredProjects.map((project, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-2">{project.title}</h3>
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Client:</span> {project.client} | 
                          <span className="font-medium"> Year:</span> {project.year}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                        <div className="space-y-1">
                          {project.achievements.map((achievement, aIndex) => (
                            <div key={aIndex} className="text-xs text-gray-500">• {achievement}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
