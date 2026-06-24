import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Handshake, Workflow, KanbanSquare, Users, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const focusAreas = [
  {
    icon: Handshake,
    title: "Client Engagement",
    description: "Building strong stakeholder relationships and ensuring successful execution.",
  },
  {
    icon: Workflow,
    title: "Operations Management",
    description: "Creating structure, efficiency, and accountability across complex workflows.",
  },
  {
    icon: KanbanSquare,
    title: "Program Coordination",
    description: "Managing multiple moving parts while keeping teams aligned.",
  },
  {
    icon: Users,
    title: "Recruitment Operations",
    description: "Driving hiring initiatives and candidate engagement at scale.",
  },
  {
    icon: Rocket,
    title: "Implementation & Customer Success",
    description: "Helping organizations achieve outcomes through structured execution and collaboration.",
  },
];

const CurrentFocus = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".focus-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="focus" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="mb-16 text-center" style={{ opacity: 0 }}>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Current Focus
          </span>
          <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Current <span className="gradient-text">Focus</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            The roles and challenges I am actively interested in pursuing.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {focusAreas.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="focus-card glass group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:glow-blue sm:p-8"
                style={{ opacity: 0 }}
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary/15">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground/80">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CurrentFocus;
