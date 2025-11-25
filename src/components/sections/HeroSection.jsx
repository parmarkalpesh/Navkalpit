import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const sampleProducts = [
    {
      id: 1,
      title: "ProSeries Rapid Prototype",
      subtitle: "Fast, high-precision prototypes in PLA, PETG and ABS.",
      img: "/product.png",
      alt: "ProSeries Rapid Prototype",
      //   cta1: "View Specs",
      //   cta2: "Request Quote",
    },
    {
      id: 2,
      title: "End-Use & Functional Parts",
      subtitle:
        "Durable, production-ready parts using advanced materials such as nylon and composites.",
      img: "/product1.png",
      alt: "End-Use Parts",
      //   cta1: "Material Options",
      //   cta2: "Order Sample",
    },
    {
      id: 3,
      title: "High-Detail Miniatures",
      subtitle:
        "Ultra-fine detail prints for models, collectibles and display pieces.",
      img: "/product.png",
      alt: "Miniatures",
      //   cta1: "See Gallery",
      //   cta2: "Order Now",
    },
  ];

  const [products, setProducts] = useState(sampleProducts);

  return (
    <>
      {/* Premium Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden pt-24 md:pt-32 pb-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-900 to-black">
          <div className="absolute top-0 right-0 w-full h-full opacity-30">
            <div className="absolute top-10 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div
              className="absolute top-40 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-20 right-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh] lg:min-h-[60vh]">
            {/* Left content */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-500/20 border border-blue-400/40 text-blue-200 rounded-full text-sm font-semibold backdrop-blur-sm">
                  🚀 Next-Generation 3D Printing
                </span>
              </div>

              {/* Main heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                  Transform Your{" "}
                  <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Ideas into
                  </span>
                  <br />
                  <span className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Reality
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl">
                Experience cutting-edge 3D printing technology with precision,
                innovation, and unlimited possibilities. Perfect for
                prototyping, manufacturing, and creative projects.
              </p>


            </div>

            {/* Right image/visual */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>

                {/* Image container */}
                <div className="relative bg-linear-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 h-96 md:h-[500px] flex items-center justify-center group">
                  <img
                    src="/bg.avif"
                    alt="3D Printer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay shine effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Products showcase section - Full Width */}
      <section className="relative w-full bg-linear-to-b from-slate-900 via-slate-900 to-black py-16 md:py-24">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="px-6 md:px-8 mb-12 md:mb-16">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Featured Products
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Discover our premium 3D printing solutions tailored for your
                needs
              </p>
            </div>
          </div>

          {/* Products Grid - Full Width */}
          <div className="w-full">
            {products.map((p, index) => (
              <div
                key={p.id}
                className={`group relative w-full border-b border-slate-700/50 last:border-b-0 transition-all duration-300 hover:bg-slate-800/30`}
              >
                <div className="px-6 md:px-8 py-12 md:py-16">
                  <div className="max-w-7xl mx-auto">
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center`}
                    >
                      {/* Text Section */}
                      <div
                        className={`space-y-6 ${
                          index % 2 === 1 ? "md:order-2" : "md:order-1"
                        }`}
                      >
                        <div>
                          <h3 className="text-3xl md:text-4xl font-bold text-white">
                            {p.title}
                          </h3>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed">
                          {p.subtitle}
                        </p>
                      </div>

                      {/* Image Section */}
                      <div
                        className={`${
                          index % 2 === 1 ? "md:order-1" : "md:order-2"
                        }`}
                      >
                        <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-linear-to-br from-slate-700 to-slate-900 flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-300">
                          <img
                            src={p.img}
                            alt={p.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-transparent to-black/20"></div>
      </section>
    </>
  );
}
