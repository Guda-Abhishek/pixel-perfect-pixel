import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent, type ReactNode, type MouseEvent } from "react";
import hero from "@/assets/developer-constellation.jpg";
import { DeveloperMark } from "@/components/DeveloperMark";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ChevronDown, Menu, X, Copy, Mail, FileDown, Code2, Cpu, Database, Cloud, GitBranch, Braces, Brain } from "lucide-react";
import { contactSchema, PORTFOLIO_FILES } from "@/lib/contact-schema";
import { Particles } from "@/components/Particles";
import { CERTS, CONTACT, MILESTONES, MISSIONS, NAV, PROJECTS, SKILLS } from "@/lib/portfolio-data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Guda Abhishek — Software Engineer | AI & Full-Stack Developer" },
      { name: "description", content: "Experience, projects, skills and certifications of Guda Abhishek, AI & Full-Stack Developer from Hyderabad." },
      { property: "og:title", content: "Guda Abhishek — Developer Command Center" },
      { property: "og:description", content: "Mission log, projects, skill tree and contact terminal of Guda Abhishek." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="relative scroll-mt-24 px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal} className="mb-9">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">{kicker}</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
          <div className="mt-4 h-0.5 w-20 bg-neon" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const navigatingUntil = useRef(0);
  useEffect(() => {
    const update = () => {
      if (performance.now() < navigatingUntil.current) return;
      let current = "home";
      for (const [id] of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10) current = "contact";
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  const go = (id: string) => { navigatingUntil.current = performance.now() + 1500; setActive(id); setOpen(false); scrollToSection(id); };
  useEffect(() => { const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 glass border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-display text-lg font-bold text-neon">GA://</Link>
        <nav aria-label="Portfolio sections" className="hidden gap-1 lg:flex">
          {NAV.map(([id, label]) => (
            <Button variant="bare" size="auto" key={id} aria-current={active === id ? "location" : undefined} onClick={() => go(id)} className={`relative min-h-11 px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {active === id && <motion.span layoutId="nav-ind" className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-neon shadow-neon" />}
              {label}
            </Button>
          ))}
        </nav>
        <Button variant="bare" size="auto" aria-label={open ? "Close menu" : "Open menu"} aria-controls="mobile-navigation" className="min-h-11 min-w-11 text-accent lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-navigation" aria-label="Mobile portfolio sections" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden lg:hidden">
            {NAV.map(([id, label]) => (
              <Button variant="bare" size="auto" key={id} aria-current={active === id ? "location" : undefined} onClick={() => go(id)} className={`block min-h-11 w-full px-6 py-3 text-left font-mono text-xs uppercase tracking-widest ${active === id ? "text-accent" : "text-muted-foreground"}`}>
                {label}
              </Button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const go = scrollToSection;
  const reduced = useReducedMotion();
  return (
    <section id="home" ref={ref} className="relative flex hero-section items-center overflow-hidden px-6 pb-20 pt-32 md:px-12">
      <motion.img style={{ y: reduced ? 0 : y }} src={hero} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <Particles count={10} />
      <div className="relative mx-auto grid w-full max-w-6xl items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <p className="mb-6 font-mono text-xs uppercase text-accent">Hyderabad, India / Developer Portfolio</p>
          <h1 className="hero-name text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">GUDA<br /><span className="text-neon">ABHISHEK</span></h1>
          <p className="mt-5 max-w-lg font-mono text-sm text-foreground">Software Engineer | AI & Full-Stack Developer</p>
          <p className="mt-6 max-w-xl text-lg text-foreground/80">
            Building practical software experiences at the intersection of full-stack engineering, AI, and intelligent automation.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="bare" size="auto" onClick={() => go("projects")} className="rounded-md bg-neon px-6 py-3 font-display text-xs font-bold text-primary-foreground transition-transform hover:scale-105 hover:shadow-neon">EXPLORE MY WORK</Button>
            <Button variant="bare" size="auto" onClick={() => go("experience")} className="rounded-md glass px-6 py-3 font-display text-xs font-bold transition-all hover:border-primary hover:shadow-neon">VIEW EXPERIENCE</Button>
            <Button variant="bare" size="auto" onClick={() => go("contact")} className="rounded-md border border-accent/50 px-6 py-3 font-display text-xs font-bold text-accent transition-all hover:bg-accent/10">CONTACT ME</Button>
          </div>
        </motion.div>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5 font-mono text-xs text-muted-foreground">
          <span>REACT / FULL-STACK</span><span>AI / AUTOMATION</span><span>INTERFACES / APIs</span>
        </div>
      </div>
      <Button variant="bare" size="auto" onClick={() => go("about")} aria-label="Explore about section" className="absolute bottom-5 left-6 min-h-11 gap-3 font-mono text-xs text-muted-foreground md:left-12"><ArrowDown /> Developer dossier</Button>
    </section>
  );
}

function About() {
  const stats = [["Name", "Guda Abhishek"], ["Role", "Software Engineer | AI & Full-Stack Developer"], ["Location", "Hyderabad, India"], ["Education", "B.Tech in Information Technology, TKR College of Engineering & Technology"], ["Education period", "2022–2026"], ["CGPA", "7.6"]];
  const timeline = [["2022", "Began B.Tech IT · joined IEEE & student leadership"], ["2023", "SIH marketplace & IT Department website"], ["2024", "MSME Innovation Programme recognition"], ["2025", "AI Intern at Bilvantis Technologies"], ["2026", "Frontend Intern at Paves Technologies · Graduation"]];
  return (
    <Section id="about" kicker="Character Profile" title="About Me">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <motion.div {...reveal} className="relative mx-auto w-64">
          <DeveloperMark className="w-full rounded-lg border border-border" />
          <p className="mt-4 text-center font-mono text-xs text-muted-foreground">GUDA ABHISHEK / ENGINEER</p>
        </motion.div>
        <div>
          <motion.p {...reveal} className="text-lg leading-relaxed text-foreground/85">
            I'm a software engineer focused on React.js and full-stack development, working with JavaScript, Java, Python and SQL. I integrate REST APIs, build reusable components, and explore AI — machine learning, generative AI, RAG and AI agents — applying them practically across the software development lifecycle. I enjoy Agile collaboration and careful debugging.
          </motion.p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {stats.map(([k, v], i) => (
              <motion.div key={k} {...reveal} transition={{ delay: i * 0.06, duration: 0.5 }} className="glass rounded-lg p-4">
                <p className="font-mono text-[10px] uppercase text-accent">{k}</p>
                <p className="mt-1 text-sm">{v}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-5">
        {timeline.map(([y, t], i) => (
          <motion.div key={y} {...reveal} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative border-t-2 border-primary/40 pt-4">
            <span className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-primary shadow-neon" />
            <p className="font-display text-lg text-primary">{y}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  const [open, setOpen] = useState<string | null>("01");
  return (
    <Section id="experience" kicker="Mission Log" title="Experience">
      <div className="relative space-y-6 border-l border-border pl-8">
        {MISSIONS.map((m) => (
          <motion.div key={m.id} {...reveal} className="relative">
            <span className="absolute -left-[37px] top-6 h-4 w-4 rounded-full border-2 border-primary bg-background shadow-neon" />
            <Button variant="bare" size="auto" onClick={() => setOpen(open === m.id ? null : m.id)} aria-expanded={open === m.id} aria-controls={`mission-${m.id}`} className="glass block h-auto w-full rounded-lg p-6 text-left transition-all hover:border-primary/60">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-accent">MISSION {m.id} · {m.period.includes("Present") ? "IN PROGRESS" : "COMPLETED"}</p>
                  <h3 className="mt-2 flex items-center gap-3 text-xl font-bold">{m.company}<ChevronDown className={`transition-transform ${open === m.id ? "rotate-180" : ""}`} /></h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{m.period}{m.location && ` · ${m.location}`}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.tags.map((t) => <span key={t} className="rounded border border-primary/30 px-2 py-0.5 font-mono text-[10px] text-primary">{t}</span>)}
              </div>
            </Button>
            <AnimatePresence>
              {open === m.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div id={`mission-${m.id}`} className="space-y-6 px-6 pt-6">
                    {m.projects.map((p) => (
                      <div key={p.name}>
                        <p className="font-display text-sm text-foreground">{p.name}</p>
                        <ul className="mt-3 space-y-2">
                          {p.points.map((pt) => <li key={pt} className="flex gap-3 text-sm text-foreground/80"><span className="text-accent">▸</span>{pt}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

const hueClass = {
  primary: { text: "text-primary", border: "hover:border-primary", glow: "bg-primary/30" },
  accent: { text: "text-accent", border: "hover:border-accent", glow: "bg-accent/30" },
  violet: { text: "text-violet", border: "hover:border-violet", glow: "bg-violet/30" },
};

function ProjectCard({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  const h = hueClass[p.hue];
  const reduced = useReducedMotion();
  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -8, y: ((e.clientX - r.left) / r.width - 0.5) * 8 });
  };
  return (
    <motion.div {...reveal} transition={{ delay: i * 0.1, duration: 0.6 }} style={{ perspective: 1000 }}>
      <div onMouseMove={move} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }} className={`glass relative flex h-full flex-col overflow-hidden rounded-lg p-6 transition-[transform,border-color] duration-200 ${h.border}`}>
        <ProjectVisual index={i} />
        <p className={`relative font-mono text-xs ${h.text}`}>PROJECT / 0{i + 1}</p>
        <p className={`relative mt-2 font-mono text-[10px] uppercase tracking-widest ${h.text}`}>{p.badge}</p>
        <h3 className="relative mt-2 text-xl font-bold leading-snug">{p.title}</h3>
        <p className="relative mt-3 text-sm text-foreground/75">{p.overview}</p>
        <div className="relative mt-5 flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
          {p.flow.map((f, k) => (
            <span key={f} className="flex items-center gap-1.5">
              <span className="rounded bg-muted px-2 py-1">{f}</span>
              {k < p.flow.length - 1 && <span className={h.text}>→</span>}
            </span>
          ))}
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} id={`project-${i}`} className="relative overflow-hidden">
              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Problem</p>
              <p className="mt-1 text-sm">{p.problem}</p>
              <p className="mt-4 text-xs font-semibold uppercase text-muted-foreground">Solution</p>
              <p className="mt-1 text-sm">{p.overview}</p>
              <p className="mt-4 text-xs font-semibold uppercase text-muted-foreground">My contribution</p>
              <p className="mt-1 text-sm">{p.role}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative mt-auto pt-6">
          <div className="flex flex-wrap gap-1.5">
            {p.tech.map((t) => <span key={t} className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{t}</span>)}
          </div>
          <Button variant="bare" size="auto" aria-expanded={open} aria-controls={`project-${i}`} onClick={() => setOpen(!open)} className={`mt-5 min-h-11 font-mono text-xs uppercase tracking-widest ${h.text}`}>{open ? "− Hide details" : "+ Mission details"}</Button>
        </div>
      </div>
    </motion.div>
  );
}

const skillIcons = [Braces, Code2, Cpu, Brain, Database, Cloud, GitBranch];
function Skills() {
  const [sel, setSel] = useState(0);
  const s = SKILLS[sel];
  if (!s) return null;
  return (
    <Section id="skills" kicker="Connected Capabilities" title="Skill Tree">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="skill-tree relative grid grid-cols-2 gap-4 py-5 sm:grid-cols-3" role="group" aria-label="Skill categories">
          <svg aria-hidden="true" viewBox="0 0 600 430" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full fill-none stroke-primary/30 sm:block"><path d="M100 70h400M100 70l200 140 200-140M100 210h400M100 210l200 140 200-140M300 70v280" /></svg>
          {SKILLS.map((c, i) => { const Icon = skillIcons[i] ?? Code2; return (
            <Button variant="portfolio" size="auto" key={c.cat} onClick={() => setSel(i)} aria-pressed={sel === i} aria-controls="skill-details" className={`skill-node relative flex min-h-28 flex-col gap-3 px-3 py-4 text-center text-xs ${sel === i ? "border-primary bg-secondary shadow-neon" : "text-muted-foreground"}`}>
              <Icon className={sel === i ? "text-accent" : "text-primary"} />
              {c.cat}
            </Button>
          ); })}
        </div>
        <div id="skill-details" className="glass relative min-h-80 overflow-hidden rounded-lg p-6 sm:p-8" aria-live="polite" aria-atomic="true">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative">
            <p className="font-mono text-xs text-accent">CAPABILITY / {String(sel + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 font-display text-xl">{s.cat}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {s.items.map(it => <li key={it} className="rounded border border-primary/30 bg-background/60 px-3 py-2 text-sm">{it}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setFeedback("");
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach(issue => { const key = String(issue.path[0]); if (!next[key]) next[key] = issue.message; });
      setErrors(next);
      return;
    }
    setErrors({});
    const data = result.data;
    const body = `${data.message}\n\n— ${data.name} (${data.email})`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    setFeedback("Email draft prepared. Send it in your email app; no message has been sent from this website.");
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(CONTACT.email); setCopied(true); setCopyFeedback("Email copied to clipboard."); }
    catch { setCopyFeedback("Could not copy. Select the email address to copy it manually."); }
  };
  const field = "w-full rounded-md border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground";
  return (
    <Section id="contact" kicker="Establish Connection" title="Contact">
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div {...reveal} className="space-y-5 py-4 font-mono text-sm">
          <p className="text-accent">&gt; open_channel --to abhishek</p>
          <div className="flex flex-wrap items-center justify-between gap-2"><span className="min-w-0 break-all"><span className="text-muted-foreground">email:</span> <a href={`mailto:${CONTACT.email}`} className="hover:text-accent">{CONTACT.email}</a></span><Button variant="bare" size="auto" onClick={copy} aria-label="Copy email" className="min-h-11 min-w-11 rounded border border-border px-2 py-1 text-xs hover:border-accent hover:text-accent"><Copy />{copied ? "Copied" : "Copy"}</Button></div>
          <p><span className="text-muted-foreground">phone:</span> <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-accent">{CONTACT.phone}</a></p>
          <p><span className="text-muted-foreground">location:</span> {CONTACT.location}</p>
          <p role="status" className="text-xs text-accent">{copyFeedback}</p>
          <div className="flex flex-wrap gap-3 pt-4">
            {CONTACT.linkedin && <Button variant="portfolio" asChild><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></Button>}
            {CONTACT.github && <Button variant="portfolio" asChild><a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a></Button>}
            {PORTFOLIO_FILES.resume ? <Button variant="portfolio" asChild><a href={PORTFOLIO_FILES.resume} download><FileDown /> Resume</a></Button> : <p className="text-xs text-muted-foreground">Resume · Not yet provided</p>}
          </div>
        </motion.div>
        <motion.form {...reveal} onSubmit={submit} noValidate className="glass space-y-4 rounded-lg p-5 sm:p-8">
          {(["name", "email", "subject"] as const).map((k) => (
            <div key={k}>
              <label htmlFor={`contact-${k}`} className="mb-2 block text-xs font-medium capitalize">{k}</label>
              <input id={`contact-${k}`} aria-invalid={Boolean(errors[k])} aria-describedby={errors[k] ? `error-${k}` : undefined} required autoComplete={k === "subject" ? "off" : k} aria-label={k} placeholder={k.charAt(0).toUpperCase() + k.slice(1)} type={k === "email" ? "email" : "text"} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className={field} maxLength={k === "subject" ? 150 : k === "email" ? 255 : 100} />
              {errors[k] && <p id={`error-${k}`} role="alert" className="mt-1 text-xs text-destructive">{errors[k]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-xs font-medium">Message</label>
            <textarea id="contact-message" required aria-invalid={Boolean(errors["message"])} aria-describedby={errors["message"] ? "error-message" : undefined} aria-label="message" placeholder="Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={field} maxLength={2000} />
            {errors["message"] && <p id="error-message" role="alert" className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
          </div>
          <Button variant="bare" size="auto" type="submit" className="w-full rounded-md bg-neon py-3 font-display text-xs font-bold text-primary-foreground transition-shadow hover:shadow-neon"><Mail /> PREPARE EMAIL</Button>
          <p className="text-xs leading-relaxed text-muted-foreground">Opens your email app. Messages are not delivered by this website.</p>
          <p role="status" className="text-xs leading-relaxed text-accent">{feedback}</p>
        </motion.form>
      </div>
    </Section>
  );
}

function Portfolio() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="relative min-h-screen bg-background">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Section id="projects" kicker="Select Your Mission" title="Projects">
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
      </Section>
      <Skills />
      <Section id="certifications" kicker="Achievements Collection" title="Certifications">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CERTS.map(([n, by], i) => (
            <motion.div key={n} {...reveal} transition={{ delay: i * 0.06, duration: 0.5 }} whileHover={{ y: -6, rotate: -1 }} className="group relative rounded-lg border border-border hover:border-accent">
              <div className="flex h-full flex-col rounded-lg bg-background p-5 transition-colors group-hover:bg-secondary">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 font-display text-sm text-accent">✦</span>
                <p className="mt-4 font-semibold leading-snug">{n}</p>
                <p className="mt-auto pt-3 font-mono text-[11px] text-muted-foreground">{by}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      <Section id="achievements" kicker="Progression" title="Achievements & Leadership">
        <div className="grid gap-5 md:grid-cols-2">
          {MILESTONES.map(([when, t, d], i) => (
            <motion.div key={t} {...reveal} transition={{ delay: i * 0.08, duration: 0.5 }} className="glass flex gap-5 rounded-lg p-6 transition-shadow hover:shadow-violet">
              <span className="font-display text-3xl font-black text-violet">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-mono text-[11px] text-accent">{when}</p>
                <p className="mt-1 font-semibold">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      <Contact />
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-8 font-mono text-xs text-muted-foreground md:px-12"><span>© {new Date().getFullYear()} Guda Abhishek</span><Button variant="bare" size="auto" onClick={() => scrollToSection("home")} className="min-h-11">Back to top <ArrowUp /></Button></footer>
    </motion.div>
  );
}
