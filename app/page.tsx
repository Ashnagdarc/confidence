import { getBlogPostPreviews } from "@/lib/blog";

import { HomePageClient } from "./home-page-client";

export default async function Home() {
  const articles = await getBlogPostPreviews();

  return <HomePageClient articles={articles} />;
}
