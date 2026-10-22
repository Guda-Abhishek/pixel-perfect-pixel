import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectVisual } from "@/components/ProjectVisual";
import { PageBody, Tags } from "@/components/SitePrimitives";
import { findProject, pageHead } from "@/lib/site-data";
export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = findProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(loaderData.title, loaderData.overview, `/projects/${loaderData.slug}`)
      : {
          ...pageHead(
            "Project unavailable",
            "This portfolio project could not be found.",
            "/projects",
          ),
          meta: [
            ...pageHead(
              "Project unavailable",
              "This portfolio project could not be found.",
              "/projects",
            ).meta,
            { name: "robots", content: "noindex" },
          ],
        },
  errorComponent: () => (
    <PageBody>
      <h1 className="page-title">Project unavailable.</h1>
      <Button asChild className="mt-6">
        <Link to="/projects">Back to projects</Link>
      </Button>
    </PageBody>
  ),
  notFoundComponent: () => (
    <PageBody>
      <p className="font-mono text-xs text-violet">404 / PROJECT NOT FOUND</p>
      <h1 className="page-title mt-5">That story isn't here.</h1>
      <Button asChild className="mt-6">
        <Link to="/projects">
          <ArrowLeft /> Explore projects
        </Link>
      </Button>
    </PageBody>
  ),
  component: ProjectDetail,
});
function ProjectDetail() {
  const project = Route.useLoaderData();
  return (
    <PageBody>
      <Button asChild variant="bare" className="mb-8 px-0">
        <Link to="/projects">
          <ArrowLeft /> All projects
        </Link>
      </Button>
      <p className="mb-4 font-mono text-xs text-violet">{project.badge}</p>
      <h1 className="page-title max-w-4xl">{project.title}</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">{project.overview}</p>
      <Tags items={project.tech} />
      <div className="mt-10">
        <ProjectVisual index={project.index === 3 ? 2 : project.index} />
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="text-3xl font-semibold">The problem</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.problem}</p>
        </section>
        <section>
          <h2 className="text-3xl font-semibold">My contribution</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.role}</p>
        </section>
      </div>
      <section className="mt-12 border-y border-border py-8">
        <h2 className="text-3xl font-semibold">
          {project.index < 2 ? "Conceptual system flow" : "Integration flow"}
        </h2>
        <ol className="mt-6 flex flex-wrap items-center gap-4">
          {project.flow.map((step, index) => (
            <li key={step} className="flex items-center gap-4">
              <span className="font-mono text-xs text-violet">0{index + 1}</span>
              <span className="text-sm">{step}</span>
              {index < project.flow.length - 1 && (
                <ArrowRight className="size-4 text-muted-foreground" />
              )}
            </li>
          ))}
        </ol>
      </section>
      <Button asChild className="mt-8 min-h-11">
        <Link to="/contact">
          Discuss this work <ArrowRight />
        </Link>
      </Button>
    </PageBody>
  );
}
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { ProjectVisual } from "@/components/ProjectVisual";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { getProject, PROJECT_PAGES } from "@/lib/project-pages";

export const Route = createFileRoute("/projects/$slug")({
  beforeLoad: ({ params }) => {
    if (!getProject(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const project = getProject(params.slug);
    return {
      meta: [
        { title: `${project?.title ?? "Project not found"} — Guda Abhishek` },
        {
          name: "description",
          content: project?.overview ?? "Project overview, approach, and technology details.",
        },
      ],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  if (!project) return null;
  const index = PROJECT_PAGES.findIndex((item) => item.slug === slug);
  return (
    <article className="page-content project-detail">
      <Button asChild variant="ghost" className="mb-8 min-h-11 px-0">
        <Link to="/projects">
          <ArrowLeft /> All projects
        </Link>
      </Button>
      <PageIntro
        eyebrow={`${project.category} · ${project.badge}`}
        title={project.title}
        description={project.overview}
      />
      <div className="project-detail-art">
        <ProjectVisual index={index} />
      </div>
      <div className="project-detail-grid">
        <section className="detail-copy">
          <p className="section-kicker">THE PROBLEM</p>
          <h2>Why this work matters</h2>
          <p>{project.problem}</p>
        </section>
        <section className="detail-copy">
          <p className="section-kicker">MY CONTRIBUTION</p>
          <h2>Approach & role</h2>
          <p>{project.role}</p>
        </section>
      </div>
      {project.flow.length > 0 && (
        <section className="detail-section">
          <p className="section-kicker">CONCEPTUAL WORKFLOW</p>
          <h2>From input to outcome</h2>
          <ol className="workflow-list">
            {project.flow.map((step, stepIndex) => (
              <li key={step}>
                <span>0{stepIndex + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      )}
      <section className="detail-section">
        <p className="section-kicker">TECHNOLOGY</p>
        <h2>Tools used</h2>
        <div className="technology-list">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </section>
      <p className="mt-10 border-t border-white/10 pt-5 text-xs leading-6 text-muted-foreground">
        Repository, live demo, and implementation media are shown when verified project links or
        assets are available.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {project.github && (
          <Button asChild variant="outline" className="min-h-11">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github /> Source <ArrowUpRight />
            </a>
          </Button>
        )}
        {project.demo && (
          <Button asChild className="min-h-11">
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              Live project <ArrowUpRight />
            </a>
          </Button>
        )}
      </div>
    </article>
  );
}
