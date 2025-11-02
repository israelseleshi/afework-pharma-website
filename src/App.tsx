import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Router, useRouter } from "./components/Router";
import { LoadingScreen } from "./components/LoadingScreen";
// import { ContentProvider } from "./contexts/ContentContext"; // Removed to prevent database loading
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ContactPage } from "./pages/ContactPage";
import { SolutionDetailPage } from "./pages/SolutionDetailPage";
import { CriticalCareOperationTheatrePage } from "./pages/CriticalCareOperationTheatrePage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboard } from "./pages/AdminDashboard";

function AppContent() {
  const { currentPage, currentSolution } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  // Only show loading screen on initial mount
  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    if (hasSeenLoading) {
      setIsLoading(false);
      setShowContent(true);
    } else {
      sessionStorage.setItem('hasSeenLoading', 'true');
    }
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
      case 'admin-login':
        return <AdminLoginPage />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  // Show loading screen first
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Don't show header/footer for admin pages
  if (currentPage === 'admin-login' || currentPage === 'admin-dashboard') {
    return renderPage();
  }

  // Main content with fade-in animation
  return (
    <div className={`min-h-screen bg-white transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
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
