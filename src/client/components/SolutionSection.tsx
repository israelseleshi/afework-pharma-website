import React from "react";
import { Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SolutionSectionProps {
  title: string;
  description: string;
  image: string;
  keyProducts: string[];
  benefits: {
    title: string;
    description: string;
  }[];
  isReversed?: boolean;
}

export function SolutionSection({
  title,
  description,
  image,
  keyProducts,
  benefits,
  isReversed = false,
}: SolutionSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-3xl leading-relaxed">{description}</p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-10 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content Side */}
          <div className="space-y-8">
            {/* Key Products */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Key Products:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {keyProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{product}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Benefits:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-medium text-gray-900 text-sm">{benefit.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Learn More Button */}
            <div>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative h-80 sm:h-96 lg:h-[400px] overflow-hidden rounded-lg shadow-md">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
