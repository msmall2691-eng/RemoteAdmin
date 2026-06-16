/**
 * The Remote Admin — single source of truth for all site copy.
 *
 * HOW TO EDIT (for Megan / Karen):
 * - Every word on the site is read from this file. Change the text between the
 *   quotes, save, and redeploy. No component code needs to change.
 * - Items marked `// TODO(Karen)` are placeholders waiting on a real asset or
 *   confirmed detail (headshot, exact review wording + permission, Instagram).
 * - Keep the shape (the keys and structure) the same — only edit the values.
 */

import type { LucideIcon } from "lucide-react";
import {
  FileText,
  CalendarDays,
  FolderOpen,
  Sparkles,
  Receipt,
  Inbox,
  ClipboardList,
  Mail,
  Repeat,
  ListChecks,
} from "lucide-react";

export type IconName =
  | "file-text"
  | "calendar-days"
  | "folder-open"
  | "sparkles"
  | "receipt"
  | "inbox"
  | "clipboard-list"
  | "mail"
  | "repeat"
  | "list-checks";

export const icons: Record<IconName, LucideIcon> = {
  "file-text": FileText,
  "calendar-days": CalendarDays,
  "folder-open": FolderOpen,
  sparkles: Sparkles,
  receipt: Receipt,
  inbox: Inbox,
  "clipboard-list": ClipboardList,
  mail: Mail,
  repeat: Repeat,
  "list-checks": ListChecks,
};

