"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  acquireCameraStream,
  attachStreamToVideo,
  bindStreamToVideo,
  getActiveCameraStream,
} from "@/src/lib/camera-stream";

export function CameraViewport() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    const stream = getActiveCameraStream();
    const video = videoRef.current;
    if (stream && video) {
      bindStreamToVideo(video, stream);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await acquireCameraStream();
        if (cancelled) return;

        const video = videoRef.current;
        if (video) {
          await attachStreamToVideo(video, stream);
        }
      } catch {
        if (!cancelled) setError("Camera or microphone permission denied");
      }
    }

    startCamera();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-black px-6 text-center">
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
