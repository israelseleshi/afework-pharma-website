import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Router, useRouter } from "./components/Router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ContactPage } from "./pages/ContactPage";
import { SolutionDetailPage } from "./pages/SolutionDetailPage";

function AppContent() {
  const { currentPage } = useRouter();

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
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
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