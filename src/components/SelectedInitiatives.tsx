import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Bot, BookOpen, Monitor } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const initiatives = [
  {
    icon: Bot,
    title: "AI Hiring Assistant",
    context: "48-hour Product Innovation Sprint",
    description:
      "Led a cross-functional team in designing an AI-powered hiring assistant focused on improving recruitment efficiency.",
    role: "Team Lead & Product Strategist",
    outcome: "A working prototype and pitch delivered within 48 hours.",
  },
  {
    icon: BookOpen,
    title: "Pod Encyclopedia",
    context: "Internal Knowledge Repository",
    description:
      "Built an internal knowledge repository that simplified onboarding and reduced dependency on individual team members.",
    role: "Creator & Maintainer",
    outcome: "Faster onboarding and fewer repeated questions across the team.",
  },
  {
    icon: Monitor,
    title: "Academic ERP Enablement",
    context: "Platform Adoption & Documentation",
    description:
      "Quickly mastered a newly implemented ERP platform and contributed to documentation, implementation and user adoption.",
    role: "Implementation Contributor",
    outcome: "Smoother rollout and clearer guidance for everyday users.",
  },
];

const SelectedInitiatives = () => {
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

      const cards = cardsRef.current?.querySelectorAll(".initiative-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="initiatives"
      className="relative px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="mb-16 text-center" style={{ opacity: 0 }}>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Selected Initiatives
          </span>
          <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Initiative & <span className="gradient-text">Curiosity</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Projects and contributions that reflect how I approach challenges beyond my
            day-to-day responsibilities.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-6 md:grid-cols-3"
        >
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="initiative-card glass group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2 hover:glow-blue"
                style={{ opacity: 0 }}
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary/15">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary/80">
                  {item.context}
                </p>
                <h3 className="mb-4 text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground/80">
                  {item.description}
                </p>

                <div className="mt-auto space-y-3 border-t border-border/50 pt-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Role
                    </p>
                    <p className="text-sm text-foreground/90">{item.role}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Outcome
                    </p>
                    <p className="text-sm text-foreground/90">{item.outcome}</p>
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

export default SelectedInitiatives;
