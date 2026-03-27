import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 120, suffix: "+", label: "Hiring Drives Executed" },
  { value: 10000, suffix: "+", label: "Candidates Managed" },
  { value: 700, suffix: "+", label: "Stakeholders Coordinated" },
  { value: 3000, suffix: "+", label: "Global Leads Generated" },
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

const MetricsStrip = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".metric-card");
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" } }
    );
  }, []);

  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-6xl px-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="metric-card glass rounded-2xl p-6 text-center transition-all duration-300 hover:glow-blue group"
            style={{ opacity: 0 }}
          >
            <p className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl glow-text-blue group-hover:glow-text-violet transition-all duration-300">
              <CountUp target={m.value} suffix={m.suffix} />
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MetricsStrip;
