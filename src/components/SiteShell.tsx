import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { PortfolioChat } from "@/components/PortfolioChat";
import { SocialLinks, ResumeAction } from "@/components/SitePrimitives";
import { CONTACT } from "@/lib/portfolio-data";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/skills", "Skills"],
  ["/projects", "Projects"],
  ["/experience", "Experience"],
  ["/certifications", "Certifications"],
  ["/education", "Education"],
  ["/contact", "Contact"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setMenu(false);
  }, [path]);

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);

  if (
    path === "/portfolio" ||
    path === "/profiles" ||
    path.startsWith("/people/") ||
    path.startsWith("/api/")
  ) {
    return children;
  }

  return (
    <div className="site-shell">
      <a
        href="#page-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-4"
      >
        Skip to content
      </a>
      <header className="site-nav">
        <div className="site-container site-nav-inner flex min-h-[88px] items-center justify-between gap-5">
          <Link
            to="/"
            className="site-nav-brand flex shrink-0 items-center"
            aria-label="Guda Abhishek home"
          >
            <span className="brand-monogram">
              GA<span className="text-primary">.</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="site-primary-nav hidden items-center lg:flex">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                activeProps={{ className: "site-nav-link-active" }}
                className="site-nav-link"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="site-nav-actions flex shrink-0 items-center gap-2">
            <Button asChild variant="bare" className="site-profile-link hidden sm:inline-flex">
              <Link to="/profiles">Choose profile</Link>
            </Button>
            <Button asChild variant="outline" className="site-nav-talk hidden xl:inline-flex">
              <Link to="/contact">
                Let&apos;s talk <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="site-nav-menu min-h-11 min-w-11 lg:hidden"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              aria-controls="mobile-navigation"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {menu && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="site-container site-mobile-nav grid grid-cols-2 gap-2 py-4 lg:hidden"
          >
            {links.map(([to, label]) => (
              <Button key={to} asChild variant="ghost" className="min-h-11 justify-start">
                <Link
                  to={to}
                  activeOptions={{ exact: to === "/" }}
                  activeProps={{ className: "text-violet" }}
                >
                  {label}
                </Link>
              </Button>
            ))}
            <Button asChild variant="ghost" className="min-h-11 justify-start">
              <Link to="/profiles">Choose profile</Link>
            </Button>
          </nav>
        )}
      </header>

      <div id="page-content">{children}</div>

      <footer className="site-footer">
        <div className="site-container">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div>
              <p className="font-mono text-xs text-violet">THE NEXT CHAPTER</p>
              <h2 className="mt-3 text-4xl font-semibold">Let&apos;s build something meaningful.</h2>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-4 inline-block break-all text-sm text-muted-foreground hover:text-foreground"
              >
                {CONTACT.email} <ArrowUpRight className="inline size-4" />
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              <SocialLinks />
              <ResumeAction />
            </div>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-[10px] leading-5 text-muted-foreground">
            <p>© 2026 Guda Abhishek. All rights reserved. Netflix-inspired portfolio concept.</p>
            <Link to="/portfolio" search={{ profile: "guest" }}>
              Explore The Series <ArrowUpRight className="inline size-3" />
            </Link>
          </div>
        </div>
      </footer>
      <PortfolioChat />
    </div>
  );
}
