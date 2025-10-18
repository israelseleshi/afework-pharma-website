import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function ProjectsPageManagement() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Projects Page Content
    pageTitle: 'Our Projects',
    pageSubtitle: 'Successful Healthcare Implementations Across Ethiopia',
    pageDescription: 'Explore our portfolio of successful medical equipment installations and healthcare system implementations.',
    
    // Featured Projects
    featuredProjects: [
      {
        title: 'Addis Ababa Medical Center',
        description: 'Complete medical equipment installation and setup for a state-of-the-art medical facility',
        location: 'Addis Ababa, Ethiopia',
        year: '2024',
        category: 'Medical Equipment Installation',
        image: '/images/projects/addis-medical-center.jpg'
      },
      {
        title: 'Regional Hospital Network',
        description: 'Multi-facility healthcare management system implementation across multiple regions',
        location: 'Various Regions, Ethiopia',
        year: '2023',
        category: 'Healthcare Management System',
        image: '/images/projects/regional-network.jpg'
      },
      {
        title: 'Pediatric Care Unit Upgrade',
        description: 'Specialized pediatric equipment installation and staff training program',
        location: 'Bahir Dar, Ethiopia',
        year: '2023',
        category: 'Specialized Equipment',
        image: '/images/projects/pediatric-care.jpg'
      }
    ],
    
    // Project Statistics
    projectStats: [
      { number: '25', suffix: '+', label: 'Completed Projects' },
      { number: '15', suffix: '+', label: 'Healthcare Facilities' },
      { number: '500', suffix: '+', label: 'Equipment Installed' },
      { number: '98', suffix: '%', label: 'Client Satisfaction' }
    ],
    
    // Call to Action
    ctaTitle: 'Ready to Start Your Next Healthcare Project?',
    ctaDescription: 'Let us help you implement cutting-edge medical solutions for your facility.',
    ctaButtonText: 'Discuss Your Project'
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

  const handleProjectChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      featuredProjects: prev.featuredProjects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      projectStats: prev.projectStats.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
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
          <h1 className="text-4xl font-light text-gray-800 mb-4">Projects Page Management</h1>
          <p className="text-lg text-gray-600 font-light">Edit and manage your projects page content</p>
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

        {/* Featured Projects Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Featured Projects</h2>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">Project Items</label>
              {editingField !== 'featuredProjects' ? (
                <button
                  onClick={() => handleEdit('featuredProjects')}
                  className="p-3 text-gray-600 rounded-lg"
                >
                  <Edit3 className="w-6 h-6" />
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleSave('featuredProjects')}
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
            <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 min-h-[300px]">
              {editingField === 'featuredProjects' ? (
                <div className="space-y-6">
                  {formData.featuredProjects.map((project, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg border border-gray-200">
                      <div className="space-y-4">
                        <Input
                          placeholder="Project Title"
                          value={project.title}
                          onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                          className="h-12 border-green-200/60 focus:border-green-400 font-medium"
                        />
                        <textarea
                          placeholder="Project Description"
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                          className="w-full h-20 p-4 border-2 border-green-200/60 focus:border-green-400 rounded-lg resize-none text-sm"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Location"
                            value={project.location}
                            onChange={(e) => handleProjectChange(index, 'location', e.target.value)}
                            className="h-10 border-green-200/60 focus:border-green-400"
                          />
                          <Input
                            placeholder="Year"
                            value={project.year}
                            onChange={(e) => handleProjectChange(index, 'year', e.target.value)}
                            className="h-10 border-green-200/60 focus:border-green-400"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="Category"
                            value={project.category}
                            onChange={(e) => handleProjectChange(index, 'category', e.target.value)}
                            className="h-10 border-green-200/60 focus:border-green-400"
                          />
                          <Input
                            placeholder="Image URL"
                            value={project.image}
                            onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                            className="h-10 border-green-200/60 focus:border-green-400"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {formData.featuredProjects.map((project, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-2 text-xl">{project.title}</h3>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>📍 {project.location}</div>
                        <div>📅 {project.year}</div>
                        <div>🏷️ {project.category}</div>
                        <div>🖼️ {project.image}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Statistics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Project Statistics</h2>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">Statistics</label>
              {editingField !== 'projectStats' ? (
                <button
                  onClick={() => handleEdit('projectStats')}
                  className="p-3 text-gray-600 rounded-lg"
                >
                  <Edit3 className="w-6 h-6" />
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleSave('projectStats')}
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
            <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 min-h-[120px]">
              {editingField === 'projectStats' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {formData.projectStats.map((stat, index) => (
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  {formData.projectStats.map((stat, index) => (
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

        {/* Call to Action Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Call to Action</h2>
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}
