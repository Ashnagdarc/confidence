import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteNavbar } from "@/components/site-navbar";
import {
  formatBlogDate,
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog";
import { resolveBlogImageUrl } from "@/sanity/lib/image";

import styles from "../blog.module.css";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className={styles.contentParagraph}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className={styles.contentHeading}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className={styles.contentSubheading}>{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className={styles.pullQuote}>
        <p>{children}</p>
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageUrl = resolveBlogImageUrl(value, {
        width: 1400,
        fit: "max",
      });

      if (!imageUrl) {
        return null;
      }

      return (
        <figure className={styles.inlineImageFigure}>
          <img
            src={imageUrl}
            alt={value.alt ?? ""}
            className={styles.inlineImage}
            loading="lazy"
          />
          {value.caption ? (
            <figcaption className={styles.inlineImageCaption}>
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

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
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(post.slug, 3);
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
            {post.mainImage ? (
              <figure className={styles.heroImageFigure}>
                <img
                  src={resolveBlogImageUrl(post.mainImage, {
                    width: 1600,
                    height: 900,
                    fit: "crop",
                  }) ?? ""}
                  alt={post.mainImage.alt ?? post.title}
                  className={styles.heroImage}
                />
                {post.mainImage.caption ? (
                  <figcaption className={styles.heroImageCaption}>
                    {post.mainImage.caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
          </header>

          <div className={styles.readerContent}>
            <blockquote className={styles.pullQuote}>
              <p>{post.pullQuote}</p>
            </blockquote>

            <aside className={styles.readerSummaryCard}>
              <div className={styles.summaryBlock}>
                <p className={styles.asideLabel}>Key Takeaways</p>
                <ul className={styles.takeawayList}>
                  {post.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.summaryBlock}>
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

            {post.sections?.length
              ? post.sections.map((section) => (
                  <section key={section.heading} className={styles.contentSection}>
                    <h2 className={styles.contentHeading}>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className={styles.contentParagraph}>
                        {paragraph}
                      </p>
                    ))}
                    {section.image ? (
                      <figure className={styles.inlineImageFigure}>
                        <img
                          src={resolveBlogImageUrl(section.image, {
                            width: 1400,
                            fit: "max",
                          }) ?? ""}
                          alt={section.image.alt ?? section.heading}
                          className={styles.inlineImage}
                          loading="lazy"
                        />
                        {section.image.caption ? (
                          <figcaption className={styles.inlineImageCaption}>
                            {section.image.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    ) : null}
                  </section>
                ))
              : post.body?.length
                ? (
                    <PortableText
                      value={post.body}
                      components={portableTextComponents}
                    />
                  )
                : null}
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
                {relatedPost.mainImage ? (
                  <div className={styles.cardMedia}>
                    <img
                      src={resolveBlogImageUrl(relatedPost.mainImage, {
                        width: 960,
                        height: 620,
                        fit: "crop",
                      }) ?? ""}
                      alt={relatedPost.mainImage.alt ?? relatedPost.title}
                      className={styles.articleImage}
                      loading="lazy"
                    />
                  </div>
                ) : null}
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
