import type { Metadata } from "next";
import Home from "@/pages/Home";

export const metadata: Metadata = {
  title:
    "BrowBoss Brow & Beauty | Microblading & Permanent Makeup in La Jolla, San Diego",
  description:
    "La Jolla's premier permanent makeup studio. Expert microblading, brow lamination, lash lifts, and lip blushing by certified artists. Led by Leslie Ritchie. Book online today.",
  alternates: {
    canonical: "https://browboss.com",
  },
};

export default function HomePage() {
  return <Home />;
}
