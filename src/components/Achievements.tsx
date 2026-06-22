import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, UserCheck, Network, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: Users,
    title: "100+ Hiring Drives",
    description:
      "Executed large-scale campus recruitment campaigns across India while coordinating multiple stakeholders and operational workflows.",
  },
  {
    icon: UserCheck,
    title: "10,000+ Candidates Managed",
    description:
      "Oversaw candidate registrations, assessments, interviews, and hiring operations across multiple national hiring programs.",
  },
  {
    icon: Network,
    title: "700+ Stakeholders Coordinated",
    description:
      "Worked closely with Training & Placement Officers, HR leaders, hiring teams, and institutional partners to ensure smooth execution.",
  },
  {
    icon: Globe,
    title: "3,000+ Global Leads Generated",
    description:
      "Built and managed lead-generation campaigns across India, UAE, Europe, and US markets for cloud infrastructure and enterprise technology services.",
  },
];

const Achievements = () => {
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

      const cards = cardsRef.current?.querySelectorAll(".achievement-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
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
      id="achievements"
      className="relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="mb-16 text-center" style={{ opacity: 0 }}>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Selected Achievements
          </span>
          <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Selected <span className="gradient-text">Achievements</span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Key milestones that reflect my impact across client engagement, recruitment
            operations, stakeholder management, and business development.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-5 sm:grid-cols-2 lg:gap-6"
        >
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="achievement-card glass group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:glow-blue sm:p-8"
                style={{ opacity: 0 }}
              >
                {/* Subtle top edge glow */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary/15">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
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

export default Achievements;
