import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPersonPortfolio, getPersonProject, personHead } from "@/lib/person-portfolios";
import { PersonProjectDetail, PersonUnavailable } from "@/components/PersonPortfolio";
export const Route = createFileRoute("/people/$person/projects/$slug")({
  beforeLoad: ({ params }) => {
    if (!getPersonProject(params.person, params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const project = getPersonProject(params.person, params.slug);
    return personHead(
      params.person,
      project?.title ?? "Project not found",
      project?.overview ?? "This project is not available.",
      `/people/${params.person}/projects/${params.slug}`,
    );
  },
  notFoundComponent: () => <PersonUnavailable missing />,
  component: Detail,
});
function Detail() {
  const { person, slug } = Route.useParams();
  const profile = getPersonPortfolio(person);
  const project = getPersonProject(person, slug);
  return profile && project ? (
    <PersonProjectDetail profile={profile} project={project} />
  ) : (
    <PersonUnavailable missing />
  );
}
