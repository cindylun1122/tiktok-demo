import { ClipReviewScreen } from "@/src/components/clip-review-screen";

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
      defaultBackHref="/template/clip-2"
      from={from}
    />
  );
}
