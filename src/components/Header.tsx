import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
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
      <div className="max-w-7xl mx-auto pl-4 pr-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title - Far Left */}
          <button 
            onClick={() => handleNavigation('home')}
            className="flex items-center group -ml-2"
          >
            <div className="mr-2">
              <ImageWithFallback 
                src="/assets/logos/afework-pharma-logo.png"
                alt="Afework Pharma Logo"
                className="h-12 w-auto object-contain group-hover:opacity-80 transition-opacity"
              />
            </div>
            <div>
              <h1 className="text-lg text-gray-900 group-hover:text-green-600 transition-colors">Afework Pharma</h1>
              <p className="text-xs text-gray-500">Medical Solutions</p>
            </div>
          </button>

          {/* Desktop Navigation - Far Right */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('home')} 
              className={`relative text-lg transition-all duration-300 transform hover:scale-105 ${currentPage === 'home' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'} group`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform transition-transform duration-300 ${currentPage === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </button>
            <button 
              onClick={() => handleNavigation('solutions')} 
              className={`relative text-lg transition-all duration-300 transform hover:scale-105 ${currentPage === 'solutions' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'} group`}
            >
              Solutions
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform transition-transform duration-300 ${currentPage === 'solutions' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </button>
            <button 
              onClick={() => handleNavigation('projects')} 
              className={`relative text-lg transition-all duration-300 transform hover:scale-105 ${currentPage === 'projects' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'} group`}
            >
              Projects
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform transition-transform duration-300 ${currentPage === 'projects' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </button>
            <button 
              onClick={() => handleNavigation('about')} 
              className={`relative text-lg transition-all duration-300 transform hover:scale-105 ${currentPage === 'about' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'} group`}
            >
              About
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform transition-transform duration-300 ${currentPage === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </button>
            <button 
              onClick={() => handleNavigation('contact')} 
              className={`relative text-lg transition-all duration-300 transform hover:scale-105 ${currentPage === 'contact' ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'} group`}
            >
              Contact
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform transition-transform duration-300 ${currentPage === 'contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </button>
          </nav>

          {/* Mobile menu button - Far Right on Mobile */}
          <motion.button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation with Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="lg:hidden mt-6 pt-6 border-t border-gray-100 bg-white/95 backdrop-blur-md rounded-lg shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div 
                className="flex flex-col space-y-2 p-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.button 
                  onClick={() => handleNavigation('home')}
                  className={`text-left transition-all duration-300 py-3 px-4 rounded-lg ${currentPage === 'home' ? 'bg-green-50 text-green-600 border-l-4 border-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Home
                </motion.button>
                <motion.button 
                  onClick={() => handleNavigation('solutions')}
                  className={`text-left transition-all duration-300 py-3 px-4 rounded-lg ${currentPage === 'solutions' ? 'bg-green-50 text-green-600 border-l-4 border-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Solutions
                </motion.button>
                <motion.button 
                  onClick={() => handleNavigation('projects')}
                  className={`text-left transition-all duration-300 py-3 px-4 rounded-lg ${currentPage === 'projects' ? 'bg-green-50 text-green-600 border-l-4 border-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Projects
                </motion.button>
                <motion.button 
                  onClick={() => handleNavigation('about')}
                  className={`text-left transition-all duration-300 py-3 px-4 rounded-lg ${currentPage === 'about' ? 'bg-green-50 text-green-600 border-l-4 border-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  About
                </motion.button>
                <motion.button 
                  onClick={() => handleNavigation('contact')}
                  className={`text-left transition-all duration-300 py-3 px-4 rounded-lg ${currentPage === 'contact' ? 'bg-green-50 text-green-600 border-l-4 border-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Contact
                </motion.button>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}