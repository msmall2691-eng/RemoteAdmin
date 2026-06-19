import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Remote Admin collects, uses, and protects the information you share through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated June 17, 2026</p>

        <div className="mt-10 space-y-8 text-ink/90">
          <p>
            The Remote Admin respects your privacy. This policy explains what
            information we collect when you use this website, how we use it, and
            the choices you have.
          </p>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">
              Information we collect
            </h2>
            <p>
              When you fill out the contact form on this site, we collect the
              information you choose to provide — typically your name, your email
              address or phone number, the type of help you are looking for, and
              your message. If you book a call, scheduling details are handled by
              Calendly.
            </p>
            <p>
              Our host also keeps basic technical logs (such as your IP address)
              to keep the site running and to limit spam on the contact form.
            </p>
            <p>
              We do not use advertising trackers on this site. Embedded tools —
              such as the Calendly scheduler and the Facebook page feed — may set
              their own cookies to provide their service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">How we use it</h2>
            <p>
              We use the information you submit only to respond to your inquiry,
              follow up about working together, and prevent spam. Contact-form
              submissions are delivered straight to our private email inbox; we
              don&rsquo;t use them for marketing lists.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">How we share it</h2>
            <p>
              We do not sell or rent your information. We only share it with the
              service providers that help us run the site and respond to you —
              Google (email), Calendly (scheduling), and Vercel (website
              hosting) — and only as needed to provide those services, or where
              required by law.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">Your choices</h2>
            <p>
              You can ask us to access, correct, or delete the information you
              have submitted at any time. Just email{" "}
              <a
                href="mailto:office@the-remote-admin.com"
                className="underline transition-colors hover:text-ink"
              >
                office@the-remote-admin.com
              </a>{" "}
              and we will take care of it.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">Contact</h2>
            <p>
              Questions about this policy? Reach us at{" "}
              <a
                href="mailto:office@the-remote-admin.com"
                className="underline transition-colors hover:text-ink"
              >
                office@the-remote-admin.com
              </a>{" "}
              or (603) 714-8370.
            </p>
          </div>

          <p className="text-sm text-muted">
            This policy may be updated from time to time. Any changes will be
            posted on this page with a new last-updated date.
          </p>
        </div>
      </div>
    </section>
  );
}
