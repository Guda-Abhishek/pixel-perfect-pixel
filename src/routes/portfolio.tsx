import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Play,
  Info,
  Download,
  Github,
  Linkedin,
  Award,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import billboard from "@/assets/series-billboard.jpg";
import my1 from "@/assets/my_1.jpeg";
import my2 from "@/assets/my_2.jpeg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ViewerAvatar } from "@/components/ViewerAvatar";
import { ProjectVisual } from "@/components/ProjectVisual";
import { PortfolioContact } from "@/components/PortfolioContact";
import { AiIntro } from "@/components/AiIntro";
import { PortfolioChat } from "@/components/PortfolioChat";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import {
  MOTION_TOKENS,
  staggerContainerVariants,
  fadeInUpVariants,
  portraitRevealVariants,
} from "@/lib/motion";
import { CERTS, CONTACT, MILESTONES, MISSIONS, NAV, PROJECTS, SKILLS } from "@/lib/portfolio-data";
import { PORTFOLIO_FILES } from "@/lib/contact-schema";
import {
  parseViewer,
  projectOrder,
  sectionOrder,
  VIEWERS,
  VIEWER_FOCUS,
  type Viewer,
} from "@/lib/viewer-profiles";

export const Route = createFileRoute("/portfolio")({
  validateSearch: (search: Record<string, unknown>) => ({
    profile: parseViewer(search["profile"]),
  }),
  head: () => ({
    meta: [
      { title: "Guda Abhishek — Software Engineer & AI Developer | The Series" },
      {
        name: "description",
        content:
          "Explore Guda Abhishek's React/MERN engineering, AI interfaces, career experience, projects and certifications. Hyderabad, India.",
      },
      { property: "og:title", content: "Guda Abhishek — A Developer Original" },
      {
        property: "og:description",
        content:
          "A cinematic portfolio of full-stack engineering, Generative AI, practical projects and real-world experience.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
const synopsis =
  "Software Engineer with hands-on experience across software development and AI development lifecycles. Specializing in responsive React/MERN platforms, API integration, and bringing Generative AI and AI-agent concepts into practical product features.";
function go(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
  }
  section.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start",
  });
}

function Details({
  trigger,
  title,
  description,
  children,
}: {
  trigger: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[85svh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg p-6 sm:p-8">
        <DialogTitle className="pr-8 font-display text-3xl leading-tight">{title}</DialogTitle>
        <DialogDescription className="text-sm leading-relaxed">{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
function Bio({ trigger }: { trigger: ReactNode }) {
  return (
    <Details
      trigger={trigger}
      title="Guda Abhishek — Full Bio"
      description="Software Engineer | AI & Full-Stack Developer"
    >
      <p className="text-sm leading-relaxed">{synopsis}</p>
      <div className="border-y border-border py-4 text-sm leading-7">
        <p className="font-semibold">TKR College of Engineering & Technology</p>
        <p className="text-muted-foreground">
          B.Tech in Information Technology · 2022–2026 · CGPA 7.6
        </p>
        <p className="text-muted-foreground">Hyderabad, India</p>
      </div>
      <h3 className="text-xl font-semibold">Experience highlights</h3>
      {MISSIONS.map((m) => (
        <div key={m.id}>
          <p className="font-semibold">{m.company}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {m.role} · {m.period}
          </p>
        </div>
      ))}
      <p className="text-sm leading-relaxed">
        React.js, JavaScript, Java, Python, SQL, REST APIs, full-stack development, AI/ML,
        Generative AI, RAG, AI agents and Agile collaboration.
      </p>
      {PORTFOLIO_FILES.resume ? (
        <Button asChild className="min-h-11">
          <a href={PORTFOLIO_FILES.resume} download>
            <Download /> Download Resume
          </a>
        </Button>
      ) : (
        <div className="border-t border-border pt-4">
          <p className="mb-3 text-xs text-muted-foreground">
            A downloadable resume PDF has not been uploaded.
          </p>
          <Button asChild className="min-h-11">
            <a href={`mailto:${CONTACT.email}?subject=Request%20for%20resume`}>
              Request resume by email <ArrowRight />
            </a>
          </Button>
        </div>
      )}
    </Details>
  );
}
function ResumeButton({ compact = false }: { compact?: boolean }) {
  const button = (
    <Button
      className={`min-h-11 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${compact ? "px-2 text-xs" : "px-5"}`}
    >
      <Download />
      <span className={compact ? "hidden xl:inline" : ""}>Download Resume</span>
      {compact && <span className="xl:hidden">Resume</span>}
    </Button>
  );
  return PORTFOLIO_FILES.resume ? (
    <Button
      asChild
      className="min-h-11 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
    >
      <a href={PORTFOLIO_FILES.resume} download>
        <Download /> Download Resume
      </a>
    </Button>
  ) : (
    <Bio trigger={button} />
  );
}
function Socials({ className = "" }: { className?: string }) {
  return (
    <div className={`flex ${className}`}>
      {CONTACT.github && (
        <Button
          asChild
          variant="bare"
          size="icon"
          className="min-h-11 min-w-11 transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <Github />
          </a>
        </Button>
      )}
      {CONTACT.linkedin && (
        <Button
          asChild
          variant="bare"
          size="icon"
          className="min-h-11 min-w-11 transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Linkedin />
          </a>
        </Button>
      )}
    </div>
  );
}
function Nav({ viewer }: { viewer: Viewer }) {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate({ from: "/portfolio" });
  const current = VIEWERS.find((p) => p.id === viewer) ?? VIEWERS[3];
  useEffect(() => {
    const update = () => {
      let last = "home";
      let closest = -Infinity;
      for (const [id] of NAV) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= 160 && top > closest) {
          last = id;
          closest = top;
        }
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4)
        last = "contact";
      setActive(last);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [viewer]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="series-nav sticky inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md transition-shadow duration-300">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-3 px-5 sm:px-10">
        <Link
          to="/"
          className="series-logo flex shrink-0 items-center gap-2 text-3xl transition-transform hover:scale-[1.02] active:scale-95"
        >
          ABHISHEK
          <span className="hidden border-l border-border pl-2 font-sans text-[8px] font-normal text-muted-foreground sm:block">
            SERIES
          </span>
        </Link>
        <nav className="hidden items-center xl:flex" aria-label="Portfolio sections">
          {NAV.map(([id, label]) => (
            <Button
              key={id}
              variant="bare"
              className={`min-h-11 px-2.5 text-[11px] transition-colors duration-200 ${active === id ? "font-semibold text-foreground" : "text-muted-foreground"}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => go(id)}
            >
              {label}
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Socials className="hidden md:flex" />
          <ResumeButton compact />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="bare"
                size="auto"
                className="min-h-11 gap-2 transition-transform active:scale-95"
                aria-label={`Switch profile, currently ${current.name}`}
              >
                <ViewerAvatar viewer={viewer} compact />
                <ChevronDown className="hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>Who's watching?</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={viewer}
                onValueChange={(value) => {
                  navigate({ search: { profile: parseViewer(value) }, resetScroll: false });
                }}
              >
                {VIEWERS.map((p) => (
                  <DropdownMenuRadioItem key={p.id} value={p.id} className="min-h-11">
                    {p.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="bare"
            size="icon"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            onClick={() => setMenu(!menu)}
            className="min-h-11 min-w-11 xl:hidden transition-transform active:scale-95"
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {menu && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile portfolio sections"
          className="grid grid-cols-2 gap-1 border-t border-border p-4 xl:hidden animate-in slide-in-from-top-2 duration-200"
        >
          {NAV.map(([id, label]) => (
            <Button
              key={id}
              variant="ghost"
              aria-current={active === id ? "location" : undefined}
              onClick={() => {
                go(id);
                setMenu(false);
              }}
              className={`min-h-11 justify-start text-xs transition-colors hover:bg-secondary ${active === id ? "font-semibold text-foreground" : "text-muted-foreground"}`}
            >
              {label}
            </Button>
          ))}
          <Socials />
        </nav>
      )}
    </header>
  );
}
function Hero({ viewer }: { viewer: Viewer }) {
  return (
    <section
      id="home"
      className="billboard relative flex items-center overflow-hidden px-5 py-14 sm:px-10"
    >
      <img
        src={billboard}
        alt=""
        width={1920}
        height={1024}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="relative mx-auto flex w-full max-w-[1360px] flex-col items-center justify-between gap-10 lg:flex-row">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="max-w-2xl"
          data-motion-entrance
        >
          <motion.p
            variants={fadeInUpVariants}
            className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em]"
          >
            <span className="series-logo text-2xl">A</span> A DEVELOPER ORIGINAL{" "}
            <span className="text-muted-foreground">· 2026</span>
          </motion.p>
          <motion.h1 variants={fadeInUpVariants} className="billboard-title">
            GUDA
            <br />
            ABHISHEK
          </motion.h1>
          <motion.p variants={fadeInUpVariants} className="mt-5 text-sm font-semibold sm:text-base">
            Software Engineer | AI & Full-Stack Developer
          </motion.p>
          <motion.div
            variants={fadeInUpVariants}
            className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px]"
          >
            <span className="text-profile-green">2026 Batch</span>
            <span className="text-muted-foreground">B.Tech IT · CGPA 7.6</span>
            <span className="rounded-sm border border-border px-1.5 py-0.5 text-muted-foreground">
              MERN · PYTHON · GEN AI · OCI
            </span>
          </motion.div>
          <motion.p
            variants={fadeInUpVariants}
            className="mt-5 max-w-xl text-sm leading-7 text-foreground/85"
          >
            {synopsis}
          </motion.p>
          <motion.div variants={fadeInUpVariants} className="mt-6 flex flex-wrap gap-3">
            <Details
              title="The story so far"
              description="Guda Abhishek · Software Engineer & AI Developer"
              trigger={
                <Button className="min-h-11 px-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-neon active:translate-y-0">
                  <Play className="fill-current" /> Play Story
                </Button>
              }
            >
              <p className="text-sm leading-7">
                Building practical software experiences at the intersection of full-stack
                engineering, AI, and intelligent automation.
              </p>
              <p className="text-sm leading-7">
                From the TKR IT department website and innovation projects to frontend internships
                at Bilvantis and Paves Technologies, my work focuses on responsive interfaces,
                reliable API integration and reusable engineering.
              </p>
              <p className="text-sm leading-7">
                I explore Generative AI, RAG and AI agents while bringing careful debugging,
                collaboration and practical product thinking to every project.
              </p>
            </Details>
            <Bio
              trigger={
                <Button
                  variant="secondary"
                  className="min-h-11 px-5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Info /> View Resume / Full Bio
                </Button>
              }
            />
          </motion.div>
          <motion.div variants={fadeInUpVariants} className="mt-3">
            <AiIntro />
          </motion.div>
          <motion.div
            variants={fadeInUpVariants}
            className="mt-6 flex max-w-xl flex-wrap gap-x-3 gap-y-2 border-l-2 border-primary pl-3 text-[10px] leading-5 text-muted-foreground"
          >
            <span>{CONTACT.location}</span>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="transition-colors hover:text-accent"
            >
              {CONTACT.phone}
            </a>
            <a
              className="break-all transition-colors hover:text-accent"
              href={`mailto:${CONTACT.email}`}
            >
              {CONTACT.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Cinematic Hero Portrait (my_1.jpeg) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={portraitRevealVariants}
          className="relative shrink-0 lg:ml-auto"
          data-motion-entrance
        >
          <div className="relative mx-auto h-[320px] w-[260px] sm:h-[400px] sm:w-[320px] lg:h-[450px] lg:w-[340px] overflow-hidden rounded-2xl border border-border/80 bg-secondary/50 shadow-2xl backdrop-blur-sm group">
            <img
              src={my1}
              alt="Portrait of Guda Abhishek"
              width={1440}
              height={1440}
              fetchPriority="high"
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-md border border-border/60 bg-background/80 px-3 py-1.5 backdrop-blur-md">
              <div>
                <p className="font-display text-xs font-semibold leading-tight text-foreground">
                  GUDA ABHISHEK
                </p>
                <p className="text-[9px] text-muted-foreground">Original Profile</p>
              </div>
              <span className="flex items-center gap-1 rounded bg-primary/20 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                <Sparkles className="size-3" /> 2026
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      <span className="absolute bottom-6 right-10 hidden border-l-2 border-primary pl-3 text-[10px] text-muted-foreground md:block">
        {VIEWER_FOCUS[viewer]}
      </span>
    </section>
  );
}
function Band({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {kicker}
          </p>
          <h2 className="mb-5 text-3xl font-semibold">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
function ContentRow({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = () => {
    const el = ref.current;
    if (el)
      setEdge({
        start: el.scrollLeft < 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();
    return () => observer.disconnect();
  }, [children]);
  const scroll = (direction: number) => {
    const el = ref.current;
    el?.scrollBy({
      left: direction * (el.clientWidth * 0.8),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <div className="relative">
      <div className="mb-3 flex justify-end gap-1">
        <Button
          variant="outline"
          size="icon"
          disabled={edge.start}
          onClick={() => scroll(-1)}
          aria-label={`Previous ${label}`}
          className="min-h-11 min-w-11 transition-transform active:scale-95"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={edge.end}
          onClick={() => scroll(1)}
          aria-label={`Next ${label}`}
          className="min-h-11 min-w-11 transition-transform active:scale-95"
        >
          <ChevronRight />
        </Button>
      </div>
      <div
        ref={ref}
        onScroll={update}
        tabIndex={0}
        role="region"
        aria-label={label}
        className="series-row overflow-x-auto pb-4 pt-1 focus-visible:outline-2 focus-visible:outline-ring"
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            scroll(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <StaggerContainer className="flex w-max gap-4" staggerDelay={MOTION_TOKENS.stagger.tight}>
          {children}
        </StaggerContainer>
      </div>
    </div>
  );
}
function Tags({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-sm border border-border bg-secondary px-2 py-1 text-[10px] text-muted-foreground"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
function Projects({ viewer }: { viewer: Viewer }) {
  return (
    <Band id="projects" title="Top Originals — Featured Projects" kicker="IDEAS INTO INTERFACES">
      <ContentRow label="featured projects">
        {projectOrder(viewer).map((index) => {
          const p = PROJECTS[index];
          if (!p) return null;
          return (
            <StaggerItem key={p.title}>
              <Details
                title={p.title}
                description={p.badge}
                trigger={
                  <Button
                    variant="bare"
                    size="auto"
                    className="series-card group block w-[280px] shrink-0 overflow-hidden rounded border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-muted-foreground/50 hover:shadow-lg sm:w-[310px]"
                  >
                    <div className="relative overflow-hidden">
                      <ProjectVisual index={index === 3 ? 2 : index} />
                      <span className="absolute left-3 top-3 rounded-sm bg-background/90 px-2 py-1 text-[9px] font-bold text-primary">
                        A ORIGINAL
                      </span>
                    </div>
                    <div className="flex h-40 flex-col px-4 pb-4">
                      <p className="text-[9px] text-muted-foreground">{p.badge}</p>
                      <h3 className="mt-2 text-xl font-semibold leading-tight transition-colors group-hover:text-primary">
                        {p.title}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <span className="text-[10px] text-muted-foreground">
                          {p.tech.slice(0, 3).join(" · ")}
                        </span>
                        <Info className="text-muted-foreground transition-transform group-hover:scale-110" />
                      </div>
                    </div>
                  </Button>
                }
              >
                <ProjectVisual index={index === 3 ? 2 : index} />
                <p className="text-sm leading-7">{p.overview}</p>
                <h3 className="text-xl font-semibold">The challenge</h3>
                <p className="text-sm leading-7 text-muted-foreground">{p.problem}</p>
                <h3 className="text-xl font-semibold">My contribution & context</h3>
                <p className="text-sm leading-7 text-muted-foreground">{p.role}</p>
                <Tags items={p.tech} />
                {index !== 2 && (
                  <>
                    <h3 className="text-xl font-semibold">
                      {index < 2 ? "Conceptual flow" : "Implementation flow"}
                    </h3>
                    <p className="text-sm text-muted-foreground">{p.flow.join(" → ")}</p>
                  </>
                )}
              </Details>
            </StaggerItem>
          );
        })}
      </ContentRow>
    </Band>
  );
}
function Experience() {
  return (
    <Band id="experience" title="Episodes & Career Journey" kicker="HANDS-ON EXPERIENCE">
      <ContentRow label="career episodes">
        {MISSIONS.map((m, index) => (
          <StaggerItem key={m.id}>
            <Details
              title={m.company}
              description={`${m.role} · ${m.period}${m.location ? ` · ${m.location}` : ""}`}
              trigger={
                <Button
                  variant="bare"
                  size="auto"
                  className="series-card group block w-[300px] shrink-0 overflow-hidden rounded border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-muted-foreground/50 hover:shadow-lg sm:w-[420px]"
                >
                  <div className="relative flex h-32 items-center justify-between bg-secondary px-6 overflow-hidden">
                    <span className="font-display text-7xl font-bold text-foreground/15 transition-transform duration-300 group-hover:scale-105">
                      0{index + 1}
                    </span>
                    <BriefcaseBusiness className="h-10 w-10 text-muted-foreground transition-transform duration-300 group-hover:rotate-6" />
                    <span className="absolute bottom-3 left-6 text-[9px] text-primary">
                      EPISODE {index + 1}
                    </span>
                  </div>
                  <div className="h-40 p-5">
                    <p className="text-[10px] text-muted-foreground">{m.period}</p>
                    <h3 className="mt-2 text-2xl font-semibold transition-colors group-hover:text-primary">
                      {m.company}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{m.role}</p>
                    <p className="mt-3 text-[10px] text-foreground">
                      {index === 0
                        ? "Enterprise finance & employee interfaces"
                        : "AI interfaces · approximately 25% lower delays"}
                    </p>
                  </div>
                </Button>
              }
            >
              {m.projects.map((p) => (
                <div key={p.name}>
                  <h3 className="mb-3 text-xl font-semibold">{p.name}</h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                    {p.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <Tags items={m.tags} />
            </Details>
          </StaggerItem>
        ))}
      </ContentRow>
    </Band>
  );
}
function Skills({ viewer }: { viewer: Viewer }) {
  return (
    <Band id="skills" title="My Skill Universe" kicker="THE TOOLS BEHIND THE STORY">
      <Tabs key={viewer} defaultValue={viewer === "ai" ? "2" : viewer === "developer" ? "1" : "0"}>
        <div className="overflow-x-auto pb-3">
          <TabsList className="h-auto min-w-max justify-start gap-1 bg-transparent p-0">
            {SKILLS.map((s, i) => (
              <TabsTrigger
                key={s.cat}
                value={String(i)}
                className="min-h-11 rounded-sm border border-border px-4 text-[11px] transition-all duration-200 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {s.cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {SKILLS.map((s, i) => (
          <TabsContent key={s.cat} value={String(i)} className="animate-in fade-in duration-200">
            <p className="mb-4 text-xs text-muted-foreground">{s.desc}</p>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {s.items.map((item) => (
                <li
                  key={item}
                  className="flex min-h-16 items-center gap-3 rounded border border-border bg-card px-4 py-3 text-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50"
                >
                  <Code2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </Band>
  );
}
function Certifications({ viewer }: { viewer: Viewer }) {
  const certs =
    viewer === "ai"
      ? [...CERTS].sort(
          (a, b) => Number(!/AI|Generative/.test(a[0])) - Number(!/AI|Generative/.test(b[0])),
        )
      : CERTS;
  return (
    <Band
      id="certifications"
      title="Certified & Awards"
      kicker="LEARNING. LEADERSHIP. RECOGNITION."
    >
      <StaggerContainer className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {certs.map(([name, issuer]) => (
          <StaggerItem key={name}>
            <div className="flex min-h-32 gap-3 rounded border border-gold/20 bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/50">
              <Award className="mt-1 h-6 w-6 shrink-0 text-gold" />
              <div>
                <h3 className="font-sans text-sm font-semibold leading-6">{name}</h3>
                <p className="mt-2 text-[10px] text-muted-foreground">{issuer}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <h3 id="achievements" className="mb-4 mt-8 text-2xl font-semibold">
        Beyond the code
      </h3>
      <StaggerContainer className="grid gap-4 sm:grid-cols-2">
        {MILESTONES.map(([period, title, desc]) => (
          <StaggerItem key={title}>
            <div className="border-l-2 border-gold/40 pl-4 transition-all duration-200 hover:border-gold">
              <p className="text-[10px] text-gold">{period}</p>
              <h4 className="mt-1 text-sm font-semibold">{title}</h4>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Band>
  );
}
function About() {
  return (
    <Band id="about" title="Behind the Series" kicker="THE DEVELOPER DOSSIER">
      <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
        {/* Cinematic Secondary Portrait (my_2.jpeg) */}
        <Reveal direction="left" distance={MOTION_TOKENS.distance.subtle}>
          <div className="group relative mx-auto h-64 w-52 overflow-hidden rounded-xl border border-border bg-secondary shadow-lg">
            <img
              src={my2}
              alt="Portrait of Guda Abhishek in studio lighting"
              width={1440}
              height={1440}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-75" />
            <span className="absolute bottom-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              DOSSIER · 2026
            </span>
          </div>
        </Reveal>
        <Reveal direction="right" distance={MOTION_TOKENS.distance.subtle} delay={0.08}>
          <div>
            <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
              I'm a software engineer focused on React.js and full-stack development, working with
              JavaScript, Java, Python and SQL. I integrate REST APIs, build reusable components,
              and explore machine learning, Generative AI, RAG and AI agents — applying them
              practically across the software development lifecycle. I enjoy Agile collaboration and
              careful debugging.
            </p>
            <div className="mt-5 flex flex-wrap gap-5 text-xs">
              <span className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-gold" />
                B.Tech IT · TKR College · 2022–2026 · CGPA 7.6
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Hyderabad, India
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <ResumeButton />
              <Button
                variant="outline"
                onClick={() => go("contact")}
                className="min-h-11 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Contact Me <ArrowRight />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
function Portfolio() {
  const { profile } = Route.useSearch();
  const sections: Record<string, ReactNode> = {
    projects: <Projects viewer={profile} />,
    experience: <Experience />,
    skills: <Skills viewer={profile} />,
    certifications: <Certifications viewer={profile} />,
    about: <About />,
  };
  return (
    <div className="min-h-screen bg-background">
      <Nav viewer={profile} />
      <Hero viewer={profile} />
      <div className="mx-auto flex max-w-[1360px] items-center gap-2 px-5 pb-2 pt-3 sm:px-10">
        <ViewerAvatar viewer={profile} compact />
        <p className="text-[10px] text-muted-foreground">{VIEWER_FOCUS[profile]}</p>
      </div>
      {sectionOrder(profile).map((id) => (
        <div key={id}>{sections[id]}</div>
      ))}
      <PortfolioContact />
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-6 text-[10px] leading-5 text-muted-foreground sm:px-10">
        <span>© 2026 Guda Abhishek. All rights reserved. Netflix-inspired portfolio concept.</span>
        <Button
          variant="bare"
          className="min-h-11 text-xs transition-transform active:scale-95"
          onClick={() => go("home")}
        >
          Back to top <ArrowUp />
        </Button>
      </footer>
      <PortfolioChat />
    </div>
  );
}
