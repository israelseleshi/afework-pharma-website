import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button"; // Not used but kept for completeness
import { Input } from "./ui/input"; // Not used but kept for completeness
import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "./Router";

export function Footer() {
  const { navigateTo } = useRouter();

  // Define variants outside the return for clarity and performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger children (columns) animation
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
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="relative z-10">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-6">
            {/* Company Info */}
            <motion.div
              className="sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6"
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
                  <h1 className="text-2xl font-bold text-white group-hover:text-green-500 transition-colors">Afework Pharma</h1>
                  <p className="text-sm text-gray-300">Medical Solutions Provider</p>
                </div>
              </button>

              <p className="text-gray-400 leading-relaxed">
                Delivering world-class medical equipment with comprehensive support services.
              </p>

              <motion.div
                className="flex space-x-4"
                variants={containerVariants} // Use container to stagger the social icons
              >
                {[
                  { Icon: Linkedin, href: "#", color: "hover:text-blue-400" },
                  { Icon: Facebook, href: "#", color: "hover:text-blue-500" },
                  { Icon: Twitter, href: "#", color: "hover:text-sky-400" }
                ].map(({ Icon, href, color }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    className={`text-gray-400 ${color} transition-colors`}
                    variants={socialVariants} // Apply item variant here
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
              className="space-y-4 sm:space-y-6"
              variants={columnVariants}
            >
              <h4 className="text-base sm:text-lg font-semibold text-white">Quick Links</h4>
              <nav className="space-y-2 sm:space-y-3">
                <button onClick={() => navigateTo('about')} className="block text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 cursor-pointer">About Us</button>
                <button onClick={() => navigateTo('solutions')} className="block text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 cursor-pointer">Our Solutions</button>
                <button onClick={() => navigateTo('projects')} className="block text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 cursor-pointer">Projects</button>
                <button onClick={() => navigateTo('contact')} className="block text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 cursor-pointer">Contact Us</button>
              </nav>
            </motion.div>

            {/* Solutions */}
            <motion.div
              className="space-y-4 sm:space-y-6"
              variants={columnVariants}
            >
              <h4 className="text-base sm:text-lg font-semibold text-white">Solutions</h4>
              <nav className="space-y-2 sm:space-y-3">
                <button onClick={() => navigateTo('solution-detail', 'Diagnostic & Laboratory Solutions')} className="block text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 cursor-pointer">Laboratory Equipment</button>
                <button onClick={() => navigateTo('solution-detail', 'Diagnostic Imaging & Radiology')} className="block text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 cursor-pointer">Medical Imaging</button>
                <button onClick={() => navigateTo('solution-detail', 'Critical Care & Operation Theatre')} className="block text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 cursor-pointer">Critical Care</button>
                <button onClick={() => navigateTo('solution-detail', 'Hospital Furniture & Patient Care')} className="block text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 cursor-pointer">Hospital Furniture</button>
                <button onClick={() => navigateTo('solution-detail', 'Medical Consumables & Reagents')} className="block text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 cursor-pointer">Medical Consumables</button>
              </nav>
            </motion.div>

            {/* Stay Connected */}
            <motion.div
              className="space-y-4 sm:space-y-6"
              variants={columnVariants}
            >
              <h4 className="text-base sm:text-lg font-semibold text-white">Stay Connected</h4>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-400">+251 929 092 353</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-400 break-all">afomphama13@gmail.com</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-400">Arada Subcity, Eribekentu Bridge, Woreda 08</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-gray-700/50" // Adjusted border color for contrast on dark bg
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }} // Increased delay
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} Afework Pharma. All rights reserved.
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-1">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-1">Terms of Service</a>
              <a href="#" className="hover:text-white transition-all duration-300 transform hover:translate-x-1">Cookie Policy</a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}