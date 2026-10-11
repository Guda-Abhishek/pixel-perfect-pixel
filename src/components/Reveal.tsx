import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MOTION_TOKENS } from "@/lib/motion";

function useRevealState(shouldReduceMotion: boolean | null, viewportMargin: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ observing: false, hasEntered: false });

  useEffect(() => {
    const element = ref.current;
    if (shouldReduceMotion || !element || typeof IntersectionObserver === "undefined") return;

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setState({ observing: false, hasEntered: true });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState({ observing: false, hasEntered: true });
          observer.disconnect();
        }
      },
      { rootMargin: viewportMargin },
    );
    setState({ observing: true, hasEntered: false });
    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldReduceMotion, viewportMargin]);

  return {
    ref,
    isHidden: state.observing && !state.hasEntered && !shouldReduceMotion,
  };
}

type RevealMotionProps = Omit<
  HTMLMotionProps<"div">,
  "animate" | "initial" | "ref" | "transition" | "viewport" | "whileInView"
>;

interface RevealProps extends RevealMotionProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  viewportMargin?: string;
}

export function Reveal({
  children,
  delay = 0,
  distance = MOTION_TOKENS.distance.standard,
  direction = "up",
  duration = MOTION_TOKENS.duration.section,
  className = "",
  viewportMargin = "-60px",
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, isHidden } = useRevealState(shouldReduceMotion, viewportMargin);
  const offset = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={isHidden ? { opacity: 0, ...offset } : { opacity: 1, x: 0, y: 0 }}
      {...(!shouldReduceMotion && {
        transition: {
          duration,
          delay,
          ease: MOTION_TOKENS.ease.entrance,
        },
      })}
      className={className}
      data-motion-entrance
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerContainerMotionProps = Omit<
  HTMLMotionProps<"div">,
  "animate" | "initial" | "ref" | "variants" | "viewport" | "whileInView"
>;

interface StaggerContainerProps extends StaggerContainerMotionProps {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  viewportMargin?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = MOTION_TOKENS.stagger.tight,
  delayChildren = 0.05,
  className = "",
  viewportMargin = "-40px",
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, isHidden } = useRevealState(shouldReduceMotion, viewportMargin);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={isHidden ? "hidden" : "visible"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      data-motion-entrance
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemMotionProps = Omit<HTMLMotionProps<"div">, "initial" | "ref" | "variants">;

export function StaggerItem({
  children,
  className = "",
  distance = MOTION_TOKENS.distance.subtle,
  ...props
}: StaggerItemMotionProps & { children: ReactNode; distance?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: MOTION_TOKENS.duration.standard,
            ease: MOTION_TOKENS.ease.entrance,
          },
        },
      }}
      className={className}
      data-motion-entrance
      {...props}
    >
      {children}
    </motion.div>
  );
}
