# The Remote Admin — website

Marketing site for **The Remote Admin** (virtual admin & bookkeeping, Amherst NH).
A fast, warm, one-page site that gets local small-business owners to book a
discovery call or send an inquiry.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed to
**Vercel**, custom domain **the-remote-admin.com**.

> **The one rule that matters most:** everything ships under Karen's own
> accounts — domain registrar, host (Vercel), Resend, Calendly, JotForm, email.
> Don't create any service under anyone else's personal account. See the
> ownership checklist below.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in the values (see below)
npm run dev                  # http://localhost:3000
```

Scripts:

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript, no emit

---

## Environment variables

Copy `.env.example` → `.env.local` (local) and set the same keys in the Vercel
project settings (Production). All keys live under **Karen's own accounts**.

| Variable | What it's for |
| --- | --- |
| `GMAIL_USER` | The Gmail/Workspace address that sends the form email (e.g. `office@the-remote-admin.com`). |
| `GMAIL_APP_PASSWORD` | A 16-char Google **App Password** for that account (needs 2-Step Verification on). |
| `CONTACT_TO_EMAIL` | Where inquiries land (optional; defaults to `GMAIL_USER`). |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used for SEO/OG/sitemap. No trailing slash. |

The contact form delivers via **Gmail SMTP** straight to Karen's inbox (no
third-party service). To get the App Password: Google Account → **Security** →
turn on **2-Step Verification** → **App passwords** → create one for "Mail",
and paste the 16 characters into `GMAIL_APP_PASSWORD`. The form returns a
friendly error if these aren't set, so the rest of the site works fine before
email is wired up.

---

## Editing the content (no code required)

**All copy lives in [`content/site.ts`](content/site.ts).** Nothing is
hard-coded in components. To change a headline, a service, a review, the FAQ,
phone/email, or a link: open that file, edit the text between the quotes, save,
and redeploy (push to the branch — Vercel rebuilds automatically).

Things to look for:

- Items tagged `// TODO(Karen)` are placeholders waiting on a real asset or a
  confirmed detail — the **headshot**, the **3 real reviews** (with permission
  to quote), the **Bohan Electric** spotlight wording, and the **Instagram**
  handle.
- Keep the *shape* of the file (the keys/structure) the same — only edit the
  values.

### Replacing the headshot

Drop the real photo into `public/` and point `site.about.photo.src` at it
(e.g. `/karen.jpg`). A placeholder is in `public/karen.jpg` for now. Ideal size
is a portrait around 640×760 or larger; `next/image` handles optimization.

> If Karen wants to self-edit reviews/photo/text without a developer, the brief
> recommends moving these fields to **Sanity** (free tier). The current setup is
> the "Simple (default)" approach from the brief — Megan edits `site.ts` and
> redeploys.

---

## Integrations

- **Calendly** (discovery call) — embedded inline in the *Get started* section
  and linked from every "Book a call". URL + theme set in `content/site.ts` /
  `components/Calendly.tsx`.
- **JotForm** (full New Client Intake) — linked from *Get started* and the
  footer. Not rebuilt.
- **Quick contact form** — `app/api/contact/route.ts` → Resend email. Includes a
  honeypot field and a basic per-IP rate limit.
- **Facebook Page Plugin** — timeline feed in the *Stay in the loop* section,
  with a graceful fallback to Follow buttons if the SDK can't load.

---

## What's built (vs. the brief)

Implemented in code: all page sections (nav, hero + Office Rescue animation,
pain strip, services, packages, how-it-works, about, reviews carousel + client
spotlight, FAQ, social feed, get-started with Calendly + contact form, footer),
Lucide icons (no emoji), sticky mobile CTA, scroll-reveal, SEO/OG/sitemap/robots,
`ProfessionalService` JSON-LD, generated favicon + OG image, `prefers-reduced-motion`
support, and keyboard-visible focus rings.

Karen-side / launch tasks (not code) are in the checklist below.

---

## Deploying to Vercel (under Karen's account)

1. Log in to Vercel **as Karen**. Import this GitHub repo (also under Karen's
   GitHub, or with her granted access).
2. Framework preset: **Next.js** (auto-detected). No special build settings.
3. Add the environment variables above (Production + Preview).
4. Add the custom domain `the-remote-admin.com` (DNS managed in Karen's
   registrar).
5. Deploy. Confirm: Calendly + Facebook feed render on the live domain, and the
   contact form delivers a test email to Karen's inbox.

---

## Handoff / ownership checklist

- [ ] Domain `the-remote-admin.com` in **Karen's** registrar account.
- [ ] Vercel project in **Karen's** account (or transferred to her).
- [ ] Resend, Calendly, JotForm all under **Karen's** logins.
- [ ] Karen has GitHub repo access (or it's hers).
- [ ] Content editable by Karen (this README's "Editing the content" section, or
      Sanity Studio if upgraded later).
- [ ] No "Designed by ___" credit anywhere. *(There is none.)*

## Assets still needed from Karen

- A couple more real reviews (the Ducharme + Bohan testimonials from the old
  About page are already in place; one carousel slot is still a placeholder).
- Final confirm on phone/email and preferred package names/pricing.

Already wired from her existing brand: her real **logo** (`public/tra-logo.png`,
used in the nav + footer), her **headshot** (`public/karen.jpg`), **Instagram**
(`@theremoteadmin`), and the "Proudly supporting local businesses" logos (Bohan
Electric, Ducharme Tree Service, Complete Masonry) with outbound links in
`public/clients/`. To swap the headshot or logo later, just replace the file of
the same name in `public/`.
