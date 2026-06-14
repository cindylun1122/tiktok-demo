"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  acquireCameraStream,
  attachStreamToVideo,
  getActiveCameraStream,
  releaseCameraStream,
} from "@/src/lib/camera-stream";
import {
  createClipRecorder,
  saveClipRecording,
} from "@/src/lib/clip-recordings";

type RecordingCameraProps = {
  clip: number;
  durationSec: number;
  onComplete: () => void;
};

export function RecordingCamera({
  clip,
  durationSec,
  onComplete,
}: RecordingCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onCompleteRef = useRef(onComplete);
  const [error, setError] = useState<string | null>(null);

  onCompleteRef.current = onComplete;

  useLayoutEffect(() => {
    const stream = getActiveCameraStream();
    const video = videoRef.current;
    if (stream && video) {
      void attachStreamToVideo(video, stream);
    }
  }, []);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let recorder: MediaRecorder | null = null;
    let stopTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;
    let finished = false;
    let stopReason: "timer" | "cleanup" | null = null;

    async function start() {
      try {
        stream = await acquireCameraStream();

        if (cancelled) return;

        const video = videoRef.current;
        if (video) {
          await attachStreamToVideo(video, stream);
        }

        if (cancelled) return;

        const chunks: BlobPart[] = [];
        recorder = createClipRecorder(stream);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) chunks.push(event.data);
        };

        recorder.onstop = () => {
          if (finished) return;
          finished = true;

          releaseCameraStream();

          if (stopReason !== "timer") return;

          if (chunks.length > 0) {
            const blob = new Blob(chunks, {
              type: recorder?.mimeType || "video/webm",
            });
            saveClipRecording(clip, blob);
          }

          onCompleteRef.current();
        };

        recorder.start(200);

        stopTimer = setTimeout(() => {
          if (cancelled || !recorder) return;
          stopReason = "timer";
          if (recorder.state === "recording") {
            recorder.requestData();
            recorder.stop();
          }
        }, durationSec * 1000);
      } catch {
        if (!cancelled) setError("Camera or microphone permission denied");
      }
    }

    start();

    return () => {
      cancelled = true;
      if (stopTimer) clearTimeout(stopTimer);
      if (!finished && recorder?.state === "recording") {
        stopReason = "cleanup";
        recorder.requestData();
        recorder.stop();
      }
    };
  }, [clip, durationSec]);

  if (error) {
    return (
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#2d2d2d] px-6 text-center">
        <p className="text-[13px] font-medium text-white/55">{error}</p>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="absolute inset-0 z-0 h-full w-full object-cover"
      aria-hidden
    />
  );
}
