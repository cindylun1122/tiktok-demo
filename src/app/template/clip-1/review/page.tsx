import { ClipReviewScreen } from "@/src/components/clip-review-screen";

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
      defaultBackHref="/template"
      from={from}
    />
  );
}
