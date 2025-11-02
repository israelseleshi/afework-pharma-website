import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { ArrowRight, Beaker, Scan, Heart, Bed, Pill, Check, Shield, Zap, Users, Clock, Award, Target, TrendingUp, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";

export function SolutionsPage() {
  const { navigateTo } = useRouter();
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  const solutionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const serviceVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Auto-scroll functionality for carousel
  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    const interval = setInterval(() => {
      setCurrentSolutionIndex((prevIndex) => (prevIndex + 1) % solutions.length);
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, [isHovered]);

  // Navigation functions
  const goToNext = () => {
    setCurrentSolutionIndex((prevIndex) => (prevIndex + 1) % solutions.length);
  };

  const goToPrevious = () => {
    setCurrentSolutionIndex((prevIndex) => (prevIndex - 1 + solutions.length) % solutions.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSolutionIndex(index);
  };

  const solutions = [
    {
      icon: Beaker,
      title: "Diagnostic & Laboratory Solutions",
      description: "Complete laboratory ecosystems featuring automated chemistry analyzers, hematology systems, and comprehensive IVD solutions tailored for Ethiopian healthcare facilities.",
      image: "/assets/images/diagnostic-&-laboratory-solutions.jpg",
      products: ["Mindray BS-240 Chemistry Analyzers", "BC-5150 Hematology Systems", "Digital Microscopes", "Lab Furniture", "Quality Control Systems"],
      benefits: [
        { icon: TrendingUp, title: "Increase Patient Throughput", description: "Automated workflows boost efficiency by 60%" },
        { icon: Shield, title: "Reduce Diagnostic Errors", description: "85% reduction with reliable results" },
        { icon: Users, title: "Accelerate Staff Competency", description: "Comprehensive training programs" },
        { icon: Clock, title: "Minimize Equipment Downtime", description: "24/7 technical support available" }
      ]
    },
    {
      icon: Scan,
      title: "Diagnostic Imaging & Radiology",
      description: "Advanced imaging solutions from digital radiography to high-end MRI systems, addressing Ethiopia's growing need for accurate diagnostic imaging capabilities.",
      image: "/diagnostic_imaging_radiology/general_imaging_ultrasound_machine_front_hero_960x720_pc.jpg",
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
      image: "/assets/images/hospital-clinic-furniture.png",
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
      image: "/assets/images/hospital-furniture-&-patient-care.jpg",
      products: ["Electric Hospital Beds", "Patient Transfer Chairs", "Medical Trolleys", "Storage Solutions", "Waiting Area Furniture"],
      benefits: [
        { icon: Heart, title: "Improve Patient Recovery", description: "Enhanced comfort features" },
        { icon: TrendingUp, title: "Boost Staff Productivity", description: "Ergonomic design solutions" },
        { icon: Shield, title: "Reduce Infections", description: "Easy-clean surfaces" },
        { icon: Lightbulb, title: "Maximize Space", description: "Modular design solutions" }
      ]
    },
    {
      icon: Pill,
      title: "Medical Consumables & Reagents",
      description: "Quality medical consumables and reagents ensuring reliable test results and optimal patient safety standards across Ethiopian healthcare facilities.",
      image: "https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwZXF1aXBtZW50JTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc1OTgyOTAzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Lab Reagents", "Rapid Test Kits", "Medical Disposables", "Quality Controls", "Calibration Materials"],
      benefits: [
        { icon: Award, title: "Ensure Test Accuracy", description: "Consistent quality standards" },
        { icon: Shield, title: "Meet International Standards", description: "Full regulatory compliance" },
        { icon: TrendingUp, title: "Reduce Operating Costs", description: "Bulk supply efficiency" },
        { icon: Clock, title: "Prevent Stock-Outs", description: "Reliable supply chain" }
      ]
    }
  ];

  const services = [
    {
      title: "Installation & Commissioning",
      description: "Get your equipment operational faster with our certified technicians who ensure optimal performance from day one, reducing setup time by 60%."
    },
    {
      title: "Training & Education",
      description: "Maximize your equipment investment with comprehensive training programs that increase staff competency and reduce operational errors by 70%."
    },
    {
      title: "Technical Support",
      description: "Minimize costly downtime with our 24/7 technical support and preventive maintenance services, ensuring 99.5% equipment uptime."
    },
    {
      title: "Regulatory Compliance",
      description: "Navigate Ethiopian healthcare regulations confidently with our full regulatory support, ensuring 100% compliance with EFDA and international standards."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Comprehensive Medical Solutions Ethiopia",
    "provider": {
      "@type": "Organization",
      "name": "Afework Pharma"
    },
    "description": "Complete medical solutions in Ethiopia: diagnostic laboratory systems, medical imaging, critical care, hospital furniture & consumables. Trusted by healthcare facilities.",
    "serviceType": [
      "Diagnostic Laboratory Solutions",
      "Medical Imaging Equipment",
      "Critical Care Solutions",
      "Hospital Furniture",
      "Medical Consumables"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Ethiopia"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Comprehensive Medical Solutions Ethiopia | Afework Pharma"
        description="Complete medical solutions in Ethiopia: diagnostic laboratory systems, medical imaging, critical care, hospital furniture & consumables. Trusted by healthcare facilities."
        keywords="comprehensive medical solutions Ethiopia, diagnostic laboratory systems, medical imaging equipment, critical care solutions, hospital furniture, medical consumables, healthcare technology Ethiopia, medical equipment solutions"
        canonical="/solutions"
        ogTitle="Comprehensive Medical Solutions Ethiopia | Afework Pharma"
        ogDescription="Complete medical solutions in Ethiopia: diagnostic laboratory systems, medical imaging, critical care, hospital furniture & consumables."
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900 text-left"
              variants={itemVariants}
            >
              Our Medical Solutions
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Solutions Carousel */}
      <section 
        className="pb-16 lg:pb-20 w-full bg-green-50/30 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative">

            {/* Carousel Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSolutionIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Content Section */}
                <motion.div 
                  className="text-left space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="space-y-6">
                    <div>
                      <button 
                        onClick={() => navigateTo('solution-detail', solutions[currentSolutionIndex].title)}
                        className="text-left"
                      >
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 hover:text-green-600 transition-colors cursor-pointer leading-tight mb-4">
                          {solutions[currentSolutionIndex].title}
                        </h2>
                      </button>
                      
                      <p className="text-gray-600 text-base leading-relaxed mb-6">
                        {solutions[currentSolutionIndex].description}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Key Products:</h3>
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
                      <h3 className="text-lg font-semibold text-gray-900">Benefits:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {solutions[currentSolutionIndex].benefits.map((benefit, benefitIndex) => {
                          const BenefitIcon = benefit.icon;
                          return (
                            <div key={benefitIndex} className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <BenefitIcon className="w-4 h-4 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm mb-1">{benefit.title}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="inline-block">
                      <Button 
                        onClick={() => navigateTo('solution-detail', solutions[currentSolutionIndex].title)}
                        className="bg-green-600 hover:bg-green-600 text-white hover:text-white font-medium px-6 py-3 rounded-lg shadow-sm border-0"
                        style={{ backgroundColor: '#16a34a', color: '#ffffff' }}
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Image Section */}
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <ImageWithFallback 
                      src={solutions[currentSolutionIndex].image}
                      alt={solutions[currentSolutionIndex].title}
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-4">
              {solutions.map((_, index) => {
                const isActive = index === currentSolutionIndex;
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-green-600 scale-125 shadow-lg border-2 border-green-700'
                        : 'bg-gray-300 hover:bg-green-400 border-2 border-transparent'
                    }`}
                    style={{
                      backgroundColor: isActive ? '#16a34a' : '#d1d5db'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 w-full bg-lime-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Comprehensive Services</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Beyond equipment supply, we provide complete support services to ensure 
              your success at every stage of your healthcare journey.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                variants={serviceVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certification & Compliance */}
      <section className="py-16 w-full bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div 
              className="space-y-6"
              variants={solutionVariants}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Quality & Compliance</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                All our medical equipment meets international quality standards and 
                regulatory requirements. We work exclusively with certified manufacturers 
                and ensure full compliance with Ethiopian and international regulations.
              </p>
              
              <motion.div 
                className="grid grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {['ISO 13485', 'CE Marking', 'FDA Approved'].map((cert, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors duration-300"
                    variants={serviceVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="text-lg text-green-600 mb-1">{cert}</div>
                    <div className="text-sm text-gray-600">Certified</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={imageVariants}
            >
              {/* Creative certification badges layout */}
              <div className="grid grid-cols-2 gap-8">
                {/* FDA Approved Badge */}
                <div className="relative group">
                  <img 
                    src="/assets/logos/fda-approved.png" 
                    alt="FDA Approved" 
                    className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* ISO Certified Badge */}
                <div className="relative group">
                  <img 
                    src="/assets/logos/iso-certified.png" 
                    alt="ISO Certified" 
                    className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              {/* Additional badge with text */}
              <div className="mt-6 p-6 rounded-xl border bg-green-100 border-green-300">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-green-900 font-semibold">100% Compliant</p>
                    <p className="text-green-700 text-sm">International Standards</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
