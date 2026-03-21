import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Core Skills",
    color: "primary",
    skills: ["Client Engagement", "Stakeholder Management", "Recruitment Operations", "Program Coordination", "Process Optimization"],
  },
  {
    title: "Tools",
    color: "accent",
    skills: ["Excel (Advanced)", "LinkedIn Sales Navigator", "Snov.io, Apollo, Lusha", "CRM tools (HubSpot, Salesforce basics)"],
  },
  {
    title: "Soft Skills",
    color: "primary",
    skills: ["Communication", "Adaptability", "Structured Thinking", "Calm Execution"],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".skill-card");
      cards?.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          <span className="gradient-text">Skills</span> & Tools
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="skill-card glass rounded-2xl p-6 transition-all duration-300 hover:glow-blue" style={{ opacity: 0 }}>
              <h3 className={`mb-6 text-lg font-semibold ${cat.color === "primary" ? "text-primary" : "text-accent"}`}>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
