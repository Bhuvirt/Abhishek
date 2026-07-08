import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Send, Settings, Kanban, HeartHandshake, BarChart3 } from "lucide-react";
import resumeAsset from "@/assets/Abhishek_Choudhary_Resume.pdf.asset.json";
import { toast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_KEY = "5e4c4564-fcc5-49e5-9617-93a92d389375";

const exploring = [
  { icon: Settings, label: "Operations" },
  { icon: Kanban, label: "Program Management" },
  { icon: HeartHandshake, label: "Customer Success" },
  { icon: BarChart3, label: "Business Operations" },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (showForm && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
      formRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [showForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
        setForm({ name: "", email: "", message: "" });
        setShowForm(false);
      } else {
        toast({ title: "Failed to send", description: "Something went wrong. Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", description: "Please check your connection and try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            What's Next
          </span>
          <h2 className="mb-5 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            What's <span className="gradient-text">Next?</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            I'm looking for opportunities where thoughtful execution, structured thinking and meaningful collaboration can create lasting impact.
          </p>
        </div>

        <div
          ref={cardRef}
          className="glass mx-auto rounded-2xl p-8 text-center md:p-12"
          style={{ opacity: 0 }}
        >
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Currently Exploring
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {exploring.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group flex items-center justify-center gap-3 rounded-xl border border-border/50 bg-muted/20 px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                >
                  <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={resumeAsset.url}
              download="Abhishek_Choudhary_Resume.pdf"
              className="group inline-flex items-center gap-2 glass rounded-full border border-white/10 px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_hsla(var(--neon-blue)/0.2),0_0_60px_hsla(var(--neon-violet)/0.12)]"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              Download Resume
            </a>

            <button
              onClick={() => setShowForm(true)}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_hsla(var(--neon-blue)/0.3),0_0_80px_hsla(var(--neon-violet)/0.15)]"
            >
              Let's Connect
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {showForm && (
          <div
            ref={formRef}
            className="mt-8 rounded-2xl border border-border/50 bg-muted/20 p-6 backdrop-blur-md sm:p-8"
          >
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Send a quick message and I'll get back to you soon.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="glass rounded-xl border-transparent bg-muted/30 px-5 py-4 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.2)]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="glass rounded-xl border-transparent bg-muted/30 px-5 py-4 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.2)]"
                />
              </div>
              <textarea
                placeholder="Your Message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="glass resize-none rounded-xl border-transparent bg-muted/30 px-5 py-4 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.2)]"
              />
              <button
                type="submit"
                disabled={sending}
                className="mt-2 rounded-xl bg-gradient-to-r from-primary to-accent px-8 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsla(var(--neon-blue)/0.4)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
