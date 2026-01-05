import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, Users, Wrench, ShoppingCart, Check, X, ChevronDown, Building, Globe } from "lucide-react";

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
      
      const response = await fetch('/api/contact-phpmailer-dual-fixed.php', {
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
      details: ["+251 911 238 129"],
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
      phone: "+251 911 238 129",
      description: "Equipment quotes, procurement, and partnership inquiries"
    },
    {
      icon: Wrench,
      title: "Technical Support",
      email: "afomphama13@gmail.com", 
      phone: "+251 911 238 129",
      description: "Installation, maintenance, and technical assistance"
    },
    {
      icon: Users,
      title: "Training & Education",
      email: "afeworkwoldesilassie@gmail.com",
      phone: "+251 911 238 129",
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
          "telephone": "+251-911-238129",
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <SEO
        title="Contact Afework Pharma Ethiopia | Medical Equipment Inquiries"
        description="Contact Afework Pharma for medical equipment inquiries in Ethiopia. Get in touch for diagnostic solutions, hospital setup, and healthcare technology. Phone, email, and showroom in Addis Ababa."
        keywords="Contact Afework Pharma Ethiopia, medical equipment showroom Addis Ababa, Afework Pharma address, healthcare solutions phone number, medical equipment inquiries Ethiopia, diagnostic equipment contact"
        canonical="/contact"
        ogTitle="Contact Afework Pharma Ethiopia | Medical Equipment Inquiries"
        ogDescription="Contact Afework Pharma for medical equipment inquiries in Ethiopia. Phone, email, and showroom in Addis Ababa for diagnostic solutions and healthcare technology."
        structuredData={structuredData}
      />
      
      {/* Main Contact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  Connect with us through any of these channels. We're committed to providing prompt and professional service.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 max-w-4xl mx-auto w-full">
                {/* Phone */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg border border-gray-100 flex-1 flex flex-col transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-[15px] md:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-1.5 md:mb-2">Phone</h3>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-base text-gray-700 leading-snug">+251 911 238 129</p>
                      <p className="text-xs sm:text-[13px] md:text-sm text-green-600 mt-1 sm:mt-1.5 md:mt-2">24/7 Emergency Support Available</p>
                    </div>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg border border-gray-100 flex-1 flex flex-col transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-[15px] md:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-1.5 md:mb-2">Email</h3>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-base text-gray-700 leading-snug">afomphama13@gmail.com</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-base text-gray-700 leading-snug">afeworkwoldesilassie@gmail.com</p>
                    </div>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg border border-gray-100 flex-1 flex flex-col transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-[15px] md:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-1.5 md:mb-2">Location</h3>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-base text-gray-700 leading-snug">Arada Subcity, Eribekentu Bridge</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-base text-gray-700 leading-snug">Woreda 08, Building H.No, 1st Floor #102</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-base text-gray-700 leading-snug">Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                </motion.div>

                {/* Business Hours */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg border border-gray-100 flex-1 flex flex-col transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-[15px] md:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-1.5 md:mb-2">Business Hours</h3>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-base text-gray-700 leading-snug">Monday - Saturday: 8:30 AM - 5:00 PM</p>
                      <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-base text-gray-700 leading-snug">Sunday: Closed</p>
                      <p className="text-xs sm:text-[13px] md:text-sm text-green-600 mt-1 sm:mt-1.5 md:mt-2">Emergency support available 24/7</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="p-6 pb-0 bg-gray-50 border-b rounded-t-lg">
                  <CardTitle className="text-2xl text-gray-900">Send us a message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <AnimatePresence mode="wait">
                    {formStatus === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <Check className="w-8 h-8 text-green-600" />
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">Message Sent Successfully</h3>
                        <p className="text-gray-600">
                          Thank you for contacting Afework Pharma. Our team will review your message and get back to you soon.
                        </p>
                      </motion.div>
                    ) : formStatus === 'error' ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <X className="w-8 h-8 text-red-600" />
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">Message Failed to Send</h3>
                        <p className="text-gray-600">
                          Sorry, there was an error sending your message. Please try again or contact us directly.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>First Name <span className="text-red-500">*</span></Label>
                            <Input
                              id="name"
                              type="text"
                              placeholder="Abebe"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              required
                              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-700">Last Name <span className="text-red-500">*</span></Label>
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Kebede"
                              required
                              className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-700">Email <span className="text-red-500">*</span></Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="abebe.kebede@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+251 9XX XXX XXX"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="organization" className="text-gray-700">Organization</Label>
                          <Input
                            id="organization"
                            type="text"
                            placeholder="Hospital, clinic, or organization name"
                            value={formData.organization}
                            onChange={(e) => handleInputChange('organization', e.target.value)}
                            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="inquiryType" className="text-gray-700">Inquiry Type</Label>
                          <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                            <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
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

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-gray-700">Subject <span className="text-red-500">*</span></Label>
                          <Input
                            id="subject"
                            type="text"
                            placeholder="How can we help you?"
                            required
                            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-gray-700">Message <span className="text-red-500">*</span></Label>
                          <Textarea
                            id="message"
                            placeholder="Please describe your requirements, timeline, and any specific questions you have..."
                            rows={5}
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            required
                            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={formStatus === 'loading'}
                          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium border-2 border-green-500 hover:border-green-600"
                          size="lg"
                          style={{ backgroundColor: 'rgb(34 197 94)', color: 'white', borderColor: 'rgb(34 197 94)' }}
                        >
                          {formStatus === 'loading' ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Title - Left Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>Visit Our Office</h2>
            <p className="text-gray-600 max-w-2xl">
              Visit our showroom and office in Addis Ababa to see our medical equipment firsthand and discuss your requirements with our experts.
            </p>
          </motion.div>

          {/* Map - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-200 h-[500px] rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3812.1129883821695!2d38.75807178808288!3d9.029003436062418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b853b39e428bb%3A0x33963d76bbb196f1!2sAfework%20Pharma!5e1!3m2!1sen!2set&4v1759848023856!5m2!1sen!2set&iwloc=near"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Afework Pharma Location"
            />
          </motion.div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 lg:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Title - Left Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>Contact Our Departments</h2>
            <p className="text-gray-600 max-w-2xl">
              Reach out to the right department for faster and more specialized assistance with your specific needs.
            </p>
          </motion.div>

          {/* Department Cards - Centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((department, index) => {
              const IconComponent = department.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.div 
                    className="bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg border border-gray-100 h-full flex flex-col transition-all duration-300"
                    whileHover={{ 
                      scale: 1.02,
                      y: -4,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 flex-shrink-0">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{department.title}</h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 flex-grow">{department.description}</p>
                    <div className="space-y-2 mt-auto">
                      <div className="flex items-start gap-2 text-sm">
                        <Mail className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700 break-all">{department.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">{department.phone}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}