const Footer = () => {
  return (
    <footer className="relative border-t border-border/60 px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Abhishek Choudhary
        </p>
        <p className="text-[11px] italic text-muted-foreground/60">
          Good systems create better experiences. Great people make them possible.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
