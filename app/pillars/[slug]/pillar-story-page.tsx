"use client";

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
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>("[data-story-panel]"),
    );

    let frameId = 0;

    const updatePanels = () => {
      const viewportHeight = window.innerHeight;
      const nextScrolled = window.scrollY > 24;

      setNavScrolled((current) => {
        return current === nextScrolled ? current : nextScrolled;
      });

      panels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        const progress = Math.min(
          Math.max((viewportHeight - rect.top) / (viewportHeight * 0.9), 0),
          1,
        );

        panel.style.setProperty("--panel-progress", progress.toFixed(3));
      });

      frameId = 0;
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updatePanels);
    };

    updatePanels();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="pillar-page">
      <nav
        className={`pillar-page-nav home-hero-nav ${navScrolled ? "scrolled" : ""} ${mobileNavOpen ? "mobile-open" : ""}`.trim()}
      >
        <Link href="/" className="nav-logo home-hero-wordmark">
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
            <Link href="/#contact">Contact</Link>
          </li>
        </ul>
        <Link href="/#contact" className="nav-cta">
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
          <Link href="/#contact" onClick={() => setMobileNavOpen(false)}>
            Contact
          </Link>
          <Link
            href="/#contact"
            className="mobile-nav-cta"
            onClick={() => setMobileNavOpen(false)}
          >
            Let&apos;s Connect
          </Link>
        </div>
      </nav>

      <main>
        <section className="pillar-hero">
          <div className="pillar-hero-copy-block">
            <p className="pillar-kicker">{pillar.heroEyebrow}</p>
            <div className="pillar-hero-title-row">
              <span className="pillar-number-badge">{pillar.number}</span>
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

          <aside className="pillar-hero-aside">
            <div className="pillar-hero-visual">
              <div className="pillar-hero-icon-wrap">
                <PillarIcon icon={pillar.icon} className="pillar-hero-icon" />
              </div>
              <p className="pillar-hero-visual-label">{pillar.visualLabel}</p>
            </div>
            <p className="pillar-hero-quote">{pillar.quote}</p>
            <div className="pillar-topic-list">
              {pillar.sections.map((section) => (
                <div key={section.title} className="pillar-topic-item">
                  <p className="pillar-topic-metric">{section.metric}</p>
                  <p className="pillar-topic-title">{section.title}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section id="story" className="pillar-story-stage">
          <div className="pillar-story-intro">
            <div>
              <p className="section-eyebrow">The Write-Up</p>
              <h2 className="h2-xl">
                The layered practice behind
                <br />
                <em className="gold-italic">{pillar.title}</em>
              </h2>
            </div>
            <p className="body-text pillar-story-intro-copy">
              Each chapter below is designed to slide over the last as you scroll,
              so the pillar reads like a progression rather than a stack of cards.
              The movement is deliberate: every new section advances the idea and
              gradually takes the foreground.
            </p>
          </div>

          <div className="story-panels">
            {pillar.sections.map((section, index) => (
              <article
                key={section.title}
                data-story-panel
                className="story-panel"
                style={{ zIndex: index + 1 }}
              >
                <div className="story-panel-card">
                  <div className="story-panel-visual">
                    <p className="story-panel-index">
                      {pillar.number}
                      <span>/0{index + 1}</span>
                    </p>
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
            ))}
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
              <Link href="/#contact" className="pillar-ghost-button">
                Invite Confidence to speak
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
