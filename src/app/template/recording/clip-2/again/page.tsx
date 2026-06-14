import { RecordingScreen } from "@/src/components/recording-screen";
import { getReviewNextHref } from "@/src/lib/review-navigation";
import { getStructureClip } from "@/src/lib/structure-clips";

type RecordingAgainPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function RecordingClip2AgainPage({
  searchParams,
}: RecordingAgainPageProps) {
  const { from } = await searchParams;
  const { recordingDuration } = getStructureClip(2);

  return (
    <RecordingScreen
      clip={2}
      duration={recordingDuration}
      nextHref={getReviewNextHref(2, from)}
    />
  );
}
