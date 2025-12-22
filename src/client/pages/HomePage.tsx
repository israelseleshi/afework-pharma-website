import React from "react";
import SEO from "../components/SEO";
import { HeroSection } from "../components/HeroSection";
import { ValueProposition } from "../components/ValueProposition";
import { SolutionsOverview } from "../components/SolutionsOverview";
import { FeaturedProjects } from "../components/FeaturedProjects";
import { Testimonials } from "../components/Testimonials";

export function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Afework Pharma",
    "url": "https://www.afeworkpharmaet.com",
    "logo": "https://www.afeworkpharmaet.com/afework-pharma-logo.png",
    "description": "Leading medical equipment supplier in Ethiopia providing advanced diagnostic solutions, hospital setup, and healthcare technology for 36+ facilities nationwide.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Ethiopia",
      "addressLocality": "Addis Ababa"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://www.afeworkpharmaet.com/contact",
      "availableLanguage": ["English", "Amharic"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/afework-pharma",
      "https://www.facebook.com/afeworkpharma"
    ],
    "foundingDate": "2019",
    "numberOfEmployees": "10-50",
    "industry": "Medical Equipment and Healthcare Technology",
    "serviceArea": {
      "@type": "Country",
      "name": "Ethiopia"
    }
  };

  return (
    <>
      <SEO
        title="Leading Medical Equipment Supplier in Ethiopia | Afework Pharma"
        description="Afework Pharma - Ethiopia's trusted medical equipment supplier. Advanced diagnostic solutions, hospital setup, and healthcare technology for 36+ facilities nationwide."
        keywords="medical equipment supplier Ethiopia, Afework Pharma, advanced medical solutions, healthcare technology Ethiopia, diagnostic equipment supplier, hospital setup solutions, medical devices Ethiopia, laboratory equipment, medical imaging, critical care equipment"
        canonical="/"
        ogTitle="Leading Medical Equipment Supplier in Ethiopia | Afework Pharma"
        ogDescription="Ethiopia's trusted medical equipment supplier providing advanced diagnostic solutions, hospital setup, and healthcare technology for 36+ facilities nationwide."
        structuredData={structuredData}
      />
      <HeroSection />
      <ValueProposition />
      <SolutionsOverview />
      <FeaturedProjects />
      <Testimonials />
    </>
  );
}