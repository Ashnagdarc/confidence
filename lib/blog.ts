export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  intro: string;
  publishedAt: string;
  readTime: string;
  pullQuote: string;
  takeaways: string[];
  sections: BlogSection[];
};

// Add new post objects here. The blog index, homepage previews, and article pages
// are all generated from this single list.
const blogPosts: BlogPost[] = [
  {
    slug: "new-lagos-corridor-africa-real-estate",
    category: "Featured Essay",
    title:
      "Why the New Lagos Corridor Is the Most Important Real Estate Story in Africa Right Now",
    excerpt:
      "The infrastructure connecting Lekki Free Trade Zone, Ibeju-Lekki, and Epe is not a story about land. It is a story about the next generation of Nigerian wealth and where it will be built.",
    intro:
      "When most people look at the New Lagos corridor, they see plots, estate names, and price charts. I see a coordinated transfer of economic gravity. Roads, industrial anchors, logistics access, and new consumer demand are converging in one direction. Investors who understand that early will stop buying with yesterday's map.",
    publishedAt: "2026-03-24",
    readTime: "7 min read",
    pullQuote:
      "The strongest property stories are never about land first. They are about movement: of jobs, of infrastructure, of capital, and eventually of belief.",
    takeaways: [
      "Infrastructure is the real signal. Price growth follows access and utility, not noise.",
      "The corridor should be evaluated as an economic system, not as isolated estates.",
      "Investors need staged entry, verified title, and patience for the right holding period.",
    ],
    sections: [
      {
        heading: "Follow the infrastructure, not the hype",
        paragraphs: [
          "Serious real estate growth begins where movement becomes easier. When a corridor starts receiving roads, industrial activity, and state attention, the question is no longer whether value will shift. The real question is who will identify the durable nodes before speculation outruns fundamentals.",
          "That is why Lekki Free Trade Zone, the Dangote refinery axis, deep seaport activity, and the larger Ibeju-Lekki to Epe expansion matter so much. These are not decorative headlines. They are structural changes. And structural changes create long-term pricing power when they are supported by actual demand.",
        ],
      },
      {
        heading: "What sophisticated investors should measure",
        paragraphs: [
          "The wrong way to assess the corridor is to ask, 'How much is this plot today?' The better questions are: what is the quality of title, how close is the asset to confirmed infrastructure, what kind of buyer will exist in five years, and what use case will still make sense when the market matures?",
          "Investors who win here are rarely the loudest. They are the most disciplined. They understand entry timing, they document every transaction properly, and they avoid the emotional rush that usually comes with frontier markets.",
        ],
      },
      {
        heading: "The next wealth map of Lagos",
        paragraphs: [
          "A city does not expand evenly. It expands toward pressure points. Whenever commerce, logistics, and housing demand begin to reinforce one another, a new wealth map starts to form. That is exactly what we are watching in this corridor.",
          "This does not mean every offering in the area is good. It means the corridor deserves clear-eyed attention. The opportunity is real, but only investors who combine optimism with due diligence will convert that opportunity into lasting value.",
        ],
      },
    ],
  },
  {
    slug: "off-plan-investment-lagos-buyers-guide",
    category: "Market Watch",
    title: "The Truth About Off-Plan Investment in Lagos — What Buyers Must Know",
    excerpt:
      "Off-plan promises are only as good as the developer behind them. Buyers need a framework for reading risk before they commit a single naira.",
    intro:
      "Off-plan is one of the most misunderstood investment plays in Lagos. Done well, it allows buyers to enter early, spread payments, and capture upside before completion. Done badly, it becomes a story of delays, vague promises, and capital tied up in projects that were never disciplined enough to finish well.",
    publishedAt: "2026-03-17",
    readTime: "6 min read",
    pullQuote:
      "In off-plan, your real asset is not the brochure. It is the credibility of the developer, the clarity of the paperwork, and the realism of the delivery plan.",
    takeaways: [
      "Developer track record matters more than showroom polish.",
      "Construction milestones and payment schedules must align logically.",
      "Exit strategy should be defined before the first payment is made.",
    ],
    sections: [
      {
        heading: "Why off-plan can still be smart",
        paragraphs: [
          "Off-plan works because time can be priced. Buyers who enter earlier often access better payment structures and stronger upside if the project is completed well. In markets like Lagos where supply quality still varies widely, getting in before completion can create a powerful advantage.",
          "But that advantage only exists when the project is grounded in reality. If the pricing is disconnected from the location, the timeline is vague, or the developer cannot show credible delivery history, the upside story is already compromised.",
        ],
      },
      {
        heading: "The three checks buyers skip too often",
        paragraphs: [
          "First, confirm the developer's actual record, not just the marketing language. Visit delivered projects, ask hard questions, and notice the finishing quality. Second, read the documentation line by line: title, allocation terms, refund terms, and handover obligations all matter. Third, match the payment plan to construction reality. If the structure favors the seller completely, caution is justified.",
          "The biggest mistakes in off-plan are rarely technical. They come from urgency. Buyers rush because they fear missing the deal. That emotional posture is exactly what weak projects depend on.",
        ],
      },
      {
        heading: "Buy with the end in mind",
        paragraphs: [
          "Every off-plan purchase should start with a clear exit logic. Are you buying to hold, flip, rent, or secure future use? The answer affects what type of project makes sense, what location premium you can justify, and how much delay risk you can tolerate.",
          "The goal is not to avoid all risk. The goal is to understand what risk you are being paid to take. When that is clear, off-plan can become a disciplined wealth-building tool instead of an expensive lesson.",
        ],
      },
    ],
  },
  {
    slug: "confidence-as-a-career",
    category: "Leadership",
    title:
      "Confidence as a Career: How I Built a Real Estate Empire Without Losing Myself",
    excerpt:
      "Leadership is not loudness. It is the quiet discipline of staying clear about who you are while building at a demanding level.",
    intro:
      "People often confuse confidence with performance. I do not. Real confidence is composure under pressure, clarity in decision-making, and a refusal to abandon your values just because growth is accelerating. Building anything meaningful in business will test identity before it rewards skill.",
    publishedAt: "2026-03-10",
    readTime: "5 min read",
    pullQuote:
      "The most durable leaders are not the ones trying to look powerful. They are the ones who can stay anchored while everything around them is moving.",
    takeaways: [
      "Confidence grows from evidence, not noise.",
      "Identity protects leaders from making expensive, ego-driven decisions.",
      "Consistency is often more powerful than charisma.",
    ],
    sections: [
      {
        heading: "Confidence is built, not borrowed",
        paragraphs: [
          "I did not build confidence by waiting to feel ready. I built it by making promises to myself and keeping them. Showing up. Learning fast. Correcting mistakes. Repeating the work long enough for self-trust to become natural.",
          "That distinction matters because borrowed confidence is fragile. It depends on applause, appearance, or momentum. Built confidence can survive quieter seasons because it is rooted in personal integrity, not public response.",
        ],
      },
      {
        heading: "What leadership costs in private",
        paragraphs: [
          "Leadership always looks cleaner from a distance. Up close, it is a sequence of difficult choices, unresolved ambiguity, and emotional restraint. You often have to stay steady for other people before you get the chance to process your own pressure.",
          "That is why inner life matters so much. Faith, reflection, and disciplined routines are not optional extras for me. They are operating systems. They create the margin that allows leadership to stay human instead of becoming performative.",
        ],
      },
      {
        heading: "Building without losing yourself",
        paragraphs: [
          "Ambition becomes dangerous when it begins to demand self-erasure. A career should stretch you, but it should not sever you from your convictions. The more visible the work becomes, the more intentional you have to be about what stays non-negotiable.",
          "Success that costs your center is too expensive. I would rather build more deliberately and remain whole than accelerate into a version of achievement that looks impressive but feels empty.",
        ],
      },
    ],
  },
  {
    slug: "banana-island-shortlet-ban",
    category: "Women in Business",
    title:
      "The Banana Island Shortlet Ban: What It Signals for the Nigerian Luxury Market",
    excerpt:
      "Regulation follows demand. The conversation around shortlets in premium districts tells us where luxury real estate is heading and what operators must do next.",
    intro:
      "Whenever a premium market begins tightening its rules, investors should pay attention. Regulation is not always a threat. Sometimes it is proof that an asset class has become too visible, too influential, or too messy to remain informal. The Banana Island shortlet conversation belongs in that category.",
    publishedAt: "2026-03-03",
    readTime: "6 min read",
    pullQuote:
      "Luxury markets eventually demand structure. When they stop tolerating improvisation, serious operators gain an advantage.",
    takeaways: [
      "Premium locations are moving toward stricter operating standards.",
      "Shortlet investors need compliance, service quality, and resident-sensitive systems.",
      "Luxury demand is not disappearing; it is becoming more selective.",
    ],
    sections: [
      {
        heading: "Why the signal matters",
        paragraphs: [
          "Banana Island has always functioned as more than a location. It is a status marker and a pricing reference point for the upper end of the Lagos market. So when questions emerge around how shortlets should operate there, the implications extend beyond one neighborhood.",
          "The signal is simple: luxury real estate can no longer depend on informal management standards while charging premium rates. If an operator wants the upside of a high-end market, that operator must also carry the discipline that high-end residents expect.",
        ],
      },
      {
        heading: "What investors should adjust",
        paragraphs: [
          "Investors should move away from the idea that shortlet success is purely about decor and nightly rates. Compliance, building rules, resident relations, housekeeping systems, guest screening, and crisis response all shape whether the model remains viable in premium zones.",
          "That shift will remove weaker players, but it can improve the category. Better standards generally mean stronger trust, more stable occupancy, and longer-term defensibility for the operators who take the business seriously.",
        ],
      },
      {
        heading: "The future of premium shortlets",
        paragraphs: [
          "Luxury demand in Lagos is still real. Executives, diaspora families, project teams, and high-net-worth visitors continue to need flexible, well-managed accommodation. The opportunity is not vanishing. It is maturing.",
          "That is the frame investors should adopt. Do not panic. Upgrade. The operators who survive this phase will likely emerge stronger because the market will increasingly reward professionalism over improvisation.",
        ],
      },
    ],
  },
  {
    slug: "carrying-purpose-in-a-competitive-world",
    category: "Faith & Purpose",
    title: "7 Things I Know About Carrying Purpose in a Competitive World",
    excerpt:
      "Success without roots becomes performance. Purpose has to be carried with discipline, not sentiment, especially in high-pressure environments.",
    intro:
      "Purpose is easy to describe when life is quiet. The real test comes when deadlines are tight, opportunities are loud, and comparison is everywhere. In those moments, purpose has to function as direction, not decoration. It has to shape decisions, not just language.",
    publishedAt: "2026-02-24",
    readTime: "5 min read",
    pullQuote:
      "Purpose is not proven by what you say in calm seasons. It is revealed by what you refuse in accelerated ones.",
    takeaways: [
      "Purpose needs structure if it is going to survive pressure.",
      "Comparison erodes clarity faster than failure does.",
      "Anchored people move with more peace, even when they move boldly.",
    ],
    sections: [
      {
        heading: "Purpose must become practice",
        paragraphs: [
          "One of the biggest mistakes people make is treating purpose as a feeling. Feelings are useful, but they are unstable. Purpose becomes powerful when it is translated into habits: how you allocate time, what you say yes to, who you learn from, and what you protect.",
          "Without that translation, purpose remains inspirational but ineffective. It sounds good in conversation yet disappears in decision-making. Real purpose should make some choices easier because it narrows what aligns and what does not.",
        ],
      },
      {
        heading: "Competition can distort calling",
        paragraphs: [
          "Competitive environments reward visibility, speed, and constant comparison. None of those things are inherently bad, but they can gradually move a person away from genuine alignment. You stop asking, 'What is mine to build?' and start asking, 'What is everyone else doing?'",
          "That drift is subtle and dangerous. It produces busy lives with thin meaning. The antidote is regular return: return to conviction, return to prayer, return to the values that shaped your direction before the noise became louder.",
        ],
      },
      {
        heading: "The quiet strength of rooted ambition",
        paragraphs: [
          "Purpose does not make a person passive. In fact, it can create extraordinary ambition. But rooted ambition moves differently. It is less reactive, less desperate, and less vulnerable to outside pressure.",
          "That kind of ambition is what I trust. It can build, lead, and influence without losing its center. In a world that rewards spectacle, rooted ambition remains one of the rarest advantages a person can have.",
        ],
      },
    ],
  },
  {
    slug: "diaspora-property-buying-guide",
    category: "Diaspora Investor Series",
    title:
      "Nigerians in the Diaspora: A Step-By-Step Guide to Buying Property Safely From Abroad",
    excerpt:
      "Distance is not the real barrier. Information gaps are. Diaspora buyers need a process that protects capital from title to keys.",
    intro:
      "Buying property from abroad should not feel like gambling. The challenge for diaspora investors is not only distance. It is trust, verification, and the absence of a reliable process. Once those three things are corrected, distance becomes manageable.",
    publishedAt: "2026-02-17",
    readTime: "8 min read",
    pullQuote:
      "The safest diaspora transactions are not built on luck. They are built on process, documentation, and partners who can be verified before money moves.",
    takeaways: [
      "Every diaspora purchase should begin with verified documentation.",
      "Independent checks matter even when the seller feels familiar.",
      "A clear closing and handover process prevents expensive confusion later.",
    ],
    sections: [
      {
        heading: "Start with documentation, not emotion",
        paragraphs: [
          "Diaspora buyers often begin with attachment to a location or a desire to 'finally own something back home.' That emotion is understandable, but the first step should always be documentation. Title, survey, allocation terms, development approvals, and payment records all deserve close review before money is committed.",
          "This is especially important because distance compresses visibility. You cannot casually inspect every stage yourself, so the transaction has to be designed around evidence instead of assumption.",
        ],
      },
      {
        heading: "Build a verification team",
        paragraphs: [
          "No serious diaspora buyer should operate alone. You need a credible sales partner, legal review, and where necessary an independent verification layer. That team protects you from pressure, confusion, and the false security that sometimes comes from dealing with familiar names.",
          "Trust is not the absence of checks. In professional real estate, trust is strengthened by checks. The more transparent the process is, the safer the investment becomes for everyone involved.",
        ],
      },
      {
        heading: "Think beyond purchase day",
        paragraphs: [
          "A property transaction does not end when payment is complete. Buyers also need a handover plan, documentation archive, utility understanding, service-charge clarity, and a clear strategy for use. Will the property be occupied, rented, held, or resold? That should shape the choice from the beginning.",
          "When diaspora buyers approach the process with structure, the experience changes completely. Instead of reacting to risk after the fact, they build protection into the transaction from the first conversation.",
        ],
      },
    ],
  },
];

export type BlogPreview = Pick<
  BlogPost,
  "slug" | "category" | "title" | "excerpt" | "publishedAt" | "readTime"
>;

export function getAllBlogPosts() {
  return [...blogPosts].sort((left, right) =>
    right.publishedAt.localeCompare(left.publishedAt),
  );
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function getBlogPostPreviews(): BlogPreview[] {
  return getAllBlogPosts().map(
    ({ slug, category, title, excerpt, publishedAt, readTime }) => ({
      slug,
      category,
      title,
      excerpt,
      publishedAt,
      readTime,
    }),
  );
}

export function getRelatedBlogPosts(slug: string, count = 3) {
  return getAllBlogPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, count);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
