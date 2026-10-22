import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/portfolio-data";
import { PORTFOLIO_FILES } from "@/lib/contact-schema";

const navigation = [
  ["/", "Home"],
  ["/about", "About"],
  ["/skills", "Skills"],
  ["/projects", "Projects"],
  ["/experience", "Experience"],
  ["/certifications", "Certifications"],
  ["/contact", "Contact"],
  ["/profiles", "Profiles"],
] as const;

export function SiteShell({ active, children }: { active: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="site-shell min-h-svh bg-background text-foreground">
      <a href="#page-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header sticky top-0 z-40 border-b border-white/10 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-10">
          <Link to="/" className="brand-mark shrink-0" aria-label="Guda Abhishek home">
            <span className="brand-symbol">G</span>
            <span>
              GUDA <b>ABHISHEK</b>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navigation.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                aria-current={active === to ? "page" : undefined}
                className={`site-nav-link ${active === to ? "is-active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            {PORTFOLIO_FILES.resume && (
              <Button asChild className="hidden min-h-10 px-4 text-xs sm:inline-flex">
                <a href={PORTFOLIO_FILES.resume} download>
                  Resume <ArrowUpRight />
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              className="min-h-11 min-w-11 lg:hidden"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-site-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-site-navigation"
            className="grid grid-cols-2 gap-1 border-t border-white/10 p-4 lg:hidden"
            aria-label="Mobile navigation"
          >
            {navigation.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                aria-current={active === to ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`site-nav-link min-h-11 ${active === to ? "is-active" : ""}`}
              >
                {label}
              </Link>
            ))}
            <div className="col-span-2 flex gap-2 border-t border-white/10 pt-3">
              {CONTACT.github && (
                <a
                  className="icon-link"
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github />
                </a>
              )}
              {CONTACT.linkedin && (
                <a
                  className="icon-link"
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin />
                </a>
              )}
            </div>
          </nav>
        )}
      </header>
      <main id="page-content">{children}</main>
      <footer className="site-footer">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <Link to="/" className="brand-mark">
            <span className="brand-symbol">G</span>
            <span>
              GUDA <b>ABHISHEK</b>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground">
            Dream. Build. Repeat. <span className="mx-2 text-white/20">/</span> Hyderabad, India
          </p>
          <div className="flex items-center gap-2">
            {CONTACT.github && (
              <a
                className="icon-link"
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </a>
            )}
            {CONTACT.linkedin && (
              <a
                className="icon-link"
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
