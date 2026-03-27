import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Users2, Cog } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const challenges = [
  {
    icon: Rocket,
    title: "Scaling Hiring Operations",
    description: "Handled multiple national hiring programs simultaneously while managing thousands of candidates with structured execution.",
  },
  {
    icon: Users2,
    title: "Stakeholder Coordination",
    description: "Managed communication between hundreds of institutional and corporate stakeholders, ensuring alignment and smooth execution.",
  },
  {
    icon: Cog,
    title: "Process Optimization",
    description: "Improved workflows and reduced inefficiencies by restructuring processes and enhancing response systems.",
  },
];

const Challenges = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".challenge-card");
      cards?.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="challenges" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          Challenges I've <span className="gradient-text">Solved</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {challenges.map((item) => (
            <div
              key={item.title}
              className="challenge-card glass group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:glow-blue"
              style={{ opacity: 0 }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
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

export default Challenges;
