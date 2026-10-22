import { createFileRoute } from "@tanstack/react-router";
import { PortfolioContact } from "@/components/PortfolioContact";
import { PageBody, PageHeading } from "@/components/SitePrimitives";
import { pageHead } from "@/lib/site-data";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact",
      "Connect with Guda Abhishek in Hyderabad by email, phone, GitHub or LinkedIn. Prepare an email enquiry.",
      "/contact",
    ),
  component: Contact,
});
function Contact() {
  return (
    <>
      <PageBody>
        <PageHeading
          number="06"
          title="Let's start a conversation."
          description="For opportunities, engineering conversations and collaborations. Hyderabad, India."
        />
      </PageBody>
      <div className="contact-page">
        <PortfolioContact />
      </div>
    </>
  );
}
