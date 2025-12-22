import React from "react";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { ArrowRight, ArrowLeft, Check, Star, Download, Heart, Activity, Shield, Zap, Monitor, Stethoscope } from "lucide-react";

export function CriticalCareOperationTheatrePage() {
  const { navigateTo } = useRouter();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Critical Care & Operation Theatre Solutions",
    "description": "Comprehensive critical care and operation theatre equipment including ICU ventilators, patient monitors, anesthesia machines, surgical tables, and life-support technology for Ethiopian healthcare facilities.",
    "brand": {
      "@type": "Brand",
      "name": "Afework Pharma"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Afework Pharma"
    },
    "category": "Critical Care Medical Equipment",
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
        title="Critical Care and ICU Equipment Ethiopia | Afework Pharma"
        description="Leading supplier of critical care and ICU equipment in Ethiopia. ICU ventilators, patient monitors, anesthesia machines, surgical tables, and life-support technology for healthcare facilities."
        keywords="critical care and ICU equipment Ethiopia, ICU ventilators supplier, patient monitors, anesthesia machines, surgical tables, life-support technology Ethiopia, operation theatre equipment, critical care solutions"
        canonical="/critical-care-operation-theatre"
        ogTitle="Critical Care and ICU Equipment Ethiopia | Afework Pharma"
        ogDescription="Leading supplier of critical care and ICU equipment in Ethiopia. ICU ventilators, patient monitors, anesthesia machines, and surgical tables."
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
            <span className="text-gray-900">Critical Care & Operation Theatre</span>
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
                  <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>
                    Critical Care & Operation Theatre
                  </h1>
                  <p className="text-xl text-green-600 mb-6 font-semibold">
                    Life-Saving Equipment for Critical Care Excellence
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our comprehensive critical care and operation theatre solutions provide healthcare facilities with 
                    state-of-the-art equipment designed to save lives and ensure optimal patient outcomes. From advanced 
                    ventilators to complete surgical suites, we deliver technology that healthcare professionals trust 
                    in the most critical moments.
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
                    alert('Brochure will be available soon. Please contact us for more information.');
                  }}
                >
                  <Download className="mr-2 w-4 h-4" />
                  Download Brochure
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback 
                src="/assets/images/critical-care-&-operation-theatre.jpg"
                alt="Critical Care & Operation Theatre Equipment"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{letterSpacing: '-0.02em'}}>Key Features</h2>
              <div className="space-y-4">
                {[
                  "Advanced ICU ventilators with multiple ventilation modes",
                  "Multi-parameter patient monitoring systems",
                  "Modular operating theatre equipment suites",
                  "Anesthesia workstations with integrated monitoring",
                  "Surgical lights with LED technology and camera integration",
                  "Electrosurgical units with advanced safety features",
                  "Patient warming systems for temperature management",
                  "Central monitoring stations for ICU management",
                  "Mobile C-arm imaging systems for intraoperative guidance",
                  "Defibrillators and emergency resuscitation equipment"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{letterSpacing: '-0.02em'}}>Clinical Benefits</h2>
              <div className="space-y-4">
                {[
                  "Improved patient survival rates in critical care",
                  "Enhanced surgical precision and safety",
                  "Reduced infection risk with advanced sterilization",
                  "Real-time patient monitoring and alerts",
                  "Streamlined workflow in operating theatres",
                  "Better resource utilization and efficiency",
                  "Comprehensive data logging for quality assurance",
                  "24/7 remote monitoring capabilities",
                  "Reduced recovery time for patients",
                  "Enhanced staff confidence and competency"
                ].map((benefit, index) => (
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

      {/* Equipment Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12" style={{letterSpacing: '-0.02em'}}>Equipment Categories</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "ICU Equipment",
                description: "Ventilators, patient monitors, infusion pumps, and critical care beds",
                items: ["Mechanical Ventilators", "Patient Monitors", "Infusion Pumps", "ICU Beds"]
              },
              {
                icon: Activity,
                title: "Operating Theatre",
                description: "Surgical tables, lights, electrosurgical units, and anesthesia machines",
                items: ["Surgical Tables", "Operating Lights", "Electrosurgical Units", "Anesthesia Machines"]
              },
              {
                icon: Monitor,
                title: "Monitoring Systems",
                description: "Central monitoring, telemetry, and patient surveillance systems",
                items: ["Central Monitors", "Telemetry Systems", "Vital Signs Monitors", "Alarm Management"]
              },
              {
                icon: Shield,
                title: "Emergency Equipment",
                description: "Defibrillators, crash carts, and emergency response systems",
                items: ["Defibrillators", "Crash Carts", "Emergency Ventilators", "Resuscitation Equipment"]
              },
              {
                icon: Zap,
                title: "Surgical Instruments",
                description: "Electrosurgical devices, surgical tools, and minimally invasive equipment",
                items: ["Electrosurgery Units", "Laparoscopic Equipment", "Surgical Instruments", "Endoscopy Systems"]
              },
              {
                icon: Stethoscope,
                title: "Support Systems",
                description: "Gas supply, suction systems, and environmental controls",
                items: ["Medical Gas Systems", "Suction Units", "Temperature Control", "Air Filtration"]
              }
            ].map((category, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <category.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-700 flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{letterSpacing: '-0.02em'}}>Technical Specifications</h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                ["Ventilator Modes", "Volume, Pressure, SIMV, CPAP, BiPAP, APRV"],
                ["Monitoring Parameters", "ECG, SpO2, NIBP, IBP, Temperature, CO2"],
                ["Power Requirements", "220V AC, Battery backup 4+ hours"],
                ["Safety Standards", "IEC 60601-1, ISO 14971, FDA/CE certified"],
                ["Connectivity", "HL7, DICOM, WiFi, Ethernet, USB"],
                ["Training Program", "5-day intensive certification course"],
                ["Warranty", "2-year comprehensive warranty + service"],
                ["Support", "24/7 technical support and remote diagnostics"]
              ].map(([key, value], index) => (
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
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12" style={{letterSpacing: '-0.02em'}}>Comprehensive Support Services</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Installation & Commissioning",
                description: "Professional installation by certified biomedical engineers with complete commissioning"
              },
              {
                title: "Clinical Training", 
                description: "Comprehensive training programs for medical staff and biomedical technicians"
              },
              {
                title: "Preventive Maintenance",
                description: "Scheduled maintenance, calibration, and performance verification services"
              },
              {
                title: "Emergency Support",
                description: "24/7 emergency response with on-site technicians and remote diagnostics"
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Quality Assurance & Compliance</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              All our critical care equipment meets the highest international standards for medical devices, 
              ensuring patient safety and regulatory compliance in Ethiopian healthcare facilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "International Standards",
                description: "ISO 13485, IEC 60601 series, FDA 510(k) clearance, CE marking",
                icon: Shield
              },
              {
                title: "Quality Management",
                description: "Comprehensive quality management system with full traceability",
                icon: Check
              },
              {
                title: "Regulatory Support",
                description: "Complete documentation and support for Ethiopian regulatory approval",
                icon: Star
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-green-200 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
