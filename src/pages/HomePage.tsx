import React from "react";
import { HeroSection } from "../components/HeroSection";
import { ValueProposition } from "../components/ValueProposition";
import { SolutionsOverview } from "../components/SolutionsOverview";
import { FeaturedProjects } from "../components/FeaturedProjects";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueProposition />
      <SolutionsOverview />
      <FeaturedProjects />
    </>
  );
}