import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ImpactSnapshot from "@/components/ImpactSnapshot";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import HowICreateValue from "@/components/HowICreateValue";
import ByTheNumbers from "@/components/ByTheNumbers";
import SelectedInitiatives from "@/components/SelectedInitiatives";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll();

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <Navbar />
        <Hero />
        <SectionReveal><ImpactSnapshot /></SectionReveal>
        <SectionReveal><AboutMe /></SectionReveal>
        <SectionReveal><Experience /></SectionReveal>
        <ByTheNumbers />
        <SectionReveal><SelectedInitiatives /></SectionReveal>
        <SectionReveal><Skills /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
        <Footer />
      </div>
    </>
  );
};

export default Index;
