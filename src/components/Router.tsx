import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';

type Page = 'home' | 'about' | 'solutions' | 'projects' | 'contact' | 'solution-detail';

interface RouterContextType {
  currentPage: Page;
  currentSolution?: string;
  navigateTo: (page: Page, solution?: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function Router({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentSolution, setCurrentSolution] = useState<string>();

  // Initialize page from URL on load
  useEffect(() => {
    const path = window.location.pathname;
    const page = path.slice(1) as Page;
    if (['home', 'about', 'solutions', 'projects', 'contact', 'solution-detail'].includes(page)) {
      setCurrentPage(page || 'home');
    }
    
    // Handle solution detail from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const solution = urlParams.get('solution');
    if (solution) {
      setCurrentSolution(solution);
    }
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const page = path.slice(1) as Page;
      if (['home', 'about', 'solutions', 'projects', 'contact', 'solution-detail'].includes(page)) {
        setCurrentPage(page || 'home');
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const solution = urlParams.get('solution');
      setCurrentSolution(solution || undefined);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: Page, solution?: string) => {
    setCurrentPage(page);
    setCurrentSolution(solution);
    
    // Update URL
    let url = page === 'home' ? '/' : `/${page}`;
    if (solution && page === 'solution-detail') {
      url += `?solution=${encodeURIComponent(solution)}`;
    }
    
    window.history.pushState({}, '', url);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ currentPage, currentSolution, navigateTo }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
}