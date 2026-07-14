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
  impact: string;
  responsibilities: string[];
  achievements: string[];
  learnings: string[];
  technologies: string[];
};

const experiences: Experience[] = [
  {
    company: "POD.ai",
    role: "Senior Executive, Client Engagement",
    domain: "HR Technology · Campus Hiring",
    period: "Feb 2025 – Present",
    current: true,
    summary:
      "Coordinating nationwide campus hiring programs, keeping institutions and corporate teams moving in sync.",
    impact:
      "Turned fragmented, high-pressure hiring seasons into structured, repeatable programs that leadership could rely on.",
    responsibilities: [
      "Coordinate 3–4 concurrent national hiring programs end to end — registration, assessments, interview scheduling and offers.",
      "Manage relationships with placement cells across Tier-1 engineering and business institutions.",
      "Partner with Head HR and senior leadership to translate hiring mandates into campus campaigns.",
      "Lead on-site pool recruitment events, resolving queries and ensuring evaluation compliance in real time.",
    ],
    achievements: [
      "Executed 100+ campus drives across 1,000+ universities, processing 10,000+ candidates.",
      "Managed 700+ Training & Placement Officers during peak seasons.",
      "Personally handled 3,000+ students on-site across North India campuses.",
      "Built the internal “Pod Encyclopedia” to speed up onboarding and platform adoption.",
    ],
    learnings: [
      "Scale is a coordination problem before it is a resourcing one.",
      "Clear systems calm chaos faster than extra effort does.",
    ],
    technologies: ["Pod.ai ATS", "Assessment platforms", "Interview scheduling", "Workflow design"],
  },
  {
    company: "ServerGuy / Breeze.io",
    role: "Executive – Lead Generation",
    domain: "Cloud Infrastructure · SaaS Growth",
    period: "Apr 2024 – Feb 2025",
    current: false,
    summary:
      "Driving demand for cloud hosting and managed infrastructure across global markets — from GPU and WordPress hosting to the Breeze.io Magento product.",
    impact:
      "Replaced scattered outreach with measurable pipelines, lifting qualified leads and cutting response time.",
    responsibilities: [
      "Lead prospecting for GPU, WooCommerce, WordPress and cloud hosting across the USA, Europe, UAE and India.",
      "Design multi-channel outreach across LinkedIn Sales Navigator and cold email automation.",
      "Run product pitches, partnership discussions and proposal creation for the Breeze.io Magento product.",
      "Handle live webchat queries and streamline the lead-nurturing workflow.",
    ],
    achievements: [
      "Identified 3,000+ high-value leads across four regions — plus 1,500+ qualified US leads in a single week for cloud hosting.",
      "Increased Sales Qualified Leads by 30% through multi-channel sequencing.",
      "Achieved 45% average email open rates via A/B tested drip campaigns.",
      "Reduced lead response time by 40% and built 5+ recurring referral partnerships with Magento agencies.",
    ],
    learnings: [
      "Consistent process beats occasional intensity in outreach.",
      "Small experiments compound into large conversion gains.",
    ],
    technologies: ["Cloud & GPU hosting", "Breeze.io / Magento", "LinkedIn Sales Navigator", "Cold email automation"],
  },
  {
    company: "Zinple Info Solutions",
    role: "Business Developer",
    domain: "Enterprise SaaS · ERP",
    period: "Jul 2023 – Apr 2024",
    current: false,
    summary:
      "Positioning enterprise software — SAP Business One, Odoo, RPA and custom ERP — and owning client relationships end to end.",
    impact:
      "Learned to hold the full client relationship — from first message to a solution that actually fit.",
    responsibilities: [
      "Support client acquisition for SAP Business One, RPA, Odoo and custom ERP solutions.",
      "Manage communication, follow-ups and relationships across the sales cycle.",
      "Run cold email and social outreach targeting Indian and UAE markets.",
      "Work directly with the director on client meetings and strategic initiatives.",
    ],
    achievements: [
      "Identified 3,000+ high-value leads across India and the UAE.",
      "Contributed to the customization of 4R Recycle ERP based on client needs.",
      "Produced website and LinkedIn content for two markets.",
      "Conducted competitive market research for consumer wellness brands.",
    ],
    learnings: [
      "Understanding the client's problem matters more than pitching the product.",
      "In a startup, versatility is the real skill.",
    ],
    technologies: ["SAP Business One", "Odoo", "RPA", "ERP customization"],
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
            The Path So Far
          </p>
          <h2 className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-5xl">
            The <span className="gradient-text font-semibold">Journey</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every role added a different perspective. Together they shaped how I think today.
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
                  <h3 className="text-lg font-semibold text-foreground">{item.company}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.role}</p>
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground/90">
                    {item.summary}
                  </p>

                  <button
                    onClick={() => setSelected(i)}
                    className="group mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-gradient-to-r from-primary/15 to-accent/10 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_25px_hsla(var(--neon-blue)/0.2)]"
                  >
                    Explore My Work
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

            <div className="mt-8 space-y-8">
              <ModalList title="Responsibilities" items={exp.responsibilities} />
              <ModalList title="Achievements" items={exp.achievements} />
              <ModalList title="Key Learnings" items={exp.learnings} />

              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-primary/5 px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                  Impact
                </h4>
                <p className="text-sm italic leading-relaxed text-foreground/90">"{exp.impact}"</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ModalList = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">{title}</h4>
    <ul className="space-y-2.5 text-sm text-muted-foreground">
      {items.map((item, j) => (
        <li key={j} className="flex items-start gap-2.5">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Experience;
