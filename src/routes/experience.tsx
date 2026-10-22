import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SiteShell } from "@/components/SiteShell";
import { MISSIONS } from "@/lib/portfolio-data";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Guda Abhishek" },
      {
        name: "description",
        content: "Professional software development and AI interface experience.",
      },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <SiteShell active="/experience">
      <div className="page-content">
        <PageIntro
          eyebrow="PROFESSIONAL EXPERIENCE"
          title={
            <>
              Learning by
              <br />
              <span>building.</span>
            </>
          }
          description="Software development and AI product interface work across collaborative teams."
        />
        <div className="timeline experience-timeline">
          {MISSIONS.map((job) => (
            <article key={job.id} className="timeline-item experience-item">
              <span className="timeline-dot" />
              <div className="experience-meta">
                <span>
                  <BriefcaseBusiness /> {job.period}
                </span>
                {job.location && (
                  <span>
                    <MapPin /> {job.location}
                  </span>
                )}
              </div>
              <h2>{job.company}</h2>
              <p className="text-primary">{job.role}</p>
              {job.projects.map((project) => (
                <section key={project.name} className="experience-project">
                  <h3>{project.name}</h3>
                  <ul>
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </section>
              ))}
              <div className="technology-list">
                {job.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
