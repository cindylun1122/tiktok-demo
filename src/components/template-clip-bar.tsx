"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  areAllClipsRecorded,
  getClipRecordingUrl,
  getClipThumbnailUrl,
  subscribeClipRecordings,
} from "@/src/lib/clip-recordings";
import { getClipReviewHref, getStructureClip } from "@/src/lib/structure-clips";
import { getClipStageHrefWithFrom } from "@/src/lib/review-navigation";

type TemplateClipBarProps = {
  activeClip?: number;
  reRecordingFromComplete?: boolean;
  returnFrom?: string;
};

function getClipDurationLabel(clipNumber: number) {
  return `${getStructureClip(clipNumber).recordingDuration}s`;
}

function isClipCompleted(clipNumber: number) {
  return getClipRecordingUrl(clipNumber) !== null;
}

function getCompletedReviewHref(
  clipNumber: number,
  activeClip: number,
  allRecorded: boolean,
  reRecordingFromComplete?: boolean,
) {
  if (!isClipCompleted(clipNumber)) return undefined;

  if (reRecordingFromComplete) {
    if (clipNumber === activeClip) return undefined;
    return `${getClipReviewHref(clipNumber)}?from=complete`;
  }

  if (allRecorded) {
    return `${getClipReviewHref(clipNumber)}?from=complete`;
  }

  return `${getClipReviewHref(clipNumber)}?from=clip-${activeClip}`;
}

function getClipCardClassName(isActive: boolean) {
  const base =
    "relative flex h-[48px] w-[48px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] backdrop-blur-md transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out";

  if (isActive) {
    return `${base} scale-[1.04] border-[1.5px] border-[rgba(255,255,255,0.8)] bg-[rgba(255,255,255,0.08)] text-[13px] font-semibold text-white shadow-[0_0_16px_rgba(255,255,255,0.22)]`;
  }

  return `${base} bg-[rgba(255,255,255,0.15)]`;
}

export function TemplateClipBar({
  activeClip = 1,
  reRecordingFromComplete = false,
  returnFrom,
}: TemplateClipBarProps) {
  const [, setRevision] = useState(0);
  const allRecorded = areAllClipsRecorded();

  useEffect(() => subscribeClipRecordings(() => setRevision((value) => value + 1)), []);

  return (
    <div className="relative h-[98px]">
      <div className="absolute inset-x-0 bottom-[33px] flex h-[48px] items-center px-[12.5px]">
        <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-black">
          <Image
            src="/script-thumb.png"
            alt=""
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ml-2 h-6 w-px shrink-0 bg-white/35" />
        <div className="ml-6 flex shrink-0 items-center gap-4">
          {[1, 2, 3, 4].map((clipNumber) => {
            const isCompleted = isClipCompleted(clipNumber);
            const isActive = !allRecorded && clipNumber === activeClip;
            const reviewHref = getCompletedReviewHref(
              clipNumber,
              activeClip,
              allRecorded,
              reRecordingFromComplete,
            );

            const className = getClipCardClassName(isActive);

            if (isCompleted && reviewHref) {
              return (
                <Link
                  key={clipNumber}
                  href={reviewHref}
                  className={className}
                  aria-label={`Review Clip ${clipNumber}`}
                >
                  <ClipCardPreview clipNumber={clipNumber} />
                </Link>
              );
            }

            if (isActive) {
              return (
                <div key={clipNumber} className={className}>
                  <ClipCardDuration clipNumber={clipNumber} />
                </div>
              );
            }

            return (
              <Link
                key={clipNumber}
                href={getClipStageHrefWithFrom(clipNumber, returnFrom)}
                className={className}
                aria-label={`Switch to Clip ${clipNumber}`}
              >
                {isCompleted ? (
                  <ClipCardPreview clipNumber={clipNumber} />
                ) : (
                  <ClipCardIndex clipNumber={clipNumber} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[8px] flex justify-center">
        <div className="h-[5px] w-[134px] rounded-full bg-white" />
      </div>
    </div>
  );
}

function ClipCardDuration({ clipNumber }: { clipNumber: number }) {
  return (
    <span className="absolute inset-0 z-10 flex items-center justify-center text-[13px] font-semibold leading-none text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
      {getClipDurationLabel(clipNumber)}
    </span>
  );
}

function ClipCardIndex({ clipNumber }: { clipNumber: number }) {
  return (
    <span className="absolute bottom-[7px] right-[8px] text-[12px] font-semibold leading-none text-white/70">
      {clipNumber}
    </span>
  );
}

function ClipCardPreview({ clipNumber }: { clipNumber: number }) {
  const thumbnailUrl = getClipThumbnailUrl(clipNumber);

  return (
    <>
      {thumbnailUrl ? (
        <>
          <img
            src={thumbnailUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" aria-hidden />
        </>
      ) : (
        <CheckIcon />
      )}
      <ClipCardDuration clipNumber={clipNumber} />
    </>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 13l4 4L19 7"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
