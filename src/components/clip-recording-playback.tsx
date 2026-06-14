"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { getClipRecordingUrl } from "@/src/lib/clip-recordings";

export function ClipRecordingPlayback({ clip }: { clip: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [url] = useState(() => getClipRecordingUrl(clip));

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    video.src = url;
    video.muted = false;
    video.load();
    void video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => {});
    });
  }, [url]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      playsInline
      className="absolute inset-0 z-0 h-full w-full bg-black object-cover"
      aria-hidden
    />
  );
}
