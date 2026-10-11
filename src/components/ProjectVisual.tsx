import { Code2, Leaf, Radio, Database, Cpu, Waves, Network } from "lucide-react";

export function ProjectVisual({ index }: { index: number }) {
  const icons =
    index === 0
      ? [Leaf, Cpu, Network]
      : index === 1
        ? [Radio, Waves, Cpu]
        : [Code2, Network, Database];
  return (
    <div
      aria-hidden="true"
      className={`project-visual project-visual-${index} relative mb-5 flex h-36 items-center justify-center overflow-hidden border-b border-border`}
    >
      <svg
        viewBox="0 0 360 144"
        className="absolute inset-0 h-full w-full fill-none stroke-current opacity-30"
      >
        <path d="M0 72h55l36-40h55l34 40h50l38-40h92M0 112h92l54-40m34 0 42 40h138M92 32V0m176 32V0M180 72v72" />
        <circle cx="180" cy="72" r="55" />
        <circle cx="180" cy="72" r="65" strokeDasharray="3 8" />
      </svg>
      <div className="relative flex items-center gap-12">
        {icons.map((Icon, i) => (
          <div
            key={i}
            className={`flex items-center justify-center border border-current bg-background ${i === 1 ? "h-16 w-16 rotate-45" : "h-10 w-10 rounded-full"}`}
          >
            <Icon className={i === 1 ? "h-7 w-7 -rotate-45" : "h-4 w-4"} />
          </div>
        ))}
      </div>
    </div>
  );
}
