import React from "react";
import SEO from "../components/SEO";
import { useRouter } from "../components/Router";
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, Users, Wrench } from "lucide-react";

export function TermsOfServicePage() {
  const { navigateTo } = useRouter();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - Afework Pharma Medical Solutions",
    "description": "Terms of Service for Afework Pharma Medical Solutions - Legal terms and conditions for using our medical equipment and healthcare technology services.",
    "url": "https://afeworkpharma.com/terms-of-service",
    "publisher": {
      "@type": "Organization",
      "name": "Afework Pharma Medical Solutions"
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <SEO
        title="Terms of Service | Afework Pharma Medical Solutions"
        description="Terms of Service for Afework Pharma Medical Solutions. Legal terms and conditions for medical equipment services, warranties, and healthcare technology solutions in Ethiopia."
        keywords="terms of service, legal terms, medical equipment terms, healthcare services agreement, Afework Pharma terms, medical device warranty Ethiopia"
        canonical="/terms-of-service"
        ogTitle="Terms of Service | Afework Pharma Medical Solutions"
        ogDescription="Legal terms and conditions for Afework Pharma's medical equipment and healthcare technology services in Ethiopia."
        structuredData={structuredData}
      />

      {/* Header Section */}
      <section className="py-12 bg-green-50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-100 rounded-full">
              <Scale className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900" style={{letterSpacing: '-0.02em'}}>Terms of Service</h1>
              <p className="text-gray-600 mt-2">Last updated: November 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{letterSpacing: '-0.02em'}}>
                <FileText className="w-6 h-6 text-green-600" />
                Agreement Overview
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of services provided by Afework Pharma Medical Solutions 
                  ("Company," "we," "our," or "us"), including medical equipment supply, installation, maintenance, training, 
                  and related healthcare technology services in Ethiopia. By engaging our services, you agree to be bound by these Terms.
                </p>
              </div>
            </div>

            {/* Services Provided */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{letterSpacing: '-0.02em'}}>
                <Wrench className="w-6 h-6 text-green-600" />
                Services Provided
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Medical Equipment Services</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Diagnostic & laboratory solutions</li>
                    <li>Medical imaging & radiology equipment</li>
                    <li>Critical care & operation theatre systems</li>
                    <li>Hospital furniture & patient care equipment</li>
                    <li>Medical consumables & reagents</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Support Services</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Equipment installation and setup</li>
                    <li>Technical training and certification</li>
                    <li>Maintenance and repair services</li>
                    <li>Quality assurance and compliance</li>
                    <li>24/7 technical support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Terms of Purchase */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Terms of Purchase and Payment</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Order Process</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>All orders are subject to availability and confirmation</li>
                <li>Prices are quoted in Ethiopian Birr (ETB) unless otherwise specified</li>
                <li>Orders require written confirmation and purchase order</li>
                <li>Delivery timelines are estimates and subject to manufacturer availability</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Payment Terms</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Payment terms are typically 30% advance, 70% upon delivery</li>
                  <li>Large projects may have milestone-based payment schedules</li>
                  <li>Late payments may incur interest charges as per Ethiopian commercial law</li>
                  <li>All taxes, duties, and customs fees are the responsibility of the customer</li>
                </ul>
              </div>
            </div>

            {/* Warranties and Guarantees */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{letterSpacing: '-0.02em'}}>
                <CheckCircle className="w-6 h-6 text-green-600" />
                Warranties and Guarantees
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Equipment Warranties</h3>
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>All equipment comes with manufacturer's warranty (typically 1-3 years)</li>
                  <li>Installation warranty covers workmanship for 6 months</li>
                  <li>Consumables and reagents have batch-specific expiry dates</li>
                  <li>Warranty terms vary by manufacturer and product category</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Guarantees</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Professional installation by certified technicians</li>
                <li>Comprehensive training for end users</li>
                <li>Response time guarantees for technical support</li>
                <li>Quality assurance for all delivered services</li>
              </ul>
            </div>

            {/* Limitations and Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{letterSpacing: '-0.02em'}}>
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                Limitations and Disclaimers
              </h2>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Disclaimers</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Equipment performance depends on proper installation, maintenance, and usage</li>
                  <li>We are not liable for damages resulting from misuse or negligence</li>
                  <li>Clinical outcomes and diagnostic accuracy are not guaranteed</li>
                  <li>Force majeure events may affect delivery and service timelines</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Liability Limitations</h3>
              <p className="text-gray-700 mb-4">
                Our liability is limited to the value of the equipment or services provided. 
                We are not liable for indirect, consequential, or punitive damages, including 
                but not limited to loss of profits, business interruption, or data loss.
              </p>
            </div>

            {/* User Responsibilities */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{letterSpacing: '-0.02em'}}>
                <Users className="w-6 h-6 text-green-600" />
                Customer Responsibilities
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Pre-Installation</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Provide accurate facility specifications</li>
                    <li>Ensure proper infrastructure and utilities</li>
                    <li>Obtain necessary permits and approvals</li>
                    <li>Provide safe working environment</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Post-Installation</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Follow manufacturer's operating procedures</li>
                    <li>Maintain equipment as recommended</li>
                    <li>Use only approved consumables and reagents</li>
                    <li>Ensure trained personnel operate equipment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Import and Distribution */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Import and Distribution</h2>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Import and Delivery Services</h3>
                <p className="text-gray-700 mb-4">
                  We handle all aspects of medical equipment import and distribution across Ethiopia. 
                  Our services include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>International procurement and import documentation</li>
                  <li>Customs clearance and regulatory compliance</li>
                  <li>Nationwide distribution and logistics management</li>
                  <li>Secure packaging and timely delivery to healthcare facilities</li>
                </ul>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Intellectual Property</h2>
              
              <p className="text-gray-700 mb-4">
                All intellectual property rights in equipment, software, documentation, and training materials 
                remain with their respective owners. Customers receive limited usage rights as specified in 
                individual product licenses and agreements.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Unauthorized copying, modification, or distribution of proprietary materials is prohibited 
                  and may result in legal action and termination of services.
                </p>
              </div>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Termination of Services</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Termination Conditions</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Either party may terminate with 30 days written notice</li>
                <li>Immediate termination for material breach of contract</li>
                <li>Non-payment may result in suspension of services</li>
                <li>Termination does not affect warranty obligations</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Post-Termination</h3>
                <p className="text-gray-700">
                  Upon termination, customers retain ownership of purchased equipment but lose access to 
                  ongoing support services unless separately contracted. All outstanding payments become immediately due.
                </p>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Dispute Resolution</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Resolution Process</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Direct negotiation between parties</li>
                  <li>Mediation through Ethiopian Chamber of Commerce</li>
                  <li>Arbitration under Ethiopian Arbitration and Conciliation Center rules</li>
                  <li>Legal proceedings in Ethiopian courts as last resort</li>
                </ol>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Governing Law</h2>
              
              <p className="text-gray-700">
                These Terms are governed by the laws of the Federal Democratic Republic of Ethiopia. 
                Any legal proceedings shall be conducted in the appropriate courts of Addis Ababa, Ethiopia.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Contact Information</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  For questions about these Terms of Service or to report issues, please contact us:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-green-600">📧</span>
                    <span className="text-gray-700">afomphama13@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600">📞</span>
                    <span className="text-gray-700">+251 929 092 353</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 mt-0.5">📍</span>
                    <span className="text-gray-700">Arada Subcity, Eribekentu Bridge, Woreda 08, Addis Ababa, Ethiopia</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
