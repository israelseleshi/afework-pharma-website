import React from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
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

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.4
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

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Full Height Image on Right with Gradient Fade */}
      <motion.div 
        className="absolute inset-y-0 right-0 w-[55%] z-0"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative w-full h-full">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwZXF1aXBtZW50JTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc1OTgyOTAzNHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Modern medical laboratory equipment in Ethiopian hospital"
            className="w-full h-full object-cover object-right"
          />
          {/* Gradient fade - starts solid white on left (45% from left), fades to transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/80 via-30% via-white/40 via-60% to-transparent to-100%"></div>
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 w-full">
        <motion.div 
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content - Animated */}
          <div className="space-y-8">
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-slate-900"
                variants={itemVariants}
              >
                Advanced Medical Solutions for a 
                <span className="text-green-600 block">Healthier Ethiopia</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed"
                variants={itemVariants}
              >
                Delivering state-of-the-art medical equipment backed by comprehensive 
                technical support and training across the nation. Your trusted partner 
                in healthcare technology advancement.
              </motion.p>
            </div>

            {/* Key Statistics - Staggered Animation */}
            <motion.div 
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-slate-200"
              variants={itemVariants}
            >
              {[
                { number: "45+", label: "IVD Units Deployed" },
                { number: "36+", label: "Healthcare Facilities" },
                { number: "5+", label: "Years Experience" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center sm:text-left"
                  variants={statsVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}