import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { IMAGES, IMAGE_ALT_TEXT } from '../constants/images';
import { HeroHighlight, Highlight } from './ui/hero-highlight';
import { PointerHighlight } from './ui/pointer-highlight';
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "./Router";

// CSS-in-JS for professional animated color effects
const heroStyles = `
  @keyframes subtleColorShift {
    0% {
      filter: hue-rotate(0deg) saturate(1.1) brightness(0.95);
    }
    25% {
      filter: hue-rotate(5deg) saturate(1.15) brightness(0.98);
    }
    50% {
      filter: hue-rotate(8deg) saturate(1.2) brightness(1.02);
    }
    75% {
      filter: hue-rotate(3deg) saturate(1.1) brightness(0.96);
    }
    100% {5%
      filter: hue-rotate(0deg) saturate(1.1) brightness(0.95);
    }
  }

  @keyframes medicalColorWave {
    0% {
      filter: hue-rotate(0deg) saturate(1.05) brightness(0.92) contrast(1.08);
    }
    20% {
      filter: hue-rotate(3deg) saturate(1.12) brightness(0.96) contrast(1.12);
    }
    40% {
      filter: hue-rotate(6deg) saturate(1.18) brightness(1.00) contrast(1.15);
    }
    60% {
      filter: hue-rotate(4deg) saturate(1.15) brightness(0.98) contrast(1.10);
    }
    80% {
      filter: hue-rotate(1deg) saturate(1.08) brightness(0.94) contrast(1.06);
    }
    100% {
      filter: hue-rotate(0deg) saturate(1.05) brightness(0.92) contrast(1.08);
    }
  }

  .hero-image-animated {
    animation: subtleColorShift 8s ease-in-out infinite;
  }

  .hero-image-animated:nth-child(2n) {
    animation: medicalColorWave 10s ease-in-out infinite;
    animation-delay: -2s;
  }

  .hero-image-animated:nth-child(3n) {
    animation: subtleColorShift 12s ease-in-out infinite;
    animation-delay: -4s;
  }

  .hero-image-animated:nth-child(4n) {
    animation: medicalColorWave 9s ease-in-out infinite;
    animation-delay: -1s;
  }

  .hero-image-animated:nth-child(5n) {
    animation: subtleColorShift 11s ease-in-out infinite;
    animation-delay: -3s;
  }
  
  /* NEW: Professional Text Shadow Utility */
  .text-pop {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7), 0 0 1px rgba(0, 0, 0, 0.5);
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = heroStyles;
  if (!document.head.querySelector('style[data-hero-styles]')) {
    styleElement.setAttribute('data-hero-styles', 'true');
    document.head.appendChild(styleElement);
  }
}

// Typewriter Animation Component (Unchanged)
const TypewriterText = ({ text, speed = 100, delay = 0 }: { text: string; speed?: number; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (isStarted && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, isStarted]);

  return (
    <span className="relative">
      {displayText}
    </span>
  );
};

// Counter Animation Component (Unchanged)
const AnimatedCounter = ({ end, duration = 1200, delay = 0 }: { end: number; duration?: number; delay?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible && count === 0) {
      const timer = setTimeout(() => {
        let startTime: number;
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const currentCount = Math.floor(progress * end);
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, end, duration, delay, count]);

  // Trigger animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Start after 0.5 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return <span>{count}</span>;
};

export function HeroSection() {
  // Enhanced content for better impact and clarity
  const headline = 'Elevating Ethiopian Healthcare with State-of-the-Art Technology';
  const subheadline = 'Delivering and supporting advanced medical equipment across Ethiopia, ensuring comprehensive technical training and sustained healthcare technology advancement.';
  const stats = [
    { number: 45, suffix: '+', label: 'IVD Units Deployed' },
    { number: 36, suffix: '+', label: 'Healthcare Facilities' },
    { number: 5, suffix: '+', label: 'Years Experience' }
  ];

  // Medical solution images and content for carousel
  const solutionSlides = [
    {
      image: IMAGES.hero.main,
      title: 'Your Trusted Partner in Next-Generation Medical Equipment',
      subtitle: 'Delivering and supporting advanced medical equipment across Ethiopia, ensuring comprehensive technical training and sustained healthcare technology advancement.',
      showButton: true,
      alt: IMAGE_ALT_TEXT.hero.main
    },
    {
      image: IMAGES.hero.diagnosticLab,
      title: 'Diagnostic & Laboratory Solutions',
      subtitle: 'Comprehensive laboratory equipment including automated chemistry analyzers, hematology systems, and complete LIMS solutions for accurate diagnostic results across Ethiopian healthcare facilities.',
      showButton: false,
      alt: IMAGE_ALT_TEXT.hero.diagnosticLab
    },
    {
      image: IMAGES.hero.imagingRadiology,
      title: 'Diagnostic Imaging & Radiology',
      subtitle: 'Advanced imaging solutions featuring digital X-Ray systems, CT scanners, MRI machines, and ultrasound equipment with PACS integration for comprehensive diagnostic capabilities.',
      showButton: false,
      alt: IMAGE_ALT_TEXT.hero.imagingRadiology
    },
    {
      image: IMAGES.hero.criticalCare,
      title: 'Critical Care & Operation Theatre',
      subtitle: 'Life-saving ICU ventilators, patient monitoring systems, anesthesia machines, and surgical equipment designed to ensure optimal outcomes in critical medical procedures.',
      showButton: false,
      alt: IMAGE_ALT_TEXT.hero.criticalCare
    },
    {
      image: IMAGES.hero.hospitalFurniture,
      title: 'Hospital Furniture & Patient Care',
      subtitle: 'Ergonomic hospital beds, patient transfer chairs, medical trolleys, and modular storage solutions designed to enhance patient comfort and healthcare worker efficiency.',
      showButton: false,
      alt: IMAGE_ALT_TEXT.hero.hospitalFurniture
    },
    {
      image: IMAGES.hero.medicalConsumables,
      title: 'Medical Consumables & Reagents',
      subtitle: 'High-quality laboratory reagents, rapid diagnostic test kits, medical disposables, and quality control materials ensuring consistent test accuracy and regulatory compliance.',
      showButton: false,
      alt: IMAGE_ALT_TEXT.hero.medicalConsumables
    }
  ];
  
  const solutionImages = solutionSlides.map(slide => slide.image);

  // Create extended array for infinite scroll (duplicate images)
  const extendedImages = [...solutionImages, ...solutionImages];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Auto-scroll images with different timing: 7 seconds for first slide, 4 seconds for others
  useEffect(() => {
    const currentSlideIndex = currentImageIndex % solutionSlides.length;
    const delay = currentSlideIndex === 0 ? 7000 : 4000; // 7 seconds for first slide, 4 seconds for others
    
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentImageIndex, solutionSlides.length]);

  // Reset to beginning when reaching the end (for infinite effect)
  useEffect(() => {
    if (currentImageIndex >= solutionImages.length) {
      // Disable transition temporarily
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentImageIndex(0);
        // Re-enable transition after reset
        setTimeout(() => setIsTransitioning(true), 50);
      }, 1200); // Wait for current transition to complete
      
      return () => clearTimeout(timer);
    }
  }, [currentImageIndex, solutionImages.length]);

  const heroSolutions = [
    {
      title: "Diagnostic & Laboratory Solutions",
      subtitle: "Complete Laboratory Ecosystems for Accurate Testing",
      description: "Advanced chemistry analyzers, hematology systems, and comprehensive IVD solutions tailored for Ethiopian healthcare facilities with automated workflows and reliable results.",
      image: IMAGES.hero.diagnosticLab,
      alt: IMAGE_ALT_TEXT.hero.diagnosticLab
    },
    {
      title: "Medical Consumables & Reagents", 
      subtitle: "Quality Supplies for Reliable Healthcare Delivery",
      description: "We provide high-quality medical consumables and reagents ensuring consistent results and optimal patient safety standards across Ethiopian healthcare facilities.",
      image: IMAGES.solutions.medicalConsumables,
      alt: IMAGE_ALT_TEXT.hero.medicalConsumables
    },
    {
      title: "Diagnostic Imaging & Radiology",
      subtitle: "Advanced Imaging Technology for Precise Diagnostics", 
      description: "Our imaging solutions provide exceptional image quality and enhanced workflow efficiency, delivering comprehensive diagnostic capabilities for healthcare facilities.",
      image: IMAGES.products.mindray.dc70UltrasoundSystem,
      alt: IMAGE_ALT_TEXT.products.mindray.dc70UltrasoundSystem
    },
    {
      title: "Critical Care & Operation Theatre",
      subtitle: "Life-Saving Equipment for Critical Care",
      description: "Advanced ICU ventilators, multi-parameter monitors, and surgical equipment ensuring optimal patient outcomes during Ethiopia's most critical medical procedures.",
      image: IMAGES.products.mindray.beneventA3Ventilator,
      alt: IMAGE_ALT_TEXT.products.mindray.beneventA3Ventilator
    },
    {
      title: "Hospital Furniture & Patient Care",
      subtitle: "Ergonomic Solutions for Enhanced Comfort and Efficiency",
      description: "Our design specialists are here to help you create comfortable and functional healthcare environments with ergonomic furniture solutions tailored to your facility's needs.",
      image: IMAGES.solutions.hospitalFurniture,
      alt: IMAGE_ALT_TEXT.hero.hospitalFurniture
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSolutions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSolutions.length]);

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-green-100 to-green-200 overflow-hidden" style={{backgroundColor: '#f0fdf4'}}>
      {/* Green Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-green-200" style={{backgroundColor: '#dcfce7'}}></div>
      

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Section - Left */}
            <motion.div 
              key={`image-${currentSlide}`}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <ImageWithFallback
                  src={heroSolutions[currentSlide].image}
                  alt={heroSolutions[currentSlide].alt}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Content Section - Right */}
            <motion.div 
              key={`content-${currentSlide}`}
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <motion.h1 
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 mb-1"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{letterSpacing: '-0.02em'}}
                >
                  {heroSolutions[currentSlide].title}
                </motion.h1>
                
                <motion.h2 
                  className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-green-600 font-medium leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{letterSpacing: '-0.02em'}}
                >
                  {heroSolutions[currentSlide].subtitle}
                </motion.h2>
                
                <motion.p 
                  className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {heroSolutions[currentSlide].description}
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSolutions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-green-600 scale-125'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}