import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/projects")({ component: () => <Outlet /> });
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { PageIntro } from "@/components/PageIntro";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteShell } from "@/components/SiteShell";
import { PROJECT_PAGES } from "@/lib/project-pages";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Guda Abhishek" },
      {
        name: "description",
        content: "Selected full-stack, AI, IoT, and interface projects by Guda Abhishek.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname !== "/projects") {
    return (
      <SiteShell active="/projects">
        <Outlet />
      </SiteShell>
    );
  }
  return (
    <SiteShell active="/projects">
      <div className="page-content">
        <PageIntro
          eyebrow="SELECTED WORK"
          title={
            <>
              Ideas, made
              <br />
              <span>tangible.</span>
            </>
          }
          description="A selection of academic, innovation, and professional work. Project scope and contributions are described from the portfolio record."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PROJECT_PAGES.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <p className="mt-8 text-xs leading-6 text-muted-foreground">
          Professional project descriptions focus on public-facing responsibilities and omit
          internal systems and confidential details.
        </p>
      </div>
    </SiteShell>
  );
}
