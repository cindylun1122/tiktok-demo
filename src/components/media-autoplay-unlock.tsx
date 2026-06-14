"use client";

import { useEffect } from "react";
import { registerMediaAutoplayUnlock } from "@/src/lib/media-autoplay";

export function MediaAutoplayUnlock() {
  useEffect(() => registerMediaAutoplayUnlock(), []);
  return null;
}
