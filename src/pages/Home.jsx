import React from "react";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import FAQSection from "../components/sections/FAQSection";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FAQSection />
    </>
  );
}

export default Home;
