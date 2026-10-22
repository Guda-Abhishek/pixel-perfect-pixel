import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness } from "lucide-react";
import { MISSIONS } from "@/lib/portfolio-data";
import { pageHead } from "@/lib/site-data";
import { PageBody, PageHeading, Tags } from "@/components/SitePrimitives";
export const Route = createFileRoute("/experience")({
  head: () =>
    pageHead(
      "Experience",
      "Guda Abhishek's frontend internship at Paves Technologies and AI interface internship at Bilvantis Technologies.",
      "/experience",
    ),
  component: Experience,
});
function Experience() {
  return (
    <PageBody>
      <PageHeading
        number="04"
        title="The career episodes."
        description="Hands-on work across frontend engineering, API integration and AI product experiences."
      />
      <div className="space-y-12">
        {MISSIONS.map((mission) => (
          <article
            key={mission.id}
            className="grid gap-6 border-b border-border pb-12 md:grid-cols-[230px_1fr]"
          >
            <div>
              <p className="font-mono text-xs text-violet">EPISODE {mission.id}</p>
              <p className="mt-4 text-sm text-muted-foreground">{mission.period}</p>
              {mission.location && (
                <p className="mt-2 text-xs text-muted-foreground">{mission.location}</p>
              )}
            </div>
            <div>
              <h2 className="flex items-start gap-3 text-4xl font-semibold">
                <BriefcaseBusiness className="mt-2 size-5 shrink-0 text-violet" />
                {mission.company}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{mission.role}</p>
              <Tags items={mission.tags} />
              {mission.projects.map((project) => (
                <section key={project.name} className="mt-8">
                  <h3 className="text-2xl font-semibold">{project.name}</h3>
                  <ul className="mt-4 space-y-3">
                    {project.points.map((point) => (
                      <li
                        key={point}
                        className="border-l border-violet/50 pl-4 text-sm leading-7 text-muted-foreground"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageBody>
  );
}
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
