"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { LayeredStack } from "@/components/ui/layered-stack";

import { pillars } from "./pillars/pillar-data";
import heroStyles from "./hero.module.css";

type Stat = {
  value: string;
  label: string;
};

type GalleryItem = {
  caption: string;
  alt: string;
  imageSrc: string;
  objectPosition?: string;
  large?: boolean;
};

type WorkItem = {
  tag: string;
  title: string;
  label: string;
  description: string;
};

type Article = {
  category: string;
  title: string;
  excerpt: string;
};

type FadeUpProps = {
  children: ReactNode;
  className?: string;
};

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

const aboutGallery: GalleryItem[] = [
  {
    caption: "Leadership",
    alt: "Confidence Molade standing in a pink tailored outfit",
    imageSrc: "/about/leadership.jpg",
    objectPosition: "center 18%",
    large: true,
  },
  {
    caption: "Industry",
    alt: "Confidence Molade in an orange suit and hard hat inside a real estate project office",
    imageSrc: "/about/industry.jpg",
    objectPosition: "center 24%",
  },
  {
    caption: "Presence",
    alt: "Confidence Molade in a white suit against a red studio backdrop",
    imageSrc: "/about/presence.jpg",
    objectPosition: "center top",
  },
];

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
  },
  {
    tag: "Public Speaking · Events",
    title: "Speaker & Conference Keynotes",
    label: "Speaking",
    description:
      "From Women in Business forums to real estate investment summits, Confidence delivers talks that combine data, story, and lived experience to shift mindsets and unlock action in her audiences.",
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
  },
];

const articles: Article[] = [
  {
    category: "Featured Essay",
    title: "Why the New Lagos Corridor Is the Most Important Real Estate Story in Africa Right Now",
    excerpt:
      "The infrastructure connecting Lekki Free Trade Zone, Ibeju-Lekki, and Epe is not a story about land. It is a story about the next generation of Nigerian wealth — and where it will be built. Here is what no one is telling you.",
  },
  {
    category: "Market Watch",
    title: "The Truth About Off-Plan Investment in Lagos — What Buyers Must Know",
    excerpt:
      "Off-plan promises are only as good as the developer behind them. Here is a no-nonsense framework for evaluating risk before you commit a single naira.",
  },
  {
    category: "Leadership",
    title: "Confidence as a Career: How I Built a Real Estate Empire Without Losing Myself",
    excerpt:
      "Leadership is not loudness. This is the story of how a disciplined faith, a clear vision, and relentless consistency built something that lasts.",
  },
  {
    category: "Women in Business",
    title: "The Banana Island Shortlet Ban: What It Signals for the Nigerian Luxury Market",
    excerpt:
      "Regulation follows demand. And this particular regulation tells us something important about where premium real estate in Lagos is headed — and what investors should do now.",
  },
  {
    category: "Faith & Purpose",
    title: "7 Things I Know About Carrying Purpose in a Competitive World",
    excerpt:
      "Success without roots is just performance. These are the seven truths that anchor me when the pressure is highest and the stakes are real.",
  },
  {
    category: "Diaspora Investor Series",
    title: "Nigerians in the Diaspora: A Step-By-Step Guide to Buying Property Safely From Abroad",
    excerpt:
      "Distance is not a barrier. Ignorance is. Here is the complete guide to protecting your diaspora investment from title to keys — with no excuses left.",
  },
];

const heroPortrait = "/hero/portrait.png";

const pillarImages: Record<string, string> = {
  "faith-based-leader": "/pillars/faith-based-leader-v2.jpg",
  "family-woman": "/pillars/family-woman.jpg",
  "public-speaker": "/Speaker.jpg",
  "real-estate-mogul": "/pillars/real-estate-mogul.jpg",
  "style-icon": "/pillars/style-icon.jpg",
  "thought-leader": "/pillars/thought-leader.jpg",
  "content-creator": "/pillars/content-creator.jpg",
};

const pillarImagePositions: Record<string, string> = {
  "style-icon": "center center",
  "faith-based-leader": "center center",
  "family-woman": "center center",
};

