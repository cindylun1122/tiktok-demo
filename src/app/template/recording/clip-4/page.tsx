import { RecordingScreen } from "@/src/components/recording-screen";
import { getReviewNextHref } from "@/src/lib/review-navigation";
import { getStructureClip } from "@/src/lib/structure-clips";

type RecordingPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function RecordingClip4Page({
  searchParams,
}: RecordingPageProps) {
  const { from } = await searchParams;
  const { recordingDuration } = getStructureClip(4);

  return (
    <RecordingScreen
      clip={4}
      duration={recordingDuration}
      nextHref={getReviewNextHref(4, from)}
    />
  );
}
