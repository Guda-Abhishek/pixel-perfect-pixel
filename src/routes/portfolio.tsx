import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent, type ReactNode, type MouseEvent } from "react";
import hero from "@/assets/hero.jpg";
import avatar from "@/assets/avatar.jpg";
import { Particles } from "@/components/Particles";
import { CERTS, CONTACT, MILESTONES, MISSIONS, NAV, PROJECTS, SKILLS } from "@/lib/portfolio-data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Guda Abhishek — Software Engineer | AI & Full-Stack Developer" },
      { name: "description", content: "Experience, projects, skills and certifications of Guda Abhishek, AI & Full-Stack Developer from Hyderabad." },
      { property: "og:title", content: "Guda Abhishek — Developer Command Center" },
      { property: "og:description", content: "Mission log, projects, skill tree and contact terminal of Guda Abhishek." },
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

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="relative scroll-mt-24 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal} className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">{kicker}</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h2>
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
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <header className="fixed inset-x-0 top-0 z-50 glass border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-display text-lg font-bold text-neon">GA://</Link>
        <nav className="hidden gap-1 lg:flex">
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className={`relative px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {active === id && <motion.span layoutId="nav-ind" className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-neon shadow-neon" />}
              {label}
            </button>
          ))}
        </nav>
        <button className="font-mono text-xs uppercase tracking-widest text-accent lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden lg:hidden">
            {NAV.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className={`block w-full px-6 py-3 text-left font-mono text-xs uppercase tracking-widest ${active === id ? "text-accent" : "text-muted-foreground"}`}>
                {label}
              </button>
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
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16 md:px-12">
      <motion.img style={{ y }} src={hero} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <Particles count={20} />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" /> Developer Profile: Online
          </div>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">GUDA <span className="text-neon">ABHISHEK</span></h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">Software Engineer | AI & Full-Stack Developer</p>
          <p className="mt-6 max-w-xl text-lg text-foreground/80">
            Building practical software experiences at the intersection of full-stack engineering, AI, and intelligent automation.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => go("projects")} className="rounded-md bg-neon px-6 py-3 font-display text-xs font-bold tracking-widest text-primary-foreground transition-transform hover:scale-105 hover:shadow-neon">EXPLORE MY WORK</button>
            <button onClick={() => go("experience")} className="rounded-md glass px-6 py-3 font-display text-xs font-bold tracking-widest transition-all hover:border-primary hover:shadow-neon">VIEW EXPERIENCE</button>
            <button onClick={() => go("contact")} className="rounded-md border border-accent/50 px-6 py-3 font-display text-xs font-bold tracking-widest text-accent transition-all hover:bg-accent/10">CONTACT ME</button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="glass rounded-xl p-6 shadow-violet">
          <p className="mb-4 font-mono text-xs text-muted-foreground">// focus_areas</p>
          {["Full-stack development", "AI and machine learning", "React.js and API integration", "Enterprise frontend development"].map((t, i) => (
            <motion.div key={t} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.12 }} className="flex items-center gap-3 border-b border-border py-3 last:border-0">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              <span className="text-sm">{t}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const stats = [["Name", "Guda Abhishek"], ["Role", "Software Engineer | AI & Full-Stack Developer"], ["Location", "Hyderabad, India"], ["Education", "B.Tech in Information Technology, TKR College of Engineering & Technology"], ["Graduation", "2026"], ["CGPA", "7.6"]];
  const timeline = [["2022", "Began B.Tech IT · joined IEEE & student leadership"], ["2023", "SIH marketplace & IT Department website"], ["2024", "MSME Innovation Programme recognition"], ["2025", "AI Intern at Bilvantis Technologies"], ["2026", "Frontend Intern at Paves Technologies · Graduation"]];
  return (
    <Section id="about" kicker="Character Profile" title="About Me">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        <motion.div {...reveal} className="relative mx-auto w-64">
          <div className="absolute -inset-1 rounded-xl bg-neon opacity-60 blur-md" />
          <img src={avatar} alt="Guda Abhishek" loading="lazy" width={1024} height={1024} className="relative rounded-xl" />
        </motion.div>
        <div>
          <motion.p {...reveal} className="text-lg leading-relaxed text-foreground/85">
            I'm a software engineer focused on React.js and full-stack development, working with JavaScript, Java, Python and SQL. I integrate REST APIs, build reusable components, and explore AI — machine learning, generative AI, RAG and AI agents — applying them practically across the software development lifecycle. I enjoy Agile collaboration and careful debugging.
          </motion.p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {stats.map(([k, v], i) => (
              <motion.div key={k} {...reveal} transition={{ delay: i * 0.06, duration: 0.5 }} className="glass rounded-lg p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{k}</p>
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
            <button onClick={() => setOpen(open === m.id ? null : m.id)} aria-expanded={open === m.id} className="glass w-full rounded-xl p-6 text-left transition-all hover:border-primary/60">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-accent">MISSION {m.id} · COMPLETED{m.period.includes("Present") ? " / ACTIVE" : ""}</p>
                  <h3 className="mt-2 text-xl font-bold">{m.company}</h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{m.period}{m.location && ` · ${m.location}`}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.tags.map((t) => <span key={t} className="rounded border border-primary/30 px-2 py-0.5 font-mono text-[10px] text-primary">{t}</span>)}
              </div>
            </button>
            <AnimatePresence>
              {open === m.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="space-y-6 px-6 pt-6">
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
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -8, y: ((e.clientX - r.left) / r.width - 0.5) * 8 });
  };
  return (
    <motion.div {...reveal} transition={{ delay: i * 0.1, duration: 0.6 }} style={{ perspective: 1000 }}>
      <div onMouseMove={move} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }} className={`glass relative flex h-full flex-col overflow-hidden rounded-xl p-6 transition-[transform,border-color] duration-200 ${h.border}`}>
        <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${h.glow}`} />
        <p className={`relative font-display text-6xl font-black opacity-20 ${h.text}`}>0{i + 1}</p>
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
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="relative overflow-hidden">
              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Problem</p>
              <p className="mt-1 text-sm">{p.problem}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">My role</p>
              <p className="mt-1 text-sm">{p.role}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative mt-auto pt-6">
          <div className="flex flex-wrap gap-1.5">
            {p.tech.map((t) => <span key={t} className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{t}</span>)}
          </div>
          <button onClick={() => setOpen(!open)} className={`mt-5 font-mono text-xs uppercase tracking-widest ${h.text}`}>{open ? "− Hide details" : "+ Mission details"}</button>
        </div>
      </div>
    </motion.div>
  );
}

