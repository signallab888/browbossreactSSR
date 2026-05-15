import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

const siteUrl = "https://browboss.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BrowBoss Brow & Beauty | Microblading & Permanent Makeup in La Jolla, San Diego",
    template: "%s | BrowBoss Brow & Beauty",
  },
  description:
    "La Jolla's premier permanent makeup studio. Expert microblading, brow lamination, lash lifts, and lip blushing. 1150 Silverado St Suite 308, La Jolla CA 92037. Call (858) 322-0010.",
  keywords: [
    "microblading La Jolla",
    "brow lamination San Diego",
    "lash lift La Jolla",
    "permanent makeup San Diego",
    "lip blushing La Jolla",
    "browboss",
    "brow beauty la jolla",
    "ombre brows san diego",
    "powder brows la jolla",
  ],
  authors: [{ name: "BrowBoss Brow & Beauty" }],
  creator: "BrowBoss Brow & Beauty",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "BrowBoss Brow & Beauty",
    title: "BrowBoss Brow & Beauty | La Jolla, San Diego",
    description:
      "La Jolla's premier permanent makeup studio. Expert microblading, brow lamination, lash lifts, and lip blushing.",
    images: [
      {
        url: "/images/leslie-founder.jpg",
        width: 1200,
        height: 630,
        alt: "BrowBoss Brow & Beauty — La Jolla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrowBoss Brow & Beauty | La Jolla, San Diego",
    description: "La Jolla's premier permanent makeup studio.",
    images: ["/images/leslie-founder.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "BrowBoss Brow & Beauty",
  description:
    "La Jolla's premier permanent makeup studio offering microblading, brow lamination, lash lifts, lip blushing, and more.",
  url: siteUrl,
  telephone: "+18583220010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1150 Silverado St Suite 308",
    addressLocality: "La Jolla",
    addressRegion: "CA",
    postalCode: "92037",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.8425,
    longitude: -117.2776,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$$",
  image: `${siteUrl}/images/leslie-founder.jpg`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    reviewCount: "100",
  },
  sameAs: [
    "https://www.instagram.com/browboss",
    "https://www.facebook.com/browboss",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
