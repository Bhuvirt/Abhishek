import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Download } from "lucide-react";
import resumeAsset from "@/assets/Abhishek_Choudhary_Resume.pdf.asset.json";

const heroMetrics = [
  { value: 120, suffix: "+", label: "Hiring Drives Executed" },
  { value: 700, suffix: "+", label: "Stakeholders Coordinated" },
  { value: 10000, suffix: "+", label: "Candidates Managed" },
  { value: 3000, suffix: "+", label: "Global Leads Generated" },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: target,
      duration: 2,
      delay: 1.2,
      ease: "power2.out",
      onUpdate: () => setVal(Math.round(obj.v)),
    });
    return () => { tween.kill(); };
  }, [target]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(headlineRef.current, 
      { opacity: 0, y: 60, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, "-=0.3"
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5"
    )
    .fromTo(ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power3.out" }, "-=0.2"
    )
    .fromTo(metricsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.1"
    );

    return () => { tl.kill(); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden py-28">
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

      {/* Subtle edge fade only — keeps the 3D vibrant and interactive */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Greeting badge */}
        <div
          ref={badgeRef}
          className="mx-auto mb-6 inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] text-primary glow-text-blue sm:text-sm"
          style={{ opacity: 0 }}
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          Hello, I'm Abhishek
        </div>

        <h1
          ref={headlineRef}
          className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ opacity: 0 }}
        >
          Bringing <span className="gradient-text">Structure</span> to Complexity.
        </h1>

        <p
          ref={descRef}
          className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
          style={{ opacity: 0 }}
        >
          Every role I've taken has taught me the same lesson—meaningful execution
          happens when people, processes, and technology move together. That idea
          has shaped the way I approach operations, client engagement, and solving
          complex organizational challenges.
        </p>

        <div ref={ctaRef} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => scrollTo("experience")}
            className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_0_40px_hsla(var(--neon-blue)/0.45)] sm:text-base"
            style={{ opacity: 0 }}
          >
            Explore My Journey
          </button>
          <a
            href={resumeAsset.url}
            download="Abhishek_Choudhary_Resume.pdf"
            className="group inline-flex items-center gap-2 glass rounded-full px-8 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-primary/50 hover:shadow-[0_0_35px_hsla(var(--neon-blue)/0.35),0_0_65px_hsla(var(--neon-violet)/0.2)] sm:text-base"
            style={{ opacity: 0 }}
          >
            <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Download Resume
          </a>
          <button
            onClick={() => scrollTo("contact")}
            className="glass rounded-full px-8 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-accent/50 hover:shadow-[0_0_35px_hsla(var(--neon-violet)/0.35)] sm:text-base"
            style={{ opacity: 0 }}
          >
            Let's Connect
          </button>
        </div>

        {/* Impact in Numbers — evidence supporting the story above */}
        <div ref={metricsRef} className="mt-16" style={{ opacity: 0 }}>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/80">
            Impact in Numbers
          </p>
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {heroMetrics.map((m, i) => (
              <div
                key={i}
                className="glass rounded-2xl px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_hsla(var(--neon-blue)/0.2)]"
              >
                <p className="text-2xl font-extrabold tracking-tight text-foreground glow-text-blue sm:text-3xl">
                  <CountUp target={m.value} suffix={m.suffix} />
                </p>
                <p className="mt-2 text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-float">
        <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-primary animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
