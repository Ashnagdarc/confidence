import type { ReactNode } from "react";

export type PillarIconKey =
  | "estate"
  | "speaker"
  | "thought"
  | "creator"
  | "style"
  | "faith"
  | "family";

export type PillarStorySection = {
  eyebrow: string;
  title: string;
  body: string;
  metric: string;
  accent: string;
};

export type PillarDetail = {
  slug: string;
  number: string;
  title: string;
  icon: PillarIconKey;
  summary: string;
  heroEyebrow: string;
  heroIntro: string;
  quote: string;
  visualLabel: string;
  sections: PillarStorySection[];
};

type PillarIconProps = {
  icon: PillarIconKey;
  className?: string;
};

export function PillarIcon({ icon, className = "" }: PillarIconProps) {
  const classes = ["pillar-icon", className].filter(Boolean).join(" ");

  switch (icon) {
    case "estate":
      return (
        <svg
          className={classes}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M3 21L12 3l9 18" />
          <path d="M6.5 15h11" />
        </svg>
      );
    case "speaker":
      return (
        <svg
          className={classes}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
        </svg>
      );
    case "thought":
      return (
        <svg
          className={classes}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z" />
        </svg>
      );
    case "creator":
      return (
        <svg
          className={classes}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "style":
      return (
        <svg
          className={classes}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
      );
    case "faith":
      return (
        <svg
          className={classes}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    case "family":
      return (
        <svg
          className={classes}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
}

export const pillars: PillarDetail[] = [
  {
    slug: "real-estate-mogul",
    number: "01",
    title: "Real Estate Mogul",
    icon: "estate",
    summary:
      "From Lekki corridors to off-plan investments - building wealth and legacies across Nigeria's most dynamic real estate landscape.",
    heroEyebrow: "Pillar 01 · Wealth With Foresight",
    heroIntro:
      "Confidence approaches real estate like infrastructure for the future: every site, title, and payment structure has to hold under pressure. What looks like sales on the outside is, underneath, a disciplined system for helping people move capital with clarity.",
    quote:
      "Real estate is never just about land. It is about whether a family can trust the future they are buying into.",
    visualLabel: "Legacy in motion",
    sections: [
      {
        eyebrow: "Market Vision",
        title: "She reads opportunity before it becomes obvious.",
        body:
          "Confidence studies growth corridors the way an engineer studies load paths. She pays attention to roads, policy signals, utility expansion, developer credibility, and the timing gaps most buyers ignore. That is how she turns market noise into a map clients can actually use.",
        metric: "Vision",
        accent: "Spot the shift early",
      },
      {
        eyebrow: "Deal Discipline",
        title: "Every transaction is forced through structure, not emotion.",
        body:
          "Her method is not guesswork and it is not hype. It is documentation, due diligence, staged payments, title verification, and a refusal to confuse urgency with quality. The point is simple: if a deal cannot survive scrutiny, it does not deserve anyone's capital.",
        metric: "Discipline",
        accent: "Protect the downside",
      },
      {
        eyebrow: "Legacy Economics",
        title: "She sells with the long view in mind.",
        body:
          "A plot is not only a plot. It can become tuition, leverage, rental income, inheritance, or peace of mind. Confidence frames property as a legacy instrument so buyers stop thinking only about today's price and start thinking about tomorrow's position.",
        metric: "Legacy",
        accent: "Think beyond the transfer",
      },
      {
        eyebrow: "Client Standard",
        title: "Trust is the product that outlives the closing.",
        body:
          "In a market where skepticism is rational, reputation becomes the true differentiator. Confidence has built hers by staying transparent when details are inconvenient, moving quickly when action matters, and keeping her word when the sale is already done.",
        metric: "Trust",
        accent: "Earn it in public",
      },
    ],
  },
  {
    slug: "public-speaker",
    number: "02",
    title: "Public Speaker",
    icon: "speaker",
    summary:
      "A commanding voice on investment, entrepreneurship, and the future of African real estate - from boardrooms to national stages.",
    heroEyebrow: "Pillar 02 · Voice With Direction",
    heroIntro:
      "Confidence does not step on stage to perform confidence; she steps on stage to transfer it. Her speaking is built to move people from uncertainty to decision, with messages that stay clear under the lights and still make sense after the applause ends.",
    quote:
      "A good speech inspires. A strong speech equips. I care about what the audience does after they leave the room.",
    visualLabel: "Message with momentum",
    sections: [
      {
        eyebrow: "Voice",
        title: "Her authority is built on clarity, not volume.",
        body:
          "Confidence speaks with weight because she knows what she stands for. She is able to simplify hard subjects without thinning them out, which means people leave her sessions feeling more capable instead of merely impressed.",
        metric: "Clarity",
        accent: "Make complexity usable",
      },
      {
        eyebrow: "Stagecraft",
        title: "Presence is treated as part of the message.",
        body:
          "Timing, pauses, eye contact, and energy are not accidents in her delivery. She understands that audiences read conviction before they analyze content, so she brings composure and sharpness that make the room trust what it is hearing.",
        metric: "Presence",
        accent: "Hold the room",
      },
      {
        eyebrow: "Message Design",
        title: "She builds talks for transformation, not decoration.",
        body:
          "Whether she is speaking about investing, leadership, or purpose, the structure is deliberate: challenge assumptions, provide a framework, then create a path to action. Her talks are memorable because they are organized around movement, not motivational drift.",
        metric: "Framework",
        accent: "Turn insight into action",
      },
      {
        eyebrow: "Audience Activation",
        title: "The goal is a response, not a reaction.",
        body:
          "Confidence wants listeners to rethink a market, start a conversation, launch a decision, or return home with sharper standards. That is why her speaking works across conferences, executive rooms, and women-centered platforms - it leaves people with a next step.",
        metric: "Impact",
        accent: "Leave with momentum",
      },
    ],
  },
  {
    slug: "thought-leader",
    number: "03",
    title: "Thought Leader",
    icon: "thought",
    summary:
      "Pioneering conversations on Nigeria's property market, tax reform, diaspora investment, and the economics of New Lagos.",
    heroEyebrow: "Pillar 03 · Signal Above Noise",
    heroIntro:
      "Thought leadership, in Confidence's world, means saying something useful before the crowd catches up. She pays attention to patterns, translates policy into consequences, and helps her audience understand where the market is going and why it matters.",
    quote:
      "Influence grows when you can explain what is changing, what it means, and what people should do next.",
    visualLabel: "Intelligence in public",
    sections: [
      {
        eyebrow: "Interpretation",
        title: "She turns headlines into real market meaning.",
        body:
          "Many people can repeat the news. Fewer can interpret the second and third-order effect of new infrastructure, taxation, regulation, or supply shifts. Confidence builds her edge by translating those changes into language investors, founders, and families can act on.",
        metric: "Insight",
        accent: "Read beneath the headline",
      },
      {
        eyebrow: "Conviction",
        title: "She is willing to say what the market needs to hear.",
        body:
          "Thought leadership requires discernment, but it also requires courage. Confidence does not hide behind vague commentary. When a development is mispriced, a trend is overheated, or a buyer is asking the wrong question, she says so plainly and backs it with reasoning.",
        metric: "Conviction",
        accent: "Stand where the evidence stands",
      },
      {
        eyebrow: "Context",
        title: "Her perspective connects local moves to broader economic stories.",
        body:
          "The future of Lagos real estate does not live in isolation. It sits inside migration, currency pressure, infrastructure financing, diaspora remittances, lifestyle change, and policy ambition. Confidence helps people see that bigger frame so they stop making small decisions with incomplete context.",
        metric: "Context",
        accent: "See the whole board",
      },
      {
        eyebrow: "Influence",
        title: "Useful analysis becomes strategic leverage.",
        body:
          "When people trust your interpretation, they invite you into more important conversations. Confidence's writing and commentary position her not just as a participant in the market, but as a voice helping shape how the market is understood.",
        metric: "Leverage",
        accent: "Shape the conversation",
      },
    ],
  },
  {
    slug: "content-creator",
    number: "04",
    title: "Content Creator",
    icon: "creator",
    summary:
      "Host of The KK Show - Key to Keys podcast. Educating thousands weekly on smart, safe real estate investment across Nigeria.",
    heroEyebrow: "Pillar 04 · Education At Scale",
    heroIntro:
      "Content is where Confidence multiplies access. Through recurring media, interviews, breakdowns, and market education, she reaches people who may never enter a boardroom but still need trustworthy guidance for serious decisions.",
    quote:
      "Consistency builds trust. When people can learn from you every week, your voice becomes part of how they make decisions.",
    visualLabel: "Platform with purpose",
    sections: [
      {
        eyebrow: "Cadence",
        title: "She treats consistency as part of the craft.",
        body:
          "The KK Show works because it shows up. In a crowded media environment, reliability becomes its own form of authority. Confidence has built a rhythm of useful conversation that teaches audiences to return because they expect substance, not filler.",
        metric: "Cadence",
        accent: "Earn attention repeatedly",
      },
      {
        eyebrow: "Education",
        title: "Her content closes knowledge gaps that cost people money.",
        body:
          "She explains titles, payment structures, market positioning, risk, and buyer psychology in ways that reduce confusion. The best educational content does not flatter the audience for already knowing. It brings them forward. That is exactly what her platform is designed to do.",
        metric: "Education",
        accent: "Remove expensive ignorance",
      },
      {
        eyebrow: "Trust Engine",
        title: "Content becomes proof long before a conversation starts.",
        body:
          "By the time many prospects meet Confidence, they already know how she thinks. That shifts the relationship. She is not introducing herself from zero; she is extending an existing body of public trust that has been built episode by episode.",
        metric: "Trust",
        accent: "Show the thinking before the pitch",
      },
      {
        eyebrow: "Reach",
        title: "The platform expands the mission, not just the audience.",
        body:
          "Media gives Confidence a way to do more than market property. It lets her raise standards, spotlight serious voices, and train investors to ask better questions. That is why her content work feels bigger than promotion. It is infrastructure for a smarter market.",
        metric: "Reach",
        accent: "Scale the mission",
      },
    ],
  },
  {
    slug: "style-icon",
    number: "05",
    title: "Style Icon",
    icon: "style",
    summary:
      "Elegance as a language. Presence as a strategy. Confidence curates a personal aesthetic that commands every room she enters.",
    heroEyebrow: "Pillar 05 · Presence With Intent",
    heroIntro:
      "Style, for Confidence, is not decorative excess. It is a disciplined expression of identity, standards, and self-respect. She understands that presentation can either dilute authority or reinforce it, and she chooses the latter every time.",
    quote:
      "Elegance is not vanity. It is one of the ways excellence becomes visible before a word is spoken.",
    visualLabel: "Elegance that leads",
    sections: [
      {
        eyebrow: "Positioning",
        title: "She uses style to communicate seriousness and self-command.",
        body:
          "People form impressions fast. Confidence treats that reality with intelligence rather than denial. Her appearance signals polish, intention, and readiness, which creates a visual alignment between the value she carries and the way she is received.",
        metric: "Positioning",
        accent: "Be read accurately",
      },
      {
        eyebrow: "Language",
        title: "Wardrobe becomes part of the story she is telling.",
        body:
          "Color, silhouette, texture, and restraint all matter. She does not dress to disappear, but neither does she dress to distract from substance. The result is a look that feels powerful without becoming theatrical.",
        metric: "Language",
        accent: "Let detail speak",
      },
      {
        eyebrow: "Confidence",
        title: "Presence is strongest when it is integrated.",
        body:
          "Style only works when it is connected to identity. Confidence's aesthetic feels coherent because it grows from who she is: precise, feminine, disciplined, visible, and unafraid of occupying space. That coherence is what makes the impression last.",
        metric: "Identity",
        accent: "Align the inside and outside",
      },
      {
        eyebrow: "Influence",
        title: "She gives women permission to be both excellent and visible.",
        body:
          "Too many women are taught to shrink their power to make it more acceptable. Confidence models another possibility: lead boldly, dress beautifully, and let elegance coexist with competence. The point is not fashion for its own sake. It is freedom without apology.",
        metric: "Permission",
        accent: "Visibility without compromise",
      },
    ],
  },
  {
    slug: "faith-based-leader",
    number: "06",
    title: "Faith-Based Leader",
    icon: "faith",
    summary:
      "Rooted in conviction, guided by grace. Her faith is not a department - it is the foundation from which every other pillar rises.",
    heroEyebrow: "Pillar 06 · Conviction At The Core",
    heroIntro:
      "Faith is not a branding layer in Confidence's life. It is the foundation underneath every public role she carries. It shapes how she chooses, how she endures pressure, and how she understands success beyond visible achievement.",
    quote:
      "Grace is not the opposite of excellence. It is the reason excellence can remain humane while the pressure rises.",
    visualLabel: "Rooted and steady",
    sections: [
      {
        eyebrow: "Foundation",
        title: "Her private life with God stabilizes her public life.",
        body:
          "When your identity is anchored, applause becomes easier to carry and criticism becomes easier to survive. Confidence's faith gives her a centre that is deeper than market cycles, titles, or recognition, and that keeps her leadership from drifting with external validation.",
        metric: "Anchor",
        accent: "Stand from the inside out",
      },
      {
        eyebrow: "Discernment",
        title: "She does not treat every opportunity as an assignment.",
        body:
          "Faith sharpens discernment. It teaches timing, restraint, and the discipline to say no even when something looks impressive. Confidence leads with that filter, which helps her preserve both integrity and energy for the things that truly matter.",
        metric: "Discernment",
        accent: "Not every door is yours",
      },
      {
        eyebrow: "Grace",
        title: "She believes strength and gentleness can coexist.",
        body:
          "In many industries, hardness is mistaken for authority. Confidence carries another model. She is capable of firmness without becoming harsh, and clear decision-making without losing compassion. That is leadership shaped by conviction rather than ego.",
        metric: "Grace",
        accent: "Lead without becoming brittle",
      },
      {
        eyebrow: "Witness",
        title: "Her leadership leaves room for hope.",
        body:
          "Faith-based leadership is not only about what you refuse to do. It is also about what people feel around you: steadiness, dignity, generosity, and hope. Confidence's influence is strongest when those qualities remain visible in rooms defined by pressure and ambition.",
        metric: "Witness",
        accent: "Make hope tangible",
      },
    ],
  },
  {
    slug: "family-woman",
    number: "07",
    title: "Family Woman",
    icon: "family",
    summary:
      "At the centre of it all - a woman who knows that a life of greatness and a life of love are not a contradiction, but a calling.",
    heroEyebrow: "Pillar 07 · Love As Legacy",
    heroIntro:
      "Confidence rejects the false trade-off between significance and intimacy. She believes a meaningful public life should deepen, not destroy, the people closest to you. That conviction shapes how she builds success and how she defines it.",
    quote:
      "A life that wins in public but fails at home is not the kind of legacy I want to build.",
    visualLabel: "Greatness with tenderness",
    sections: [
      {
        eyebrow: "Home",
        title: "She treats family life as strategic, not secondary.",
        body:
          "Home is not what remains after the real work. It is one of the places where the real work is done. Confidence understands that marriage, motherhood, and family culture require intention, emotional presence, and leadership of their own.",
        metric: "Home",
        accent: "Build what holds you",
      },
      {
        eyebrow: "Partnership",
        title: "She honors the strength of building with others.",
        body:
          "Strong family life is not passive. It involves communication, support, sacrifice, and the humility to keep growing in relationship. Confidence speaks about family from a place of commitment, not fantasy, which makes the pillar feel grounded and credible.",
        metric: "Partnership",
        accent: "Grow together on purpose",
      },
      {
        eyebrow: "Boundaries",
        title: "She protects what matters by refusing constant spillage.",
        body:
          "Ambition can consume everything if it is never disciplined. Confidence models a better rhythm by setting boundaries that let work be excellent without allowing it to swallow tenderness, rest, or presence. That balance is practiced, not accidental.",
        metric: "Boundaries",
        accent: "Guard the sacred",
      },
      {
        eyebrow: "Legacy",
        title: "Love is part of the empire she is building.",
        body:
          "The family pillar reveals the deeper architecture of her life. Wealth, voice, and influence matter, but so does the emotional climate your children inherit, the dignity your spouse experiences, and the example your home sets. Confidence sees that as legacy too.",
        metric: "Legacy",
        accent: "Let success feel human",
      },
    ],
  },
];

export function getPillarBySlug(slug: string) {
  return pillars.find((pillar) => pillar.slug === slug);
}

export function getSiblingPillars(slug: string) {
  const currentIndex = pillars.findIndex((pillar) => pillar.slug === slug);

  if (currentIndex === -1) {
    return [];
  }

  return pillars.filter((_, index) => {
    return index === currentIndex - 1 || index === currentIndex + 1;
  });
}

export function renderPillarIcon(icon: PillarIconKey, className?: string): ReactNode {
  return <PillarIcon icon={icon} className={className} />;
}
