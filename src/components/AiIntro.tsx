import { useState } from "react";
import { Bot, Pause, Play, RotateCcw, ArrowRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DeveloperMark } from "@/components/DeveloperMark";
import { useAiIntro } from "@/hooks/use-ai-intro";
import { AI_INTRO_DURATION, AI_INTRO_SEGMENTS, INTRO_PORTRAITS } from "@/lib/ai-intro";

function IntroPlayer() {
  const player = useAiIntro();
  const segment = AI_INTRO_SEGMENTS[player.segmentIndex];
  return <>
    <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
      <div className="space-y-3">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded border border-border bg-secondary">
          {INTRO_PORTRAITS.host ? <img src={INTRO_PORTRAITS.host} alt="AI-styled portfolio host, not a real photograph" className="h-full w-full object-contain" /> : <DeveloperMark className="h-28 w-28" />}
        </div>
        <p className="flex items-center gap-2 text-xs font-semibold"><Bot className="size-4 text-primary" /> AI portfolio host</p>
        {INTRO_PORTRAITS.real && <figure><img src={INTRO_PORTRAITS.real} alt="Real portrait of Guda Abhishek" className="aspect-square w-16 rounded object-contain" /><figcaption className="mt-1 text-xs text-muted-foreground">Guda Abhishek · real portrait</figcaption></figure>}
      </div>
      <div className="flex min-w-0 flex-col justify-between gap-4">
        <div><p className="mb-3 text-[10px] uppercase text-primary">A developer original · Introduction</p><p className="min-h-36 text-base leading-7 sm:min-h-40" aria-live="off">{segment?.text}</p></div>
        <div className="space-y-3">
          <progress className="h-1.5 w-full accent-primary" aria-label="Introduction progress" max={AI_INTRO_DURATION} value={player.elapsed} />
          <div className="flex justify-between text-xs text-muted-foreground"><span role="status">{player.status === "ready" ? "Ready · sound off" : player.status === "ended" ? "Introduction complete" : player.status === "paused" ? "Paused" : player.voiceEnabled ? "Playing · browser voice" : "Playing · text only"}</span><span>{Math.floor(player.elapsed / 1000)} / {AI_INTRO_DURATION / 1000}s</span></div>
          <div className="flex flex-wrap gap-2">
            {player.status === "playing" ? <Button onClick={player.pause} className="min-h-11"><Pause /> Pause</Button> : <Button onClick={player.play} className="min-h-11"><Play />{player.status === "paused" ? "Resume" : player.status === "ended" ? "Play again" : "Play intro"}</Button>}
            <Button variant="outline" size="icon" className="min-h-11 min-w-11" onClick={player.replay} aria-label="Replay introduction" title="Replay introduction"><RotateCcw /></Button>
            <DialogClose asChild><Button variant="ghost" className="min-h-11">Skip / close <ArrowRight /></Button></DialogClose>
          </div>
        </div>
      </div>
    </div>
    <div className="border-y border-border py-4">
      <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" className="size-4 accent-primary" checked={player.voiceEnabled} disabled={!player.voiceAvailable} onChange={event => player.setVoiceEnabled(event.target.checked)} /><Volume2 className="size-4 text-muted-foreground" /> Enable browser voice</label>
      <p className="text-xs leading-5 text-muted-foreground">{player.voiceError ? "Browser voice could not play. The text introduction remains available." : !player.voiceAvailable ? "Browser voice is unavailable here. Read the transcript or play the text introduction." : "Optional device voice. Not Abhishek’s voice, a cloned voice, or lip-synced video."}</p>
    </div>
    <div><h3 className="mb-3 font-sans text-sm font-semibold">Full transcript</h3><div className="space-y-3 text-sm leading-6 text-muted-foreground">{AI_INTRO_SEGMENTS.map((part, index) => <p key={index} className={player.status !== "ready" && index === player.segmentIndex ? "border-l-2 border-primary pl-3 text-foreground" : "border-l-2 border-transparent pl-3"}>{part.text}</p>)}</div></div>
  </>;
}

export function AiIntro({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><Button variant="outline" className={`min-h-11 ${compact ? "text-xs" : "px-5"}`}><Bot /> Meet my AI intro</Button></DialogTrigger>
    <DialogContent className="max-h-[90svh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg p-5 sm:p-7">
      <DialogTitle className="pr-9 font-display text-3xl leading-tight">Meet Abhishek</DialogTitle>
      <DialogDescription className="pr-4 text-xs leading-5">A first-person introduction from verified portfolio facts, presented by an AI portfolio host.</DialogDescription>
      {open && <IntroPlayer />}
    </DialogContent>
  </Dialog>;
}