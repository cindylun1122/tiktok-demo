import { RecordingScreen } from "@/src/components/recording-screen";
import { getReviewNextHref } from "@/src/lib/review-navigation";
import { getStructureClip } from "@/src/lib/structure-clips";

type RecordingPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function RecordingPage({ searchParams }: RecordingPageProps) {
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
