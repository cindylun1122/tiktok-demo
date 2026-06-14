import { CameraViewport } from "@/src/components/camera-viewport";
import { ClipRecordingPlayback } from "@/src/components/clip-recording-playback";

type PhoneFrameProps = {
  children: React.ReactNode;
  variant?: "full" | "inset";
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  camera?: boolean;
  playbackClip?: number;
  hideBottomInset?: boolean;
};

export function PhoneFrame({
  children,
  variant = "full",
  top,
  bottom,
  camera = false,
  playbackClip,
  hideBottomInset = false,
}: PhoneFrameProps) {
  return (
    <div className="phone-frame-viewport">
      <div className="phone-frame-scale-host">
        {variant === "full" ? (
          <div className="phone-frame-inner relative overflow-hidden bg-[#2d2d2d] shadow-2xl">
            {children}
          </div>
        ) : (
          <div className="phone-frame-inner phone-frame-inset relative overflow-hidden bg-black shadow-2xl">
            <div
              className={`phone-frame-inset-camera absolute inset-x-0 top-[54px] overflow-hidden bg-black ${
                hideBottomInset
                  ? "phone-frame-inset-camera-expanded bottom-0 rounded-t-[20px]"
                  : "bottom-[98px] rounded-[20px]"
              }`}
            >
              {playbackClip ? (
                <ClipRecordingPlayback clip={playbackClip} />
              ) : null}
              {camera ? <CameraViewport /> : null}
              <div className="relative h-full">{children}</div>
            </div>
            <div className="phone-frame-inset-top absolute inset-x-0 top-0 z-30 h-[54px] bg-black">
              {top}
            </div>
            {!hideBottomInset ? (
              <div className="phone-frame-inset-bottom absolute inset-x-0 bottom-0 z-30 h-[98px] bg-black">
                {bottom}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
