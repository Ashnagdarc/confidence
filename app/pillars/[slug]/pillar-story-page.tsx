"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  PillarIcon,
  getSiblingPillars,
  type PillarDetail,
} from "../pillar-data";

type PillarStoryPageProps = {
  pillar: PillarDetail;
};

export function PillarStoryPage({ pillar }: PillarStoryPageProps) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const siblingPillars = useMemo(() => getSiblingPillars(pillar.slug), [pillar.slug]);
  const heroStyle = useMemo<CSSProperties | undefined>(() => {
    if (pillar.slug !== "public-speaker") {
      return undefined;
    }

    return {
      "--pillar-hero-image": "url('/pillars/public-speaker-hero.jpg')",
      "--pillar-hero-position": "center 18%",
    } as CSSProperties;
  }, [pillar.slug]);
  const storyPanelStyles = useMemo<Partial<Record<number, CSSProperties>>>(() => {
    if (pillar.slug !== "public-speaker") {
      return {};
    }

    return {
      0: {
        "--story-panel-visual-image":
          "url('/pillars/public-speaker-clarity.jpg')",
        "--story-panel-visual-position": "center center",
      } as CSSProperties,
      1: {
        "--story-panel-visual-image":
          "url('/pillars/public-speaker-stagecraft.jpg')",
        "--story-panel-visual-position": "center center",
      } as CSSProperties,
      2: {
        "--story-panel-visual-image":
          "url('/pillars/public-speaker-message-design.jpg')",
        "--story-panel-visual-position": "center center",
      } as CSSProperties,
      3: {
        "--story-panel-visual-image":
          "url('/pillars/public-speaker-impact.jpg')",
        "--story-panel-visual-position": "center center",
      } as CSSProperties,
    };
  }, [pillar.slug]);

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth > 900) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnResize);

    return () => {
      window.removeEventListener("resize", closeMenuOnResize);
    };
  }, []);

  useEffect(() => {
    const updateNav = () => {
      setNavScrolled(window.scrollY > 24);
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateNav);
    };
  }, []);

  return (
    <div className="pillar-page">
      <nav
        className={`pillar-page-nav ${navScrolled ? "scrolled" : ""} ${mobileNavOpen ? "mobile-open" : ""}`.trim()}
      >
        <Link href="/" className="nav-logo">
          Confidence Molade
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/#home">Home</Link>
          </li>
          <li>
            <Link href="/#pillars">7 Pillars</Link>
          </li>
          <li>
            <Link href="/#works">Works</Link>
          </li>
          <li>
            <Link href="/#blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <Link href="/contact" className="nav-cta">
          Let&apos;s Connect
        </Link>
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={mobileNavOpen}
          aria-controls="pillar-mobile-nav-panel"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          id="pillar-mobile-nav-panel"
          className={`mobile-nav-panel ${mobileNavOpen ? "open" : ""}`.trim()}
        >
          <Link href="/#home" onClick={() => setMobileNavOpen(false)}>
            Home
          </Link>
          <Link href="/#pillars" onClick={() => setMobileNavOpen(false)}>
            7 Pillars
          </Link>
          <Link href="/#works" onClick={() => setMobileNavOpen(false)}>
            Works
          </Link>
          <Link href="/#blog" onClick={() => setMobileNavOpen(false)}>
            Blog
          </Link>
          <Link href="/contact" onClick={() => setMobileNavOpen(false)}>
            Contact
          </Link>
          <Link
            href="/contact"
            className="mobile-nav-cta"
            onClick={() => setMobileNavOpen(false)}
          >
            Let&apos;s Connect
          </Link>
        </div>
      </nav>

      <main>
        <section className="pillar-hero" style={heroStyle}>
          <div className="pillar-hero-copy-block">
            <p className="pillar-kicker">{pillar.heroEyebrow}</p>
            <div className="pillar-hero-title-row">
              <h1 className="pillar-hero-title">{pillar.title}</h1>
            </div>
            <p className="pillar-hero-copy">{pillar.heroIntro}</p>
            <div className="pillar-hero-actions">
              <a href="#story" className="btn-primary">
                Read the full pillar
              </a>
              <Link href="/#pillars" className="pillar-ghost-button">
                Back to the framework
              </Link>
            </div>
          </div>
        </section>

        <section id="story" className="pillar-story-stage">
          <div className="pillar-story-intro">
            <div>
              <p className="section-eyebrow">Inside the Pillar</p>
              <h2 className="h2-xl">Chapter by chapter, the method stays clear.</h2>
            </div>
            <p className="body-text pillar-story-intro-copy">
              Each section isolates one operating principle so the story reads in a
              clean sequence: one idea, one visual, one advancement at a time.
            </p>
          </div>

          <div className="story-panels">
            {pillar.sections.map((section, index) => {
              const panelStyle = storyPanelStyles[index];

              return (
                <article
                  key={section.title}
                  data-story-panel
                  className="story-panel"
                  style={{ zIndex: index + 1 }}
                >
                  <div
                    className={`story-panel-card ${panelStyle ? "has-story-visual-image" : ""}`.trim()}
                    style={panelStyle}
                  >
                    <div className="story-panel-visual">
                      <div className="story-panel-meta">
                        <p className="story-panel-metric">{section.metric}</p>
                        <p className="story-panel-accent">{section.accent}</p>
                      </div>
                    </div>

                    <div className="story-panel-copy">
                      <p className="section-eyebrow">{section.eyebrow}</p>
                      <h2 className="story-panel-title">{section.title}</h2>
                      <p className="story-panel-body">{section.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="pillar-page-cta">
          <div className="pillar-page-cta-inner">
            <div>
              <p className="section-eyebrow">Continue the Framework</p>
              <h2 className="h2-lg">
                Every pillar sharpens a different dimension of her leadership.
              </h2>
            </div>
            <div className="pillar-related-grid">
              {siblingPillars.map((relatedPillar) => (
                <Link
                  key={relatedPillar.slug}
                  href={`/pillars/${relatedPillar.slug}`}
                  className="pillar-related-card"
                >
                  <span className="pillar-related-number">{relatedPillar.number}</span>
                  <PillarIcon icon={relatedPillar.icon} />
                  <h3 className="pillar-related-title">{relatedPillar.title}</h3>
                  <p className="pillar-related-copy">{relatedPillar.summary}</p>
                </Link>
              ))}
            </div>
            <div className="pillar-page-links">
              <Link href="/#pillars" className="btn-primary">
                View all seven pillars
              </Link>
              <Link href="/contact" className="pillar-ghost-button">
                Invite Confidence to speak
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
