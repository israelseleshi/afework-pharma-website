import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-50/50 via-green-50/20 to-white">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-slate-900">
                Advanced Medical Solutions for a 
                <span className="text-green-600 block">Healthier Ethiopia</span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-xl leading-relaxed">
                Delivering state-of-the-art medical equipment backed by comprehensive 
                technical support and training across the nation. Your trusted partner 
                in healthcare technology advancement.
              </p>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-slate-200">
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">45+</div>
                <div className="text-xs sm:text-sm text-slate-600">IVD Units Deployed</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">36+</div>
                <div className="text-xs sm:text-sm text-slate-600">Healthcare Facilities</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">5+</div>
                <div className="text-xs sm:text-sm text-slate-600">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwZXF1aXBtZW50JTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc1OTgyOTAzNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern medical laboratory equipment in Ethiopian hospital"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-600/10 to-transparent rounded-2xl transform rotate-3 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}