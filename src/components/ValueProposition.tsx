import React from "react";
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

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose Afework Pharma?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We are more than a supplier; we are your strategic partner in advancing 
            healthcare in Ethiopia. Experience the difference of working with true experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div 
                key={index}
                className="group p-8 rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl border-2 border-gray-100 flex items-center justify-center mb-6 group-hover:border-green-200 transition-all duration-300">
                  <IconComponent className="w-8 h-8 text-green-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}