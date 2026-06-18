import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using The Remote Admin website.",
};

export default function TermsPage() {
  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated June 17, 2026</p>

        <div className="mt-10 space-y-8 text-ink/90">
          <p>
            These terms apply to your use of the The Remote Admin website. By
            using this site, you agree to them. If you do not agree, please do
            not use the site. They cover the website only — any work we take on
            is governed by a separate agreement.
          </p>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">Using this site</h2>
            <p>
              This website provides information about The Remote Admin services
              and a way to get in touch. You agree to use it lawfully and not to
              misuse the contact form or attempt to disrupt the site.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">
              No guarantee of services
            </h2>
            <p>
              Submitting the contact form or booking a call does not create a
              binding agreement to provide services. Any work we take on,
              including its scope, pricing, and timing, is agreed separately in
              writing.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">
              Information on this site
            </h2>
            <p>
              We work to keep the information here accurate and up to date, but
              we do not warrant that it is complete or error-free. Content may
              change without notice.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">Third-party tools</h2>
            <p>
              This site links to and embeds third-party services, such as
              Calendly for scheduling and our social media profiles. We are not
              responsible for the content or practices of those third parties.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">
              Intellectual property
            </h2>
            <p>
              The Remote Admin name, logo, and the text and images on this site
              belong to The Remote Admin. Please don&rsquo;t copy or reuse them
              without permission. Client logos shown here remain the property of
              their respective owners and are used with permission.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">
              Limitation of liability
            </h2>
            <p>
              The site is provided on an as-is basis. To the extent permitted by
              law, The Remote Admin is not liable for any damages arising from
              your use of the site.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">Governing law</h2>
            <p>
              These terms are governed by the laws of the State of New
              Hampshire, without regard to its conflict-of-laws rules.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl text-ink">Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a
                href="mailto:office@the-remote-admin.com"
                className="underline transition-colors hover:text-ink"
              >
                office@the-remote-admin.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
