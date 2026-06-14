type UnlockListener = () => void;

const FRAME_WIDTH = 390;
const FRAME_HEIGHT = 844;
const DESKTOP_VIEWPORT_FILL = 0.95;
const MOBILE_BREAKPOINT = 768;

let unlocked = false;
const listeners = new Set<UnlockListener>();
const videos = new Set<HTMLVideoElement>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function isMediaAutoplayUnlocked() {
  return unlocked;
}

export function onMediaAutoplayUnlock(listener: UnlockListener) {
  if (unlocked) {
    listener();
    return () => {};
  }

  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function registerAutoplayVideo(video: HTMLVideoElement) {
  videos.add(video);

  if (unlocked) {
    syncUnmuteVideos();
  }

  return () => {
    videos.delete(video);
  };
}

/** Must run synchronously inside a user-gesture handler (Safari/Mac). */
export function syncUnmuteVideos() {
  videos.forEach((video) => {
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;
    void video.play().catch(() => {});
  });
}

export function unlockMediaAutoplay() {
  if (unlocked) {
    syncUnmuteVideos();
    return;
  }

  unlocked = true;
  syncUnmuteVideos();
  notify();
}

export function registerMediaAutoplayUnlock() {
  if (typeof window === "undefined" || unlocked) return () => {};

  const unlock = () => {
    unlockMediaAutoplay();
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener("pointerdown", unlock, true);
    window.removeEventListener("click", unlock, true);
    window.removeEventListener("keydown", unlock, true);
    window.removeEventListener("touchstart", unlock, true);
  };

  window.addEventListener("pointerdown", unlock, { once: true, capture: true });
  window.addEventListener("click", unlock, { once: true, capture: true });
  window.addEventListener("keydown", unlock, { once: true, capture: true });
  window.addEventListener("touchstart", unlock, { once: true, capture: true });

  return cleanup;
}

export function computeDesktopFrameScale(
  viewportWidth: number,
  viewportHeight: number,
) {
  return Math.min(
    (viewportHeight * DESKTOP_VIEWPORT_FILL) / FRAME_HEIGHT,
    (viewportWidth * DESKTOP_VIEWPORT_FILL) / FRAME_WIDTH,
  );
}

export function isMobileViewport(width = window.innerWidth) {
  return width <= MOBILE_BREAKPOINT;
}

export { FRAME_WIDTH, FRAME_HEIGHT, MOBILE_BREAKPOINT };