function Skills() {
  const [sel, setSel] = useState(0);
  const s = SKILLS[sel]!;
  return (
    <Section id="skills" kicker="Upgrade Tree" title="Skills">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="flex flex-col gap-2">
          {SKILLS.map((c, i) => (
            <button key={c.cat} onClick={() => setSel(i)} className={`relative flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-all ${sel === i ? "glass border-primary text-foreground shadow-neon" : "text-muted-foreground hover:text-foreground"}`}>
              <span className={`h-2.5 w-2.5 rotate-45 border ${sel === i ? "border-primary bg-primary" : "border-muted-foreground"}`} />
              {c.cat}
            </button>
          ))}
        </div>
        <div className="glass relative min-h-[320px] overflow-hidden rounded-xl p-8">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <AnimatePresence mode="wait">
            <motion.div key={s.cat} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative">
              <p className="font-display text-xl">{s.cat}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {s.items.map((it, i) => (
                  <motion.span key={it} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }} className="relative rounded-full border border-primary/40 bg-background/60 px-4 py-2 text-sm transition-shadow hover:shadow-neon">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent" />{it}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!form.name.trim()) er["name"] = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er["email"] = "Enter a valid email";
    if (!form.subject.trim()) er["subject"] = "Add a subject";
    if (form.message.trim().length < 10) er["message"] = "Message should be at least 10 characters";
    setErrors(er);
    if (Object.keys(er).length) return;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };
  const copy = async () => { await navigator.clipboard.writeText(CONTACT.email); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  const field = "w-full rounded-md border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary";
  return (
    <Section id="contact" kicker="Establish Connection" title="Contact">
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div {...reveal} className="glass space-y-5 rounded-xl p-8 font-mono text-sm">
          <p className="text-accent">&gt; open_channel --to abhishek</p>
          <div className="flex flex-wrap items-center justify-between gap-2"><span><span className="text-muted-foreground">email:</span> {CONTACT.email}</span><button onClick={copy} className="rounded border border-border px-2 py-1 text-xs hover:border-accent hover:text-accent">{copied ? "Copied ✓" : "Copy"}</button></div>
          <p><span className="text-muted-foreground">phone:</span> <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-accent">{CONTACT.phone}</a></p>
          <p><span className="text-muted-foreground">location:</span> {CONTACT.location}</p>
          <div className="flex gap-3 pt-4">
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="rounded-md bg-neon px-5 py-2.5 text-xs font-bold text-primary-foreground hover:shadow-neon">LinkedIn</a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className="rounded-md border border-border px-5 py-2.5 text-xs hover:border-primary">GitHub</a>
          </div>
        </motion.div>
        <motion.form {...reveal} onSubmit={submit} noValidate className="glass space-y-4 rounded-xl p-8">
          {(["name", "email", "subject"] as const).map((k) => (
            <div key={k}>
              <input aria-label={k} placeholder={k.charAt(0).toUpperCase() + k.slice(1)} type={k === "email" ? "email" : "text"} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className={field} maxLength={k === "subject" ? 150 : 100} />
              {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
            </div>
          ))}
          <div>
            <textarea aria-label="message" placeholder="Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={field} maxLength={2000} />
            {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
          </div>
          <button type="submit" className="w-full rounded-md bg-neon py-3 font-display text-xs font-bold tracking-widest text-primary-foreground transition-shadow hover:shadow-neon">TRANSMIT MESSAGE</button>
          <p className="text-center text-xs text-muted-foreground">Opens your email app with the message ready to send.</p>
        </motion.form>
      </div>
    </Section>
  );
}

function Portfolio() {
  return (
    <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative min-h-screen bg-background">
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
            <motion.div key={n} {...reveal} transition={{ delay: i * 0.06, duration: 0.5 }} whileHover={{ y: -6, rotate: -1 }} className="group relative rounded-xl bg-neon p-px">
              <div className="flex h-full flex-col rounded-xl bg-background p-5 transition-colors group-hover:bg-secondary">
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
            <motion.div key={t} {...reveal} transition={{ delay: i * 0.08, duration: 0.5 }} className="glass flex gap-5 rounded-xl p-6 transition-shadow hover:shadow-violet">
              <span className="font-display text-3xl font-black text-violet/60">{String(i + 1).padStart(2, "0")}</span>
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
      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted-foreground">Designed & Developed by Abhishek.</footer>
    </motion.div>
  );
}
