const Footer = () => {
  return (
    <footer className="relative border-t border-border px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Abhishek Choudhary
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          Designed with curiosity, continuous learning and attention to detail.
        </p>
        <p className="mt-6 text-[11px] italic text-muted-foreground/50">
          "Good systems create better experiences. Great people make them possible."
        </p>
      </div>
    </footer>
  );
};

export default Footer;
