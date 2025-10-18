import { useState, useEffect, useCallback } from 'react';

interface CMSSection {
  id: number;
  section_type: 'hero' | 'value_proposition' | 'solutions_overview' | 'featured_projects';
  section_title: string;
  section_subtitle: string;
  section_description: string;
  content_data: any;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface CMSResponse {
  success: boolean;
  data?: CMSSection[];
  error?: string;
}

export function useCMSContent() {
  const [content, setContent] = useState<CMSSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = '/api/cms/home-content.php';

  // Fetch all content
  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching CMS content from:', API_BASE_URL);
      const response = await fetch(API_BASE_URL);
      console.log('📡 API Response status:', response.status);
      
      // Check if we got HTML instead of JSON (indicates PHP file served as static)
      const contentType = response.headers.get('content-type');
      const responseText = await response.text();
      
      console.log('📋 Response content-type:', contentType);
      console.log('📄 Response preview:', responseText.substring(0, 100));
      
      // If we get HTML/PHP code instead of JSON, it means backend is not running
      if (contentType?.includes('text/html') || responseText.startsWith('<?php')) {
        console.log('⚠️ Backend not available, using fallback data');
        setError('Backend server not running - using default content');
        // Set empty content to trigger fallback in getFormattedContent
        setContent([]);
        return;
      }
      
      const data: CMSResponse = JSON.parse(responseText);
      console.log('📊 API Response data:', data);
      
      if (data.success && data.data) {
        console.log('✅ CMS content loaded successfully:', data.data.length, 'sections');
        setContent(data.data);
      } else {
        console.log('❌ CMS content failed:', data.error);
        setError(data.error || 'Failed to fetch content');
      }
    } catch (err) {
      console.log('❌ Network error:', (err as Error).message);
      setError('Network error: ' + (err as Error).message);
      // Set empty content to trigger fallback
      setContent([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update section content
  const updateSection = useCallback(async (
    sectionType: string,
    sectionTitle: string,
    sectionSubtitle: string,
    sectionDescription: string,
    contentData: any
  ) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section_type: sectionType,
          section_title: sectionTitle,
          section_subtitle: sectionSubtitle,
          section_description: sectionDescription,
          content_data: contentData
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh content after successful update
        await fetchContent();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Network error: ' + (err as Error).message };
    }
  }, [fetchContent]);

  // Get content by section type
  const getContentByType = useCallback((sectionType: string) => {
    return content.find(section => section.section_type === sectionType);
  }, [content]);

  // Get formatted content for components
  const getFormattedContent = useCallback(() => {
    const heroSection = getContentByType('hero');
    const valuePropositionSection = getContentByType('value_proposition');
    const solutionsSection = getContentByType('solutions_overview');
    const projectsSection = getContentByType('featured_projects');

    return {
      // Hero Section - Database first, fallback second
      heroTitle: heroSection?.section_title || 'Advanced Medical Solutions for a Healthier Zimbabwe',
      heroSubtitle: heroSection?.section_subtitle || 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation.',
      heroStats: heroSection?.content_data?.heroStats || [
        { number: '45', suffix: '+', label: 'IVD Units Deployed' },
        { number: '36', suffix: '+', label: 'Healthcare Facilities' },
        { number: '5', suffix: '+', label: 'Years Experience' }
      ],

      // Value Proposition Section
      valuePropositionTitle: valuePropositionSection?.section_title || 'Why Choose Afework Pharma?',
      valuePropositionSubtitle: valuePropositionSection?.section_subtitle || 'We are more than a supplier; we are your strategic partner in advancing healthcare in Ethiopia.',
      valuePropositions: valuePropositionSection?.content_data?.valuePropositions || [
        {
          icon: 'Microscope',
          title: 'Cutting-Edge Products',
          description: 'Sourcing certified, state-of-the-art technology from global leaders in medical equipment manufacturing.'
        },
        {
          icon: 'Users',
          title: 'End-to-End Support',
          description: 'From installation and training to 24/7 technical support, we ensure your success at every step.'
        },
        {
          icon: 'MapPin',
          title: 'Nationwide Reach',
          description: 'Proven capability in executing complex, multi-site projects across Ethiopia with local expertise.'
        },
        {
          icon: 'Shield',
          title: 'Regulatory Compliance',
          description: 'Full regulatory and logistics management ensuring compliance with international and local standards.'
        }
      ],

      // Solutions Overview Section
      solutionsTitle: solutionsSection?.section_title || 'Comprehensive Medical Solutions',
      solutionsSubtitle: solutionsSection?.section_subtitle || 'From diagnostic equipment to complete hospital setups, we provide end-to-end medical technology solutions tailored to Ethiopian healthcare needs.',
      solutions: solutionsSection?.content_data?.solutions || [],

      // Featured Projects Section
      featuredProjectsTitle: projectsSection?.section_title || 'Proven Success in Critical Projects',
      featuredProjectsSubtitle: projectsSection?.section_subtitle || 'Our track record speaks for itself. From emergency deployments to comprehensive hospital modernizations, we deliver excellence when it matters most.',
      featuredProjects: projectsSection?.content_data?.featuredProjects || []
    };
  }, [content, getContentByType]);

  // Initial fetch
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    content,
    loading,
    error,
    fetchContent,
    updateSection,
    getContentByType,
    getFormattedContent
  };
}
