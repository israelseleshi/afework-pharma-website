import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const totalTestimonials = 5;
  // Get number of cards to show based on screen size
  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile: 1 card
      if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
      return 3; // Desktop: 3 cards
    }
    return 3; // Default for server-side rendering
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  // Update cardsToShow on window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = totalTestimonials - cardsToShow;

  const testimonials = [
    {
      id: 1,
      name: "Dr. Meron Tadesse",
      position: "Chief Medical Officer",
      organization: "Tikur Anbessa Specialized Hospital",
      location: "Addis Ababa, Ethiopia",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjB3b21hbiUyMGFmcmljYW58ZW58MXx8fHwxNzU5ODI5MzA1fDA&ixlib=rb-4.1.0&q=80&w=400",
      testimonial: "Afework Pharma has been instrumental in modernizing our diagnostic capabilities. The BC-5150 hematology analyzer they provided has significantly improved our lab efficiency and patient care quality. Their technical support team is exceptional.",
      rating: 5,
      projectType: "Laboratory Equipment",
      equipmentCount: "12 units installed"
    },
    {
      id: 2,
      name: "Ato Dawit Alemayehu",
      position: "Hospital Administrator",
      organization: "FDRE Defense Hospital",
      location: "Addis Ababa, Ethiopia",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbnxlbnwxfHx8fDE3NTk4MjkzMTB8MA&ixlib=rb-4.1.0&q=80&w=400",
      testimonial: "Working with Afework Pharma for our hospital modernization project was a game-changer. They delivered comprehensive medical solutions on time and within budget. The training they provided to our staff was thorough and professional.",
      rating: 5,
      projectType: "Complete Hospital Setup",
      equipmentCount: "50+ medical devices"
    },
    {
      id: 3,
      name: "Dr. Sara Bekele",
      position: "Laboratory Director",
      organization: "CDC-Tigray Health Project",
      location: "Tigray Region, Ethiopia",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjB3b21hbiUyMGFmcmljYW4lMjBsYWJ8ZW58MXx8fHwxNzU5ODI5MzE1fDA&ixlib=rb-4.1.0&q=80&w=400",
      testimonial: "The deployment of 45 IVD units across 36 health facilities in Tigray was executed flawlessly by Afework Pharma. Their expertise in logistics and technical implementation is unmatched in Ethiopia's healthcare sector.",
      rating: 5,
      projectType: "Regional Health Project",
      equipmentCount: "45 IVD units deployed"
    },
    {
      id: 4,
      name: "Dr. Yohannes Haile",
      position: "Chief of Radiology",
      organization: "Black Lion Hospital",
      location: "Addis Ababa, Ethiopia",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtYW4lMjBhZnJpY2FufGVufDF8fHx8MTc1OTgyOTMyMHww&ixlib=rb-4.1.0&q=80&w=400",
      testimonial: "Afework Pharma's diagnostic imaging solutions have revolutionized our radiology department. The Mindray ultrasound systems they installed provide exceptional image quality, and their maintenance service ensures 99% uptime.",
      rating: 5,
      projectType: "Diagnostic Imaging",
      equipmentCount: "8 imaging systems"
    },
    {
      id: 5,
      name: "W/ro Almaz Tesfaye",
      position: "Nursing Director",
      organization: "St. Paul's Hospital Millennium Medical College",
      location: "Addis Ababa, Ethiopia",
      image: "https://images.unsplash.com/photo-1594824804732-ca8db7531fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMHdvbWFuJTIwYWZyaWNhbnxlbnwxfHx8fDE3NTk4MjkzMjV8MA&ixlib=rb-4.1.0&q=80&w=400",
      testimonial: "The patient care equipment and hospital furniture provided by Afework Pharma has significantly improved our patient comfort and staff efficiency. Their attention to quality and ergonomic design is outstanding.",
      rating: 5,
      projectType: "Patient Care Equipment",
      equipmentCount: "200+ furniture pieces"
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const testimonialVariants = {
    enter: {
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    center: {
      opacity: 1,
      scale: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header with Navigation */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900" style={{letterSpacing: '-0.02em'}}>
                What Our Partners Say
              </h2>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextTestimonial}
                className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ 
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials.slice(currentTestimonial, currentTestimonial + cardsToShow).map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="group relative"
                >
                  <div className="h-full p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:border-green-200 hover:scale-102">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6">
                      <Quote className="w-8 h-8 text-gray-300 group-hover:text-green-400 transition-colors" />
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="mb-6 leading-relaxed text-gray-600 text-sm">
                      "{testimonial.testimonial}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-900 text-base">
                        {testimonial.name}
                      </h3>
                      <p className="text-green-600 font-medium text-sm">
                        {testimonial.position}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {testimonial.organization}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
