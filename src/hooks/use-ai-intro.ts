import { useCallback, useEffect, useRef, useState } from "react";
import { AI_INTRO_DURATION, AI_INTRO_SEGMENTS, introSegmentAt } from "@/lib/ai-intro";

export function useAiIntro() {
  const [status, setStatus] = useState<"ready" | "playing" | "paused" | "ended">("ready");
  const [elapsed, setElapsed] = useState(0);
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
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
    setVoiceAvailable("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    return silence;
  }, [silence]);

  useEffect(() => {
    if (status !== "playing") return;
    lastTick.current = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = now - lastTick.current;
      lastTick.current = now;
      setElapsed(previous => Math.min(AI_INTRO_DURATION, previous + delta));
    }, 100);
    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (elapsed >= AI_INTRO_DURATION) setStatus("ended");
  }, [elapsed]);

  useEffect(() => {
    silence();
    if (status !== "playing" || !voiceEnabled || !voiceAvailable) return;
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
      utterance.onend = () => { if (generation.current === currentGeneration) speaking.current = false; };
      speaking.current = true;
      window.speechSynthesis.speak(utterance);
    } catch {
      speaking.current = false;
      setVoiceError(true);
      setVoiceAvailable(false);
      setVoiceEnabled(false);
    }
    return silence;
  }, [status, segmentIndex, voiceEnabled, voiceAvailable, silence]);

  const play = () => { if (status === "ended") setElapsed(0); setStatus("playing"); };
  const pause = () => { silence(); setStatus("paused"); };
  const replay = () => { silence(); setElapsed(0); setStatus("playing"); };
  return { status, elapsed, segmentIndex, voiceAvailable, voiceEnabled, voiceError, setVoiceEnabled, play, pause, replay };
}