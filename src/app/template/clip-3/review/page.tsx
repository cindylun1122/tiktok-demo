import { ClipReviewScreen } from "@/src/components/clip-review-screen";

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
      defaultBackHref="/template/clip-3"
      from={from}
    />
  );
}
