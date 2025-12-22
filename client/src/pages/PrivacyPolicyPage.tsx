import React from "react";
import SEO from "../components/SEO";
import { useRouter } from "../components/Router";
import { ArrowLeft, Shield, Lock, Eye, Database, Mail, Phone } from "lucide-react";

export function PrivacyPolicyPage() {
  const { navigateTo } = useRouter();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Afework Pharma Medical Solutions",
    "description": "Privacy Policy for Afework Pharma Medical Solutions - Learn how we protect your personal information and data privacy.",
    "url": "https://afeworkpharma.com/privacy-policy",
    "publisher": {
      "@type": "Organization",
      "name": "Afework Pharma Medical Solutions"
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <SEO
        title="Privacy Policy | Afework Pharma Medical Solutions"
        description="Privacy Policy for Afework Pharma Medical Solutions. Learn how we collect, use, and protect your personal information in compliance with Ethiopian data protection laws."
        keywords="privacy policy, data protection, personal information, Afework Pharma, medical equipment privacy, healthcare data protection Ethiopia"
        canonical="/privacy-policy"
        ogTitle="Privacy Policy | Afework Pharma Medical Solutions"
        ogDescription="Learn how Afework Pharma protects your personal information and ensures data privacy compliance."
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
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900" style={{letterSpacing: '-0.02em'}}>Privacy Policy</h1>
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
                <Eye className="w-6 h-6 text-green-600" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Afework Pharma Medical Solutions ("we," "our," or "us") is committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                use our services, or interact with us in connection with our medical equipment and healthcare technology solutions in Ethiopia.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{letterSpacing: '-0.02em'}}>
                <Database className="w-6 h-6 text-green-600" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Name, email address, phone number, and job title</li>
                <li>Company or healthcare facility information</li>
                <li>Professional credentials and certifications</li>
                <li>Communication preferences and contact history</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>IP address, browser type, and operating system</li>
                <li>Website usage data and navigation patterns</li>
                <li>Device information and screen resolution</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Healthcare-Related Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Equipment specifications and requirements</li>
                <li>Facility capacity and technical needs</li>
                <li>Training requirements and certification records</li>
                <li>Service and maintenance history</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{letterSpacing: '-0.02em'}}>
                <Lock className="w-6 h-6 text-green-600" />
                How We Use Your Information
              </h2>
              
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Primary Uses</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide medical equipment and healthcare technology solutions</li>
                  <li>Process orders, installations, and service requests</li>
                  <li>Deliver technical support and training services</li>
                  <li>Communicate about products, services, and updates</li>
                  <li>Ensure regulatory compliance and quality assurance</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Secondary Uses</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Improve our products and services</li>
                <li>Conduct market research and analysis</li>
                <li>Maintain website security and functionality</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Protect against fraud and unauthorized access</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Information Sharing and Disclosure</h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{letterSpacing: '-0.02em'}}>We do not sell your personal information.</h3>
                <p className="text-gray-700">
                  We may share your information only in the following circumstances:
                </p>
              </div>

              <ul className="list-disc list-inside text-gray-700 space-y-3">
                <li><strong>Service Providers:</strong> Trusted partners who assist with equipment delivery, installation, and maintenance</li>
                <li><strong>Manufacturers:</strong> Medical equipment manufacturers for warranty, support, and compliance purposes</li>
                <li><strong>Healthcare Authorities:</strong> Ethiopian health regulatory bodies when required by law</li>
                <li><strong>Legal Requirements:</strong> When disclosure is required by Ethiopian law or legal proceedings</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales (with notice)</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Data Security and Protection</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Safeguards</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and databases</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Administrative Safeguards</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Employee training on data protection</li>
                    <li>Limited access on need-to-know basis</li>
                    <li>Regular privacy policy reviews</li>
                    <li>Incident response procedures</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Your Privacy Rights</h2>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate data</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Restrict processing of your data</li>
                  <li>Data portability where technically feasible</li>
                </ul>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Cookies and Tracking Technologies</h2>
              
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your website experience, analyze usage patterns, 
                and provide personalized content. You can manage cookie preferences through your browser settings.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  For detailed information about our cookie usage, please see our 
                  <button 
                    onClick={() => navigateTo('cookie-policy')}
                    className="text-green-600 hover:text-green-700 underline ml-1"
                  >
                    Cookie Policy
                  </button>.
                </p>
              </div>
            </div>

            {/* International Transfers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>International Data Transfers</h2>
              
              <p className="text-gray-700 mb-4">
                As we work with international medical equipment manufacturers and technology providers, 
                your information may be transferred to and processed in countries outside Ethiopia. 
                We ensure appropriate safeguards are in place to protect your data during such transfers.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Contact Us</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">afomphama13@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">+251 929 092 353</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-green-600 mt-0.5">📍</div>
                    <span className="text-gray-700">Arada Subcity, Eribekentu Bridge, Woreda 08, Addis Ababa, Ethiopia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Policy Updates</h2>
              
              <p className="text-gray-700">
                We may update this Privacy Policy periodically to reflect changes in our practices, 
                technology, legal requirements, or other factors. We will notify you of significant 
                changes through our website or direct communication. Your continued use of our services 
                after such modifications constitutes acceptance of the updated Privacy Policy.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
