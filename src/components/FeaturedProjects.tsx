import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, MapPin, Calendar, Users, Award, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FeaturedProjects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
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
  const projects = [
    {
      title: "CDC-Tigray Regional Health System Strengthening Project",
      client: "Tigray Regional Health Bureau",
      sponsor: "CDC Ethiopia",
      year: "2024",
      image: "https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBob3NwaXRhbCUyMG1lZGljYWwlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NTk4MjkwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      stats: [
        { icon: MapPin, label: "36 Health Facilities", value: "Across Tigray" },
        { icon: Users, label: "45 IVD Units", value: "Deployed" },
        { icon: Calendar, label: "40 Days", value: "Timeline" },
        { icon: Award, label: "100+", value: "Staff Trained" }
      ],
      description: "Complete turnkey project providing diagnostic equipment to restore critical healthcare services across post-conflict regions.",
      achievements: [
        "45 IVD Units Successfully Deployed",
        "Comprehensive Staff Training Program",
        "Letter of Appreciation Received",
        "24/7 Technical Support Established"
      ]
    },
    {
      title: "FDRE Defense Referral Hospital Modernization",
      client: "Federal Defense Hospital",
      sponsor: "Ministry of Defense",
      year: "2023",
      image: "/assets/logos/fdre-defense-referral-hospital.jpg",
      stats: [
        { icon: MapPin, label: "Major Hospital", value: "Addis Ababa" },
        { icon: Users, label: "Multiple Depts", value: "Upgraded" },
        { icon: Calendar, label: "6 Months", value: "Project Duration" },
        { icon: Award, label: "Advanced", value: "Technology" }
      ],
      description: "Comprehensive medical equipment upgrade including laboratory, imaging, and critical care solutions for Ethiopia's premier defense hospital.",
      achievements: [
        "Complete Laboratory Modernization",
        "Advanced Imaging Solutions",
        "Ongoing Maintenance Contract"
      ]
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-28" style={{background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Proven Success in Critical Projects
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our track record speaks for itself. From emergency deployments to comprehensive 
            hospital modernizations, we deliver excellence when it matters most.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-12 sm:space-y-16 lg:space-y-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center"
              variants={projectVariants}
            >
              {/* Project Image - Now comes first */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <ImageWithFallback 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year} Project</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                    {project.title}
                  </h3>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <div className="text-base sm:text-lg text-slate-700">
                      <span className="font-semibold">Client:</span> {project.client}
                    </div>
                    <div className="text-base sm:text-lg text-slate-700">
                      <span className="font-semibold">Sponsor:</span> {project.sponsor}
                    </div>
                  </div>
                  
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {project.stats.map((stat, statIndex) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={statIndex} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 lg:p-4 bg-white rounded-lg border border-slate-200">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-green-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-xs sm:text-sm lg:text-base text-slate-900">{stat.value}</div>
                          <div className="text-xs sm:text-xs lg:text-sm text-slate-600">{stat.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-semibold text-base sm:text-lg text-slate-900">Key Achievements:</h4>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {project.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        </div>
                        <span className="text-sm sm:text-base text-slate-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}