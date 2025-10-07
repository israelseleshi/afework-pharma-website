import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Phone, Mail, MapPin, Clock, Send, Users, Wrench, ShoppingCart } from "lucide-react";

export function ContactPage() {
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
      {/* Hero Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your healthcare facility? Our team of experts is here to 
            help you find the perfect medical equipment solutions for your needs.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will respond within 24 hours.
                </p>
              </div>
              
              <form className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Name *</label>
                    <Input 
                      type="text" 
                      placeholder="Your full name"
                      className="border-green-600 focus:border-green-600 focus:ring-green-600"
                      required
                    />
                  </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email *</label>
                  <Input 
                    type="email" 
                    placeholder="your.email@company.com"
                    className="border-green-600 focus:border-green-600 focus:ring-green-600"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Phone</label>
                  <Input 
                    type="tel" 
                    placeholder="+251 9XX XXX XXX"
                    className="border-green-600 focus:border-green-600 focus:ring-green-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Organization</label>
                  <Input 
                    type="text" 
                    placeholder="Hospital, clinic, or organization name"
                    className="border-green-600 focus:border-green-600 focus:ring-green-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Inquiry Type</label>
                  <Select>
                    <SelectTrigger className="border-green-600 focus:border-green-600 focus:ring-green-600">
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
                    className="border-green-600 focus:border-green-600 focus:ring-green-600"
                    required
                  />
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
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
                    <div key={index} className="flex gap-4">
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">Department Contacts</h2>
            <p className="text-xl text-gray-600">
              Reach out to the right department for faster assistance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {departments.map((dept, index) => {
              const IconComponent = dept.icon;
              return (
                <Card key={index} className="border-gray-200">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 border-2 border-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-green-600" />
                    </div>
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
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
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                Schedule a Visit
              </Button>
            </div>
            
            <div className="bg-gray-200 h-80 rounded-2xl overflow-hidden">
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
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-6">
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
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}