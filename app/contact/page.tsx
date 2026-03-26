"use client";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { SiteNavbar } from "@/components/site-navbar";

import styles from "./contact.module.css";

const socials = [
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

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

type ContactFormData = {
  name: string;
  email: string;
  purpose: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  purpose: '',
  message: '',
};

function validateFormData(formData: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!formData.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!formData.purpose) {
    errors.purpose = 'Select a reason for getting in touch.';
  }

  if (!formData.message.trim()) {
    errors.message = 'Please add a short message.';
  }

  return errors;
}

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const statusTimeoutRef = useRef<number | null>(null);

  const clearStatusTimeout = () => {
    if (statusTimeoutRef.current !== null) {
      window.clearTimeout(statusTimeoutRef.current);
      statusTimeoutRef.current = null;
    }
  };

  const queueStatusReset = (delay: number) => {
    clearStatusTimeout();
    statusTimeoutRef.current = window.setTimeout(() => {
      setFormStatus('idle');
      setStatusMessage('');
      statusTimeoutRef.current = null;
    }, delay);
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;
    const nextFormData = {
      ...formData,
      [fieldName]: value,
    };

    setFormData(nextFormData);

    if (formStatus !== 'loading' && statusMessage) {
      clearStatusTimeout();
      setFormStatus('idle');
      setStatusMessage('');
    }

    if (hasSubmitted || formErrors[fieldName]) {
      setFormErrors(validateFormData(nextFormData));
    }
  };

  const getFieldErrorId = (field: keyof ContactFormData) => `contact-${field}-error`;

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    clearStatusTimeout();

    const errors = validateFormData(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormStatus('error');
      setStatusMessage('Please correct the highlighted fields and try again.');
      queueStatusReset(3000);
      return;
    }

    setFormStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          payload?.message ??
            'Something went wrong while sending your message. Please email achodoconfidence@gmail.com directly.'
        );
      }

      setFormStatus('success');
      setFormErrors({});
      setHasSubmitted(false);
      setFormData(initialFormData);
      setStatusMessage(
        payload?.message ?? "Message sent successfully! I'll be in touch soon."
      );

      queueStatusReset(5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong while sending your message. Please email achodoconfidence@gmail.com directly.'
      );
      queueStatusReset(3000);
    }
  };

  useEffect(() => {
    return () => {
      clearStatusTimeout();
    };
  }, []);

  return (
    <>
      <SiteNavbar
        logoHref="/"
        mobilePanelId="contact-mobile-nav-panel"
        scrollThreshold={24}
        sectionPrefix="/"
      />

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
                noValidate
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
                    disabled={formStatus === 'loading'}
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? getFieldErrorId('name') : undefined}
                  />
                  {formErrors.name && (
                    <p id={getFieldErrorId('name')} className={styles.fieldError}>
                      {formErrors.name}
                    </p>
                  )}
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
                    disabled={formStatus === 'loading'}
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? getFieldErrorId('email') : undefined}
                  />
                  {formErrors.email && (
                    <p id={getFieldErrorId('email')} className={styles.fieldError}>
                      {formErrors.email}
                    </p>
                  )}
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
                    disabled={formStatus === 'loading'}
                    aria-invalid={Boolean(formErrors.purpose)}
                    aria-describedby={formErrors.purpose ? getFieldErrorId('purpose') : undefined}
                  >
                    <option value="">Select an option</option>
                    <option value="speaking">Speaking Engagement</option>
                    <option value="investment">Real Estate Investment</option>
                    <option value="podcast">Podcast / Media</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.purpose && (
                    <p id={getFieldErrorId('purpose')} className={styles.fieldError}>
                      {formErrors.purpose}
                    </p>
                  )}
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
                    disabled={formStatus === 'loading'}
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={formErrors.message ? getFieldErrorId('message') : undefined}
                  />
                  {formErrors.message && (
                    <p id={getFieldErrorId('message')} className={styles.fieldError}>
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {formStatus === 'success' && statusMessage && (
                  <div className={styles.successMessage} role="status" aria-live="polite">
                    {statusMessage}
                  </div>
                )}

                {formStatus === 'error' && statusMessage && (
                  <div className={styles.errorMessage} role="alert">
                    {statusMessage}
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
