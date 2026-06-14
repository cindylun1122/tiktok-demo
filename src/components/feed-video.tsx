"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  isMediaAutoplayUnlocked,
  onMediaAutoplayUnlock,
  registerAutoplayVideo,
  syncUnmuteVideos,
} from "@/src/lib/media-autoplay";

export function FeedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsUnmute, setNeedsUnmute] = useState(false);

  const updateMutedState = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setNeedsUnmute(video.muted || video.paused);
  }, []);

  const playWithSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return false;

    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;

    try {
      await video.play();
      updateMutedState();
      return !video.muted && !video.paused;
    } catch {
      updateMutedState();
      return false;
    }
  }, [updateMutedState]);

  const tryAutoplay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    const playedWithSound = await playWithSound();
    if (playedWithSound) return;

    video.muted = true;
    try {
      await video.play();
    } catch {
      updateMutedState();
      return;
    }

    updateMutedState();

    if (isMediaAutoplayUnlocked()) {
      syncUnmuteVideos();
      updateMutedState();
    }
  }, [playWithSound, updateMutedState]);

  const handleUnmute = () => {
    syncUnmuteVideos();
    updateMutedState();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unregister = registerAutoplayVideo(video);

    const onReady = () => {
      void tryAutoplay();
    };

    const onStateChange = () => {
      updateMutedState();
    };

    video.addEventListener("canplay", onReady);
    video.addEventListener("playing", onStateChange);
    video.addEventListener("volumechange", onStateChange);
    void tryAutoplay();

    const unsubscribe = onMediaAutoplayUnlock(() => {
      syncUnmuteVideos();
      updateMutedState();
    });

    return () => {
      unregister();
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("playing", onStateChange);
      video.removeEventListener("volumechange", onStateChange);
      unsubscribe();
    };
  }, [tryAutoplay, updateMutedState]);

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

      {needsUnmute ? (
        <button
          type="button"
          onPointerDown={(event) => {
            event.stopPropagation();
            handleUnmute();
          }}
          className="absolute bottom-[190px] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/55 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]"
          aria-label="Turn on sound"
        >
          <SpeakerIcon />
          Tap for sound
        </button>
      ) : null}
    </div>
  );
}

function SpeakerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5L6 9H3v6h3l5 4V5z"
        fill="currentColor"
      />
      <path
        d="M15.5 8.5a5 5 0 010 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18 6a8.5 8.5 0 010 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
