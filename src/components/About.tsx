import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lensNodes = [
  { label: "People", position: "top", delay: 0 },
  { label: "Processes", position: "left", delay: 0.2 },
  { label: "Technology", position: "right", delay: 0.4 },
];

const TheLens = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: visualRef.current, start: "top 80%" },
          }
        );
      }

      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: narrativeRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lens"
      className="relative overflow-hidden px-6 py-28 md:py-40"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Heading */}
        <div ref={headingRef} className="mb-20 text-center" style={{ opacity: 0 }}>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-primary/80">
            How I See The Work
          </p>
          <h2 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
            The <span className="gradient-text font-semibold">Lens</span>
          </h2>
        </div>

        {/* Quote */}
        <blockquote
          ref={quoteRef}
          className="mx-auto mb-24 max-w-3xl text-center"
          style={{ opacity: 0 }}
        >
          <p className="text-xl font-light leading-relaxed text-foreground/90 md:text-2xl">
            "The more I work, the more I realize that I'm not drawn to individual
            tasks—I'm drawn to understanding the systems behind them."
          </p>
        </blockquote>

        {/* Visualization */}
        <div
          ref={visualRef}
          className="mx-auto mb-24 flex max-w-2xl justify-center"
          style={{ opacity: 0 }}
        >
          <div className="relative h-[340px] w-[340px] sm:h-[400px] sm:w-[400px]">
            {/* SVG connecting lines */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--neon-blue))" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(var(--neon-violet))" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {/* Lines from outer nodes to center */}
              <path
                d="M200 80 L200 200"
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="animate-flow-line"
              />
              <path
                d="M120 280 L200 200"
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="animate-flow-line"
              />
              <path
                d="M280 280 L200 200"
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="animate-flow-line"
              />
            </svg>

            {/* Outer nodes */}
            {lensNodes.map((node) => {
              const positionClasses = {
                top: "left-1/2 top-[12%] -translate-x-1/2",
                left: "left-[12%] top-[72%] -translate-x-1/2 -translate-y-1/2 sm:left-[15%]",
                right: "left-[88%] top-[72%] -translate-x-1/2 -translate-y-1/2 sm:left-[85%]",
              };

              return (
                <div
                  key={node.label}
                  className={`absolute ${positionClasses[node.position]} flex flex-col items-center gap-3`}
                >
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-primary/20 blur-xl animate-pulse-slow" />
                    <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full glass shadow-[0_0_30px_rgba(0,255,255,0.1)] animate-float-slow sm:h-[88px] sm:w-[88px]">
                      <div className="h-3 w-3 rounded-full bg-primary/80 shadow-[0_0_12px_hsl(var(--neon-blue))]" />
                    </div>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
                    {node.label}
                  </span>
                </div>
              );
            })}

            {/* Center node — Execution */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-2xl animate-pulse-slow" />
                <div className="relative flex h-[96px] w-[96px] items-center justify-center rounded-full glass border border-primary/30 shadow-[0_0_40px_rgba(0,255,255,0.15)] animate-float-center sm:h-[112px] sm:w-[112px]">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_hsl(var(--neon-blue))]" />
                </div>
              </div>
              <span className="text-sm font-semibold uppercase tracking-widest text-foreground sm:text-base">
                Execution
              </span>
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div
          ref={narrativeRef}
          className="mx-auto max-w-3xl space-y-6 text-center"
          style={{ opacity: 0 }}
        >
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Throughout my career, I've found myself asking different questions than most people.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Instead of focusing only on completing a task, I'm naturally curious about why a process
            works, where it breaks down, and how it can become better.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Whether coordinating hiring across hundreds of institutions, improving operational
            workflows, or experimenting with AI in recruitment, I've always been motivated by one thing:
          </p>
          <p className="pt-2 text-lg font-medium text-foreground sm:text-xl">
            Creating clarity where complexity exists.
          </p>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes flow-line {
          to {
            stroke-dashoffset: -24;
          }
        }
        .animate-flow-line {
          animation: flow-line 12s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow {
          animation: float-slow 7s ease-in-out infinite;
        }
        .animate-float-center {
          animation: float-slow 8s ease-in-out infinite reverse;
        }
      `}</style>
    </section>
  );
};

export default TheLens;
