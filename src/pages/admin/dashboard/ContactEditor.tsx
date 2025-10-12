import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Save, Plus, Edit3, Trash2, Eye, Phone, Mail, MapPin } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  icon: string;
}

interface ContactData {
  mainPhone: string;
  mainEmail: string;
  address: string;
  workingHours: string;
  emergencyPhone: string;
  departments: Department[];
  socialMedia: {
    linkedin: string;
    facebook: string;
    twitter: string;
  };
  mapLocation: {
    latitude: string;
    longitude: string;
    embedUrl: string;
  };
}

export function ContactEditor() {
  const [contactData, setContactData] = useState<ContactData>({
    mainPhone: '+251 11 123 4567',
    mainEmail: 'contact@afeworkpharmaet.com',
    address: 'Addis Ababa, Ethiopia\nBole Sub City, Woreda 03\nBuilding Address Line 2',
    workingHours: 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed',
    emergencyPhone: '+251 91 234 5678',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/afework-pharma',
      facebook: 'https://facebook.com/afeworkpharma',
      twitter: 'https://twitter.com/afeworkpharma'
    },
    mapLocation: {
      latitude: '9.0192',
      longitude: '38.7525',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6175!2d38.7525!3d9.0192'
    },
    departments: [
      {
        id: '1',
        name: 'Sales & Business Development',
        email: 'sales@afeworkpharmaet.com',
        phone: '+251 11 123 4568',
        description: 'Equipment sales, quotations, and business partnerships',
        icon: 'briefcase'
      },
      {
        id: '2',
        name: 'Technical Support',
        email: 'support@afeworkpharmaet.com',
        phone: '+251 11 123 4569',
        description: 'Installation, maintenance, and technical assistance',
        icon: 'wrench'
      },
      {
        id: '3',
        name: 'Customer Service',
        email: 'service@afeworkpharmaet.com',
        phone: '+251 11 123 4570',
        description: 'General inquiries, complaints, and customer support',
        icon: 'headphones'
      }
    ]
  });

  const [saving, setSaving] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Contact information updated successfully!');
      console.log('Saving contact data:', contactData);
    }, 1000);
  };

  const updateContactData = (field: keyof ContactData, value: any) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const updateSocialMedia = (platform: keyof ContactData['socialMedia'], value: string) => {
    setContactData(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }));
  };

  const updateMapLocation = (field: keyof ContactData['mapLocation'], value: string) => {
    setContactData(prev => ({
      ...prev,
      mapLocation: { ...prev.mapLocation, [field]: value }
    }));
  };

  const addDepartment = () => {
    const newDepartment: Department = {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      description: '',
      icon: 'briefcase'
    };
    setEditingDepartment(newDepartment);
    setIsAddingNew(true);
  };

  const editDepartment = (department: Department) => {
    setEditingDepartment({ ...department });
    setIsAddingNew(false);
  };

  const saveDepartment = () => {
    if (!editingDepartment) return;

    if (isAddingNew) {
      updateContactData('departments', [...contactData.departments, editingDepartment]);
    } else {
      const updatedDepartments = contactData.departments.map(dept =>
        dept.id === editingDepartment.id ? editingDepartment : dept
      );
      updateContactData('departments', updatedDepartments);
    }

    setEditingDepartment(null);
    setIsAddingNew(false);
  };

  const deleteDepartment = (id: string) => {
    if (confirm('Are you sure you want to delete this department?')) {
      updateContactData('departments', contactData.departments.filter(dept => dept.id !== id));
    }
  };

  const iconOptions = [
    { value: 'briefcase', label: 'Briefcase' },
    { value: 'wrench', label: 'Wrench' },
    { value: 'headphones', label: 'Headphones' },
    { value: 'phone', label: 'Phone' },
    { value: 'mail', label: 'Mail' },
    { value: 'users', label: 'Users' },
    { value: 'settings', label: 'Settings' },
    { value: 'heart', label: 'Heart' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
          <p className="text-gray-600 mt-1">Manage contact details, departments, and location</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => window.open('/contact', '_blank')}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Main Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Main Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Phone</label>
              <Input
                value={contactData.mainPhone}
                onChange={(e) => updateContactData('mainPhone', e.target.value)}
                placeholder="+251 11 123 4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Email</label>
              <Input
                value={contactData.mainEmail}
                onChange={(e) => updateContactData('mainEmail', e.target.value)}
                placeholder="contact@afeworkpharmaet.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Phone</label>
            <Input
              value={contactData.emergencyPhone}
              onChange={(e) => updateContactData('emergencyPhone', e.target.value)}
              placeholder="+251 91 234 5678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Office Address</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              rows={3}
              value={contactData.address}
              onChange={(e) => updateContactData('address', e.target.value)}
              placeholder="Complete office address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              rows={3}
              value={contactData.workingHours}
              onChange={(e) => updateContactData('workingHours', e.target.value)}
              placeholder="Business hours"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
            <Input
              value={contactData.socialMedia.linkedin}
              onChange={(e) => updateSocialMedia('linkedin', e.target.value)}
              placeholder="https://linkedin.com/company/afework-pharma"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
            <Input
              value={contactData.socialMedia.facebook}
              onChange={(e) => updateSocialMedia('facebook', e.target.value)}
              placeholder="https://facebook.com/afeworkpharma"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
            <Input
              value={contactData.socialMedia.twitter}
              onChange={(e) => updateSocialMedia('twitter', e.target.value)}
              placeholder="https://twitter.com/afeworkpharma"
            />
          </div>
        </CardContent>
      </Card>

      {/* Map Location */}
      <Card>
        <CardHeader>
          <CardTitle>Map Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
              <Input
                value={contactData.mapLocation.latitude}
                onChange={(e) => updateMapLocation('latitude', e.target.value)}
                placeholder="9.0192"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
              <Input
                value={contactData.mapLocation.longitude}
                onChange={(e) => updateMapLocation('longitude', e.target.value)}
                placeholder="38.7525"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label>
            <Input
              value={contactData.mapLocation.embedUrl}
              onChange={(e) => updateMapLocation('embedUrl', e.target.value)}
              placeholder="Google Maps embed URL"
            />
          </div>
        </CardContent>
      </Card>

      {/* Departments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Department Contacts</CardTitle>
            <Button onClick={addDepartment} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {editingDepartment && (
            <Card className="mb-4 border-emerald-200">
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                    <Input
                      value={editingDepartment.name}
                      onChange={(e) => setEditingDepartment({...editingDepartment, name: e.target.value})}
                      placeholder="Department name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <select
                      value={editingDepartment.icon}
                      onChange={(e) => setEditingDepartment({...editingDepartment, icon: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      value={editingDepartment.email}
                      onChange={(e) => setEditingDepartment({...editingDepartment, email: e.target.value})}
                      placeholder="department@afeworkpharmaet.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input
                      value={editingDepartment.phone}
                      onChange={(e) => setEditingDepartment({...editingDepartment, phone: e.target.value})}
                      placeholder="+251 11 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows={2}
                    value={editingDepartment.description}
                    onChange={(e) => setEditingDepartment({...editingDepartment, description: e.target.value})}
                    placeholder="Department description"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveDepartment} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    {isAddingNew ? 'Add Department' : 'Update Department'}
                  </Button>
                  <Button onClick={() => setEditingDepartment(null)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactData.departments.map((department) => (
              <Card key={department.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-600 text-sm">{department.icon}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editDepartment(department)}
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteDepartment(department.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">{department.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{department.description}</p>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{department.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-3 h-3" />
                      <span>{department.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">{contactData.mainPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm">{contactData.mainEmail}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <span className="text-sm whitespace-pre-line">{contactData.address}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Working Hours</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">{contactData.workingHours}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
