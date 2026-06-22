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
  Workflow,
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
  | "list-checks"
  | "workflow";

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
  workflow: Workflow,
};

export const site = {
  business: {
    name: "The Remote Admin",
    owner: "Karen Felch",
    tagline: "Virtual admin & bookkeeping",
    slogan: "Making your life easier, one task at a time.",
    region: "Southern New Hampshire",
    city: "Amherst",
    state: "NH",
    phone: "(603) 714-8370",
    phoneHref: "tel:+16037148370",
    smsHref: "sms:+16037148370",
    email: "office@the-remote-admin.com",
    emailHref: "mailto:office@the-remote-admin.com",
    url: "https://the-remote-admin.com",
  },

  links: {
    calendly: "https://calendly.com/office-the-remote-admin/discovery-call",
    jotform: "https://form.jotform.com/243524519236154",
    facebook: "https://facebook.com/TheRemoteAdminServices",
    instagram: "https://www.instagram.com/theremoteadmin/",
    // Karen's Google share link (from her Business Profile).
    google: "https://share.google/U4LdybsVORFwJJrXI",
  },

  nav: [
    { label: "Home", href: "/#top" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "How it works", href: "/#how" },
    { label: "Reviews", href: "/#reviews" },
    { label: "FAQ", href: "/#faq" },
    { label: "Free Tools", href: "/#tools" },
  ],

  toolsPage: {
    eyebrow: "Free Admin Tools",
    title: "Free admin tools for small business owners",
    intro:
      "Simple tools to help you save time, look more professional, and stay organized — created by The Remote Admin.",
    disclaimer:
      "These tools are for general business use and run entirely in your browser. We don’t store any of the information you enter.",
  },

  hero: {
    eyebrow: "Virtual admin · Southern NH",
    headline:
      "Administrative office support for contractors & small service-based businesses",
    subcopy: "You focus on your customers; I'll take care of the admin.",
    primaryCta: { label: "Book a call", href: "#book" },
    secondaryCta: { label: "See what I do", href: "#services" },
    trustLine: ["Local", "Friendly", "Confidential"],
  },

  valueProps: {
    heading: "What you can count on.",
    items: [
      { title: "Accurate", body: "Financial support you can count on." },
      { title: "Organized", body: "Your systems and documents, in order." },
      { title: "Reliable", body: "Follow-through on every task." },
      { title: "Easy to work with", body: "Clear, friendly communication." },
    ],
  },

  pain: {
    eyebrow: "Sound familiar?",
    heading: "Is your back office running you?",
    items: [
      "Invoices that never quite get sent",
      "Payments you keep meaning to follow up on",
      "Paperwork stacking up faster than you can file it",
      "Files and folders you can't find when you need them",
      "An inbox that never stops",
      "Receipts everywhere, glovebox, truck, junk drawer",
    ],
    closer: "The Remote Admin can help.",
  },

  services: {
    eyebrow: "What I do",
    heading: "Administrative support that keeps your business moving.",
    intro: "I serve contractors and small service-based businesses.",
    strengths: [
      "Invoicing & collections",
      "Contractor support",
      "Forms, SOPs & process creation",
      "Office organization & cleanup",
      "Follow-up & communication",
      "W-9 & COI requests",
    ],
    featured: {
      icon: "sparkles" as IconName,
      badge: "Signature",
      name: "Office Rescue",
      subtitle: "A one-time administrative reset",
      summary:
        "When paperwork piles up and tasks start slipping through the cracks, The Remote Admin will help you get caught up and organized with a plan that works moving forward.",
      points: [
        "Backlog cleanup and organization",
        "Invoicing and customer follow-up",
        "Forms, files, and process improvements",
        "A clear plan to keep things running smoothly",
      ],
      cta: { label: "Start your rescue", href: "#book" },
    },
    buckets: [
      {
        icon: "clipboard-list" as IconName,
        name: "Administrative Services",
        summary:
          "The day-to-day support that keeps your office running efficiently.",
        points: [
          "Email and communication management",
          "Customer follow-up and service support",
          "W-9 & COI (certificate of insurance) requests",
          "Data entry, forms, and documentation",
        ],
        mini: ["Customers followed up", "Paperwork in order"],
      },
      {
        icon: "file-text" as IconName,
        name: "Financial Administration",
        summary:
          "Stay on top of your numbers without spending evenings buried in paperwork.",
        points: [
          "Invoicing and accounts receivable",
          "Customer payment follow-up",
          "Accounts payable support",
          "Bank and credit card reconciliations",
        ],
        mini: ["Accounts reconciled", "Bills paid on time"],
      },
      {
        icon: "workflow" as IconName,
        name: "Systems & SOPs",
        summary:
          "When how you work only lives in your head, things break the moment you step away. The Remote Admin turns your day-to-day into clear, written systems your business can actually run on.",
        points: [
          "Standard operating procedures (SOPs)",
          "Step-by-step process documentation",
          "Custom forms, checklists & templates",
          "Onboarding & training materials",
        ],
        mini: ["SOPs documented", "Workflows mapped"],
      },
      {
        icon: "folder-open" as IconName,
        name: "Project Support",
        summary:
          "One-time projects and special tasks that need attention but never seem to reach the top of the list.",
        points: [
          "File and folder organization",
          "Spreadsheet cleanup and setup",
          "Forms, templates, and workflows",
          "Seasonal and project-based assistance",
        ],
        mini: ["Files organized", "Templates ready"],
      },
    ],
    tagline: "Help your small business breathe again.",
  },

  tools: {
    eyebrow: "Tools & systems",
    heading: "I work in the tools you already use.",
    body: "No need to learn anything new. I'll meet your business where it already runs.",
    items: [
      "QuickBooks",
      "Jobber",
      "Google Workspace",
      "Gmail",
      "Google Drive",
      "Google Sheets",
      "Microsoft Excel",
      "Microsoft Teams",
      "Outlook",
      "Windows",
      "Dropbox",
      "Zoom",
      "Calendly",
      "and more",
    ],
  },

  cta: {
    heading: "Ready to hand off the admin?",
    body: "Book a free, no-pressure discovery call and let's get you caught up.",
    button: "Book a call",
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
        price: "Let's talk pricing",
        description:
          "Steady, predictable help every month so the admin never piles up again.",
        features: [
          "Recurring bookkeeping",
          "Ongoing invoicing & follow-up",
          "Customer follow-up & communication",
          "Regular communication and support tailored to your needs",
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
          "Pick exactly what you need help with, when you need it, no commitment.",
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
    note: "Not sure which fits? Book a call and I'll figure it out with you.",
  },

  how: {
    eyebrow: "How it works",
    heading: "Three steps to getting your time back.",
    steps: [
      {
        n: 1,
        title: "Book a call",
        body: "Grab a free discovery call. I'll talk through what's on your plate and where you're stuck, no pressure, no jargon.",
        cta: { label: "Book your discovery call", href: "#book" },
      },
      {
        n: 2,
        title: "I build your plan",
        body: "I'll map out exactly what I'll take off your hands, how I'll work with you, and what it costs, then you approve it.",
      },
      {
        n: 3,
        title: "You get your time back",
        body: "I handle the admin in the background. You get clean books, sent invoices, and your evenings back.",
      },
    ],
  },

  about: {
    eyebrow: "About the Founder",
    name: "Karen Felch",
    // TODO(Karen): replace with the provided headshot. Drop the file in /public.
    photo: {
      src: "/karen.jpg",
      alt: "Karen Felch, owner of The Remote Admin",
    },
    pullQuote:
      "I love being the person my clients can count on when they need an extra hand.",
    bio: [
      "Hi, I'm Karen, founder of The Remote Admin. For more than 35 years, I've helped businesses stay organized and keep their offices running smoothly. I know firsthand how quickly administrative tasks can pile up, taking valuable time away from the work that matters most.",
      "That's why I started The Remote Admin, to provide dependable, personalized support that helps business owners stay on top of their day-to-day operations. From invoicing and collections to customer follow-up, scheduling, and paperwork, I'm here to help keep things organized and moving forward.",
      "I love building relationships with my clients and being the person they can count on when they need an extra hand. When I'm not working, you'll usually find me enjoying time on the lake or making memories with my three grandchildren.",
    ],
    signature: "Karen",
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
    closer: "I serve all small business & service industries.",
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
      {
        name: "The Maine Cleaning Co.",
        logo: "/clients/the-maine-cleaning-co.webp",
        url: "https://maineclean.co",
      },
    ],
  },

  faq: {
    eyebrow: "Good questions",
    heading: "Questions, answered.",
    items: [
      {
        q: "Is my information kept confidential?",
        a: "Always. I treat your financials and business details with complete confidentiality. Your information stays between us, full stop.",
      },
      {
        q: "What software do you work with?",
        a: "I work in QuickBooks and the common tools small businesses already use. If you're not set up yet, I'll help you choose something simple and get it running.",
      },
      {
        q: "How do you communicate?",
        a: "However works best for you, email, phone, or text, at a cadence that works for you. You'll always know what I'm working on and where things stand.",
      },
      {
        q: "Am I locked into a contract?",
        a: "No long, scary contracts. I start with a clear plan, and you can choose a one-time rescue, ongoing monthly support, or à la carte help as you need it.",
      },
      {
        q: "You're remote, but are you local?",
        a: "Both. I'm based in Amherst, NH and work with businesses all over southern New Hampshire. Working remotely just means I can help you efficiently, without the overhead of being on-site.",
      },
    ],
  },

  social: {
    eyebrow: "Stay in the loop",
    heading: "Follow along for tips and updates.",
    body: "Quick, practical tips for keeping your back office under control, plus what's new at The Remote Admin.",
  },

  getStarted: {
    eyebrow: "Get started",
    heading: "Ready to get organized?",
    body: "Book a free discovery call below, or send a quick message and I'll get right back to you.",
    meet: {
      line: "Hi, I'm Karen. You'll be talking with me, not a call center. Let's find the right next step for your business, no pressure.",
      role: "Karen Felch · Owner, The Remote Admin",
    },
    calendly: {
      heading: "Book a discovery call",
      body: "Pick a time that works, it's free, friendly, and there's no pressure.",
    },
    contact: {
      heading: "Or send a quick message",
      body: "Tell me a little about what you need and I'll be in touch.",
      successTitle: "Got it, thank you!",
      successBody:
        "Your message is on its way to my inbox. I'll get back to you shortly. Talk soon!",
      errorTitle: "Hmm, that didn't go through.",
      errorBody:
        "Something went wrong on my end. Please try again, or email me directly at office@the-remote-admin.com.",
      needOptions: [
        "Office Rescue",
        "Ongoing admin support",
        "Financial Administration",
        "Special project",
        "General support",
      ],
    },
    jotform: {
      label: "Serious about working together? Start the New Client Intake →",
    },
  },

  footer: {
    blurb:
      "Admin office support, light bookkeeping, collections, and more for contractors and small service-based businesses across southern New Hampshire.",
    copyright: "Karen Felch · Amherst, NH",
    credit: { label: "Site by M Studio", href: "https://www.mlinx.studio" },
  },
} as const;

export type Site = typeof site;
