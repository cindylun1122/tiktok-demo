"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "@/src/components/phone-frame";
import { ScriptPromptSection } from "@/src/components/script-prompt-section";
import { StatusBar } from "@/src/components/status-bar";
import { TemplateClipBar } from "@/src/components/template-clip-bar";

import {
  getClipRecordingHref,
  getStructureClip,
} from "@/src/lib/structure-clips";
import {
  getRecordingHrefWithFrom,
  isReRecordingFromComplete,
} from "@/src/lib/review-navigation";

type TemplateScreenProps = {
  activeClip: number;
  duration?: number;
  recordingHref?: string;
  allComplete?: boolean;
  returnFrom?: string;
};

export function TemplateScreen({
  activeClip,
  duration = getStructureClip(activeClip).recordingDuration,
  recordingHref,
  allComplete = false,
  returnFrom,
}: TemplateScreenProps) {
  const resolvedRecordingHref =
    recordingHref ?? getRecordingHrefWithFrom(activeClip, returnFrom);
  const reRecordingFromComplete = isReRecordingFromComplete(returnFrom);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [assistantOn, setAssistantOn] = useState(true);

  const toggleAssistant = () => {
    setAssistantOn((on) => {
      if (on) setSheetOpen(false);
      return !on;
    });
  };

  return (
    <PhoneFrame
      variant="inset"
      camera
      hideBottomInset={sheetOpen}
      top={<StatusBar />}
      bottom={
        <TemplateClipBar
          activeClip={activeClip}
          allComplete={allComplete}
          reRecordingFromComplete={reRecordingFromComplete}
          returnFrom={returnFrom}
        />
      }
    >
      {/* Top bar — 16px from gray area top */}
      <div className="relative z-10 flex h-[44px] items-center justify-between px-[14px] pt-4">
        <Link
          href="/"
          className="flex h-[28px] w-[28px] items-center justify-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
          aria-label="Close"
        >
          <CloseIcon />
        </Link>
        <div className="absolute left-1/2 flex h-[42px] max-w-[220px] -translate-x-1/2 items-center rounded-full bg-black/20 pl-3 pr-2">
          <MusicNoteIcon />
          <span className="mx-2 min-w-0 flex-1 truncate text-[15px] font-bold leading-none text-white">
            Scott Street...
          </span>
          <div className="mx-1 h-5 w-px shrink-0 bg-white/35" />
          <button
            type="button"
            className="flex h-7 w-7 shrink-0 items-center justify-center text-white"
            aria-label="Remove sound"
          >
            <TagCloseIcon />
          </button>
        </div>
        <div className="h-[28px] w-[28px] shrink-0" aria-hidden />
      </div>

      {/* Right toolbar — single 42px column, 21px between items */}
      <div className="absolute right-[12.5px] top-4 z-10 flex w-[42px] flex-col items-center gap-[21px] [&>*]:drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
        <SyncIcon />
        <FlashOffIcon />
        <div className="h-px w-5 shrink-0 bg-white/35" />
        <TimerIcon />
        <BeautifyIcon />
        <FiltersIcon />
        <button
          type="button"
          onClick={toggleAssistant}
          className="relative flex h-[28px] w-[28px] shrink-0 translate-x-[2px] items-center justify-center p-0"
          aria-label={
            assistantOn ? "Turn off script assistant" : "Turn on script assistant"
          }
          aria-pressed={assistantOn}
        >
          <ScriptAssistantIcon active={assistantOn} />
        </button>
      </div>

      <ScriptPromptSection
        clip={activeClip}
        recordingHref={resolvedRecordingHref}
        assistantOn={assistantOn}
        onSheetOpenChange={setSheetOpen}
      />

      {/* Mode selector — duration centered on screen */}
      <div className="absolute bottom-[114px] left-0 right-0 z-10 h-[26px]">
        <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-white px-3 py-[5px] text-[13px] font-semibold leading-none text-black shadow-[0_1px_3px_rgba(0,0,0,0.22)]">
          {duration}s
        </span>
        <span className="absolute left-[calc(50%+40px)] top-[5px] text-[13px] font-semibold leading-none text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
          PHOTO
        </span>
      </div>

      {/* Record controls */}
      <div className="absolute bottom-[26px] left-0 right-0 z-10 flex items-center justify-center">
        <div className="absolute left-[56px] h-[56px] w-[56px] overflow-hidden rounded-[6px] border border-white/30">
          <Image
            src="/gallery-thumb.png"
            alt=""
            width={56}
            height={56}
            className="h-full w-full object-cover"
          />
        </div>
        <Link
          href={resolvedRecordingHref}
          className="flex h-[80px] w-[80px] items-center justify-center rounded-full border-[4px] border-white"
          aria-label="Start recording"
        >
          <div className="h-[64px] w-[64px] rounded-full bg-[#fe2c55]" />
        </Link>
        {allComplete && (
          <Link
            href="/template/post"
            className="absolute right-[56px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#fe2c55]"
            aria-label="Finish"
          >
            <FinishCheckIcon />
          </Link>
        )}
      </div>
    </PhoneFrame>
  );
}

function FinishCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MusicNoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="shrink-0">
      <path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" />
    </svg>
  );
}

function TagCloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 7h-3V4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 7a7 7 0 0 0-11 4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 17h3v3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 17a7 7 0 0 0 11-4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlashOffIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 4l16 16"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="8" stroke="white" strokeWidth="1.5" />
      <path d="M12 13V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 3h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 6v1"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1 3"
      />
    </svg>
  );
}

function BeautifyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 19L14.5 9.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.8 8.2l2-2 2 2-2 2z"
        stroke="white"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M16.8 4.8l.8 1.6 1.6.8-1.6.8-.8 1.6-.8-1.6-1.6-.8 1.6-.8z"
        fill="white"
      />
      <path
        d="M19.8 8.2l.6 1.2 1.2.6-1.2.6-.6 1.2-.6-1.2-1.2-.6 1.2-.6z"
        fill="white"
      />
    </svg>
  );
}

function FiltersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="8" r="4" stroke="white" strokeWidth="1.5" />
      <circle cx="16" cy="8" r="4" stroke="white" strokeWidth="1.5" />
      <circle cx="12" cy="16" r="4" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function ScriptAssistantIcon({ active }: { active: boolean }) {
  return (
    <span className="relative block h-[28px] w-[28px]">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="block"
      >
        <rect
          x="5"
          y="4"
          width="12"
          height="16"
          rx="2"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M8 9h6M8 12h6M8 15h3.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17 6l.6 1.2 1.2.6-1.2.6-.6 1.2-.6-1.2-1.2-.6 1.2-.6.6-1.2z"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      {active ? (
        <span className="absolute -bottom-[1px] -right-[1px] flex h-[12px] w-[12px] items-center justify-center rounded-full bg-[#fe2c55]">
          <svg width="7" height="7" viewBox="0 0 8 8" fill="none" aria-hidden>
            <path
              d="M1.4 4.1l1.7 1.8 3.6-3.7"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : null}
    </span>
  );
}
