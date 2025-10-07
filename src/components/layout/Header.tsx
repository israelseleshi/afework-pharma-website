import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Menu, Phone, Mail } from "lucide-react";
import { useRouter } from "../Router";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigateTo, currentPage } = useRouter();

  const handleNavigation = (page: 'home' | 'about' | 'solutions' | 'projects' | 'contact') => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  return (
    <header>
      {/* Main navigation */}
      <nav className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('home')}
              className="logo"
              style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: '#3b82f6', 
                color: 'white', 
                borderRadius: '8px', 
                marginRight: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                A
              </div>
              <div>
                <h1 style={{ fontSize: '20px', color: '#1a202c', margin: 0 }}>Afework Pharma</h1>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Medical Solutions</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <button 
              onClick={() => handleNavigation('home')} 
              className={`transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('about')} 
              className={`transition-colors ${currentPage === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('solutions')} 
              className={`transition-colors ${currentPage === 'solutions' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Solutions
            </button>
            <button 
              onClick={() => handleNavigation('projects')} 
              className={`transition-colors ${currentPage === 'projects' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavigation('contact')} 
              className={`transition-colors ${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={() => handleNavigation('contact')}
              className="hidden md:inline-flex"
            >
              Get Quote
            </Button>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container">
          <nav className="lg:hidden mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('home')}
                className={`text-left transition-colors ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className={`text-left transition-colors ${currentPage === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('solutions')}
                className={`text-left transition-colors ${currentPage === 'solutions' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Solutions
              </button>
              <button 
                onClick={() => handleNavigation('projects')}
                className={`text-left transition-colors ${currentPage === 'projects' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Projects
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className={`text-left transition-colors ${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
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
        </div>
      )}
    </header>
  );
}