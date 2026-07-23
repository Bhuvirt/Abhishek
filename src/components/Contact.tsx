import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Download, Copy, Check } from "lucide-react";
import resumeAsset from "@/assets/Abhishek_Choudhary_Resume.pdf.asset.json";
import { toast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "choudhary9754abhi@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/abhishek-choudhary-b8862220b/";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast({
        title: "Email copied",
        description: "You can now paste it into your email client.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy the email manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <div className="contact-reveal mb-16 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Connect
          </span>
          <h2 className="mb-0 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Let's Build Something{" "}
            <span className="gradient-text">Meaningful</span>
          </h2>
        </div>

        <div className="contact-reveal mx-auto mb-16 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            I enjoy working with people who care about solving meaningful
            problems, improving systems and creating better experiences for
            customers, teams and businesses.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Whether it's streamlining operations, supporting growth or turning
            complex processes into clear execution, I'm always interested in
            meaningful conversations with people building ambitious things.
          </p>
        </div>

        <div className="mb-16 grid gap-6 sm:grid-cols-3">
          <div className="contact-reveal glass rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_30px_hsla(var(--neon-blue)/0.1)]">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Email
            </h3>
            <p className="mb-5 text-sm text-muted-foreground break-all">
              {EMAIL}
            </p>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy Email"}
            </button>
          </div>

          <div className="contact-reveal glass rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_30px_hsla(var(--neon-blue)/0.1)]">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Linkedin className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              LinkedIn
            </h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Connect professionally
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
            >
              <Linkedin className="h-3.5 w-3.5" />
              Connect on LinkedIn
            </a>
          </div>

          <div className="contact-reveal glass rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_30px_hsla(var(--neon-blue)/0.1)]">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Download className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              Resume
            </h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Download a one-page overview
            </p>
            <a
              href={resumeAsset.url}
              download="Abhishek_Choudhary_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
            >
              <Download className="h-3.5 w-3.5" />
              Download Resume
            </a>
          </div>
        </div>

        <div className="contact-reveal text-center">
          <a
            href={`mailto:${EMAIL}?subject=Let's%20build%20something%20meaningful`}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-10 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_0_40px_hsla(var(--neon-blue)/0.25),0_0_80px_hsla(var(--neon-violet)/0.12)]"
          >
            Start a Conversation
            <Mail className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
