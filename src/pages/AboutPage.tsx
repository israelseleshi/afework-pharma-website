import React from "react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useRouter } from "../components/Router";
import { Award, Users, MapPin, Clock, ArrowRight, Trophy, CheckCircle, TrendingUp, Building } from "lucide-react";

export function AboutPage() {
  const { navigateTo } = useRouter();

  const achievements = [
    {
      icon: Award,
      title: "5+ Years Experience",
      description: "Leading medical equipment distribution in Ethiopia"
    },
    {
      icon: Users,
      title: "45+ IVD Units",
      description: "Recently deployed across 36 health facilities"
    },
    {
      icon: MapPin,
      title: "Nationwide Coverage",
      description: "Service centers in major Ethiopian cities"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance"
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Established by Afework Woldesilassie with ETB 300,000 initial capital",
      icon: Building,
      achievement: null
    },
    {
      year: "2020",
      title: "Business Growth",
      description: "Expanded operations and established key partnerships",
      icon: TrendingUp,
      achievement: null
    },
    {
      year: "2023",
      title: "Major Milestone",
      description: "Achieved annual turnover exceeding ETB 170 million",
      icon: Trophy,
      achievement: "ETB 170M+ Annual Turnover"
    },
    {
      year: "2024",
      title: "CDC-Tigray Project",
      description: "Successfully deployed 45 IVD units across 36 health facilities",
      icon: CheckCircle,
      achievement: "45 IVD Units Deployed"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50/50 to-green-50/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl mb-6 text-gray-900">
                  Advancing Healthcare Through Innovation
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Since 2019, Afework Pharma has been Ethiopia's trusted partner in medical technology, 
                  delivering world-class equipment and comprehensive support services to healthcare 
                  institutions nationwide.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhvc3BpdGFsJTIwZXRoaW9waWF8ZW58MXx8fHwxNzU5ODI5MjEwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Afework Pharma team in Ethiopian hospital"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl text-gray-900">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To transform healthcare delivery in Ethiopia by providing state-of-the-art medical 
                equipment, comprehensive training, and unwavering technical support that empowers 
                healthcare professionals to deliver exceptional patient care.
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl text-gray-900">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the leading catalyst in Ethiopia's healthcare transformation, bridging the 
                gap between global medical innovation and local healthcare needs, ensuring every 
                Ethiopian has access to world-class medical care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">Key Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our track record speaks for itself - delivering excellence across Ethiopia's healthcare landscape
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 border-2 border-gray-200 rounded-xl flex items-center justify-center mx-auto">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg text-gray-900">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Building Ethiopia's healthcare infrastructure one project at a time
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">{milestone.year}</div>
                    <div className="w-12 h-12 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-2">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-px h-16 bg-gray-200 mx-auto mt-4"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 mb-3">{milestone.description}</p>
                      {milestone.achievement && (
                        <div className="flex items-center gap-2 mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                          <Trophy className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">{milestone.achievement}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to advancing Ethiopian healthcare
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mr. Afework Woldesilassie",
                position: "Founder & Chief Executive Officer",
                bio: "Visionary leader with international investment acumen and deep healthcare expertise. Founded Afework Pharma in 2019 with a mission to transform Ethiopian healthcare through innovative medical technology solutions.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMGFmcmljYW58ZW58MXx8fHwxNzU5ODI5MzAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
                featured: true
              },
              {
                name: "Dr. Meron Getachew",
                position: "Technical Director", 
                bio: "Biomedical engineer with 10+ years of experience in medical equipment installation, maintenance, and quality assurance. Leads our technical team in ensuring optimal equipment performance across all deployments.",
                image: "https://images.unsplash.com/photo-1594824475317-87daa4d6c825?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRvY3RvcnxlbnwxfHx8fDE3NTk4MjkzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
                featured: false
              },
              {
                name: "Ato Dawit Alemayehu",
                position: "Operations Manager",
                bio: "Healthcare logistics specialist with extensive experience in supply chain management and project coordination. Ensures seamless delivery and implementation of medical solutions across Ethiopian healthcare facilities.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbnxlbnwxfHx8fDE3NTk4MjkzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
                featured: false
              }
            ].map((member, index) => (
              <div key={index} className={`bg-white p-6 rounded-xl border transition-all duration-300 hover:shadow-lg h-full flex flex-col ${member.featured ? 'border-green-200 shadow-md' : 'border-gray-200'}`}>
                <div className="relative mb-4 flex-shrink-0">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-3 border-white shadow-lg">
                    <ImageWithFallback 
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {member.featured && (
                    <div className="absolute -top-1 -right-1 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Founder
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium text-center mb-3 text-sm">{member.position}</p>
                  <p className="text-gray-600 text-center text-xs leading-relaxed flex-grow">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}