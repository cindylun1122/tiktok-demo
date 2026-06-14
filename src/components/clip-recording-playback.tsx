"use client";

import { useEffect, useRef, useState } from "react";
import { getClipRecordingUrl } from "@/src/lib/clip-recordings";

export function ClipRecordingPlayback({ clip }: { clip: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    setUrl(getClipRecordingUrl(clip));
  }, [clip]);

  useEffect(() => {
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

  if (!url) return null;

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      playsInline
      className="absolute inset-0 z-0 h-full w-full object-cover"
      aria-hidden
    />
  );
}
