import type { Metadata } from "next";
import Link from "next/link";

import { SiteNavbar } from "@/components/site-navbar";
import {
  formatBlogDate,
  getAllBlogPosts,
} from "@/lib/blog";
import { resolveBlogImageUrl } from "@/sanity/lib/image";

import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog | Confidence Molade",
  description:
    "Insights from Confidence Molade on real estate, leadership, faith, media, and the future of investment in Lagos.",
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();
  const [featuredPost, ...remainingPosts] = posts;

  return (
    <>
      <SiteNavbar
        logoHref="/"
        mobilePanelId="blog-mobile-nav-panel"
        scrollThreshold={24}
        sectionPrefix="/"
      />

      <main className={styles.pageMain}>
        <section className={styles.heroSection}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Confidence Journal</p>
            <h1 className={styles.heroTitle}>
              Market intelligence,
              <br />
              leadership clarity,
              <br />
              and perspective with weight.
            </h1>
            <p className={styles.heroText}>
              This is where the thinking lives in full: real estate analysis,
              investor guidance, personal leadership lessons, and cultural
              commentary shaped by actual operating experience.
            </p>
          </div>

          {featuredPost ? (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className={`${styles.articleCard} ${styles.featuredCard}`.trim()}
            >
              {featuredPost.mainImage ? (
                <div className={styles.featuredMedia}>
                  <img
                    src={resolveBlogImageUrl(featuredPost.mainImage, {
                      width: 1200,
                      height: 700,
                      fit: "crop",
                    }) ?? ""}
                    alt={featuredPost.mainImage.alt ?? featuredPost.title}
                    className={styles.articleImage}
                    loading="lazy"
                  />
                </div>
              ) : null}
              <p className={styles.articleMeta}>
                {featuredPost.category} · {formatBlogDate(featuredPost.publishedAt)}
              </p>
              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p className={styles.articleExcerpt}>{featuredPost.excerpt}</p>
              <span className={styles.articleCta}>
                Read article · {featuredPost.readTime}
              </span>
            </Link>
          ) : null}
        </section>

        <section className={styles.gridSection}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>All Articles</p>
              <h2 className={styles.sectionTitle}>Read the full archive.</h2>
            </div>
            <Link href="/contact" className={styles.sectionLink}>
              Request a speaking or media conversation
            </Link>
          </div>

          <div className={styles.articleGrid}>
            {remainingPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={styles.articleCard}
              >
                {post.mainImage ? (
                  <div className={styles.cardMedia}>
                    <img
                      src={resolveBlogImageUrl(post.mainImage, {
                        width: 960,
                        height: 620,
                        fit: "crop",
                      }) ?? ""}
                      alt={post.mainImage.alt ?? post.title}
                      className={styles.articleImage}
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <p className={styles.articleMeta}>
                  {post.category} · {formatBlogDate(post.publishedAt)}
                </p>
                <h3 className={styles.articleTitle}>{post.title}</h3>
                <p className={styles.articleExcerpt}>{post.excerpt}</p>
                <span className={styles.articleCta}>
                  Read article · {post.readTime}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
