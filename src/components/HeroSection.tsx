import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { useCMSContent } from "../hooks/useCMSContent"; // Removed to prevent database loading

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
    100% {
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
  // Hardcoded content to prevent database loading
  const headline = 'Advanced Medical Solutions for a Healthier Ethiopia';
  const subheadline = 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement.';
  const stats = [
    { number: 45, suffix: '+', label: 'IVD Units Deployed' },
    { number: 36, suffix: '+', label: 'Healthcare Facilities' },
    { number: 5, suffix: '+', label: 'Years Experience' }
  ];

  // Medical solution images and content for carousel
  const solutionSlides = [
    {
      image: '/assets/images/medical-equipments.png',
      title: 'Leading Medical Equipment Supplier in Ethiopia',
      subtitle: 'The best way to advance healthcare in Ethiopia',
      showButton: true
    },
    {
      image: '/assets/images/diagnostic-&-laboratory-solutions.jpg',
      title: 'Diagnostic & Laboratory Solutions',
      subtitle: 'Comprehensive laboratory equipment including automated chemistry analyzers, hematology systems, and complete LIMS solutions for accurate diagnostic results across Ethiopian healthcare facilities.',
      showButton: false
    },
    {
      image: '/assets/images/diagnostic-imaging-&-radiology.jpg',
      title: 'Diagnostic Imaging & Radiology',
      subtitle: 'Advanced imaging solutions featuring digital X-Ray systems, CT scanners, MRI machines, and ultrasound equipment with PACS integration for comprehensive diagnostic capabilities.',
      showButton: false
    },
    {
      image: '/assets/images/critical-care-&-operation-theatre.jpg',
      title: 'Critical Care & Operation Theatre',
      subtitle: 'Life-saving ICU ventilators, patient monitoring systems, anesthesia machines, and surgical equipment designed to ensure optimal outcomes in critical medical procedures.',
      showButton: false
    },
    {
      image: '/assets/images/hospital-furniture-&-patient-care.jpg',
      title: 'Hospital Furniture & Patient Care',
      subtitle: 'Ergonomic hospital beds, patient transfer chairs, medical trolleys, and modular storage solutions designed to enhance patient comfort and healthcare worker efficiency.',
      showButton: false
    },
    {
      image: '/assets/images/medical-equipments.png',
      title: 'Medical Consumables & Reagents',
      subtitle: 'High-quality laboratory reagents, rapid diagnostic test kits, medical disposables, and quality control materials ensuring consistent test accuracy and regulatory compliance.',
      showButton: false
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
  
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background container (unchanged) */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {solutionImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: index === (currentImageIndex % solutionImages.length) ? 0.6 : 0,
                  scale: index === (currentImageIndex % solutionImages.length) ? 1 : 1.1
                }}
                transition={{ 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <div className="hero-image-animated w-full h-full">
                  <ImageWithFallback
                    src={image}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'blur(1px) brightness(0.8) contrast(1.2) saturate(1.1)',
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/50 to-green-600/30" />
              </motion.div>
            ))}
          </div>
          
          <div className="absolute inset-0 pointer-events-none z-15" 
               style={{
                 background: `linear-gradient(135deg, 
                   rgba(20, 83, 45, 0.85) 0%, 
                   rgba(34, 97, 60, 0.70) 40%, 
                   rgba(52, 168, 83, 0.55) 70%, 
                   rgba(74, 222, 128, 0.40) 100%)`
               }} 
          />
        </div>
      </div>
      
      {/* Hero Content - Left Aligned */}
      <div className="absolute inset-0 z-30 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-5xl py-8 sm:py-12 lg:py-16">
            {/* Dynamic Main Heading */}
            <motion.h1
              key={currentImageIndex} // Add key to trigger re-animation on slide change
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {currentImageIndex === 0 ? (
                <>
                  Advanced Medical Solutions for a{' '}
                  <span className="text-green-400 block sm:inline">Healthier Ethiopia</span>
                </>
              ) : (
                <>
                  <span className="text-green-400">
                    {solutionSlides[currentImageIndex % solutionSlides.length]?.title}
                  </span>
                </>
              )}
            </motion.h1>

            {/* Divider Line */}
            <motion.div
              className="w-16 sm:w-20 lg:w-24 h-0.5 lg:h-1 bg-green-400 mb-6 lg:mb-8"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            />

            {/* Dynamic Description */}
            <motion.p
              key={`desc-${currentImageIndex}`} // Add key to trigger re-animation on slide change
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white mb-8 sm:mb-12 lg:mb-16 max-w-4xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {currentImageIndex === 0 
                ? "Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement."
                : solutionSlides[currentImageIndex % solutionSlides.length]?.subtitle
              }
            </motion.p>

            {/* Statistics - Only show on first slide */}
            {currentImageIndex === 0 && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Stat 1 */}
                <div className="text-left sm:text-center lg:text-left bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white mb-3 lg:mb-4">
                    <AnimatedCounter end={45} duration={2000} delay={800} />+
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white font-medium leading-tight">
                    IVD Units Deployed
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="text-left sm:text-center lg:text-left bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white mb-3 lg:mb-4">
                    <AnimatedCounter end={36} duration={2000} delay={1000} />+
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white font-medium leading-tight">
                    Healthcare Facilities
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="text-left sm:text-center lg:text-left sm:col-span-2 lg:col-span-1 bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white mb-3 lg:mb-4">
                    <AnimatedCounter end={5} duration={2000} delay={1200} />+
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white font-medium leading-tight">
                    Years Experience
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
    </section>
  );
}