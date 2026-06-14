"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame } from "@/src/components/phone-frame";
import { RecordingCamera } from "@/src/components/recording-camera";
import { RecordingHomeBar } from "@/src/components/recording-home-bar";
import { ScriptPromptSection } from "@/src/components/script-prompt-section";
import { StatusBar } from "@/src/components/status-bar";

const RING_SIZE = 96;
const RING_STROKE = 5;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function formatTimer(seconds: number) {
  const whole = Math.floor(seconds);
  return `00:${String(whole).padStart(2, "0")}`;
}

type RecordingScreenProps = {
  clip: number;
  duration: number;
  nextHref?: string;
  recordingHref?: string;
};

export function RecordingScreen({
  clip,
  duration,
  nextHref,
  recordingHref,
}: RecordingScreenProps) {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);

  const handleRecordingComplete = useCallback(() => {
    if (nextHref) router.push(nextHref);
  }, [nextHref, router]);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setElapsed(progress * duration);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration]);

  const progress = Math.min(elapsed / duration, 1);
  const ringOffset = RING_CIRCUMFERENCE * (1 - progress);

  return (
    <PhoneFrame
      variant="inset"
      top={<StatusBar />}
      bottom={<RecordingHomeBar />}
    >
      <RecordingCamera
        clip={clip}
        durationSec={duration}
        onComplete={handleRecordingComplete}
      />

      <ScriptPromptSection
        clip={clip}
        recording
        recordingHref={
          recordingHref ??
          (clip === 2 ? "/template/recording/clip-2" : "/template/recording")
        }
      />

      <div className="absolute bottom-[26px] left-0 right-0 z-10 flex items-center justify-center">
        <div className="relative flex h-[80px] w-[80px] items-center justify-center">
          <span className="absolute bottom-full left-1/2 mb-4 -translate-x-1/2 text-[15px] font-semibold tabular-nums text-white">
            {formatTimer(elapsed)}
          </span>

          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 h-[96px] w-[96px] -translate-x-1/2 -translate-y-1/2 -rotate-90"
            width={RING_SIZE}
            height={RING_SIZE}
            aria-hidden
          >
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={RING_STROKE}
            />
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              stroke="#fe2c55"
              strokeWidth={RING_STROKE}
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={ringOffset}
              strokeLinecap="round"
            />
          </svg>

          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full border-[4px] border-white">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/20">
              <div className="h-[28px] w-[28px] rounded-[6px] bg-[#fe2c55]" />
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
