const logoSlug: Record<string, string> = {
  JavaScript: "javascript",
  Java: "java",
  Python: "python",
  C: "c",
  SQL: "mysql",
  "React.js": "react",
  React: "react",
  "Node.js": "nodejs",
  "Express.js": "express",
  HTML5: "html5",
  CSS3: "css3",
  "Tailwind CSS": "tailwindcss",
  MySQL: "mysql",
  MongoDB: "mongodb",
  PostgreSQL: "postgresql",
  Git: "git",
  GitHub: "github",
  Docker: "docker",
  Postman: "postman",
  "VS Code": "vscode",
  "Oracle Cloud Infrastructure": "oracle",
  "Microsoft Azure": "azure",
  AWS: "amazonwebservices",
};

export function TechLogo({ name }: { name: string }) {
  const slug = logoSlug[name];
  if (!slug)
    return (
      <span className="tech-logo-fallback" aria-hidden="true">
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  return (
    <img
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`}
      alt=""
      loading="lazy"
      onError={(event) => {
        event.currentTarget.hidden = true;
      }}
    />
  );
}

export function TechnologyList({ items }: { items: readonly string[] }) {
  return (
    <div className="technology-list">
      {items.map((name) => (
        <span key={name} className="technology-with-logo">
          <TechLogo name={name} />
          {name}
        </span>
      ))}
    </div>
  );
}
