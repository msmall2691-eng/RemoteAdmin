import type { Metadata } from "next";
import { Reviews } from "@/components/Reviews";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "What local business owners say about working with The Remote Admin — reliable, organized bookkeeping and admin support in southern New Hampshire.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <Reviews />
      <CtaBand />
    </>
  );
}
