"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  isMediaAutoplayUnlocked,
  onMediaAutoplayUnlock,
  registerAutoplayVideo,
  syncUnmuteVideos,
} from "@/src/lib/media-autoplay";

export function FeedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playWithSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return false;

    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;

    try {
      await video.play();
      return !video.muted && !video.paused;
    } catch {
      return false;
    }
  }, []);

  const tryAutoplay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    const playedWithSound = await playWithSound();
    if (playedWithSound) return;

    video.muted = true;
    try {
      await video.play();
    } catch {
      return;
    }

    if (isMediaAutoplayUnlocked()) {
      syncUnmuteVideos();
    }
  }, [playWithSound]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unregister = registerAutoplayVideo(video);

    const onReady = () => {
      void tryAutoplay();
    };

    video.addEventListener("canplay", onReady);
    void tryAutoplay();

    const unsubscribe = onMediaAutoplayUnlock(() => {
      syncUnmuteVideos();
    });

    return () => {
      unregister();
      video.removeEventListener("canplay", onReady);
      unsubscribe();
    };
  }, [tryAutoplay]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute left-1/2 top-[46%] h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 scale-100 object-cover"
        src="/video.mp4"
        autoPlay
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
    </div>
  );
}
