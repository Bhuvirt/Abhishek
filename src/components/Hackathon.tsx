import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Trophy,
  Users,
  Clock,
  Lightbulb,
  Crown,
  Sparkles,
  Wand2,
  GraduationCap,
  BarChart3,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Crown, value: "Team Lead", label: "Role" },
  { icon: Users, value: "5", label: "Members" },
  { icon: Clock, value: "48h", label: "Sprint" },
  { icon: Trophy, value: "POC", label: "Delivered" },
];

const highlights = [
  {
    icon: Crown,
    title: "Team Leadership",
    description:
      "Formed and led a high-performing 5-member cross-functional team to concept, design, and pitch an AI-driven candidate engagement ecosystem — setting product vision and assigning internal responsibilities.",
  },
  {
    icon: Wand2,
    title: "Vibe Coding",
    description:
      'Leveraged plain-English AI prompting ("vibe coding") as a non-tech leader to bypass technical constraints and build a functional front-end prototype and Proof of Concept.',
  },
  {
    icon: GraduationCap,
    title: "Post-Assessment Portal",
    description:
      "Designed an automated portal to reduce candidate drop-outs — giving rejected applicants granular performance diagnostics alongside an AI course recommendation engine.",
  },
  {
    icon: BarChart3,
    title: "Data Dashboards",
    description:
      "Architected conceptual dashboards with institutional employability heatmaps for partner colleges and macroeconomic skill-market trend analytics for enterprise clients.",
  },
  {
    icon: Rocket,
    title: "Pitch & Prototype",
    description:
      "Delivered a comprehensive business pitch and working prototype within strict tournament timelines, earning strong praise from internal leadership for viability and scalability.",
  },
  {
    icon: Lightbulb,
    title: "Product Strategy",
    description:
      "Established the end-to-end product vision for a talent-nurturing ecosystem, balancing candidate experience, institutional value, and corporate analytics.",
  },
];

const team = ["A", "M", "R", "S", "K"];

const Hackathon = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hack-head",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".hack-head", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".hack-stat",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".hack-stats", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".hack-avatar",
        { opacity: 0, scale: 0, x: -10 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".hack-team", start: "top 90%" },
        }
      );

      const cards = sectionRef.current?.querySelectorAll(".hack-card");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hackathon" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="hack-head mb-14 text-center" style={{ opacity: 0 }}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-secondary">
            <Sparkles className="h-3.5 w-3.5" />
            Pod.ai Hosted Hackathon
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Product Innovation & <span className="gradient-text">Leadership</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Lead & Product Strategist for{" "}
            <span className="font-semibold text-foreground">Hackathor</span> — a 5-member team
            that built an AI-driven candidate engagement and talent-nurturing ecosystem in a
            48-hour sprint.
          </p>
        </div>

        {/* Team badge + stats */}
        <div className="mb-14 grid items-center gap-6 md:grid-cols-5">
          {/* Team card */}
          <div className="hack-team glass relative col-span-1 overflow-hidden rounded-2xl p-6 text-center md:col-span-2">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-secondary/20 blur-3xl" />
            <div className="mb-1 flex items-center justify-center gap-2 text-secondary">
              <Crown className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Team Hackathor</span>
            </div>
            <p className="mb-5 text-sm text-muted-foreground">Led by Abhishek · 4 members</p>
            <div className="flex items-center justify-center -space-x-3">
              {team.map((initial, i) => (
                <div
                  key={i}
                  className={`hack-avatar flex h-11 w-11 items-center justify-center rounded-full border-2 border-background text-sm font-bold ${
                    i === 0
                      ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground glow-blue"
                      : "bg-muted text-foreground"
                  }`}
                  style={{ opacity: 0 }}
                >
                  {initial}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="hack-stats col-span-1 grid grid-cols-2 gap-4 md:col-span-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="hack-stat glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:glow-violet"
                style={{ opacity: 0 }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 transition-colors duration-300 group-hover:bg-secondary/20">
                  <s.icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="hack-card glass group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:glow-blue"
              style={{ opacity: 0 }}
            >
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 transition-colors duration-300 group-hover:from-primary/25 group-hover:to-secondary/25">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hackathon;