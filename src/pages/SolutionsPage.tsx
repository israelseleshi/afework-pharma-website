import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { ArrowRight, Beaker, Scan, Heart, Bed, Pill, Check } from "lucide-react";

export function SolutionsPage() {
  const { navigateTo } = useRouter();

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

  const solutions = [
    {
      icon: Beaker,
      title: "Diagnostic & Laboratory Solutions",
      description: "Complete laboratory ecosystems featuring automated chemistry analyzers, hematology systems, and comprehensive IVD solutions tailored for Ethiopian healthcare facilities.",
      image: "https://images.unsplash.com/photo-1758685734156-3c5d35bae1d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBhbmFseXplciUyMGxhYm9yYXRvcnklMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU5ODI5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Mindray BS-240 Chemistry Analyzers", "BC-5150 Hematology Systems", "Digital Microscopes", "Lab Furniture", "Quality Control Systems"],
      benefits: [
        "Increase Patient Throughput with Automated Workflows",
        "Reduce Diagnostic Errors by 85% with Reliable Results", 
        "Accelerate Staff Competency with Comprehensive Training",
        "Minimize Equipment Downtime with 24/7 Technical Support"
      ]
    },
    {
      icon: Scan,
      title: "Diagnostic Imaging & Radiology",
      description: "Advanced imaging solutions from digital radiography to high-end MRI systems, addressing Ethiopia's growing need for accurate diagnostic imaging capabilities.",
      image: "https://images.unsplash.com/photo-1587010580103-fd86b8ea14ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNUkklMjBtYWNoaW5lJTIwbWVkaWNhbCUyMGltYWdpbmd8ZW58MXx8fHwxNzU5ODI5MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Digital X-Ray Systems", "Ultrasound Machines", "CT Scanners", "MRI Systems", "PACS Solutions"],
      benefits: [
        "Eliminate Film Costs with Complete Digital Workflow",
        "Improve Diagnosis Accuracy with Enhanced Image Quality",
        "Protect Patients & Staff with Advanced Radiation Safety",
        "Enable Remote Consultation with Cloud Integration"
      ]
    },
    {
      icon: Heart,
      title: "Critical Care & Operation Theatre",
      description: "Life-saving equipment for intensive care units and operating rooms, ensuring optimal patient outcomes during Ethiopia's most critical medical procedures.",
      image: "https://images.unsplash.com/photo-1728474372689-c3072b79806e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYXRpbmclMjByb29tJTIwc3VyZ2ljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU5ODI5MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["ICU Ventilators", "Multi-Parameter Monitors", "Surgical Tables", "Anesthesia Machines", "OR Integration Systems"],
      benefits: [
        "Save More Lives with Advanced Life-Support Technology",
        "Prevent Complications with Real-Time Patient Monitoring",
        "Enhance Surgical Outcomes with Precision Equipment",
        "Reduce Response Time with Integrated Emergency Support"
      ]
    },
    {
      icon: Bed,
      title: "Hospital Furniture & Patient Care",
      description: "Ergonomic hospital furniture and patient care equipment designed to improve patient comfort while enhancing healthcare worker efficiency in Ethiopian hospitals.",
      image: "https://images.unsplash.com/photo-1613377512409-59c33c10c821?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJlZCUyMG1lZGljYWwlMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzU5ODI5MTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Electric Hospital Beds", "Patient Transfer Chairs", "Medical Trolleys", "Storage Solutions", "Waiting Area Furniture"],
      benefits: [
        "Improve Patient Recovery with Enhanced Comfort Features",
        "Boost Staff Productivity with Ergonomic Design",
        "Reduce Healthcare-Associated Infections with Easy-Clean Surfaces",
        "Maximize Space Utilization with Modular Design Solutions"
      ]
    },
    {
      icon: Pill,
      title: "Medical Consumables & Reagents",
      description: "Quality medical consumables and reagents ensuring reliable test results and optimal patient safety standards across Ethiopian healthcare facilities.",
      image: "https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwZXF1aXBtZW50JTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc1OTgyOTAzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Lab Reagents", "Rapid Test Kits", "Medical Disposables", "Quality Controls", "Calibration Materials"],
      benefits: [
        "Ensure Test Accuracy with Consistent Quality Standards",
        "Meet International Standards with Full Regulatory Compliance",
        "Reduce Operating Costs with Bulk Supply Efficiency",
        "Prevent Stock-Outs with Reliable Supply Chain Management"
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900"
              variants={itemVariants}
            >
              Comprehensive Medical Solutions
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
              variants={itemVariants}
            >
              From diagnostic equipment to complete hospital infrastructure, we provide 
              end-to-end medical technology solutions tailored to Ethiopian healthcare needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-12 lg:space-y-16">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              const isReverse = index % 2 === 1;
              
              return (
                <React.Fragment key={index}>
                  <motion.div 
                    className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isReverse ? 'lg:grid-flow-col-reverse' : ''}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                  >
                    <motion.div 
                      className="space-y-6"
                      variants={solutionVariants}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{solution.title}</h2>
                      </div>
                    
                    <p className="text-gray-600">
                      {solution.description}
                    </p>
                    
                    <div className="space-y-4">
                      <h3 className="text-gray-900">Key Products:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {solution.products.map((product, productIndex) => (
                          <div key={productIndex} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-600 text-sm sm:text-base">{product}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-gray-900">Benefits:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {solution.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-gray-600 text-sm sm:text-base">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => navigateTo('solution-detail', solution.title)}
                      variant="outline" 
                      className="w-full sm:w-auto"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    className="relative"
                    variants={imageVariants}
                  >
                    <ImageWithFallback 
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
                    />
                  </motion.div>
                </motion.div>
                
                {/* Creative Separator */}
                {index < solutions.length - 1 && (
                  <div className="relative py-12">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-6 py-2 rounded-full border-2 border-green-600 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse delay-150"></div>
                      </span>
                    </div>
                  </div>
                )}
              </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
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
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                variants={serviceVariants}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-lg text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certification & Compliance */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
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
                    src="/fda-approved.png" 
                    alt="FDA Approved" 
                    className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* ISO Certified Badge */}
                <div className="relative group">
                  <img 
                    src="/iso-certified.png" 
                    alt="ISO Certified" 
                    className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              {/* Additional badge with text */}
              <div className="mt-6 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
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