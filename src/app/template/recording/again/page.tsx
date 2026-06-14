import { RecordingScreen } from "@/src/components/recording-screen";
import { getReviewNextHref } from "@/src/lib/review-navigation";
import { getStructureClip } from "@/src/lib/structure-clips";

type RecordingAgainPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function RecordingAgainPage({
  searchParams,
}: RecordingAgainPageProps) {
  const { from } = await searchParams;
  const { recordingDuration } = getStructureClip(1);

  return (
    <RecordingScreen
      clip={1}
      duration={recordingDuration}
      nextHref={getReviewNextHref(1, from)}
    />
  );
}
