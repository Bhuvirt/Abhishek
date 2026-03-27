import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "POD.ai",
    role: "Senior Executive, Client Engagement",
    period: "Feb 2025 – Present",
    current: true,
    impact: "Managed large-scale campus hiring operations across India, ensuring seamless coordination between institutions and corporate hiring teams.",
    points: [
      "Executed 100+ campus hiring drives across 1,000+ universities",
      "Managed 10,000+ candidates through ATS platform",
      "Coordinated with 700+ TPOs for nationwide hiring programs",
      "Worked directly with HR leaders to translate hiring mandates into execution",
      "Managed end-to-end workflows: registrations, assessments, interviews, offers",
      "Built Excel-based data mapping systems (Pivot, XLOOKUP, VLOOKUP)",
      "Created internal knowledge system (\"Pod Encyclopedia\")",
    ],
  },
  {
    company: "ServerGuy / Breeze.io",
    role: "Lead Generation Executive",
    period: "Apr 2024 – Feb 2025",
    current: false,
    impact: "Built and optimized global lead generation systems across multiple markets, improving outreach efficiency and conversion rates.",
    points: [
      "Generated 3000+ global leads (US, Europe, UAE, India)",
      "Increased demo bookings by 20% through outreach optimization",
      "Built partnerships with Magento agencies",
      "Designed multi-channel campaigns (LinkedIn + email automation)",
      "Improved lead response efficiency by 40%",
    ],
  },
  {
    company: "Zinple Info Solutions",
    role: "Business Developer",
    period: "Jul 2023 – Apr 2024",
    current: false,
    impact: "Handled end-to-end client communication and ERP solution positioning in a fast-paced startup environment.",
    points: [
      "Worked on ERP solutions (SAP, Odoo, RPA)",
      "Managed client communication & sales cycle",
      "Conducted market research (India + UAE markets)",
      "Created content & supported product customization",
      "Worked closely with company director",
    ],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".timeline-item");
      items?.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 30 },
          {
            opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 80%" },
          }
        );
      });

      const impacts = sectionRef.current?.querySelectorAll(".impact-line");
      impacts?.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, filter: "blur(6px)", y: 10 },
          {
            opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8, delay: 0.3, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      const nodes = sectionRef.current?.querySelectorAll(".timeline-node");
      nodes?.forEach((node) => {
        gsap.fromTo(node,
          { scale: 0 },
          {
            scale: 1, duration: 0.5, ease: "back.out(2)",
            scrollTrigger: { trigger: node, start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          <span className="gradient-text">Experience</span>
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <div key={exp.company} className={`timeline-item relative mb-16 flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`} style={{ opacity: 0 }}>
              {/* Node */}
              <div className="absolute left-4 top-0 z-10 md:left-1/2 md:-translate-x-1/2">
                <div className={`timeline-node flex h-8 w-8 items-center justify-center rounded-full border-2 ${exp.current ? "border-primary glow-blue bg-primary/20" : "border-accent bg-accent/20"}`}>
                  <div className={`h-3 w-3 rounded-full ${exp.current ? "bg-primary animate-pulse-glow" : "bg-accent"}`} />
                </div>
              </div>

              {/* Content */}
              <div className={`ml-14 w-full md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:ml-auto md:pl-8"}`}>
                <div className="glass rounded-xl p-6 transition-all duration-300 hover:glow-blue">
                  <span className="mb-1 inline-block text-xs font-medium text-primary">{exp.period}</span>
                  <h3 className="mb-1 text-lg font-bold text-foreground">{exp.company}</h3>
                  <p className="mb-3 text-sm text-muted-foreground">{exp.role}</p>
                  <p className="impact-line mb-4 text-sm italic leading-relaxed text-primary/80" style={{ opacity: 0 }}>
                    "{exp.impact}"
                  </p>
                  <ul className={`space-y-2 text-sm text-muted-foreground ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2">
                        {i % 2 !== 0 && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                        <span className={i % 2 === 0 ? "md:ml-auto" : ""}>{point}</span>
                        {i % 2 === 0 && <span className="mt-1.5 hidden h-1.5 w-1.5 shrink-0 rounded-full bg-primary md:block" />}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
