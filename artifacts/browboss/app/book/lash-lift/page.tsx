import type { Metadata } from "next";
import BookLashLift from "@/pages/BookLashLift";

export const metadata: Metadata = {
  title: "Book Lash Lift | BrowBoss Brow & Beauty La Jolla",
  description:
    "Book your YUMI Keratin Lash Lift at BrowBoss in La Jolla. Choose your artist and schedule online.",
  robots: { index: false, follow: false },
};

export default function BookLashLiftPage() {
  return <BookLashLift />;
}
