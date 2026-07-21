import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Metric = {
  value: number;
  suffix: string;
  label: string;
  description: string;
  emphasis?: boolean;
};

const leftMetrics: Metric[] = [
  {
    value: 50000,
    suffix: "+",
    label: "Candidates",
    description:
      "Supporting recruitment operations through the Pod.ai ATS across multiple nationwide hiring programs.",
  },
  {
    value: 700,
    suffix: "+",
    label: "Placement Leaders",
    description:
      "Built and managed relationships with Training & Placement Officers to streamline hiring execution.",
  },
  {
    value: 80,
    suffix: "+ Pages",
    label: "Knowledge Repository",
    description:
      "Created the Pod Encyclopedia to simplify onboarding and improve knowledge sharing across teams.",
  },
];

const rightMetrics: Metric[] = [
  {
    value: 1200,
    suffix: "+",
    label: "Universities",
    description:
      "Collaborated with institutions across India to coordinate large-scale campus recruitment initiatives.",
  },
  {
    value: 100,
    suffix: "+",
    label: "Hiring Programs",
    description:
      "Coordinated recruitment campaigns for enterprise clients across diverse industries.",
  },
  {
    value: 4500,
    suffix: "+",
    label: "Business Accounts",
    description:
      "Researched and qualified enterprise accounts across North America, Europe, UAE and India.",
  },
];

const formatNumber = (n: number) => n.toLocaleString();

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => setVal(Math.round(obj.v)),
        });
      },
    });

    return () => trigger.kill();
  }, [target]);

  return (
    <span ref={ref}>
      {formatNumber(val)}
      {suffix}
    </span>
  );
};

const MetricCard = ({ metric, className = "" }: { metric: Metric; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glass group relative flex flex-col justify-between rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_40px_hsla(var(--neon-blue)/0.1)] md:p-10 ${className}`}
      style={{ opacity: 0 }}
    >
      <div>
        <p className="text-5xl font-extralight tracking-tight text-foreground glow-text-blue transition-all duration-500 group-hover:glow-text-violet md:text-6xl">
          <CountUp target={metric.value} suffix={metric.suffix} />
        </p>
        <h3 className="mt-4 text-lg font-medium tracking-tight text-foreground">
          {metric.label}
        </h3>
      </div>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {metric.description}
      </p>
    </div>
  );
};

const ByTheNumbers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="numbers"
      className="relative overflow-hidden px-6 py-28 md:py-40"
    >
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-primary/5 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[20rem] w-[20rem] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center" style={{ opacity: 0 }}>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary/80">
            By the Numbers
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
            The scale of environments{" "}
            <span className="gradient-text font-medium">I have worked in</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A few numbers that reflect the scale of the teams, programs and operations
            I&apos;ve had the opportunity to contribute to.
          </p>
        </div>

        {/* Asymmetric two-column layout */}
        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
          {/* Left column */}
          <div className="flex flex-col gap-8 md:w-1/2">
            <MetricCard metric={leftMetrics[0]} className="min-h-[280px] md:min-h-[320px]" />
            <MetricCard metric={leftMetrics[1]} className="min-h-[240px] md:min-h-[260px]" />
            <MetricCard metric={leftMetrics[2]} className="min-h-[220px] md:min-h-[240px]" />
          </div>

          {/* Right column — offset downward */}
          <div className="flex flex-col gap-8 md:mt-20 md:w-1/2">
            <MetricCard metric={rightMetrics[0]} className="min-h-[240px] md:min-h-[260px]" />
            <MetricCard metric={rightMetrics[1]} className="min-h-[260px] md:min-h-[300px]" />
            <MetricCard metric={rightMetrics[2]} className="min-h-[220px] md:min-h-[260px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ByTheNumbers;
