import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SiteShell } from "@/components/SiteShell";
import { CERTS } from "@/lib/portfolio-data";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Guda Abhishek" },
      {
        name: "description",
        content: "Certifications in cloud, AI, machine learning, and software development.",
      },
    ],
  }),
  component: CertificationsPage,
});

function CertificationsPage() {
  return (
    <SiteShell active="/certifications">
      <div className="page-content">
        <PageIntro
          eyebrow="CONTINUED LEARNING"
          title={
            <>
              Foundations for
              <br />
              <span>what comes next.</span>
            </>
          }
          description="Courses and certifications recorded in my portfolio."
        />
        <div className="certification-grid">
          {CERTS.map(([title, issuer], index) => (
            <article key={title} className="certification-card">
              <div className="certification-index">0{index + 1}</div>
              <Award />
              <div>
                <h2>{title}</h2>
                <p>{issuer}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-7 text-xs leading-6 text-muted-foreground">
          Verification links will be added when certificate URLs are available.
        </p>
      </div>
    </SiteShell>
  );
}
