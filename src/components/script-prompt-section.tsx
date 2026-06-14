"use client";

import { useState } from "react";
import { ScriptPromptCard } from "@/src/components/script-prompt-card";
import { StructureBottomSheet } from "@/src/components/structure-bottom-sheet";

type ScriptPromptSectionProps = {
  clip: number;
  recording?: boolean;
  recordingHref: string;
  assistantOn?: boolean;
  onSheetOpenChange?: (open: boolean) => void;
};

export function ScriptPromptSection({
  clip,
  recording = false,
  recordingHref,
  assistantOn = true,
  onSheetOpenChange,
}: ScriptPromptSectionProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSheetOpenChange = (open: boolean) => {
    setSheetOpen(open);
    onSheetOpenChange?.(open);
  };

  return (
    <>
      {assistantOn ? (
        <ScriptPromptCard
          clip={clip}
          recording={recording}
          sheetOpen={sheetOpen}
          onMoreClick={() => handleSheetOpenChange(true)}
        />
      ) : null}
      <StructureBottomSheet
        open={sheetOpen}
        onClose={() => handleSheetOpenChange(false)}
      />
    </>
  );
}
