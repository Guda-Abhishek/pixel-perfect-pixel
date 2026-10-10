import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import avatar from "@/assets/avatar.jpg";
import { Particles } from "@/components/Particles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Who's exploring? — Guda Abhishek" },
      { name: "description", content: "Enter the portfolio of Guda Abhishek, Software Engineer and AI & Full-Stack Developer." },
      { property: "og:title", content: "Guda Abhishek — Developer Portfolio" },
      { property: "og:description", content: "A cinematic, game-inspired portfolio of an AI & Full-Stack Developer." },
    ],
  }),
  component: ProfileSelect,
});

function ProfileSelect() {
  const navigate = useNavigate();
  const [entering, setEntering] = useState(false);

  const enter = () => {
    if (entering) return;
    setEntering(true);
    setTimeout(() => navigate({ to: "/portfolio" }), 1400);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet/20 blur-[120px]" />
      <Particles />

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

        <motion.button
          onClick={enter}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          className="group flex flex-col items-center gap-5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Enter as Abhishek"
        >
          <div className="relative h-44 w-44 overflow-hidden rounded-lg ring-2 ring-transparent transition-all duration-300 group-hover:shadow-neon group-hover:ring-primary md:h-56 md:w-56">
            <img src={avatar} alt="Abhishek avatar" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="text-center">
            <p className="font-display text-2xl text-muted-foreground transition-colors group-hover:text-foreground">Abhishek</p>
            <p className="mt-1 text-sm text-muted-foreground">Software Engineer | AI & Full-Stack Developer</p>
          </div>
        </motion.button>

        <motion.button
          onClick={enter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 rounded-md border border-border px-6 py-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          View as Guest
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {entering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background"
          >
            <p className="font-mono text-sm tracking-widest text-accent">Initializing Developer Environment…</p>
            <div className="mt-5 h-0.5 w-64 overflow-hidden rounded bg-muted">
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.9, delay: 0.45 }} className="h-full bg-neon" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-6 z-10 font-mono text-xs text-muted-foreground">
        Designed & Developed by Abhishek.
      </footer>
    </main>
  );
}
