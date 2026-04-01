"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { SiteNavbar } from "@/components/site-navbar";
import {
  CoverFlow,
  type CoverFlowItem,
} from "@/components/ui/coverflow";
import { LayeredStack } from "@/components/ui/layered-stack";
import heroPortrait from "@/images/logos/ANJDSC07558-Edit.png";
import type { BlogPreview } from "@/lib/blog";

import { pillars } from "./pillars/pillar-data";
import heroStyles from "./hero.module.css";

type Stat = {
  value: string;
  label: string;
};

type WorkItem = {
  tag: string;
  title: string;
  label: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
};

type FadeUpProps = {
  children: ReactNode;
  className?: string;
};

type HomePageClientProps = {
  articles: BlogPreview[];
};

type BrandIntroStage = "hidden" | "active" | "exit";

const stats: Stat[] = [
  { value: "10+", label: "Years in Real Estate" },
  { value: "50+", label: "Podcast Episodes" },
  { value: "7", label: "Pillars of Confidence" },
];

const credentials = [
  "Co-CEO · Eden Oasis Realty",
  "Podcast Host",
  "Electrical Engineer Background",
  "Lagos, Nigeria",
];

const aboutPortrait = {
  caption: "Leadership",
  alt: "Confidence Molade standing in a pink tailored outfit",
  imageSrc: "/pillars/ANJDSC08623-Edit.jpg",
  objectPosition: "center 16%",
};

const works: WorkItem[] = [
  {
    tag: "Real Estate · Lagos",
    title: "Eden Oasis Realty Limited",
    label: "Eden Oasis Realty",
    description:
      "Co-founding and leading one of Lagos's fastest-growing premium real estate companies — serving buyers, investors, and diaspora clients with properties spanning Gracefield Island, Eko Atlantic, Lekki, Epe, and beyond. Eden Oasis has become synonymous with trust, transparency, and transformative investment in Nigeria's dynamic market.",
  },
  {
    tag: "Podcast · Media",
    title: "The KK Show — Key to Keys",
    label: "KK Show",
    description:
      "Nigeria's sharpest weekly real estate podcast, hosted by Confidence every Thursday at 7 PM. Featuring developers, investors, and policy voices — available on Apple Podcasts, Spotify, and YouTube.",
    imageSrc: "/works/kk-show-key-to-keys.jpg",
    imageAlt:
      "Confidence Molade hosting an episode of the KK Show podcast in a studio",
    imagePosition: "center center",
  },
  {
    tag: "Public Speaking · Events",
    title: "Speaker & Conference Keynotes",
    label: "Speaking",
    description:
      "From Women in Business forums to real estate investment summits, Confidence delivers talks that combine data, story, and lived experience to shift mindsets and unlock action in her audiences.",
    imageSrc: "/works/speaker-conference-keynotes.jpg",
    imageAlt:
      "Confidence Molade on stage at a real estate conference panel discussion",
    imagePosition: "center 26%",
  },
  {
    tag: "Property Marketing · Chevron Lekki",
    title: "Gracefield Island Campaign",
    label: "Gracefield Island",
    description:
      "A landmark marketing campaign positioning one of Lagos's most coveted waterfront developments to a diaspora and local audience — blending editorial content, video storytelling, and strategic direct sales.",
  },
  {
    tag: "Writing · Commentary",
    title: "Thought Leadership & Market Commentary",
    label: "Thought Leadership",
    description:
      "Widely shared analysis on Nigeria's tax reform landscape, the New Lagos corridor, shortlet economics, and the future of off-plan investing — writing that positions Eden Oasis at the intersection of intelligence and action.",
    imageSrc: "/works/thought-leadership-market-commentary.jpg",
    imageAlt:
      "Confidence Molade reviewing content with another guest at an event",
    imagePosition: "center 22%",
  },
];

const pillarImages: Record<string, string> = {
  "faith-based-leader": "/pillars/faith-based-leader-v2.jpg",
  "family-woman": "/pillars/family-woman.jpg",
  "public-speaker": "/Speaker.jpg",
  "real-estate-mogul": "/pillars/real-estate-mogul-v3.jpg",
  "style-icon": "/pillars/style-icon.jpg",
  "thought-leader": "/pillars/thought-leader.jpg",
  "content-creator": "/pillars/content-creator.jpg",
};

const pillarImagePositions: Record<string, string> = {
  "public-speaker": "center 18%",
  "thought-leader": "center 16%",
  "real-estate-mogul": "42% center",
  "content-creator": "70% 28%",
  "style-icon": "center 14%",
  "faith-based-leader": "center 16%",
  "family-woman": "center 22%",
};

