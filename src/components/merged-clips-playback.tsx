"use client";

import { useEffect, useRef, useState } from "react";
import { getClipRecordingEntries } from "@/src/lib/clip-recordings";
import { VideoSubtitle } from "@/src/components/video-subtitle";

type ClipEntry = { clip: number; url: string };

function preloadVideo(video: HTMLVideoElement, url: string) {
  return new Promise<void>((resolve) => {
    if (
      video.src === url &&
      video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA
    ) {
      resolve();
      return;
    }

    const onReady = () => {
      video.removeEventListener("canplaythrough", onReady);
      resolve();
    };

    video.addEventListener("canplaythrough", onReady, { once: true });
    video.src = url;
    video.preload = "auto";
    video.load();
  });
}

export function MergedClipsPlayback() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const entriesRef = useRef<ClipEntry[]>([]);
  const indexRef = useRef(0);
  const activeRef = useRef<"a" | "b">("a");
  const [entries, setEntries] = useState<ClipEntry[]>([]);
  const [activeLayer, setActiveLayer] = useState<"a" | "b">("a");
  const [activeClip, setActiveClip] = useState(1);

  const setActiveIndex = (index: number) => {
    indexRef.current = index;
    const entry = entriesRef.current[index];
    if (entry) setActiveClip(entry.clip);
  };

  useEffect(() => {
    const nextEntries = getClipRecordingEntries();
    entriesRef.current = nextEntries;
    setEntries(nextEntries);
    if (nextEntries[0]) setActiveClip(nextEntries[0].clip);
  }, []);

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    const clipEntries = entriesRef.current;

    if (!videoA || !videoB || clipEntries.length === 0) return;

    let cancelled = false;

    const getVideos = (layer: "a" | "b") =>
      layer === "a"
        ? { current: videoA, next: videoB }
        : { current: videoB, next: videoA };

    const handleEnded = async (layer: "a" | "b") => {
      if (cancelled || activeRef.current !== layer) return;

      const { current, next } = getVideos(layer);
      const clipEntries = entriesRef.current;
      if (clipEntries.length === 0) return;

      const nextIndex = (indexRef.current + 1) % clipEntries.length;
      const nextLayer: "a" | "b" = layer === "a" ? "b" : "a";
      const nextEntry = clipEntries[nextIndex]!;
      const preloadEntry =
        clipEntries[(nextIndex + 1) % clipEntries.length]!;

      current.pause();

      if (
        next.src !== nextEntry.url ||
        next.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA
      ) {
        await preloadVideo(next, nextEntry.url);
      }

      if (cancelled) return;

      next.currentTime = 0;
      next.muted = false;
      activeRef.current = nextLayer;
      setActiveLayer(nextLayer);
      setActiveIndex(nextIndex);
      void next.play().catch(() => {
        next.muted = true;
        void next.play();
      });

      void preloadVideo(current, preloadEntry.url);
    };

    const onEndedA = () => {
      void handleEnded("a");
    };
    const onEndedB = () => {
      void handleEnded("b");
    };

    videoA.addEventListener("ended", onEndedA);
    videoB.addEventListener("ended", onEndedB);

    const start = async () => {
      indexRef.current = 0;
      activeRef.current = "a";
      setActiveLayer("a");
      setActiveIndex(0);

      const firstEntry = clipEntries[0]!;
      const secondEntry =
        clipEntries.length > 1 ? clipEntries[1]! : clipEntries[0]!;

      await preloadVideo(videoA, firstEntry.url);
      if (cancelled) return;

      videoA.currentTime = 0;
      videoA.muted = false;
      void videoA.play().catch(() => {
        videoA.muted = true;
        void videoA.play();
      });
      void preloadVideo(videoB, secondEntry.url);
    };

    void start();

    return () => {
      cancelled = true;
      videoA.removeEventListener("ended", onEndedA);
      videoB.removeEventListener("ended", onEndedB);
      videoA.pause();
      videoB.pause();
    };
  }, [entries]);

  if (entries.length === 0) return null;

  const videoClassName =
    "absolute inset-0 h-full w-full object-cover transition-none";

  return (
    <>
      <video
        ref={videoARef}
        playsInline
        preload="auto"
        className={`${videoClassName} ${activeLayer === "a" ? "z-[1]" : "z-0"}`}
        aria-hidden
      />
      <video
        ref={videoBRef}
        playsInline
        preload="auto"
        className={`${videoClassName} ${activeLayer === "b" ? "z-[1]" : "z-0"}`}
        aria-hidden
      />
      <VideoSubtitle clip={activeClip} />
    </>
  );
}
