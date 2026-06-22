import { MessageSquare, Phone } from "lucide-react";
import { site } from "@/content/site";

/**
 * Slim utility bar above the nav: a quiet location note on the left and quick
 * "Text" / "Call" actions on the right. Scrolls away; the nav stays sticky.
 */
export function TopBar() {
  const { business } = site;

  return (
    <div className="border-b border-line bg-mist/40">
      <div className="container-page flex h-10 items-center justify-between gap-2">
        <p className="hidden text-xs text-muted sm:block">
          Serving {business.region}
        </p>

        <div className="flex shrink-0 items-center gap-1">
          <a
            href={business.smsHref}
            className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-mist/70"
            aria-label={`Text us at ${business.phone}`}
          >
            <MessageSquare className="h-3.5 w-3.5 text-sage-deep" />
            <span>Text</span>
          </a>
          <a
            href={business.phoneHref}
            className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-mist/70"
            aria-label={`Call us at ${business.phone}`}
          >
            <Phone className="h-3.5 w-3.5 text-sage-deep" />
            <span className="hidden sm:inline">{business.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
