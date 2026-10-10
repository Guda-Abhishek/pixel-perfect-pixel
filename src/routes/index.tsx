import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ViewerAvatar } from "@/components/ViewerAvatar";
import { VIEWERS } from "@/lib/viewer-profiles";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Who's Watching? — Abhishek: The Series" },
    { name: "description", content: "Choose your perspective on Guda Abhishek's software engineering, full-stack and AI portfolio." },
    { property: "og:title", content: "Abhishek: The Series — Choose Your Profile" },
    { property: "og:description", content: "Explore the projects, experience and AI work of Guda Abhishek." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ProfileSelect,
});

function ProfileSelect() {
  const [intro, setIntro] = useState(false);
  const [sound, setSound] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); void audio.current?.close(); }, []);
  const skip = () => { setIntro(false); setSound(false); if (timer.current) clearTimeout(timer.current); void audio.current?.close(); audio.current = null; };
  const toggleSound = () => {
    if (sound) { setSound(false); void audio.current?.close(); audio.current = null; return; }
    try {
      const context = new AudioContext(); audio.current = context;
      const gain = context.createGain(); gain.connect(context.destination);
      gain.gain.setValueAtTime(0.06, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.6);
      const tone = context.createOscillator(); tone.type = "sine"; tone.frequency.setValueAtTime(146.83, context.currentTime); tone.connect(gain); tone.start(); tone.stop(context.currentTime + 0.6);
      setSound(true);
    } catch { setSound(false); }
  };
  const playIntro = () => { setIntro(true); timer.current = setTimeout(skip, reduced ? 1000 : 2400); };
  return <div className="relative flex min-h-svh flex-col bg-background px-5 py-8 sm:px-12">
    <header className="flex items-center justify-between"><span className="series-logo text-3xl">ABHISHEK <span className="ml-2 align-middle font-sans text-[9px] font-normal text-muted-foreground">THE SERIES</span></span><Button variant="ghost" onClick={playIntro} className="min-h-11 text-xs"><Play /> Play intro</Button></header>
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center py-14">
      <motion.div initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} className="w-full text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">ONE DEVELOPER. MANY PERSPECTIVES.</p>
        <h1 className="text-5xl font-semibold sm:text-6xl">Who's Watching?</h1>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-5 gap-y-8 sm:mt-12 sm:grid-cols-4 sm:gap-6">
          {VIEWERS.map(profile => <Button key={profile.id} asChild variant="bare" size="auto" className="group block text-center"><Link to="/portfolio" search={{ profile: profile.id }} className="min-w-0">
            <span className="block rounded ring-2 ring-transparent transition-transform group-hover:scale-[1.03] group-hover:ring-foreground group-focus-visible:ring-foreground"><ViewerAvatar viewer={profile.id} /></span>
            <span className="mt-4 block min-h-10 text-sm text-foreground sm:text-base">{profile.name}</span>
            <span className="mt-1 block text-[10px] leading-relaxed text-muted-foreground">{profile.caption}</span>
          </Link></Button>)}
        </div>
        <Button variant="outline" asChild className="mt-10 min-h-11 px-6 text-xs"><Link to="/portfolio" search={{ profile: "guest" }}>Skip intro / Enter portfolio <ArrowRight /></Link></Button>
      </motion.div>
    </div>
    <footer className="text-center text-[10px] text-muted-foreground">GUDA ABHISHEK · SOFTWARE ENGINEER & AI DEVELOPER</footer>
    <Dialog open={intro} onOpenChange={open => { if (!open) skip(); }}><DialogContent className="flex h-svh w-screen max-w-none flex-col items-center justify-center border-0 bg-background px-6 sm:rounded-none"><DialogTitle className="sr-only">Abhishek series intro</DialogTitle><DialogDescription className="sr-only">An optional brief cinematic title sequence.</DialogDescription>
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">A DEVELOPER ORIGINAL</p>
      <motion.h2 initial={{ scale: reduced ? 1 : 0.95 }} animate={{ scale: 1 }} transition={{ duration: 1.4 }} className="series-logo text-center text-5xl sm:text-7xl">ABHISHEK:<br />THE SERIES</motion.h2>
      <div className="mt-10 flex gap-4"><Button autoFocus variant="outline" className="min-h-11" onClick={skip}>Skip intro <ArrowRight /></Button><Button variant="ghost" className="min-h-11" onClick={toggleSound} aria-pressed={sound}>{sound ? <Volume2 /> : <VolumeX />} Sound {sound ? "on" : "off"}</Button></div>
    </DialogContent></Dialog>
  </div>;
}
