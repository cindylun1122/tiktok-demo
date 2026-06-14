import { RecordingScreen } from "@/src/components/recording-screen";
import { getReviewNextHref } from "@/src/lib/review-navigation";
import { getStructureClip } from "@/src/lib/structure-clips";

type RecordingPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function RecordingClip3Page({
  searchParams,
}: RecordingPageProps) {
  const { from } = await searchParams;
  const { recordingDuration } = getStructureClip(3);

  return (
    <RecordingScreen
      clip={3}
      duration={recordingDuration}
      nextHref={getReviewNextHref(3, from)}
    />
  );
}
