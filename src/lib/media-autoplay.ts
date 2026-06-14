type UnlockListener = () => void;

let unlocked = false;
const listeners = new Set<UnlockListener>();

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

export function unlockMediaAutoplay() {
  if (unlocked) return;
  unlocked = true;
  notify();
}

export function registerMediaAutoplayUnlock() {
  if (typeof window === "undefined" || unlocked) return () => {};

  const unlock = () => {
    unlockMediaAutoplay();
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
    window.removeEventListener("touchstart", unlock);
  };

  window.addEventListener("pointerdown", unlock, { once: true, passive: true });
  window.addEventListener("keydown", unlock, { once: true });
  window.addEventListener("touchstart", unlock, { once: true, passive: true });

  return cleanup;
}
