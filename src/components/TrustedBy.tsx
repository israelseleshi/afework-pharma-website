export function TrustedBy() {
  const partners = [
    { name: "FDRE Defense Hospital", logo: "FDRE" },
    { name: "Tigray Regional Health Bureau", logo: "TRHB" },
    { name: "CDC Ethiopia", logo: "CDC" },
    { name: "Ministry of Health", logo: "MOH" },
    { name: "Black Lion Hospital", logo: "BLH" },
    { name: "St. Paul's Hospital", logo: "SPH" },
    { name: "Mindray", logo: "MR" },
    { name: "Siemens Healthineers", logo: "SH" }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Trusted by Leading Healthcare Institutions
          </h2>
          <p className="text-lg text-slate-600">
            Partnering with Ethiopia's most prestigious hospitals and international organizations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="group p-6 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300 hover:border-blue-300"
            >
              <div className="text-center">
                {/* Logo placeholder - in a real implementation these would be actual logos */}
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  {partner.logo}
                </div>
                <div className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial highlight */}
        <div className="mt-16 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-3xl text-blue-600">"</div>
            </div>
            
            <blockquote className="text-xl text-slate-700 mb-6 italic leading-relaxed">
              "Afework Pharma's exceptional execution of our 36-facility project across Tigray 
              region demonstrated their unmatched capability in complex, large-scale medical 
              equipment deployment. Their technical expertise and commitment to training our 
              staff was outstanding."
            </blockquote>
            
            <div className="border-t border-slate-200 pt-6">
              <div className="font-semibold text-slate-900">Tigray Regional Health Bureau</div>
              <div className="text-slate-600">CDC Ethiopia Project Partnership</div>
              <div className="text-sm text-slate-500 mt-1">45 IVD Units • 36 Health Facilities • 2024</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}