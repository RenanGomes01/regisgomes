/**
 * Central place for all copy, links and placeholder data.
 * Swap these values for the real brand later — components only read from here.
 */

export const site = {
  name: "Lumen",
  url: "https://lumen.example.com",
  appUrl: "https://app.lumen.example.com",
  description:
    "Placeholder description for the brand. One or two sentences that explain what the product does and who it is for.",
  keywords: ["placeholder", "creative studio", "visual production", "brand"],
  twitter: "@lumen",
  email: "hello@lumen.example.com",
  copyrightYear: 2026,
} as const;

export type NavItem = { label: string; href: string };

/** Sections linked from the header pill — ids must match the section ids on the page. */
export const mainNav: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Stories", href: "#stories" },
  { label: "Pricing", href: "#pricing" },
];

export const headerCta = {
  signIn: { label: "Sign in", href: `${site.appUrl}/sign-in` },
  primary: { label: "Get started", href: "#pricing" },
};

export type FooterGroup = { title: string; links: (NavItem & { external?: boolean })[] };

export const footerNav: FooterGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Benchmarks", href: "#benchmarks" },
      { label: "Stories", href: "#stories" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: `${site.url}/about` },
      { label: "Journal", href: `${site.url}/journal` },
      { label: "Careers", href: `${site.url}/careers` },
      { label: "Contact", href: `${site.url}/contact` },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "X", href: "https://x.com/", external: true },
      { label: "Instagram", href: "https://instagram.com/", external: true },
      { label: "Dribbble", href: "https://dribbble.com/", external: true },
    ],
  },
];

export const footerLegal: NavItem[] = [
  { label: "Terms", href: `${site.url}/terms` },
  { label: "Privacy", href: `${site.url}/privacy` },
  { label: "Cookies", href: `${site.url}/cookies` },
];

export const newsletter = {
  title: "Stay in the loop",
  description: "Placeholder line about what subscribers receive and how often.",
  placeholder: "you@company.com",
  success: "Thanks — you're on the list.",
};