const pillarCoverflowItems: CoverFlowItem[] = pillars.map((pillar) => ({
  id: pillar.slug,
  image: pillarImages[pillar.slug],
  title: pillar.title,
  subtitle: pillar.shortSummary,
}));

function FadeUp({ children, className = "" }: FadeUpProps) {
  return (
    <div data-fade-up className={`fade-up ${className}`.trim()}>
      {children}
    </div>
  );
}

export function HomePageClient({ articles }: HomePageClientProps) {
  const [brandIntroStage, setBrandIntroStage] =
    useState<BrandIntroStage>("hidden");
  const [activeDesktopPillarSlug, setActiveDesktopPillarSlug] = useState<
    string | null
  >(pillars[0]?.slug ?? null);
  const heroImageLoaded = true;

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-fade-up]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((element, index) => {
      element.style.transitionDelay = `${index * 0.05}s`;
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const activeDesktopPillar =
    pillars.find((pillar) => pillar.slug === activeDesktopPillarSlug) ??
    pillars[0];

  useEffect(() => {
    let exitTimer: number | undefined;
    let hideTimer: number | undefined;

    try {
      const introKey = "confidence-brand-intro-v1";
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion || sessionStorage.getItem(introKey) === "seen") {
        return;
      }

      sessionStorage.setItem(introKey, "seen");
      setBrandIntroStage("active");

      exitTimer = window.setTimeout(() => {
        setBrandIntroStage("exit");
      }, 420);

      hideTimer = window.setTimeout(() => {
        setBrandIntroStage("hidden");
      }, 920);
    } catch {
      setBrandIntroStage("hidden");
    }

    return () => {
      if (exitTimer) {
        window.clearTimeout(exitTimer);
      }

      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
    };
  }, []);

  return (
    <>
      {brandIntroStage !== "hidden" ? (
        <div
          aria-hidden="true"
          className={`${heroStyles.brandIntro} ${
            brandIntroStage === "active" ? heroStyles.brandIntroActive : heroStyles.brandIntroExit
          }`.trim()}
        >
          <div className={heroStyles.brandIntroInner}>
            <div className={heroStyles.brandIntroMark}>
              <Image
                src="/brand/logo-black.png"
                alt=""
                width={120}
                height={120}
                className={heroStyles.brandIntroImage}
                priority
              />
            </div>
            <p className={heroStyles.brandIntroWordmark}>Confidence Molade</p>
          </div>
        </div>
      ) : null}

      <SiteNavbar
        id="navbar"
        logoHref="#home"
        mobilePanelId="home-mobile-nav-panel"
        scrollThreshold={50}
        sectionPrefix=""
      />

      <main>
        <section id="home" className={heroStyles.heroSection}>
          <div className={heroStyles.shell}>
            <div
              className={`${heroStyles.visualStage} ${
                heroImageLoaded ? heroStyles.visualStageLoaded : ""
              }`.trim()}
              aria-hidden="true"
            >
              <div
                className={`${heroStyles.portrait} ${
                  heroImageLoaded ? heroStyles.portraitLoaded : ""
                }`.trim()}
              >
                <Image
                  src={heroPortrait}
                  alt="Confidence Molade seated in a beige suit against a studio backdrop"
                  className={`${heroStyles.image} ${heroStyles.imageBase}`}
                  width={heroPortrait.width}
                  height={heroPortrait.height}
                  priority
                  sizes="(max-width: 900px) 100vw, 83vw"
                />
              </div>
            </div>

            <div className={heroStyles.summary}>
              <p className={heroStyles.summaryPrimary}>
                I am a real estate executive, thought leader, and public
                speaker, and a faith-driven woman who has spent over a decade
                proving that purpose and power are not mutually exclusive.
              </p>
            </div>

            <div className={heroStyles.award}>
              <h1 className={heroStyles.title}>
                <span className={heroStyles.titleDesktopLine}>
                  Award-Winning Luxury
                </span>
                <span className={heroStyles.titleDesktopLine}>
                  Real Estate Broker &amp; Trusted
                </span>
                <span className={heroStyles.titleDesktopLine}>
                  Advisor to Global Investors
                </span>
                <span className={heroStyles.titleMobile}>
                  Award-Winning Luxury Real Estate Broker &amp; Trusted Advisor
                  to Global Investors
                </span>
              </h1>
            </div>

            <Link href="/contact" className={heroStyles.mobileHeroCta}>
              Let&apos;s Connect
            </Link>
          </div>
        </section>

        <section id="about" data-scroll-section>
          <FadeUp className="about-copy">
            <div className="about-copy-shell">
              <div className="about-copy-header">
                <p className="section-eyebrow">Who She Is</p>
                <h2 className="h2-xl">
                  More Than a Name.
                  <br />
                  A Standard.
                </h2>
              </div>

              <div className="about-quote-card">
                <blockquote className="about-quote">
                  My name is Confidence — and if you would let me, I would love
                  to lead you into your untapped potential.
                </blockquote>
              </div>

              <div className="about-body">
                <p className="body-text about-primary-copy">
                  As CEO and Co-Founder of Eden Oasis Realty, she has helped
                  redefine real estate in Nigeria, not just as a transaction,
                  but as a pathway to legacy. She began her career as an
                  electrical engineer, crossed industries, and built one of
                  Lagos&apos;s most recognized real estate brands from the ground
                  up. But she has never been just a businesswoman.
                </p>
                <p className="body-text about-secondary-copy">
                  She is a speaker who moves rooms. A content creator who
                  educates with clarity. A thought leader whose voice cuts
                  through noise. A style icon who understands that how you show
                  up is part of your message. A woman of deep faith who leads
                  from conviction. And above everything else, a devoted wife and
                  mother who knows that everything built outside the home must
                  first be rooted inside it.
                </p>
              </div>

              <ul className="credentials" aria-label="Key credentials">
                {credentials.map((credential) => (
                  <li key={credential} className="credential-pill">
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp className="about-right">
            <figure className="about-feature-image">
              <Image
                src={aboutPortrait.imageSrc}
                alt={aboutPortrait.alt}
                className="about-feature-media"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 82vw, (max-width: 1100px) 46vw, 40vw"
                style={{
                  objectPosition: aboutPortrait.objectPosition ?? "center center",
                }}
              />
              <figcaption className="about-img-caption">
                {aboutPortrait.caption}
              </figcaption>
            </figure>
          </FadeUp>
        </section>

        <section id="pillars" data-scroll-section>
          <FadeUp className="pillars-header">
            <div>
              <p className="section-eyebrow">The Framework</p>
              <h2 className="h2-xl">
                Seven Pillars
                <br />
                of <em className="gold-italic">Confidence</em>
              </h2>
            </div>
            <div>
              <p className="pillars-intro">
                These are not roles she plays. They are the seven dimensions of
                a woman who has chosen to live fully — with no apologies, no
                compartments, and no ceilings. Each pillar is a practice.
                Together, they form a life of uncommon influence.
              </p>
            </div>
          </FadeUp>

          {activeDesktopPillar ? (
            <FadeUp className="pillars-desktop-stack">
              <div className="pillars-coverflow-frame">
                <div className="pillars-coverflow-shell">
                  <CoverFlow
                    items={pillarCoverflowItems}
                    itemWidth={420}
                    itemHeight={520}
                    stackSpacing={82}
                    centerGap={240}
                    rotation={50}
                    initialIndex={pillars.findIndex(
                      (pillar) => pillar.slug === activeDesktopPillar.slug,
                    )}
                    enableReflection={false}
                    enableClickToSnap
                    enableScroll
                    scrollSensitivity={90}
                    className="pillars-coverflow"
                    onIndexChange={(index) => {
                      const nextPillar = pillars[index];
                      setActiveDesktopPillarSlug(nextPillar?.slug ?? null);
                    }}
                  />
                </div>

                <div className="pillars-coverflow-copy">
                  <p className="section-eyebrow">
                    Pillar {activeDesktopPillar.number}
                  </p>
                  <h3 className="story-panel-title pillars-desktop-title">
                    {activeDesktopPillar.title}
                  </h3>
                  <p className="story-panel-body pillars-desktop-body">
                    {activeDesktopPillar.summary}
                  </p>
                  <Link
                    href={`/pillars/${activeDesktopPillar.slug}`}
                    className="pillar-ghost-button pillars-desktop-link"
                  >
                    Open Pillar Story
                  </Link>
                </div>
              </div>
            </FadeUp>
          ) : null}

          <FadeUp className="pillars-mobile-stack">
            <LayeredStack className="pillars-stack" aria-label="Seven pillars image stack">
              {pillars.map((pillar) => (
                <Link
                  key={pillar.slug}
                  href={`/pillars/${pillar.slug}`}
                  className="pillar-stack-card"
                  aria-label={pillar.title}
                >
                  <Image
                    src={pillarImages[pillar.slug]}
                    alt={pillar.title}
                    className="pillar-stack-image"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    style={{
                      objectPosition:
                        pillarImagePositions[pillar.slug] ?? "center top",
                    }}
                  />
                  <div className="pillar-stack-overlay">
                    <span className="pillar-stack-number">{pillar.number}</span>
                    <h3 className="pillar-stack-title">{pillar.title}</h3>
                    <span className="pillar-stack-hint">Open Pillar Story</span>
                  </div>
                </Link>
              ))}
            </LayeredStack>
          </FadeUp>
        </section>

        <section id="philosophy" data-scroll-section>
          <FadeUp className="pillar-detail-section">
            <div className="pillar-detail-text">
              <p className="section-eyebrow">The Philosophy</p>
              <h3>
                Confidence is not a trait.
                <br />
                It is a <em className="gold-italic">decision</em>.
              </h3>
              <p className="body-text pillar-detail-copy">
                Every woman carries within her the seed of extraordinary
                influence. Confidence Molade built her seven-pillar
                framework not as a showcase of achievement — but as an
                invitation. An invitation to every woman watching from the
                sidelines to step into the arena, armed with strategy, faith,
                and the audacity to be fully herself.
              </p>
              <p className="body-text pillar-detail-copy-secondary">
                These pillars were not given to her. They were built, one
                deliberate choice at a time — through cold calls and closing
                deals, through sleepless nights and morning devotionals, through
                platforms won and rooms entered wearing heels and conviction.
              </p>
              <Link href="/contact" className="btn-primary pillar-detail-cta">
                Invite Her to Speak
              </Link>
            </div>
            <div className="pillar-detail-card">
              <p className="pillar-detail-mark" aria-hidden="true">
                &quot;
              </p>
              <p className="pillar-detail-quote">
                &quot;Your divinely ordained name says who you are. You are
                setting the standard in 21st Century sales and customer service
                in Nigeria, Africa — and indeed the world over.&quot;
              </p>
              <p className="pillar-detail-source">— Client Testimonial</p>
            </div>
          </FadeUp>
        </section>

        <section id="works" data-scroll-section>
          <FadeUp className="works-header">
            <div>
              <p className="section-eyebrow">Portfolio</p>
              <h2 className="h2-lg">
                Landmark
                <br />
                Ventures
              </h2>
            </div>
            <Link href="/contact" className="btn-primary">
              Partner With Me
            </Link>
          </FadeUp>

          <FadeUp className="works-grid">
            {works.map((work, index) => (
              <article
                key={work.title}
                className={`work-card ${index === 0 ? "work-card-featured" : ""} ${work.imageSrc ? "work-card-with-image" : ""}`.trim()}
              >
                <div className="work-img">
                  <div className={`work-img-inner ${work.imageSrc ? "has-work-image" : ""}`.trim()}>
                    {work.imageSrc ? (
                      <Image
                        src={work.imageSrc}
                        alt={work.imageAlt ?? work.title}
                        className="work-img-media"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 900px) 100vw, 33vw"
                        style={{
                          objectPosition: work.imagePosition ?? "center center",
                        }}
                      />
                    ) : null}
                    <p className="work-img-label">{work.label}</p>
                  </div>
                </div>
                <div className="work-body">
                  <p className="work-tag">{work.tag}</p>
                  <h3 className="work-title">{work.title}</h3>
                  <p className="work-desc">{work.description}</p>
                  <span className="work-status" aria-disabled="true">
                    Case Study Coming Soon
                  </span>
                </div>
              </article>
            ))}
          </FadeUp>
        </section>

        <section id="blog" data-scroll-section>
          <FadeUp className="blog-header">
            <div>
              <p className="section-eyebrow">Insights</p>
              <h2 className="h2-lg">
                Conversations
                <br />
                Worth Having
              </h2>
            </div>
            <Link href="/blog" className="btn-ghost">
              View All Articles
            </Link>
          </FadeUp>

          <FadeUp className="blog-grid">
            {articles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="blog-card-link"
              >
                <article
                  className={`blog-card ${index === 0 ? "blog-card-featured" : ""}`}
                >
                  <p className="blog-date">
                    {article.category} · {article.readTime}
                  </p>
                  <h3 className="blog-title">{article.title}</h3>
                  <p className="blog-excerpt">{article.excerpt}</p>
                  <span className="read-more">Read Article</span>
                </article>
              </Link>
            ))}
          </FadeUp>
        </section>
      </main>
    </>
  );
}
