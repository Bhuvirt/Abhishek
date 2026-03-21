import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(headlineRef.current, 
      { opacity: 0, y: 60, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5"
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3"
    )
    .fromTo(ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power3.out" }, "-=0.2"
    );

    return () => { tl.kill(); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/orb-at713YDMl5dwa0bQYQMpJWfX/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="pointer-events-none"
          title="3D Orb Background"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/40 to-background" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1
          ref={headlineRef}
          className="mb-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ opacity: 0 }}
        >
          Hi, I'm <span className="gradient-text">Abhishek</span>
        </h1>
        <p
          ref={subtitleRef}
          className="mb-4 text-lg font-medium tracking-wide text-primary sm:text-xl md:text-2xl glow-text-blue"
          style={{ opacity: 0 }}
        >
          Client Engagement & Operations Specialist
        </p>
        <p
          ref={descRef}
          className="mx-auto mb-10 max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg"
          style={{ opacity: 0 }}
        >
          Bridging stakeholders, processes, and execution to deliver seamless outcomes at scale.
        </p>
        <div ref={ctaRef} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => scrollTo("experience")}
            className="glass rounded-full px-8 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:glow-blue hover:border-primary/50 sm:text-base"
            style={{ opacity: 0 }}
          >
            View Experience
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsla(var(--neon-blue)/0.4)] sm:text-base"
            style={{ opacity: 0 }}
          >
            Contact Me
          </button>
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
