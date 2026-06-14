"use client";

import { useLayoutEffect, useState } from "react";
import { CameraViewport } from "@/src/components/camera-viewport";
import { ClipRecordingPlayback } from "@/src/components/clip-recording-playback";
import {
  computeDesktopFrameScale,
  FRAME_HEIGHT,
  FRAME_WIDTH,
  isMobileViewport,
  unlockMediaAutoplay,
} from "@/src/lib/media-autoplay";

type PhoneFrameProps = {
  children: React.ReactNode;
  variant?: "full" | "inset";
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  camera?: boolean;
  playbackClip?: number;
  hideBottomInset?: boolean;
};

function usePhoneFrameScale() {
  const [layout, setLayout] = useState(() => ({
    isMobile: false,
    scale: 1,
  }));

  useLayoutEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = isMobileViewport(width);

      setLayout({
        isMobile,
        scale: isMobile
          ? 1
          : computeDesktopFrameScale(width, height),
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return layout;
}

export function PhoneFrame({
  children,
  variant = "full",
  top,
  bottom,
  camera = false,
  playbackClip,
  hideBottomInset = false,
}: PhoneFrameProps) {
  const { isMobile, scale } = usePhoneFrameScale();

  const hostStyle = isMobile
    ? undefined
    : {
        width: FRAME_WIDTH * scale,
        height: FRAME_HEIGHT * scale,
      };

  const innerStyle = isMobile
    ? undefined
    : {
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      };

  const handleViewportPointerDown = () => {
    unlockMediaAutoplay();
  };

  return (
    <div
      className="phone-frame-viewport"
      onPointerDownCapture={handleViewportPointerDown}
    >
      <div className="phone-frame-scale-host" style={hostStyle}>
        {variant === "full" ? (
          <div
            className="phone-frame-inner relative overflow-hidden bg-[#2d2d2d] shadow-2xl"
            style={innerStyle}
          >
            {children}
          </div>
        ) : (
          <div
            className="phone-frame-inner phone-frame-inset relative overflow-hidden bg-black shadow-2xl"
            style={innerStyle}
          >
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
