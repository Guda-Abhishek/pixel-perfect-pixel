import { PROJECTS } from "@/lib/portfolio-data";

export const projectSlugs = ["ai-farmer-marketplace", "coastal-safety", "neo-ai", "tkr-it-portal"] as const;
export const siteProjects = PROJECTS.map((project, index) => ({ ...project, slug: projectSlugs[index] ?? "", index }));
export function findProject(slug: string) {
  return siteProjects.find((project) => project.slug === slug);
}
export function pageHead(title: string, description: string, path: string) {
  const fullTitle = `${title} — Guda Abhishek`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}