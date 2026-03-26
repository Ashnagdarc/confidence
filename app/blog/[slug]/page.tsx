import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteNavbar } from "@/components/site-navbar";
import {
  formatBlogDate,
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog";

import styles from "../blog.module.css";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Confidence Molade",
    };
  }

  return {
    title: `${post.title} | Confidence Molade`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);
  const publishedLabel = formatBlogDate(post.publishedAt);

  return (
    <>
      <SiteNavbar
        logoHref="/"
        mobilePanelId="blog-post-mobile-nav-panel"
        scrollThreshold={24}
        sectionPrefix="/"
      />

      <main className={styles.pageMain}>
        <article className={styles.readerShell}>
          <Link href="/blog" className={styles.backLink}>
            Back to all articles
          </Link>

          <header className={styles.readerHeader}>
            <p className={styles.articleMeta}>
              {post.category} · {publishedLabel} · {post.readTime}
            </p>
            <h1 className={styles.readerTitle}>{post.title}</h1>
            <p className={styles.readerIntro}>{post.intro}</p>
          </header>

          <div className={styles.readerBody}>
            <div className={styles.readerContent}>
              <blockquote className={styles.pullQuote}>
                <p>{post.pullQuote}</p>
              </blockquote>

              {post.sections.map((section) => (
                <section key={section.heading} className={styles.contentSection}>
                  <h2 className={styles.contentHeading}>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className={styles.contentParagraph}>
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <aside className={styles.readerAside}>
              <div className={styles.asideCard}>
                <p className={styles.asideLabel}>Key Takeaways</p>
                <ul className={styles.takeawayList}>
                  {post.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.asideCard}>
                <p className={styles.asideLabel}>Continue the conversation</p>
                <p className={styles.asideText}>
                  If this article aligns with the kind of market, media, or
                  leadership perspective you need, start a direct conversation.
                </p>
                <Link href="/contact" className={styles.sectionLink}>
                  Contact Confidence
                </Link>
              </div>
            </aside>
          </div>
        </article>

        <section className={styles.relatedSection}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Keep Reading</p>
              <h2 className={styles.sectionTitle}>
                More perspectives from the journal.
              </h2>
            </div>
            <Link href="/blog" className={styles.sectionLink}>
              View all articles
            </Link>
          </div>

          <div className={styles.articleGrid}>
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className={styles.articleCard}
              >
                <p className={styles.articleMeta}>
                  {relatedPost.category} · {formatBlogDate(relatedPost.publishedAt)}
                </p>
                <h3 className={styles.articleTitle}>{relatedPost.title}</h3>
                <p className={styles.articleExcerpt}>{relatedPost.excerpt}</p>
                <span className={styles.articleCta}>
                  Read article · {relatedPost.readTime}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
