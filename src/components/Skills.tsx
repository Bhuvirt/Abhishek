import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  Workflow,
  MessageSquareHeart,
  Search,
  Kanban,
  Database,
  HelpCircle,
  FileSpreadsheet,
  StickyNote,
  Cloud,
  Target,
  Bot,
  Zap,
  Layers,
  BarChart3,
  FileText,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Core Strengths",
    items: [
      { icon: Users, label: "Stakeholder Management" },
      { icon: Workflow, label: "Operations Coordination" },
      { icon: MessageSquareHeart, label: "Client Engagement" },
      { icon: Search, label: "Business Research" },
      { icon: Kanban, label: "Program Management" },
    ],
  },
  {
    title: "Tools",
    items: [
      { icon: Database, label: "Salesforce" },
      { icon: HelpCircle, label: "HubSpot" },
      { icon: FileSpreadsheet, label: "Excel" },
      { icon: StickyNote, label: "Notion" },
      { icon: Cloud, label: "Google Workspace" },
      { icon: Target, label: "Lead Generation Platforms" },
    ],
  },
  {
    title: "Working Knowledge",
    items: [
      { icon: Bot, label: "AI Workflows" },
      { icon: Zap, label: "Automation" },
      { icon: Layers, label: "ERP Systems" },
      { icon: BarChart3, label: "Data Analysis" },
      { icon: FileText, label: "Process Documentation" },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

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

      const columns = columnsRef.current?.querySelectorAll(".skills-column");
      if (columns) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: columnsRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="mb-16 text-center" style={{ opacity: 0 }}>
          <p className="eyebrow mb-4">Capabilities</p>
          <h2 className="section-title mb-5 font-light">
            Skills & <span className="gradient-text font-medium">Tools</span>
          </h2>
          <p className="section-lede">
            The capabilities, platforms and working knowledge behind the day-to-day.
          </p>
        </div>

        <div
          ref={columnsRef}
          className="grid gap-6 md:grid-cols-3"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="skills-column glass rounded-2xl p-8"
              style={{ opacity: 0 }}
            >
              <h3 className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {category.title}
              </h3>
              <ul className="space-y-6">
                {category.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={idx}
                      className="group flex items-center gap-4 text-sm text-foreground/90 transition-colors hover:text-primary"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-muted/30 text-muted-foreground transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
