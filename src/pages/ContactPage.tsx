import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 2000);
  };
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+251 929 092 353", "+251 988 338 800"],
      description: "Available Monday - Saturday, 8:30 AM - 5:00 PM"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["afomphama13@gmail.com", "afeworkwoldesilassie@gmail.com"],
      description: "We respond within 24 hours"
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

  return (
    <div className="min-h-screen">
      {/* Hero Section - Guided Introduction */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900"
              variants={heroVariants}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              variants={heroVariants}
            >
              Ready to transform your healthcare facility? Our team of experts is here to 
              help you find the perfect medical equipment solutions for your needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={formVariants}
            >
              <div>
                <h2 className="text-3xl text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will respond within 24 hours.
                </p>
              </div>
              
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Check className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-green-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700">Thank you for contacting us. We'll respond within 24 hours.</p>
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
                          className="border-gray-300 focus:border-green-600 focus:ring-green-600 transition-colors duration-200"
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
                          className="border-gray-300 focus:border-green-600 focus:ring-green-600 transition-colors duration-200"
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
                        className="border-gray-300 focus:border-green-600 focus:ring-green-600 transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Organization</label>
                      <Input 
                        type="text" 
                        placeholder="Hospital, clinic, or organization name"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        className="border-gray-300 focus:border-green-600 focus:ring-green-600 transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Inquiry Type</label>
                      <Select onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger className="border-gray-300 focus:border-green-600 focus:ring-green-600 transition-colors duration-200">
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
                        className="border-gray-300 focus:border-green-600 focus:ring-green-600 transition-colors duration-200"
                        required
                      />
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer relative overflow-hidden"
                      >
                        {formStatus === 'loading' ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 w-4 h-4" />
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
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={contactInfoVariants}
            >
              <div>
                <h2 className="text-3xl text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600">
                  Multiple ways to reach us for your convenience.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="flex gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-12 h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-900 mb-1">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-700">{detail}</p>
                        ))}
                        <p className="text-gray-500 text-sm mt-1">{info.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Department Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <h2 className="text-3xl text-gray-900 mb-4">Department Contacts</h2>
            <p className="text-xl text-gray-600">
              Reach out to the right department for faster assistance
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {departments.map((dept, index) => {
              const IconComponent = dept.icon;
              return (
                <motion.div
                  key={index}
                  variants={departmentCardVariants}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="border-gray-200 h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <motion.div 
                        className="w-16 h-16 border-2 border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          animate={
                            dept.icon === Wrench ? { rotate: [0, 15, -15, 0] } :
                            dept.icon === ShoppingCart ? { x: [0, 2, -2, 0] } :
                            dept.icon === Users ? { scale: [1, 1.1, 1] } : {}
                          }
                          transition={{ 
                            duration: 0.6,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        >
                          <IconComponent className="w-8 h-8 text-green-600" />
                        </motion.div>
                      </motion.div>
                      <CardTitle className="text-xl text-gray-900">{dept.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <p className="text-gray-600">{dept.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-green-600 text-sm">{dept.email}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 text-sm">{dept.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={officeInfoVariants}
            >
              <h2 className="text-3xl text-gray-900">Visit Our Office</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Located in the heart of Addis Ababa, our office features a modern showroom 
                where you can see our medical equipment firsthand. Schedule a visit to 
                discuss your requirements with our technical experts.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg text-gray-900">Office Features:</h3>
                <ul className="space-y-2">
                  {[
                    "Interactive equipment demonstrations",
                    "Technical consultation rooms",
                    "Training facilities",
                    "Parts and service center"
                  ].map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-green-600 rounded-full"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                      />
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                  Schedule a Visit
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-200 h-80 rounded-2xl overflow-hidden"
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroVariants}
          >
            <h2 className="text-3xl text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
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
                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                  <h3 className="text-lg text-gray-900 font-medium">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
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
                        className="px-6 pb-6 border-t border-gray-100"
                      >
                        <p className="text-gray-600 pt-4">{faq.answer}</p>
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