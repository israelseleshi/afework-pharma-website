import React from "react";
import { motion } from "framer-motion";
import { Microscope, Users, MapPin, Shield } from "lucide-react";

export function ValueProposition() {
  const values = [
    {
      icon: Microscope,
      title: "Cutting-Edge Products",
      description: "Sourcing certified, state-of-the-art technology from global leaders in medical equipment manufacturing."
    },
    {
      icon: Users,
      title: "End-to-End Support",
      description: "From installation and training to 24/7 technical support, we ensure your success at every step."
    },
    {
      icon: MapPin,
      title: "Nationwide Reach",
      description: "Proven capability in executing complex, multi-site projects across Ethiopia with local expertise."
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Full regulatory and logistics management ensuring compliance with international and local standards."
    }
  ];

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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose Afework Pharma?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We are more than a supplier; we are your strategic partner in advancing 
            healthcare in Ethiopia. Experience the difference of working with true experts.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div 
                key={index}
                className="group p-8 rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-xl border-2 border-gray-100 flex items-center justify-center mb-6 group-hover:border-green-200 transition-all duration-300"
                  whileHover={{ 
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                >
                  <IconComponent className="w-8 h-8 text-green-600" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
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