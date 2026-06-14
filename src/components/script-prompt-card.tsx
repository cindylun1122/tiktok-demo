import { getStructureClip } from "@/src/lib/structure-clips";

export function ScriptPromptCard({
  recording = false,
  clip = 1,
  sheetOpen = false,
  onMoreClick,
}: {
  recording?: boolean;
  clip?: number;
  sheetOpen?: boolean;
  onMoreClick?: () => void;
}) {
  const { emotion, emotionEmoji, subtitle } = getStructureClip(clip);
  const bright = sheetOpen || !recording;

  return (
    <div
      className={`absolute left-[14px] right-[56px] top-[56px] rounded-[12px] bg-black/40 px-4 pb-5 pt-3 ${
        sheetOpen ? "z-30" : "z-10"
      } ${bright ? "" : "opacity-70"}`}
    >
      <div className="relative mb-2 pr-6">
        <span className="text-left text-[16px] font-medium text-white/80">
          {emotionEmoji} {emotion}
        </span>
        <div className="absolute right-0 top-0">
          {onMoreClick ? (
            <button
              type="button"
              onClick={onMoreClick}
              className="flex h-5 w-5 items-center justify-center"
              aria-label="Open structure"
            >
              <MoreIcon />
            </button>
          ) : (
            <MoreIcon />
          )}
        </div>
      </div>
      {subtitle ? (
        <div className="flex items-end justify-between gap-3">
          <p className="min-w-0 flex-1 text-left text-[28px] font-bold leading-[34px] tracking-tight text-white">
            {subtitle}
          </p>
          <span className="shrink-0 text-[12px] font-medium leading-none text-white/70">
            {clip}/4
          </span>
        </div>
      ) : (
        <div className="flex justify-end">
          <span className="text-[12px] font-medium leading-none text-white/70">
            {clip}/4
          </span>
        </div>
      )}
    </div>
  );
}

function MoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}
