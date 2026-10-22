import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <header className="page-intro">
      <p className="section-kicker">{eyebrow}</p>
      <h1 className="section-heading">{title}</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
    </header>
  );
}
