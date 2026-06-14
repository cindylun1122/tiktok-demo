"use client";

import { useEffect, useState } from "react";
import {
  getClipRecordingUrl,
  subscribeClipRecordings,
} from "@/src/lib/clip-recordings";
import { STRUCTURE_CLIPS } from "@/src/lib/structure-clips";

type StructureBottomSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function StructureBottomSheet({
  open,
  onClose,
}: StructureBottomSheetProps) {
  const [, setRevision] = useState(0);

  useEffect(() => subscribeClipRecordings(() => setRevision((value) => value + 1)), []);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-[15]">
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
        aria-label="Close script sheet"
      />

      <div className="absolute inset-x-0 bottom-0 z-[16] rounded-t-[16px] bg-black/75 px-4 pb-5 pt-4 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[17px] font-semibold text-white">Script</h2>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-white"
            aria-label="Edit script"
          >
            <EditIcon />
          </button>
        </div>

        <div className="mb-5 rounded-[12px] bg-[rgba(255,255,255,0.08)] px-1 py-1">
          <div className="flex flex-col">
            {STRUCTURE_CLIPS.map((item) => {
              const isRecorded = getClipRecordingUrl(item.clip) !== null;

              return (
              <div
                key={item.clip}
                className={`rounded-[10px] px-3 py-2.5 ${isRecorded ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-white/55">
                      <span className="font-semibold">Role {item.role}</span>
                      {" · "}
                      <span className="font-normal">
                        {item.emotionEmoji} {item.emotion}
                      </span>
                    </p>
                    <p className="mt-0.5 text-[15px] font-semibold leading-[20px] text-white">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0 pt-0.5 text-right text-[13px] font-medium text-white/55">
                    <p>{item.duration}</p>
                    <p className="mt-0.5 font-normal text-white/35">Clip {item.clip}/4</p>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20h4l10.5-10.5a2.1 2.1 0 00-3-3L5 17v3z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 6.5l3 3"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
