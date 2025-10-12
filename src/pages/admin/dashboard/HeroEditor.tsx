import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Save, Eye, RefreshCw, Edit3, Check, X, AlertCircle } from 'lucide-react';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export function HeroEditor() {
  const [heroData, setHeroData] = useState<HeroData>({
    title: 'Premium Medical Equipment & Healthcare Solutions',
    subtitle: 'Building a Healthier Ethiopia',
    description: 'Leading provider of advanced medical equipment, diagnostic solutions, and healthcare technology across Ethiopia.',
    stat1Value: '45+',
    stat1Label: 'IVD Units Delivered',
    stat2Value: '36+',
    stat2Label: 'Healthcare Facilities',
    stat3Value: '5+',
    stat3Label: 'Years Experience'
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState<keyof HeroData | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [recentlyUpdated, setRecentlyUpdated] = useState<keyof HeroData | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content/all');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Parse hero_stats if it exists
          let stats = [{ number: 45, suffix: '+', label: 'IVD Units Deployed' }, { number: 36, suffix: '+', label: 'Healthcare Facilities' }, { number: 5, suffix: '+', label: 'Years Experience' }];
          if (data.content.hero_stats?.value) {
            try {
              stats = JSON.parse(data.content.hero_stats.value);
            } catch (e) {
              console.warn('Failed to parse hero_stats JSON');
            }
          }
          
          setHeroData({
            title: data.content.hero_headline?.value || 'Advanced Medical Solutions for a Healthier Ethiopia',
            subtitle: 'Building a Healthier Ethiopia', // This is hardcoded in the homepage
            description: data.content.hero_subheadline?.value || 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation.',
            stat1Value: `${stats[0]?.number || 45}${stats[0]?.suffix || '+'}`,
            stat1Label: stats[0]?.label || 'IVD Units Deployed',
            stat2Value: `${stats[1]?.number || 36}${stats[1]?.suffix || '+'}`,
            stat2Label: stats[1]?.label || 'Healthcare Facilities',
            stat3Value: `${stats[2]?.number || 5}${stats[2]?.suffix || '+'}`,
            stat3Label: stats[2]?.label || 'Years Experience'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      
      // Parse stat values to extract numbers and suffixes
      const parseStatValue = (value: string) => {
        const match = value.match(/(\d+)(\+?)/);
        return {
          number: match ? parseInt(match[1]) : 0,
          suffix: match?.[2] || '+'
        };
      };
      
      const stat1 = parseStatValue(heroData.stat1Value);
      const stat2 = parseStatValue(heroData.stat2Value);
      const stat3 = parseStatValue(heroData.stat3Value);
      
      const statsArray = [
        { number: stat1.number, suffix: stat1.suffix, label: heroData.stat1Label },
        { number: stat2.number, suffix: stat2.suffix, label: heroData.stat2Label },
        { number: stat3.number, suffix: stat3.suffix, label: heroData.stat3Label }
      ];
      
      const updates = [
        { section_key: 'hero_headline', content_type: 'text', content_value: heroData.title },
        { section_key: 'hero_subheadline', content_type: 'text', content_value: heroData.description },
        { section_key: 'hero_stats', content_type: 'json', content_value: JSON.stringify(statsArray) }
      ];

      const response = await fetch('/api/content/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ updates })
      });

      const data = await response.json();
      if (data.success) {
        setHasChanges(false);
        
        // Clear localStorage cache to force fresh content load
        localStorage.removeItem('afework_content');
        
        // Show success message with refresh option
        const shouldRefresh = window.confirm('✅ Hero section updated successfully! Changes are now live on your homepage.\n\nWould you like to refresh the page to see the changes immediately?');
        
        if (shouldRefresh) {
          window.location.reload();
        }
      } else {
        alert(data.message || 'Failed to update content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof HeroData, value: string) => {
    setHeroData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const startEditing = (field: keyof HeroData) => {
    setEditingField(field);
    setTempValue(heroData[field]);
  };

  const saveEdit = () => {
    if (editingField && tempValue.trim() !== '') {
      handleChange(editingField, tempValue.trim());
      
      // Show success indicator
      setRecentlyUpdated(editingField);
      setTimeout(() => setRecentlyUpdated(null), 2000);
      
      setEditingField(null);
      setTempValue('');
      
      // Show brief success feedback
      const fieldLabel = editingField.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      console.log(`✅ ${fieldLabel} updated successfully`);
    }
  };

  const cancelEdit = () => {
    if (tempValue !== heroData[editingField!] && tempValue.trim() !== '') {
      if (window.confirm('Are you sure you want to cancel? Your changes will be lost.')) {
        setEditingField(null);
        setTempValue('');
      }
    } else {
      setEditingField(null);
      setTempValue('');
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    window.open('/', '_blank');
  };

  // Editable Field Component
  const EditableField = ({ 
    field, 
    label, 
    value, 
    multiline = false, 
    className = "" 
  }: { 
    field: keyof HeroData; 
    label: string; 
    value: string; 
    multiline?: boolean;
    className?: string;
  }) => {
    const isEditing = editingField === field;
    
    return (
      <div className={`group relative ${className}`}>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          {label}
          {recentlyUpdated === field && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full animate-pulse">
              <Check className="w-3 h-3" />
              Updated
            </span>
          )}
        </label>
        <div className="relative">
          {isEditing ? (
            <div className="space-y-3">
              {multiline ? (
                <textarea
                  className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  rows={4}
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') cancelEdit();
                    if (e.key === 'Enter' && e.ctrlKey) saveEdit();
                  }}
                />
              ) : (
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="w-full border-emerald-300 focus:ring-emerald-500 focus:border-emerald-500"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') cancelEdit();
                    if (e.key === 'Enter') saveEdit();
                  }}
                />
              )}
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {multiline ? 'Press Ctrl+Enter to save, Escape to cancel' : 'Press Enter to save, Escape to cancel'}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelEdit}
                    className="hover:bg-gray-50"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={saveEdit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    disabled={tempValue.trim() === ''}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    OK
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              {multiline ? (
                <div className="w-full p-3 pr-12 border border-gray-300 rounded-lg bg-gray-50 min-h-[100px] whitespace-pre-wrap">
                  {value}
                </div>
              ) : (
                <div className="w-full p-3 pr-12 border border-gray-300 rounded-lg bg-gray-50">
                  {value}
                </div>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => startEditing(field)}
                className="absolute top-2 right-2 bg-white shadow-md hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 border border-gray-200"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
        <span className="ml-2 text-gray-600">Loading hero content...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hero Section Editor</h2>
          <p className="text-gray-600 mt-1">Click the edit button (pencil icon) on any field to make changes</p>
          {hasChanges && (
            <div className="flex items-center gap-2 mt-2 text-orange-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">You have unsaved changes</span>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-2" />
            Preview Site
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving || !hasChanges}
            className={`${hasChanges ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-400'} transition-colors`}
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : hasChanges ? 'Save Changes' : 'No Changes'}
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Main Content
            <span className="text-sm text-gray-500 font-normal">Click pencil icon to edit</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <EditableField
            field="title"
            label="Main Title"
            value={heroData.title}
          />
          
          <EditableField
            field="subtitle"
            label="Subtitle"
            value={heroData.subtitle}
          />
          
          <EditableField
            field="description"
            label="Description"
            value={heroData.description}
            multiline={true}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Statistics Section
            <span className="text-sm text-gray-500 font-normal">Click pencil icon to edit</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 text-center">Statistic 1</h4>
              <EditableField
                field="stat1Value"
                label="Value"
                value={heroData.stat1Value}
              />
              <EditableField
                field="stat1Label"
                label="Label"
                value={heroData.stat1Label}
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 text-center">Statistic 2</h4>
              <EditableField
                field="stat2Value"
                label="Value"
                value={heroData.stat2Value}
              />
              <EditableField
                field="stat2Label"
                label="Label"
                value={heroData.stat2Label}
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 text-center">Statistic 3</h4>
              <EditableField
                field="stat3Value"
                label="Value"
                value={heroData.stat3Value}
              />
              <EditableField
                field="stat3Label"
                label="Label"
                value={heroData.stat3Label}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 p-8 rounded-lg border">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{heroData.title}</h1>
              <h2 className="text-xl text-emerald-600 font-semibold">{heroData.subtitle}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{heroData.description}</p>
              
              <div className="grid grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{heroData.stat1Value}</div>
                  <div className="text-sm text-gray-600">{heroData.stat1Label}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{heroData.stat2Value}</div>
                  <div className="text-sm text-gray-600">{heroData.stat2Label}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{heroData.stat3Value}</div>
                  <div className="text-sm text-gray-600">{heroData.stat3Label}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
