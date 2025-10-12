import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Save, Plus, Edit3, Trash2, Eye, Upload } from 'lucide-react';

interface Solution {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  category: string;
  status: 'active' | 'draft';
}

export function SolutionsEditor() {
  const [solutions, setSolutions] = useState<Solution[]>([
    {
      id: '1',
      title: 'Diagnostic & Laboratory Solutions',
      description: 'Comprehensive laboratory equipment and diagnostic solutions for accurate medical testing.',
      image: '/diagnostic-&-laboratory-solutions.jpg',
      features: ['Automated Chemistry Analyzers', 'Hematology Systems', 'Immunoassay Platforms', 'Laboratory Information Systems'],
      category: 'Laboratory',
      status: 'active'
    },
    {
      id: '2',
      title: 'Diagnostic Imaging & Radiology',
      description: 'Advanced medical imaging equipment for precise diagnosis and patient care.',
      image: '/diagnostic-imaging-&-radiology.jpg',
      features: ['Digital X-Ray Systems', 'Ultrasound Equipment', 'CT Scanners', 'MRI Systems'],
      category: 'Imaging',
      status: 'active'
    },
    {
      id: '3',
      title: 'Critical Care & Operation Theatre',
      description: 'Life-saving equipment for critical care units and surgical procedures.',
      image: '/critical-care-&-operation-theatre.jpg',
      features: ['ICU Ventilators', 'Patient Monitors', 'Surgical Tables', 'Anesthesia Machines'],
      category: 'Critical Care',
      status: 'active'
    },
    {
      id: '4',
      title: 'Hospital Furniture & Patient Care',
      description: 'Ergonomic hospital furniture and patient care equipment for comfort and safety.',
      image: '/hospital-furniture-&-patient-care.jpg',
      features: ['Electric Hospital Beds', 'Patient Chairs', 'Medical Trolleys', 'Storage Solutions'],
      category: 'Furniture',
      status: 'active'
    },
    {
      id: '5',
      title: 'Medical Consumables & Reagents',
      description: 'High-quality medical consumables and laboratory reagents for reliable testing.',
      image: '/diagnostic-&-laboratory-solutions.jpg',
      features: ['Laboratory Reagents', 'Rapid Test Kits', 'Quality Controls', 'Calibrators'],
      category: 'Consumables',
      status: 'active'
    }
  ]);

  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Solutions updated successfully!');
      console.log('Saving solutions:', solutions);
    }, 1000);
  };

  const handleEdit = (solution: Solution) => {
    setEditingSolution({ ...solution });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    const newSolution: Solution = {
      id: Date.now().toString(),
      title: '',
      description: '',
      image: '',
      features: [''],
      category: 'Laboratory',
      status: 'draft'
    };
    setEditingSolution(newSolution);
    setIsAddingNew(true);
  };

  const handleSaveSolution = () => {
    if (!editingSolution) return;

    if (isAddingNew) {
      setSolutions(prev => [...prev, editingSolution]);
    } else {
      setSolutions(prev => prev.map(s => s.id === editingSolution.id ? editingSolution : s));
    }
    
    setEditingSolution(null);
    setIsAddingNew(false);
  };

  const handleDeleteSolution = (id: string) => {
    if (confirm('Are you sure you want to delete this solution?')) {
      setSolutions(prev => prev.filter(s => s.id !== id));
    }
  };

  const updateEditingSolution = (field: keyof Solution, value: any) => {
    if (!editingSolution) return;
    setEditingSolution(prev => prev ? { ...prev, [field]: value } : null);
  };

  const addFeature = () => {
    if (!editingSolution) return;
    updateEditingSolution('features', [...editingSolution.features, '']);
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingSolution) return;
    const newFeatures = [...editingSolution.features];
    newFeatures[index] = value;
    updateEditingSolution('features', newFeatures);
  };

  const removeFeature = (index: number) => {
    if (!editingSolution) return;
    const newFeatures = editingSolution.features.filter((_, i) => i !== index);
    updateEditingSolution('features', newFeatures);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Solutions Management</h2>
          <p className="text-gray-600 mt-1">Manage your medical solutions and services</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => window.open('/solutions', '_blank')}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleAddNew} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Solution
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      {editingSolution && (
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle>{isAddingNew ? 'Add New Solution' : 'Edit Solution'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <Input
                  value={editingSolution.title}
                  onChange={(e) => updateEditingSolution('title', e.target.value)}
                  placeholder="Solution title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={editingSolution.category}
                  onChange={(e) => updateEditingSolution('category', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="Laboratory">Laboratory</option>
                  <option value="Imaging">Imaging</option>
                  <option value="Critical Care">Critical Care</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Consumables">Consumables</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                rows={3}
                value={editingSolution.description}
                onChange={(e) => updateEditingSolution('description', e.target.value)}
                placeholder="Solution description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <div className="flex gap-2">
                <Input
                  value={editingSolution.image}
                  onChange={(e) => updateEditingSolution('image', e.target.value)}
                  placeholder="/solution-image.jpg"
                />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Features</label>
              <div className="space-y-2">
                {editingSolution.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Feature description"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addFeature}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={editingSolution.status}
                onChange={(e) => updateEditingSolution('status', e.target.value as 'active' | 'draft')}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setEditingSolution(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSolution} className="bg-emerald-600 hover:bg-emerald-700">
                {isAddingNew ? 'Add Solution' : 'Update Solution'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {solutions.map((solution) => (
          <Card key={solution.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {solution.image ? (
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{solution.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    solution.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {solution.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">{solution.description}</p>
                
                <div className="text-xs text-gray-500">
                  Category: {solution.category}
                </div>
                
                <div className="text-xs text-gray-500">
                  Features: {solution.features.length}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(solution)}
                    className="flex-1"
                  >
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSolution(solution.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
