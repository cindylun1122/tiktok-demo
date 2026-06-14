import {
  getClipRecordingHref,
  getClipReviewHref,
  getClipStageHref,
} from "@/src/lib/structure-clips";
import { areAllClipsRecorded } from "@/src/lib/clip-recordings";

export function getReviewBackHref(from: string | undefined, defaultHref: string) {
  if (from === "complete") return "/template/complete";
  if (from?.startsWith("clip-")) {
    const clip = Number(from.replace("clip-", ""));
    if (clip >= 1) return getClipStageHref(clip);
  }
  return defaultHref;
}

/** Client-side: depends on in-memory clip recordings. */
export function getReviewConfirmHref(from: string | undefined, clip: number) {
  if (from === "complete") return "/template/complete";
  if (clip < 4) return getClipStageHref(clip + 1);
  if (areAllClipsRecorded()) return "/template/complete";
  return getClipStageHref(4);
}

function appendFromParam(href: string, from?: string) {
  if (!from) return href;
  return `${href}?from=${encodeURIComponent(from)}`;
}

export function getReviewRecordAgainHref(clip: number, from?: string) {
  return appendFromParam(getClipStageHref(clip), from);
}

export function getReviewNextHref(clip: number, from?: string) {
  return appendFromParam(getClipReviewHref(clip), from);
}

export function getRecordingHrefWithFrom(clip: number, from?: string) {
  return appendFromParam(getClipRecordingHref(clip), from);
}

export function getClipStageHrefWithFrom(clip: number, from?: string) {
  return appendFromParam(getClipStageHref(clip), from);
}

export function isReRecordingFromComplete(from?: string) {
  return from === "complete";
}
