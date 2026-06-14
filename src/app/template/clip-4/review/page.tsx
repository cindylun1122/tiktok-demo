import { ClipReviewScreen } from "@/src/components/clip-review-screen";

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
      defaultBackHref="/template/clip-4"
      from={from}
    />
  );
}
