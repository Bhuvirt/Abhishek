import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, ShieldCheck, MessageSquare, Zap, Compass, Layers } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { icon: Target, title: "Clarity", text: "Break down complexity into clear actionable steps." },
  { icon: ShieldCheck, title: "Accountability", text: "Own outcomes with commitment and consistency." },
  { icon: MessageSquare, title: "Communication", text: "Keep stakeholders informed, aligned, and engaged." },
  { icon: Zap, title: "Execution", text: "Drive structured action toward measurable results." },
];

const Philosophy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
      if (visualRef.current) {
        gsap.fromTo(visualRef.current,
          { opacity: 0, scale: 0.92, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: visualRef.current, start: "top 80%" }
          }
        );
        const orbitals = visualRef.current.querySelectorAll(".orbital-node");
        gsap.fromTo(orbitals,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: "back.out(1.7)",
            scrollTrigger: { trigger: visualRef.current, start: "top 75%" }
          }
        );
      }
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* Ambient background glows */}
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-primary">
          My Professional Philosophy
        </p>

        {/* Manifesto headline */}
        <div ref={headlineRef} className="mx-auto mb-16 max-w-4xl text-center" style={{ opacity: 0 }}>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
            How I Approach{" "}
            <span className="gradient-text">Complex Operations</span>
          </h2>
          <div className="mx-auto mb-8 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I believe successful operations are built on three things:{" "}
            <span className="font-semibold text-foreground">clarity, accountability, and communication.</span>
            {" "}Whether coordinating a nationwide hiring campaign, managing institutional stakeholders,
            or solving process bottlenecks, my focus remains the same — create structure where
            complexity exists and ensure every stakeholder stays aligned.
          </p>
        </div>

        {/* Abstract operations network visual */}
        <div
          ref={visualRef}
          className="glass mx-auto mb-20 flex max-w-3xl flex-col items-center justify-center rounded-3xl p-8 md:p-12"
          style={{ opacity: 0 }}
        >
          <div className="relative flex h-56 w-full items-center justify-center sm:h-72">
            {/* Central core */}
            <div className="orbital-node absolute z-20 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_40px_hsla(var(--neon-blue)/0.4)]">
              <Compass className="h-8 w-8 text-primary-foreground" />
            </div>

            {/* Orbital ring 1 */}
            <div className="absolute h-40 w-40 rounded-full border border-dashed border-border/60 sm:h-52 sm:w-52" />

            {/* Orbital nodes */}
            <div className="orbital-node absolute left-[20%] top-[15%] flex h-11 w-11 items-center justify-center rounded-full bg-card/80 border border-border shadow-lg shadow-primary/20">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div className="orbital-node absolute right-[20%] top-[15%] flex h-11 w-11 items-center justify-center rounded-full bg-card/80 border border-border shadow-lg shadow-accent/20">
              <ShieldCheck className="h-5 w-5 text-accent" />
            </div>
            <div className="orbital-node absolute bottom-[15%] left-[25%] flex h-11 w-11 items-center justify-center rounded-full bg-card/80 border border-border shadow-lg shadow-primary/20">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div className="orbital-node absolute bottom-[15%] right-[25%] flex h-11 w-11 items-center justify-center rounded-full bg-card/80 border border-border shadow-lg shadow-accent/20">
              <Zap className="h-5 w-5 text-accent" />
            </div>

            {/* Connection lines (SVG overlay) */}
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--neon-blue))" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(var(--neon-violet))" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <line x1="50%" y1="50%" x2="20%" y2="15%" stroke="url(#line-grad)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="80%" y2="15%" stroke="url(#line-grad)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="25%" y2="85%" stroke="url(#line-grad)" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="75%" y2="85%" stroke="url(#line-grad)" strokeWidth="1" />
            </svg>

            {/* Floating labels */}
            <div className="absolute left-2 top-2 hidden text-[10px] uppercase tracking-wider text-muted-foreground/70 sm:block">
              Stakeholders
            </div>
            <div className="absolute right-2 top-2 hidden text-[10px] uppercase tracking-wider text-muted-foreground/70 sm:block">
              Processes
            </div>
            <div className="absolute bottom-2 left-2 hidden text-[10px] uppercase tracking-wider text-muted-foreground/70 sm:block">
              Outcomes
            </div>
            <div className="absolute bottom-2 right-2 hidden text-[10px] uppercase tracking-wider text-muted-foreground/70 sm:block">
              Execution
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <Layers className="h-4 w-4 text-primary" />
            <span>Every moving part connected, every stakeholder aligned.</span>
          </div>
        </div>

        {/* Principle cards */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:glow-blue"
              style={{ opacity: 0 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
