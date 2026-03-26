import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/#home" },
  { label: "7 Pillars", href: "/#pillars" },
  { label: "Works", href: "/#works" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="not-found-main">
      <header className="not-found-header">
        <Link href="/" className="not-found-logo">
          Confidence Molade
        </Link>
        <nav className="not-found-nav-links" aria-label="404 recovery">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href} className="not-found-nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="not-found-shell">
        <div className="not-found-copy">
          <p className="section-eyebrow">Page Not Found</p>
          <p className="not-found-code">404</p>
          <h1 className="not-found-title">
            This page is outside the
            <br />
            framework.
          </h1>
          <p className="not-found-text">
            The link may be outdated, incomplete, or no longer published. Use one
            of the routes below to get back to the core experience.
          </p>

          <div className="not-found-actions">
            <Link href="/" className="btn-primary">
              Back Home
            </Link>
            <Link href="/#pillars" className="pillar-ghost-button">
              Explore 7 Pillars
            </Link>
          </div>
        </div>

        <aside className="not-found-card">
          <p className="not-found-card-label">Recovery Paths</p>
          <div className="not-found-card-links">
            <Link href="/#works" className="not-found-card-link">
              View selected work
            </Link>
            <Link href="/contact" className="not-found-card-link">
              Get in touch directly
            </Link>
            <Link href="/blog" className="not-found-card-link">
              Browse the journal
            </Link>
          </div>
          <p className="not-found-card-note">
            If you were looking for a pillar story, return to the homepage and open
            it from the framework section.
          </p>
        </aside>
      </section>
    </main>
  );
}
