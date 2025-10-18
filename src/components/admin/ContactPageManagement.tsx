import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, XCircle } from 'lucide-react';
import { Input } from '../ui/input';

export function ContactPageManagement() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    pageTitle: 'Get In Touch',
    pageSubtitle: 'Ready to Transform Your Healthcare Facility?',
    pageDescription: 'Contact us today to discuss your medical equipment and healthcare solution needs.',
    
    // Contact Information
    contactInfo: {
      phone: '+251 911 123 456',
      email: 'contact@afeworkpharmaet.com',
      address: 'Addis Ababa, Ethiopia',
      workingHours: 'Monday - Friday: 8:00 AM - 6:00 PM'
    },
    
    // Form Settings
    formTitle: 'Send Us a Message',
    formDescription: 'Fill out the form below and we\'ll get back to you as soon as possible.',
    
    // Success Message
    successTitle: 'Thank You!',
    successMessage: 'Your message has been sent successfully. We\'ll get back to you soon.'
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

  const handleContactInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
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
          <h1 className="text-4xl font-light text-gray-800 mb-4">Contact Page Management</h1>
          <p className="text-lg text-gray-600 font-light">Edit and manage your contact page content</p>
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

        {/* Contact Information */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                {editingField !== 'phone' ? (
                  <button onClick={() => handleEdit('phone')} className="p-3 text-gray-600 rounded-lg">
                    <Edit3 className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleSave('phone')} className="p-3 text-green-600 rounded-lg">
                      <Save className="w-8 h-8" />
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {editingField === 'phone' ? (
                <Input
                  value={formData.contactInfo.phone}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  className="w-full h-14 border-2 border-green-200/60 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 rounded-xl bg-white text-gray-800"
                />
              ) : (
                <div className="p-4 bg-gray-50/80 rounded-xl border-2 border-gray-200/60 text-gray-800 min-h-[56px] flex items-center">
                  {formData.contactInfo.phone}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-green-200/30 p-8 shadow-xl text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">More Contact Sections Coming Soon</h3>
          <p className="text-gray-600">Additional contact page management features will be added here.</p>
        </div>
      </div>
    </motion.div>
  );
}
