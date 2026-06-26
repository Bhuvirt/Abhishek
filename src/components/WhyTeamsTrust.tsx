import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, ListChecks, Handshake, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const qualities = [
  {
    title: "Reliable Under Pressure",
    desc: "Consistently deliver in high-volume and fast-paced environments.",
    icon: Clock,
  },
  {
    title: "Structured Thinker",
    desc: "Bring clarity and organization to complex workflows.",
    icon: ListChecks,
  },
  {
    title: "Stakeholder First",
    desc: "Build alignment through proactive communication and collaboration.",
    icon: Handshake,
  },
  {
    title: "Execution Driven",
    desc: "Focus on outcomes, accountability, and follow-through.",
    icon: Target,
  },
];

const WhyTeamsTrust = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".trust-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="trust" className="relative px-6 py-24 md:py-32">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <header className="mb-16 text-center md:mb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">Trust Signals</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Why Teams <span className="gradient-text">Trust Me</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Built through consistent execution, clear communication, and a commitment to shared outcomes.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {qualities.map((q) => {
            const Icon = q.icon;
            return (
              <div
                key={q.title}
                className="trust-card glass group flex items-start gap-5 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:glow-blue"
                style={{ opacity: 0 }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{q.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{q.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTeamsTrust;
