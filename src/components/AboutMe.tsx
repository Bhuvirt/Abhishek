import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "@/assets/Abhishek_Professional_Photo.png.asset.json";

gsap.registerPlugin(ScrollTrigger);

const focusAreas = [
  "Operations",
  "Stakeholder Management",
  "Business Development",
  "Product Thinking",
];

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
          }
        );
      }

      if (chipsRef.current) {
        gsap.fromTo(
          chipsRef.current.children,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: chipsRef.current, start: "top 90%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 py-28 md:py-40"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[minmax(0,0.9fr)_1fr] md:gap-24">
        {/* Left — Portrait */}
        <div ref={imageRef} className="flex justify-center md:justify-start" style={{ opacity: 0 }}>
          <div className="group relative">
            {/* Soft outer glow */}
            <div className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
            {/* Rotating gradient ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary/60 via-transparent to-accent/60 opacity-70 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative h-80 w-80 overflow-hidden rounded-full border border-white/10 shadow-[0_0_60px_hsla(var(--neon-blue)/0.18)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03] sm:h-96 sm:w-96 lg:h-[26rem] lg:w-[26rem]">
              <img
                src={portrait.url}
                alt="Portrait of Abhishek Choudhary"
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
              {/* Inner tint to blend with theme */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Right — Narrative */}
        <div ref={contentRef} className="max-w-xl">
          <p className="eyebrow mb-5">About</p>
          <h2 className="mb-10 text-4xl font-light tracking-tight text-foreground md:text-5xl">
            Nice to <span className="gradient-text font-medium">meet you.</span>
          </h2>

          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>I'm someone who enjoys understanding how things work.</p>
            <p>
              I gravitate toward environments where people, technology and business
              come together to solve meaningful problems.
            </p>
            <p>
              Whether coordinating operations, supporting enterprise software or
              improving internal workflows, I find satisfaction in bringing clarity
              to complexity.
            </p>
            <p>
              Better questions, better systems, better relationships — that's the
              mindset I bring into every opportunity.
            </p>
          </div>

          {/* Divider */}
          <div className="my-10 h-px w-16 bg-gradient-to-r from-primary/40 to-accent/20" />

          {/* Focus chips */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Currently focused on
            </p>
            <div ref={chipsRef} className="flex flex-wrap gap-3">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="glass rounded-full px-4 py-2 text-sm font-medium text-foreground/90 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                  style={{ opacity: 0 }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
