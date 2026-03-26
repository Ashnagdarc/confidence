import Link from "next/link";

const footerNav = [
  { label: "Home", href: "/#home" },
  { label: "7 Pillars", href: "/#pillars" },
  { label: "Works", href: "/#works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const footerSocials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/achodoconfidence_realtor/",
  },
  {
    label: "Podcast",
    href: "https://www.edenoasisrealty.com/the-kk-show/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/confidence-achodo-b82b65a4?originalSubdomain=ng",
  },
  {
    label: "Eden Oasis",
    href: "https://www.edenoasisrealty.com/",
  },
];

const footerReach = [
  {
    label: "Book a Call",
    href: "tel:+2347060614389",
  },
  {
    label: "Email",
    href: "mailto:achodoconfidence@gmail.com",
  },
  {
    label: "Eden Oasis Realty",
    href: "https://www.edenoasisrealty.com/",
  },
  {
    label: "Podcast Enquiries",
    href: "mailto:thekkshowkeytokeys@gmail.com",
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-shell">
        <div className="site-footer-top">
          <div className="site-footer-cta">
            <h2 className="site-footer-title">
              <span className="site-footer-title-muted">
                Book a call, and I&apos;ll take
              </span>
              <br />
              care of the rest
            </h2>
            <a href="tel:+2347060614389" className="site-footer-button">
              Book a Call
            </a>
          </div>

          <div className="site-footer-links">
            <div className="site-footer-column">
              {footerNav.map((item) => (
                <Link key={item.label} href={item.href} className="site-footer-link">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="site-footer-column">
              {footerSocials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="site-footer-link"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="site-footer-column">
              {footerReach.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="site-footer-link"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-meta">
            © {currentYear} Confidence Molade. All rights reserved.
          </p>
          <div className="site-footer-bottom-links">
            <span className="site-footer-meta">Lagos, Nigeria</span>
            <span className="site-footer-meta">Built with purpose.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
