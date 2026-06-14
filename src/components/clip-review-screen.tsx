import Link from "next/link";
import { PhoneFrame } from "@/src/components/phone-frame";
import { StatusBar } from "@/src/components/status-bar";

type ClipReviewScreenProps = {
  clip: number;
  title: string;
  backHref: string;
  recordAgainHref: string;
  confirmHref: string;
};

export function ClipReviewScreen({
  clip,
  title,
  backHref,
  recordAgainHref,
  confirmHref,
}: ClipReviewScreenProps) {
  return (
    <PhoneFrame
      variant="inset"
      playbackClip={clip}
      top={<StatusBar />}
      bottom={
        <div className="flex h-[98px] items-center gap-2 px-4">
          <Link
            href={recordAgainHref}
            className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-[#212121] text-[15px] font-medium text-white"
          >
            Record again
          </Link>
          <Link
            href={confirmHref}
            className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-white text-[15px] font-medium text-[#212121]"
          >
            Confirm
          </Link>
        </div>
      }
    >
      <div className="relative z-10 flex h-[44px] items-center px-[14px] pt-4">
        <Link
          href={backHref}
          className="flex h-[28px] w-[28px] items-center justify-center text-white"
          aria-label="Back"
        >
          <BackIcon />
        </Link>
        <h1 className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold text-white">
          {title}
        </h1>
      </div>
    </PhoneFrame>
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
