import { createFileRoute } from "@tanstack/react-router";
import { Award, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CERTS } from "@/lib/portfolio-data";
import { pageHead } from "@/lib/site-data";
import { PageBody, PageHeading } from "@/components/SitePrimitives";
export const Route = createFileRoute("/certifications")({
  head: () =>
    pageHead(
      "Certifications",
      "Guda Abhishek's certifications in Generative AI, OCI, machine learning, Python and Android development.",
      "/certifications",
    ),
  component: Certifications,
});
function Certifications() {
  return (
    <PageBody>
      <PageHeading
        number="05"
        title="Learning, collected."
        description="A continuing foundation in AI, cloud infrastructure, machine learning and software development."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTS.map(([title, issuer], index) => (
          <article key={title} className="cert-card">
            <div className="flex items-center justify-between">
              <Award className="size-7 text-gold" />
              <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
            </div>
            <p className="mt-8 text-xs text-gold">{issuer}</p>
            <h2 className="mt-3 text-3xl font-semibold">{title}</h2>
          </article>
        ))}
      </div>
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-3xl font-semibold">Recognition & leadership</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          Two innovation projects recognized under the MSME Innovation Programme 2024, alongside
          IEEE membership activities and IT branch student coordination.
        </p>
        <Link to="/about" className="mt-4 inline-flex items-center gap-2 text-sm text-violet">
          Explore leadership <ArrowUpRight className="size-4" />
        </Link>
      </section>
    </PageBody>
  );
}
