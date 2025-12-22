import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { ArrowRight, Users, Award, Globe, Heart, Shield, Zap, Target, TrendingUp, Clock, CheckCircle, Star, MapPin, Trophy, Building, X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { IMAGES, IMAGE_ALT_TEXT } from "../constants/images";

export function AboutPage() {
  const { navigateTo } = useRouter();
  
  // Modal state for image lightbox
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageAlt, setSelectedImageAlt] = useState<string>("");
  
  // Carousel state for each section
  const [accomplishmentsIndex, setAccomplishmentsIndex] = useState(0);
  const [tigrayIndex, setTigrayIndex] = useState(0);
  const [risingStarsIndex, setRisingStarsIndex] = useState(0);
  const [workshopIndex, setWorkshopIndex] = useState(0);

  // Our Accomplishments images
  const accomplishmentImages = [
    '/images_from_afework/accomplishments/IMG_20250126_115622_153.jpg',
    '/images_from_afework/accomplishments/IMG_20250126_115624_013.jpg',
    '/images_from_afework/accomplishments/IMG_20250126_115709_009.jpg'
  ];
  
  // Tigray Project images
  const tigrayImages = [
    '/images_from_afework/tigray_project/photo_1_2025-11-02_13-45-14.jpg',
    '/images_from_afework/tigray_project/photo_2_2025-11-02_13-45-14.jpg',
    '/images_from_afework/tigray_project/photo_3_2025-11-02_13-45-14.jpg',
    '/images_from_afework/tigray_project/photo_4_2025-11-02_13-45-14.jpg',
    '/images_from_afework/tigray_project/photo_5_2025-11-02_13-45-14.jpg'
  ];

  // Rising Stars Award images
  const risingStarsImages = [
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0012.jpg',
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0013.jpg',
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0020.jpg',
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0041.jpg',
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0047.jpg',
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0049.jpg',
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0050.jpg',
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0051.jpg',
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0052.jpg',
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0054.jpg',
    '/images_from_afework/accomplishments/Mindray 2025 East & Central Africa Rising Stars Award/IMG-20251108-WA0055.jpg'
  ];
  
  // Workshop images
  const workshopImages = [
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0000.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0001.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0002.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0003.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0004.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0005.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0006.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0007.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0008.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0009.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0010.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0011.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0014.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0015.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0016.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0017.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0018.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0019.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0021.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0022.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0023.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0024.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0025.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0026.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0027.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0028.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0029.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0030.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0031.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0032.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0033.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0034.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0035.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0036.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0037.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0038.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0039.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0040.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0042.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0043.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0044.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0045.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0046.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0048.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0053.jpg',
    '/images_from_afework/accomplishments/Mindray Reagent Utilization Quality Impact Workshop/IMG-20251108-WA0056.jpg'
  ];

  // Carousel helper functions
  const imagesPerPage = 6;
  
  const nextSlide = (currentIndex: number, totalImages: number, setIndex: (index: number) => void) => {
    const nextIndex = currentIndex + imagesPerPage;
    if (nextIndex >= totalImages) {
      setIndex(0);
    } else {
      setIndex(nextIndex);
    }
  };
  
  const prevSlide = (currentIndex: number, totalImages: number, setIndex: (index: number) => void) => {
    const prevIndex = currentIndex - imagesPerPage;
    if (prevIndex < 0) {
      const lastPageStart = Math.floor((totalImages - 1) / imagesPerPage) * imagesPerPage;
      setIndex(lastPageStart);
    } else {
      setIndex(prevIndex);
    }
  };
  
  const getTotalPages = (totalImages: number) => Math.ceil(totalImages / imagesPerPage);
  const getCurrentPage = (currentIndex: number) => Math.floor(currentIndex / imagesPerPage) + 1;
  const goToPage = (pageIndex: number, setIndex: (index: number) => void) => {
    setIndex(pageIndex * imagesPerPage);
  };

  // Arrow navigation functions
  const goToPrevious = (currentIndex: number, setIndex: (index: number) => void, totalImages: number) => {
    const newIndex = currentIndex === 0 ? totalImages - imagesPerPage : currentIndex - imagesPerPage;
    setIndex(newIndex);
  };

  const goToNext = (currentIndex: number, setIndex: (index: number) => void, totalImages: number) => {
    const newIndex = currentIndex >= totalImages - imagesPerPage ? 0 : currentIndex + imagesPerPage;
    setIndex(newIndex);
  };

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Afework Pharma Medical Solutions",
    "foundingDate": "2019",
    "founder": {
      "@type": "Person",
      "name": "Afework Woldesilassie"
    },
    "description": "Ethiopia medical technology partner providing healthcare innovation and trusted medical distribution services since 2019.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Ethiopia",
      "addressLocality": "Addis Ababa"
    },
    "numberOfEmployees": "10-50",
    "industry": "Medical Equipment and Healthcare Technology",
    "serviceArea": {
      "@type": "Country", 
      "name": "Ethiopia"
    },
    "knowsAbout": [
      "Medical Equipment Distribution",
      "Healthcare Technology",
      "Diagnostic Solutions",
      "Hospital Setup",
      "Medical Device Training"
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="About Afework Pharma Medical Solutions | Healthcare Innovation Ethiopia"
        description="Learn about Afework Pharma - Ethiopia's trusted medical technology partner since 2019. Healthcare innovation, medical equipment distribution, and trusted solutions for Ethiopian healthcare facilities."
        keywords="About Afework Pharma Medical Solutions, Ethiopia medical technology partner, healthcare innovation Ethiopia, Afework Woldesilassie, trusted medical distributor, medical equipment company history, Ethiopian healthcare solutions"
        canonical="/about"
        ogTitle="About Afework Pharma Medical Solutions | Healthcare Innovation Ethiopia"
        ogDescription="Ethiopia's trusted medical technology partner since 2019. Healthcare innovation, medical equipment distribution, and trusted solutions for Ethiopian healthcare facilities."
        structuredData={structuredData}
      />
      {/* Hero Section - Narrative Unveiling */}
      <section className="py-16 sm:py-20 lg:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <motion.div 
              className="space-y-6 sm:space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div>
                <motion.h1 
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 text-gray-900 leading-tight"
                  variants={heroVariants}
                >
                  Advancing Healthcare Through Innovation
                </motion.h1>
                <motion.p 
                  className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed"
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
                className="w-full h-64 sm:h-80 lg:h-96 object-cover shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Redesigned */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Side - Our Story Image */}
            <motion.div 
              className="flex items-center justify-center"
              initial="hiddenLeft"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={missionVisionVariants}
            >
              <ImageWithFallback 
                src={IMAGES.logos.afeworkPharma}
                alt={IMAGE_ALT_TEXT.logos.afeworkPharma}
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </motion.div>

            {/* Right Side - Mission & Vision Cards */}
            <motion.div 
              className="flex flex-col gap-6"
              initial="hiddenRight"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={missionVisionVariants}
            >
              {/* Our Mission Card - Light Green */}
              <motion.div 
                className="bg-green-100 rounded-[2rem] p-8 shadow-2xl flex-1 border border-green-200"
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.3 }
                }}
                style={{
                  borderRadius: '2rem',
                  boxShadow: '0 20px 40px -12px rgba(34, 197, 94, 0.2)'
                }}
              >
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Our Mission</h3>
                <p className="text-gray-900 leading-relaxed text-sm lg:text-base">
                  To transform healthcare delivery in Ethiopia by providing state-of-the-art medical 
                  equipment, comprehensive training, and unwavering technical support that empowers 
                  healthcare professionals to deliver exceptional patient care.
                </p>
              </motion.div>

              {/* Our Vision Card - White */}
              <motion.div 
                className="bg-white rounded-[2rem] p-8 shadow-2xl flex-1 border border-gray-200"
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.3 }
                }}
                style={{
                  borderRadius: '2rem',
                  boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Our Vision</h3>
                <p className="text-gray-900 leading-relaxed text-sm lg:text-base">
                  To be the leading catalyst in Ethiopia's healthcare transformation, bridging the 
                  gap between global medical innovation and local healthcare needs, ensuring every 
                  Ethiopian has access to world-class medical care.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Accomplishments */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div 
            className="text-left mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>
                  Our Accomplishments
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed">
                  A visual journey through our milestones, partnerships, and the impact we've made 
                  in transforming healthcare across Ethiopia.
                </p>
              </div>
              
              {/* Arrow Navigation - Only show if there are more than 6 images */}
              {accomplishmentImages.length > imagesPerPage && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => goToPrevious(accomplishmentsIndex, setAccomplishmentsIndex, accomplishmentImages.length)}
                    className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                    aria-label="Previous accomplishments"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => goToNext(accomplishmentsIndex, setAccomplishmentsIndex, accomplishmentImages.length)}
                    className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                    aria-label="Next accomplishments"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            key={accomplishmentsIndex}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {accomplishmentImages.slice(accomplishmentsIndex, accomplishmentsIndex + imagesPerPage).map((imagePath, index) => (
              <motion.div 
                key={accomplishmentsIndex + index}
                className="group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1
                    }
                  }
                }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  <ImageWithFallback 
                    src={imagePath}
                    alt={`Accomplishment Image ${accomplishmentsIndex + index + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      console.error('Failed to load image:', imagePath);
                      e.currentTarget.src = '/assets/images/medical-equipments.png';
                    }}
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tigray Project Gallery */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div 
            className="text-left mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>
                  CDC-Tigray Regional Health Bureau Project
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed">
                  Supporting healthcare infrastructure and medical services in the Tigray region through strategic partnerships and community engagement.
                </p>
              </div>
              
              {/* Arrow Navigation - Only show if there are more than 6 images */}
              {tigrayImages.length > imagesPerPage && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => goToPrevious(tigrayIndex, setTigrayIndex, tigrayImages.length)}
                    className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                    aria-label="Previous Tigray project images"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => goToNext(tigrayIndex, setTigrayIndex, tigrayImages.length)}
                    className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                    aria-label="Next Tigray project images"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            key={tigrayIndex}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {tigrayImages.slice(tigrayIndex, tigrayIndex + imagesPerPage).map((imagePath, index) => (
                <motion.div 
                  key={tigrayIndex + index}
                  className="group"
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 30,
                      scale: 0.9
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.1
                      }
                    }
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <img 
                      src={imagePath}
                      alt={`Tigray Project Image ${tigrayIndex + index + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        console.error('Failed to load Tigray image:', imagePath);
                        e.currentTarget.src = '/assets/images/medical-equipments.png';
                      }}
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* Mindray 2025 East & Central Africa Rising Stars Award */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div 
            className="text-left mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>
                  Mindray 2025 East & Central Africa Rising Stars Award
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed">
                  Recognition of excellence and innovation in medical technology distribution across East and Central Africa.
                </p>
              </div>
              
              {/* Arrow Navigation - Only show if there are more than 6 images */}
              {risingStarsImages.length > imagesPerPage && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => goToPrevious(risingStarsIndex, setRisingStarsIndex, risingStarsImages.length)}
                    className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                    aria-label="Previous Rising Stars images"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => goToNext(risingStarsIndex, setRisingStarsIndex, risingStarsImages.length)}
                    className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                    aria-label="Next Rising Stars images"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            key={risingStarsIndex}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {risingStarsImages.slice(risingStarsIndex, risingStarsIndex + imagesPerPage).map((imagePath, index) => (
                <motion.div 
                  key={risingStarsIndex + index}
                  className="group"
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 30,
                      scale: 0.9
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'easeOut'
                      }
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: {
                      duration: 0.3
                    }
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <img 
                      src={imagePath}
                      alt={`Rising Stars Award ${risingStarsIndex + index + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        console.error('Failed to load rising stars image:', imagePath);
                        e.currentTarget.src = '/assets/images/medical-equipments.png';
                      }}
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* Mindray Reagent Utilization Quality Impact Workshop */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div 
            className="text-left mb-12 lg:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>
                  Mindray Reagent Utilization Quality Impact Workshop
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed">
                  Comprehensive training and knowledge sharing on reagent utilization best practices, quality control measures, and their impact on diagnostic accuracy and patient outcomes.
                </p>
              </div>
              
              {/* Arrow Navigation - Only show if there are more than 6 images */}
              {workshopImages.length > imagesPerPage && (
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => goToPrevious(workshopIndex, setWorkshopIndex, workshopImages.length)}
                    className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                    aria-label="Previous Workshop images"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => goToNext(workshopIndex, setWorkshopIndex, workshopImages.length)}
                    className="bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                    aria-label="Next Workshop images"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            key={workshopIndex}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {workshopImages.slice(workshopIndex, workshopIndex + imagesPerPage).map((imagePath, index) => (
                <motion.div 
                  key={workshopIndex + index}
                  className="group"
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 30,
                      scale: 0.9
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: 'easeOut'
                      }
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: {
                      duration: 0.3
                    }
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <img 
                      src={imagePath}
                      alt={`Workshop Image ${workshopIndex + index + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        console.error('Failed to load workshop image:', imagePath);
                        e.currentTarget.src = '/assets/images/medical-equipments.png';
                      }}
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 sm:py-20 lg:py-24 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="mb-8 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <h2 className="text-2xl sm:text-3xl text-gray-900 mb-3 sm:mb-4">Leadership Team</h2>
          </motion.div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
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
                image: IMAGES.team.afeworkWoldesilassie,
                featured: true
              },
              {
                name: "Dr. Meron Getachew",
                position: "Technical Director", 
                bio: "Biomedical engineer with 10+ years of experience in medical equipment installation, maintenance, and quality assurance. Leads our technical team in ensuring optimal equipment performance across all deployments.",
                image: IMAGES.team.meronGetachew,
                featured: false
              },
              {
                name: "Ato Dawit Alemayehu",
                position: "Operations Manager",
                bio: "Healthcare logistics specialist with extensive experience in supply chain management and project coordination. Ensures seamless delivery and implementation of medical solutions across Ethiopian healthcare facilities.",
                image: IMAGES.team.dawitAlemayehu,
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
                <div className="flex items-start gap-6">
                  <div className="relative flex-shrink-0">
                    <motion.div 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-white shadow-lg"
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
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 text-left mb-1 sm:mb-2" style={{letterSpacing: '-0.02em'}}>{member.name}</h3>
                    <p className="text-green-600 font-medium text-left text-xs sm:text-sm">{member.position}</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-600 text-left text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Timeline - The Star of the Show */}
      <section className="py-16 sm:py-20 lg:py-24 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="mb-8 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <h2 className="text-2xl sm:text-3xl text-gray-900 mb-3 sm:mb-4">Our Journey</h2>
          </motion.div>
          
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <motion.div 
                  key={index} 
                  className="flex gap-3 sm:gap-4 lg:gap-6 items-start p-3 sm:p-4 lg:p-6 bg-white/50 rounded-xl border border-gray-100 hover:bg-white/80 transition-colors duration-200"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={containerVariants}
                >
                  <motion.div 
                    className="flex-shrink-0 w-14 sm:w-16 lg:w-20 text-left"
                    variants={timelineVariants}
                  >
                    <div className="text-base sm:text-lg lg:text-xl font-bold text-green-600 mb-1 sm:mb-2">{milestone.year}</div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-1 sm:mb-2">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                    </div>
                    {index < milestones.length - 1 && (
                      <motion.div 
                        className="w-px h-6 sm:h-8 lg:h-10 bg-gray-200 mx-auto mt-2 sm:mt-3"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{ originY: 0 }}
                      />
                    )}
                  </motion.div>
                  <motion.div 
                    className="flex-1 pb-2 sm:pb-3 lg:pb-4"
                    variants={timelineContentVariants}
                  >
                    <div className="pl-1 sm:pl-2 lg:pl-4">
                      <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 mb-1 sm:mb-2" style={{letterSpacing: '-0.02em'}}>{milestone.title}</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2 sm:mb-3 leading-relaxed">{milestone.description}</p>
                      {milestone.achievement && (
                        <motion.div 
                          className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-3"
                          variants={achievementTagVariants}
                        >
                          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                          <span className="text-xs sm:text-sm font-medium text-green-700">{milestone.achievement}</span>
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

      {/* Image Modal/Lightbox - Fixed Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            style={{ position: 'fixed', zIndex: 9999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl max-h-[85vh] w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all duration-200 z-20 backdrop-blur-sm"
                aria-label="Close image"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Image Container */}
              <div className="relative w-full max-w-4xl mx-auto h-[70vh] min-h-[320px] bg-gray-100 overflow-hidden rounded-xl">
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt={selectedImageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1.05, opacity: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onError={(e) => {
                    console.error('Failed to load modal image:', selectedImage);
                    e.currentTarget.src = '/assets/images/medical-equipments.png';
                  }}
                />
              </div>

              {/* Image caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t border-gray-200">
                <p className="text-gray-800 text-left font-medium text-lg">{selectedImageAlt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}