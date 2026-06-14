import { RecordingScreen } from "@/src/components/recording-screen";
import { getReviewNextHref } from "@/src/lib/review-navigation";
import { getStructureClip } from "@/src/lib/structure-clips";

type RecordingAgainPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function RecordingClip3AgainPage({
  searchParams,
}: RecordingAgainPageProps) {
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
