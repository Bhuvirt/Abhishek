import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MetricsStrip from "@/components/MetricsStrip";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import WorkApproach from "@/components/WorkApproach";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <WorkApproach />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
