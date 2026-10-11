import { useCallback, useEffect, useRef, useState } from "react";
import { AI_INTRO_DURATION, AI_INTRO_SEGMENTS, introSegmentAt } from "@/lib/ai-intro";

export function useAiIntro({ narrateOnPlay = false }: { narrateOnPlay?: boolean } = {}) {
  const [status, setStatus] = useState<"ready" | "playing" | "paused" | "ended">("ready");
  const [elapsed, setElapsed] = useState(0);
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(narrateOnPlay);
  const [voiceError, setVoiceError] = useState(false);
  const [revision, setRevision] = useState(0);
  const speaking = useRef(false);
  const generation = useRef(0);
  const lastTick = useRef(0);
  const segmentIndex = introSegmentAt(elapsed);

  const silence = useCallback(() => {
    generation.current += 1;
    if (speaking.current && "speechSynthesis" in window) window.speechSynthesis.cancel();
    speaking.current = false;
  }, []);

  useEffect(() => {
    const available =
      Boolean(window.speechSynthesis) && typeof window.SpeechSynthesisUtterance === "function";
    setVoiceAvailable(available);
    if (!available) setVoiceEnabled(false);
    return silence;
  }, [silence]);

  useEffect(() => {
    if (status !== "playing" || voiceEnabled) return;
    lastTick.current = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = now - lastTick.current;
      lastTick.current = now;
      setElapsed((previous) => Math.min(AI_INTRO_DURATION, previous + delta));
    }, 100);
    return () => window.clearInterval(timer);
  }, [status, voiceEnabled]);

  useEffect(() => {
    if (elapsed >= AI_INTRO_DURATION) setStatus("ended");
  }, [elapsed]);

  useEffect(() => {
    if (!voiceEnabled || !voiceAvailable || status === "ended" || status === "ready") {
      silence();
      return;
    }
    if (status === "paused") {
      if (speaking.current) window.speechSynthesis.pause();
      return;
    }
    if (speaking.current) {
      window.speechSynthesis.resume();
      return;
    }
    const segment = AI_INTRO_SEGMENTS[segmentIndex];
    if (!segment) return;
    const currentGeneration = generation.current;
    try {
      const utterance = new SpeechSynthesisUtterance(segment.text);
      utterance.lang = "en-IN";
      utterance.rate = 1;
      utterance.onerror = () => {
        if (generation.current !== currentGeneration) return;
        speaking.current = false;
        setVoiceError(true);
        setVoiceAvailable(false);
        setVoiceEnabled(false);
      };
      utterance.onend = () => {
        if (generation.current !== currentGeneration) return;
        speaking.current = false;
        setElapsed(
          AI_INTRO_SEGMENTS.slice(0, segmentIndex + 1).reduce(
            (total, part) => total + part.duration,
            0,
          ),
        );
      };
      speaking.current = true;
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    } catch {
      speaking.current = false;
      setVoiceError(true);
      setVoiceAvailable(false);
      setVoiceEnabled(false);
    }
  }, [status, segmentIndex, voiceEnabled, voiceAvailable, silence, revision]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) setStatus((current) => (current === "playing" ? "paused" : current));
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, []);

  const play = () => {
    if (status === "ended") setElapsed(0);
    setStatus("playing");
  };
  const pause = () => {
    setStatus("paused");
  };
  const replay = () => {
    silence();
    setElapsed(0);
    setRevision((current) => current + 1);
    setStatus("playing");
  };
  return {
    status,
    elapsed,
    segmentIndex,
    voiceAvailable,
    voiceEnabled,
    voiceError,
    setVoiceEnabled,
    play,
    pause,
    replay,
  };
}
