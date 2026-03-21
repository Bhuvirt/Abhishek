import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/profile.png";
import { Users, MessageSquare, Settings, BarChart3, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const strengths = [
  { icon: Users, label: "Stakeholder Management" },
  { icon: MessageSquare, label: "Client Communication" },
  { icon: Settings, label: "Process Coordination" },
  { icon: BarChart3, label: "Data Analysis (Excel)" },
  { icon: Briefcase, label: "Recruitment Operations" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

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
      if (skillsRef.current) {
        gsap.fromTo(skillsRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: skillsRef.current, start: "top 80%" }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          About <span className="gradient-text">Me</span>
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
            <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Client Engagement Executive experienced in managing large-scale hiring operations, 
              stakeholder communication, and process execution. Worked closely with CXOs, HR leaders, 
              and institutional partners to deliver structured and reliable outcomes across complex workflows.
            </p>

            <div ref={skillsRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {strengths.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="glass flex items-center gap-2 rounded-lg px-3 py-3 text-xs text-foreground transition-all duration-300 hover:glow-blue sm:text-sm"
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
