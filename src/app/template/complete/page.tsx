import { TemplateScreen } from "@/src/components/template-screen";
import { getClipRecordingHref, getStructureClip } from "@/src/lib/structure-clips";

export default function TemplateCompletePage() {
  const { recordingDuration } = getStructureClip(4);

  return (
    <TemplateScreen
      activeClip={4}
      duration={recordingDuration}
      recordingHref={getClipRecordingHref(4)}
      allComplete
    />
  );
}
