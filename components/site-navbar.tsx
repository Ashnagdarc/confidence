"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export function SiteNavbar({
  id,
  logoHref,
  mobilePanelId,
  scrollThreshold = 24,
  sectionPrefix = "/",
}: SiteNavbarProps) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
        className="mobile-nav-toggle"
        aria-expanded={mobileNavOpen}
        aria-controls={mobilePanelId}
        aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileNavOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id={mobilePanelId}
        className={`mobile-nav-panel ${mobileNavOpen ? "open" : ""}`.trim()}
      >
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
        <Link
          href="/contact"
          className="mobile-nav-cta"
          onClick={() => setMobileNavOpen(false)}
        >
          Let&apos;s Connect
        </Link>
      </div>
    </nav>
  );
}
