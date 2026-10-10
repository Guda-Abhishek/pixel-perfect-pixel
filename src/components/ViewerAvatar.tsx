import { BriefcaseBusiness, Code2, Brain, Smile } from "lucide-react";
import { VIEWERS, type Viewer } from "@/lib/viewer-profiles";

export function ViewerAvatar({ viewer, compact = false }: { viewer: Viewer; compact?: boolean }) {
  const profile = VIEWERS.find(p => p.id === viewer) ?? VIEWERS[3];
  const Icon = viewer === "recruiter" ? BriefcaseBusiness : viewer === "developer" ? Code2 : viewer === "ai" ? Brain : Smile;
  return <span aria-hidden="true" className={`${profile.color} flex shrink-0 items-center justify-center rounded ${compact ? "h-8 w-8" : "aspect-square w-full"} text-primary-foreground`}><Icon className={compact ? "size-5!" : "size-14! sm:size-16!"} strokeWidth={1.5} /></span>;
}