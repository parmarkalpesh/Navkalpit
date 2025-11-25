import React from "react";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "3D Printing",
      description:
        "High-quality 3D printing solutions with precision and reliability.",
      features: ["Fast turnaround", "Multiple materials", "Affordable pricing"],
    },
    {
      id: 2,
      title: "PCB Design",
      description: "Rapid prototyping to bring your ideas to life quickly.",
      features: [
        "Iterative design",
        "Quick modifications",
        "Professional finish",
      ],
    },
    {
      id: 3,
      title: "3D Scanning",
      description: "Scalable manufacturing solutions for production needs.",
      features: ["Batch production", "Quality assured", "Cost effective"],
    },
    {
      id: 4,
      title: "Prototype",
      description: "Expert guidance for your 3D printing projects.",
      features: ["Technical support", "Best practices", "Custom solutions"],
    },
  ];

  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      {/* Gradient background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl "></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive 3D printing solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 md:p-10 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-black rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <svg
                      className="w-5 h-5 text-blue-600 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-slate-600 text-lg mb-6">
            Ready to transform your ideas?
          </p>
          <button className="px-8 py-4 bg-black text-white font-bold rounded-lg text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
