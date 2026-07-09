import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Target, RefreshCw } from "lucide-react";
import portrait from "@/assets/Abhishek_Professional_Photo.png.asset.json";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Layers,
    title: "Systems Thinking",
    text: "Finding structure inside complexity.",
  },
  {
    icon: Target,
    title: "Execution",
    text: "Turning plans into reliable outcomes.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvement",
    text: "Always looking for better ways to work.",
  },
];

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
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
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 78%" },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 88%" },
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
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[minmax(0,0.85fr)_1fr] md:gap-20">
        {/* Left — Portrait */}
        <div ref={imageRef} className="flex justify-center md:justify-start" style={{ opacity: 0 }}>
          <div className="group relative">
            {/* Soft outer glow */}
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-primary/25 to-accent/25 blur-3xl opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
            {/* Rotating gradient ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary/60 via-transparent to-accent/60 opacity-70 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative h-72 w-72 overflow-hidden rounded-full border border-white/10 shadow-[0_0_50px_hsla(var(--neon-blue)/0.2)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03] sm:h-80 sm:w-80 lg:h-96 lg:w-96">
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
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary/80">
            About
          </p>
          <h2 className="mb-8 text-4xl font-light tracking-tight text-foreground md:text-5xl">
            Nice to <span className="gradient-text font-semibold">meet you.</span>
          </h2>

          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>I'm Abhishek.</p>
            <p>
              Over the last few years I've worked across business development, client
              engagement and large-scale hiring operations.
            </p>
            <p>
              While every role has been different, one thing has remained constant—my
              curiosity for understanding how complex work becomes simple.
            </p>
            <p>
              Whether coordinating nationwide hiring programs, improving operational
              workflows or contributing to product innovation, I've always enjoyed finding
              better ways for people, processes and technology to work together.
            </p>
            <p>
              Today, I'm building a career around operations, client engagement and
              execution, where thoughtful communication and structured systems create
              meaningful outcomes.
            </p>
          </div>

          {/* Cards */}
          <div ref={cardsRef} className="mt-12 grid gap-4 sm:grid-cols-3">
            {cards.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="glass group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_0_25px_hsla(var(--neon-blue)/0.12)]"
                style={{ opacity: 0 }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-foreground">{title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;