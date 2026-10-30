import { createFileRoute } from "@tanstack/react-router";
import { getPersonPortfolio, personHead } from "@/lib/person-portfolios";
import { PersonHome, PersonUnavailable } from "@/components/PersonPortfolio";
export const Route = createFileRoute("/people/$person/")({
  head: ({ params }) =>
    personHead(
      params.person,
      "Home",
      getPersonPortfolio(params.person)?.story ??
        "A demo portfolio for Anjini (Bava), with resume-based details to be confirmed.",
      `/people/${params.person}`,
    ),
  component: Home,
});
function Home() {
  const { person } = Route.useParams();
  const profile = getPersonPortfolio(person);
  return profile ? <PersonHome profile={profile} /> : <PersonUnavailable person={person} />;
}
