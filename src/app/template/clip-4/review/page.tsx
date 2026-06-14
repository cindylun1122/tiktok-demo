import { ClipReviewScreen } from "@/src/components/clip-review-screen";
import {
  getReviewBackHref,
  getReviewConfirmHref,
  getReviewRecordAgainHref,
} from "@/src/lib/review-navigation";

type ClipReviewPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function Clip4ReviewPage({
  searchParams,
}: ClipReviewPageProps) {
  const { from } = await searchParams;

  return (
    <ClipReviewScreen
      clip={4}
      title="Clip 4"
      backHref={getReviewBackHref(from, "/template/clip-4")}
      recordAgainHref={getReviewRecordAgainHref(4, from)}
      confirmHref={getReviewConfirmHref(from, 4)}
    />
  );
}
