import { PROJECTS } from "@/lib/portfolio-data";

export const PROJECT_PAGES = PROJECTS.map((project, index) => ({
  ...project,
  slug: ["farmer-marketplace", "coastal-safety", "neo-ai-interface", "tkr-it-portal"][index]!,
  category: ["AI & Full Stack", "IoT & AI", "Enterprise Interface", "Full Stack Web"][index]!,
  github: null as string | null,
  demo: null as string | null,
}));

export function getProject(slug: string) {
  return PROJECT_PAGES.find((project) => project.slug === slug);
}
