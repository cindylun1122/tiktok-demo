"use client";

import { useEffect, useRef } from "react";

export function FeedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    void video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => {});
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute left-1/2 top-[46%] h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 scale-100 object-cover"
        src="/video.mp4"
        autoPlay
        loop
        playsInline
        aria-hidden
      />
    </div>
  );
}
