export function DeveloperMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={`developer-mark ${className}`}>
      <rect width="200" height="200" rx="8" className="fill-secondary" />
      <path d="M100 24 166 62v76l-66 38-66-38V62Z" className="fill-none stroke-primary" strokeWidth="1.5" />
      <path d="m100 44 49 28v56l-49 28-49-28V72Z M34 62l115 66M166 62 51 128M100 24v152" className="fill-none stroke-accent/30" />
      <path d="m77 78-23 22 23 22m46-44 23 22-23 22m-14-51-18 61" className="fill-none stroke-accent" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="100" cy="24" r="3" className="fill-accent" /><circle cx="34" cy="138" r="3" className="fill-primary" /><circle cx="166" cy="138" r="3" className="fill-violet" />
    </svg>
  );
}