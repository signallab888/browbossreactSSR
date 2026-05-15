import type { Metadata } from "next";
import BookMicroblading from "@/pages/BookMicroblading";

export const metadata: Metadata = {
  title: "Book Microblading | BrowBoss Brow & Beauty La Jolla",
  description:
    "Book your microblading appointment with Leslie Ritchie at BrowBoss in La Jolla. Choose from microblading, ombre powder brows, or combo brows.",
  robots: { index: false, follow: false },
};

export default function BookMicrobladingPage() {
  return <BookMicroblading />;
}
