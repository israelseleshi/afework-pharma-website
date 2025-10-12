import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Save, Upload, Trash2, Eye, Search, Filter, Grid, List, Image as ImageIcon, File } from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video';
  size: string;
  uploadDate: string;
  category: string;
  alt: string;
  description: string;
}

export function MediaEditor() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'afework-pharma-logo.png',
      url: '/afework-pharma-logo.png',
      type: 'image',
      size: '45 KB',
      uploadDate: '2024-01-15',
      category: 'branding',
      alt: 'Afework Pharma Logo',
      description: 'Main company logo'
    },
    {
      id: '2',
      name: 'diagnostic-laboratory-solutions.jpg',
      url: '/diagnostic-&-laboratory-solutions.jpg',
      type: 'image',
      size: '234 KB',
      uploadDate: '2024-01-20',
      category: 'solutions',
      alt: 'Diagnostic Laboratory Equipment',
      description: 'Laboratory equipment showcase'
    },
    {
      id: '3',
      name: 'diagnostic-imaging-radiology.jpg',
      url: '/diagnostic-imaging-&-radiology.jpg',
      type: 'image',
      size: '189 KB',
      uploadDate: '2024-01-20',
      category: 'solutions',
      alt: 'Medical Imaging Equipment',
      description: 'Radiology and imaging solutions'
    },
    {
      id: '4',
      name: 'critical-care-operation-theatre.jpg',
      url: '/critical-care-&-operation-theatre.jpg',
      type: 'image',
      size: '267 KB',
      uploadDate: '2024-01-20',
      category: 'solutions',
      alt: 'Critical Care Equipment',
      description: 'ICU and operation theatre equipment'
    },
    {
      id: '5',
      name: 'hospital-furniture-patient-care.jpg',
      url: '/hospital-furniture-&-patient-care.jpg',
      type: 'image',
      size: '198 KB',
      uploadDate: '2024-01-20',
      category: 'solutions',
      alt: 'Hospital Furniture',
      description: 'Patient care and hospital furniture'
    },
    {
      id: '6',
      name: 'afework-team-image.jpg',
      url: '/afewrork-team-image.jpg',
      type: 'image',
      size: '312 KB',
      uploadDate: '2024-01-25',
      category: 'team',
      alt: 'Afework Pharma Team',
      description: 'Company team photo'
    }
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { value: 'all', label: 'All Files' },
    { value: 'branding', label: 'Branding' },
    { value: 'solutions', label: 'Solutions' },
    { value: 'team', label: 'Team' },
    { value: 'projects', label: 'Projects' },
    { value: 'documents', label: 'Documents' }
  ];

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      Array.from(files).forEach((file, index) => {
        const newFile: MediaFile = {
          id: (Date.now() + index).toString(),
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type.startsWith('image/') ? 'image' : 'document',
          size: `${Math.round(file.size / 1024)} KB`,
          uploadDate: new Date().toISOString().split('T')[0],
          category: 'uncategorized',
          alt: file.name.replace(/\.[^/.]+$/, ''),
          description: ''
        };
        setMediaFiles(prev => [...prev, newFile]);
      });
      setIsUploading(false);
      alert('Files uploaded successfully!');
    }, 2000);
  };

  const handleDeleteFile = (id: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setMediaFiles(prev => prev.filter(file => file.id !== id));
      if (selectedFile?.id === id) {
        setSelectedFile(null);
      }
    }
  };

  const handleUpdateFile = (updatedFile: MediaFile) => {
    setMediaFiles(prev => prev.map(file => 
      file.id === updatedFile.id ? updatedFile : file
    ));
    setSelectedFile(updatedFile);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'video': return <File className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
          <p className="text-gray-600 mt-1">Upload and manage images, documents, and media files</p>
        </div>
        <div className="flex gap-3">
          <input
            type="file"
            multiple
            accept="image/*,application/pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button disabled={isUploading} className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </label>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Media Files */}
        <div className="lg:col-span-2">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <Card 
                  key={file.id} 
                  className={`cursor-pointer hover:shadow-lg transition-shadow ${
                    selectedFile?.id === file.id ? 'ring-2 ring-emerald-500' : ''
                  }`}
                  onClick={() => setSelectedFile(file)}
                >
                  <CardContent className="p-3">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
                      {file.type === 'image' ? (
                        <img 
                          src={file.url} 
                          alt={file.alt}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium text-sm text-gray-900 truncate">{file.name}</h4>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredFiles.map((file) => (
                    <div 
                      key={file.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedFile?.id === file.id ? 'bg-emerald-50' : ''
                      }`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {file.type === 'image' ? (
                            <img 
                              src={file.url} 
                              alt={file.alt}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            getFileIcon(file.type)
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{file.name}</h4>
                          <p className="text-sm text-gray-500">{file.description || 'No description'}</p>
                          <div className="flex gap-4 text-xs text-gray-400 mt-1">
                            <span>{file.size}</span>
                            <span>{file.uploadDate}</span>
                            <span className="capitalize">{file.category}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.id);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {filteredFiles.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
                <p className="text-gray-600">Upload some files or adjust your search criteria.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* File Details Panel */}
        <div>
          {selectedFile ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  File Details
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(selectedFile.url)}
                  >
                    Copy URL
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFile.type === 'image' && (
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={selectedFile.url} 
                      alt={selectedFile.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Name</label>
                  <Input
                    value={selectedFile.name}
                    onChange={(e) => handleUpdateFile({...selectedFile, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                  <Input
                    value={selectedFile.alt}
                    onChange={(e) => handleUpdateFile({...selectedFile, alt: e.target.value})}
                    placeholder="Describe the image"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows={3}
                    value={selectedFile.description}
                    onChange={(e) => handleUpdateFile({...selectedFile, description: e.target.value})}
                    placeholder="File description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedFile.category}
                    onChange={(e) => handleUpdateFile({...selectedFile, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="branding">Branding</option>
                    <option value="solutions">Solutions</option>
                    <option value="team">Team</option>
                    <option value="projects">Projects</option>
                    <option value="documents">Documents</option>
                    <option value="uncategorized">Uncategorized</option>
                  </select>
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                  <div>Size: {selectedFile.size}</div>
                  <div>Type: {selectedFile.type}</div>
                  <div>Uploaded: {selectedFile.uploadDate}</div>
                  <div className="break-all">URL: {selectedFile.url}</div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(selectedFile.url, '_blank')}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteFile(selectedFile.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a file</h3>
                <p className="text-gray-600">Click on a file to view and edit its details.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
