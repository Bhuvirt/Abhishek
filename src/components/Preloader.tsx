import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete,
        });
      },
    });

    // Animate progress bar
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function () {
        setProgress(Math.round(this.targets()[0].val));
      },
    });

    // Fade text
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <h1
        ref={textRef}
        className="mb-12 text-3xl font-light tracking-[0.3em] text-foreground sm:text-4xl md:text-5xl"
      >
        ABHISHEK CHOUDHARY
      </h1>

      <div className="w-64 sm:w-80">
        <div className="mb-3 flex justify-between text-xs text-muted-foreground">
          <span className="tracking-widest">LOADING</span>
          <span>{progress}%</span>
        </div>
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-muted">
          <div
            ref={progressRef}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
