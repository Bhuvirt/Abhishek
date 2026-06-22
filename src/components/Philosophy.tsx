import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile.png";
import { Target, ShieldCheck, MessageSquare, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { icon: Target, title: "Clarity", text: "Break down complexity into clear actionable steps." },
  { icon: ShieldCheck, title: "Accountability", text: "Own outcomes with commitment and consistency." },
  { icon: MessageSquare, title: "Communication", text: "Keep stakeholders informed, aligned, and engaged." },
  { icon: Zap, title: "Execution", text: "Drive structured action toward measurable results." },
];

const Philosophy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -80 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-sm font-medium uppercase tracking-widest text-primary">
          My Professional Philosophy
        </p>
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          How I Approach <span className="gradient-text">Complex Operations</span>
        </h2>

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Image */}
          <div ref={imageRef} className="flex justify-center" style={{ opacity: 0 }}>
            <div className="group relative h-72 w-72 sm:h-80 sm:w-80">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-accent opacity-50 blur-lg transition-opacity duration-500 group-hover:opacity-80" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-border transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-2">
                <img src={profileImg} alt="Abhishek Choudhary" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} style={{ opacity: 0 }}>
            <p className="mb-6 text-base leading-relaxed text-foreground sm:text-lg">
              I believe successful operations are built on three things:{" "}
              <span className="gradient-text font-semibold">clarity, accountability, and communication.</span>
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Whether coordinating a nationwide hiring campaign, managing institutional stakeholders,
              or solving process bottlenecks, my focus remains the same—create structure where complexity
              exists and ensure every stakeholder stays aligned.
            </p>
          </div>
        </div>

        {/* Principle cards */}
        <div ref={cardsRef} className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:glow-blue"
              style={{ opacity: 0 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;