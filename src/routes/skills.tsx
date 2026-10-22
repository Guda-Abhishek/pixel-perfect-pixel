import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, Cloud, Code2, Database, Server, Wrench } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SiteShell } from "@/components/SiteShell";
import { SKILLS } from "@/lib/portfolio-data";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Guda Abhishek" },
      { name: "description", content: "Technologies and engineering tools used by Guda Abhishek." },
    ],
  }),
  component: SkillsPage,
});

const groups = [
  { title: "Programming languages", icon: Code2, categories: ["Programming Languages"] },
  {
    title: "Frontend development",
    icon: Code2,
    categories: ["Frontend & Frameworks"],
    picks: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
  },
  {
    title: "Backend development",
    icon: Server,
    categories: ["Frontend & Frameworks"],
    picks: ["Node.js", "Express.js", "REST APIs", "Spring"],
  },
  { title: "Databases", icon: Database, categories: ["Databases"] },
  {
    title: "AI & machine learning",
    icon: BrainCircuit,
    categories: ["AI & Generative AI", "Machine Learning"],
  },
  {
    title: "Cloud & developer tools",
    icon: Cloud,
    categories: ["Cloud & Dev Tools", "Engineering Practices"],
  },
];

function SkillsPage() {
  return (
    <SiteShell active="/skills">
      <div className="page-content">
        <PageIntro
          eyebrow="TOOLS & PRACTICE"
          title={
            <>
              A practical
              <br />
              <span>skill set.</span>
            </>
          }
          description="Technologies used across academic, personal, and professional work. No scores or proficiency claims—just the tools and practices behind the projects."
        />
        <div className="skill-groups">
          {groups.map(({ title, icon: Icon, categories, picks }) => {
            const items = [
              ...new Set(
                SKILLS.filter((group) => categories.includes(group.cat))
                  .flatMap((group) => group.items)
                  .filter((item) => !picks || picks.includes(item)),
              ),
            ];
            return (
              <section key={title} className="skill-group">
                <div className="skill-group-heading">
                  <span>
                    <Icon />
                  </span>
                  <div>
                    <p className="section-kicker">ENGINEERING TOOLKIT</p>
                    <h2>{title}</h2>
                  </div>
                </div>
                <ul>
                  {items.map((item) => (
                    <li key={item}>
                      <span className="skill-mark">
                        <Wrench />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </SiteShell>
  );
}
