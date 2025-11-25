import React, { useState } from "react";

export default function Cart() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState("General");
  const [openItems, setOpenItems] = useState({});
  const [query, setQuery] = useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleItem = (itemId) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const faqData = {
    General: [
      {
        id: "general-1",
        question: "What is an FAQ section?",
        answer:
          "An FAQ section is a compilation of frequently asked questions and their answers. It helps customers find quick solutions to common queries without having to contact support.",
      },
      {
        id: "general-2",
        question: "Why do FAQs matter?",
        answer:
          "FAQs improve customer satisfaction by providing instant answers, reduce support ticket volume, and enhance user experience by anticipating common questions.",
      },
      {
        id: "general-3",
        question: "Where can I add my FAQs?",
        answer:
          "You can add FAQs on your website, mobile app, knowledge base, or help center. Ensure they are easily accessible and well-organized by category.",
      },
    ],
    "Setting up FAQs": [
      {
        id: "setup-1",
        question: "How do I set up an FAQ section?",
        answer:
          "Start by identifying common customer questions, organize them by category, write clear and concise answers, and display them in an easy-to-navigate format on your platform.",
      },
      {
        id: "setup-2",
        question: "What structure works best for FAQs?",
        answer:
          "Use a clear hierarchy with categories, subcategories, and expandable Q&A items. Include a search function for better usability and update regularly based on customer feedback.",
      },
      {
        id: "setup-3",
        question: "Should FAQs be searchable?",
        answer:
          "Yes, adding a search feature significantly improves user experience by allowing customers to quickly find relevant answers without scrolling through all questions.",
      },
    ],
  };

  const parallaxOffset = scrollPosition * 0.5;

  return (
    <section className="relative w-full min-h-screen bg-linear-to-b from-slate-900 via-slate-900 to-black overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/printer.avif')",
          backgroundSize: "cover",
          backgroundPosition: `calc(50% - ${parallaxOffset}px) center`,
          backgroundAttachment: "fixed",
        //   opacity: 0.1,
        //   backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-slate-900/20" />

      {/* Content */}
      <div className="relative z-10 px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20 relative">
            {/* Left side - FAQ text, tabs and items */}
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 mb-8">
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-tight">
                    FAQ
                  </h1>
                  <p className="text-base md:text-lg text-slate-300">
                    Frequently asked questions
                  </p>
                </div>
              </div>

              {/* Tab navigation */}
              <div className="flex gap-6 mb-8 border-b border-slate-700">
                {Object.keys(faqData).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setOpenItems({});
                      setQuery("");
                    }}
                    className={`pb-3 text-sm md:text-base font-medium transition-colors relative ${
                      activeTab === tab
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                    )}
                  </button>
                ))}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4 max-w-3xl">
                {faqData[activeTab]
                  .filter((item) => {
                    if (!query) return true;
                    const q = query.toLowerCase();
                    return (
                      item.question.toLowerCase().includes(q) ||
                      item.answer.toLowerCase().includes(q)
                    );
                  })
                  .map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-700 rounded-md overflow-hidden bg-transparent hover:bg-slate-800/30 transition-colors"
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-slate-700/10 transition-colors"
                        aria-expanded={!!openItems[item.id]}
                        aria-controls={`${item.id}-panel`}
                      >
                        <h3 className="text-base md:text-lg font-semibold text-white pr-4">
                          {item.question}
                        </h3>
                        <svg
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                            openItems[item.id] ? "rotate-180" : ""
                          }`}
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
                      </button>

                      <div
                        id={`${item.id}-panel`}
                        className={`px-6 text-slate-300 text-sm md:text-base leading-relaxed border-t border-slate-700 overflow-hidden transition-[max-height,padding] duration-300 ease-in-out ${
                          openItems[item.id]
                            ? "max-h-96 pb-5 pt-4"
                            : "max-h-0 pb-0 pt-0"
                        }`}
                        aria-hidden={!openItems[item.id]}
                      >
                        {item.answer}
                      </div>
                    </div>
                  ))}

                {/* Empty state */}
                {faqData[activeTab].filter((item) => {
                  if (!query) return true;
                  const q = query.toLowerCase();
                  return (
                    item.question.toLowerCase().includes(q) ||
                    item.answer.toLowerCase().includes(q)
                  );
                }).length === 0 && (
                  <div className="text-slate-400 py-8">No results found.</div>
                )}
              </div>
            </div>

            {/* Right side - 3D Printer Image */}
            <div className="hidden lg:block relative">
              <div className="absolute right-0 top-0 bottom-0 w-[55vw] pointer-events-none">
                <div className="relative h-full">
                  <div className="absolute inset-0 rounded-full blur-3xl bg-linear-to-br from-blue-500/10 via-purple-500/6 to-transparent" />
                  <div className="absolute right-0 top-8 bottom-8 flex items-center justify-end pr-12">
                    <img
                      src="/product.avif"
                      alt="3D Printer"
                      className="h-[80%] object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
