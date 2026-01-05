/**
 * Centralized image constants for consistent image management
 * All image paths follow the standardized folder structure and naming conventions
 */

export const IMAGES = {
  // Hero section images (using general medical equipment image as fallback)
  hero: {
    main: '/assets/images/medical-equipments.png',
    diagnosticLab: '/assets/images/diagnostic-&-laboratory-solutions.png',
    imagingRadiology: '/assets/images/solutions/imaging-radiology.webp',
    criticalCare: '/assets/images/solutions/critical-care.webp',
    hospitalFurniture: '/assets/images/products/mindray/hospital_furniture.png',
    medicalConsumables: '/assets/images/products/mindray/medical_consumables.png'
  },

  // Solution category images
  solutions: {
    diagnosticLab: '/assets/images/diagnostic-&-laboratory-solutions.png',
    imagingRadiology: '/assets/images/solutions/imaging-radiology.webp',
    criticalCare: '/assets/images/solutions/critical-care.webp',
    hospitalFurniture: '/assets/images/products/mindray/hospital_furniture.png',
    medicalConsumables: '/assets/images/products/mindray/medical_consumables.png'
  },

  // Product images - Actual Mindray product images
  products: {
    mindray: {
      bs240ChemistryAnalyzer: '/assets/images/products/mindray/mindray-bs-240-pro-chemistry-analyzer.png',
      bc5150HematologyAnalyzer: '/assets/images/products/mindray/mindray-bc-5150-hermatology-analyzer.png',
      dc70UltrasoundSystem: '/assets/images/products/mindray/mindray-dc-70-ultrasound-system.png',
      dp50XraySystem: '/assets/images/products/mindray/mindray-dp-50-digital-x-ray-system.jpg',
      beneventA3Ventilator: '/assets/images/products/mindray/mindray-benevent-a3-ventilator.png',
      beneheartR3Monitor: '/assets/images/products/mindray/mindray-beneheart-r3-patient-monitor.jpeg',
      cl900iChemistryAnalyzer: '/assets/images/products/mindray/mindray-cl-900i-chemistry-analyzer.jpg',
      resona7Ultrasound: '/assets/images/products/mindray/mindray-resona-7-ultrasound-system.png',
      sv300Ventilator: '/assets/images/products/mindray/mindray-sv300-ventilator.png'
    }
  },

  // Team member photos (using available images as placeholders)
  team: {
    afeworkWoldesilassie: '/assets/images/team/afework-woldesilassie.png',
    meronGetachew: '/assets/images/team/placeholder.jpg',
    dawitAlemayehu: '/assets/images/team/placeholder.jpg'
  },

  // Project images (using available images as placeholders)
  projects: {
    tigrayHealth: '/assets/images/diagnostic-&-laboratory-solutions.png',
    defenseHospital: '/assets/images/solutions/critical-care.webp',
    laboratorySetup: '/assets/images/diagnostic-&-laboratory-solutions.png'
  },

  // About page images (using available images as placeholders)
  about: {
    companyOverview: '/assets/images/diagnostic-&-laboratory-solutions.png',
    laboratoryFacility: '/assets/images/diagnostic-&-laboratory-solutions.png',
    medicalEquipment: '/assets/images/medical-equipments.png'
  },

  // General purpose images
  general: {
    stethoscope: '/assets/images/stethoscope.png',
    xrayImage: '/assets/images/x-ray-image.png',
    medicalBackground: '/assets/images/medical-equipments.png',
    medicalEquipments: '/assets/images/medical-equipments.png'
  },

  // Brand and certification logos
  logos: {
    afeworkPharma: '/assets/logos/afework-pharma-logo-full.png',
    certifications: {
      fdaApproved: '/assets/logos/certifications/fda-approved.svg',
      isoCertified: '/assets/logos/certifications/iso-certified.svg'
    },
    partners: {
      tigrayHealthBureau: '/assets/logos/tigray-regional-health-bureau-logo.png',
      fdreDefense: '/assets/logos/fdre-defense-logo.png'
    }
  }
} as const;

// Type definitions for type-safe image usage
export type ImageKey = keyof typeof IMAGES;
export type HeroImageKey = keyof typeof IMAGES.hero;
export type SolutionImageKey = keyof typeof IMAGES.solutions;
export type ProductImageKey = keyof typeof IMAGES.products.mindray;
export type TeamImageKey = keyof typeof IMAGES.team;
export type ProjectImageKey = keyof typeof IMAGES.projects;
export type LogoImageKey = keyof typeof IMAGES.logos;

// Helper function to get image path with fallback
export const getImagePath = (imagePath: string, fallback?: string): string => {
  return imagePath || fallback || '/assets/images/general/medical-background.webp';
};

// Image alt text constants for accessibility
export const IMAGE_ALT_TEXT = {
  hero: {
    main: 'Afework Pharma - Leading Medical Equipment Supplier in Ethiopia',
    diagnosticLab: 'Diagnostic & Laboratory Solutions',
    imagingRadiology: 'Diagnostic Imaging & Radiology Equipment',
    criticalCare: 'Critical Care & Operation Theatre Equipment',
    hospitalFurniture: 'Hospital Furniture & Patient Care Solutions',
    medicalConsumables: 'Medical Consumables & Reagents'
  },
  products: {
    mindray: {
      bs240ChemistryAnalyzer: 'Mindray BS-240 Chemistry Analyzer',
      bc5150HematologyAnalyzer: 'Mindray BC-5150 Hematology Analyzer',
      dc70UltrasoundSystem: 'Mindray DC-70 Ultrasound System',
      dp50XraySystem: 'Mindray DP-50 Digital X-Ray System',
      beneventA3Ventilator: 'Mindray BeneVent A3 Ventilator',
      beneheartR3Monitor: 'Mindray BeneHeart R3 Patient Monitor',
      cl900iChemistryAnalyzer: 'Mindray CL-900i Chemistry Analyzer',
      resona7Ultrasound: 'Mindray Resona 7 Ultrasound System',
      sv300Ventilator: 'Mindray SV300 Ventilator'
    }
  },
  team: {
    afeworkWoldesilassie: 'Afework Woldesilassie - Founder & CEO',
    meronGetachew: 'Dr. Meron Getachew - Technical Director',
    dawitAlemayehu: 'Dawit Alemayehu - Operations Manager'
  },
  logos: {
    afeworkPharma: 'Afework Pharma Logo',
    fdaApproved: 'FDA Approved Certification',
    isoCertified: 'ISO Certified',
    tigrayHealthBureau: 'Tigray Regional Health Bureau',
    fdreDefense: 'FDRE Defense Hospital'
  }
} as const;
