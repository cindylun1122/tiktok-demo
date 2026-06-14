import { TemplateScreen } from "@/src/components/template-screen";

type TemplatePageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function TemplateClip3Page({
  searchParams,
}: TemplatePageProps) {
  const { from } = await searchParams;

  return <TemplateScreen activeClip={3} returnFrom={from} />;
}
