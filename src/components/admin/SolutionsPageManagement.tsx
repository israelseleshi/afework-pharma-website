import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function SolutionsPageManagement() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Solutions Page Header
    pageTitle: 'Our Solutions',
    pageSubtitle: 'Innovative Medical Technologies for Healthcare Excellence',
    pageDescription: 'Discover our comprehensive range of medical solutions designed to enhance healthcare delivery across Ethiopia.',
    
    // Solutions Categories - Complete 5 categories matching home page
    solutions: [
      {
        icon: 'Beaker',
        title: 'Diagnostic & Laboratory Solutions',
        description: 'Complete IVD systems including chemistry analyzers, hematology equipment, and laboratory infrastructure.',
        image: '/diagnostic-&-laboratory-solutions.jpg',
        features: ['Chemistry Analyzers', 'Hematology Systems', 'Microscopes', 'Lab Furniture'],
        detailedDescription: 'Our comprehensive laboratory solutions provide healthcare facilities with state-of-the-art diagnostic capabilities. From automated chemistry analyzers to precision microscopy systems, we ensure accurate and reliable test results.',
        keyBenefits: ['Improved diagnostic accuracy', 'Faster turnaround times', 'Enhanced workflow efficiency', 'Comprehensive training and support'],
        applications: ['Clinical Chemistry', 'Hematology', 'Microbiology', 'Immunology', 'Molecular Diagnostics'],
        specifications: {
          throughput: 'Up to 2000 tests/hour',
          accuracy: '99.9% precision',
          maintenance: '24/7 support available',
          training: 'Comprehensive staff training included',
          resolution: '',
          speed: '',
          safety: '',
          connectivity: '',
          monitoring: '',
          ventilation: '',
          integration: '',
          reliability: '',
          materials: '',
          warranty: '',
          quality: '',
          storage: '',
          traceability: '',
          support: ''
        }
      },
      {
        icon: 'Scan',
        title: 'Diagnostic Imaging & Radiology',
        description: 'Advanced imaging solutions from digital X-ray to MRI systems with full installation support.',
        image: '/diagnostic-imaging-&-radiology.jpg',
        features: ['Digital X-Ray', 'Ultrasound', 'CT Scanners', 'MRI Systems'],
        detailedDescription: 'Transform your diagnostic capabilities with our cutting-edge imaging solutions. From portable ultrasound systems to advanced MRI technology, we provide complete imaging solutions.',
        keyBenefits: ['Crystal-clear image quality', 'Reduced radiation exposure', 'Faster scan times', 'Advanced AI-assisted diagnostics'],
        applications: ['General Radiology', 'Cardiology', 'Orthopedics', 'Emergency Medicine', 'Specialized Imaging'],
        specifications: {
          throughput: '',
          accuracy: '',
          maintenance: '24/7 support available',
          training: 'Comprehensive staff training included',
          resolution: 'Ultra-high definition imaging',
          speed: 'Rapid acquisition protocols',
          safety: 'Low-dose radiation technology',
          connectivity: 'PACS integration ready',
          monitoring: '',
          ventilation: '',
          integration: '',
          reliability: '',
          materials: '',
          warranty: '',
          quality: '',
          storage: '',
          traceability: '',
          support: ''
        }
      },
      {
        icon: 'Heart',
        title: 'Critical Care & Operation Theatre',
        description: 'Life-saving equipment for ICUs and operating rooms including ventilators and surgical instruments.',
        image: '/critical-care-&-operation-theatre.jpg',
        features: ['Ventilators', 'Patient Monitors', 'Surgical Tables', 'Anesthesia Machines'],
        detailedDescription: 'Equip your critical care units and operating theaters with advanced life-support systems. Our solutions ensure optimal patient outcomes in the most demanding medical environments.',
        keyBenefits: ['Advanced patient monitoring', 'Precision surgical support', 'Integrated workflow systems', 'Emergency response capabilities'],
        applications: ['Intensive Care Units', 'Operating Theaters', 'Emergency Departments', 'Cardiac Care', 'Neonatal Care'],
        specifications: {
          throughput: '',
          accuracy: '',
          maintenance: '24/7 support available',
          training: 'Comprehensive staff training included',
          resolution: '',
          speed: '',
          safety: '',
          connectivity: '',
          monitoring: 'Multi-parameter vital signs',
          ventilation: 'Adaptive ventilation modes',
          integration: 'Seamless OR integration',
          reliability: '99.9% uptime guarantee',
          materials: '',
          warranty: '',
          quality: '',
          storage: '',
          traceability: '',
          support: ''
        }
      },
      {
        icon: 'Bed',
        title: 'Hospital Furniture & Patient Care',
        description: 'Ergonomic hospital furniture and patient care equipment designed for comfort and functionality.',
        image: '/hospital-furniture-&-patient-care.jpg',
        features: ['Hospital Beds', 'Patient Chairs', 'Medical Trolleys', 'Storage Solutions'],
        detailedDescription: 'Create healing environments with our comprehensive range of hospital furniture and patient care equipment. Designed for comfort, safety, and operational efficiency.',
        keyBenefits: ['Enhanced patient comfort', 'Improved staff efficiency', 'Infection control features', 'Durable construction'],
        applications: ['Patient Rooms', 'Nursing Stations', 'Waiting Areas', 'Treatment Rooms', 'Recovery Areas'],
        specifications: {
          throughput: '',
          accuracy: '',
          maintenance: 'Easy cleaning protocols',
          training: 'Comprehensive staff training included',
          resolution: '',
          speed: '',
          safety: 'International safety standards',
          connectivity: '',
          monitoring: '',
          ventilation: '',
          integration: '',
          reliability: '',
          materials: 'Medical-grade materials',
          warranty: 'Extended warranty coverage',
          quality: '',
          storage: '',
          traceability: '',
          support: ''
        }
      },
      {
        icon: 'Pill',
        title: 'Medical Consumables & Reagents',
        description: 'Quality reagents and medical consumables ensuring reliable test results and patient safety.',
        image: 'https://images.unsplash.com/photo-1758101512269-660feabf64fd',
        features: ['Lab Reagents', 'Test Kits', 'Disposables', 'Quality Controls'],
        detailedDescription: 'Maintain the highest standards of laboratory testing with our premium medical consumables and reagents. Sourced from leading global manufacturers for consistent quality.',
        keyBenefits: ['Consistent quality assurance', 'Extended shelf life', 'Regulatory compliance', 'Cost-effective solutions'],
        applications: ['Clinical Testing', 'Research Applications', 'Quality Control', 'Point-of-Care Testing', 'Specialized Assays'],
        specifications: {
          throughput: '',
          accuracy: '',
          maintenance: '24/7 support available',
          training: 'Comprehensive staff training included',
          resolution: '',
          speed: '',
          safety: '',
          connectivity: '',
          monitoring: '',
          ventilation: '',
          integration: '',
          reliability: '',
          materials: '',
          warranty: '',
          quality: 'ISO certified products',
          storage: 'Optimized storage conditions',
          traceability: 'Full batch traceability',
          support: 'Technical support included'
        }
      }
    ],
    
    // Technical Specifications Section
    technicalSpecs: {
      title: 'Technical Excellence',
      subtitle: 'Industry-Leading Specifications and Standards',
      standards: ['ISO 13485 Certified', 'CE Marking Compliance', 'FDA Approved Products', 'WHO Prequalified'],
      certifications: [
        { name: 'ISO 13485', description: 'Medical Device Quality Management' },
        { name: 'ISO 14971', description: 'Risk Management for Medical Devices' },
        { name: 'IEC 62304', description: 'Medical Device Software Standards' },
        { name: 'ISO 27001', description: 'Information Security Management' }
      ]
    },
    
    // Service & Support Section
    serviceSupport: {
      title: 'Comprehensive Service & Support',
      subtitle: 'End-to-end support throughout your equipment lifecycle',
      services: [
        {
          title: 'Installation & Commissioning',
          description: 'Professional installation and system commissioning by certified engineers',
          features: ['Site preparation', 'Equipment installation', 'System testing', 'User training']
        },
        {
          title: 'Preventive Maintenance',
          description: 'Scheduled maintenance programs to ensure optimal performance',
          features: ['Regular inspections', 'Performance optimization', 'Parts replacement', 'Documentation']
        },
        {
          title: 'Technical Training',
          description: 'Comprehensive training programs for your technical staff',
          features: ['Hands-on training', 'Certification programs', 'Online resources', 'Ongoing support']
        },
        {
          title: '24/7 Support',
          description: 'Round-the-clock technical support and emergency response',
          features: ['Remote diagnostics', 'Emergency repairs', 'Spare parts supply', 'Technical hotline']
        }
      ]
    },
    
    // Call to Action
    ctaTitle: 'Ready to Transform Your Healthcare Facility?',
    ctaDescription: 'Contact our experts to discuss the best medical solutions for your needs.',
    ctaButtonText: 'Get Consultation',
    ctaContactInfo: {
      phone: '+251 929 092 353',
      email: 'info@afeworkpharma.com',
      address: 'Arada Subcity, Ertbekentu Bridge, Woreda 08'
    }
  });

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleSave = (field: string) => {
    console.log(`Saving ${field}:`, formData);
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSolutionChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.map((solution, i) => 
        i === index ? { ...solution, [field]: value } : solution
      )
    }));
  };

  const handleFeatureChange = (solutionIndex: number, featureIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.map((solution, i) => 
        i === solutionIndex ? {
          ...solution,
          features: solution.features.map((feature, j) => j === featureIndex ? value : feature)
        } : solution
      )
    }));
  };

  const handleArrayChange = (solutionIndex: number, field: string, value: string) => {
    const arrayValue = value.split('\n').filter(item => item.trim() !== '');
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.map((solution, i) => 
        i === solutionIndex ? { ...solution, [field]: arrayValue } : solution
      )
    }));
  };

  const handleSpecificationChange = (solutionIndex: number, specKey: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      solutions: prev.solutions.map((solution, i) => 
        i === solutionIndex ? {
          ...solution,
          specifications: { ...solution.specifications, [specKey]: value }
        } : solution
      )
    }));
  };

  const handleServiceChange = (serviceIndex: number, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      serviceSupport: {
        ...prev.serviceSupport,
        services: prev.serviceSupport.services.map((service, i) => 
          i === serviceIndex ? { ...service, [field]: value } : service
        )
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-4">Solutions Page Management</h1>
          <p className="text-lg text-gray-600 font-light">Edit and manage your solutions page content</p>
        </div>

        {/* Page Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Page Header</h2>
          </div>

          <div className="space-y-6">
            {/* Page Title */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Page Title</label>
                {editingField !== 'pageTitle' ? (
                  <button
                    onClick={() => handleEdit('pageTitle')}
                    className="p-3 text-gray-600 rounded-lg"
                  >
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleSave('pageTitle')}
                      className="p-3 text-green-600 rounded-lg"
                    >
                      <Save className="w-8 h-8" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'pageTitle' ? (
                <Input
                  value={formData.pageTitle}
                  onChange={(e) => handleInputChange('pageTitle', e.target.value)}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800 font-medium"
                  placeholder="Enter page title..."
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 font-medium min-h-[56px] flex items-center">
                  {formData.pageTitle}
                </div>
              )}
            </div>

            {/* Page Subtitle */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Page Subtitle</label>
                {editingField !== 'pageSubtitle' ? (
                  <button
                    onClick={() => handleEdit('pageSubtitle')}
                    className="p-3 text-gray-600 rounded-lg"
                  >
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleSave('pageSubtitle')}
                      className="p-3 text-green-600 rounded-lg"
                    >
                      <Save className="w-8 h-8" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'pageSubtitle' ? (
                <Input
                  value={formData.pageSubtitle}
                  onChange={(e) => handleInputChange('pageSubtitle', e.target.value)}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800"
                  placeholder="Enter page subtitle..."
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 min-h-[56px] flex items-center">
                  {formData.pageSubtitle}
                </div>
              )}
            </div>

            {/* Page Description */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Page Description</label>
                {editingField !== 'pageDescription' ? (
                  <button
                    onClick={() => handleEdit('pageDescription')}
                    className="p-3 text-gray-600 rounded-lg"
                  >
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleSave('pageDescription')}
                      className="p-3 text-green-600 rounded-lg"
                    >
                      <Save className="w-8 h-8" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'pageDescription' ? (
                <textarea
                  value={formData.pageDescription}
                  onChange={(e) => handleInputChange('pageDescription', e.target.value)}
                  className="w-full h-28 p-4 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl resize-none bg-white text-gray-800"
                  placeholder="Enter page description..."
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 min-h-[112px] flex items-center">
                  {formData.pageDescription}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Solutions Categories Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Solutions Categories (5 Solutions)</h2>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">Solution Categories</label>
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
            <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 min-h-[400px]">
              {editingField === 'solutions' ? (
                <div className="space-y-6">
                  {formData.solutions.map((solution, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg border border-gray-200 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Solution Title"
                          value={solution.title}
                          onChange={(e) => handleSolutionChange(index, 'title', e.target.value)}
                          className="h-10 border-green-200/60 focus:border-green-400 font-medium"
                        />
                        <Input
                          placeholder="Image URL"
                          value={solution.image}
                          onChange={(e) => handleSolutionChange(index, 'image', e.target.value)}
                          className="h-10 border-green-200/60 focus:border-green-400"
                        />
                      </div>
                      <textarea
                        placeholder="Short Description"
                        value={solution.description}
                        onChange={(e) => handleSolutionChange(index, 'description', e.target.value)}
                        className="w-full h-16 p-3 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-sm"
                      />
                      <textarea
                        placeholder="Detailed Description"
                        value={solution.detailedDescription}
                        onChange={(e) => handleSolutionChange(index, 'detailedDescription', e.target.value)}
                        className="w-full h-20 p-3 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-sm"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">Features (one per line)</label>
                          <textarea
                            placeholder="Features"
                            value={solution.features.join('\n')}
                            onChange={(e) => handleArrayChange(index, 'features', e.target.value)}
                            className="w-full h-16 p-2 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">Key Benefits (one per line)</label>
                          <textarea
                            placeholder="Key Benefits"
                            value={solution.keyBenefits.join('\n')}
                            onChange={(e) => handleArrayChange(index, 'keyBenefits', e.target.value)}
                            className="w-full h-16 p-2 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 mb-1 block">Applications (one per line)</label>
                        <textarea
                          placeholder="Applications"
                          value={solution.applications.join('\n')}
                          onChange={(e) => handleArrayChange(index, 'applications', e.target.value)}
                          className="w-full h-16 p-2 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {formData.solutions.map((solution, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2">{solution.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{solution.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {solution.features.map((feature, fIndex) => (
                          <span key={fIndex} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        <strong>Applications:</strong> {solution.applications.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Specifications Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Technical Excellence</h2>
          </div>

          <div className="space-y-6">
            {/* Technical Specs Title */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Section Title</label>
                {editingField !== 'technicalSpecs.title' ? (
                  <button onClick={() => handleEdit('technicalSpecs.title')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('technicalSpecs.title')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'technicalSpecs.title' ? (
                <Input
                  value={formData.technicalSpecs.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, technicalSpecs: { ...prev.technicalSpecs, title: e.target.value } }))}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800 font-medium"
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 font-medium min-h-[56px] flex items-center">
                  {formData.technicalSpecs.title}
                </div>
              )}
            </div>

            {/* Standards & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60">
                <h4 className="font-semibold text-gray-800 mb-3">Standards</h4>
                <div className="space-y-2">
                  {formData.technicalSpecs.standards.map((standard, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">{standard}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60">
                <h4 className="font-semibold text-gray-800 mb-3">Certifications</h4>
                <div className="space-y-2">
                  {formData.technicalSpecs.certifications.map((cert, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium text-gray-800">{cert.name}</div>
                      <div className="text-gray-600">{cert.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service & Support Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Service & Support</h2>
          </div>

          <div className="space-y-6">
            {/* Service Support Title */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Section Title</label>
                {editingField !== 'serviceSupport.title' ? (
                  <button onClick={() => handleEdit('serviceSupport.title')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('serviceSupport.title')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'serviceSupport.title' ? (
                <Input
                  value={formData.serviceSupport.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceSupport: { ...prev.serviceSupport, title: e.target.value } }))}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800 font-medium"
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 font-medium min-h-[56px] flex items-center">
                  {formData.serviceSupport.title}
                </div>
              )}
            </div>

            {/* Service Cards */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Service Cards (4 Services)</label>
                {editingField !== 'serviceSupport.services' ? (
                  <button onClick={() => handleEdit('serviceSupport.services')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('serviceSupport.services')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 min-h-[300px]">
                {editingField === 'serviceSupport.services' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.serviceSupport.services.map((service, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
                        <Input
                          placeholder="Service Title"
                          value={service.title}
                          onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                          className="h-10 border-green-200/60 focus:border-green-400 font-medium"
                        />
                        <textarea
                          placeholder="Service Description"
                          value={service.description}
                          onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                          className="w-full h-16 p-3 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-sm"
                        />
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">Features (one per line)</label>
                          <textarea
                            placeholder="Features"
                            value={service.features.join('\n')}
                            onChange={(e) => handleServiceChange(index, 'features', e.target.value.split('\n'))}
                            className="w-full h-16 p-2 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.serviceSupport.services.map((service, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-2">{service.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                        <div className="space-y-1">
                          {service.features.map((feature, fIndex) => (
                            <div key={fIndex} className="text-xs text-gray-500">• {feature}</div>
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

        {/* Call to Action Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Call to Action & Contact</h2>
          </div>

          <div className="space-y-6">
            {/* CTA Title */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">CTA Title</label>
                {editingField !== 'ctaTitle' ? (
                  <button
                    onClick={() => handleEdit('ctaTitle')}
                    className="p-3 text-gray-600 rounded-lg"
                  >
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleSave('ctaTitle')}
                      className="p-3 text-green-600 rounded-lg"
                    >
                      <Save className="w-8 h-8" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'ctaTitle' ? (
                <Input
                  value={formData.ctaTitle}
                  onChange={(e) => handleInputChange('ctaTitle', e.target.value)}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800 font-medium"
                  placeholder="Enter CTA title..."
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 font-medium min-h-[56px] flex items-center">
                  {formData.ctaTitle}
                </div>
              )}
            </div>

            {/* CTA Description */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">CTA Description</label>
                {editingField !== 'ctaDescription' ? (
                  <button
                    onClick={() => handleEdit('ctaDescription')}
                    className="p-3 text-gray-600 rounded-lg"
                  >
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleSave('ctaDescription')}
                      className="p-3 text-green-600 rounded-lg"
                    >
                      <Save className="w-8 h-8" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'ctaDescription' ? (
                <Input
                  value={formData.ctaDescription}
                  onChange={(e) => handleInputChange('ctaDescription', e.target.value)}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800"
                  placeholder="Enter CTA description..."
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 min-h-[56px] flex items-center">
                  {formData.ctaDescription}
                </div>
              )}
            </div>

            {/* CTA Button Text */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">CTA Button Text</label>
                {editingField !== 'ctaButtonText' ? (
                  <button
                    onClick={() => handleEdit('ctaButtonText')}
                    className="p-3 text-gray-600 rounded-lg"
                  >
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleSave('ctaButtonText')}
                      className="p-3 text-green-600 rounded-lg"
                    >
                      <Save className="w-8 h-8" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'ctaButtonText' ? (
                <Input
                  value={formData.ctaButtonText}
                  onChange={(e) => handleInputChange('ctaButtonText', e.target.value)}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800"
                  placeholder="Enter CTA button text..."
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 min-h-[56px] flex items-center">
                  {formData.ctaButtonText}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Contact Information</label>
                {editingField !== 'ctaContactInfo' ? (
                  <button onClick={() => handleEdit('ctaContactInfo')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('ctaContactInfo')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 min-h-[120px]">
                {editingField === 'ctaContactInfo' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Phone Number"
                      value={formData.ctaContactInfo.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, ctaContactInfo: { ...prev.ctaContactInfo, phone: e.target.value } }))}
                      className="h-10 border-green-200/60 focus:border-green-400"
                    />
                    <Input
                      placeholder="Email Address"
                      value={formData.ctaContactInfo.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, ctaContactInfo: { ...prev.ctaContactInfo, email: e.target.value } }))}
                      className="h-10 border-green-200/60 focus:border-green-400"
                    />
                    <Input
                      placeholder="Address"
                      value={formData.ctaContactInfo.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, ctaContactInfo: { ...prev.ctaContactInfo, address: e.target.value } }))}
                      className="h-10 border-green-200/60 focus:border-green-400"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="text-sm font-medium text-gray-800">Phone</div>
                      <div className="text-sm text-gray-600">{formData.ctaContactInfo.phone}</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="text-sm font-medium text-gray-800">Email</div>
                      <div className="text-sm text-gray-600">{formData.ctaContactInfo.email}</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="text-sm font-medium text-gray-800">Address</div>
                      <div className="text-sm text-gray-600">{formData.ctaContactInfo.address}</div>
                    </div>
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
