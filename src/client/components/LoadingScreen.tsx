import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: Logo appears (0-1s)
    const timer1 = setTimeout(() => setStage(1), 800);
    
    // Stage 1: Title appears (1-2s)
    const timer2 = setTimeout(() => setStage(2), 1600);
    
    // Stage 2: Tagline appears (2-2.5s)
    const timer3 = setTimeout(() => setStage(3), 2200);
    
    // Stage 3: Fade out everything (2.5-3s)
    const timer4 = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          width: '100vw'
        }}
      >
        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Content Container */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center space-y-8"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ 
              scale: stage >= 0 ? 1 : 0,
              rotate: stage >= 0 ? 0 : -180,
              opacity: stage >= 0 ? 1 : 0
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.34, 1.56, 0.64, 1], // Bounce effect
            }}
            className="relative"
          >
            {/* Pulsing Ring Behind Logo */}
            <motion.div
              className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Logo */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl p-6 flex items-center justify-center">
              <img 
                src="/assets/logos/afework-pharma-logo-full.png" 
                alt="Afework Pharma" 
                className="w-full h-full object-contain"
                style={{ filter: 'none', boxShadow: 'none' }}
              />
            </div>

          </motion.div>

          {/* Company Name Animation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ 
              y: stage >= 1 ? 0 : 30,
              opacity: stage >= 1 ? 1 : 0
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
              Afework Pharma
            </h1>
          </motion.div>

          {/* Tagline Animation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: stage >= 2 ? 0 : 20,
              opacity: stage >= 2 ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <p className="text-lg md:text-xl text-gray-600 font-medium">
              Medical Solutions Provider
            </p>
          </motion.div>

          {/* Loading Progress Bar */}
          <motion.div
            className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Particle Effect */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
