import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeveloperMark } from "@/components/DeveloperMark";
import { Particles } from "@/components/Particles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Who's exploring? — Guda Abhishek" },
      { name: "description", content: "Enter the portfolio of Guda Abhishek, Software Engineer and AI & Full-Stack Developer." },
      { property: "og:title", content: "Guda Abhishek — Developer Portfolio" },
      { property: "og:description", content: "A cinematic, game-inspired portfolio of an AI & Full-Stack Developer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfileSelect,
});

function ProfileSelect() {
  const navigate = useNavigate();
  const [entering, setEntering] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const skip = () => {
    if (timer.current) clearTimeout(timer.current);
    navigate({ to: "/portfolio" });
  };

  const enter = () => {
    if (entering) return;
    setEntering(true);
    if (reduced) { skip(); return; }
    timer.current = setTimeout(skip, 850);
  };

  return (
    <div className="entry-screen relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-6 py-24">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Particles count={12} />
      <p className="absolute top-8 font-mono text-xs text-muted-foreground">GUDA ABHISHEK / PORTFOLIO</p>

      <motion.div
        animate={entering ? { scale: 1.6, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center text-4xl font-bold text-foreground md:text-6xl"
        >
          Who's exploring?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: reduced ? 1 : 1.04 }}
        >
        <Button variant="bare" size="auto"
          onClick={enter}
          disabled={entering}
          className="group flex max-w-sm flex-col items-center gap-5 rounded-lg text-foreground"
          aria-label="Enter as Abhishek"
        >
          <div className="relative h-44 w-44 overflow-hidden rounded-lg ring-2 ring-transparent transition-all duration-300 group-hover:shadow-neon group-hover:ring-primary md:h-56 md:w-56">
            <DeveloperMark className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="text-center">
            <p className="font-display text-2xl text-muted-foreground transition-colors group-hover:text-foreground">Abhishek</p>
            <p className="mt-1 text-sm text-muted-foreground">Software Engineer | AI & Full-Stack Developer</p>
          </div>
        </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <Button variant="portfolio" size="lg" onClick={skip} className="min-h-11 font-mono text-xs">Skip intro / Enter portfolio <ArrowRight /></Button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {entering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background"
          >
            <p role="status" className="px-6 text-center font-mono text-sm text-accent">Initializing Developer Environment…</p>
            <div className="mt-5 h-0.5 w-64 overflow-hidden rounded bg-muted">
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5 }} className="h-full bg-primary" />
            </div>
            <Button variant="bare" onClick={skip} className="mt-6 min-h-11">Enter portfolio <ArrowRight /></Button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-6 z-10 font-mono text-xs text-muted-foreground">
        Designed & Developed by Abhishek.
      </footer>
    </div>
  );
}
