import { ClipReviewScreen } from "@/src/components/clip-review-screen";
import {
  getReviewBackHref,
  getReviewConfirmHref,
  getReviewRecordAgainHref,
} from "@/src/lib/review-navigation";

type ClipReviewPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function Clip3ReviewPage({
  searchParams,
}: ClipReviewPageProps) {
  const { from } = await searchParams;

  return (
    <ClipReviewScreen
      clip={3}
      title="Clip 3"
      backHref={getReviewBackHref(from, "/template/clip-3")}
      recordAgainHref={getReviewRecordAgainHref(3, from)}
      confirmHref={getReviewConfirmHref(from, 3)}
    />
  );
}
