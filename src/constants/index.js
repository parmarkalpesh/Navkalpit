// Constants for the entire application
export const SITE_NAME = "Navkalpit 3D Printing";
export const SITE_DESCRIPTION = "Professional 3D Solutions Under One Roof";

export const NAV_LINKS = [
  { label: "Service", href: "/service" },
  { label: "Technology", href: "/technology" },
  { label: "Shop", href: "/shop" },
  { label: "Support", href: "/support" },
];

export const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Support", href: "/support" },
  ],
  services: [
    { label: "3D Printing", href: "/services/printing" },
    { label: "Prototyping", href: "/services/prototyping" },
    { label: "Consulting", href: "/services/consulting" },
    { label: "Custom Solutions", href: "/services/custom" },
  ],
};

export const PRODUCTS = [
  {
    id: 1,
    title: "ProSeries Rapid Prototype",
    subtitle: "Fast, high-precision prototypes in PLA, PETG and ABS.",
    img: "/product.png",
    alt: "ProSeries Rapid Prototype",
    cta1: "View Specs",
    cta2: "Request Quote",
  },
  {
    id: 2,
    title: "End-Use & Functional Parts",
    subtitle:
      "Durable, production-ready parts using advanced materials such as nylon and composites.",
    img: "/product1.png",
    alt: "End-Use Parts",
    cta1: "Material Options",
    cta2: "Order Sample",
  },
  {
    id: 3,
    title: "High-Detail Miniatures",
    subtitle:
      "Ultra-fine detail prints for models, collectibles and display pieces.",
    img: "/product.png",
    alt: "Miniatures",
    cta1: "See Gallery",
    cta2: "Order Now",
  },
];

export const FAQ_DATA = {
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
