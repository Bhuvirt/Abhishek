import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Target, Zap, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Search, label: "Understand", desc: "Break down requirements into clear actionable steps" },
  { icon: Target, label: "Align", desc: "Ensure all stakeholders are synchronized and informed" },
  { icon: Zap, label: "Execute", desc: "Drive structured workflows with consistency" },
  { icon: CheckCircle2, label: "Deliver", desc: "Complete processes with reliability and quality" },
];

const WorkApproach = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".approach-step");
      items?.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="approach" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">
          My <span className="gradient-text">Approach</span>
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-muted-foreground">
          I focus on clarity, structure, and execution—ensuring every moving part works in sync.
        </p>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center sm:gap-0">
          {steps.map(({ icon: Icon, label, desc }, i) => (
            <div key={label} className="flex items-center gap-4 sm:gap-0">
              <div className="approach-step flex max-w-[160px] flex-col items-center text-center" style={{ opacity: 0 }}>
                <div className="glass mb-3 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 hover:glow-blue sm:h-20 sm:w-20">
                  <Icon className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
                </div>
                <span className="text-sm font-medium text-foreground">{label}</span>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground/70">{desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden h-px w-12 bg-gradient-to-r from-primary to-accent sm:block lg:w-20" style={{ marginTop: '-2rem' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkApproach;
