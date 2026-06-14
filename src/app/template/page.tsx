import { TemplateScreen } from "@/src/components/template-screen";

type TemplatePageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function TemplatePage({ searchParams }: TemplatePageProps) {
  const { from } = await searchParams;

  return <TemplateScreen activeClip={1} returnFrom={from} />;
}
