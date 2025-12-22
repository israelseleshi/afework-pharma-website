import { useContent as useContentContext, ContentValue } from '../contexts/ContentContext';

export interface ContentHook {
  getContent: (sectionKey: string, fallback?: any) => any;
  getTextContent: (sectionKey: string, fallback?: string) => string;
  getJsonContent: (sectionKey: string, fallback?: any) => any;
  getImageContent: (sectionKey: string, fallback?: string) => string;
  isLoading: boolean;
  error: string | null;
  refreshContent: () => Promise<void>;
}

export function useContent(): ContentHook {
  const { content, loading, error, fetchContent } = useContentContext();

  const getContent = (sectionKey: string, fallback?: any) => {
    const contentItem = content[sectionKey];
    if (!contentItem) {
      console.warn(`Content section '${sectionKey}' not found, using fallback`);
      return fallback;
    }
    return contentItem.value;
  };

  const getTextContent = (sectionKey: string, fallback: string = '') => {
    const contentItem = content[sectionKey];
    if (!contentItem || contentItem.type !== 'text') {
      console.warn(`Text content '${sectionKey}' not found, using fallback`);
      return fallback;
    }
    return contentItem.value;
  };

  const getJsonContent = (sectionKey: string, fallback: any = null) => {
    const contentItem = content[sectionKey];
    if (!contentItem || contentItem.type !== 'json') {
      console.warn(`JSON content '${sectionKey}' not found, using fallback`);
      return fallback;
    }
    return contentItem.value;
  };

  const getImageContent = (sectionKey: string, fallback: string = '') => {
    const contentItem = content[sectionKey];
    if (!contentItem || contentItem.type !== 'image') {
      console.warn(`Image content '${sectionKey}' not found, using fallback`);
      return fallback;
    }
    return contentItem.value;
  };

  return {
    getContent,
    getTextContent,
    getJsonContent,
    getImageContent,
    isLoading: loading,
    error,
    refreshContent: fetchContent
  };
}

