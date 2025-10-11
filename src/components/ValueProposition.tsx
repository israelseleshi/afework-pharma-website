import React from "react";
import { motion } from "framer-motion";
import { Microscope, Users, MapPin, Shield } from "lucide-react";
import { useContent } from "../hooks/useContent";

export function ValueProposition() {
  const { getJsonContent } = useContent();
  
  // Get dynamic content
  const values = getJsonContent('value_propositions', [
    {
      icon: 'Microscope',
      title: "Cutting-Edge Products",
      description: "Sourcing certified, state-of-the-art technology from global leaders in medical equipment manufacturing."
    },
    {
      icon: 'Users',
      title: "End-to-End Support",
      description: "From installation and training to 24/7 technical support, we ensure your success at every step."
    },
    {
      icon: 'MapPin',
      title: "Nationwide Reach",
      description: "Proven capability in executing complex, multi-site projects across Ethiopia with local expertise."
    },
    {
      icon: 'Shield',
      title: "Regulatory Compliance",
      description: "Full regulatory and logistics management ensuring compliance with international and local standards."
    }
  ]);

  // Icon mapping
  const iconMap = {
    Microscope,
    Users,
    MapPin,
    Shield
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-mint/20 to-tea-green/10" style={{background: 'linear-gradient(to bottom, #f0fdf4, #f7fee7)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Why Choose Afework Pharma?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We are more than a supplier; we are your strategic partner in advancing 
            healthcare in Ethiopia. Experience the difference of working with true experts.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {values.map((value, index) => {
            const IconComponent = iconMap[value.icon as keyof typeof iconMap];
            return (
              <motion.div 
                key={index}
                className="group p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl border-2 border-gray-100 flex items-center justify-center mb-4 sm:mb-6 group-hover:border-green-200 transition-all duration-300"
                  whileHover={{ 
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                >
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
                </motion.div>
                
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">
                  {value.title}
                </h3>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}