import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Router, useRouter } from "./components/Router";
import { LoadingScreen } from "./components/LoadingScreen";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ContactPage } from "./pages/ContactPage";
import { SolutionDetailPage } from "./pages/SolutionDetailPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "./pages/TermsOfServicePage";
import { CookiePolicyPage } from "./pages/CookiePolicyPage";

function AppContent() {
  const { currentPage } = useRouter();
  // Initialize state with a function to avoid unnecessary re-renders
  const [loadingState, setLoadingState] = useState(() => {
    const hasSeenLoading = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('hasSeenLoading') : null;
    if (hasSeenLoading) {
      return { isLoading: false, showContent: true };
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('hasSeenLoading', 'true');
    }
    return { isLoading: true, showContent: false };
  });

  const handleLoadingComplete = React.useCallback(() => {
    setLoadingState(prev => ({ ...prev, isLoading: false }));
    // Small delay to ensure smooth transition
    const timer = setTimeout(
      () => setLoadingState(prev => ({ ...prev, showContent: true })),
      100
    );
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'solutions':
        return <SolutionsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'contact':
        return <ContactPage />;
      case 'solution-detail':
        return <SolutionDetailPage />;
      // Admin cases removed
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'terms-of-service':
        return <TermsOfServicePage />;
      case 'cookie-policy':
        return <CookiePolicyPage />;
      default:
        return <HomePage />;
    }
  };

  // Show loading screen first
  if (loadingState.isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Main content with fade-in animation
  return (
    <div className={`min-h-screen bg-white transition-opacity duration-500 ${loadingState.showContent ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
