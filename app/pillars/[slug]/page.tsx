import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPillarBySlug, pillars } from "../pillar-data";
import { PillarStoryPage } from "./pillar-story-page";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return pillars.map((pillar) => ({
    slug: pillar.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    return {
      title: "Pillar Not Found | Confidence Molade",
    };
  }

  return {
    title: `${pillar.title} | Confidence Molade`,
    description: pillar.heroIntro,
  };
}

export default async function PillarPage({ params }: PageProps) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  return <PillarStoryPage pillar={pillar} />;
}
