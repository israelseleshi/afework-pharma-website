import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Save, Plus, Edit3, Trash2, Eye, Upload } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
}

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  achievement: string;
}

interface AboutData {
  mission: string;
  vision: string;
  description: string;
  teamImage: string;
  milestones: Milestone[];
  teamMembers: TeamMember[];
  achievements: {
    clients: string;
    projects: string;
    experience: string;
    satisfaction: string;
  };
}

export function AboutEditor() {
  const [aboutData, setAboutData] = useState<AboutData>({
    mission: 'To provide cutting-edge medical equipment and healthcare solutions that enhance the quality of healthcare delivery across Ethiopia.',
    vision: 'To be the leading provider of innovative medical technology solutions in East Africa, contributing to healthier communities.',
    description: 'Afework Pharma has been at the forefront of medical equipment distribution and healthcare solutions in Ethiopia since 2019.',
    teamImage: '/assets/images/afewrork-team-image.jpg',
    achievements: {
      clients: '36+',
      projects: '150+',
      experience: '5+',
      satisfaction: '98%'
    },
    milestones: [
      {
        id: '1',
        year: '2019',
        title: 'Company Founded',
        description: 'Afework Pharma was established with a vision to transform healthcare in Ethiopia.',
        achievement: 'First medical equipment distribution'
      },
      {
        id: '2',
        year: '2020',
        title: 'First Major Contract',
        description: 'Secured our first major government contract for laboratory equipment.',
        achievement: '10+ healthcare facilities equipped'
      },
      {
        id: '3',
        year: '2021',
        title: 'Regional Expansion',
        description: 'Expanded operations to serve multiple regions across Ethiopia.',
        achievement: 'Coverage in 8 regions'
      },
      {
        id: '4',
        year: '2022',
        title: 'Technology Partnership',
        description: 'Formed strategic partnerships with leading medical technology manufacturers.',
        achievement: '5 international partnerships'
      },
      {
        id: '5',
        year: '2023',
        title: 'Quality Certification',
        description: 'Achieved ISO certification and quality management standards.',
        achievement: 'ISO 13485 certified'
      },
      {
        id: '6',
        year: '2024',
        title: 'Digital Innovation',
        description: 'Launched digital healthcare solutions and telemedicine support.',
        achievement: 'Digital transformation leader'
      }
    ],
    teamMembers: [
      {
        id: '1',
        name: 'Dr. Afework Tesfaye',
        position: 'Chief Executive Officer',
        image: '/team-ceo.jpg',
        bio: 'Medical professional with 15+ years of experience in healthcare management and medical equipment.'
      },
      {
        id: '2',
        name: 'Eng. Meron Haile',
        position: 'Chief Technology Officer',
        image: '/team-cto.jpg',
        bio: 'Biomedical engineer specializing in medical device integration and healthcare technology solutions.'
      },
      {
        id: '3',
        name: 'Ato Dawit Bekele',
        position: 'Operations Director',
        image: '/team-operations.jpg',
        bio: 'Operations expert with extensive experience in supply chain management and project implementation.'
      }
    ]
  });

  const [saving, setSaving] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('About page updated successfully!');
      console.log('Saving about data:', aboutData);
    }, 1000);
  };

  const updateAboutData = (field: keyof AboutData, value: any) => {
    setAboutData(prev => ({ ...prev, [field]: value }));
  };

  const updateAchievement = (field: keyof AboutData['achievements'], value: string) => {
    setAboutData(prev => ({
      ...prev,
      achievements: { ...prev.achievements, [field]: value }
    }));
  };

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      year: new Date().getFullYear().toString(),
      title: '',
      description: '',
      achievement: ''
    };
    setEditingMilestone(newMilestone);
  };

  const saveMilestone = () => {
    if (!editingMilestone) return;
    
    const existingIndex = aboutData.milestones.findIndex(m => m.id === editingMilestone.id);
    if (existingIndex >= 0) {
      const newMilestones = [...aboutData.milestones];
      newMilestones[existingIndex] = editingMilestone;
      updateAboutData('milestones', newMilestones);
    } else {
      updateAboutData('milestones', [...aboutData.milestones, editingMilestone]);
    }
    
    setEditingMilestone(null);
  };

  const deleteMilestone = (id: string) => {
    if (confirm('Are you sure you want to delete this milestone?')) {
      updateAboutData('milestones', aboutData.milestones.filter(m => m.id !== id));
    }
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: '',
      position: '',
      image: '',
      bio: ''
    };
    setEditingTeamMember(newMember);
  };

  const saveTeamMember = () => {
    if (!editingTeamMember) return;
    
    const existingIndex = aboutData.teamMembers.findIndex(m => m.id === editingTeamMember.id);
    if (existingIndex >= 0) {
      const newMembers = [...aboutData.teamMembers];
      newMembers[existingIndex] = editingTeamMember;
      updateAboutData('teamMembers', newMembers);
    } else {
      updateAboutData('teamMembers', [...aboutData.teamMembers, editingTeamMember]);
    }
    
    setEditingTeamMember(null);
  };

  const deleteTeamMember = (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      updateAboutData('teamMembers', aboutData.teamMembers.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">About Page Editor</h2>
          <p className="text-gray-600 mt-1">Manage company information, mission, vision, and team</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => window.open('/about', '_blank')}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Mission & Vision */}
      <Card>
        <CardHeader>
          <CardTitle>Mission & Vision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              rows={3}
              value={aboutData.mission}
              onChange={(e) => updateAboutData('mission', e.target.value)}
              placeholder="Company mission statement"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              rows={3}
              value={aboutData.vision}
              onChange={(e) => updateAboutData('vision', e.target.value)}
              placeholder="Company vision statement"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              rows={2}
              value={aboutData.description}
              onChange={(e) => updateAboutData('description', e.target.value)}
              placeholder="Brief company description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Image</label>
            <div className="flex gap-2">
              <Input
                value={aboutData.teamImage}
                onChange={(e) => updateAboutData('teamImage', e.target.value)}
                placeholder="/team-image.jpg"
              />
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Key Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Clients Served</label>
              <Input
                value={aboutData.achievements.clients}
                onChange={(e) => updateAchievement('clients', e.target.value)}
                placeholder="36+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Projects Completed</label>
              <Input
                value={aboutData.achievements.projects}
                onChange={(e) => updateAchievement('projects', e.target.value)}
                placeholder="150+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
              <Input
                value={aboutData.achievements.experience}
                onChange={(e) => updateAchievement('experience', e.target.value)}
                placeholder="5+"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Satisfaction</label>
              <Input
                value={aboutData.achievements.satisfaction}
                onChange={(e) => updateAchievement('satisfaction', e.target.value)}
                placeholder="98%"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Company Timeline</CardTitle>
            <Button onClick={addMilestone} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {editingMilestone && (
            <Card className="mb-4 border-emerald-200">
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={editingMilestone.year}
                    onChange={(e) => setEditingMilestone({...editingMilestone, year: e.target.value})}
                    placeholder="Year"
                  />
                  <Input
                    value={editingMilestone.title}
                    onChange={(e) => setEditingMilestone({...editingMilestone, title: e.target.value})}
                    placeholder="Milestone title"
                  />
                </div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  rows={2}
                  value={editingMilestone.description}
                  onChange={(e) => setEditingMilestone({...editingMilestone, description: e.target.value})}
                  placeholder="Milestone description"
                />
                <Input
                  value={editingMilestone.achievement}
                  onChange={(e) => setEditingMilestone({...editingMilestone, achievement: e.target.value})}
                  placeholder="Key achievement"
                />
                <div className="flex gap-2">
                  <Button onClick={saveMilestone} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    Save
                  </Button>
                  <Button onClick={() => setEditingMilestone(null)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            {aboutData.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50">
                <div className="w-16 text-center">
                  <span className="font-bold text-emerald-600">{milestone.year}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                  <span className="text-xs text-emerald-600">{milestone.achievement}</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingMilestone(milestone)}
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMilestone(milestone.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Leadership Team</CardTitle>
            <Button onClick={addTeamMember} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {editingTeamMember && (
            <Card className="mb-4 border-emerald-200">
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={editingTeamMember.name}
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, name: e.target.value})}
                    placeholder="Full name"
                  />
                  <Input
                    value={editingTeamMember.position}
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, position: e.target.value})}
                    placeholder="Position/Title"
                  />
                </div>
                <div className="flex gap-2">
                  <Input
                    value={editingTeamMember.image}
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, image: e.target.value})}
                    placeholder="/team-member.jpg"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  rows={3}
                  value={editingTeamMember.bio}
                  onChange={(e) => setEditingTeamMember({...editingTeamMember, bio: e.target.value})}
                  placeholder="Professional biography"
                />
                <div className="flex gap-2">
                  <Button onClick={saveTeamMember} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    Save
                  </Button>
                  <Button onClick={() => setEditingTeamMember(null)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aboutData.teamMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Photo
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900">{member.name}</h4>
                  <p className="text-sm text-emerald-600 mb-2">{member.position}</p>
                  <p className="text-xs text-gray-600 line-clamp-3">{member.bio}</p>
                  <div className="flex gap-1 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingTeamMember(member)}
                      className="flex-1"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTeamMember(member.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
