import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 120, suffix: "+", label: "Hiring Drives" },
  { value: 15000, suffix: "+", label: "Candidates" },
  { value: 1200, suffix: "+", label: "Institutions" },
  { value: 700, suffix: "+", label: "Placement Officers" },
  { valueLabel: "Fortune 500", suffix: "", label: "Hiring Programs" },
  { value: 4500, suffix: "+", label: "Global Leads Generated" },
];

const formatNumber = (n: number) => n.toLocaleString();

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      onUpdate: () => setVal(Math.round(obj.v)),
    });
    return () => { tween.kill(); };
  }, [target]);

  return <span ref={ref}>{formatNumber(val)}{suffix}</span>;
};

const ImpactSnapshot = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      const cards = gridRef.current?.querySelectorAll(".metric-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative w-full py-24 overflow-hidden"
    >
      {/* Faint grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(hsla(var(--primary)/0.25) 1px, transparent 1px), linear-gradient(90deg, hsla(var(--primary)/0.25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/10 blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div ref={headerRef} className="mb-14 text-center" style={{ opacity: 0 }}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Impact Snapshot
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <span className="gradient-text">Measured</span> through execution, scale and collaboration.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="metric-card group relative flex flex-col items-center justify-center text-center glass rounded-2xl p-8 min-h-[200px] transition-all duration-500 hover:-translate-y-1 hover:glow-blue"
              style={{ opacity: 0 }}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, hsla(var(--neon-blue)/0.12), hsla(var(--neon-violet)/0.12))",
                }}
              />

              <div className="relative">
                <p className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl glow-text-blue transition-all duration-300 group-hover:glow-text-violet">
                  {m.valueLabel ? (
                    <span>{m.valueLabel}</span>
                  ) : (
                    <CountUp target={m.value} suffix={m.suffix} />
                  )}
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSnapshot;
