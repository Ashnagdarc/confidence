"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

type SiteNavbarProps = {
  id?: string;
  logoHref: string;
  mobilePanelId: string;
  scrollThreshold?: number;
  sectionPrefix?: string;
};

const navSections = [
  { label: "Home", id: "home" },
  { label: "7 Pillars", id: "pillars" },
  { label: "Works", id: "works" },
  { label: "Blog", href: "/blog" },
] as const;

const COMPACT_NAV_BREAKPOINT = 1100;
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function SiteNavbar({
  id,
  logoHref,
  mobilePanelId,
  scrollThreshold = 24,
  sectionPrefix = "/",
}: SiteNavbarProps) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileNavGestureStyle, setMobileNavGestureStyle] =
    useState<CSSProperties>({
      "--mobile-nav-tilt-x": "0deg",
      "--mobile-nav-tilt-y": "0deg",
      "--mobile-nav-shift-x": "0px",
      "--mobile-nav-shift-y": "0px",
    } as CSSProperties);

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth > COMPACT_NAV_BREAKPOINT) {
        setMobileNavOpen(false);
      }
    };

    const updateNav = () => {
      setNavScrolled(window.scrollY > scrollThreshold);
    };

    updateNav();
    window.addEventListener("resize", closeMenuOnResize);
    window.addEventListener("scroll", updateNav, { passive: true });

    return () => {
      window.removeEventListener("resize", closeMenuOnResize);
      window.removeEventListener("scroll", updateNav);
    };
  }, [scrollThreshold]);

  useEffect(() => {
    if (!mobileNavOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileNavOpen]);

  const resetMobileNavGesture = () => {
    setMobileNavGestureStyle({
      "--mobile-nav-tilt-x": "0deg",
      "--mobile-nav-tilt-y": "0deg",
      "--mobile-nav-shift-x": "0px",
      "--mobile-nav-shift-y": "0px",
    } as CSSProperties);
  };

  const updateMobileNavGesture = (clientX: number, clientY: number) => {
    if (typeof window === "undefined") {
      return;
    }

    const horizontal = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const vertical = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);

    setMobileNavGestureStyle({
      "--mobile-nav-tilt-x": `${clamp(vertical * -5, -5, 5)}deg`,
      "--mobile-nav-tilt-y": `${clamp(horizontal * 7, -7, 7)}deg`,
      "--mobile-nav-shift-x": `${clamp(horizontal * 14, -14, 14)}px`,
      "--mobile-nav-shift-y": `${clamp(vertical * 12, -12, 12)}px`,
    } as CSSProperties);
  };

  const getSectionHref = (section: (typeof navSections)[number]) =>
    "href" in section
      ? section.href
      : sectionPrefix
        ? `${sectionPrefix}#${section.id}`
        : `#${section.id}`;

  return (
    <nav
      id={id}
      className={`pillar-page-nav ${navScrolled ? "scrolled" : ""} ${mobileNavOpen ? "mobile-open" : ""}`.trim()}
    >
      <Link
        href={logoHref}
        className="nav-logo"
        aria-label="Confidence Achodo Molade home"
      >
        <span className="nav-logo-text">Confidence Achodo Molade</span>
        <span className="nav-logo-mark" aria-hidden="true">
          <Image
            src="/brand/logo-black.png"
            alt=""
            className="nav-logo-image"
            width={80}
            height={80}
          />
        </span>
      </Link>

      <ul className="nav-links">
        {navSections.map((section) => (
          <li key={section.label}>
            <Link href={getSectionHref(section)}>{section.label}</Link>
          </li>
        ))}
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <Link href="/contact" className="nav-cta">
        Let&apos;s Connect
      </Link>

      <button
        type="button"
        className={`mobile-nav-toggle ${mobileNavOpen ? "open" : ""}`.trim()}
        aria-expanded={mobileNavOpen}
        aria-controls={mobilePanelId}
        aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileNavOpen((open) => !open)}
      >
        <span className="mobile-nav-toggle-line" />
        <span className="mobile-nav-toggle-line" />
        <span className="mobile-nav-toggle-line" />
      </button>

      <button
        type="button"
        className={`mobile-nav-backdrop ${mobileNavOpen ? "open" : ""}`.trim()}
        aria-label="Close menu"
        tabIndex={mobileNavOpen ? 0 : -1}
        onClick={() => setMobileNavOpen(false)}
      />

      <div
        id={mobilePanelId}
        className={`mobile-nav-panel ${mobileNavOpen ? "open" : ""}`.trim()}
      >
        <div
          className="mobile-nav-panel-surface"
          style={mobileNavGestureStyle}
          onPointerMove={(event) =>
            updateMobileNavGesture(event.clientX, event.clientY)
          }
          onPointerLeave={resetMobileNavGesture}
          onTouchStart={(event) => {
            const touch = event.touches[0];

            if (touch) {
              updateMobileNavGesture(touch.clientX, touch.clientY);
            }
          }}
          onTouchMove={(event) => {
            const touch = event.touches[0];

            if (touch) {
              updateMobileNavGesture(touch.clientX, touch.clientY);
            }
          }}
          onTouchEnd={resetMobileNavGesture}
        >
          <div className="mobile-nav-header">
            <Link
              href={logoHref}
              className="mobile-nav-brand"
              aria-label="Confidence Achodo Molade home"
              onClick={() => setMobileNavOpen(false)}
            >
              <span className="mobile-nav-brand-text">Confidence Molade</span>
            </Link>

            <button
              type="button"
              className="mobile-nav-close"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
            >
              <span className="mobile-nav-close-line" />
              <span className="mobile-nav-close-line" />
            </button>
          </div>

          <p className="mobile-nav-eyebrow">Navigate</p>
          <div className="mobile-nav-links-list">
            {navSections.map((section) => (
              <Link
                key={section.label}
                href={getSectionHref(section)}
                onClick={() => setMobileNavOpen(false)}
              >
                {section.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileNavOpen(false)}>
              Contact
            </Link>
          </div>
          <Link
            href="/contact"
            className="mobile-nav-cta"
            onClick={() => setMobileNavOpen(false)}
          >
            Let&apos;s Connect
          </Link>
        </div>
      </div>
    </nav>
  );
}
