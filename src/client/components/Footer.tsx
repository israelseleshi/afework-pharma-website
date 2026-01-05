import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "./Router";
import { IMAGES, IMAGE_ALT_TEXT } from "../constants/images";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

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
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 py-6 sm:py-8 lg:py-10"
        >
          {/* Company Info */}
          <motion.div
            className="sm:col-span-2 lg:col-span-1 space-y-3"
            variants={columnVariants}
          >
            <Button
              variant="ghost"
              onClick={() => navigateTo('home')}
              className="p-0 h-auto justify-start group"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={IMAGES.logos.afeworkPharma} 
                  alt={IMAGE_ALT_TEXT.logos.afeworkPharma} 
                  className="h-10 w-auto"
                />
                <div className="text-left">
                  <h1 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">Afework Pharma</h1>
                  <p className="text-sm text-muted-foreground">Medical Solutions Provider</p>
                </div>
              </div>
            </Button>

            <p className="text-muted-foreground leading-relaxed">
              Delivering world-class medical equipment with comprehensive support services.
            </p>

          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-3"
            variants={columnVariants}
          >
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { label: "About Us", action: () => navigateTo('about') },
                { label: "Our Solutions", action: () => navigateTo('solutions') },
                { label: "Projects", action: () => navigateTo('projects') },
                { label: "Contact Us", action: () => navigateTo('contact') }
              ].map(({ label, action }, index) => (
                <div key={index}>
                  <button
                    onClick={action}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left w-full"
                  >
                    {label}
                  </button>
                </div>
              ))}
            </nav>
          </motion.div>

          {/* Solutions */}
          <motion.div
            className="space-y-3"
            variants={columnVariants}
          >
            <h4 className="text-lg font-semibold text-foreground">Solutions</h4>
            <nav className="space-y-2">
              {[
                { label: "Laboratory Equipment", action: () => navigateTo('solution-detail', 'Diagnostic & Laboratory Solutions') },
                { label: "Medical Imaging", action: () => navigateTo('solution-detail', 'Diagnostic Imaging & Radiology') },
                { label: "Critical Care", action: () => navigateTo('solution-detail', 'Critical Care & Operation Theatre') },
                { label: "Hospital Furniture", action: () => navigateTo('solution-detail', 'Hospital Furniture & Patient Care') },
                { label: "Medical Consumables", action: () => navigateTo('solution-detail', 'Medical Consumables & Reagents') }
              ].map(({ label, action }, index) => (
                <div key={index}>
                  <button
                    onClick={action}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left w-full"
                  >
                    {label}
                  </button>
                </div>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-3"
            variants={columnVariants}
          >
            <h4 className="text-lg font-semibold text-foreground">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-foreground">+251 911 238 129</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-foreground break-all">afomphama13@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">Arada Subcity, Eribekentu Bridge, Woreda 08</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <Separator />
      <motion.div
        className="bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3">
          {/* Top Row - Developer Attribution */}
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Website developed by</span>
              <div className="flex items-center gap-2">
                <ImageWithFallback
                  src="/nano-logo.jpg"
                  alt="Nano Computing Logo"
                  className="h-8 w-auto object-contain"
                />
                <a
                  href="https://nanocomputingict.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Nano Computing ICT Solutions
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Row - Copyright and Links */}
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} Afework Pharma. All rights reserved.</span>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
              {[
                { label: "Privacy Policy", action: () => navigateTo('privacy-policy') },
                { label: "Terms of Service", action: () => navigateTo('terms-of-service') },
                { label: "Cookie Policy", action: () => navigateTo('cookie-policy') }
              ].map(({ label, action }, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="hidden sm:inline">•</span>}
                  <Button
                    variant="link"
                    onClick={action}
                    className="h-auto p-0 text-muted-foreground hover:text-foreground text-sm"
                  >
                    {label}
                  </Button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}