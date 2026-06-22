import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  ClipboardList,
  MessageSquareHeart,
  Workflow,
  BarChart3,
  TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Users,
    title: "Stakeholder Management",
    description:
      "Coordinating institutional partners, corporate teams, and internal stakeholders to achieve shared objectives.",
  },
  {
    icon: ClipboardList,
    title: "Recruitment Operations",
    description:
      "Managing end-to-end hiring workflows including registrations, assessments, interviews, and reporting.",
  },
  {
    icon: MessageSquareHeart,
    title: "Client Engagement",
    description:
      "Building trust-based relationships while ensuring consistent communication and execution.",
  },
  {
    icon: Workflow,
    title: "Process Optimization",
    description:
      "Identifying inefficiencies and creating structured workflows that improve operational effectiveness.",
  },
  {
    icon: BarChart3,
    title: "Data Analysis & Reporting",
    description:
      "Using Excel, data mapping, and reporting tools to support business decisions and operational tracking.",
  },
  {
    icon: TrendingUp,
    title: "Business Development & Outreach",
    description:
      "Generating opportunities through research, prospecting, market intelligence, and relationship building.",
  },
];

const tools = [
  "Excel (Advanced)",
  "LinkedIn Sales Navigator",
  "Snov.io",
  "Apollo",
  "Lusha",
  "HubSpot",
  "Salesforce",
  "Clay",
  "SignalHire",
  "ZoomInfo",
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

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

      const cards = gridRef.current?.querySelectorAll(".capability-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          }
        );
      }

      const chips = stripRef.current?.querySelectorAll(".tool-chip");
      if (chips) {
        gsap.fromTo(
          chips,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: stripRef.current, start: "top 90%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="mb-14 text-center" style={{ opacity: 0 }}>
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            What I Bring
          </span>
          <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Core <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            The operational, communication, and analytical strengths developed through
            experience across recruitment, client engagement, and business development.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="capability-card glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-violet sm:p-7"
                style={{ opacity: 0 }}
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/15">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground/80">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tool Stack Strip */}
        <div
          ref={stripRef}
          className="mt-14 rounded-2xl border border-border/50 bg-muted/20 p-6 backdrop-blur-md sm:p-8"
          style={{ opacity: 0 }}
        >
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Tools & Platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tools.map((tool, index) => (
              <span
                key={index}
                className="tool-chip glass rounded-full px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                style={{ opacity: 0 }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
