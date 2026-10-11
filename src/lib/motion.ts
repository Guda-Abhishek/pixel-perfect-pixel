import { type Transition, type Variants } from "framer-motion";

/**
 * Standardized Motion Design Tokens
 * Cinematic, premium, responsive, and respectful of reduced motion.
 */
export const MOTION_TOKENS = {
  duration: {
    micro: 0.16, // 160ms for hover, tap, icon changes
    standard: 0.24, // 240ms for dropdowns, tooltips, standard UI states
    section: 0.5, // 500ms for section reveals
    hero: 0.75, // 750ms for major hero reveals & portrait entrances
    dialog: 0.28, // 280ms for modals and dialogs
  },
  ease: {
    // Cinematic cubic-bezier curves
    entrance: [0.16, 1, 0.3, 1] as const, // Smooth easeOut (quint-like)
    standard: [0.25, 0.1, 0.25, 1] as const, // easeInOut
    subtle: [0.4, 0, 0.2, 1] as const,
  },
  distance: {
    micro: 6,
    subtle: 12,
    standard: 24,
    deep: 36,
  },
  stagger: {
    tight: 0.06,
    standard: 0.08,
    relaxed: 0.12,
  },
} as const;

export const easeEntranceTransition: Transition = {
  duration: MOTION_TOKENS.duration.section,
  ease: MOTION_TOKENS.ease.entrance,
};

export const heroEntranceTransition: Transition = {
  duration: MOTION_TOKENS.duration.hero,
  ease: MOTION_TOKENS.ease.entrance,
};

/**
 * Variants for container staggered animations
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (customStagger?: number) => ({
    opacity: 1,
    transition: {
      staggerChildren:
        typeof customStagger === "number" ? customStagger : MOTION_TOKENS.stagger.standard,
      delayChildren: 0.04,
    },
  }),
};

/**
 * Fade and upward slide entrance for hero and key items
 */
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.distance.standard,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.section,
      ease: MOTION_TOKENS.ease.entrance,
    },
  },
};

/**
 * Smooth subtle scale & opacity reveal for portraits
 */
export const portraitRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: MOTION_TOKENS.distance.subtle,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.hero,
      ease: MOTION_TOKENS.ease.entrance,
    },
  },
};

/**
 * Card entrance variant
 */
export const cardEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION_TOKENS.distance.subtle,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.standard,
      ease: MOTION_TOKENS.ease.entrance,
    },
  },
};
