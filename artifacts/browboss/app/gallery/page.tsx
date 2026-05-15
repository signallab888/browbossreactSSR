import type { Metadata } from "next";
import Gallery from "@/pages/Gallery";

export const metadata: Metadata = {
  title: "Before & After Gallery | Microblading & Lash Lifts La Jolla",
  description:
    "Real client results from BrowBoss. Before & after photos of microblading, brow lamination, lash lifts, and lip blushing in La Jolla, San Diego.",
  alternates: {
    canonical: "https://browboss.com/gallery",
  },
  openGraph: {
    title: "Before & After Gallery | BrowBoss La Jolla",
    description:
      "Real client results — microblading, lash lifts, and more in La Jolla.",
    url: "https://browboss.com/gallery",
  },
};

export default function GalleryPage() {
  return <Gallery />;
}
