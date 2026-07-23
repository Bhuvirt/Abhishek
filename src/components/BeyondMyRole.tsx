import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { getLenis } from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

type DrawerSection = { heading: string; body?: string; items?: string[] };

type Initiative = {
  category: string;
  title: string;
  summary: string;
  accent: "blue" | "violet";
  drawer: DrawerSection[];
};

const initiatives: Initiative[] = [
  {
    category: "Innovation",
    title: "AI Candidate Engagement Platform",
    summary:
      "Led a product innovation initiative to reimagine the post-assessment candidate experience using AI-powered insights and personalized learning recommendations.",
    accent: "blue",
    drawer: [
      {
        heading: "Overview",
        body: "Led a five-member cross-functional team during a 48-hour internal hackathon to conceptualize, prototype and pitch an AI-powered candidate engagement platform.",
      },
      {
        heading: "Responsibilities",
        items: [
          "Led product strategy and team coordination.",
          "Defined the product vision and roadmap.",
          "Built a working proof of concept using AI-assisted development tools.",
          "Presented the solution to senior leadership.",
        ],
      },
      {
        heading: "Solution Highlights",
        items: [
          "Personalized interview insights.",
          "Skill-gap analysis.",
          "AI learning recommendations.",
          "Employability analytics dashboards.",
          "Recruiter and university insights.",
        ],
      },
      {
        heading: "Outcome",
        body: "Recognized for combining product thinking, execution and practical business value within an accelerated innovation timeline.",
      },
    ],
  },
  {
    category: "Knowledge Management",
    title: "Pod Encyclopedia",
    summary:
      "Identified a critical onboarding gap and independently built an internal operational knowledge repository to standardize learning across teams.",
    accent: "violet",
    drawer: [
      {
        heading: "Overview",
        body: "Recognized that onboarding depended heavily on peer support and undocumented knowledge.",
      },
      {
        heading: "Ownership",
        body: "Designed and authored an 80+ page operational knowledge repository covering eight product lines.",
      },
      {
        heading: "Impact",
        items: [
          "Reduced dependency on peer-led training.",
          "Standardized operational knowledge.",
          "Improved onboarding consistency.",
          "Accelerated learning for new team members.",
        ],
      },
      {
        heading: "Key Learning",
        body: "Sometimes the highest-impact improvements are internal systems that quietly help everyone perform better.",
      },
    ],
  },
  {
    category: "Product Enablement",
    title: "Academic ERP Enablement",
    summary:
      "Rapidly mastered a newly developed Academic ERP platform and transformed technical workflows into customer-ready product guidance.",
    accent: "blue",
    drawer: [
      {
        heading: "Overview",
        body: "Selected as the only Senior Executive in a four-member enablement team to learn an entirely new product within four days.",
      },
      {
        heading: "Responsibilities",
        items: [
          "Learned complete platform workflows.",
          "Authored a 23-page implementation guide.",
          "Conducted product demonstrations.",
          "Supported partner discussions.",
          "Connected technical functionality with customer use cases.",
        ],
      },
      {
        heading: "Outcome",
        body: "Enabled smoother product adoption by simplifying technical complexity for both internal teams and university stakeholders.",
      },
    ],
  },
];

const GeometricMark = ({ accent }: { accent: "blue" | "violet" }) => {
  const stroke = accent === "blue" ? "stroke-primary/70" : "stroke-accent/70";
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-10 opacity-70"
    >
      <rect x="4" y="4" width="48" height="48" className={stroke} strokeWidth="0.5" opacity="0.25" />
      <circle cx="28" cy="28" r="20" className={stroke} strokeWidth="0.5" opacity="0.4" />
      <line x1="28" y1="4" x2="28" y2="52" className={stroke} strokeWidth="0.5" opacity="0.2" />
      <circle cx="28" cy="28" r="4" className={`${stroke} fill-none`} strokeWidth="0.75" />
    </svg>
  );
};

const BeyondMyRole = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<Initiative | null>(null);

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
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (active) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      if (drawerRef.current && overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: "power2.out" }
        );
        gsap.fromTo(
          drawerRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.55, ease: "power3.out" }
        );
      }
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [active]);

  const closeDrawer = () => {
    if (!drawerRef.current || !overlayRef.current) {
      setActive(null);
      return;
    }
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(drawerRef.current, {
      xPercent: 100,
      duration: 0.45,
      ease: "power3.in",
      onComplete: () => setActive(null),
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active) closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id="initiatives"
      className="relative overflow-hidden px-6 py-28 md:py-40"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[24rem] w-[24rem] rounded-full bg-primary/4 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[22rem] w-[22rem] rounded-full bg-accent/4 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl">
        <div ref={headerRef} className="mb-20 text-center" style={{ opacity: 0 }}>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary/80">
            Beyond My Role
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Initiatives that began{" "}
            <span className="gradient-text font-medium">outside a job description</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            The most meaningful contributions often begin outside a job description. These
            initiatives reflect moments where I took ownership, explored new ideas and built
            solutions that created lasting value.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {initiatives.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(item)}
              className="glass group relative flex flex-col rounded-2xl p-10 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-primary/[0.04] hover:shadow-[0_0_60px_hsla(var(--neon-blue)/0.1)] md:p-11"
              style={{ opacity: 0 }}
            >
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                  item.accent === "violet" ? "via-accent/50" : ""
                }`}
              />

              <GeometricMark accent={item.accent} />

              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/80">
                {item.category}
              </p>
              <h3 className="mb-5 text-xl font-medium tracking-tight text-foreground md:text-2xl">
                {item.title}
              </h3>
              <p className="mb-10 text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.summary}
              </p>

              <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors group-hover:text-primary">
                View Details
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Drawer */}
      {active && (
        <div className="fixed inset-0 z-50">
          <div
            ref={overlayRef}
            onClick={closeDrawer}
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            style={{ opacity: 0 }}
          />
          <aside
            ref={drawerRef}
            className="glass absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-border/40 shadow-2xl md:max-w-2xl"
            style={{ transform: "translateX(100%)" }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div className="flex items-start justify-between border-b border-border/40 px-8 py-6 md:px-12 md:py-8">
              <div className="pr-8">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/80">
                  {active.category}
                </p>
                <h3 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  {active.title}
                </h3>
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Close"
                className="rounded-full border border-border/50 p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8 md:px-12 md:py-10">
              <div className="space-y-10">
                {active.drawer.map((sec) => (
                  <div key={sec.heading}>
                    <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-primary/80">
                      {sec.heading}
                    </p>
                    {sec.body && (
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {sec.body}
                      </p>
                    )}
                    {sec.items && (
                      <ul className="space-y-3">
                        {sec.items.map((it) => (
                          <li
                            key={it}
                            className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
                          >
                            <span className="mt-2 inline-block h-px w-4 flex-shrink-0 bg-primary/50" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default BeyondMyRole;