import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { PERSON_SECTIONS, getPersonPortfolio, personHead } from "@/lib/person-portfolios";
import { PersonContent, PersonUnavailable } from "@/components/PersonPortfolio";
export const Route = createFileRoute("/people/$person/$section")({
  beforeLoad: ({ params }) => {
    if (params.person === "bava")
      throw redirect({ to: "/people/$person", params: { person: "bava" } });
    if (!PERSON_SECTIONS.some((section) => section.id === params.section)) throw notFound();
  },
  head: ({ params }) =>
    personHead(
      params.person,
      PERSON_SECTIONS.find((section) => section.id === params.section)?.label ?? "Page not found",
      `${getPersonPortfolio(params.person)?.name ?? "Portfolio"} — ${params.section}, from verified resume facts.`,
      `/people/${params.person}/${params.section}`,
    ),
  notFoundComponent: () => <PersonUnavailable missing />,
  component: Content,
});
function Content() {
  const { person, section } = Route.useParams();
  const profile = getPersonPortfolio(person);
  const selected = PERSON_SECTIONS.find((item) => item.id === section);
  return profile && selected ? (
    <PersonContent profile={profile} section={selected.id} />
  ) : (
    <PersonUnavailable missing />
  );
}
