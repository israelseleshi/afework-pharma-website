import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { ArrowRight, Calendar, MapPin, Users, Award, CheckCircle2 } from "lucide-react";

export function ProjectsPage() {
  const { navigateTo } = useRouter();

  // Animation variants for different sections
  const pageLoadVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const horizontalRevealVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const imageRevealVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const staggeredCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const checkmarkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    }
  };

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

  // Counter animation component
  const CounterAnimation = ({ number, count, index }: { number: string, count: number, index: number }) => {
    const [displayCount, setDisplayCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    const startAnimation = () => {
      if (hasAnimated || count === 0) return;
      setHasAnimated(true);
      
      const duration = 1500; // 1.5 seconds
      const startTime = Date.now();
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayCount(Math.floor(easeOut * count));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    return (
      <motion.div 
        className="text-green-600" 
        style={{fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: '600', lineHeight: '1.3'}}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          delay: index * 0.1 + 0.3,
          duration: 0.5
        }}
        onViewportEnter={startAnimation}
      >
        {count > 0 ? `${displayCount}+` : number}
      </motion.div>
    );
  };

  const featuredProjects = [
    {
      title: "CDC-Tigray Regional Health Bureau Project",
      client: "Centers for Disease Control & Tigray Regional Health Bureau",
      year: "2024",
      location: "Mekelle, Tigray Region",
      image: "https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBob3NwaXRhbCUyMG1lZGljYWwlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NTk4MjkwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      logo: "/assets/logos/tigray-regional-health-bureau-logo.png",
      description: "Comprehensive laboratory infrastructure development supporting TB and HIV diagnostics across 25 health facilities in Tigray region.",
      scope: [
        "11 Mindray BS-240 Chemistry Analyzers",
        "10 Mindray BC-5150 5-diff Hematology Analyzers",
        "24 Mindray BC-30s 3-diff Hematology Analyzers",
        "Comprehensive on-site user training",
        "40-day project completion timeline"
      ],
      impact: "Enhanced diagnostic capabilities across 36 health facilities in Tigray region",
      testimonial: {
        quote: "Afework Pharma delivered exceptional service with their turnkey supply, installation, and training across our 36 facilities. The project was completed ahead of schedule with outstanding technical support.",
        author: "Dr. Gebrehiwot Tesfay",
        position: "Director, Tigray Regional Health Bureau",
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBkb2N0b3IlMjBhZnJpY2FufGVufDF8fHx8MTc1OTgyOTMwNXww&ixlib=rb-4.1.0&q=80&w=1080"
      }
    },
    {
      title: "FDRE Defense Referral Hospital, Bishoftu",
      client: "Federal Democratic Republic of Ethiopia Defense Hospital",
      year: "2023-2024",
      location: "Bishoftu, Ethiopia",
      image: "/assets/logos/fdre-defense-referral-hospital.jpg",
      logo: "/assets/logos/fdre-defense-logo.png",
      description: "Installation and commissioning of advanced laboratory suite with comprehensive reagent supply chain management.",
      scope: [
        "Mindray BS-480 Biochemistry Analyzer",
        "Urinalysis Systems",
        "Flow Cytometry Systems",
        "Full technical and application training",
        "Sustained reagent supply worth ETB 1.9 Million"
      ],
      impact: "Enhanced diagnostic capabilities with reliable supply chain support",
      testimonial: {
        quote: "Afework Pharma provided exceptional installation and commissioning services with comprehensive training support. Their ongoing reagent supply management has been exemplary.",
        author: "Colonel Dr. Mulugeta Assefa", 
        position: "Chief Medical Director, FDRE Defense Hospital",
        avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBkb2N0b3IlMjBhZnJpY2FufGVufDF8fHx8MTc1OTgyOTMxMHww&ixlib=rb-4.1.0&q=80&w=1080"
      }
    }
  ];

  const additionalProjects = [
    {
      title: "Addis Ababa University Medical Faculty Lab Upgrade",
      client: "AAU Medical Faculty",
      year: "2021",
      location: "Addis Ababa",
      equipment: "Advanced teaching laboratory with digital microscopy",
      impact: "Enhanced medical education for 500+ students annually"
    },
    {
      title: "Regional Hospital Network Expansion",
      client: "Oromia Regional Health Bureau",
      year: "2019-2020",
      location: "Multiple locations",
      equipment: "Portable X-ray and ultrasound systems",
      impact: "Improved diagnostic access in rural communities"
    },
    {
      title: "Private Hospital Group Modernization",
      client: "St. Paul's Hospital Millennium Medical College",
      year: "2020",
      location: "Addis Ababa",
      equipment: "Complete laboratory automation and PACS integration",
      impact: "Reduced test turnaround time by 60%"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Staggered Page Load Animation */}
      <section className="py-8 sm:py-12" style={{backgroundColor: '#ecfdf5'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900"
              variants={pageLoadVariants}
            >
              Success Stories & Case Studies
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
              variants={pageLoadVariants}
            >
              Discover how we've transformed healthcare delivery across Ethiopia through 
              innovative medical technology solutions and comprehensive support services.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16" style={{backgroundColor: '#f0fdf4'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-16 lg:space-y-20">
            {featuredProjects.map((project, index) => (
              <motion.div 
                key={index} 
                className="space-y-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
              >
                {/* Project Header - Horizontal Reveal */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <motion.div 
                    className="space-y-6"
                    variants={horizontalRevealVariants}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start gap-4">
                        {project.logo && (
                          <img 
                            src={project.logo} 
                            alt="Client Logo" 
                            className="h-16 w-16 object-contain flex-shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <h2 className="text-gray-900">{project.title}</h2>
                          <p className="text-green-600 mt-2">{project.client}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{project.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{project.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600">
                      {project.description}
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="relative"
                    variants={imageRevealVariants}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Project Details */}
                <motion.div 
                  className="grid lg:grid-cols-2 gap-8"
                  variants={containerVariants}
                >
                  <motion.div 
                    className="space-y-6"
                    variants={pageLoadVariants}
                  >
                    <h3 className="text-gray-900">Project Scope</h3>
                    <ul className="space-y-3">
                      {project.scope.map((item, itemIndex) => (
                        <motion.li 
                          key={itemIndex} 
                          className="flex items-start gap-3"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          custom={itemIndex}
                          variants={checkmarkVariants}
                          transition={{ delay: itemIndex * 0.1 }}
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: itemIndex * 0.1 + 0.2,
                              duration: 0.5,
                              type: "spring",
                              stiffness: 200
                            }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          </motion.div>
                          <span className="text-gray-600 text-sm sm:text-base">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-6"
                    variants={pageLoadVariants}
                  >
                    <h3 className="text-gray-900">Impact & Results</h3>
                    <motion.div 
                      className="bg-green-50 p-4 sm:p-6 rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        <span className="text-green-900 text-sm sm:text-base">Key Achievement</span>
                      </div>
                      <p className="text-green-800 text-sm sm:text-base">{project.impact}</p>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Testimonial */}
                <motion.div 
                  className="p-6 sm:p-8 rounded-2xl" style={{backgroundColor: '#f1f5f9'}}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={pageLoadVariants}
                  transition={{ delay: 0.3 }}
                >
                  <blockquote className="text-gray-700 italic mb-4">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-green-200">
                      <ImageWithFallback 
                        src={project.testimonial.avatar}
                        alt={project.testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-gray-900 text-sm sm:text-base font-semibold">{project.testimonial.author}</div>
                      <div className="text-gray-600 text-xs sm:text-sm">{project.testimonial.position}</div>
                    </div>
                  </div>
                </motion.div>

                {index < featuredProjects.length - 1 && (
                  <div className="border-b border-gray-200"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Projects */}
      <section className="py-16" style={{backgroundColor: '#f7fee7'}}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={pageLoadVariants}
          >
            <h2 className="text-gray-900 mb-4">Additional Success Stories</h2>
            <p className="text-gray-600">
              More examples of our commitment to advancing Ethiopian healthcare
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {additionalProjects.map((project, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                variants={staggeredCardVariants}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-gray-900 mb-2">{project.title}</h3>
                <p className="text-green-600 text-sm mb-3">{project.client}</p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3">{project.equipment}</p>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{project.impact}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics - Animated Counters */}
      <section className="py-16" style={{backgroundColor: '#f8fafc'}}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={pageLoadVariants}
          >
            <h2 className="text-gray-900 mb-4">Our Impact by Numbers</h2>
            <p className="text-gray-600">
              Measurable results across Ethiopia's healthcare landscape
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-4 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { number: "45+", label: "IVD Units Deployed", icon: Users, count: 45 },
              { number: "36+", label: "Healthcare Facilities", icon: MapPin, count: 36 },
              { number: "5+", label: "Years Experience", icon: Calendar, count: 5 },
              { number: "24/7", label: "Technical Support", icon: Award, count: 0 }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  className="space-y-4"
                  variants={staggeredCardVariants}
                >
                  <motion.div 
                    className="w-16 h-16 border-2 border-green-200 rounded-xl flex items-center justify-center mx-auto bg-green-50"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </motion.div>
                  
                  <CounterAnimation 
                    number={stat.number}
                    count={stat.count}
                    index={index}
                  />
                  
                  <motion.div 
                    className="text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1 + 0.5,
                      duration: 0.4
                    }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
}