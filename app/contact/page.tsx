import type { Metadata } from "next";
import { GetStarted } from "@/components/GetStarted";
import { SocialFeed } from "@/components/SocialFeed";

export const metadata: Metadata = {
  title: "Contact & Book a Call",
  description:
    "Book a free discovery call or send a quick message. The Remote Admin — virtual admin & bookkeeping for small businesses in southern New Hampshire.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <GetStarted />
      <SocialFeed />
    </>
  );
}
