import React from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { ArrowRight, Calendar, MapPin, Users, Award, CheckCircle2 } from "lucide-react";

export function ProjectsPage() {
  const { navigateTo } = useRouter();

  const featuredProjects = [
    {
      title: "CDC-Tigray Regional Health Bureau Project",
      client: "Centers for Disease Control & Tigray Regional Health Bureau",
      year: "2024",
      location: "Mekelle, Tigray Region",
      image: "https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBob3NwaXRhbCUyMG1lZGljYWwlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NTk4MjkwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      logo: "/tigray-regional-health-bureau-logo.png",
      description: "Comprehensive laboratory infrastructure development supporting TB and HIV diagnostics across 25 health facilities in Tigray region.",
      scope: [
        "11 Mindray BS-240 Chemistry Analyzers",
        "10 Mindray BC-5150 5-diff Hematology Analyzers",
        "24 Mindray BC-30s 3-diff Hematology Analyzers",
        "Comprehensive on-site user training",
        "40-day project completion timeline"
      ],
      impact: "Enhanced diagnostic capabilities across 36 health facilities in Tigray region",
      testimonial: {
        quote: "Afework Pharma delivered exceptional service with their turnkey supply, installation, and training across our 36 facilities. The project was completed ahead of schedule with outstanding technical support.",
        author: "Dr. Gebrehiwot Tesfay",
        position: "Director, Tigray Regional Health Bureau"
      }
    },
    {
      title: "FDRE Defense Referral Hospital, Bishoftu",
      client: "Federal Democratic Republic of Ethiopia Defense Hospital",
      year: "2023-2024",
      location: "Bishoftu, Ethiopia",
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NTk4NDkzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      logo: "/fdre-defense-logo.png",
      description: "Installation and commissioning of advanced laboratory suite with comprehensive reagent supply chain management.",
      scope: [
        "Mindray BS-480 Biochemistry Analyzer",
        "Urinalysis Systems",
        "Flow Cytometry Systems",
        "Full technical and application training",
        "Sustained reagent supply worth ETB 1.9 Million"
      ],
      impact: "Enhanced diagnostic capabilities with reliable supply chain support",
      testimonial: {
        quote: "Afework Pharma provided exceptional installation and commissioning services with comprehensive training support. Their ongoing reagent supply management has been exemplary.",
        author: "Colonel Dr. Mulugeta Assefa", 
        position: "Chief Medical Director, FDRE Defense Hospital"
      }
    }
  ];

  const additionalProjects = [
    {
      title: "Addis Ababa University Medical Faculty Lab Upgrade",
      client: "AAU Medical Faculty",
      year: "2021",
      location: "Addis Ababa",
      equipment: "Advanced teaching laboratory with digital microscopy",
      impact: "Enhanced medical education for 500+ students annually"
    },
    {
      title: "Regional Hospital Network Expansion",
      client: "Oromia Regional Health Bureau",
      year: "2019-2020",
      location: "Multiple locations",
      equipment: "Portable X-ray and ultrasound systems",
      impact: "Improved diagnostic access in rural communities"
    },
    {
      title: "Private Hospital Group Modernization",
      client: "St. Paul's Hospital Millennium Medical College",
      year: "2020",
      location: "Addis Ababa",
      equipment: "Complete laboratory automation and PACS integration",
      impact: "Reduced test turnaround time by 60%"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
            Success Stories & Case Studies
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover how we've transformed healthcare delivery across Ethiopia through 
            innovative medical technology solutions and comprehensive support services.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-16 lg:space-y-20">
            {featuredProjects.map((project, index) => (
              <div key={index} className="space-y-8">
                {/* Project Header */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-start gap-4">
                        {project.logo && (
                          <img 
                            src={project.logo} 
                            alt="Client Logo" 
                            className="h-16 w-16 object-contain flex-shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <h2 className="text-gray-900">{project.title}</h2>
                          <p className="text-green-600 mt-2">{project.client}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{project.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{project.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="relative">
                    <ImageWithFallback 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-gray-900">Project Scope</h3>
                    <ul className="space-y-3">
                      {project.scope.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm sm:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-gray-900">Impact & Results</h3>
                    <div className="bg-green-50 p-4 sm:p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        <span className="text-green-900 text-sm sm:text-base">Key Achievement</span>
                      </div>
                      <p className="text-green-800 text-sm sm:text-base">{project.impact}</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl">
                  <blockquote className="text-gray-700 italic mb-4">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-900 text-sm sm:text-base">{project.testimonial.author}</div>
                      <div className="text-gray-600 text-xs sm:text-sm">{project.testimonial.position}</div>
                    </div>
                  </div>
                </div>

                {index < featuredProjects.length - 1 && (
                  <div className="border-b border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Projects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Additional Success Stories</h2>
            <p className="text-gray-600">
              More examples of our commitment to advancing Ethiopian healthcare
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalProjects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-gray-900 mb-2">{project.title}</h3>
                <p className="text-green-600 text-sm mb-3">{project.client}</p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3">{project.equipment}</p>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">{project.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Our Impact by Numbers</h2>
            <p className="text-gray-600">
              Measurable results across Ethiopia's healthcare landscape
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "45+", label: "IVD Units Deployed", icon: Users },
              { number: "36+", label: "Healthcare Facilities", icon: MapPin },
              { number: "5+", label: "Years Experience", icon: Calendar },
              { number: "24/7", label: "Technical Support", icon: Award }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="space-y-4">
                  <div className="w-16 h-16 border-2 border-green-200 rounded-xl flex items-center justify-center mx-auto bg-green-50">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-green-600" style={{fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: '600', lineHeight: '1.3'}}>{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}