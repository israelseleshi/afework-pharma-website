import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, Phone, Mail } from "lucide-react";
import { useRouter } from "./Router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigateTo, currentPage } = useRouter();

  const handleNavigation = (page: 'home' | 'about' | 'solutions' | 'projects' | 'contact') => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('home')}
              className="flex items-center group"
            >
              <div className="mr-4">
                <ImageWithFallback 
                  src="/afework-pharma-logo.png"
                  alt="Afework Pharma Logo"
                  className="h-12 w-auto object-contain group-hover:opacity-80 transition-opacity"
                />
              </div>
              <div>
                <h1 className="text-xl text-gray-900 group-hover:text-green-600 transition-colors">Afework Pharma</h1>
                <p className="text-sm text-gray-500">Medical Solutions</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('home')} 
              className={`transition-colors ${currentPage === 'home' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('solutions')} 
              className={`transition-colors ${currentPage === 'solutions' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            >
              Solutions
            </button>
            <button 
              onClick={() => handleNavigation('projects')} 
              className={`transition-colors ${currentPage === 'projects' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavigation('about')} 
              className={`transition-colors ${currentPage === 'about' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('contact')} 
              className={`transition-colors ${currentPage === 'contact' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('home')}
                className={`text-left transition-colors ${currentPage === 'home' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('solutions')}
                className={`text-left transition-colors ${currentPage === 'solutions' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
              >
                Solutions
              </button>
              <button 
                onClick={() => handleNavigation('projects')}
                className={`text-left transition-colors ${currentPage === 'projects' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
              >
                Projects
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className={`text-left transition-colors ${currentPage === 'about' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className={`text-left transition-colors ${currentPage === 'contact' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
              >
                Contact
              </button>
              <Button 
                onClick={() => handleNavigation('contact')}
                className="w-full mt-4"
              >
                Get Quote
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}