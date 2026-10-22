import { createFileRoute } from "@tanstack/react-router";
import { Code2, Braces, Database, BrainCircuit, Cloud, Workflow, Server } from "lucide-react";
import { SKILLS } from "@/lib/portfolio-data";
import { pageHead } from "@/lib/site-data";
import { PageBody, PageHeading, Tags } from "@/components/SitePrimitives";
const icons = [Code2, Braces, BrainCircuit, Workflow, Database, Cloud, Workflow];
export const Route = createFileRoute("/skills")({
  head: () =>
    pageHead(
      "Skills",
      "Guda Abhishek's languages, React and MERN engineering, databases, AI/ML, cloud and developer tools.",
      "/skills",
    ),
  component: Skills,
});
function Skills() {
  return (
    <PageBody>
      <PageHeading
        number="02"
        title="My skill universe."
        description="The languages, systems and practices behind my work. Grounded in projects, coursework and continuous exploration."
      />
      <div className="grid gap-x-12 md:grid-cols-2">
        {SKILLS.map((group, index) => {
          const Icon = icons[index] ?? Code2;
          return (
            <section key={group.cat} className="border-b border-border py-7">
              <div className="flex items-center gap-4">
                <Icon className="size-6 text-violet" />
                <h2 className="text-3xl font-semibold">{group.cat}</h2>
              </div>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">{group.desc}</p>
              <Tags items={group.items} />
            </section>
          );
        })}
        <section className="border-b border-border py-7">
          <div className="flex items-center gap-4">
            <Server className="size-6 text-violet" />
            <h2 className="text-3xl font-semibold">Backend & API engineering</h2>
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            Connecting interfaces to services and data.
          </p>
          <Tags items={["Node.js", "Express.js", "REST APIs", "MongoDB", "SQL"]} />
        </section>
      </div>
    </PageBody>
  );
}