export const site = {
  business: {
    name: "The Remote Admin",
    owner: "Karen Felch",
    tagline: "Virtual admin & bookkeeping",
    region: "Southern New Hampshire",
    city: "Amherst",
    state: "NH",
    phone: "(603) 714-8370",
    phoneHref: "tel:+16037148370",
    email: "office@the-remote-admin.com",
    emailHref: "mailto:office@the-remote-admin.com",
    url: "https://the-remote-admin.com",
  },

  links: {
    calendly: "https://calendly.com/office-the-remote-admin/discovery-call",
    jotform: "https://form.jotform.com/243524519236154",
    facebook: "https://facebook.com/TheRemoteAdminServices",
    instagram: "https://www.instagram.com/theremoteadmin/",
  },

  nav: [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    eyebrow: "Virtual admin & bookkeeping · Southern New Hampshire",
    headline: "Let's get your business organized — and get you paid.",
    subcopy: "You focus on your customers; I'll take care of the admin.",
    primaryCta: { label: "Book a call", href: "#book" },
    secondaryCta: { label: "See what I do", href: "#services" },
    trustLine: ["Local", "Reliable", "Confidential"],
  },

  pain: {
    eyebrow: "Sound familiar?",
    heading: "If your back office is running you, you're not alone.",
    items: [
      "Invoices that never quite get sent",
      "Payments you keep meaning to follow up on",
      "Paperwork stacking up faster than you can file it",
      "Files and folders you can't find when you need them",
      "An inbox that never stops",
      "Receipts everywhere — glovebox, truck, junk drawer",
    ],
    closer: "I can help.",
  },

  services: {
    eyebrow: "What I do",
    heading: "Practical help, handled quietly in the background.",
    featured: {
      icon: "sparkles" as IconName,
      badge: "Signature",
      name: "Office Rescue",
      summary:
        "A one-time deep catch-up for when things have piled up. We dig out of the backlog together — invoices sent, payments chased, receipts sorted, files organized — so you start fresh with a back office that's actually under control.",
      points: [
        "Catch up overdue invoicing and send what's owed",
        "Follow up on unpaid balances so you get paid",
        "Sort and file the receipt-and-paperwork backlog",
        "Hand you a tidy, repeatable system to keep it that way",
      ],
      cta: { label: "Start your rescue", href: "#book" },
    },
    buckets: [
      {
        icon: "file-text" as IconName,
        name: "Bookkeeping",
        summary:
          "Day-to-day numbers kept clean and current — so you always know where you stand.",
        points: [
          "Invoicing & accounts receivable",
          "Bill pay & accounts payable",
          "Transaction categorization & reconciliations",
          "Monthly reports you can actually read",
        ],
      },
      {
        icon: "calendar-days" as IconName,
        name: "Administrative Services",
        summary:
          "The everyday admin that eats your evenings — managed for you.",
        points: [
          "Inbox & email management",
          "Scheduling & calendar coordination",
          "Customer follow-up & communications",
          "Document prep & data entry",
        ],
      },
      {
        icon: "folder-open" as IconName,
        name: "Additional Support",
        summary:
          "Extra hands for the projects and odd jobs that keep getting pushed to next week.",
        points: [
          "File & folder organization",
          "Spreadsheet & list cleanup",
          "Onboarding new tools & templates",
          "Project-based and seasonal help",
        ],
      },
    ],
    tagline: "Help your small business breathe again.",
  },

  packages: {
    eyebrow: "Ways to work together",
    heading: "Flexible help that fits how you actually run.",
    items: [
      {
        icon: "sparkles" as IconName,
        name: "Office Rescue",
        kind: "One-time",
        // TODO(Karen): confirm package names/pricing, or keep prices omitted.
        price: "Custom quote",
        description:
          "A single, focused catch-up to dig out of the backlog and reset your systems.",
        features: [
          "Backlog cleared",
          "Invoices sent & followed up",
          "Receipts & files sorted",
          "A simple system to keep going",
        ],
        highlighted: true,
        cta: { label: "Book a rescue", href: "#book" },
      },
      {
        icon: "repeat" as IconName,
        name: "Monthly Support",
        kind: "Ongoing",
        price: "Starting at — let's talk",
        description:
          "Steady, predictable help every month so the admin never piles up again.",
        features: [
          "Recurring bookkeeping",
          "Ongoing invoicing & follow-up",
          "Inbox & scheduling support",
          "Monthly check-in",
        ],
        highlighted: false,
        cta: { label: "Book a call", href: "#book" },
      },
      {
        icon: "list-checks" as IconName,
        name: "À la carte",
        kind: "As needed",
        price: "By the project",
        description:
          "Pick exactly what you need help with, when you need it — no commitment.",
        features: [
          "One-off projects",
          "Seasonal or overflow help",
          "Specific tasks only",
          "Pay for what you use",
        ],
        highlighted: false,
        cta: { label: "Ask about à la carte", href: "#book" },
      },
    ],
    note: "Not sure which fits? Book a call and we'll figure it out together.",
  },

  how: {
    eyebrow: "How it works",
    heading: "Three steps to getting your time back.",
    steps: [
      {
        n: 1,
        title: "Book a call",
        body: "Grab a free discovery call. We talk through what's on your plate and where you're stuck — no pressure, no jargon.",
        cta: { label: "Book your discovery call", href: "#book" },
      },
      {
        n: 2,
        title: "I build your plan",
        body: "I map out exactly what I'll take off your hands, how we'll work together, and what it costs. You approve it.",
      },
      {
        n: 3,
        title: "You get your time back",
        body: "I handle the admin in the background. You get clean books, sent invoices, and your evenings back.",
      },
    ],
  },

  about: {
    eyebrow: "About Karen",
    name: "Karen Felch",
    // TODO(Karen): replace with the provided headshot. Drop the file in /public.
    photo: {
      src: "/karen.jpg",
      alt: "Karen Felch, owner of The Remote Admin",
    },
    pullQuote:
      "I started The Remote Admin because I love doing the work that most business owners dread — and I've seen what it does for them when it's finally handled.",
    bio: [
      "Hi, I'm Karen. For over 35 years I've helped businesses stay organized and keep their offices running smoothly — and I started The Remote Admin to bring that same support to small, service-based businesses across southern New Hampshire, so the people running them can get back to the work they actually love.",
      "I know how it feels when the paperwork piles up: invoices sitting unsent, payments slipping through the cracks, an inbox that never empties. You didn't start your business to spend nights buried in receipts. That's where I come in.",
      "Whether it's a one-time Office Rescue to dig you out, or steady monthly support so it never gets that bad again, I treat your business like it's my own — carefully, reliably, and always confidentially.",
    ],
    signature: "— Karen",
    serviceArea: {
      label: "Proudly serving",
      towns: [
        "Amherst",
        "Bedford",
        "Merrimack",
        "Milford",
        "New Boston",
        "Nashua",
        "Manchester",
        "Exeter",
        "Concord",
      ],
      remoteNote: "and remote clients anywhere.",
    },
  },

  reviews: {
    eyebrow: "Kind words",
    heading: "Local business owners who got their time back.",
    items: [
      {
        quote:
          "Karen is a breath of fresh air! She is responsive, timely, efficient, and has the best communication.",
        name: "Ducharme Tree Service",
        attribution: "Client",
      },
      // TODO(Karen): add a couple more real Facebook/Google reviews here.
      {
        quote:
          "Reliable, organized, and so easy to work with. She caught up months of bookkeeping in no time and I actually understand my numbers now.",
        name: "Solo business owner",
        attribution: "Google review",
      },
      {
        quote:
          "Honestly the best decision I made all year. I stopped dreading the admin because Karen just handles it.",
        name: "Service-based owner",
        attribution: "Facebook review",
      },
    ],
    spotlight: {
      client: "Bohan Electric",
      quote:
        "Karen has been the missing link to our company being more legit and more like on autopilot.",
      name: "Bohan Electric",
      attribution: "Client spotlight",
    },
  },

  clients: {
    eyebrow: "Businesses I work with",
    heading: "Proudly supporting local businesses.",
    closer: "We serve all small business & service industries.",
    /**
     * The businesses Karen supports — logos link out to their sites.
     * To add one: drop the logo in /public/clients/ and add an item below.
     * Leave `url` empty to show the logo without a "Visit" link.
     */
    items: [
      {
        name: "Bohan Electric",
        logo: "/clients/bohan-electric.webp",
        url: "https://www.bohanelectric.com/",
      },
      {
        name: "Ducharme Tree Service",
        logo: "/clients/ducharme-tree-service.webp",
        url: "https://ducharmetreeservice.com/",
      },
      {
        name: "Complete Masonry",
        logo: "/clients/complete-masonry.webp",
        url: "",
      },
    ],
  },

  faq: {
    eyebrow: "Good questions",
    heading: "The things people ask before we start.",
    items: [
      {
        q: "Is my information kept confidential?",
        a: "Always. I treat your financials and business details with complete confidentiality — your information stays between us, full stop.",
      },
      {
        q: "What software do you work with?",
        a: "I work in QuickBooks and the common tools small businesses already use. If you're not set up yet, I'll help you choose something simple and get it running.",
      },
      {
        q: "How will we communicate?",
        a: "However works best for you — email, phone, or text — at a cadence we agree on. You'll always know what I'm working on and where things stand.",
      },
      {
        q: "Am I locked into a contract?",
        a: "No long, scary contracts. We start with a clear plan, and you can choose a one-time rescue, ongoing monthly support, or à la carte help as you need it.",
      },
      {
        q: "You're remote — but are you local?",
        a: "Both. I'm based in Amherst, NH and work with businesses all over southern New Hampshire. Working remotely just means I can help you efficiently, without the overhead of being on-site.",
      },
    ],
  },

  social: {
    eyebrow: "Stay in the loop",
    heading: "Follow along for tips and updates.",
    body: "Quick, practical tips for keeping your back office under control — plus what's new at The Remote Admin.",
  },

  getStarted: {
    eyebrow: "Get started",
    heading: "Ready to get organized?",
    body: "Book a free discovery call below, or send a quick message and I'll get right back to you.",
    calendly: {
      heading: "Book a discovery call",
      body: "Pick a time that works — it's free, friendly, and there's no pressure.",
    },
    contact: {
      heading: "Or send a quick message",
      body: "Tell me a little about what you need and I'll be in touch.",
      successTitle: "Got it — thank you!",
      successBody:
        "Your message is on its way to my inbox. I'll get back to you shortly. Talk soon!",
      errorTitle: "Hmm, that didn't go through.",
      errorBody:
        "Something went wrong on my end. Please try again, or email me directly at office@the-remote-admin.com.",
      needOptions: ["Office Rescue", "Bookkeeping", "Admin", "Invoicing"],
    },
    jotform: {
      label: "Serious about working together? Start the New Client Intake →",
    },
  },

  footer: {
    blurb:
      "Virtual admin & bookkeeping for small, service-based businesses across southern New Hampshire.",
    copyright: "Karen Felch · Amherst, NH",
  },
} as const;

export type Site = typeof site;
