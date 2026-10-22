import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import my2 from "@/assets/my_2.jpeg";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/PageIntro";
import { SiteShell } from "@/components/SiteShell";
import { MISSIONS, MILESTONES } from "@/lib/portfolio-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Guda Abhishek" },
      {
        name: "description",
        content: "Learn about Guda Abhishek's education, experience and engineering interests.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell active="/about">
      <div className="page-content">
        <PageIntro
          eyebrow="THE PERSON BEHIND THE CODE"
          title={
            <>
              Engineering with
              <br />
              <span>curiosity and care.</span>
            </>
          }
          description="Software Engineer | AI & Full-Stack Developer, based in Hyderabad, India."
        />
        <section className="about-editorial">
          <figure className="about-photo about-page-photo">
            <img src={my2} alt="Guda Abhishek" width={1440} height={1920} fetchPriority="high" />
            <figcaption>GUDA ABHISHEK · HYDERABAD</figcaption>
          </figure>
          <div className="about-prose">
            <p>
              I’m a software engineer focused on building responsive web experiences and dependable
              full-stack applications. My work has included React interfaces, API integrations,
              reusable UI, and product features that bring AI capabilities into practical workflows.
            </p>
            <p>
              I enjoy working across the software development lifecycle: understanding a problem,
              shaping its interface and data flow, implementing carefully, then debugging and
              improving it with a team.
            </p>
            <div className="about-facts">
              <span>
                <MapPin /> Hyderabad, India
              </span>
              <span>
                <GraduationCap /> B.Tech Information Technology
              </span>
            </div>
            <Button asChild variant="outline" className="mt-6 min-h-11">
              <Link to="/experience">
                View experience <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
        <section className="page-section">
          <h2 className="page-section-title">Education</h2>
          <div className="editorial-card">
            <p className="section-kicker">2022 — 2026</p>
            <h3>TKR College of Engineering & Technology</h3>
            <p className="text-sm text-muted-foreground">
              B.Tech in Information Technology · CGPA 7.6
            </p>
          </div>
        </section>
        <section className="page-section">
          <h2 className="page-section-title">Career timeline</h2>
          <div className="timeline">
            {MISSIONS.map((job) => (
              <article key={job.id} className="timeline-item">
                <span className="timeline-dot" />
                <p className="section-kicker">{job.period}</p>
                <h3>{job.company}</h3>
                <p className="text-sm text-primary">{job.role}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {job.projects[0]?.points.slice(0, 2).join(" ")}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="page-section">
          <h2 className="page-section-title">Beyond the day job</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {MILESTONES.map(([period, title, detail]) => (
              <article key={title} className="editorial-card">
                <p className="section-kicker">{period}</p>
                <h3>{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="page-section compact-callout">
          <p className="section-kicker">WHAT I’M EXPLORING</p>
          <h2>
            Full-stack systems, AI interfaces,
            <br />
            and better ways to build.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            I’m interested in Generative AI, retrieval-augmented generation, AI agents, and the
            engineering practices that make useful software reliable.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
