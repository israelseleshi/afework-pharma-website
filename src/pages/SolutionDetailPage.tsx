import React from "react";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { ArrowRight, ArrowLeft, Check, Star, Download } from "lucide-react";

export function SolutionDetailPage() {
  const { navigateTo, currentSolution } = useRouter();

  // Sample detailed solution data
  const solutionDetails = {
    "Diagnostic & Laboratory Solutions": {
      title: "Diagnostic & Laboratory Solutions",
      subtitle: "Complete IVD Ecosystem for Accurate Diagnostics",
      description: "Our comprehensive laboratory solutions combine cutting-edge technology with proven reliability to deliver accurate diagnostic results. From automated chemistry analyzers to complete laboratory information systems, we provide everything needed for modern medical diagnostics.",
      image: "/assets/images/diagnostic-&-laboratory-solutions.jpg",
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
    },
    "Diagnostic Imaging & Radiology": {
      title: "Diagnostic Imaging & Radiology",
      subtitle: "Advanced Imaging Solutions for Comprehensive Diagnostics",
      description: "Transform your diagnostic capabilities with our state-of-the-art imaging solutions. From digital radiography to advanced MRI systems, we provide comprehensive imaging technology that delivers exceptional image quality, enhanced workflow efficiency, and improved patient outcomes across Ethiopian healthcare facilities.",
      image: "/assets/images/diagnostic-imaging-&-radiology.jpg",
      keyFeatures: [
        "Digital X-Ray systems with direct radiography (DR) technology",
        "High-resolution ultrasound machines with 4D imaging capabilities",
        "Multi-slice CT scanners with advanced reconstruction algorithms",
        "MRI systems with high-field strength and fast imaging sequences",
        "PACS (Picture Archiving and Communication System) integration",
        "AI-powered image analysis and reporting tools",
        "Mobile and portable imaging solutions",
        "Radiation dose optimization and safety protocols"
      ],
      benefits: [
        "Eliminate film costs with complete digital workflow",
        "Improve diagnosis accuracy with enhanced image quality",
        "Reduce patient waiting time by 60%",
        "Enable remote consultation and telepathology",
        "Protect patients and staff with advanced radiation safety",
        "Streamline workflow with integrated PACS solutions",
        "Lower operational costs through efficient imaging protocols",
        "Enhance diagnostic confidence with AI-assisted analysis"
      ],
      specifications: {
        "X-Ray Systems": "Digital radiography with 14x17 to 35x43 cm detectors",
        "Ultrasound": "2D/3D/4D imaging with up to 15 MHz transducers",
        "CT Scanner": "16-128 slice configurations with 0.5mm resolution",
        "MRI Systems": "1.5T and 3.0T field strength options",
        "Image Quality": "Up to 4K resolution with 16-bit depth",
        "Connectivity": "DICOM 3.0 compliant with HL7 integration",
        "Installation": "Complete turnkey setup with 2-week commissioning",
        "Training": "Comprehensive 7-day certification for operators and technicians"
      }
    },
    "Critical Care & Operation Theatre": {
      title: "Critical Care & Operation Theatre",
      subtitle: "Life-Saving Equipment for Critical Medical Procedures",
      description: "Equip your intensive care units and operating rooms with advanced life-support technology and precision surgical equipment. Our comprehensive critical care solutions ensure optimal patient outcomes during Ethiopia's most critical medical procedures, combining reliability with cutting-edge innovation.",
      image: "/assets/images/critical-care-&-operation-theatre.jpg",
      keyFeatures: [
        "Advanced ICU ventilators with multiple ventilation modes",
        "Multi-parameter patient monitors with real-time analytics",
        "Precision surgical tables with advanced positioning systems",
        "State-of-the-art anesthesia machines with safety protocols",
        "OR integration systems for seamless workflow management",
        "Emergency response equipment and crash carts",
        "Surgical lighting systems with LED technology",
        "Patient warming systems and temperature management"
      ],
      benefits: [
        "Save more lives with advanced life-support technology",
        "Prevent complications with real-time patient monitoring",
        "Enhance surgical outcomes with precision equipment",
        "Reduce response time with integrated emergency support",
        "Improve patient safety with advanced monitoring systems",
        "Optimize OR efficiency with integrated workflow solutions",
        "Ensure regulatory compliance with international standards",
        "Minimize equipment downtime with reliable technology"
      ],
      specifications: {
        "Ventilators": "Volume/Pressure controlled with SIMV, CPAP modes",
        "Patient Monitors": "12-lead ECG, SpO2, NIBP, IBP, temperature monitoring",
        "Surgical Tables": "Electric positioning with C-arm compatibility",
        "Anesthesia Machines": "Advanced vaporizers with electronic gas mixing",
        "OR Integration": "HD video, audio, and data management systems",
        "Safety Features": "Backup power, alarm systems, fail-safe mechanisms",
        "Installation": "Complete OR setup with 3-week commissioning",
        "Training": "Intensive 10-day certification for critical care staff"
      }
    },
    "Hospital Furniture & Patient Care": {
      title: "Hospital Furniture & Patient Care",
      subtitle: "Ergonomic Solutions for Enhanced Patient Comfort and Care",
      description: "Transform your healthcare facility with ergonomic hospital furniture designed to improve patient comfort while enhancing healthcare worker efficiency. Our comprehensive patient care solutions combine functionality with durability, creating healing environments that support both patients and medical staff.",
      image: "/assets/images/hospital-furniture-&-patient-care.jpg",
      keyFeatures: [
        "Electric hospital beds with advanced positioning controls",
        "Patient transfer chairs with safety and comfort features",
        "Medical trolleys and equipment carts for efficient workflow",
        "Modular storage solutions for organized medical supplies",
        "Comfortable waiting area furniture for patient families",
        "Infection control surfaces with antimicrobial properties",
        "Height-adjustable workstations for healthcare staff",
        "Specialized furniture for pediatric and geriatric care"
      ],
      benefits: [
        "Improve patient recovery with enhanced comfort features",
        "Boost staff productivity with ergonomic design solutions",
        "Reduce healthcare-associated infections with easy-clean surfaces",
        "Maximize space utilization with modular design systems",
        "Enhance patient satisfaction with comfortable environments",
        "Lower maintenance costs with durable construction",
        "Support infection prevention with antimicrobial materials",
        "Improve workflow efficiency with organized storage solutions"
      ],
      specifications: {
        "Hospital Beds": "Electric 3-function with Trendelenburg positioning",
        "Weight Capacity": "Up to 250kg patient weight capacity",
        "Materials": "Antimicrobial steel frames with easy-clean surfaces",
        "Mobility": "Central locking castors with directional control",
        "Safety Features": "Side rails, emergency CPR release, nurse controls",
        "Accessories": "IV poles, overbed tables, patient call systems",
        "Warranty": "5-year comprehensive warranty on all furniture",
        "Installation": "Complete setup with staff training included"
      }
    },
    "Medical Consumables & Reagents": {
      title: "Medical Consumables & Reagents",
      subtitle: "Quality Supplies for Reliable Medical Testing and Patient Safety",
      description: "Ensure consistent, accurate test results and optimal patient safety with our comprehensive range of medical consumables and reagents. From laboratory reagents to medical disposables, we provide quality supplies that meet international standards while supporting Ethiopian healthcare facilities with reliable supply chain management.",
      image: "https://images.unsplash.com/photo-1758101512269-660feabf64fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBtZWRpY2FsJTIwZXF1aXBtZW50JTIwaG9zcGl0YWwlMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc1OTgyOTAzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      keyFeatures: [
        "High-quality laboratory reagents for accurate testing",
        "Rapid diagnostic test kits for point-of-care testing",
        "Medical disposables with safety and sterility assurance",
        "Quality control materials for laboratory standardization",
        "Calibration materials for equipment accuracy verification",
        "Cold chain storage and distribution systems",
        "Inventory management and automated ordering systems",
        "Regulatory compliance documentation and certification"
      ],
      benefits: [
        "Ensure test accuracy with consistent quality standards",
        "Meet international standards with full regulatory compliance",
        "Reduce operating costs with bulk supply efficiency",
        "Prevent stock-outs with reliable supply chain management",
        "Maintain quality assurance with proper storage protocols",
        "Streamline procurement with automated inventory systems",
        "Support laboratory accreditation with quality documentation",
        "Minimize waste with optimized expiry date management"
      ],
      specifications: {
        "Reagent Types": "Clinical chemistry, immunoassay, hematology reagents",
        "Test Kits": "Rapid tests for infectious diseases and cardiac markers",
        "Storage Requirements": "Temperature-controlled from -80°C to +25°C",
        "Quality Standards": "ISO 13485, CE marked, FDA approved products",
        "Shelf Life": "12-24 months depending on product type",
        "Supply Chain": "Monthly delivery with emergency stock availability",
        "Documentation": "Certificate of analysis with each batch",
        "Support": "Technical support and training for proper usage"
      }
    }
  };

  const currentData = solutionDetails[currentSolution as keyof typeof solutionDetails] || solutionDetails["Diagnostic & Laboratory Solutions"];

  // Generate SEO data based on current solution
  const getSEOData = (solution: string) => {
    const seoMap: Record<string, any> = {
      "Diagnostic & Laboratory Solutions": {
        title: "Diagnostic and Laboratory Solutions Ethiopia | Afework Pharma",
        description: "Advanced diagnostic and laboratory solutions in Ethiopia. Mindray chemistry analyzers, hematology systems, IVD solutions, and laboratory infrastructure setup by Afework Pharma.",
        keywords: "diagnostic and laboratory solutions Ethiopia, Mindray chemistry analyzers, hematology systems Ethiopia, IVD solutions, laboratory infrastructure setup, BC-5150 hematology, automated laboratory equipment Ethiopia"
      },
      "Diagnostic Imaging & Radiology": {
        title: "Medical Imaging Equipment Supplier Ethiopia | Afework Pharma", 
        description: "Leading medical imaging equipment supplier in Ethiopia. Digital X-Ray systems, CT scanners, ultrasound machines, MRI systems, and PACS solutions for healthcare facilities.",
        keywords: "medical imaging equipment supplier Ethiopia, digital X-Ray systems, CT scanners Ethiopia, ultrasound machines, MRI systems, PACS solutions, radiology equipment Ethiopia"
      },
      "Critical Care & Operation Theatre": {
        title: "Critical Care and ICU Equipment Ethiopia | Afework Pharma",
        description: "Critical care and ICU equipment supplier in Ethiopia. ICU ventilators, patient monitors, anesthesia machines, surgical tables, and life-support technology.",
        keywords: "critical care and ICU equipment Ethiopia, ICU ventilators supplier, patient monitors, anesthesia machines, surgical tables, life-support technology Ethiopia"
      },
      "Hospital Furniture & Patient Care": {
        title: "Hospital Furniture and Patient Care Solutions | Afework Pharma",
        description: "Hospital furniture and patient care solutions in Ethiopia. Electric hospital beds, medical trolleys, patient transfer chairs, and ergonomic medical furniture.",
        keywords: "hospital furniture and patient care solutions, electric hospital beds Ethiopia, medical trolleys, patient transfer chairs, ergonomic medical furniture Ethiopia"
      },
      "Medical Consumables & Reagents": {
        title: "Medical Consumables and Reagents Supplier Ethiopia | Afework Pharma",
        description: "Reliable medical consumables and reagents supplier in Ethiopia. Laboratory reagents, rapid diagnostic test kits, medical disposables, and quality control materials.",
        keywords: "medical consumables and reagents supplier Ethiopia, laboratory reagents Ethiopia, rapid diagnostic test kits, medical disposables, quality control materials Ethiopia"
      }
    };
    
    return seoMap[solution] || seoMap["Diagnostic & Laboratory Solutions"];
  };

  const seoData = getSEOData(currentSolution || "Diagnostic & Laboratory Solutions");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": currentData.title,
    "description": currentData.description,
    "brand": {
      "@type": "Brand",
      "name": "Afework Pharma"
    },
    "manufacturer": {
      "@type": "Organization", 
      "name": "Afework Pharma"
    },
    "category": "Medical Equipment",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Afework Pharma"
      }
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={`/solution-detail?solution=${encodeURIComponent(currentSolution || "Diagnostic & Laboratory Solutions")}`}
        ogTitle={seoData.title}
        ogDescription={seoData.description}
        structuredData={structuredData}
      />
      {/* Breadcrumb */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => navigateTo('home')}
              className="text-gray-500 hover:text-green-600 cursor-pointer transition-colors"
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <button 
              onClick={() => navigateTo('solutions')}
              className="text-gray-500 hover:text-green-600 cursor-pointer transition-colors"
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
                  className="p-0 h-auto text-green-600 hover:text-green-700 cursor-pointer"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Solutions
                </Button>
                
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {currentData.title}
                  </h1>
                  <p className="text-xl text-green-600 mb-6 font-semibold">
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
                  className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                >
                  Request Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-50 cursor-pointer"
                  onClick={() => {
                    if (currentSolution === "Diagnostic Imaging & Radiology") {
                      // Download the specific PDF for Diagnostic Imaging & Radiology
                      const link = document.createElement('a');
                      link.href = '/assets/brochures/AfeWork_Pharma_Radiology_Brochure.pdf';
                      link.download = 'AfeWork_Pharma_Radiology_Brochure.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    } else if (currentSolution === "Diagnostic & Laboratory Solutions") {
                      // Download the specific PDF for Diagnostic & Laboratory Solutions
                      const link = document.createElement('a');
                      link.href = '/assets/brochures/AfeWork_Pharma_Lab_Solutions_Brochure.pdf';
                      link.download = 'AfeWork_Pharma_Lab_Solutions_Brochure.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    } else {
                      // For other solutions, show a message or redirect to contact
                      alert('Brochure will be available soon. Please contact us for more information.');
                    }
                  }}
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download Brochure
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
              <div className="space-y-4">
                {currentData.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Benefits</h2>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Specifications</h2>
          
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

      {/* Related Solutions */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Solutions</h2>
          
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
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                onClick={() => navigateTo('solution-detail', solution.title)}
              >
                <ImageWithFallback 
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{solution.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{solution.description}</p>
                  <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50 cursor-pointer">
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