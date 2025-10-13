import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { Award, Users, MapPin, Clock, ArrowRight, Trophy, CheckCircle, TrendingUp, Building } from "lucide-react";

export function AboutPage() {
  const { navigateTo } = useRouter();

  // Animation variants for narrative unveiling
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const kenBurnsVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1.05,
      transition: {
        opacity: { duration: 0.8 },
        scale: { duration: 10 }
      }
    }
  };

  const missionVisionVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const achievementIconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const achievementTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const timelineContentVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const achievementTagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.5
      }
    }
  };

  const leadershipCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
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

  const achievements = [
    {
      icon: Award,
      title: "5+ Years Experience",
      description: "Leading medical equipment distribution in Ethiopia"
    },
    {
      icon: Users,
      title: "45+ IVD Units",
      description: "Recently deployed across 36 health facilities"
    },
    {
      icon: MapPin,
      title: "Nationwide Coverage",
      description: "Service centers in major Ethiopian cities"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance"
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Established by Afework Woldesilassie with ETB 300,000 initial capital",
      icon: Building,
      achievement: null
    },
    {
      year: "2020",
      title: "Business Growth",
      description: "Expanded operations and established key partnerships",
      icon: TrendingUp,
      achievement: null
    },
    {
      year: "2023",
      title: "Major Milestone",
      description: "Achieved annual turnover exceeding ETB 170 million",
      icon: Trophy,
      achievement: "ETB 170M+ Annual Turnover"
    },
    {
      year: "2024",
      title: "CDC-Tigray Project",
      description: "Successfully deployed 45 IVD units across 36 health facilities",
      icon: CheckCircle,
      achievement: "45 IVD Units Deployed"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Narrative Unveiling */}
      <section className="py-24" style={{backgroundColor: '#ecfdf5'}}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div>
                <motion.h1 
                  className="text-5xl mb-6 text-gray-900"
                  variants={heroVariants}
                >
                  Advancing Healthcare Through Innovation
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 leading-relaxed"
                  variants={heroVariants}
                >
                  Since 2019, Afework Pharma has been Ethiopia's trusted partner in medical technology, 
                  delivering world-class equipment and comprehensive support services to healthcare 
                  institutions nationwide.
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative overflow-hidden rounded-2xl"
              initial="hidden"
              animate="visible"
              variants={kenBurnsVariants}
            >
              <ImageWithFallback 
                src="/assets/images/afewrork-team-image.jpg"
                alt="Afework Pharma team in Ethiopian hospital"
                className="w-full h-96 object-cover shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16" style={{backgroundColor: '#f0fdf4'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="space-y-6"
              initial="hiddenLeft"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={missionVisionVariants}
            >
              <h2 className="text-3xl text-gray-900">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To transform healthcare delivery in Ethiopia by providing state-of-the-art medical 
                equipment, comprehensive training, and unwavering technical support that empowers 
                healthcare professionals to deliver exceptional patient care.
              </p>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial="hiddenRight"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={missionVisionVariants}
            >
              <h2 className="text-3xl text-gray-900">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the leading catalyst in Ethiopia's healthcare transformation, bridging the 
                gap between global medical innovation and local healthcare needs, ensuring every 
                Ethiopian has access to world-class medical care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-16" style={{backgroundColor: '#f7fee7'}}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <h2 className="text-3xl text-gray-900 mb-4">Key Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our track record speaks for itself - delivering excellence across Ethiopia's healthcare landscape
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div 
                  key={index} 
                  className="text-center space-y-3 sm:space-y-4"
                  variants={achievementTextVariants}
                >
                  <motion.div 
                    className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-200 rounded-xl flex items-center justify-center mx-auto"
                    variants={achievementIconVariants}
                  >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-base sm:text-lg text-gray-900">{achievement.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{achievement.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Company Timeline - The Star of the Show */}
      <section className="py-16" style={{backgroundColor: '#f8fafc'}}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <h2 className="text-3xl text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Building Ethiopia's healthcare infrastructure one project at a time
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <motion.div 
                  key={index} 
                  className="flex gap-8 items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={containerVariants}
                >
                  <motion.div 
                    className="flex-shrink-0 w-20 text-center"
                    variants={timelineVariants}
                  >
                    <div className="text-2xl font-bold text-green-600 mb-2">{milestone.year}</div>
                    <div className="w-12 h-12 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-2">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    {index < milestones.length - 1 && (
                      <motion.div 
                        className="w-px h-16 bg-gray-200 mx-auto mt-4"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{ originY: 0 }}
                      />
                    )}
                  </motion.div>
                  <motion.div 
                    className="flex-1 pb-8"
                    variants={timelineContentVariants}
                  >
                    <div className="pl-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 mb-3">{milestone.description}</p>
                      {milestone.achievement && (
                        <motion.div 
                          className="flex items-center gap-2 mt-3"
                          variants={achievementTagVariants}
                        >
                          <Trophy className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">{milestone.achievement}</span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16" style={{backgroundColor: '#f1f5f9'}}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <h2 className="text-3xl text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to advancing Ethiopian healthcare
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                name: "Mr. Afework Woldesilassie",
                position: "Founder & Chief Executive Officer",
                bio: "Visionary leader with international investment acumen and deep healthcare expertise. Founded Afework Pharma in 2019 with a mission to transform Ethiopian healthcare through innovative medical technology solutions.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMGFmcmljYW58ZW58MXx8fHwxNzU5ODI5MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
                featured: true
              },
              {
                name: "Dr. Meron Getachew",
                position: "Technical Director", 
                bio: "Biomedical engineer with 10+ years of experience in medical equipment installation, maintenance, and quality assurance. Leads our technical team in ensuring optimal equipment performance across all deployments.",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGVuZ2luZWVyJTIwYWZyaWNhbnxlbnwxfHx8fDE3NTk4MjkzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
                featured: false
              },
              {
                name: "Ato Dawit Alemayehu",
                position: "Operations Manager",
                bio: "Healthcare logistics specialist with extensive experience in supply chain management and project coordination. Ensures seamless delivery and implementation of medical solutions across Ethiopian healthcare facilities.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbnxlbnwxfHx8fDE3NTk4MjkzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
                featured: false
              }
            ].map((member, index) => (
              <motion.div 
                key={index} 
                className={`bg-white p-6 rounded-xl border transition-all duration-300 hover:shadow-lg h-full flex flex-col ${member.featured ? 'border-green-200 shadow-md' : 'border-gray-200'}`}
                variants={leadershipCardVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative mb-4 flex-shrink-0">
                  <motion.div 
                    className="w-20 h-20 mx-auto rounded-full overflow-hidden border-3 border-white shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ImageWithFallback 
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  {member.featured && (
                    <div className="absolute -top-1 -right-1 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Founder
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium text-center mb-3 text-sm">{member.position}</p>
                  <p className="text-gray-600 text-center text-xs leading-relaxed flex-grow">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}