export const systemStatus = "All systems operational";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=720&h=960&q=75`;

export const hero = {
  titleLines: ["A placeholder headline,", "set in the display serif."],
  eyebrow: "Placeholder tagline for the product.",
  description:
    "Supporting sentence that explains the promise in one breath. Replace with the brand copy later.",
  cta: { label: "Comece a criar gratuitamente", href: "#pricing" },
  /** Abstract colourful placeholders — swap for brand imagery later. */
  images: [
    "1541701494587-cb58502866ab",
    "1618005182384-a83a8bd57fbe",
    "1557672172-298e090bd0f1",
    "1620641788421-7a1c342ea42e",
    "1558591710-4b4a1ae0f04d",
    "1634017839464-5c339ebe3cb4",
    "1550684376-efcbd6e3f031",
    "1614850523459-c2f4c699c52e",
    "1579546929518-9e396f3cc809",
    "1604076913837-52ab5629fba9",
    "1567095761054-7a02e69e5c43",
    "1617791160505-6f00504e3519",
    "1549490349-8643362247b5",
    "1635776062127-d379bfcba9f8",
    "1563089145-599997674d42",
    "1636953056323-9c09fdd74fa6",
  ].map((id, i) => ({ src: unsplash(id), alt: `Abstract artwork ${i + 1}` })),
};

export const promptReveal = {
  /** Placeholder prompt — revealed word by word as the visitor scrolls. */
  prompt:
    "“A quiet studio at dawn. One sculpted ribbon of colour, drifting in soft light. Leave space on the right for a title, keep the palette calm and warm.”",
  image: {
    src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=2400&h=1350&q=80",
    alt: "Abstract ribbon of colour rendered from the prompt above",
  },
  /** Shown on the bottom-left of the image once it has grown to full size. */
  caption: "Primeira tomada. Trinta e um segundos.",
  /** Headline revealed on the dark background as the image slides away. */
  nextTitle: "Peça doze, não um.",
};

export const variations = {
  /** Visually hidden here — the same line closes the PromptReveal section right above. */
  title: "Peça doze, não um.",
  caption: "Placeholder: twelve takes from one brief — keep the one worth presenting.",
  image: {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=900&q=80",
    alt: "Abstract render used as the base for every variation",
  },
  /** Index of the take highlighted at the end of the sequence. */
  favoriteIndex: 5,
  favoriteLabel: "Favorita",
  /** Exit phase: the favourite zooms to centre stage. */
  exitTitle: "Fique com aquela que você descartaria.",
  exitCaption: "Mantido em local mais aquecido, conforme sugerido pelo conselho.",
  /** First entry is the untouched original — it sits on top of the stack. */
  cells: [
    { label: "Original", filter: "none" },
    { label: "Mais frio", filter: "hue-rotate(-30deg) saturate(0.9)" },
    { label: "Mais suave", filter: "contrast(0.82) brightness(1.08)" },
    { label: "Mais escuro", filter: "brightness(0.68) contrast(1.1)" },
    { label: "Dessaturado", filter: "saturate(0.35)" },
    { label: "Mais quente", filter: "sepia(0.4) saturate(1.3) hue-rotate(-8deg)" },
    { label: "Mais vivo", filter: "saturate(1.7) contrast(1.15)" },
    { label: "Desbotado", filter: "contrast(0.78) brightness(1.15) saturate(0.65)" },
    { label: "Mono", filter: "grayscale(1) contrast(1.1)" },
    { label: "Mais claro", filter: "brightness(1.28)" },
    { label: "Invertido", filter: "hue-rotate(160deg) saturate(1.2)" },
    { label: "Mais profundo", filter: "saturate(1.25) brightness(0.8) contrast(1.15)" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Formats                                                                   */
/* -------------------------------------------------------------------------- */

export const formats = {
  title: "One take, every format in the plan.",
  description:
    "Placeholder paragraph: the subject is recomposed for each ratio instead of being cropped, so nothing important falls off the edge.",
  image: {
    src: unsplash("1620641788421-7a1c342ea42e").replace("w=720&h=960", "w=1600&h=1600"),
    alt: "Abstract render shown in four aspect ratios",
  },
  items: [
    { label: "Banner", ratio: "16:9", w: 16, h: 9, focus: "50% 50%" },
    { label: "Feed", ratio: "1:1", w: 1, h: 1, focus: "45% 50%" },
    { label: "Portrait", ratio: "4:5", w: 4, h: 5, focus: "55% 50%" },
    { label: "Story", ratio: "9:16", w: 9, h: 16, focus: "60% 50%" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

export const stories = {
  title: "Teams that stopped waiting on pictures.",
  description: "Placeholder intro: a few words from the people who use the product every week.",
  /** Auto-advance interval in ms. */
  interval: 7000,
  items: [
    {
      company: "Northwind",
      quote:
        "Placeholder quote. Our first campaign week used to vanish into sourcing images. Now the brief and the first visuals land on the same afternoon.",
      name: "Alex Moreau",
      role: "Design Lead",
      image: unsplash("1557672172-298e090bd0f1"),
      caption: "Placeholder caption · spring launch",
    },
    {
      company: "Halcyon",
      quote:
        "Placeholder quote. We stopped arguing about mood boards — we generate twelve directions, pick one together, and move on.",
      name: "Priya Nair",
      role: "Creative Director",
      image: unsplash("1634017839464-5c339ebe3cb4"),
      caption: "Placeholder caption · product page",
    },
    {
      company: "Atlas & Co",
      quote:
        "Placeholder quote. Brand rules finally hold across every format, so reviews are about ideas instead of colour corrections.",
      name: "Jonas Weber",
      role: "Brand Manager",
      image: unsplash("1550684376-efcbd6e3f031"),
      caption: "Placeholder caption · retail displays",
    },
    {
      company: "Meridian",
      quote:
        "Placeholder quote. A single producer now covers what used to take a small studio, and the work looks more like us than ever.",
      name: "Sofia Lind",
      role: "Head of Production",
      image: unsplash("1579546929518-9e396f3cc809"),
      caption: "Placeholder caption · social series",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Pricing                                                                   */
/* -------------------------------------------------------------------------- */

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  allowance: string;
  allowanceNote: string;
  thumb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const pricing = {
  title: "Priced by output, not by seat.",
  description:
    "Placeholder paragraph: every plan includes the full toolset and commercial use. Choose an allowance and change it whenever you like.",
  annualDiscount: 20,
  featuredBadge: "Most popular",
  plans: [
    {
      id: "starter",
      name: "Starter",
      tagline: "For solo creators.",
      monthly: 14,
      annual: 11,
      allowance: "1,000 images / mo",
      allowanceNote: "Up to 2K resolution",
      thumb: unsplash("1604076913837-52ab5629fba9"),
      features: ["All models", "Reference boards", "One brand kit", "Commercial use", "30-day history"],
      cta: "Start with Starter",
    },
    {
      id: "team",
      name: "Team",
      tagline: "For small teams shipping weekly.",
      monthly: 45,
      annual: 36,
      allowance: "5,000 images / mo",
      allowanceNote: "Up to 4K resolution",
      thumb: unsplash("1567095761054-7a02e69e5c43"),
      features: [
        "Everything in Starter",
        "Unlimited seats",
        "Shared libraries",
        "Batch variations",
        "Upscale & background removal",
        "Design-tool plugins",
      ],
      cta: "Start with Team",
      featured: true,
    },
    {
      id: "studio",
      name: "Studio",
      tagline: "For high-volume production.",
      monthly: 110,
      annual: 88,
      allowance: "18,000 images / mo",
      allowanceNote: "4K + upscale",
      thumb: unsplash("1617791160505-6f00504e3519"),
      features: [
        "Everything in Team",
        "Custom-trained styles",
        "Roles & approvals",
        "API access",
        "SSO & audit log",
        "Priority queue",
      ],
      cta: "Start with Studio",
    },
  ] satisfies Plan[],
  enterprise: {
    title: "Enterprise",
    description: "Placeholder: your terms, your models, your infrastructure.",
    cta: { label: "Talk to sales", href: `mailto:${site.email}` },
    features: [
      "Everything in Studio",
      "Private model hosting",
      "Custom data agreements",
      "Uptime SLA",
      "Volume pricing",
      "Onboarding & training",
      "Dedicated account team",
      "Invoicing & procurement",
    ],
    images: [
      unsplash("1549490349-8643362247b5"),
      unsplash("1635776062127-d379bfcba9f8"),
      unsplash("1563089145-599997674d42"),
    ],
  },
  footnote:
    "Placeholder footnote: prices in USD before tax. Unused images roll over for one month.",
};

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

export const faq = {
  title: "Questions people ask before the first render.",
  description: "Placeholder: missing something? Write to us and a person will reply within a working day.",
  items: [
    {
      q: "Who owns the images I create?",
      a: "Placeholder answer. Describe ownership and the commercial rights included on every plan.",
    },
    {
      q: "Is my work used for training?",
      a: "Placeholder answer. Explain the data policy and any opt-in or opt-out controls.",
    },
    {
      q: "What counts as one image?",
      a: "Placeholder answer. Clarify how renders, variations, upscales and resizes are counted.",
    },
    {
      q: "How do brand kits work?",
      a: "Placeholder answer. Outline colours, typography, references and how they are enforced.",
    },
    {
      q: "Can I use my own photos as references?",
      a: "Placeholder answer. Mention supported formats, limits and how references steer results.",
    },
    {
      q: "What happens if I run out of images?",
      a: "Placeholder answer. Describe overage options, top-ups and plan changes.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Final CTA                                                                 */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  title: ["A imagem que você tem na cabeça,", "até a hora do almoço."],
  description: "Placeholder: start on the free plan, bring a real brief and see the first take in minutes.",
  primary: { label: "Comece a criar gratuitamente", href: `${site.appUrl}/sign-up` },
  secondary: { label: "Veja os planos", href: "#pricing" },
  /** Wave marquee reuses the hero's abstract set. */
  images: hero.images,
};

/* -------------------------------------------------------------------------- */
/*  Benchmarks — all numbers are placeholders                                 */
/* -------------------------------------------------------------------------- */

export const benchmarks = {
  title: "Mais rápido do que a sessão de fotos que você teria agendado.",
  description:
    "Placeholder paragraph: describe how these numbers were measured, over which period, and on which queue.",
  headline: {
    value: 28,
    unit: "s",
    label: "Median time to a first render",
    description:
      "Placeholder: from pressing render to a full-resolution image, measured daily over the last thirty days.",
    /** Daily medians (seconds) for the last 30 days — placeholder series. */
    series: [
      41, 40, 42, 39, 38, 39, 37, 38, 36, 37, 35, 36, 34, 35, 33, 34, 33, 32, 33, 31, 32, 30, 31, 30, 29,
      30, 29, 28, 29, 28,
    ],
    yTicks: [25, 30, 35, 40, 45],
    xLabels: ["30 days ago", "Today"],
  },
  stats: [
    { value: 1.2, suffix: "M", label: "Images rendered last month" },
    { value: 58, suffix: "%", label: "Approved on the first take" },
    { value: 98.7, suffix: "%", label: "Brand rules respected" },
  ],
  comparison: {
    title: "Brief to approved image.",
    description:
      "Placeholder: the same brief taken through four common workflows, timed end to end. Log scale.",
    /** Durations in seconds; `display` is the human label. */
    items: [
      { label: "Lumen", seconds: 28, display: "28 s", highlight: true },
      { label: "Stock search", seconds: 90 * 60, display: "90 min" },
      { label: "Retouching", seconds: 1.5 * 86400, display: "1.5 days" },
      { label: "Photo shoot", seconds: 14 * 86400, display: "2 weeks" },
    ],
    ticks: [
      { label: "1 min", seconds: 60 },
      { label: "1 hour", seconds: 3600 },
      { label: "1 day", seconds: 86400 },
      { label: "1 week", seconds: 7 * 86400 },
      { label: "1 month", seconds: 30 * 86400 },
    ],
    /** Left edge of the log axis. */
    minSeconds: 10,
  },
};
