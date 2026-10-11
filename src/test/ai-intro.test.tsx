import { act, renderHook, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useAiIntro } from "@/hooks/use-ai-intro";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function mockSpeech() {
  const speech = { speak: vi.fn(), cancel: vi.fn(), pause: vi.fn(), resume: vi.fn() };
  vi.stubGlobal("speechSynthesis", speech);
  vi.stubGlobal(
    "SpeechSynthesisUtterance",
    class {
      text: string;
      constructor(text: string) {
        this.text = text;
      }
    },
  );
  return speech;
}

describe("Optional AI intro playback", () => {
  it("keeps video narration silent until Play even when narration is selected", () => {
    const speech = mockSpeech();
    const { result } = renderHook(() => useAiIntro({ narrateOnPlay: true }));
    expect(result.current.voiceEnabled).toBe(true);
    expect(speech.speak).not.toHaveBeenCalled();
    act(() => result.current.play());
    expect(speech.speak).toHaveBeenCalledTimes(1);
  });
  it("never speaks on opening, enabling voice alone, or silent play", () => {
    const speech = mockSpeech();
    const { result } = renderHook(useAiIntro);
    expect(result.current.voiceEnabled).toBe(false);
    expect(speech.speak).not.toHaveBeenCalled();
    act(() => result.current.setVoiceEnabled(true));
    expect(speech.speak).not.toHaveBeenCalled();
    act(() => result.current.setVoiceEnabled(false));
    act(() => result.current.play());
    expect(speech.speak).not.toHaveBeenCalled();
  });
  it("supports text playback, pause, resume and replay without browser speech", () => {
    vi.stubGlobal("speechSynthesis", undefined);
    vi.stubGlobal("SpeechSynthesisUtterance", undefined);
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "performance"] });
    const { result } = renderHook(useAiIntro);
    expect(result.current.voiceAvailable).toBe(false);
    act(() => result.current.play());
    act(() => vi.advanceTimersByTime(7000));
    expect(result.current.segmentIndex).toBe(1);
    act(() => result.current.pause());
    const elapsed = result.current.elapsed;
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.elapsed).toBe(elapsed);
    act(() => result.current.play());
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.elapsed).toBeGreaterThan(elapsed);
    act(() => result.current.replay());
    expect(result.current.elapsed).toBe(0);
  });
  it("starts voice only with play and stops its narration on close", () => {
    const speech = mockSpeech();
    const { result, unmount } = renderHook(useAiIntro);
    act(() => result.current.setVoiceEnabled(true));
    act(() => result.current.play());
    expect(speech.speak).toHaveBeenCalledTimes(1);
    act(() => result.current.pause());
    expect(speech.pause).toHaveBeenCalledTimes(1);
    act(() => result.current.play());
    expect(speech.speak).toHaveBeenCalledTimes(1);
    act(() => result.current.replay());
    expect(speech.speak).toHaveBeenCalledTimes(2);
    unmount();
    expect(speech.cancel).toHaveBeenCalledTimes(2);
  });
});
