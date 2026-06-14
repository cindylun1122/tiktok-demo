import Link from "next/link";
import { MergedClipsPlayback } from "@/src/components/merged-clips-playback";
import { PhoneFrame } from "@/src/components/phone-frame";
import { StatusBar } from "@/src/components/status-bar";

export function PostPreviewScreen() {
  return (
    <PhoneFrame
      variant="inset"
      top={<StatusBar />}
      bottom={
        <div className="relative h-[98px]">
          <div className="flex h-full items-center gap-2 px-4">
            <button
              type="button"
              className="flex h-[48px] flex-1 items-center justify-center gap-2 rounded-[24px] bg-white text-[15px] font-semibold text-black"
            >
              <div
                className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white text-[13px] font-bold text-black"
                style={{
                  boxShadow: "-2px 0 0 0 #25f4ee, 2px 0 0 0 #fe2c55",
                }}
              >
                C
              </div>
              Your Story
            </button>
            <button
              type="button"
              className="flex h-[48px] flex-1 items-center justify-center rounded-[24px] bg-[#fe2c55] text-[15px] font-semibold text-white"
            >
              Next
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-[8px] flex justify-center">
            <div className="h-[5px] w-[134px] rounded-full bg-white" />
          </div>
        </div>
      }
    >
      <MergedClipsPlayback />

      {/* Top bar — inside gray viewport */}
      <div className="relative z-10 flex h-[44px] items-center justify-between px-[14px] pt-4">
        <Link
          href="/template/complete"
          className="flex h-[28px] w-[28px] items-center justify-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
          aria-label="Back"
        >
          <BackIcon />
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

      {/* Right editing toolbar */}
      <div className="absolute right-[12.5px] top-4 z-10 flex flex-col items-center gap-[21px] [&>*]:drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
        <EditToolIcon>
          <ShareEditIcon />
        </EditToolIcon>
        <EditToolIcon>
          <CropIcon />
        </EditToolIcon>
        <EditToolIcon>
          <TextIcon />
        </EditToolIcon>
        <EditToolIcon>
          <StickerIcon />
        </EditToolIcon>
        <EditToolIcon>
          <EffectsIcon />
        </EditToolIcon>
        <EditToolIcon>
          <FiltersIcon />
        </EditToolIcon>
        <EditToolIcon>
          <MicIcon />
        </EditToolIcon>
        <EditToolIcon>
          <CaptionsIcon />
        </EditToolIcon>
      </div>
    </PhoneFrame>
  );
}

function EditToolIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[28px] w-[28px] items-center justify-center text-white">
      {children}
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 6l-6 6 6 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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

function ShareEditIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 12l10-5v10l-10-5z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 5v14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CropIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 3v12a3 3 0 003 3h12"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 21V9a3 3 0 00-3-3H3"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6h12M9 6v12M15 6v12"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StickerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="white" strokeWidth="1.5" />
      <circle cx="9" cy="10" r="1" fill="white" />
      <circle cx="15" cy="10" r="1" fill="white" />
      <path d="M9 15c1.5 1 4.5 1 6 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EffectsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l1.2 3.6L17 8l-3.8 1.4L12 13l-1.2-3.6L7 8l3.8-1.4L12 3z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M18 14l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FiltersIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="8" r="4" stroke="white" strokeWidth="1.5" />
      <circle cx="16" cy="8" r="4" stroke="white" strokeWidth="1.5" />
      <circle cx="12" cy="16" r="4" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="white" strokeWidth="1.5" />
      <path
        d="M6 11a6 6 0 0012 0M12 17v4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CaptionsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="white" strokeWidth="1.5" />
      <path d="M8 10h8M8 14h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
