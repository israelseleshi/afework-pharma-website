import React from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { ArrowRight, ArrowLeft, Check, Star, Download, Phone } from "lucide-react";

export function SolutionDetailPage() {
  const { navigateTo, currentSolution } = useRouter();

  // Sample detailed solution data
  const solutionDetails = {
    "Diagnostic & Laboratory Solutions": {
      title: "Diagnostic & Laboratory Solutions",
      subtitle: "Complete IVD Ecosystem for Accurate Diagnostics",
      description: "Our comprehensive laboratory solutions combine cutting-edge technology with proven reliability to deliver accurate diagnostic results. From automated chemistry analyzers to complete laboratory information systems, we provide everything needed for modern medical diagnostics.",
      image: "https://images.unsplash.com/photo-1758685734156-3c5d35bae1d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVtaXN0cnklMjBhbmFseXplciUyMGxhYm9yYXRvcnklMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU5ODI5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      keyFeatures: [
        "Automated chemistry analyzers with 400+ test menu",
        "Complete hematology systems with 5-part differential",
        "Digital microscopy with telepathology capabilities",
        "Laboratory information management system (LIMS)",
        "Quality control and external quality assurance",
        "Cold chain storage and sample tracking"
      ],
      benefits: [
        "Reduced turnaround time by 70%",
        "Improved diagnostic accuracy",
        "Lower cost per test",
        "Enhanced workflow efficiency",
        "Comprehensive data management",
        "Regulatory compliance support"
      ],
      specifications: {
        "Throughput": "Up to 1000 tests per hour",
        "Sample Types": "Serum, plasma, whole blood, urine",
        "Test Menu": "400+ clinical chemistry and immunoassay tests",
        "Quality Control": "Multi-level QC with statistical monitoring",
        "Connectivity": "LIS integration and remote monitoring",
        "Training": "5-day comprehensive certification program"
      }
    }
  };

  const currentData = solutionDetails[currentSolution as keyof typeof solutionDetails] || solutionDetails["Diagnostic & Laboratory Solutions"];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => navigateTo('home')}
              className="text-gray-500 hover:text-blue-600 cursor-pointer"
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <button 
              onClick={() => navigateTo('solutions')}
              className="text-gray-500 hover:text-blue-600 cursor-pointer"
            >
              Solutions
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{currentData.title}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Button 
                  onClick={() => navigateTo('solutions')}
                  variant="ghost" 
                  className="p-0 h-auto text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Solutions
                </Button>
                
                <div>
                  <h1 className="text-4xl text-gray-900 mb-4">
                    {currentData.title}
                  </h1>
                  <p className="text-xl text-blue-600 mb-6">
                    {currentData.subtitle}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {currentData.description}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigateTo('contact')}
                  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  Request Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="cursor-pointer"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download Brochure
                </Button>
                <Button 
                  variant="outline" 
                  className="cursor-pointer"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Schedule Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback 
                src={currentData.image}
                alt={currentData.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl text-gray-900 mb-8">Key Features</h2>
              <div className="space-y-4">
                {currentData.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl text-gray-900 mb-8">Benefits</h2>
              <div className="space-y-4">
                {currentData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl text-gray-900 mb-8 text-center">Technical Specifications</h2>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(currentData.specifications).map(([key, value], index) => (
                <div key={index} className="flex justify-between items-start border-b border-gray-200 pb-4">
                  <span className="text-gray-900 font-medium">{key}:</span>
                  <span className="text-gray-600 text-right max-w-xs">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl text-gray-900 mb-12 text-center">Comprehensive Support Services</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Installation",
                description: "Professional installation and commissioning by certified technicians"
              },
              {
                title: "Training", 
                description: "Comprehensive user training and certification programs"
              },
              {
                title: "Maintenance",
                description: "Preventive maintenance and calibration services"
              },
              {
                title: "Support",
                description: "24/7 technical support and remote diagnostics"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-lg text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl text-gray-900 mb-12 text-center">Related Solutions</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Diagnostic Imaging & Radiology",
                description: "Advanced imaging solutions for comprehensive diagnostics",
                image: "https://images.unsplash.com/photo-1587010580103-fd86b8ea14ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNUkklMjBtYWNoaW5lJTIwbWVkaWNhbCUyMGltYWdpbmd8ZW58MXx8fHwxNzU5ODI5MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              },
              {
                title: "Critical Care & Operation Theatre",
                description: "Life-saving equipment for intensive care and surgery",
                image: "https://images.unsplash.com/photo-1728474372689-c3072b79806e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYXRpbmclMjByb29tJTIwc3VyZ2ljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU5ODI5MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              },
              {
                title: "Hospital Furniture & Patient Care",
                description: "Ergonomic furniture for optimal patient comfort",
                image: "https://images.unsplash.com/photo-1613377512409-59c33c10c821?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJlZCUyMG1lZGljYWwlMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzU5ODI5MTU5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              }
            ].map((solution, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigateTo('solution-detail', solution.title)}
              >
                <ImageWithFallback 
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg text-gray-900 mb-2">{solution.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{solution.description}</p>
                  <Button variant="outline" size="sm" className="cursor-pointer">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}