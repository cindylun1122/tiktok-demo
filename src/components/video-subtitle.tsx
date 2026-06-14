import { getStructureClip } from "@/src/lib/structure-clips";

const SUBTITLE_OUTLINE =
  "2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 2px 0 0 #000, -2px 0 0 #000, 0 3px 6px rgba(0,0,0,0.35)";

type VideoSubtitleProps = {
  clip: number;
};

export function VideoSubtitle({ clip }: VideoSubtitleProps) {
  const { subtitle } = getStructureClip(clip);

  if (!subtitle) return null;

  return (
    <p
      className="pointer-events-none absolute inset-x-0 bottom-[30%] z-[2] px-5 text-center text-[22px] font-bold leading-[28px] tracking-tight text-white"
      style={{
        WebkitTextStroke: "2.5px #000",
        paintOrder: "stroke fill",
        textShadow: SUBTITLE_OUTLINE,
      }}
    >
      &ldquo;{subtitle}&rdquo;
    </p>
  );
}
