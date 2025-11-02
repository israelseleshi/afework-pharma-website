import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Beaker, Scan, Heart, Bed, Pill, Search, ChevronDown, ChevronUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "./Router";

export function SolutionsOverview() {
  const { navigateTo } = useRouter();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };
  
  const solutions = [
    {
      icon: Beaker,
      title: "Diagnostic & Laboratory Solutions",
      description: "Complete IVD systems including chemistry analyzers, hematology equipment, and laboratory infrastructure.",
      image: "/assets/images/diagnostic-&-laboratory-solutions.jpg",
      products: ["Chemistry Analyzers", "Hematology Systems", "Microscopes", "Lab Furniture"]
    },
    {
      icon: Scan,
      title: "Diagnostic Imaging & Radiology",
      description: "Advanced imaging solutions from digital X-ray to MRI systems with full installation support.",
      image: "/assets/images/diagnostic-imaging-&-radiology.jpg",
      products: ["Digital X-Ray", "Ultrasound", "CT Scanners", "MRI Systems"]
    },
    {
      icon: Heart,
      title: "Critical Care & Operation Theatre",
      description: "Life-saving equipment for ICUs and operating rooms including ventilators and surgical instruments.",
      image: "/assets/images/critical-care-&-operation-theatre.jpg",
      products: ["Ventilators", "Patient Monitors", "Surgical Tables", "Anesthesia Machines"]
    },
    {
      icon: Bed,
      title: "Hospital Furniture & Patient Care",
      description: "Ergonomic hospital furniture and patient care equipment designed for comfort and functionality.",
      image: "/assets/images/hospital-furniture-&-patient-care.jpg",
      products: ["Hospital Beds", "Patient Chairs", "Medical Trolleys", "Storage Solutions"]
    },
    {
      icon: Pill,
      title: "Medical Consumables & Reagents",
      description: "Quality reagents and medical consumables ensuring reliable test results and patient safety.",
      image: "https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwZXF1aXBtZW50JTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc1OTgyOTAzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Lab Reagents", "Test Kits", "Disposables", "Quality Controls"]
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50/10 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          className="text-left mb-12 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Our Medical Solutions
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl leading-relaxed">
            From diagnostic equipment to complete hospital setups, we provide end-to-end 
            medical technology solutions tailored to Ethiopian healthcare needs.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <motion.div 
                key={index}
                className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer relative z-10"
                variants={cardVariants}
                whileHover={{ 
                  y: -12,
                  scale: 1.03,
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.7), inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                style={{
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)"
                }}
                onClick={() => navigateTo('solution-detail', solution.title)}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback 
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-lg border border-white/40 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)",
                    boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)"
                  }}>
                    <IconComponent className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-4 sm:p-6 space-y-4 bg-white/10 backdrop-blur-lg border-t border-white/20" style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)"
                }}>
                  <button 
                    onClick={() => navigateTo('solution-detail', solution.title)}
                    className="text-left w-full"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-green-600 transition-colors cursor-pointer hover:text-green-600 group-hover:scale-105 transform transition-transform duration-300">
                      {solution.title}
                    </h3>
                  </button>
                  
                  <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300 leading-relaxed">
                    {solution.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-900 group-hover:text-green-700 transition-colors duration-300">Key Products:</h4>
                    <div className="flex flex-wrap gap-2">
                      {solution.products.map((product, productIndex) => (
                        <span 
                          key={productIndex}
                          className="px-2 py-1 sm:px-3 bg-emerald-500/20 text-emerald-800 rounded-full text-xs sm:text-sm border border-emerald-300/30 group-hover:bg-emerald-500/30 group-hover:border-emerald-300/50 transition-all duration-300 shadow-sm backdrop-blur-sm"
                          style={{
                            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)"
                          }}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => navigateTo('solutions')}
                    className="w-full justify-between text-green-700 hover:text-white mt-4 border border-green-300/30 hover:border-green-500/50 transition-all duration-300 shadow-sm hover:shadow-md group-hover:scale-105 transform backdrop-blur-sm"
                    style={{
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)",
                      backdropFilter: "blur(8px)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(16, 185, 129, 0.6) 100%)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)";
                    }}
                  >
                    View Solutions
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}