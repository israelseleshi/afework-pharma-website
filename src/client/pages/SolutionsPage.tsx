import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { ArrowRight, Beaker, Scan, Heart, Bed, Pill, Check, Shield, Zap, Users, Clock, Award, Target, TrendingUp, Lightbulb, ArrowLeft, ArrowRight as ArrowRightIcon } from "lucide-react";
import { IMAGES, IMAGE_ALT_TEXT } from "../constants/images";

export function SolutionsPage() {
  const { navigateTo } = useRouter();
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

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

  const totalSolutions = 5;
  const maxIndex = totalSolutions - 1;

  const nextSolution = () => {
    setCurrentSolutionIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSolution = () => {
    setCurrentSolutionIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSolutionIndex(index);
  };

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
      title: "Import and Distribution",
      description: "Streamlined import processes and efficient distribution network ensuring medical equipment reaches healthcare facilities across Ethiopia on time and in perfect condition."
    }
  ];

  const mindrayProducts = [
    {
      name: "Mindray BS-240 Pro Chemistry Analyzer",
      category: "Diagnostic & Laboratory Solutions",
      description: "A robust and efficient benchtop analyzer designed for small to medium-sized laboratories with comprehensive metabolic testing capabilities.",
      image: IMAGES.products.mindray.bs240ChemistryAnalyzer,
      alt: IMAGE_ALT_TEXT.products.mindray.bs240ChemistryAnalyzer
    },
    {
      name: "Mindray BC-5150 Hematology Analyzer",
      category: "Diagnostic & Laboratory Solutions", 
      description: "5-part differential hematology analyzer with advanced flow cytometry technology for accurate blood cell analysis.",
      image: IMAGES.products.mindray.bc5150HematologyAnalyzer,
      alt: IMAGE_ALT_TEXT.products.mindray.bc5150HematologyAnalyzer
    },
    {
      name: "Mindray DC-70 Ultrasound System",
      category: "Diagnostic Imaging & Radiology",
      description: "High-performance ultrasound system with exceptional image quality for comprehensive diagnostic applications.",
      image: IMAGES.products.mindray.dc70UltrasoundSystem,
      alt: IMAGE_ALT_TEXT.products.mindray.dc70UltrasoundSystem
    },
    {
      name: "Mindray DP-50 Digital X-Ray System",
      category: "Diagnostic Imaging & Radiology",
      description: "Advanced digital radiography system providing superior image quality with reduced radiation exposure.",
      image: IMAGES.products.mindray.dp50XraySystem,
      alt: IMAGE_ALT_TEXT.products.mindray.dp50XraySystem
    },
    {
      name: "Mindray BeneVent A3 Ventilator",
      category: "Critical Care & Operation Theatre",
      description: "Advanced ICU ventilator with comprehensive ventilation modes for critical care applications.",
      image: IMAGES.products.mindray.beneventA3Ventilator,
      alt: IMAGE_ALT_TEXT.products.mindray.beneventA3Ventilator
    },
    {
      name: "Mindray BeneHeart R3 Patient Monitor",
      category: "Critical Care & Operation Theatre",
      description: "Multi-parameter patient monitor with advanced algorithms for reliable vital signs monitoring.",
      image: IMAGES.products.mindray.beneheartR3Monitor,
      alt: IMAGE_ALT_TEXT.products.mindray.beneheartR3Monitor
    },
    {
      name: "Mindray CL-900i Chemistry Analyzer",
      category: "Diagnostic & Laboratory Solutions",
      description: "High-throughput chemistry analyzer for large laboratories with exceptional precision and reliability.",
      image: IMAGES.products.mindray.cl900iChemistryAnalyzer,
      alt: IMAGE_ALT_TEXT.products.mindray.cl900iChemistryAnalyzer
    },
    {
      name: "Mindray Resona 7 Ultrasound System",
      category: "Diagnostic Imaging & Radiology",
      description: "Premium ultrasound platform with AI-powered imaging technology for superior diagnostic confidence.",
      image: IMAGES.products.mindray.resona7Ultrasound,
      alt: IMAGE_ALT_TEXT.products.mindray.resona7Ultrasound
    },
    {
      name: "Mindray SV300 Ventilator",
      category: "Critical Care & Operation Theatre",
      description: "Versatile ventilator suitable for various clinical environments with advanced monitoring capabilities.",
      image: IMAGES.products.mindray.sv300Ventilator,
      alt: IMAGE_ALT_TEXT.products.mindray.sv300Ventilator
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? mindrayProducts 
    : mindrayProducts.filter(product => product.category === activeCategory);

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
      {/* Hero Section with Solutions Carousel */}
      <section 
        className="pt-24 sm:pt-28 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 w-full bg-gray-200 relative" 
        style={{backgroundColor: '#f3f4f6'}}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-12 lg:mb-16"
          >
            <div className="flex items-center justify-between gap-6 lg:gap-8">
              <div className="flex-1">
                <motion.h1 
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 text-left"
                  variants={itemVariants}
                  style={{letterSpacing: '-0.02em'}}
                >
                  Our Medical Solutions
                </motion.h1>
                <motion.p 
                  className="text-base sm:text-lg lg:text-xl text-gray-600 w-full leading-relaxed mt-4"
                  variants={itemVariants}
                  style={{ lineHeight: '1.6' }}
                >
                  From diagnostic equipment to complete hospital setups, we provide end-to-end 
                  <br />
                  medical technology solutions tailored to Ethiopian healthcare needs.
                </motion.p>
              </div>
              
              {/* Navigation Controls - Same Row */}
              <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                <button
                  onClick={prevSolution}
                  className="bg-white hover:bg-gray-50 text-gray-800 p-3 lg:p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                  aria-label="Previous solution"
                >
                  <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>

                <button
                  onClick={nextSolution}
                  className="bg-white hover:bg-gray-50 text-gray-800 p-3 lg:p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                  aria-label="Next solution"
                >
                  <ArrowRightIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Solutions Carousel */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
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
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                >
                {/* Image Section - First on Mobile */}
                <motion.div 
                  className="relative order-1 lg:order-2"
                  variants={itemVariants}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl">
                    <ImageWithFallback 
                      src={solutions[currentSolutionIndex].image}
                      alt={solutions[currentSolutionIndex].alt || solutions[currentSolutionIndex].title}
                      className="w-full h-full object-contain p-4 sm:p-6"
                    />
                  </div>
                </motion.div>

                {/* Content Section - Second on Mobile */}
                <motion.div 
                  className="space-y-4 sm:space-y-6 text-left order-2 lg:order-1"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      {React.createElement(solutions[currentSolutionIndex].icon, { className: "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" })}
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight" style={{letterSpacing: '-0.02em'}}>
                    {solutions[currentSolutionIndex].title}
                  </h3>
                  
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {solutions[currentSolutionIndex].description}
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">Key Products:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                      {solutions[currentSolutionIndex].products.map((product, productIndex) => (
                        <div key={productIndex} className="flex items-center gap-2">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                          <span className="text-xs sm:text-sm lg:text-base text-gray-700">{product}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">Benefits:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                      {solutions[currentSolutionIndex].benefits.map((benefit, benefitIndex) => {
                        const BenefitIcon = benefit.icon;
                        return (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-8 lg:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <BenefitIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-green-600" />
                            </div>
                            <div>
                              <h5 className="text-xs sm:text-sm font-medium text-gray-900">{benefit.title}</h5>
                              <p className="text-xs text-gray-600">{benefit.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigateTo('solution-detail', solutions[currentSolutionIndex].title)}
                    className="!bg-green-500 hover:!bg-green-600 !text-white font-medium transition-colors duration-300 flex items-center gap-2 group mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 !border-green-500 hover:!border-green-600 shadow-md hover:shadow-lg text-sm sm:text-base"
                    style={{ backgroundColor: 'rgb(34 197 94)', color: 'white', borderColor: 'rgb(34 197 94)' }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex justify-center gap-4 mt-8">
            <button
              onClick={prevSolution}
              className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              aria-label="Previous solution"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSolution}
              className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              aria-label="Next solution"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 sm:py-24 lg:py-28 w-full bg-lime-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-left mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Comprehensive Services</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl leading-relaxed">
              Beyond equipment supply, we provide complete support services to ensure 
              your success at every stage of your healthcare journey.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                variants={serviceVariants}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-green-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual Separator */}
      <Separator className="bg-gray-200" />

      {/* Mindray Product Portfolio */}
      <section className="py-20 sm:py-24 lg:py-28 w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-left mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{letterSpacing: '-0.02em'}}>Our Portfolio of Mindray Medical Technologies</h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-start gap-2 sm:gap-3 lg:gap-4 mb-8 lg:mb-12">
              {['All', 'Diagnostic & Laboratory Solutions', 'Diagnostic Imaging & Radiology', 'Critical Care & Operation Theatre', 'Hospital Furniture & Patient Care', 'Medical Consumables & Reagents'].map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base text-left leading-tight ${
                    activeCategory === category
                      ? 'bg-gray-100 text-green-600 shadow-lg border-2 border-green-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
              <motion.div 
                key={index} 
                className="group text-center transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-white rounded-lg mb-6 aspect-[4/3] flex items-center justify-center">
                  <ImageWithFallback 
                    src={product.image}
                    alt={product.alt || product.name}
                    className="max-w-full max-h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Product Info */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found in this category.</p>
            </div>
          )}
          
        </div>
      </section>

      {/* Certification & Compliance */}
      <section className="py-16 w-full bg-gray-200" style={{backgroundColor: '#f3f4f6'}}>
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900" style={{letterSpacing: '-0.02em'}}>Quality & Compliance</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                All our medical equipment meets international quality standards and 
                regulatory requirements. We work exclusively with certified manufacturers 
                and ensure full compliance with Ethiopian and international regulations.
              </p>
              
              <motion.div 
                className="grid grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {['ISO 13485', 'CE Marking', 'EFDA Approved'].map((cert, index) => (
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
              <div className="flex justify-center">
                {/* EFDA Approved Badge */}
                <div className="relative group max-w-xs">
                  <div className="bg-white text-green-600 px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center border-2 border-green-600">
                    <div className="text-2xl font-bold mb-2">EFDA</div>
                    <div className="text-lg font-semibold">APPROVED</div>
                    <div className="text-sm opacity-80 mt-2">Ethiopian Food and Drug Authority</div>
                  </div>
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
