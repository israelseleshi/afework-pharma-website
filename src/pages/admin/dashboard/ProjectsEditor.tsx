import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Save, Plus, Edit3, Trash2, Eye, Upload, Calendar, MapPin } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  image: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'ongoing' | 'planned';
  category: string;
  achievements: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'CDC-Tigray Regional Laboratory Enhancement',
      client: 'Centers for Disease Control and Prevention (CDC)',
      description: 'Comprehensive laboratory equipment installation and training program for Tigray regional healthcare facilities.',
      image: '/project-cdc-tigray.jpg',
      location: 'Tigray Region, Ethiopia',
      startDate: '2024-01-15',
      endDate: '2024-12-30',
      status: 'ongoing',
      category: 'Laboratory Enhancement',
      achievements: [
        'Installed 15 automated chemistry analyzers',
        'Trained 45+ laboratory technicians',
        'Established quality control protocols',
        'Improved diagnostic capacity by 300%'
      ],
      stats: [
        { label: 'Equipment Installed', value: '25 Units' },
        { label: 'Staff Trained', value: '45+' },
        { label: 'Facilities Upgraded', value: '8' }
      ]
    },
    {
      id: '2',
      title: 'FDRE Defense Hospital Modernization',
      client: 'Federal Democratic Republic of Ethiopia Defense Forces',
      description: 'Complete modernization of medical equipment and infrastructure for the Defense Hospital system.',
      image: '/project-defense-hospital.jpg',
      location: 'Addis Ababa, Ethiopia',
      startDate: '2023-06-01',
      endDate: '2024-03-31',
      status: 'completed',
      category: 'Hospital Modernization',
      achievements: [
        'Upgraded ICU with latest monitoring systems',
        'Installed digital imaging equipment',
        'Implemented hospital management system',
        'Enhanced surgical capabilities'
      ],
      stats: [
        { label: 'ICU Beds Upgraded', value: '24' },
        { label: 'Imaging Systems', value: '6' },
        { label: 'OR Suites', value: '4' }
      ]
    }
  ]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Projects updated successfully!');
      console.log('Saving projects:', projects);
    }, 1000);
  };

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      client: '',
      description: '',
      image: '',
      location: '',
      startDate: '',
      endDate: '',
      status: 'planned',
      category: '',
      achievements: [''],
      stats: [{ label: '', value: '' }]
    };
    setEditingProject(newProject);
    setIsAddingNew(true);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    if (isAddingNew) {
      setProjects(prev => [...prev, editingProject]);
    } else {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? editingProject : p));
    }
    
    setEditingProject(null);
    setIsAddingNew(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const updateEditingProject = (field: keyof Project, value: any) => {
    if (!editingProject) return;
    setEditingProject(prev => prev ? { ...prev, [field]: value } : null);
  };

  const addAchievement = () => {
    if (!editingProject) return;
    updateEditingProject('achievements', [...editingProject.achievements, '']);
  };

  const updateAchievement = (index: number, value: string) => {
    if (!editingProject) return;
    const newAchievements = [...editingProject.achievements];
    newAchievements[index] = value;
    updateEditingProject('achievements', newAchievements);
  };

  const removeAchievement = (index: number) => {
    if (!editingProject) return;
    const newAchievements = editingProject.achievements.filter((_, i) => i !== index);
    updateEditingProject('achievements', newAchievements);
  };

  const addStat = () => {
    if (!editingProject) return;
    updateEditingProject('stats', [...editingProject.stats, { label: '', value: '' }]);
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    if (!editingProject) return;
    const newStats = [...editingProject.stats];
    newStats[index][field] = value;
    updateEditingProject('stats', newStats);
  };

  const removeStat = (index: number) => {
    if (!editingProject) return;
    const newStats = editingProject.stats.filter((_, i) => i !== index);
    updateEditingProject('stats', newStats);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
          <p className="text-gray-600 mt-1">Manage your project portfolio and case studies</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => window.open('/projects', '_blank')}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleAddNew} className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      {editingProject && (
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle>{isAddingNew ? 'Add New Project' : 'Edit Project'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                <Input
                  value={editingProject.title}
                  onChange={(e) => updateEditingProject('title', e.target.value)}
                  placeholder="Project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                <Input
                  value={editingProject.client}
                  onChange={(e) => updateEditingProject('client', e.target.value)}
                  placeholder="Client name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                rows={3}
                value={editingProject.description}
                onChange={(e) => updateEditingProject('description', e.target.value)}
                placeholder="Project description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input
                  value={editingProject.location}
                  onChange={(e) => updateEditingProject('location', e.target.value)}
                  placeholder="Project location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Input
                  value={editingProject.category}
                  onChange={(e) => updateEditingProject('category', e.target.value)}
                  placeholder="Project category"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={editingProject.status}
                  onChange={(e) => updateEditingProject('status', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="planned">Planned</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <Input
                  type="date"
                  value={editingProject.startDate}
                  onChange={(e) => updateEditingProject('startDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <Input
                  type="date"
                  value={editingProject.endDate}
                  onChange={(e) => updateEditingProject('endDate', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
              <div className="flex gap-2">
                <Input
                  value={editingProject.image}
                  onChange={(e) => updateEditingProject('image', e.target.value)}
                  placeholder="/project-image.jpg"
                />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Achievements</label>
              <div className="space-y-2">
                {editingProject.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                      placeholder="Achievement description"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addAchievement}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Statistics</label>
              <div className="space-y-2">
                {editingProject.stats.map((stat, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      placeholder="Stat label"
                    />
                    <Input
                      value={stat.value}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                      placeholder="Stat value"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeStat(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addStat}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Statistic
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setEditingProject(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProject} className="bg-emerald-600 hover:bg-emerald-700">
                {isAddingNew ? 'Add Project' : 'Update Project'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
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
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-sm text-emerald-600 font-medium">{project.client}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(project.startDate).getFullYear()}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Achievements: {project.achievements.length} • Stats: {project.stats.length}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(project)}
                    className="flex-1"
                  >
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
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
