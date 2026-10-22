import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { PortfolioContact } from "@/components/PortfolioContact";
import { SiteShell } from "@/components/SiteShell";
import { CONTACT } from "@/lib/portfolio-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Guda Abhishek" },
      {
        name: "description",
        content:
          "Contact Guda Abhishek in Hyderabad about software engineering and AI development.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell active="/contact">
      <div className="page-content contact-page">
        <PageIntro
          eyebrow="CONTACT"
          title={
            <>
              Have something
              <br />
              <span>in mind?</span>
            </>
          }
          description="For opportunities, collaborations, or a good engineering conversation, get in touch."
        />
        <div className="contact-links">
          <a href={`mailto:${CONTACT.email}`}>
            <Mail />
            <span>
              <small>EMAIL</small>
              {CONTACT.email}
            </span>
          </a>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
            <Phone />
            <span>
              <small>PHONE</small>
              {CONTACT.phone}
            </span>
          </a>
          <div>
            <MapPin />
            <span>
              <small>BASED IN</small>
              {CONTACT.location}
            </span>
          </div>
          {CONTACT.linkedin && (
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin />
              <span>
                <small>LINKEDIN</small>Connect professionally
              </span>
            </a>
          )}
          {CONTACT.github && (
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
              <Github />
              <span>
                <small>GITHUB</small>Explore my code
              </span>
            </a>
          )}
        </div>
        <div className="contact-form-wrap">
          <div>
            <p className="section-kicker">SEND A NOTE</p>
            <h2 className="font-display text-3xl font-semibold">Open an email draft.</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The form validates your draft and opens your email app. The website does not send or
              store messages.
            </p>
          </div>
          <PortfolioContact showHeading={false} />
        </div>
      </div>
    </SiteShell>
  );
}
