"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./contact.module.css";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/achodoconfidence_realtor/",
  },
  {
    label: "Podcast",
    href: "https://podcasts.apple.com/ng/podcast/the-kk-show-key-to-keys/id1761369506",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/confidence-achodo-b82b65a4/",
  },
  {
    label: "Twitter / X",
    href: "https://x.com/achodoconfidenc",
  },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
    message: '',
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.purpose || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
      return;
    }

    setFormStatus('loading');

    try {
      // Simulate API call (replace with actual API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, this would be:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setFormStatus('success');
      setFormData({ name: '', email: '', purpose: '', message: '' });

      // Reset to idle after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth > 900) {
        setMobileNavOpen(false);
      }
    };

    const updateNav = () => {
      setNavScrolled(window.scrollY > 24);
    };

    updateNav();
    window.addEventListener("resize", closeMenuOnResize);
    window.addEventListener("scroll", updateNav, { passive: true });

    return () => {
      window.removeEventListener("resize", closeMenuOnResize);
      window.removeEventListener("scroll", updateNav);
    };
  }, []);

  return (
    <>
      <nav
        className={`home-hero-nav ${navScrolled ? "scrolled" : ""} ${mobileNavOpen ? "mobile-open" : ""}`.trim()}
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
          aria-controls="contact-mobile-nav-panel"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          id="contact-mobile-nav-panel"
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

      <main className={styles.pageMain}>
        <section className={styles.shell}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Let&apos;s Connect</p>
            <h1 className={styles.title}>
              Ready to build something lasting?{" "}
              <span className={styles.titleAccent}>Let&apos;s talk.</span>
            </h1>
          </header>

          <div className={styles.layout}>
            <div className={styles.formCard}>
              <form
                className={styles.form}
                onSubmit={handleFormSubmit}
              >
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-full-name">
                    Name
                  </label>
                  <input
                    id="contact-full-name"
                    name="name"
                    type="text"
                    className={styles.field}
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    aria-invalid={formStatus === 'error' && !formData.name ? 'true' : 'false'}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label
                    className={styles.fieldLabel}
                    htmlFor="contact-email-address"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email-address"
                    name="email"
                    type="email"
                    className={styles.field}
                    placeholder="yourname@gmail.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    aria-invalid={formStatus === 'error' && !formData.email}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-purpose">
                    Purpose of Contact
                  </label>
                  <select
                    id="contact-purpose"
                    name="purpose"
                    className={styles.field}
                    value={formData.purpose}
                    onChange={handleFormChange}
                    required
                    aria-invalid={formStatus === 'error' && !formData.purpose}
                  >
                    <option value="">Select an option</option>
                    <option value="speaking">Speaking Engagement</option>
                    <option value="investment">Real Estate Investment</option>
                    <option value="podcast">Podcast / Media</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-message">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={styles.textarea}
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    aria-invalid={formStatus === 'error' && !formData.message}
                  />
                </div>

                {formStatus === 'success' && (
                  <div className={styles.successMessage}>
                    ✓ Message sent successfully! I&apos;ll be in touch soon.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    Please fill out all fields correctly.
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={formStatus === 'loading'}
                >
                  {formStatus === 'loading' ? 'Sending…' : 'Submit'}
                </button>
              </form>
            </div>

            <aside className={styles.asideCard}>
              <div className={styles.asideTop}>
                <img
                  src="/pillars/content-creator.jpg"
                  alt="Confidence Molade"
                  className={styles.avatar}
                />
                <p className={styles.asideCopy}>
                  <span className={styles.asideStrong}>Prefer a quick chat?</span>{" "}
                  Let&apos;s open a direct line and find the best way to bring your
                  ideas, event, or investment plans to life.
                </p>
                <span className={styles.durationPill}>Usually responds within 24 hours</span>

                <div className={styles.asideMeta}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Email</span>
                    <a
                      href="mailto:achodoconfidence@gmail.com"
                      className={styles.metaValue}
                    >
                      achodoconfidence@gmail.com
                    </a>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Phone / WhatsApp</span>
                    <a href="tel:+2347060614389" className={styles.metaValue}>
                      +234 706 061 4389
                    </a>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Location</span>
                    <span className={styles.metaValue}>Lagos, Nigeria</span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Podcast Enquiries</span>
                    <a
                      href="mailto:thekkshowkeytokeys@gmail.com"
                      className={styles.metaValue}
                    >
                      thekkshowkeytokeys@gmail.com
                    </a>
                  </div>
                </div>

                <div className={styles.socials}>
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialLink}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              <a href="tel:+2347060614389" className={styles.asideButton}>
                Book a Call
              </a>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
