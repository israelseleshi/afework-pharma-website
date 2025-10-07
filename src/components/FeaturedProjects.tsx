import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, MapPin, Calendar, Users, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FeaturedProjects() {
  const projects = [
    {
      title: "CDC-Tigray Regional Health System Strengthening Project",
      client: "Tigray Regional Health Bureau",
      sponsor: "CDC Ethiopia",
      year: "2024",
      image: "https://images.unsplash.com/photo-1694787590597-ba49c7cdc2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYW4lMjBob3NwaXRhbCUyMG1lZGljYWwlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NTk4MjkwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      stats: [
        { icon: MapPin, label: "36 Health Facilities", value: "Across Tigray" },
        { icon: Users, label: "45 IVD Units", value: "Deployed" },
        { icon: Calendar, label: "40 Days", value: "Timeline" },
        { icon: Award, label: "100+", value: "Staff Trained" }
      ],
      description: "Complete turnkey project providing diagnostic equipment to restore critical healthcare services across post-conflict regions.",
      achievements: [
        "45 IVD Units Successfully Deployed",
        "Comprehensive Staff Training Program",
        "Letter of Appreciation Received",
        "24/7 Technical Support Established"
      ]
    },
    {
      title: "FDRE Defense Referral Hospital Modernization",
      client: "Federal Defense Hospital",
      sponsor: "Ministry of Defense",
      year: "2023",
      image: "https://images.unsplash.com/photo-1758206523745-1f334f702660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhlYWx0aGNhcmUlMjBwcm9mZXNzaW9uYWxzfGVufDF8fHx8MTc1OTgyMTkzNXww&ixlib=rb-4.1.0&q=80&w=1080",
      stats: [
        { icon: MapPin, label: "Major Hospital", value: "Addis Ababa" },
        { icon: Users, label: "Multiple Depts", value: "Upgraded" },
        { icon: Calendar, label: "6 Months", value: "Project Duration" },
        { icon: Award, label: "Advanced", value: "Technology" }
      ],
      description: "Comprehensive medical equipment upgrade including laboratory, imaging, and critical care solutions for Ethiopia's premier defense hospital.",
      achievements: [
        "Complete Laboratory Modernization",
        "Advanced Imaging Solutions",
        "Critical Care Equipment Installation",
        "Ongoing Maintenance Contract"
      ]
    }
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Proven Success in Critical Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our track record speaks for itself. From emergency deployments to comprehensive 
            hospital modernizations, we deliver excellence when it matters most.
          </p>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year} Project</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-900 leading-tight">
                    {project.title}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="text-lg text-slate-700">
                      <span className="font-semibold">Client:</span> {project.client}
                    </div>
                    <div className="text-lg text-slate-700">
                      <span className="font-semibold">Sponsor:</span> {project.sponsor}
                    </div>
                  </div>
                  
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {project.stats.map((stat, statIndex) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={statIndex} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <IconComponent className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{stat.value}</div>
                          <div className="text-sm text-slate-600">{stat.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Key Achievements:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-slate-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Project Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <ImageWithFallback 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}