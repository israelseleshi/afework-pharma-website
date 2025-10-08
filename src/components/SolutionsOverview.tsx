import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Beaker, Scan, Heart, Bed, Pill } from "lucide-react";
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
      image: "https://images.unsplash.com/photo-1758685734156-3c5d35bae1d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBhbmFseXplciUyMGxhYm9yYXRvcnklMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU5ODI5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Chemistry Analyzers", "Hematology Systems", "Microscopes", "Lab Furniture"]
    },
    {
      icon: Scan,
      title: "Diagnostic Imaging & Radiology",
      description: "Advanced imaging solutions from digital X-ray to MRI systems with full installation support.",
      image: "https://images.unsplash.com/photo-1587010580103-fd86b8ea14ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNUkklMjBtYWNoaW5lJTIwbWVkaWNhbCUyMGltYWdpbmd8ZW58MXx8fHwxNzU5ODI5MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Digital X-Ray", "Ultrasound", "CT Scanners", "MRI Systems"]
    },
    {
      icon: Heart,
      title: "Critical Care & Operation Theatre",
      description: "Life-saving equipment for ICUs and operating rooms including ventilators and surgical instruments.",
      image: "https://images.unsplash.com/photo-1728474372689-c3072b79806e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYXRpbmclMjByb29tJTIwc3VyZ2ljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU5ODI5MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Ventilators", "Patient Monitors", "Surgical Tables", "Anesthesia Machines"]
    },
    {
      icon: Bed,
      title: "Hospital Furniture & Patient Care",
      description: "Ergonomic hospital furniture and patient care equipment designed for comfort and functionality.",
      image: "https://images.unsplash.com/photo-1613377512409-59c33c10c821?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJlZCUyMG1lZGljYWwlMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzU5ODI5MTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Hospital Beds", "Patient Chairs", "Medical Trolleys", "Storage Solutions"]
    },
    {
      icon: Pill,
      title: "Medical Consumables & Reagents",
      description: "Quality reagents and medical consumables ensuring reliable test results and patient safety.",
      image: "https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwZXF1aXBtZW50JTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc1OTgyOTAzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      products: ["Lab Reagents", "Test Kits", "Disposables", "Quality Controls"]
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Comprehensive Medical Solutions
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
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
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onClick={() => navigateTo('solution-detail', solution.title)}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback 
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 p-3 rounded-xl">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  <h3 className="text-slate-900 group-hover:text-green-600 transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-slate-600">
                    {solution.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-slate-900">Key Products:</h4>
                    <div className="flex flex-wrap gap-2">
                      {solution.products.map((product, productIndex) => (
                        <span 
                          key={productIndex}
                          className="px-2 py-1 sm:px-3 bg-slate-100 text-slate-700 rounded-full text-xs sm:text-sm"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    onClick={() => navigateTo('solutions')}
                    className="w-full justify-between text-green-600 hover:text-green-700 hover:bg-green-50 mt-4"
                  >
                    View Solutions
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Brand Partnership */}
        <div className="mt-20 bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-slate-900 mb-4">
                Partnered with Global Leaders
              </h3>
              <p className="text-slate-600 mb-6">
                We exclusively partner with world-renowned manufacturers to ensure 
                you receive the highest quality medical equipment backed by comprehensive 
                warranties and support services.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-slate-200">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">ISO</div>
                  <div className="text-xs sm:text-sm text-slate-600">Certified Equipment</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-slate-200">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">CE</div>
                  <div className="text-xs sm:text-sm text-slate-600">European Standards</div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigateTo('solutions')}
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
              >
                Explore All Solutions
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {/* Partner logos - placeholder design */}
              {["Mindray", "Siemens", "GE Healthcare", "Philips", "Abbott", "Roche"].map((partner, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-xs font-semibold text-slate-600">{partner.slice(0, 2)}</span>
                  </div>
                  <div className="text-xs text-slate-600">{partner}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}