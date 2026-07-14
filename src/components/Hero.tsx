import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, ArrowDown } from "lucide-react";
import resumeAsset from "@/assets/Abhishek_Choudhary_Resume.pdf.asset.json";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
    .fromTo(headlineRef.current, 
      { opacity: 0, y: 50, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out" }, "-=0.35"
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5"
    )
    .fromTo(ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "-=0.4"
    );

    return () => { tl.kill(); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden py-32">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/orb-at713YDMl5dwa0bQYQMpJWfX/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="scale-110"
          title="3D Orb Background"
          style={{ filter: "saturate(1.4) contrast(1.15) brightness(1.1)" }}
        />
      </div>

      {/* Subtle edge fade — keeps the 3D vibrant and interactive */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="mx-auto mb-8 inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/90 sm:text-xs"
          style={{ opacity: 0 }}
        >
          <span className="hidden h-px w-8 bg-gradient-to-r from-transparent via-primary/60 to-transparent sm:block" />
          People <span className="text-primary">•</span> Processes <span className="text-primary">•</span> Technology <span className="text-primary">•</span> Business
          <span className="hidden h-px w-8 bg-gradient-to-r from-transparent via-primary/60 to-transparent sm:block" />
        </div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="mx-auto mb-10 max-w-4xl text-[2.5rem] font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ opacity: 0 }}
        >
          Coordinating
          <br className="hidden sm:block" />
          <span className="gradient-text">People</span>, <span className="gradient-text">Processes</span> &
          <br className="hidden sm:block" />
          <span className="gradient-text">Execution</span> at Scale
        </h1>

        {/* Subheadline */}
        <p
          ref={descRef}
          className="mx-auto mb-12 max-w-2xl text-sm leading-relaxed text-muted-foreground/90 sm:text-base md:text-lg"
          style={{ opacity: 0 }}
        >
          I've spent the last few years working across HR technology, enterprise SaaS, cloud infrastructure and business development — helping organizations turn complex, moving parts into structured, reliable execution.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => scrollTo("experience")}
            className="group inline-flex items-center gap-2 glass rounded-full px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-primary/50 hover:shadow-[0_0_40px_hsla(var(--neon-blue)/0.3),0_0_80px_hsla(var(--neon-violet)/0.15)] sm:text-base"
            style={{ opacity: 0, background: "linear-gradient(135deg, hsla(var(--primary)/0.18), hsla(var(--accent)/0.12))" }}
          >
            View Journey
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
          <a
            href={resumeAsset.url}
            download="Abhishek_Choudhary_Resume.pdf"
            className="group inline-flex items-center gap-2 glass rounded-full border border-white/10 px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-primary/40 hover:shadow-[0_0_30px_hsla(var(--neon-blue)/0.2),0_0_60px_hsla(var(--neon-violet)/0.12)] sm:text-base"
            style={{ opacity: 0 }}
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Download Resume
          </a>
        </div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-float">
        <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/20 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-primary/80 animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
