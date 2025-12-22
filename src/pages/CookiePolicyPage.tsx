import React from "react";
import SEO from "../components/SEO";
import { useRouter } from "../components/Router";
import { ArrowLeft, Cookie, Settings, Eye, BarChart, Shield, Globe } from "lucide-react";

export function CookiePolicyPage() {
  const { navigateTo } = useRouter();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy - Afework Pharma Medical Solutions",
    "description": "Cookie Policy for Afework Pharma Medical Solutions - Learn about our use of cookies and tracking technologies on our website.",
    "url": "https://afeworkpharma.com/cookie-policy",
    "publisher": {
      "@type": "Organization",
      "name": "Afework Pharma Medical Solutions"
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <SEO
        title="Cookie Policy | Afework Pharma Medical Solutions"
        description="Cookie Policy for Afework Pharma Medical Solutions. Learn about our use of cookies, tracking technologies, and how to manage your preferences on our website."
        keywords="cookie policy, website cookies, tracking technologies, privacy preferences, Afework Pharma cookies, medical website cookies Ethiopia"
        canonical="/cookie-policy"
        ogTitle="Cookie Policy | Afework Pharma Medical Solutions"
        ogDescription="Learn about Afework Pharma's use of cookies and tracking technologies on our medical equipment website."
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
              <Cookie className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900" style={{letterSpacing: '-0.02em'}}>Cookie Policy</h1>
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
                What Are Cookies?
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better browsing experience by remembering your preferences, 
                  analyzing website usage, and ensuring our medical equipment information is presented effectively.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This Cookie Policy explains how Afework Pharma Medical Solutions uses cookies and similar 
                  tracking technologies on our website and how you can manage your preferences.
                </p>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{letterSpacing: '-0.02em'}}>
                <Settings className="w-6 h-6 text-green-600" />
                Types of Cookies We Use
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Essential Cookies
                  </h3>
                  <p className="text-gray-700 mb-3">
                    These cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Session management</li>
                    <li>Security features</li>
                    <li>Basic website functionality</li>
                    <li>Form submission handling</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-blue-600" />
                    Analytics Cookies
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Help us understand how visitors interact with our website to improve user experience.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Page view tracking</li>
                    <li>User behavior analysis</li>
                    <li>Popular content identification</li>
                    <li>Website performance monitoring</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-600" />
                    Functional Cookies
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Remember your preferences and settings to enhance your browsing experience.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Language preferences</li>
                    <li>Theme settings</li>
                    <li>Form data retention</li>
                    <li>User interface customization</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-orange-600" />
                    Third-Party Cookies
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Set by external services we use to enhance website functionality and analytics.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    <li>Google Analytics</li>
                    <li>Social media integration</li>
                    <li>Content delivery networks</li>
                    <li>Customer support tools</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Specific Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Specific Cookies We Use</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Cookie Name</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Purpose</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Duration</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-mono">session_id</td>
                      <td className="border border-gray-300 px-4 py-3">Maintains user session across pages</td>
                      <td className="border border-gray-300 px-4 py-3">Session</td>
                      <td className="border border-gray-300 px-4 py-3">Essential</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-mono">preferences</td>
                      <td className="border border-gray-300 px-4 py-3">Stores user preferences and settings</td>
                      <td className="border border-gray-300 px-4 py-3">1 year</td>
                      <td className="border border-gray-300 px-4 py-3">Functional</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-mono">_ga</td>
                      <td className="border border-gray-300 px-4 py-3">Google Analytics - distinguishes users</td>
                      <td className="border border-gray-300 px-4 py-3">2 years</td>
                      <td className="border border-gray-300 px-4 py-3">Analytics</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-mono">_gid</td>
                      <td className="border border-gray-300 px-4 py-3">Google Analytics - distinguishes users</td>
                      <td className="border border-gray-300 px-4 py-3">24 hours</td>
                      <td className="border border-gray-300 px-4 py-3">Analytics</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-mono">cookie_consent</td>
                      <td className="border border-gray-300 px-4 py-3">Remembers your cookie preferences</td>
                      <td className="border border-gray-300 px-4 py-3">1 year</td>
                      <td className="border border-gray-300 px-4 py-3">Essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* How We Use Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>How We Use Cookies</h2>
              
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Website Functionality</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Maintain your session while browsing our medical equipment catalog</li>
                  <li>Remember your contact form information to prevent data loss</li>
                  <li>Provide personalized content based on your interests</li>
                  <li>Ensure secure access to protected areas of our website</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Analytics and Improvement</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Track which medical solutions are most viewed by healthcare professionals</li>
                  <li>Understand user navigation patterns to improve website structure</li>
                  <li>Monitor website performance and loading times</li>
                  <li>Identify popular content to enhance our medical equipment information</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">User Experience Enhancement</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Remember your preferred language and regional settings</li>
                  <li>Customize the display of medical equipment based on your interests</li>
                  <li>Provide relevant product recommendations</li>
                  <li>Enable social media sharing functionality</li>
                </ul>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Managing Your Cookie Preferences</h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Browser Settings</h3>
                <p className="text-gray-700 mb-3">
                  You can control and manage cookies through your browser settings. Here's how to manage cookies in popular browsers:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Note</h3>
                <p className="text-gray-700">
                  Disabling certain cookies may affect the functionality of our website. Essential cookies 
                  cannot be disabled as they are necessary for basic website operations, security, and 
                  compliance with healthcare industry standards.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Cookie Preference Center</h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  We provide a cookie preference center where you can:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>View detailed information about each cookie category</li>
                  <li>Enable or disable non-essential cookies</li>
                  <li>Update your preferences at any time</li>
                  <li>Access links to third-party privacy policies</li>
                </ul>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Third-Party Services</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Google Analytics</h3>
                  <p className="text-gray-700 mb-3">
                    We use Google Analytics to understand how visitors use our website. This helps us improve 
                    our medical equipment information and user experience.
                  </p>
                  <p className="text-sm text-gray-600">
                    Learn more: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Privacy Policy</a>
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Content Delivery Network (CDN)</h3>
                  <p className="text-gray-700 mb-3">
                    We use CDN services to ensure fast loading of our website content, including medical 
                    equipment images and technical documentation.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Social Media Integration</h3>
                  <p className="text-gray-700 mb-3">
                    Our website may include social media sharing buttons that may set cookies from 
                    respective social media platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Data Protection and Security</h2>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  We implement appropriate security measures to protect cookie data:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Secure transmission using HTTPS encryption</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to cookie data on need-to-know basis</li>
                  <li>Compliance with Ethiopian data protection regulations</li>
                  <li>Regular deletion of expired cookies and data</li>
                </ul>
              </div>
            </div>

            {/* Updates to Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Updates to This Policy</h2>
              
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy periodically to reflect changes in our practices, 
                technology, or legal requirements. When we make significant changes, we will:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Update the "Last updated" date at the top of this policy</li>
                <li>Notify users through our website banner or email</li>
                <li>Provide clear information about the changes made</li>
                <li>Allow users to review and update their cookie preferences</li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Your continued use of our website after policy updates constitutes acceptance of the revised Cookie Policy.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{letterSpacing: '-0.02em'}}>Contact Us About Cookies</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  If you have questions about our use of cookies or this Cookie Policy, please contact us:
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
