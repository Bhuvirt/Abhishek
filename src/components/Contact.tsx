import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Linkedin, MapPin, Briefcase, Monitor, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_KEY = "5e4c4564-fcc5-49e5-9617-93a92d389375";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll(".contact-animate");
      els?.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          Get In <span className="gradient-text">Touch</span>
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Info */}
          <div className="flex flex-col gap-6">
            <div className="contact-animate" style={{ opacity: 0 }}>
              <h3 className="mb-4 text-xl font-semibold text-foreground">Let's Connect</h3>
              <p className="mb-8 text-muted-foreground">
                Have a project or opportunity in mind? I'd love to hear from you.
              </p>
            </div>

            <a href="mailto:choudhary9754abhi@gmail.com" className="contact-animate glass flex items-center gap-4 rounded-xl p-4 text-foreground transition-all duration-300 hover:glow-blue" style={{ opacity: 0 }}>
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm">choudhary9754abhi@gmail.com</span>
            </a>
            <a href="tel:+916265649781" className="contact-animate glass flex items-center gap-4 rounded-xl p-4 text-foreground transition-all duration-300 hover:glow-blue" style={{ opacity: 0 }}>
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-sm">+91 62656 49781</span>
            </a>
            <a href="https://www.linkedin.com/in/abhishek-choudhary-b8862220b/" target="_blank" rel="noopener noreferrer" className="contact-animate glass flex items-center gap-4 rounded-xl p-4 text-foreground transition-all duration-300 hover:glow-blue" style={{ opacity: 0 }}>
              <Linkedin className="h-5 w-5 text-primary" />
              <span className="text-sm">LinkedIn Profile</span>
            </a>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { name: "name" as const, placeholder: "Your Name", type: "text" },
              { name: "email" as const, placeholder: "Your Email", type: "email" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required
                value={form[field.name]}
                onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                className="contact-animate glass rounded-xl border-transparent bg-muted/30 px-5 py-4 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.2)]"
                style={{ opacity: 0 }}
              />
            ))}
            <textarea
              placeholder="Your Message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="contact-animate glass resize-none rounded-xl border-transparent bg-muted/30 px-5 py-4 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-[0_0_20px_hsla(var(--neon-blue)/0.2)]"
              style={{ opacity: 0 }}
            />
            <button
              type="submit"
              disabled={sending}
              className="contact-animate mt-2 rounded-xl bg-gradient-to-r from-primary to-accent px-8 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsla(var(--neon-blue)/0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ opacity: 0 }}
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
