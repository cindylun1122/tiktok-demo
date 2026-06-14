import { ClipReviewScreen } from "@/src/components/clip-review-screen";
import {
  getReviewBackHref,
  getReviewConfirmHref,
  getReviewRecordAgainHref,
} from "@/src/lib/review-navigation";

type ClipReviewPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function Clip2ReviewPage({
  searchParams,
}: ClipReviewPageProps) {
  const { from } = await searchParams;

  return (
    <ClipReviewScreen
      clip={2}
      title="Clip 2"
      backHref={getReviewBackHref(from, "/template/clip-2")}
      recordAgainHref={getReviewRecordAgainHref(2, from)}
      confirmHref={getReviewConfirmHref(from, 2)}
    />
  );
}
