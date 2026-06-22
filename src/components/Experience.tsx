import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "POD.ai",
    role: "Senior Executive, Client Engagement",
    period: "Feb 2025 – Present",
    current: true,
    impact: "Managed large-scale campus hiring operations across India, ensuring seamless coordination between institutions and corporate hiring teams.",
    points: [
      "Executed 100+ campus hiring drives across 1,000+ universities, processing 10,000+ candidates on the Pod.ai ATS platform",
      "Coordinated national recruitment pipelines for Fortune 500 technology firms while managing high-stakes relations with placement cells at elite, Tier-1 engineering and business institutions",
      "Managed 700+ Training & Placement Officers during peak seasons to maximize candidate participation for multi-client hiring programs",
      "Partnered with Head HR and senior leadership to translate hiring mandates into large-scale campus recruitment campaigns",
      "Coordinated 3–4 concurrent national hiring programs, handling registration setup, assessments, interview scheduling and offer management",
      "Eliminated external link-shortening dependency by redesigning internal registration workflows for hiring drives",
      "Created internal platform knowledge repository (\"Pod Encyclopedia\") improving onboarding and platform adoption across teams",
      "Deployed to multiple university campuses across the North India region to execute large-scale pool recruitment events, personally managed 3,000+ students on-site, fast-paced under pressure, real-time query resolutions, and ensuring compliance with evaluation standards",
    ],
  },
  {
    company: "ServerGuy / Breeze.io",
    role: "Executive – Lead Generation",
    period: "Apr 2024 – Feb 2025",
    current: false,
    impact: "Built and optimized global lead generation systems across multiple markets, improving outreach efficiency and conversion rates.",
    points: [
      "Identified 3,000+ high-value leads across USA, Europe, UAE, and India through targeted market research",
      "Increased cold-calling outreach during peak season, resulting in 20% more product demos scheduled",
      "Built strategic partnerships with Magento development agencies, generating 5+ recurring referral collaborations",
      "Ran A/B tested drip email campaigns, achieving 45% average open rates and 20% increase in lead inquiries",
      "Conducted product pitches, partnership discussions, and follow-ups to convert opportunities",
      "Managed client queries via website webchat and created proposals, product presentations, and sales documentation",
      "Led prospecting for GPU hosting, WooCommerce hosting, WordPress hosting, and cloud infrastructure, identifying 1,500+ qualified US leads within one week",
      "Designed multi-channel outreach strategies using LinkedIn Sales Navigator and cold email automation, increasing Sales Qualified Leads by 30%",
      "Conducted competitor research and positioning analysis, improving campaign performance by 15%",
      "Optimized the lead nurturing workflow, reducing response time by 40% while handling live webchat",
      "Collaborated closely with the sales team to streamline product demos, proposals, and client engagement processes",
    ],
  },
  {
    company: "Zinple Info Solutions",
    role: "Business Developer",
    period: "Jul 2023 – Apr 2024",
    current: false,
    impact: "Handled end-to-end client communication and ERP solution positioning in a fast-paced startup environment.",
    points: [
      "Generated leads and supported client acquisition for SAP Business One, RPA, Odoo, and custom ERP solutions",
      "Managed client communication, follow-ups, and relationship building throughout the sales cycle",
      "Executed cold email campaigns and social media outreach to improve brand visibility",
      "Created website and LinkedIn content targeting Indian and UAE markets",
      "Conducted market research for Nutrinorm Wellness Pvt Ltd, analyzing brands like Ferrero Rocher, Kinder Joy, Nutella, and Nykaa",
      "Contributed to the development and customization of 4R Recycle ERP software based on client requirements",
      "Worked closely with the company director on client meetings and strategic initiatives",
      "Identified 3,000+ high-value leads across India & UAE",
    ],
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
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
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
    return () => { document.body.style.overflow = ""; };
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
    <section ref={sectionRef} id="experience" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-primary">
          My Journey
        </p>
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          Experience <span className="gradient-text">Timeline</span>
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent" />

          {experiences.map((exp, i) => (
            <div key={exp.company} className="timeline-item relative mb-8 pl-14" style={{ opacity: 0 }}>
              {/* Node */}
              <div className="absolute left-4 top-5 z-10 -translate-x-1/2">
                <div className={`timeline-node flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${selected === i ? "border-primary glow-blue bg-primary/30" : exp.current ? "border-primary bg-primary/20" : "border-accent bg-accent/20"}`}>
                  <div className={`h-3 w-3 rounded-full ${selected === i || exp.current ? "bg-primary animate-pulse-glow" : "bg-accent"}`} />
                </div>
              </div>

              {/* Compact card */}
              <button
                onClick={() => setSelected(i)}
                className="glass group flex w-full items-center justify-between rounded-xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:glow-blue"
              >
                <div>
                  <span className="mb-1 inline-block text-xs font-medium text-primary">{exp.period}</span>
                  <h3 className="text-lg font-bold text-foreground">{exp.company}</h3>
                  <p className="text-sm text-muted-foreground">{exp.role}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      {exp && (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-stretch md:justify-end">
          <div
            ref={overlayRef}
            onClick={closePanel}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            style={{ opacity: 0 }}
          />
          <div
            ref={panelRef}
            className="glass relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-3xl p-7 md:max-h-full md:w-[28rem] md:rounded-none md:rounded-l-3xl"
            style={{ opacity: 0 }}
          >
            <button
              onClick={closePanel}
              aria-label="Close panel"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="mb-1 inline-block text-xs font-medium text-primary">{exp.period}</span>
            <h3 className="text-2xl font-bold text-foreground">{exp.company}</h3>
            <p className="mb-6 text-sm text-muted-foreground">{exp.role}</p>

            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">Impact Statement</h4>
            <p className="mb-6 text-sm italic leading-relaxed text-foreground/90">"{exp.impact}"</p>

            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Key Achievements</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {exp.points.map((point, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
