import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, X } from "lucide-react";
import { getLenis } from "@/hooks/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger);

type Experience = {
  company: string;
  role: string;
  domain: string;
  period: string;
  current: boolean;
  summary: string;
  overview: string;
  contributions: string[];
  impact: string;
  learning: string;
};

const experiences: Experience[] = [
  {
    company: "Zinple Info Solutions",
    role: "IT – Business Developer",
    domain: "Enterprise SaaS · ERP · Automation",
    period: "Jul 2023 – Apr 2024",
    current: false,
    summary:
      "Where I learned to understand business problems before recommending technology solutions.",
    overview:
      "Worked across Enterprise SaaS, ERP and automation products including SAP Business One, Odoo and RPA.",
    contributions: [
      "Generated 3,000+ qualified business opportunities across India, UAE and Saudi Arabia.",
      "Supported website and LinkedIn content for international markets.",
      "Contributed to customization of 4R Recycle ERP based on client requirements.",
      "Worked directly with company leadership during client meetings and strategic discussions.",
    ],
    impact:
      "Built early fluency in enterprise technology conversations and cross-border client engagement.",
    learning:
      "This experience taught me how businesses evaluate technology and how effective communication builds trust.",
  },
  {
    company: "ServerGuy | Breeze.io",
    role: "Business Development Executive",
    domain: "Cloud Infrastructure · Global Demand",
    period: "Apr 2024 – Feb 2025",
    current: false,
    summary:
      "Developed a stronger understanding of global markets, customer research and enterprise outreach.",
    overview:
      "Focused on cloud infrastructure, managed hosting and strategic demand generation.",
    contributions: [
      "Identified and researched 4,500+ target B2B accounts across North America, Europe, UAE and India.",
      "Built 5+ strategic Magento agency partnerships.",
      "Increased Sales Qualified Leads by 30% through multi-channel outreach.",
      "Improved campaign performance using market research and A/B testing.",
      "Reduced customer response time by 40% through workflow improvements.",
    ],
    impact:
      "Turned scattered outreach into measurable, repeatable pipelines across four regions.",
    learning:
      "This role strengthened my understanding of business development, customer engagement and international market strategy.",
  },
  {
    company: "POD.ai",
    role: "Senior Client Engagement Executive",
    domain: "HR Technology · Program Coordination",
    period: "Feb 2025 – Present",
    current: true,
    summary:
      "Transitioned into managing large-scale recruitment operations, enterprise stakeholders and nationwide hiring execution.",
    overview:
      "Responsible for coordinating large hiring initiatives across universities, enterprise clients and internal teams.",
    contributions: [
      "Delivered 100+ recruitment drives.",
      "Coordinated hiring across 1,200+ colleges and universities.",
      "Managed recruitment workflows for 50,000+ candidates using the Pod.ai ATS.",
      "Managed relationships with 700+ Training & Placement Officers.",
      "Coordinated multiple concurrent national hiring programs.",
      "Generated additional business opportunities through consultative cross-selling.",
      "Led on-campus recruitment operations across North India supporting 3,000+ candidates.",
      "Built the 80+ page Pod Encyclopedia knowledge repository reducing onboarding dependency.",
    ],
    impact:
      "Turned high-pressure hiring seasons into structured, repeatable programs leadership could rely on.",
    learning:
      "This role transformed my understanding of stakeholder management, operational excellence, program coordination and scalable execution.",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".timeline-item");
      items?.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );
      });

      const nodes = sectionRef.current?.querySelectorAll(".timeline-node");
      nodes?.forEach((node) => {
        gsap.fromTo(node,
          { scale: 0 },
          {
            scale: 1, duration: 0.5, ease: "back.out(2)",
            scrollTrigger: { trigger: node, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate panel open
  useEffect(() => {
    if (selected === null) return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const tl = gsap.timeline();
    if (overlayRef.current) {
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0);
    }
    if (panelRef.current) {
      tl.fromTo(panelRef.current,
        isMobile
          ? { opacity: 0, y: 60, scale: 0.96, filter: "blur(8px)" }
          : { opacity: 0, x: 80, filter: "blur(8px)" },
        { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
        0.05
      );
    }
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [selected]);

  const closePanel = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const tl = gsap.timeline({ onComplete: () => setSelected(null) });
    if (panelRef.current) {
      tl.to(panelRef.current,
        isMobile
          ? { opacity: 0, y: 60, scale: 0.96, filter: "blur(8px)", duration: 0.35, ease: "power2.in" }
          : { opacity: 0, x: 80, filter: "blur(8px)", duration: 0.35, ease: "power2.in" },
        0
      );
    }
    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
    }
  };

  const exp = selected !== null ? experiences[selected] : null;

  return (
    <section ref={sectionRef} id="experience" className="relative overflow-hidden px-6 py-28 md:py-40">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-20 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary/80">
            Chapters
          </p>
          <h2 className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl">
            The <span className="gradient-text font-semibold">Journey</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every role expanded my perspective. Together, they shaped the way I approach people, systems and execution.
          </p>
        </div>

        {/* Timeline — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-0 md:top-6 md:h-px md:w-full md:bg-gradient-to-r" />

          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {experiences.map((item, i) => (
              <div
                key={item.company}
                className="timeline-item relative pl-14 md:pl-0 md:pt-16"
                style={{ opacity: 0 }}
              >
                {/* Node */}
                <div className="absolute left-4 top-5 z-10 -translate-x-1/2 md:left-6 md:top-6 md:-translate-y-1/2">
                  <div
                    className={`timeline-node flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                      item.current
                        ? "border-primary bg-primary/20"
                        : "border-accent bg-accent/20"
                    }`}
                  >
                    <div
                      className={`h-3 w-3 rounded-full ${
                        item.current ? "bg-primary animate-pulse-glow" : "bg-accent"
                      }`}
                    />
                  </div>
                </div>

                {/* Card */}
                <div className="glass flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_0_25px_hsla(var(--neon-blue)/0.12)]">
                  <span className="mb-3 inline-block text-xs font-medium text-primary">
                    {item.period}
                  </span>
                  <span className="mb-3 inline-block self-start rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-wider text-muted-foreground">
                    {item.domain}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{item.company}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.role}</p>
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground/90">
                    {item.summary}
                  </p>

                  <button
                    onClick={() => setSelected(i)}
                    className="group mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-gradient-to-r from-primary/15 to-accent/10 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_25px_hsla(var(--neon-blue)/0.2)]"
                  >
                    Explore Experience
                    <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {exp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            ref={overlayRef}
            onClick={closePanel}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
            style={{ opacity: 0 }}
          />
          <div
            ref={panelRef}
            className="glass relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-8 sm:p-10"
            style={{ opacity: 0 }}
          >
            <button
              onClick={closePanel}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="mb-1 inline-block text-xs font-medium text-primary">{exp.period}</span>
            <h3 className="text-2xl font-semibold text-foreground">{exp.company}</h3>
            <p className="text-sm text-muted-foreground">{exp.role}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground/70">{exp.domain}</p>

            <div className="mt-8 space-y-8">
              <ModalSection title="Overview">
                <p className="text-sm leading-relaxed text-muted-foreground">{exp.overview}</p>
              </ModalSection>

              <Divider />

              <ModalSection title="Key Contributions">
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {exp.contributions.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </ModalSection>

              <Divider />

              <ModalSection title="Impact">
                <p className="text-sm italic leading-relaxed text-foreground/90">"{exp.impact}"</p>
              </ModalSection>

              <Divider />

              <ModalSection title="Key Learning">
                <p className="text-sm leading-relaxed text-muted-foreground">{exp.learning}</p>
              </ModalSection>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ModalSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">{title}</h4>
    {children}
  </div>
);

const Divider = () => (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
);

export default Experience;