function FadeUp({ children, className = "" }: FadeUpProps) {
  return (
    <div data-fade-up className={`fade-up ${className}`.trim()}>
      {children}
    </div>
  );
}

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

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
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

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

  return (
    <>
      <nav
        id="navbar"
        className={`pillar-page-nav ${navScrolled ? "scrolled" : ""} ${mobileNavOpen ? "mobile-open" : ""}`.trim()}
      >
        <a href="#home" className="nav-logo">
          Confidence Molade
        </a>
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#pillars">7 Pillars</a>
          </li>
          <li>
            <a href="#works">Works</a>
          </li>
          <li>
            <a href="#blog">Blog</a>
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
          aria-controls="mobile-nav-panel"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          id="mobile-nav-panel"
          className={`mobile-nav-panel ${mobileNavOpen ? "open" : ""}`.trim()}
        >
          <a href="#home" onClick={() => setMobileNavOpen(false)}>
            Home
          </a>
          <a href="#pillars" onClick={() => setMobileNavOpen(false)}>
            7 Pillars
          </a>
          <a href="#works" onClick={() => setMobileNavOpen(false)}>
            Works
          </a>
          <a href="#blog" onClick={() => setMobileNavOpen(false)}>
            Blog
          </a>
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
        <section id="home" className={heroStyles.heroSection}>
          <div className={heroStyles.shell}>
            <div className={heroStyles.visualStage} aria-hidden="true">
              <div className={heroStyles.portrait}>
                <Image
                  src={heroPortrait}
                  alt="Confidence Molade in a structured black outfit against a bright studio backdrop"
                  className={`${heroStyles.image} ${heroStyles.imageBase}`}
                  width={1512}
                  height={982}
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
              <div className={heroStyles.availabilityChip}>
                <span aria-hidden="true" className={heroStyles.availabilityDot} />
                <span>Available for collaboration</span>
              </div>
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
          <FadeUp>
            <p className="section-eyebrow">Who She Is</p>
            <h2 className="h2-xl">
              More Than a Name.
              <br />
              A Standard.
            </h2>
            <blockquote className="about-quote">
              &quot;My name is Confidence — and if you would let me, I would love
              to lead you into your untapped potential.&quot;
            </blockquote>
            <p className="body-text">
             As CEO and Co-Founder of Eden Oasis Realty, she has helped redefine real estate in Nigeria —
not just as a transaction, but as a pathway to legacy. She began her career as an electrical
engineer, crossed industries, and built one of Lagos's most recognized real estate brands from the
ground up. But she has never been just a businesswoman. 
            </p>
            <p className="body-text about-secondary-copy">
              She is a speaker who moves rooms. A content creator who educates with clarity. A thought leader
whose voice cuts through noise. A style icon who understands that how you show up is part of

your message. A woman of deep faith who leads from conviction. And above everything else, a
devoted wife and mother who knows that everything built outside the home must first be rooted
inside it.
            </p>
            <div className="credentials">
              {credentials.map((credential) => (
                <span key={credential} className="credential-pill">
                  {credential}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp className="about-right">
            <div className="about-image-grid">
              {aboutGallery.map((item) => (
                <div
                  key={item.caption}
                  className={`about-img-block ${item.large ? "about-img-large" : ""}`}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    className="about-img-media"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectPosition: item.objectPosition ?? "center center" }}
                  />
                  <span className="about-img-caption">{item.caption}</span>
                </div>
              ))}
            </div>
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

          <FadeUp>
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
              <article key={work.title} className={`work-card ${index === 0 ? "work-card-featured" : ""}`}>
                <div className="work-img">
                  <div className="work-img-inner">
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
            <span className="btn-ghost btn-ghost-disabled" aria-disabled="true">
              Articles Coming Soon
            </span>
          </FadeUp>

          <FadeUp className="blog-grid">
            {articles.map((article, index) => (
              <article key={article.title} className={`blog-card ${index === 0 ? "blog-card-featured" : ""}`}>
                <p className="blog-date">{article.category}</p>
                <h3 className="blog-title">{article.title}</h3>
                <p className="blog-excerpt">{article.excerpt}</p>
                <span className="read-more read-more-disabled" aria-disabled="true">
                  Publishing Soon
                </span>
              </article>
            ))}
          </FadeUp>
        </section>
      </main>
    </>
  );
}
