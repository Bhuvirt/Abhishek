import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ValueCard = {
  title: string;
  description: string;
  accent: "blue" | "violet";
};

const valueCards: ValueCard[] = [
  {
    title: "Creating Operational Clarity",
    description:
      "I enjoy bringing structure to complex workflows, aligning people, processes and technology so execution becomes predictable, scalable and easier to manage.",
    accent: "blue",
  },
  {
    title: "Building Trusted Relationships",
    description:
      "Whether working with enterprise clients, university partners or internal teams, I focus on building trust through clear communication, reliability and collaboration.",
    accent: "violet",
  },
  {
    title: "Improving Systems",
    description:
      "I naturally look for inefficiencies, simplify existing processes and create practical solutions that improve knowledge sharing, execution and day-to-day operations.",
    accent: "violet",
  },
  {
    title: "Driving Business Outcomes",
    description:
      "Beyond completing assigned work, I enjoy understanding the bigger picture, identifying opportunities and contributing to outcomes that create long-term value.",
    accent: "blue",
  },
];

const GeometricAccent = ({ accent }: { accent: "blue" | "violet" }) => {
  const colorClass = accent === "blue" ? "stroke-primary/70" : "stroke-accent/70";

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-8 opacity-80"
    >
      <circle cx="24" cy="24" r="22" className={`${colorClass}`} strokeWidth="0.5" opacity="0.3" />
      <circle cx="24" cy="24" r="14" className={`${colorClass}`} strokeWidth="0.5" opacity="0.5" />
      <line x1="24" y1="2" x2="24" y2="46" className={`${colorClass}`} strokeWidth="0.5" opacity="0.3" />
      <line x1="2" y1="24" x2="46" y2="24" className={`${colorClass}`} strokeWidth="0.5" opacity="0.3" />
      <circle cx="24" cy="24" r="3" className={`${colorClass} fill-none`} strokeWidth="0.75" />
    </svg>
  );
};

const HowICreateValue = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="value"
      className="relative overflow-hidden px-6 py-28 md:py-40"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[24rem] w-[24rem] rounded-full bg-primary/4 blur-[140px]" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 h-[20rem] w-[20rem] rounded-full bg-accent/4 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center" style={{ opacity: 0 }}>
          <p className="eyebrow mb-4">How I Create Value</p>
          <h2 className="section-title mx-auto max-w-3xl">
            The mindset behind <span className="gradient-text font-medium">my work</span>
          </h2>
          <p className="section-lede mt-5">
            Across every role, I've found myself solving a similar set of challenges —
            these are the areas where I naturally create the most value.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid gap-8 md:grid-cols-2 lg:gap-10"
        >
          {valueCards.map((card) => (
            <div
              key={card.title}
              className="glass group relative flex flex-col rounded-2xl p-10 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:bg-primary/[0.03] hover:shadow-[0_0_60px_hsla(var(--neon-blue)/0.08)] md:p-12"
              style={{ opacity: 0 }}
            >
              {/* Soft top edge gradient */}
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                  card.accent === "violet" ? "via-accent/40" : ""
                }`}
              />

              <GeometricAccent accent={card.accent} />

              <h3 className="mb-5 text-xl font-medium tracking-tight text-foreground md:text-2xl">
                {card.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowICreateValue;
