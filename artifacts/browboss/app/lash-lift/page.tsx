import type { Metadata } from "next";
import LashLift from "@/pages/LashLift";

export const metadata: Metadata = {
  title: "YUMI Keratin Lash Lift La Jolla | BrowBoss Brow & Beauty",
  description:
    "Professional YUMI Keratin Lash Lift in La Jolla, San Diego. Natural lashes lifted, curled and nourished without extensions or glue. Results last 8-12 weeks. Book online.",
  keywords: [
    "lash lift La Jolla",
    "YUMI lash lift San Diego",
    "keratin lash lift",
    "lash lift near me",
    "lash tint La Jolla",
  ],
  alternates: {
    canonical: "https://browboss.com/lash-lift",
  },
  openGraph: {
    title: "YUMI Keratin Lash Lift La Jolla | BrowBoss",
    description:
      "Natural lashes lifted and curled without extensions. Results last 8-12 weeks. La Jolla, San Diego.",
    url: "https://browboss.com/lash-lift",
  },
};

export default function LashLiftPage() {
  return <LashLift />;
}
