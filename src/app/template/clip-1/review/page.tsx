import { ClipReviewScreen } from "@/src/components/clip-review-screen";
import {
  getReviewBackHref,
  getReviewConfirmHref,
  getReviewRecordAgainHref,
} from "@/src/lib/review-navigation";

type ClipReviewPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function Clip1ReviewPage({
  searchParams,
}: ClipReviewPageProps) {
  const { from } = await searchParams;

  return (
    <ClipReviewScreen
      clip={1}
      title="Clip 1"
      backHref={getReviewBackHref(from, "/template")}
      recordAgainHref={getReviewRecordAgainHref(1, from)}
      confirmHref={getReviewConfirmHref(from, 1)}
    />
  );
}
