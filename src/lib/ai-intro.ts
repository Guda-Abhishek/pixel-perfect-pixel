// Only supplied, verified portfolio facts. Durations are reading cues, not lip-sync.
export const AI_INTRO_SEGMENTS = [
  {
    text: "Hi, I'm Guda Abhishek, a Software Engineer and AI & Full-Stack Developer based in Hyderabad, India.",
    duration: 6500,
  },
  {
    text: "I studied Information Technology at TKR College of Engineering & Technology, from 2022 to 2026, with a CGPA of 7.6.",
    duration: 7500,
  },
  {
    text: "At Paves Technologies, I build React interfaces for enterprise finance and internal employee workflows, integrating REST APIs and reusable components.",
    duration: 7000,
  },
  {
    text: "At Bilvantis Technologies, I worked on the NEO AI interface and API integration, helping reduce user-facing delays by approximately 25 percent.",
    duration: 7000,
  },
  {
    text: "My interests include Generative AI, RAG and AI agents, alongside practical full-stack engineering.",
    duration: 4500,
  },
  {
    text: "Explore my projects and career journey. I'd love to connect about what's next.",
    duration: 4500,
  },
] as const;

import my1 from "@/assets/my_1.jpeg";

export const AI_INTRO_DURATION = AI_INTRO_SEGMENTS.reduce(
  (total, part) => total + part.duration,
  0,
);
export const INTRO_PORTRAITS: { real: string | null; host: string | null } = {
  real: my1,
  host: null,
};

export function introSegmentAt(elapsed: number) {
  let end = 0;
  for (let index = 0; index < AI_INTRO_SEGMENTS.length; index++) {
    const segment = AI_INTRO_SEGMENTS[index];
    if (!segment) continue;
    end += segment.duration;
    if (elapsed < end) return index;
  }
  return AI_INTRO_SEGMENTS.length - 1;
}
