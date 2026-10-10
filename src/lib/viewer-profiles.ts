import { z } from "zod";

export const viewerSchema = z.enum(["recruiter", "developer", "ai", "guest"]);
export type Viewer = z.infer<typeof viewerSchema>;
export const VIEWERS = [
  { id: "recruiter", name: "Recruiter", caption: "Experience & impact", color: "profile-blue" },
  { id: "developer", name: "Developer / Tech Lead", caption: "Engineering & architecture", color: "profile-green" },
  { id: "ai", name: "AI Specialist", caption: "Intelligence & innovation", color: "profile-purple" },
  { id: "guest", name: "Guest", caption: "The complete story", color: "profile-red" },
] as const;

export function parseViewer(value: unknown): Viewer {
  const result = viewerSchema.safeParse(value);
  return result.success ? result.data : "guest";
}
export function sectionOrder(viewer: Viewer) {
  if (viewer === "recruiter") return ["about", "experience", "projects", "certifications", "skills"];
  if (viewer === "developer") return ["projects", "skills", "experience", "about", "certifications"];
  if (viewer === "ai") return ["projects", "certifications", "skills", "experience", "about"];
  return ["projects", "experience", "skills", "certifications", "about"];
}
export function projectOrder(viewer: Viewer) {
  return viewer === "ai" ? [2, 0, 1, 3] : viewer === "developer" ? [3, 2, 0, 1] : [0, 1, 2, 3];
}
export const VIEWER_FOCUS: Record<Viewer, string> = {
  recruiter: "Experience, education & real-world impact",
  developer: "React platforms, APIs & full-stack engineering",
  ai: "Generative AI, intelligent interfaces & automation",
  guest: "Engineering, intelligence & everything in between",
};