"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useMemo } from "react";

import { SiteNavbar } from "@/components/site-navbar";

import {
  getSiblingPillars,
  pillars,
  type PillarDetail,
} from "../pillar-data";

type PillarStoryPageProps = {
  pillar: PillarDetail;
};

export function PillarStoryPage({ pillar }: PillarStoryPageProps) {
  const siblingPillars = useMemo(() => getSiblingPillars(pillar.slug), [pillar.slug]);
  const currentPillarIndex = pillars.findIndex((entry) => entry.slug === pillar.slug);
  const totalPillarsLabel = String(pillars.length).padStart(2, "0");
  const currentPositionLabel = `${pillar.number} / ${totalPillarsLabel}`;
  const heroStyle = useMemo<CSSProperties | undefined>(() => {
    if (pillar.slug === "public-speaker") {
      return {
        "--pillar-hero-image": "url('/pillars/public-speaker-hero.jpg')",
        "--pillar-hero-position": "center 18%",
      } as CSSProperties;
    }

    if (pillar.slug === "real-estate-mogul") {
      return {
        "--pillar-hero-image": "url('/pillars/real-estate-mogul-hero-v2.jpg')",
        "--pillar-hero-position": "center center",
      } as CSSProperties;
    }

    return undefined;
  }, [pillar.slug]);
  const storyPanelStyles = useMemo<Partial<Record<number, CSSProperties>>>(() => {
    if (pillar.slug === "public-speaker") {
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
    }

    if (pillar.slug === "real-estate-mogul") {
      return {
        0: {
          "--story-panel-visual-image":
            "url('/pillars/real-estate-mogul-vision-v2.jpg')",
          "--story-panel-visual-position": "center center",
        } as CSSProperties,
        1: {
          "--story-panel-visual-image":
            "url('/pillars/real-estate-mogul-discipline.jpg')",
          "--story-panel-visual-position": "center center",
        } as CSSProperties,
        2: {
          "--story-panel-visual-image":
            "url('/pillars/real-estate-mogul-legacy.jpg')",
          "--story-panel-visual-position": "center center",
        } as CSSProperties,
        3: {
          "--story-panel-visual-image":
            "url('/pillars/real-estate-mogul-trust.jpg')",
          "--story-panel-visual-position": "34% center",
        } as CSSProperties,
      };
    }

    return {};
  }, [pillar.slug]);

  return (
    <div className="pillar-page">
      <SiteNavbar
        logoHref="/"
        mobilePanelId="pillar-mobile-nav-panel"
        scrollThreshold={24}
        sectionPrefix="/"
      />

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
            <div className="pillar-page-cta-header">
              <div className="pillar-page-cta-copy-block">
                <p className="section-eyebrow">Keep reading</p>
                <h2 className="h2-lg">Move through the pillars.</h2>
                <p className="pillar-page-cta-copy">
                  Read the story before or after this one, or go back to all seven.
                </p>
              </div>
              <p
                className="pillar-page-cta-position"
                aria-label={`Pillar ${pillar.number} of ${totalPillarsLabel}`}
              >
                {currentPositionLabel}
              </p>
            </div>

            <div
              className={`pillar-related-grid ${siblingPillars.length === 1 ? "single-card" : ""}`.trim()}
            >
              {siblingPillars.map((relatedPillar) => {
                const relatedPillarIndex = pillars.findIndex(
                  (entry) => entry.slug === relatedPillar.slug,
                );
                const isPreviousPillar = relatedPillarIndex < currentPillarIndex;

                return (
                  <Link
                    key={relatedPillar.slug}
                    href={`/pillars/${relatedPillar.slug}`}
                    className="pillar-related-card"
                  >
                    <div className="pillar-related-card-meta">
                      <span className="pillar-related-direction">
                        {isPreviousPillar ? "Previous" : "Next"}
                      </span>
                      <span className="pillar-related-number">{relatedPillar.number}</span>
                    </div>
                    <h3 className="pillar-related-title">{relatedPillar.title}</h3>
                    <p className="pillar-related-copy">{relatedPillar.shortSummary}</p>
                  </Link>
                );
              })}
            </div>

            <div className="pillar-page-links">
              <Link href="/#pillars" className="btn-primary">
                All pillars
              </Link>
              <Link href="/contact" className="pillar-ghost-button">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
