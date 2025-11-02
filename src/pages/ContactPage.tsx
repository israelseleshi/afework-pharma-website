import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Phone, Mail, MapPin, Clock, Send, Users, Wrench, ShoppingCart, Check, X, ChevronDown } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [fieldValidation, setFieldValidation] = useState<{[key: string]: boolean}>({});

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const contactInfoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const departmentCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const mapVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const officeInfoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const faqVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Form validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation
    if (field === 'email') {
      setFieldValidation(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (field === 'name') {
      setFieldValidation(prev => ({ ...prev, name: value.length > 0 }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    try {
      // Use PHP handler exclusively for DirectAdmin compatibility
      console.log('Sending contact form via PHP handler...');
      console.log('Form data:', formData);
      
      console.log('🚀 Making POST request to /contact-directadmin-fix.php');
      console.log('📦 Request body:', JSON.stringify(formData));
      
      const response = await fetch('/api/contact-phpmailer-dual.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📨 Response status:', response.status);
      console.log('📨 Response headers:', response.headers);
      
      // Log the raw response text first
      const responseText = await response.text();
      console.log('📨 Raw response:', responseText);

      // Try to parse as JSON
      let result;
      try {
        result = JSON.parse(responseText);
        console.log('✅ Parsed JSON result:', result);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON:', parseError);
        console.error('📨 Response was:', responseText);
        throw new Error(`Server returned invalid JSON. Response: ${responseText.substring(0, 200)}...`);
      }

      if (response.ok && result.success) {
        setFormStatus('success');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          inquiryType: '',
          message: ''
        });
        setFieldValidation({});
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+251 929 092 353", "+251 988 338 800"],
      description: ""
    },
    {
      icon: Mail,
      title: "Email",
      details: ["afomphama13@gmail.com", "afeworkwoldesilassie@gmail.com"],
      description: "We respond promptly to all inquiries"
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Arada Subcity, Eribekentu Bridge", "Woreda 08, Building H.No, 1st Floor #102"],
      description: "Visit our showroom and office"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday: 8:30 AM - 5:00 PM", "Sunday: Closed"],
      description: "Emergency support available 24/7"
    }
  ];

  const departments = [
    {
      icon: ShoppingCart,
      title: "Sales & Procurement",
      email: "afomphama13@gmail.com",
      phone: "+251 929 092 353",
      description: "Equipment quotes, procurement, and partnership inquiries"
    },
    {
      icon: Wrench,
      title: "Technical Support",
      email: "afomphama13@gmail.com", 
      phone: "+251 988 118 800",
      description: "Installation, maintenance, and technical assistance"
    },
    {
      icon: Users,
      title: "Training & Education",
      email: "afeworkwoldesilassie@gmail.com",
      phone: "+251 935 935 954",
      description: "Equipment training and educational programs"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Afework Pharma",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+251-911-123456",
          "contactType": "customer service",
          "availableLanguage": ["English", "Amharic"],
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
          }
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Ethiopia",
        "addressLocality": "Addis Ababa"
      },
      "email": "contact@afeworkpharmaet.com"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Afework Pharma Ethiopia | Medical Equipment Inquiries"
        description="Contact Afework Pharma for medical equipment inquiries in Ethiopia. Get in touch for diagnostic solutions, hospital setup, and healthcare technology. Phone, email, and showroom in Addis Ababa."
        keywords="Contact Afework Pharma Ethiopia, medical equipment showroom Addis Ababa, Afework Pharma address, healthcare solutions phone number, medical equipment inquiries Ethiopia, diagnostic equipment contact"
        canonical="/contact"
        ogTitle="Contact Afework Pharma Ethiopia | Medical Equipment Inquiries"
        ogDescription="Contact Afework Pharma for medical equipment inquiries in Ethiopia. Phone, email, and showroom in Addis Ababa for diagnostic solutions and healthcare technology."
        structuredData={structuredData}
      />
      {/* Hero Section - Guided Introduction */}
      <section className="py-8 sm:py-12 bg-green-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900 text-left"
              variants={heroVariants}
            >
              Contact Us
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={formVariants}
            >
              <div>
                <h2 className="text-3xl text-gray-900 mb-4">Send Us a Message</h2>
              </div>
              
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm"
                  >
                    {/* Success icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.2
                        }
                      }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Check className="w-8 h-8 text-green-600" />
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                      className="text-xl font-semibold text-gray-900 mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      Message Sent Successfully
                    </motion.h3>

                    {/* Subtitle */}
                    <motion.p 
                      className="text-gray-600 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      Thank you for contacting Afework Pharma. Our team will review your message and get back to you soon.
                    </motion.p>

                    {/* Features */}
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-green-600" />
                        <span>Confirmation sent to your email</span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-green-600" />
                        <span>Our team is reviewing your inquiry</span>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : formStatus === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <X className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-red-900 mb-2">Message Failed to Send</h3>
                    <p className="text-red-700">Sorry, there was an error sending your message. Please try again or contact us directly.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    className="space-y-6"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="relative">
                      <label className="block text-sm text-gray-700 mb-2">Name *</label>
                      <div className="relative">
                        <Input 
                          type="text" 
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="border-2 border-gray-400 focus:border-green-600 focus:ring-green-600 transition-colors duration-200 hover:border-gray-500"
                          required
                        />
                        {fieldValidation.name !== undefined && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {fieldValidation.name ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm text-gray-700 mb-2">Email *</label>
                      <div className="relative">
                        <Input 
                          type="email" 
                          placeholder="your.email@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="border-2 border-gray-400 focus:border-green-600 focus:ring-green-600 transition-colors duration-200 hover:border-gray-500"
                          required
                        />
                        {fieldValidation.email !== undefined && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {fieldValidation.email ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Phone</label>
                      <Input 
                        type="tel" 
                        placeholder="+251 9XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-2 border-gray-400 focus:border-green-600 focus:ring-green-600 transition-colors duration-200 hover:border-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Organization</label>
                      <Input 
                        type="text" 
                        placeholder="Hospital, clinic, or organization name"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        className="border-2 border-gray-400 focus:border-green-600 focus:ring-green-600 transition-colors duration-200 hover:border-gray-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Inquiry Type</label>
                      <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger className="border-2 border-gray-400 focus:border-green-600 focus:ring-green-600 transition-colors duration-200 hover:border-gray-500">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equipment">Equipment Purchase</SelectItem>
                          <SelectItem value="service">Service & Maintenance</SelectItem>
                          <SelectItem value="training">Training Programs</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Message *</label>
                      <Textarea 
                        placeholder="Please describe your requirements, timeline, and any specific questions you have..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="border-2 border-gray-400 focus:border-green-600 focus:ring-green-600 transition-colors duration-200 hover:border-gray-500"
                        required
                      />
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6"
                    >
                      <Button 
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg cursor-pointer relative overflow-hidden border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        style={{
                          background: formStatus === 'loading' ? '#059669' : '#10b981',
                          minHeight: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {formStatus === 'loading' ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <span className="mr-2">Send Message</span>
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div 
              className="space-y-6 sm:space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={contactInfoVariants}
            >
              <div>
                <h2 className="text-2xl sm:text-3xl text-gray-900 mb-6 sm:mb-8">Contact Information</h2>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white/50 rounded-xl border border-gray-100 hover:bg-white/80 transition-colors duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-sm sm:text-base text-gray-700 break-words">{detail}</p>
                        ))}
                        {info.description && (
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">{info.description}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Map & Location */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div 
              className="space-y-4 sm:space-y-6 order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={officeInfoVariants}
            >
              <h2 className="text-2xl sm:text-3xl text-gray-900">Visit Our Office</h2>
              
            </motion.div>
            
            <motion.div 
              className="bg-gray-200 h-96 sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={mapVariants}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3812.1129883821695!2d38.75807178808288!3d9.029003436062418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b853b39e428bb%3A0x33963d76bbb196f1!2sAfework%20Pharma!5e1!3m2!1sen!2set!4v1759848023856!5m2!1sen!2set&iwloc=near" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Afework Pharma Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            className="mb-8 sm:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <h2 className="text-2xl sm:text-3xl text-gray-900 mb-3 sm:mb-4">Frequently Asked Questions</h2>
          </motion.div>
          
          <motion.div 
            className="space-y-4 sm:space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                question: "What is your typical response time for technical support?",
                answer: "We provide 24/7 emergency support with response times within 4 hours for critical equipment. Regular support requests are handled within 24 hours."
              },
              {
                question: "Do you provide training for medical equipment?",
                answer: "Yes, we offer comprehensive training programs for all equipment we supply, including hands-on training, certification courses, and ongoing education."
              },
              {
                question: "What areas in Ethiopia do you serve?",
                answer: "We serve all regions of Ethiopia with our main office in Addis Ababa and service teams available for deployment nationwide."
              },
              {
                question: "Do you offer equipment financing options?",
                answer: "Yes, we work with various financial institutions to provide flexible financing solutions tailored to healthcare facilities' needs."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-green-300 transition-colors duration-200"
                variants={faqVariants}
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <div className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                  <h3 className="text-base sm:text-lg text-gray-900 font-medium pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100">
                        <p className="text-sm sm:text-base text-gray-600 pt-3 sm:pt-4 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}