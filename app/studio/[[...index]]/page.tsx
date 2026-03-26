import type { Metadata } from "next";
import Link from "next/link";

import { SanityStudioApp } from "@/components/sanity-studio-app";
import {
  isSanityConfigured,
  sanityApiVersion,
} from "@/sanity/env";

export const metadata: Metadata = {
  title: "Studio | Confidence Molade",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="studio-empty-state">
        <div className="studio-empty-card">
          <p className="section-eyebrow">Sanity Studio</p>
          <h1 className="studio-empty-title">Connect your Sanity project first.</h1>
          <p className="studio-empty-copy">
            Add your project details to the environment, then reload this page
            and the editor will appear here.
          </p>
          <div className="studio-empty-code">
            <code>NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id</code>
            <code>NEXT_PUBLIC_SANITY_DATASET=production</code>
            <code>NEXT_PUBLIC_SANITY_API_VERSION={sanityApiVersion}</code>
            <code>NEXT_PUBLIC_SANITY_STUDIO_URL=/studio</code>
          </div>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="sanity-studio-frame">
      <SanityStudioApp />
    </div>
  );
}
