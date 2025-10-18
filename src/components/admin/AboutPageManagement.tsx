import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, XCircle } from 'lucide-react';
import { Input } from '../ui/input';

export function AboutPageManagement() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    pageTitle: 'About Afework Pharma',
    pageSubtitle: 'Your Trusted Healthcare Partner in Ethiopia',
    pageDescription: 'Learn about our mission, vision, and commitment to transforming healthcare in Ethiopia.',
    
    // Company Story
    storyTitle: 'Our Story',
    storyContent: 'Founded with a vision to revolutionize healthcare in Ethiopia, Afework Pharma has been at the forefront of medical innovation for over 15 years.',
    
    // Mission & Vision
    missionTitle: 'Our Mission',
    missionContent: 'To provide cutting-edge medical equipment and healthcare solutions that improve patient outcomes and enhance healthcare delivery across Ethiopia.',
    visionTitle: 'Our Vision',
    visionContent: 'To be the leading provider of medical technology solutions in Ethiopia, setting the standard for healthcare excellence.',
    
    // Team
    teamTitle: 'Our Team',
    teamDescription: 'Meet the dedicated professionals behind Afework Pharma',
    
    // Values
    valuesTitle: 'Our Values',
    values: [
      { title: 'Excellence', description: 'We strive for excellence in everything we do' },
      { title: 'Innovation', description: 'We embrace cutting-edge technology and innovative solutions' },
      { title: 'Integrity', description: 'We conduct business with the highest ethical standards' },
      { title: 'Partnership', description: 'We build lasting relationships with our clients and partners' }
    ]
  });

  const handleEdit = (field: string) => setEditingField(field);
  const handleSave = (field: string) => {
    console.log(`Saving ${field}:`, formData);
    setEditingField(null);
  };
  const handleCancel = () => setEditingField(null);
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleValueChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.map((val, i) => 
        i === index ? { ...val, [field]: value } : val
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-800 mb-4">About Page Management</h1>
          <p className="text-lg text-gray-600 font-light">Edit and manage your about page content</p>
        </div>

        {/* Page Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Page Header</h2>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Page Title</label>
                {editingField !== 'pageTitle' ? (
                  <button onClick={() => handleEdit('pageTitle')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('pageTitle')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
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
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 font-medium min-h-[56px] flex items-center">
                  {formData.pageTitle}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">More About Sections Coming Soon</h3>
          <p className="text-gray-600">Additional about page management features will be added here.</p>
        </div>
      </div>
    </motion.div>
  );
}
