import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Search, Users, Layers, Lightbulb, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    title: "Business Development",
    desc: "Foundation in client interaction, outreach, and relationship building.",
    icon: Briefcase,
  },
  {
    title: "Lead Generation",
    desc: "Developed expertise in research, prospecting, market intelligence, and opportunity creation.",
    icon: Search,
  },
  {
    title: "Client Engagement",
    desc: "Managed communication and coordination between institutions, clients, and internal teams.",
    icon: Users,
  },
  {
    title: "Operations Excellence",
    desc: "Executed large-scale recruitment operations and stakeholder management initiatives.",
    icon: Layers,
  },
  {
    title: "Product Innovation & Leadership",
    desc: "Led cross-functional collaboration during a product innovation sprint, transforming ideas into working concepts.",
    icon: Lightbulb,
  },
];

const CareerEvolution = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineDesktopRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".evolution-card");
      const nodes = sectionRef.current?.querySelectorAll(".evolution-node");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      if (lineDesktopRef.current) {
        tl.fromTo(
          lineDesktopRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power2.out" },
          0
        );
      }

      if (lineMobileRef.current) {
        tl.fromTo(
          lineMobileRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 1.1, ease: "power2.out" },
          0
        );
      }

      if (cards?.length) {
        tl.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" },
          0.2
        );
      }

      if (nodes?.length) {
        tl.fromTo(
          nodes,
          { scale: 0 },
          { scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(2)" },
          0.45
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="evolution" className="relative px-6 py-24 md:py-32">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-accent/5 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <header className="mb-16 text-center md:mb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Career Path</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Career <span className="gradient-text">Evolution</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            A journey built through communication, execution, stakeholder management, and operational excellence.
          </p>
        </header>

        {/* Desktop: horizontal timeline */}
        <div className="relative hidden md:block">
          <div
            ref={lineDesktopRef}
            className="absolute left-0 right-0 top-6 h-px origin-left bg-gradient-to-r from-primary via-accent to-primary"
            style={{ opacity: 1 }}
          />
          <div className="relative flex items-start justify-between gap-6">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.title}
                  className="evolution-card group relative flex-1 text-center"
                  style={{ opacity: 0 }}
                >
                  <div className="evolution-node mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full glass border border-primary/40 transition-all duration-300 glow-blue group-hover:scale-110">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:glow-blue">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary">
                      Stage {i + 1}
                    </span>
                    <h3 className="mb-2 text-base font-bold text-foreground">{stage.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="relative mx-auto max-w-2xl md:hidden">
          <div
            ref={lineMobileRef}
            className="absolute left-6 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-primary via-accent to-primary"
            style={{ opacity: 1 }}
          />
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div key={stage.title} className="evolution-card relative mb-10 last:mb-0" style={{ opacity: 0 }}>
                {i < stages.length - 1 && (
                  <ChevronDown className="absolute left-4 top-12 h-4 w-4 text-primary/60" />
                )}
                <div className="flex gap-5">
                  <div className="evolution-node relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full glass border border-primary/40 transition-all duration-300 glow-blue">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="glass flex-1 rounded-2xl p-5 transition-all duration-300 hover:glow-blue">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary">
                      Stage {i + 1}
                    </span>
                    <h3 className="mb-2 text-base font-bold text-foreground">{stage.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{stage.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerEvolution;
