import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useRouter } from "./Router";
import { IMAGES, IMAGE_ALT_TEXT } from "../constants/images";
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
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200 hidden lg:block">
        <div className="w-full px-4 lg:px-6 py-2">
          <div className="flex justify-between items-center text-sm" style={{fontFamily: 'Geist Sans, sans-serif'}}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>+251 929 092 353</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>afomphama13@gmail.com</span>
              </div>
            </div>
            <div className="text-gray-500">
              Serving Ethiopia's Healthcare Since 2019
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="w-full px-4 lg:px-6">
        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden">
          {/* Logo and Menu button on same row */}
          <div className="flex items-center justify-between py-4">
            <button 
              onClick={() => handleNavigation('home')}
              className="flex items-center space-x-4 group"
            >
              <ImageWithFallback 
                src={IMAGES.logos.afeworkPharma} 
                alt={IMAGE_ALT_TEXT.logos.afeworkPharma} 
                className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity"
              />
              <div className="text-left">
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors" style={{letterSpacing: '-0.02em', fontFamily: 'Geist Sans, sans-serif'}}>Afework Pharma</h1>
                <p className="text-xs text-gray-500" style={{letterSpacing: '-0.02em', fontFamily: 'Geist Sans, sans-serif'}}>Medical Solutions</p>
              </div>
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden lg:flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation('home')}
            className="flex items-center space-x-4 group"
          >
            <ImageWithFallback 
              src={IMAGES.logos.afeworkPharma} 
              alt={IMAGE_ALT_TEXT.logos.afeworkPharma} 
              className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors" style={{letterSpacing: '-0.02em', fontFamily: 'Geist Sans, sans-serif'}}>Afework Pharma</h1>
              <p className="text-xs text-gray-500" style={{letterSpacing: '-0.02em', fontFamily: 'Geist Sans, sans-serif'}}>Medical Solutions</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('home')}
              className={`text-base transition-colors hover:text-green-400 ${
                currentPage === 'home' ? 'text-green-600' : 'text-gray-700'
              }`}
              style={{fontFamily: 'Geist Sans, sans-serif'}}
            >
              Home
            </button>

            <button 
              onClick={() => handleNavigation('solutions')}
              className={`text-base transition-colors hover:text-green-600 ${
                currentPage === 'solutions' ? 'text-green-600' : 'text-gray-700'
              }`}
              style={{fontFamily: 'Geist Sans, sans-serif'}}
            >
              Solutions
            </button>

            <button 
              onClick={() => handleNavigation('projects')}
              className={`text-base transition-colors hover:text-green-600 ${
                currentPage === 'projects' ? 'text-green-600' : 'text-gray-700'
              }`}
              style={{fontFamily: 'Geist Sans, sans-serif'}}
            >
              Projects
            </button>

            <button 
              onClick={() => handleNavigation('about')}
              className={`text-base transition-colors hover:text-green-600 ${
                currentPage === 'about' ? 'text-green-600' : 'text-gray-700'
              }`}
              style={{fontFamily: 'Geist Sans, sans-serif'}}
            >
              About
            </button>

            <button 
              onClick={() => handleNavigation('contact')}
              className="bg-green-500 text-white px-6 py-2.5 rounded-lg text-base font-semibold hover:bg-green-600 transition-colors border-2 border-green-500"
              style={{fontFamily: 'Geist Sans, sans-serif'}}
            >
              Contact Us
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 py-4"
            >
              <div className="w-full px-4">
                <div className="space-y-2">
                <button 
                  onClick={() => handleNavigation('home')}
                  className={`block w-full text-left px-4 py-3 text-base rounded-lg transition-colors ${
                    currentPage === 'home' 
                      ? 'bg-green-50 text-green-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{fontFamily: 'Geist Sans, sans-serif'}}
                >
                  Home
                </button>

                <button 
                  onClick={() => handleNavigation('solutions')}
                  className={`block w-full text-left px-4 py-3 text-base rounded-lg transition-colors ${
                    currentPage === 'solutions' 
                      ? 'bg-green-50 text-green-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{fontFamily: 'Geist Sans, sans-serif'}}
                >
                  Solutions
                </button>

                <button 
                  onClick={() => handleNavigation('projects')}
                  className={`block w-full text-left px-4 py-3 text-base rounded-lg transition-colors ${
                    currentPage === 'projects' 
                      ? 'bg-green-50 text-green-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{fontFamily: 'Geist Sans, sans-serif'}}
                >
                  Projects
                </button>

                <button 
                  onClick={() => handleNavigation('about')}
                  className={`block w-full text-left px-4 py-3 text-base rounded-lg transition-colors ${
                    currentPage === 'about' 
                      ? 'bg-green-50 text-green-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{fontFamily: 'Geist Sans, sans-serif'}}
                >
                  About
                </button>

                <button 
                  onClick={() => handleNavigation('contact')}
                  className="block w-full text-left px-4 py-3 text-base font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors border-2 border-green-500"
                  style={{fontFamily: 'Geist Sans, sans-serif'}}
                >
                  Contact Us
                </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}