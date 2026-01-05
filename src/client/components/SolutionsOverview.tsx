import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Beaker, Scan, Heart, Bed, Pill, Check, Shield, Zap, Users, Clock, Award, Target, TrendingUp, Lightbulb, ArrowLeft, ArrowRight as ArrowRightIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "./Router";
import { IMAGES, IMAGE_ALT_TEXT } from "../constants/images";

export function SolutionsOverview() {
  const { navigateTo } = useRouter();
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const totalSolutions = 5;
  const maxIndex = totalSolutions - 1;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSolutionIndex(index);
  };

  const nextSolution = () => {
    setCurrentSolutionIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSolution = () => {
    setCurrentSolutionIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-advance solutions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSolutionIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  const solutions = [
    {
      icon: Beaker,
      title: "Diagnostic & Laboratory Solutions",
      description: "Complete laboratory ecosystems featuring automated chemistry analyzers, hematology systems, and comprehensive IVD solutions tailored for Ethiopian healthcare facilities.",
      image: IMAGES.solutions.diagnosticLab,
      alt: IMAGE_ALT_TEXT.hero.diagnosticLab,
      products: [
        "Medium to high-end fully automated clinical chemistry analyzers",
        "Fully automated hormone (CLIA) analyzers",
        "High-quality hematology analyzers (3-Differential, 5-differential, 6-Differential)",
        "Fully automated Blood culture system and microbiology analyzers",
        "Integrated Chemistry-electrolite-hormone analyzer",
        "Integrated Hematology with slide maker, stainer and reader"
      ],
      benefits: [
        { icon: TrendingUp, title: "Increase Patient Throughput", description: "Automated workflows boost efficiency by 60%" },
        { icon: Shield, title: "Reduce Diagnostic Errors", description: "85% reduction with reliable results" },
        { icon: Users, title: "Accelerate Staff Competency", description: "Comprehensive training programs" },
        { icon: Clock, title: "Minimize Equipment Downtime", description: "24/7 technical support available" }
      ]
    },
    {
      icon: Pill,
      title: "Medical Consumables & Reagents",
      description: "Quality medical consumables and reagents ensuring reliable test results and optimal patient safety standards across Ethiopian healthcare facilities.",
      image: IMAGES.solutions.medicalConsumables,
      alt: IMAGE_ALT_TEXT.hero.medicalConsumables,
      products: ["Lab Reagents", "Rapid Test Kits", "Medical Disposables", "Quality Controls", "Calibration Materials"],
      benefits: [
        { icon: Award, title: "Ensure Test Accuracy", description: "Consistent quality standards" },
        { icon: Shield, title: "Meet International Standards", description: "Full regulatory compliance" },
        { icon: TrendingUp, title: "Reduce Operating Costs", description: "Bulk supply efficiency" },
        { icon: Clock, title: "Prevent Stock-Outs", description: "Reliable supply chain" }
      ]
    },
    {
      icon: Scan,
      title: "Diagnostic Imaging & Radiology",
      description: "Advanced imaging solutions from digital radiography to high-end MRI systems, addressing Ethiopia's growing need for accurate diagnostic imaging capabilities.",
      image: IMAGES.products.mindray.dc70UltrasoundSystem,
      alt: IMAGE_ALT_TEXT.products.mindray.dc70UltrasoundSystem,
      products: ["Digital X-Ray Systems", "Ultrasound Machines", "CT Scanners", "MRI Systems", "PACS Solutions"],
      benefits: [
        { icon: Target, title: "Eliminate Film Costs", description: "Complete digital workflow solution" },
        { icon: Award, title: "Improve Diagnosis Accuracy", description: "Enhanced image quality for precision" },
        { icon: Shield, title: "Advanced Radiation Safety", description: "Protect patients and staff" },
        { icon: Zap, title: "Enable Remote Consultation", description: "Cloud integration capabilities" }
      ]
    },
    {
      icon: Heart,
      title: "Critical Care & Operation Theatre",
      description: "Life-saving equipment for intensive care units and operating rooms, ensuring optimal patient outcomes during Ethiopia's most critical medical procedures.",
      image: IMAGES.products.mindray.beneventA3Ventilator,
      alt: IMAGE_ALT_TEXT.products.mindray.beneventA3Ventilator,
      products: ["ICU Ventilators", "Multi-Parameter Monitors", "Surgical Tables", "Anesthesia Machines", "OR Integration Systems"],
      benefits: [
        { icon: Heart, title: "Save More Lives", description: "Advanced life-support technology" },
        { icon: Shield, title: "Prevent Complications", description: "Real-time patient monitoring" },
        { icon: Award, title: "Enhance Surgical Outcomes", description: "Precision equipment for better results" },
        { icon: Clock, title: "Reduce Response Time", description: "Integrated emergency support" }
      ]
    },
    {
      icon: Bed,
      title: "Hospital Furniture & Patient Care",
      description: "Ergonomic hospital furniture and patient care equipment designed to improve patient comfort while enhancing healthcare worker efficiency in Ethiopian hospitals.",
      image: IMAGES.solutions.hospitalFurniture,
      alt: IMAGE_ALT_TEXT.hero.hospitalFurniture,
      products: ["Electric Hospital Beds", "Patient Transfer Chairs", "Medical Trolleys", "Storage Solutions", "Waiting Area Furniture"],
      benefits: [
        { icon: Heart, title: "Improve Patient Recovery", description: "Enhanced comfort features" },
        { icon: TrendingUp, title: "Boost Staff Productivity", description: "Ergonomic design solutions" },
        { icon: Shield, title: "Reduce Infections", description: "Easy-clean surfaces" },
        { icon: Lightbulb, title: "Maximize Space", description: "Modular design solutions" }
      ]
    }
  ];

  return (
    <section 
      id="solutions" 
      className="py-16 sm:py-20 lg:py-24 bg-gray-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          className="text-left mb-12 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>
                Our Medical Solutions
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                From diagnostic equipment to complete hospital setups, we provide end-to-end 
                medical technology solutions tailored to Ethiopian healthcare needs.
              </p>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSolution}
                className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Previous solution"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSolution}
                className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Next solution"
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Solution Display with Animation */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSolutionIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ 
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              {/* Content Section */}
              <motion.div 
                className="text-left space-y-6"
                variants={itemVariants}
              >
                <div className="space-y-6">
                  <div>
                    <button 
                      onClick={() => navigateTo('solution-detail', solutions[currentSolutionIndex].title)}
                      className="text-left"
                    >
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 hover:text-green-600 transition-colors cursor-pointer leading-tight mb-4">
                        {solutions[currentSolutionIndex].title}
                      </h3>
                    </button>
                    
                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                      {solutions[currentSolutionIndex].description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Key Products:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {solutions[currentSolutionIndex].products.map((product, productIndex) => (
                        <div key={productIndex} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{product}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Benefits:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {solutions[currentSolutionIndex].benefits.map((benefit, benefitIndex) => {
                        const BenefitIcon = benefit.icon;
                        return (
                          <div key={benefitIndex} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                              <BenefitIcon className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 text-sm mb-1">{benefit.title}</h5>
                              <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigateTo('solution-detail', solutions[currentSolutionIndex].title)}
                    className="text-green-600 hover:text-green-700 font-medium transition-colors duration-300 flex items-center gap-2 group mt-6"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* Image Section */}
              <motion.div 
                className="relative"
                variants={itemVariants}
              >
                <ImageWithFallback 
                  src={solutions[currentSolutionIndex].image}
                  alt={solutions[currentSolutionIndex].alt}
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}