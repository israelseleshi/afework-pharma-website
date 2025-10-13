import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useContent } from "../hooks/useContent";

// Typewriter Animation Component
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

// Counter Animation Component
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
  const { getTextContent, getJsonContent } = useContent();
  
  // Get dynamic content
  const headline = getTextContent('hero_headline', 'Advanced Medical Solutions for a Healthier Ethiopia');
  const subheadline = getTextContent('hero_subheadline', 'Delivering state-of-the-art medical equipment backed by comprehensive technical support and training across the nation. Your trusted partner in healthcare technology advancement.');
  const stats = getJsonContent('hero_stats', [
    { number: 45, suffix: '+', label: 'IVD Units Deployed' },
    { number: 36, suffix: '+', label: 'Healthcare Facilities' },
    { number: 5, suffix: '+', label: 'Years Experience' }
  ]);

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
        duration: 0.8
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      rotate: -10,
      x: 100 
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      transition: {
        duration: 1.2,
        delay: 0.5
      }
    }
  };


  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
          animate={{ opacity: 0.45, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 2, 
            ease: "easeOut",
            delay: 0.5
          }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src="/assets/images/medical-equipments.png"
            className="w-full h-full object-cover lg:object-contain lg:object-center"
          />
        </motion.div>
        {/* Black Animated Color Overlay */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            background: [
              'linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.65))',
              'linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.85))'
            ]
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.8 },
            background: { duration: 4, repeat: Infinity, repeatType: "reverse", delay: 2 }
          }}
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 w-full">
        <div className="flex justify-center items-center min-h-[60vh]">
          {/* Centered Content - Animated */}
          <motion.div 
            className="space-y-8 text-center max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-8">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white"
                variants={itemVariants}
              >
                {headline.split('Healthier Ethiopia')[0]}
                <span className="block text-green-600 mt-2">
                  <TypewriterText text="Healthier Ethiopia" speed={100} delay={300} />
                </span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl leading-relaxed text-white"
                variants={itemVariants}
              >
                {subheadline}
              </motion.p>
            </div>

            {/* Key Statistics - Staggered Animation */}
            <motion.div
              className="grid grid-cols-3 gap-8 sm:gap-12 pt-12 mt-8"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={statsVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-3">
                    <AnimatedCounter end={stat.number} duration={2000} delay={index * 200} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm sm:text-base font-medium text-white">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}