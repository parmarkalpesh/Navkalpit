import React, { useState } from "react";

function Service() {
  const [expandedService, setExpandedService] = useState(null);
  const [fileUpload, setFileUpload] = useState({
    "3d-printing": null,
    prototype: null,
  });

  const services = [
    {
      id: "3d-printing",
      title: "3D Printing",
      subtitle: "Transform Your Ideas into Physical Objects",
      description:
        "Professional 3D printing services with precision and quality. Choose from multiple materials and finishes.",
      features: [
        "Design Consultation",
        "3D Printing",
        "Post-Processing",
        "Quality Assurance",
      ],
      icon: "🖨️",
      color: "from-blue-600 to-cyan-600",
      details:
        "Our 3D printing service includes design optimization, material selection, and precision printing using state-of-the-art equipment. We handle FDM and SLA technologies for maximum versatility.",
      hasUpload: true,
    },
    {
      id: "pcb-design",
      title: "PCB Design",
      subtitle: "Custom Circuit Board Solutions",
      description:
        "Expert PCB design and layout services for your electronic projects. From concept to production.",
      features: [
        "Schematic Design",
        "PCB Layout",
        "Gerber Generation",
        "Design Verification",
      ],
      icon: "⚡",
      color: "from-purple-600 to-pink-600",
      details:
        "We provide comprehensive PCB design services including schematic capture, multi-layer layout, signal integrity analysis, and preparation for manufacturing. DFM reviews ensure manufacturability.",
      hasUpload: false,
    },
    {
      id: "3d-scanning",
      title: "3D Scanning",
      subtitle: "Capture Reality in Digital Form",
      description:
        "High-precision 3D scanning services to digitize physical objects and environments.",
      features: [
        "Object Scanning",
        "Point Cloud Processing",
        "Mesh Generation",
        "Format Export",
      ],
      icon: "📡",
      color: "from-green-600 to-emerald-600",
      details:
        "Our professional 3D scanning services capture precise measurements and geometries of physical objects. Perfect for reverse engineering, quality inspection, and digital archiving.",
      hasUpload: false,
    },
    {
      id: "prototype",
      title: "Prototype Development",
      subtitle: "Bring Your Concept to Life",
      description:
        "End-to-end prototype development services including design, printing, and testing.",
      features: [
        "Design Review",
        "Rapid Prototyping",
        "Functional Testing",
        "Iteration Support",
      ],
      icon: "🔧",
      color: "from-orange-600 to-red-600",
      details:
        "From concept to finished prototype, we handle every step. Upload your design files (FDM, SLA formats) and we'll bring your vision to life with expert craftsmanship.",
      hasUpload: true,
    },
  ];

  const handleFileChange = (serviceId, event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file format (only FDM, SLA formats allowed)
      const validFormats = [".fdm", ".sla", ".stl", ".obj", ".step"];
      const fileName = file.name.toLowerCase();
      const isValidFormat = validFormats.some((format) =>
        fileName.endsWith(format)
      );

      if (isValidFormat) {
        setFileUpload((prev) => ({
          ...prev,
          [serviceId]: file,
        }));
      } else {
        alert("Please upload only FDM, SLA, STL, OBJ, or STEP files");
        event.target.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-900 to-black pt-24 pb-20">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 px-6 md:px-12 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-blue-500/20 border border-blue-400/40 text-blue-200 rounded-full text-sm font-semibold backdrop-blur-sm">
              ✨ Our Services
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Professional{" "}
            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Comprehensive solutions for all your 3D printing, design, and
            prototyping needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative z-10 px-6 md:px-12 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                onClick={() =>
                  setExpandedService(
                    expandedService === service.id ? null : service.id
                  )
                }
              >
                {/* Card Background Gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                ></div>

                {/* Border Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                {/* Card Content */}
                <div className="relative backdrop-blur-sm bg-slate-900/50 border border-white/10 group-hover:border-white/30 rounded-2xl p-8 transition-all duration-300">
                  {/* Icon and Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {service.title}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="text-2xl transition-transform duration-300 group-hover:rotate-180">
                      ↓
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <span className="w-2 h-2 bg-linear-to-r from-blue-400 to-purple-400 rounded-full"></span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Expanded Section */}
                  {expandedService === service.id && (
                    <div className="border-t border-white/10 pt-6 mt-6 space-y-6 animate-in fade-in duration-300">
                      <div>
                        <h4 className="text-white font-bold mb-3">Details</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {service.details}
                        </p>
                      </div>

                      {/* File Upload Section */}
                      {service.hasUpload && (
                        <div className="space-y-4">
                          <h4 className="text-white font-bold">
                            Upload Design Files
                          </h4>
                          <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 hover:border-blue-500 transition-colors group/upload">
                            <label className="flex flex-col items-center justify-center gap-3 cursor-pointer">
                              <div className="text-3xl">📁</div>
                              <div className="text-center">
                                <p className="text-white font-semibold">
                                  {fileUpload[service.id]
                                    ? fileUpload[service.id].name
                                    : "Click to upload"}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                  Supported: FDM, SLA, STL, OBJ, STEP
                                </p>
                              </div>
                              <input
                                type="file"
                                hidden
                                accept=".fdm,.sla,.stl,.obj,.step"
                                onChange={(e) =>
                                  handleFileChange(service.id, e)
                                }
                              />
                            </label>
                          </div>
                          {fileUpload[service.id] && (
                            <button className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                              Submit Order
                            </button>
                          )}
                        </div>
                      )}

                      
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative z-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-purple-600/20 blur-2xl"></div>
            <div className="relative backdrop-blur-sm bg-blue border border-white/20 rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Contact our team to discuss your project requirements and get a
                free quote
              </p>
              <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                Get Your Free Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
