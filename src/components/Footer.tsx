import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "./Router";

export function Footer() {
  const { navigateTo } = useRouter();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <footer className="bg-gray-50 text-gray-900 border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <motion.div 
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            variants={columnVariants}
          >
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center group cursor-pointer"
            >
              <div className="mr-3">
                <ImageWithFallback 
                  src="/afework-pharma-logo.png"
                  alt="Afework Pharma Logo"
                  className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">Afework Pharma</h1>
                <p className="text-sm text-gray-500">Medical Solutions Provider</p>
              </div>
            </button>
            
            <p className="text-gray-600 leading-relaxed">
              Delivering world-class medical equipment with comprehensive support services.
            </p>
            
            <motion.div 
              className="flex space-x-4"
              variants={socialVariants}
            >
              {[
                { Icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                { Icon: Facebook, href: "#", color: "hover:text-blue-500" },
                { Icon: Twitter, href: "#", color: "hover:text-sky-400" }
              ].map(({ Icon, href, color }, index) => (
                <motion.a 
                  key={index}
                  href={href} 
                  className={`text-gray-600 ${color} transition-colors`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-6"
            variants={columnVariants}
          >
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <nav className="space-y-3">
              <button onClick={() => navigateTo('about')} className="block text-gray-600 hover:text-green-600 transition-colors cursor-pointer">About Us</button>
              <button onClick={() => navigateTo('solutions')} className="block text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Our Solutions</button>
              <button onClick={() => navigateTo('projects')} className="block text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Projects</button>
              <button onClick={() => navigateTo('contact')} className="block text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Contact Us</button>
            </nav>
          </motion.div>

          {/* Solutions */}
          <motion.div 
            className="space-y-6"
            variants={columnVariants}
          >
            <h4 className="text-lg font-semibold text-gray-900">Solutions</h4>
            <nav className="space-y-3">
              <button onClick={() => navigateTo('solution-detail', 'Diagnostic & Laboratory Solutions')} className="block text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Laboratory Equipment</button>
              <button onClick={() => navigateTo('solution-detail', 'Diagnostic Imaging & Radiology')} className="block text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Medical Imaging</button>
              <button onClick={() => navigateTo('solution-detail', 'Critical Care & Operation Theatre')} className="block text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Critical Care</button>
              <button onClick={() => navigateTo('solution-detail', 'Hospital Furniture & Patient Care')} className="block text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Hospital Furniture</button>
              <button onClick={() => navigateTo('solution-detail', 'Medical Consumables & Reagents')} className="block text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Medical Consumables</button>
            </nav>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div 
            className="space-y-6"
            variants={columnVariants}
          >
            <h4 className="text-lg font-semibold text-gray-900">Stay Connected</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="text-gray-600">+251 929 092 353</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-600" />
                <span className="text-gray-600">afomphama13@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1" />
                <span className="text-gray-600">Arada Subcity, Eribekentu Bridge, Woreda 08</span>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        className="border-t border-gray-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Afework Pharma. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}