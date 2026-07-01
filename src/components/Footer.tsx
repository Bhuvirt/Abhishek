import { Linkedin, Mail } from "lucide-react";

const navLinks = [
  { label: "The Lens", href: "#lens" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/abhishek-choudhary-b8862220b/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:choudhary9754abhi@gmail.com", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border px-6 py-12">
      {/* Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:justify-between">
        <div className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:glow-blue"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center animate-fade-in">
        <p className="text-sm font-medium text-primary/80 glow-text-blue">
          Open to Client Engagement &amp; Operations Opportunities
        </p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Based in India | Available for On-site &amp; Remote Roles
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Abhishek Choudhary. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
